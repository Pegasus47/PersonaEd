import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavigationHeader from "@/components/NavigationHeader";
import { backendUrl, generateSessionEndpoint } from "./utils/constants";
import { Volume2 } from "lucide-react";

interface Dialogue {
  speaker: string;
  pose: string;
  dialogue: string;
  blackboard: string;
}

const characterImages: Record<string, string> = {
  "Harry Potter": "src/assets/harryPotter.png",
  Hermione: "src/assets/hermione.png",
};

const ExplanationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedCharacter = searchParams.get("character") || "Harry Potter";
  const topic = localStorage.getItem("topic") || "default";
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchDialogues = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${backendUrl}${generateSessionEndpoint}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              topic_prompt: topic,
              character_1: selectedCharacter,
              character_2: "Hermione",
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        setDialogues(data.script || []);
      } catch (error) {
        console.error("Error fetching dialogues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDialogues();
  }, [topic, selectedCharacter]);

  useEffect(() => {
    const fetchVoice = async () => {
      if (!dialogues.length) return;
      const currentDialogue = dialogues[dialogueIndex];

      try {
        const response = await fetch(`${backendUrl}/session/generate-voice/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            character: currentDialogue.speaker,
            text: currentDialogue.dialogue,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate voice");
        }

        // Convert response stream to audio blob
        const audioBlob = await response.blob();
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      } catch (error) {
        console.error("Error fetching voice:", error);
      }
    };

    fetchVoice();
  }, [dialogueIndex, dialogues]);

  const handleNext = () =>
    setDialogueIndex((prev) => Math.min(prev + 1, dialogues.length - 1));
  const handlePrevious = () =>
    setDialogueIndex((prev) => Math.max(prev - 1, 0));

  const currentDialogue = dialogues[dialogueIndex];
  const isLeft = currentDialogue?.speaker === "Harry Potter";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavigationHeader />
      <div className="container mx-auto px-6 py-12 flex-grow flex flex-col">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Learning with {selectedCharacter}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-2xl font-bold">
            Loading dialogues...
          </div>
        ) : (
          <>
            <div className="flex-grow flex items-center justify-center gap-8 relative h-[600px]">
              {/* Character Image and Dialogue */}
              <motion.div
                initial={{ x: isLeft ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="relative z-10"
              >
                <img
                  src={characterImages[currentDialogue?.speaker]}
                  alt={currentDialogue?.speaker}
                  className="h-72 object-contain"
                />
                <AnimatePresence>
                  <motion.div
                    key={dialogueIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`absolute -top-30 ${
                      isLeft ? "left-0" : "right-0"
                    } w-xs`}
                  >
                    <Card className="p-4 bg-white/90 backdrop-blur-xs shadow-lg rounded-2xl relative ">
                      <p className="text-sm">{currentDialogue?.dialogue}</p>
                      <p className="text-xs text-gray-500">
                        ({currentDialogue?.pose})
                      </p>
                      {audioUrl && (
                        <button
                          onClick={() => {
                            const audio = new Audio(audioUrl);
                            audio.play();
                          }}
                          className="absolute bottom-2 right-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                        >
                          <Volume2 className="w-5 h-5 text-gray-700" />
                        </button>
                      )}
                      <div
                        className={`absolute -bottom-4 ${
                          isLeft ? "left-6" : "right-6"
                        } w-4 h-4 bg-white/90 rotate-45`}
                      />
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
                    {currentDialogue?.blackboard}
                  </pre>
                </div>
                <div className="absolute inset-0 bg-black/30 rounded-xl" />
              </motion.div>
            </div>

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
                disabled={dialogueIndex === dialogues.length - 1}
                className="rounded-full px-8 py-4 transition-all hover:scale-105 bg-primary hover:bg-primary/90"
              >
                Next →
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExplanationPage;
