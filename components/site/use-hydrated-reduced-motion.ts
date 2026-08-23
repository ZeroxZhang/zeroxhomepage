"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * 保证服务端与客户端首帧都按普通动效渲染，水合完成后再应用用户偏好，
 * 避免 prefers-reduced-motion 让 Motion 的初始 style 产生水合不一致。
 */
export const useHydratedReducedMotion = () => {
  const prefersReducedMotion = useReducedMotion() === true;
  const hydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  return hydrated && prefersReducedMotion;
};
