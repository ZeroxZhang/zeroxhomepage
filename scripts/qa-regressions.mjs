/**
 * 提交前关键回归：只覆盖曾被人工复核发现的行为缺陷。
 * 前置：生产服务器已启动，可用 BASE_URL 覆盖。
 */
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const results = [];
const runtimeErrors = [];

const record = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

const instrumentCanvas = async (context) => {
  await context.addInitScript(() => {
    window.__canvasOps = { background: 0, floor: 0, pixel: 0 };
    const bucket = (ctx) => {
      const canvas = ctx.canvas;
      if (canvas.closest("#background-grid")) return "background";
      if (canvas.closest("#kinetic-floor")) return "floor";
      return "pixel";
    };
    for (const method of ["fillRect", "fill", "stroke"]) {
      const original = CanvasRenderingContext2D.prototype[method];
      CanvasRenderingContext2D.prototype[method] = function (...args) {
        window.__canvasOps[bucket(this)] += 1;
        return original.apply(this, args);
      };
    }
  });
};

const monitor = (page, label) => {
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(`[${label}] ${message.text()}`);
  });
  page.on("pageerror", (error) => runtimeErrors.push(`[${label}] ${error.message}`));
  return page;
};

const browser = await chromium.launch();

// 内容排序与弹层焦点约束。
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = monitor(await context.newPage(), "dialog");
  await page.goto(`${BASE_URL}/#work`, { waitUntil: "networkidle" });
  const previewContrast = await page.locator("#work li").first().evaluate((element) => {
    const parse = (value) => {
      const values = value.match(/[\d.]+/g)?.map(Number) ?? [];
      return { r: values[0], g: values[1], b: values[2], a: values[3] ?? 1 };
    };
    const foreground = parse(getComputedStyle(element).color);
    const background = parse(getComputedStyle(element.closest("button")).backgroundColor);
    const blend = (channel) =>
      foreground[channel] * foreground.a + background[channel] * (1 - foreground.a);
    const luminance = (rgb) => {
      const channel = (value) => {
        const normalized = value / 255;
        return normalized <= 0.04045
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
    };
    const fg = luminance({ r: blend("r"), g: blend("g"), b: blend("b") });
    const bg = luminance(background);
    return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
  });
  record("作品预览文字对比度", previewContrast >= 4.5, `ratio=${previewContrast.toFixed(2)}`);

  await page.locator("#work button").nth(1).click();
  const firstWork = await page.locator('[role="dialog"] li').first().locator("span").first().textContent();
  record("分类作品排序", firstWork?.trim() === "huashu-bookwriter", `first=${firstWork?.trim()}`);
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "联系我" }).click();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const focusState = await page.evaluate(() => ({
    inside: document.querySelector('[role="dialog"]')?.contains(document.activeElement) ?? false,
    backgroundInert: [...document.body.children]
      .filter((element) => !element.matches("[data-dialog-overlay]"))
      .filter((element) => element.tagName !== "SCRIPT")
      .every((element) => element.inert),
  }));
  record(
    "弹层焦点与背景隔离",
    focusState.inside && focusState.backgroundInert,
    JSON.stringify(focusState),
  );
  await context.close();
}

// 320px 导航不得裁切。
{
  const context = await browser.newContext({ viewport: { width: 320, height: 700 } });
  const page = monitor(await context.newPage(), "narrow-nav");
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  const bounds = await page.getByRole("button", { name: "打开菜单" }).evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { left: rect.left, right: rect.right, width: rect.width, viewport: innerWidth };
  });
  record(
    "320px 导航完整可见",
    bounds.left >= 0 && bounds.right <= bounds.viewport && bounds.width >= 44,
    JSON.stringify(bounds),
  );
  await context.close();
}

// 无 JS 时也必须由 CSS 输出正确移动端网格，避免水合布局跳变。
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/#work`, { waitUntil: "load" });
  const grid = await page.locator("#work .grid").evaluate((element) => {
    const style = getComputedStyle(element);
    const last = element.lastElementChild;
    return {
      columns: style.gridTemplateColumns.split(" ").filter(Boolean).length,
      lastColumn: last ? getComputedStyle(last).gridColumnEnd : "",
    };
  });
  record(
    "移动端 SSR 网格稳定",
    grid.columns === 2 && grid.lastColumn === "-1",
    JSON.stringify(grid),
  );
  await context.close();
}

// Canvas 空闲与减少动态模式不得持续重绘。
for (const reducedMotion of ["no-preference", "reduce"]) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion,
  });
  await instrumentCanvas(context);
  const page = monitor(await context.newPage(), `canvas-${reducedMotion}`);
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  await page.evaluate(() => {
    window.__canvasOps = { background: 0, floor: 0, pixel: 0 };
  });
  await page.waitForTimeout(500);
  const ops = await page.evaluate(() => window.__canvasOps);
  record(
    `Canvas 空闲停止（${reducedMotion}）`,
    ops.background < 50 && ops.floor < 50 && ops.pixel < 50,
    JSON.stringify(ops),
  );
  await context.close();
}

// 对比度、触控目标与英文语义。
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = monitor(await context.newPage(), "a11y");
  await page.goto(`${BASE_URL}/#work`, { waitUntil: "networkidle" });

  const footerHeights = await page.locator("footer nav a, footer a[href^=\"mailto:\"]").evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().height),
  );
  record(
    "Footer 触控目标",
    footerHeights.every((height) => height >= 44),
    `min=${Math.min(...footerHeights).toFixed(1)}`,
  );

  await page.getByRole("button", { name: "联系我" }).click();
  const closeSize = await page.getByRole("button", { name: "关闭" }).last().evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return Math.min(rect.width, rect.height);
  });
  record("弹层关闭触控目标", closeSize >= 44, `size=${closeSize.toFixed(1)}`);
  await page.keyboard.press("Escape");

  await page.locator('[data-locale-toggle] button:visible').nth(1).click();
  const labels = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    main: document.querySelector("nav")?.getAttribute("aria-label"),
    footer: document.querySelector("footer nav")?.getAttribute("aria-label"),
    menu: document.querySelector('button[aria-controls="site-mobile-menu"]')?.getAttribute("aria-label"),
    workTile: document.querySelector("#work button")?.getAttribute("aria-label"),
  }));
  record(
    "英文模式辅助标签",
    labels.lang === "en" &&
      labels.main === "Main navigation" &&
      labels.footer === "Footer navigation" &&
      labels.menu === "Open menu" &&
      labels.workTile?.startsWith("View category:"),
    JSON.stringify(labels),
  );

  await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle" });
  const about = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    text: document.body.innerText,
  }));
  record(
    "About 遵循英文偏好",
    about.lang === "en" && about.text.includes("About page is under construction"),
    `lang=${about.lang}`,
  );
  await context.close();
}

record("回归场景无控制台错误", runtimeErrors.length === 0, runtimeErrors.slice(0, 5).join(" ; "));
await browser.close();

const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} 项通过`);
process.exit(failed.length > 0 ? 1 : 0);
