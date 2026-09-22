import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BrochureReality from "@/components/BrochureReality";
import JourneyTimeline from "@/components/JourneyTimeline";

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="top">
        <Hero />
        <TrustBar />
        <BrochureReality />
        <JourneyTimeline />
      </main>
    </>
  );
}
