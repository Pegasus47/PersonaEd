import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const characters = [
  { 
    name: "Sherlock Holmes", 
    image: "https://source.unsplash.com/featured/400x300/?sherlock,holmes",
    specialty: "Deductive Reasoning"
  },
  { 
    name: "Darth Vader", 
    image: "https://source.unsplash.com/featured/400x300/?darth,vader",
    specialty: "Leadership & Strategy"
  },
  { 
    name: "Iron Man", 
    image: "https://source.unsplash.com/featured/400x300/?iron,man",
    specialty: "Technology & Innovation"
  },
  { 
    name: "Batman", 
    image: "https://source.unsplash.com/featured/400x300/?batman",
    specialty: "Detective Skills & Gadgets"
  },
  { 
    name: "Superman", 
    image: "https://source.unsplash.com/featured/400x300/?superman",
    specialty: "Ethics & Journalism"
  },
  { 
    name: "Spiderman", 
    image: "https://source.unsplash.com/featured/400x300/?spiderman",
    specialty: "Physics & Chemistry"
  },
  { 
    name: "Wonder Woman", 
    image: "https://source.unsplash.com/featured/400x300/?wonder,woman",
    specialty: "History & Diplomacy"
  },
  { 
    name: "Yoda", 
    image: "src/assets/images.jpeg",
    specialty: "Philosophy & Mindfulness"
  },
];

const CharacterSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleCharacterSelect = (characterName: string) => {
    // You might store the choice in state/context before proceeding
    navigate(`/learn/${characterName.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-2">Choose Your Learning Mentor</h2>
      <p className="text-center text-muted-foreground mb-8">
        Select a character to guide your personalized learning experience
      </p>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {characters.map((character, index) => (
          <motion.div
            key={character.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
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
                    <h3 className="text-xl font-bold mb-1">{character.name}</h3>
                    <p className="text-sm opacity-80">{character.specialty}</p>
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
      </motion.div>
    </div>
  );
};

export default CharacterSelection;
