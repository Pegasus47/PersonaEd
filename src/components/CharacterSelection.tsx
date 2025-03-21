import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavigationHeader from "@/components/NavigationHeader";
import { Spinner } from "./LoadingSpinner";

const characters = [
  {
    name: "Harry Potter",
    image: "src/assets/np.jpg",
    specialty: null,
  },
  {
    name: "Star Wars",
    image: "src/assets/images.jpeg",
  },
  {
    name: "Marvel Universe",
    image: "src/assets/marvel.jpeg",
  },
  {
    name: "DC Universe",
    image: "src/assets/dc.jpeg",
  },
  {
    name: "Sherlock Holmes",
    image: "src/assets/sherlock.jpeg",
  },
  {
    name: "Star Trek",
    image: "src/assets/starTrek.jpeg",
  },
  {
    name: "Frozen",
    image: "src/assets/frozen.jpeg",
  },
  {
    name: "Family Guy",
    image: "src/assets/FamilyGuy.webp",
  },
];

const CharacterSelection: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCharacterSelect = (characterName: string) => {
    navigate(`/learn/${characterName.toLowerCase().replace(" ", "-")}`);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />

      <div className="container mx-auto px-6 py-24 flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-2">
            Choose Your Learning Mentor
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Select a character to guide your personalized learning experience
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {characters.map((character, index) => (
              <motion.div
                key={character.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full max-w-xs"
              >
                <Card className="overflow-hidden h-full border hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-video relative">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-bold mb-1">
                          {character.name}
                        </h3>
                        <p className="text-sm opacity-80">
                          {character.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <Button
                        className="w-full"
                        onClick={() => handleCharacterSelect(character.name)}
                      >
                        Choose Mentor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CharacterSelection;
