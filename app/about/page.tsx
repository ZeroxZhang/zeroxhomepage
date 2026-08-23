import type { Metadata } from "next";
import { AboutContent } from "@/components/site/about-content";

export const metadata: Metadata = { title: "关于 · About" };

export default function AboutPage() {
  return <AboutContent />;
}
