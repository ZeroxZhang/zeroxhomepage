"use client";

/**
 * 弹层外壳：邮箱 / 公众号 / 分类清单共用。
 * 无障碍约定：role=dialog、aria-modal、Escape 关闭、点击遮罩关闭、
 * 打开时焦点移入面板并锁定页面滚动。
 */
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { copy } from "@/lib/i18n";
import { useLocale } from "@/components/site/locale-provider";
import { CloseIcon } from "@/components/site/icons";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  wide?: boolean;
}

export const Dialog = ({
  open,
  onClose,
  labelledBy,
  children,
  wide = false,
}: DialogProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const { locale } = useLocale();
  const closeLabel = copy[locale].common.close;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const overlay = overlayRef.current;
    const inertState = new Map<HTMLElement, boolean>();
    for (const child of document.body.children) {
      if (!(child instanceof HTMLElement) || child === overlay) continue;
      inertState.set(child, child.inert);
      child.inert = true;
    }
    panelRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((element) => !element.hasAttribute("hidden"));
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      for (const [element, wasInert] of inertState) element.inert = wasInert;
      previous?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      data-dialog-overlay
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/80 backdrop-blur-sm motion-reduce:backdrop-blur-none"
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`animate-[dialog-in_0.2s_cubic-bezier(0.215,0.61,0.355,1)_both] motion-reduce:animate-none relative max-h-[82vh] w-full overflow-y-auto scrollbar-thin rounded-2xl border border-line bg-ink-soft p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(242,239,228,0.06)] sm:p-7 ${
          wide ? "max-w-[640px]" : "max-w-[420px]"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-3 top-3 inline-flex size-12 items-center justify-center rounded-full border border-line text-ivory-dim transition-colors hover:text-ivory sm:right-4 sm:top-4"
        >
          <CloseIcon className="size-4" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
