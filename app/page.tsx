import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import Problem from "@/components/Problem";
import Work from "@/components/Work";
import Why from "@/components/Why";
import Maths from "@/components/Maths";
import Process from "@/components/Process";
import Deliverables from "@/components/Deliverables";
import Results from "@/components/Results";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import Guarantee from "@/components/Guarantee";
import MeetTheTeam from "@/components/MeetTheTeam";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* 00 */}
        <Hero />
        <LogoStrip />
        {/* 01–13 — Clay-desaturated section canvases */}
        <Problem />
        <Work />
        <Why />
        <Maths />
        <Process />
        <Deliverables />
        <Results />
        <Comparison />
        <Pricing />
        <Guarantee />
        <MeetTheTeam />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
