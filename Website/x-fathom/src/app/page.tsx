import FeaturesSection from "@/components/sections/FeaturesSection";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/HeroSection";
import JoinList from "@/components/sections/JoinList";
import Testimonial from "@/components/sections/Testimonial";

export default function Home() {
  return (
    <div >
      <HeroSection />
      <FeaturesSection />
      <Testimonial/>
      <JoinList/>
      <Footer/>
    </div>
  );
}


