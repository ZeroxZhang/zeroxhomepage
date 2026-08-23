/**
 * 首页自动化验收脚本（Playwright + Chromium）。
 *
 * 前置：
 * - 生产服务器已启动（默认 http://localhost:3000，可用 BASE_URL 覆盖）；
 * - Playwright 浏览器已安装（PLAYWRIGHT_BROWSERS_PATH 指向安装目录）。
 *
 * 运行：node scripts/qa-homepage.mjs
 * 覆盖：多尺寸与关键断点布局、横向溢出、字体加载、控制台错误、
 * 英雄区按钮弹层交互、分类弹层交互、移动端菜单、/about 可达性。
 * 截图输出到 /tmp/shots/（视觉复查用）。
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { PNG } = require("pngjs");

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const SHOT_DIR = process.env.SHOT_DIR ?? "/tmp/shots";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "wide-edge", width: 1600, height: 900 },
  { name: "wide-before", width: 1599, height: 900 },
  { name: "desktop-sm-edge", width: 1280, height: 900 },
  { name: "desktop-sm-before", width: 1279, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "tablet-before", width: 767, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "mobile-narrow", width: 320, height: 700 },
];

const results = [];
const record = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

const checkFont = async (page, sample, family) =>
  page.evaluate(
    ([s, f]) => document.fonts.check(s) || document.fonts.check(f),
    [sample, family],
  );

mkdirSync(SHOT_DIR, { recursive: true });

const browser = await chromium.launch();
const errors = [];
let contextSequence = 0;

const createMonitoredContext = async (options, label) => {
  const context = await browser.newContext(options);
  const contextLabel = label ?? `context-${++contextSequence}`;
  context.on("page", (page) => {
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`[${contextLabel}] ${msg.text()}`);
    });
    page.on("pageerror", (err) =>
      errors.push(`[${contextLabel}] pageerror: ${err.message}`),
    );
  });
  return context;
};

for (const vp of VIEWPORTS) {
  const context = await createMonitoredContext(
    { viewport: { width: vp.width, height: vp.height } },
    vp.name,
  );
  const page = await context.newPage();

  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(900); // 等待入场动画与 IntersectionObserver

  // 1. 无横向溢出
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  record(`${vp.name} 无横向溢出`, overflow <= 1, `overflow=${overflow}px`);

  // 2. 字体加载
  const cinzel = await checkFont(page, '700 40px "Cinzel"', '700 40px Cinzel');
  const instrument = await checkFont(
    page,
    'italic 400 24px "Instrument Serif"',
    "italic 400 24px Instrument Serif",
  );
  record(`${vp.name} 字体加载`, cinzel && instrument, `cinzel=${cinzel} instrument=${instrument}`);

  // 3. 主标题与字体族
  const headline = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    if (!h1) return null;
    const style = window.getComputedStyle(h1);
    return { text: h1.textContent, font: style.fontFamily };
  });
  record(
    `${vp.name} 主标题`,
    headline?.text?.includes("ZEROX") &&
      headline?.text?.includes("ZHANG") &&
      headline?.text?.trim().endsWith(".") &&
      headline?.font?.includes("Cinzel"),
    `text=${headline?.text?.slice(0, 16)} font=${headline?.font?.split(",")[0]}`,
  );

  // 4. 格言与出处
  const motto = await page.evaluate(() => document.body.innerText);
  record(
    `${vp.name} 格言文案`,
    motto.includes("Sic itur ad astra") &&
      motto.includes("探索永无止境 · 此行通往群星") &&
      motto.includes("AENEIS"),
  );

  // 5. 四个按钮
  const buttons = await page.evaluate(() =>
    [...document.querySelectorAll("section a, section button")]
      .map((el) => el.textContent?.trim())
      .filter(Boolean),
  );
  const hasButtons = ["GitHub", "博客", "公众号", "联系我"].every((label) =>
    buttons.some((t) => t.includes(label)),
  );
  record(`${vp.name} 英雄区按钮组`, hasButtons, buttons.join(" | ").slice(0, 80));

  // 6. 动效网格（桌面/平板应有 canvas，降级路径不报错）
  const canvasCount = await page.evaluate(
    () => document.querySelectorAll("canvas").length,
  );
  record(`${vp.name} Canvas 动效层`, canvasCount >= 1, `canvas=${canvasCount}`);

  // 7. 作品集分区与 9 个磁贴
  await page.goto(BASE_URL + "/#work", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(600);
  const gridInfo = await page.evaluate(() => {
    const grid = document.querySelector("#work button");
    if (!grid) return null;
    const tiles = [...document.querySelectorAll("#work button")];
    return { count: tiles.length, labels: tiles.map((t) => t.getAttribute("aria-label")) };
  });
  record(
    `${vp.name} 作品集磁贴`,
    gridInfo?.count === 9 && gridInfo.labels.some((l) => l?.includes("全部作品")),
    `tiles=${gridInfo?.count}`,
  );

  await page.screenshot({
    path: `${SHOT_DIR}/qa-${vp.name}.png`,
    fullPage: false,
  });
  await page.screenshot({
    path: `${SHOT_DIR}/qa-${vp.name}-work.png`,
    fullPage: false,
  });
  await context.close();
}

// 8. 交互：邮箱弹层
{
  const context = await createMonitoredContext({ viewport: { width: 1440, height: 900 } }, "email-dialog");
  const page = await context.newPage();
  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 30000 });
  await page.getByRole("button", { name: "联系我" }).click();
  await page.waitForTimeout(300);
  const emailDialog = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return {
      open: Boolean(dialog),
      hasEmail: dialog?.textContent?.includes("shangye_robbie@126.com") ?? false,
      labelled: dialog?.getAttribute("aria-labelledby") ?? "",
    };
  });
  record("邮箱弹层打开", emailDialog.open && emailDialog.hasEmail && Boolean(emailDialog.labelled));
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  const closedByEsc = await page.evaluate(
    () => document.querySelector('[role="dialog"]') === null,
  );
  record("邮箱弹层 Escape 关闭", closedByEsc);
  await context.close();
}

// 9. 交互：公众号弹层（应展示真实二维码图片）
{
  const context = await createMonitoredContext({ viewport: { width: 1440, height: 900 } }, "wechat-dialog");
  const page = await context.newPage();
  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 30000 });
  await page.getByRole("button", { name: "公众号" }).click();
  await page.waitForTimeout(400);
  const wechat = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const img = dialog?.querySelector("img");
    return {
      hasName: dialog?.textContent?.includes("Zerox在探索") ?? false,
      qrSrc: img?.getAttribute("src") ?? "",
      qrLoaded: img ? img.complete && img.naturalWidth > 0 : false,
    };
  });
  record(
    "公众号弹层（含二维码）",
    wechat.hasName &&
      wechat.qrSrc.includes("zerox-wechat-qr") &&
      wechat.qrLoaded,
    `name=${wechat.hasName} src=${wechat.qrSrc} loaded=${wechat.qrLoaded}`,
  );
  await context.close();
}

// 10. 交互：分类弹层 + 全部作品
{
  const context = await createMonitoredContext({ viewport: { width: 1440, height: 900 } }, "category-dialog");
  const page = await context.newPage();
  await page.goto(BASE_URL + "/#work", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);
  const tiles = page.locator("#work button");
  await tiles.nth(0).click({ position: { x: 12, y: 10 } });
  await page.waitForTimeout(300);
  const categoryDialog = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const rows = dialog?.querySelectorAll("li")?.length ?? 0;
    return { open: Boolean(dialog), rows };
  });
  record("分类弹层打开", categoryDialog.open && categoryDialog.rows >= 1, `rows=${categoryDialog.rows}`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  await tiles.nth(8).click({ position: { x: 12, y: 10 } });
  await page.waitForTimeout(300);
  const allDialog = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const text = dialog?.textContent ?? "";
    const work = document.querySelector("#work");
    return {
      open: Boolean(dialog),
      hasAll: text.includes("全部作品"),
      sections: dialog?.querySelectorAll("h3")?.length ?? 0,
      rows: dialog?.querySelectorAll("li")?.length ?? 0,
      expectedSections: Number(work?.getAttribute("data-category-count") ?? 0),
      expectedRows: Number(work?.getAttribute("data-work-count") ?? 0),
    };
  });
  record(
    "全部作品弹层",
    allDialog.open &&
      allDialog.hasAll &&
      allDialog.sections === allDialog.expectedSections &&
      allDialog.rows === allDialog.expectedRows,
    `sections=${allDialog.sections}/${allDialog.expectedSections} rows=${allDialog.rows}/${allDialog.expectedRows}`,
  );
  await context.close();
}

// 11. 移动端菜单
{
  const context = await createMonitoredContext({ viewport: { width: 390, height: 844 } }, "mobile-menu");
  const page = await context.newPage();
  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 30000 });
  await page.getByRole("button", { name: "打开菜单" }).click();
  await page.waitForTimeout(300);
  const menu = await page.evaluate(() => {
    const panel = document.getElementById("site-mobile-menu");
    return {
      open: Boolean(panel),
      links: panel?.querySelectorAll("a")?.length ?? 0,
    };
  });
  record("移动端菜单", menu.open && menu.links >= 4, `links=${menu.links}`);
  await context.close();
}

// 12. /about 可达
{
  const context = await createMonitoredContext({ viewport: { width: 1440, height: 900 } }, "about");
  const page = await context.newPage();
  const resp = await page.goto(BASE_URL + "/about", { waitUntil: "networkidle", timeout: 30000 });
  const text = await page.evaluate(() => document.body.innerText);
  record(
    "/about 页面",
    resp.status() === 200 && text.includes("ZEROX·ZHANG"),
    `status=${resp.status()}`,
  );
  await context.close();
}

// 12.5 Kinetic Grid 交互感知：光标在英雄区（含正文内容上方）移动必须驱动点阵
{
  const context = await createMonitoredContext({ viewport: { width: 1440, height: 900 } }, "kinetic-floor");
  const page = await context.newPage();
  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1200);

  const hashCanvas = () =>
    page.evaluate(() => {
      const canvas = document.querySelector("#kinetic-floor canvas");
      if (!canvas) return null;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const { width, height } = canvas;
      const data = ctx.getImageData(0, 0, width, height).data;
      let hash = 0;
      for (let i = 0; i < data.length; i += 97 * 4) {
        hash = (hash * 31 + data[i] + data[i + 1] + data[i + 2]) >>> 0;
      }
      return { hash, width, height };
    });

  const before = await hashCanvas();
  record(
    "Kinetic Grid 挂载",
    before !== null,
    `canvas=${before ? `${before.width}x${before.height}` : "missing"}`,
  );

  // 第一段：正文内容列上方（此前被 pointer-events 拦截的区域）
  await page.mouse.move(720, 620, { steps: 10 });
  await page.waitForTimeout(150);
  await page.mouse.move(980, 780, { steps: 10 });
  await page.waitForTimeout(450);
  const afterContent = await hashCanvas();
  record(
    "Kinetic Grid 内容区上方光标交互",
    Boolean(before && afterContent && before.hash !== afterContent.hash),
    `hash ${before?.hash} → ${afterContent?.hash}`,
  );

  // 第二段：地面区域内的长拖尾
  await page.mouse.move(400, 820, { steps: 14 });
  await page.waitForTimeout(150);
  await page.mouse.move(1100, 850, { steps: 14 });
  await page.waitForTimeout(450);
  const afterFloor = await hashCanvas();
  record(
    "Kinetic Grid 地面区光标交互",
    Boolean(before && afterFloor && before.hash !== afterFloor.hash),
    `hash ${before?.hash} → ${afterFloor?.hash}`,
  );

  await context.close();
}

// 12.6 全页背景网格：存在、可交互、不拦截点击
{
  const context = await createMonitoredContext({ viewport: { width: 1440, height: 900 } }, "background-grid");
  const page = await context.newPage();
  await page.goto(BASE_URL + "/#work", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);

  const hashBg = () =>
    page.evaluate(() => {
      const canvas = document.querySelector("#background-grid canvas");
      if (!canvas) return null;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const { width, height } = canvas;
      const data = ctx.getImageData(0, 0, width, height).data;
      let hash = 0;
      for (let i = 0; i < data.length; i += 101 * 4) {
        hash = (hash * 31 + data[i] + data[i + 1] + data[i + 2]) >>> 0;
      }
      return { hash, width, height };
    });

  const before = await hashBg();
  record(
    "背景网格挂载",
    before !== null,
    `canvas=${before ? `${before.width}x${before.height}` : "missing"}`,
  );

  // 作品区内容上方移动光标，背景网格应响应
  await page.mouse.move(300, 450, { steps: 8 });
  await page.waitForTimeout(120);
  await page.mouse.move(700, 560, { steps: 8 });
  await page.waitForTimeout(450);
  const after = await hashBg();
  record(
    "背景网格作品区交互",
    Boolean(before && after && before.hash !== after.hash),
    `hash ${before?.hash} → ${after?.hash}`,
  );

  // 不拦截点击：磁贴仍可打开
  const tiles = page.locator("#work button");
  await tiles.nth(0).click({ position: { x: 12, y: 10 } });
  await page.waitForTimeout(300);
  const dialogOpen = await page.evaluate(
    () => document.querySelector('[role="dialog"]') !== null,
  );
  record("背景网格不拦截点击", dialogOpen);
  await page.keyboard.press("Escape");

  await context.close();
}

// 12.7 英雄区 → 作品区过渡平滑：接缝上下亮度无跳变
{
  const context = await createMonitoredContext({ viewport: { width: 1440, height: 900 } }, "hero-seam");
  const page = await context.newPage();
  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1000);

  // 滚动至英雄区底缘位于视口中部（英雄区为 100vh）
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(900);

  const shot = PNG.sync.read(await page.screenshot());
  const bandMean = (y0, y1) => {
    let sum = 0;
    let n = 0;
    for (let y = y0; y < y1; y += 2) {
      for (let x = 60; x < shot.width - 60; x += 2) {
        const i = (y * shot.width + x) * 4;
        sum +=
          0.2126 * shot.data[i] + 0.7152 * shot.data[i + 1] + 0.0722 * shot.data[i + 2];
        n++;
      }
    }
    return sum / n;
  };

  // 英雄区底缘位于屏幕 y=200；对比其上下 40px 带
  const above = bandMean(150, 190);
  const below = bandMean(210, 250);
  const ratio = Math.max(above, below) / Math.max(1, Math.min(above, below));
  record(
    "英雄区→作品区过渡平滑（无亮度跳变）",
    ratio < 2.2,
    `seam above=${above.toFixed(1)} below=${below.toFixed(1)} ratio=${ratio.toFixed(2)}`,
  );

  await context.close();
}

// 13. 语言切换：默认中文 → 英文 → 刷新持久化 → 切回中文
{
  const context = await createMonitoredContext({ viewport: { width: 1440, height: 900 } }, "locale");
  const page = await context.newPage();
  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(600);

  const snapshot = () =>
    page.evaluate(() => ({
      lang: document.documentElement.lang,
      zhDesc: document.body.innerText.includes("独立开发者与创作者"),
      enDesc: document.body.innerText.includes("Independent developer"),
      worksHeading: document.querySelector("#work h2")?.textContent ?? "",
    }));

  const initial = await snapshot();
  record("默认中文", initial.lang === "zh-CN" && initial.zhDesc, `lang=${initial.lang}`);

  const caps = page.locator('[data-locale-toggle] button:visible');
  const capCount = await caps.count();
  record("语言切换键帽", capCount === 2, `caps=${capCount}`);

  await caps.nth(1).click();
  await page.waitForTimeout(400);
  const en = await snapshot();
  record("切换至英文", en.lang === "en" && en.enDesc, `lang=${en.lang}`);

  record(
    "作品区英文标题",
    /^\d+ tracks, \d+ works$/.test(en.worksHeading.trim()),
    en.worksHeading.slice(0, 40),
  );

  const hasEnButtons = await page.evaluate(() =>
    ["Blog", "WeChat", "Contact"].every((label) =>
      [...document.querySelectorAll("section button, section a")].some(
        (el) => el.textContent?.trim() === label,
      ),
    ),
  );
  record("英文按钮文案", hasEnButtons);

  const tileEn = await page.evaluate(() =>
    [...document.querySelectorAll("#work button")].some((t) =>
      t.textContent?.includes("A-share Tailpicker"),
    ),
  );
  record("磁贴英文作品名", tileEn);

  await page.reload({ waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(600);
  const afterReload = await snapshot();
  record(
    "刷新后保持英文",
    afterReload.lang === "en" && afterReload.enDesc,
    `lang=${afterReload.lang}`,
  );

  await page.locator('[data-locale-toggle] button:visible').nth(0).click();
  await page.waitForTimeout(400);
  const back = await snapshot();
  record("切回中文", back.lang === "zh-CN" && back.zhDesc, `lang=${back.lang}`);

  await context.close();
}

await browser.close();

// 13. 控制台错误汇总
record("无控制台错误", errors.length === 0, errors.slice(0, 5).join(" ; "));

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} 项通过`);
process.exit(failed.length > 0 ? 1 : 0);
