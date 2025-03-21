import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import CharacterSelection from "./components/CharacterSelection";
import CommandSection from "./components/CommandSection";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/characters" element={<CharacterSelection />} />
        <Route path="/chat" element={<CommandSection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
