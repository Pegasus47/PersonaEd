import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavigationHeader from "@/components/NavigationHeader";

const dummyDialogues = [
  { 
    character1: "Welcome to the magical world of learning! 🧙♂️", 
    character2: "Muggles and wizards alike are welcome here! 📚",
    blackboard: "Today's Lesson: Fundamentals of Spellcasting"
  },
  { 
    character1: "First, you'll need to understand the basic incantations...",
    character2: "Don't forget proper wand movement is crucial!",
    blackboard: "1. Pronunciation\n2. Wand Motion\n3. Intent"
  },
  { 
    character1: "Remember, practice makes permanent!",
    character2: "Let's try our first spell together!",
    blackboard: "Practicum:\nLumos - Light Creation Charm"
  },
];

const ExplanationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedCharacter = searchParams.get("character") || "Harry Potter";
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const handleNext = () => setDialogueIndex(prev => Math.min(prev + 1, dummyDialogues.length - 1));
  const handlePrevious = () => setDialogueIndex(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavigationHeader />
      
      <div className="container mx-auto px-6 py-12 flex-grow flex flex-col">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Learning with {selectedCharacter}
        </h2>

        {/* Character Scene */}
        <div className="flex-grow flex items-center justify-center gap-8 relative h-[600px]">
          
          {/* Left Character */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative z-10"
          >
            <img 
              src="src/assets/harryPotter.png" 
              alt="Harry" 
              className="h-72 object-contain" 
            />
            
            {/* Speech Bubble */}
            <AnimatePresence>
              <motion.div
                key={dialogueIndex + "left"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-20 left-0 right-0"
              >
                <Card className="p-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl relative max-w-xs">
                  <p className="text-sm">{dummyDialogues[dialogueIndex].character1}</p>
                  <div className="absolute -bottom-4 left-6 w-4 h-4 bg-white/90 rotate-45" />
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Blackboard */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-[700px] h-[400px] bg-[url('/blackboard-texture.jpg')] bg-cover rounded-xl shadow-2xl border-8 border-slate-700"
          >
            <div className="p-8 h-full flex items-center justify-center">
              <pre className="text-2xl font-bold text-blue font-mono whitespace-pre-wrap text-center">
                {dummyDialogues[dialogueIndex].blackboard}
              </pre>
            </div>
            <div className="absolute inset-0 bg-black/30 rounded-xl" />
          </motion.div>

          {/* Right Character */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative z-10"
          >
            <img 
              src="src/assets/hermione.png" 
              alt="Hermione" 
              className="h-72 object-contain" 
            />
            
            {/* Speech Bubble */}
            <AnimatePresence>
              <motion.div
                key={dialogueIndex + "right"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-20 right-0 left-0"
              >
                <Card className="p-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl relative max-w-xs ml-auto">
                  <p className="text-sm">{dummyDialogues[dialogueIndex].character2}</p>
                  <div className="absolute -bottom-4 right-6 w-4 h-4 bg-white/90 rotate-45" />
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            disabled={dialogueIndex === 0}
            className="rounded-full px-8 py-4 transition-all hover:scale-105"
          >
            ← Previous
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={dialogueIndex === dummyDialogues.length - 1}
            className="rounded-full px-8 py-4 transition-all hover:scale-105 bg-primary hover:bg-primary/90"
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationPage;
