import { readFileSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { injectGoogleAnalytics } from "@/lib/google-analytics";
import { WORK_SLUGS } from "@/lib/work-slugs";

/**
 * 在稳定的 /work/<slug> 路由直接返回已交付的独立静态 HTML。
 * 页面与共享资源都进入 public，因此部署只需要主站一个域名。
 */
const WORK_SLUG_SET = new Set<string>(WORK_SLUGS);

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK_SLUGS.map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!WORK_SLUG_SET.has(slug)) {
    notFound();
  }

  const html = injectGoogleAnalytics(
    readFileSync(
      path.join(process.cwd(), "public", "work", slug, "index.html"),
      "utf8",
    ),
  );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
