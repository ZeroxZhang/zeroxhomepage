"use client";

/**
 * 联系弹层：
 * - email：展示邮箱，支持复制与 mailto；
 * - wechat：展示公众号名称与二维码。
 * 文案按当前语言取用（lib/i18n.ts）。
 */
import { useCallback, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site.config";
import { copy } from "@/lib/i18n";
import { useLocale } from "@/components/site/locale-provider";
import { Dialog } from "@/components/site/dialog";
import { SiteButton } from "@/components/site/button";
import {
  CheckIcon,
  CopyIcon,
  MailIcon,
  QrPlaceholderIcon,
} from "@/components/site/icons";

type Mode = "email" | "wechat" | null;

interface ContactDialogProps {
  mode: Mode;
  onClose: () => void;
}

const KICKER_CLASS =
  "flex items-center gap-2.5 font-sans text-[10px] uppercase tracking-[0.34em] text-brass";
const DIAMOND = (
  <span
    className="inline-block size-1 rotate-45 border border-brass bg-brass/40"
    aria-hidden="true"
  />
);

export const ContactDialog = ({ mode, onClose }: ContactDialogProps) => {
  const { locale } = useLocale();
  const c = copy[locale];
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // 剪贴板不可用时回退到系统邮件应用
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }, []);

  return (
    <Dialog
      open={mode !== null}
      onClose={onClose}
      labelledBy="contact-dialog-title"
    >
      {mode === "email" ? (
        <div className="flex flex-col items-center text-center">
          <p className={KICKER_CLASS}>
            {DIAMOND}
            CONTACT · {c.nav.contact}
            {DIAMOND}
          </p>
          <h2
            id="contact-dialog-title"
            className="mt-3 font-display text-[22px] font-bold tracking-[0.06em] text-ivory"
          >
            Write to me
          </h2>
          <p className="mt-5 break-all font-display text-[15px] font-semibold tracking-[0.04em] text-brass">
            {siteConfig.email}
          </p>
          <p className="mt-2 font-sans text-[12.5px] text-ivory-faint">
            {c.contact.emailNote}
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <SiteButton
              variant="secondary"
              onClick={handleCopy}
              icon={copied ? <CheckIcon /> : <CopyIcon />}
              className="w-full sm:w-auto"
            >
              {copied ? c.contact.copied : c.contact.copyEmail}
            </SiteButton>
            <SiteButton
              variant="primary"
              href={`mailto:${siteConfig.email}`}
              icon={<MailIcon />}
              className="w-full sm:w-auto"
            >
              {c.contact.sendEmail}
            </SiteButton>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <p className={KICKER_CLASS}>
            {DIAMOND}
            WECHAT · 微信公众号
            {DIAMOND}
          </p>
          <h2
            id="contact-dialog-title"
            className="mt-3 font-display text-[22px] font-bold tracking-[0.08em] text-ivory"
          >
            {siteConfig.wechat.name}
          </h2>

          {/* 二维码：黄铜角标框；未提供图时显示占位 */}
          <div className="relative mt-6 w-[210px] rounded-2xl border border-line bg-ink-card p-4">
            <span className="pointer-events-none absolute left-3 top-3 size-4 rounded-tl-md border-l border-t border-brass" aria-hidden="true" />
            <span className="pointer-events-none absolute right-3 top-3 size-4 rounded-tr-md border-r border-t border-brass" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-3 left-3 size-4 rounded-bl-md border-b border-l border-brass" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-3 right-3 size-4 rounded-br-md border-b border-r border-brass" aria-hidden="true" />
            {siteConfig.wechat.qrSrc ? (
              <Image
                src={siteConfig.wechat.qrSrc}
                alt={c.contact.qrAlt(siteConfig.wechat.name)}
                width={430}
                height={430}
                className="mx-auto block aspect-square w-full max-w-[178px] rounded-lg bg-white object-contain"
              />
            ) : (
              <div className="flex aspect-square flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-ivory-faint/60 text-ivory-faint">
                <QrPlaceholderIcon className="size-14" />
                <span className="font-sans text-[11px] tracking-[0.2em]">
                  二维码即将上线
                </span>
              </div>
            )}
          </div>

          <p className="mt-5 max-w-[260px] font-sans text-[12.5px] leading-relaxed text-ivory-dim">
            {c.contact.wechatHint}
          </p>
        </div>
      )}
    </Dialog>
  );
};
