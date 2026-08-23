import { getWorksData } from "@/lib/works";
import { BackgroundGrid } from "@/components/site/background-grid";
import Hero from "@/components/site/hero";
import { WorkSection } from "@/components/site/work-section";
import { SiteFooter } from "@/components/site/footer";

export default function Home() {
  const data = getWorksData();

  return (
    <>
      <BackgroundGrid />
      <Hero total={data.total} />
      <main className="relative z-10">
        <WorkSection data={data} />
      </main>
      <SiteFooter />
    </>
  );
}
