import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BrochureReality from "@/components/BrochureReality";
import JourneyTimeline from "@/components/JourneyTimeline";
import Testimonial from "@/components/Testimonial";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="top" className="flex-1">
        <Hero />
        <TrustBar />
        <BrochureReality />
        <JourneyTimeline />
        <Testimonial />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
