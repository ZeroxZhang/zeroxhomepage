"use client";

/**
 * 语言状态（useSyncExternalStore + localStorage）：
 * - 默认中文；用户切换后持久化，同标签页内即时生效；
 * - 服务端快照固定为中文，水合后读取存储值，避免水合不一致；
 * - LocaleProvider 负责同步 <html lang>。
 */
import {
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "site-locale";

const listeners = new Set<() => void>();
const emit = () => {
  for (const listener of listeners) listener();
};

const readStored = (): Locale => {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // 存储不可用时保持默认
  }
  return DEFAULT_LOCALE;
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => readStored();
const getServerSnapshot = () => DEFAULT_LOCALE;

export const setLocale = (locale: Locale) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // 忽略存储失败
  }
  emit();
};

export const useLocale = (): { locale: Locale } => {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { locale };
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
};
