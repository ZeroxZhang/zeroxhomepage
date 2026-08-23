"use client";

/**
 * 站点按钮：沿用 OriginKit Hero 10 Button 的视觉语言（胶囊、渐变、
 * 噪点纹理、hover 沉降），主按钮渐变换为「黄铜」主题。
 * 纹理资产：public/originkit/hero-10/textures-btn-noise.png（OriginKit 交付）。
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

type BaseProps = {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type SiteButtonProps = BaseProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

const BASE_CLASS =
  "group relative inline-flex min-h-11 shrink-0 cursor-pointer touch-manipulation select-none items-center justify-center gap-2 overflow-clip rounded-[32px] px-5 py-3 font-sans text-[15px] font-medium leading-none text-ivory transition-[opacity,transform] duration-200 ease [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass active:scale-[0.97] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-95";

const PRIMARY_DARK = "#151208";
const PRIMARY_GRADIENT =
  "linear-gradient(77.36deg, #151208 13.89%, #1a1609 18.74%, #1d180a 23.4%, #201a0b 33.87%, #241d0b 38.59%, #28200c 43.32%, #453707 52.9%, #d9b45b 114.64%)";

export const SiteButton = ({
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: SiteButtonProps) => {
  const isLink = "href" in rest && rest.href !== undefined;

  const iconNode = icon ? (
    <span className="relative z-1 shrink-0 [&>svg]:size-[15px]">{icon}</span>
  ) : null;

  if (variant === "secondary") {
    const content = (
      <>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[32px] border border-solid border-line bg-ink-card transition-colors duration-200 ease motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-ink-soft"
        />
        {iconNode}
        <span className="relative z-1 whitespace-nowrap text-center">{children}</span>
      </>
    );
    const cls = `${BASE_CLASS} ${className}`;
    return isLink ? (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    ) : (
      <button
        type="button"
        className={cls}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[32px]"
        style={{ backgroundImage: PRIMARY_GRADIENT }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-[600ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
        style={{ backgroundColor: PRIMARY_DARK }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[32px] bg-[url('/originkit/hero-10/textures-btn-noise.png')] bg-size-[100px_100px] bg-top-left opacity-60 transition-opacity duration-[600ms] ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_-4px_4px_0_rgba(255,255,255,0.05),inset_0_4px_4px_0_rgba(255,255,255,0.05)]"
      />
      {iconNode}
      <span className="relative z-1 whitespace-nowrap text-center">{children}</span>
    </>
  );
  const cls = `${BASE_CLASS} shadow-[0_4px_2px_0_rgba(0,0,0,0.25),0_-1.2px_0.5px_0_rgba(242,239,228,0.28),0_24px_14px_0_rgba(0,0,0,0.05),0_11px_11px_0_rgba(0,0,0,0.09),0_3px_6px_0_rgba(0,0,0,0.1)] ${className}`;
  return isLink ? (
    <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {content}
    </a>
  ) : (
    <button
      type="button"
      className={cls}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};
