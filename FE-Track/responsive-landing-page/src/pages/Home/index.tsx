import Container from "@/components/Container";
import React from "react";
import HeroSection from "./HeroSection";
import AboutUsSection from "./AboutUsSection";
import ServicesSection from "./ServicesSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      {/* <AboutUsSection /> */}
      <ServicesSection />
    </div>
  );
};

export default Home;
