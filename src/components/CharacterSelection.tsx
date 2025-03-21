import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import NavigationHeader from "@/components/NavigationHeader";
import { Spinner } from "./LoadingSpinner";

const characters = [
  {
    name: "Harry Potter",
    image: "src/assets/np.jpg",
    specialty: "Magical Education",
  },
  {
    name: "Star Wars",
    image: "src/assets/images.jpeg",
    specialty: "Galactic History",
  },
  {
    name: "Marvel Universe",
    image: "src/assets/marvel.jpeg",
    specialty: "Superhero Science",
  },
  {
    name: "DC Universe",
    image: "src/assets/dc.jpeg",
    specialty: "Mythic Archetypes",
  },
  {
    name: "Sherlock Holmes",
    image: "src/assets/sherlock.jpeg",
    specialty: "Deductive Reasoning",
  },
  {
    name: "Star Trek",
    image: "src/assets/starTrek.jpeg",
    specialty: "Space Exploration",
  },
  {
    name: "Frozen",
    image: "src/assets/frozen.jpeg",
    specialty: "Nordic Culture",
  },
  {
    name: "Family Guy",
    image: "src/assets/FamilyGuy.webp",
    specialty: "Modern Satire",
  },
];

const CharacterSelection: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
          <h2 className="text-3xl font-bold text-center mb-2">Choose Your Learning Mentor</h2>
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
                <Link 
                  to={`/learn/${character.name.toLowerCase().replace(" ", "-")}`}
                  className="block h-full"
                >
                  <Card className="overflow-hidden h-full border hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div className="relative aspect-[3/4]">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                        <h3 className="text-xl font-bold mb-1">{character.name}</h3>
                        <p className="text-sm mb-2 font-medium">{character.specialty}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/characters"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors duration-300 text-sm"
            >
              Explore More Characters
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CharacterSelection;
