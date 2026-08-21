// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import { GlowBackground } from "@/components/originkit/ui/hero-10/glow-background";
import { HeroContent } from "@/components/originkit/ui/hero-10/hero-content";
import { Navbar } from "@/components/originkit/ui/hero-10/navbar";
import { PixelBackground } from "@/components/originkit/ui/hero-10/pixel-background";
import { PrismStage } from "@/components/originkit/ui/hero-10/prism-stage";

export const Section16Hero = () => {
  const handleExploreAi = () => {
    /* navigation disabled in preview */ void 0;
  };

  const handleContactSales = () => {
    /* navigation disabled in preview */ void 0;
  };

  return (
    <section
      aria-label="Digup AI hero"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#091009]"
    >
      {/* Soft green atmosphere — matches Figma better than a hard linear gradient */}
      <GlowBackground />
      <PixelBackground />
      <PrismStage />

      {/* pointer-events-none so PrismStage (z-0) can receive hover; re-enable on UI */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen w-full flex-col items-center">
        <div className="pointer-events-auto w-full">
          <Navbar />
        </div>

        {/* Figma: copy block top ~263px under 63px nav ≈ ~200px content offset */}
        <div className="mt-33 flex w-full flex-1 flex-col items-center pb-12 max-w-[402px] ipad:max-w-[580px]">
          <HeroContent
            onExploreAi={handleExploreAi}
            onContactSales={handleContactSales}
          />
        </div>
      </div>
    </section>
  );
};
