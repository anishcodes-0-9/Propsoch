import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Differentiators from "@/components/Differentiators";
import BrochureReality from "@/components/BrochureReality";
import JourneyTimeline from "@/components/JourneyTimeline";
import RealStories from "@/components/RealStories";
import FeaturedIn from "@/components/FeaturedIn";
import FinalCta from "@/components/FinalCta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="top" className="flex-1">
        <Hero />
        <TrustBar />
        <Differentiators />
        <BrochureReality />
        <JourneyTimeline />
        <RealStories />
        <FeaturedIn />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
