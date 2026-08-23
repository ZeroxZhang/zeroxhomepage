/**
 * 站点图标库：统一 24px 网格、1.5 描边、currentColor 继承。
 * 含功能图标与八个作品分类 +「全部」的几何符号。
 */
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---------- 功能图标 ---------- */

export const GitHubIcon = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
);

export const MailIcon = (props: IconProps) => (
  <Base {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7.5 9 6 9-6" />
  </Base>
);

export const PenIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Base>
);

export const WeChatIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M9 4.5A6.5 6.5 0 0 1 15.5 11c0 3.6-2.9 6.5-6.5 6.5-.8 0-1.5-.1-2.2-.4L4 18l.9-2.5A6.5 6.5 0 0 1 2.5 11 6.5 6.5 0 0 1 9 4.5Z" />
    <circle cx="7" cy="11" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="11.3" cy="11" r="0.9" fill="currentColor" stroke="none" />
    <path d="M15 10.5a5 5 0 0 1 4 4.8c0 1.3-.6 2.4-1.5 3.2l.6 1.9-2-.9c-.5.1-1 .2-1.6.2" />
  </Base>
);

export const CloseIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const CopyIcon = (props: IconProps) => (
  <Base {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </Base>
);

export const CheckIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const ArrowUpRightIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Base>
);

export const MenuIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const QrPlaceholderIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" />
    <path d="M14.5 14.5h2v2h-2zM17.5 17.5h2v2h-2zM14.5 17.5v2" />
    <circle cx="17" cy="15" r="0.6" fill="currentColor" stroke="none" />
  </Base>
);

/* ---------- 分类符号 ---------- */

export const GlyphAgent = (props: IconProps) => (
  <Base {...props}>
    <circle cx="5.5" cy="6" r="2" />
    <circle cx="18.5" cy="6" r="2" />
    <circle cx="12" cy="18" r="2" />
    <path d="M7.5 6h9M7.3 7.2 11 16.3M16.7 7.2 13 16.3" />
  </Base>
);

export const GlyphPublish = (props: IconProps) => (
  <Base {...props}>
    <path d="M20.2 4.8a5.6 5.6 0 0 0-7.9 0L6 11.1a3.6 3.6 0 0 0 5.1 5.1l6.3-6.3a5.6 5.6 0 0 0 0-7.9Z" />
    <path d="M18 7 8.6 16.4a2.2 2.2 0 0 1-3.1-3.1L11 7.8" />
    <path d="M6.5 17.5 9 20" />
  </Base>
);

export const GlyphVisual = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1Z" />
  </Base>
);

export const GlyphQuant = (props: IconProps) => (
  <Base {...props}>
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <path d="m7 14 3.5-4 3 2.5L18 7" />
    <path d="M15 7h4v4" />
  </Base>
);

export const GlyphLearn = (props: IconProps) => (
  <Base {...props}>
    <path d="M2 3.5h6a4 4 0 0 1 4 4V21a3 3 0 0 0-3-3H2z" />
    <path d="M22 3.5h-6a4 4 0 0 0-4 4V21a3 3 0 0 1 3-3h7z" />
  </Base>
);

export const GlyphUtility = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 2.8 19.5 7v10l-7.5 4.2L4.5 17V7z" />
    <path d="M13 7.2 9.6 13h2.9l-2.5 5.4" />
  </Base>
);

export const GlyphWeb = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="4" ry="9" />
    <path d="M3.5 9h17M3.5 15h17" />
  </Base>
);

export const GlyphSystem = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7" />
  </Base>
);

export const GlyphAll = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 3.5v17M4.6 7.8l14.8 8.4M19.4 7.8 4.6 16.2" />
  </Base>
);

/** 分类 id → 符号（works index.yaml 的分类字典）。 */
export const CATEGORY_GLYPHS: Record<string, ComponentType<IconProps>> = {
  "agent-platform": GlyphAgent,
  "content-publishing": GlyphPublish,
  "visual-design": GlyphVisual,
  "quant-research": GlyphQuant,
  learning: GlyphLearn,
  utilities: GlyphUtility,
  "web-products": GlyphWeb,
  "personal-system": GlyphSystem,
  all: GlyphAll,
};
