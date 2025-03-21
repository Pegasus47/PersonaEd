// LandingPage.tsx
import React from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import NavigationHeader from "./components/NavigationHeader";
import HeroSection from "./components/HeroSection";
import CommandSection from "./components/CommandSection";
import FeaturesSection from "./components/FeaturesSection";
import CharacterPreview from "./components/CharacterPreview";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

const LandingPage: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen flex flex-col">
        <NavigationHeader />
        <main className="flex-grow">
          <HeroSection />
          <CommandSection />
          <FeaturesSection />
          <CharacterPreview />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;
