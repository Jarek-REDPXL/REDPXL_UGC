import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import Problem from "@/components/Problem";
import Work from "@/components/Work";
import Why from "@/components/Why";
import Process from "@/components/Process";
import Results from "@/components/Results";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <LogoStrip />
        <Problem />
        <Work />
        <Why />
        <Process />
        <Results />
        <Comparison />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
