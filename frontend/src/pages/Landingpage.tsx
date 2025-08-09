import { Hero } from "../components/Hero";
import { VideoShowcase } from "../components/VideoShowcase";
import { FeatureHighlights } from "../components/FeatureHighlights";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
// import { ThemeToggle } from "../components/ThemeToggle";
import Navbar from "../components/Navbar";

const Landingpage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <Navbar />
      <div className="pt-16 "> 
        <Hero />
        <div id="demo">
          <VideoShowcase />
        </div>
        <div id="features">
          <FeatureHighlights />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <FinalCTA />
      </div>
    </div>
  );
};

export default Landingpage;