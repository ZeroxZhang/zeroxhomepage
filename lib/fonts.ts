import { Cinzel, Geist, Instrument_Serif } from "next/font/google";

/**
 * 自托管字体（next/font）：
 * - Cinzel：罗马碑刻风格大写展示字，用于主标题与品牌标识；
 * - Instrument Serif：斜体衬线，用于拉丁格言行；
 * - Geist：界面无衬线正文。
 * 中文字体使用系统衬线栈（Songti SC / Noto Serif CJK SC），见 globals.css 的 --font-cjk。
 */

export const fontDisplay = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

export const fontSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

export const fontQuote = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
