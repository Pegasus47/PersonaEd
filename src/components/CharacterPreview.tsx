// CharacterPreview.tsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Mock character data
const characters = [
  {
    id: 1,
    name: "Professor Maxwell",
    specialty: "Science & Physics",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Aria the Artist",
    specialty: "Arts & Humanities",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Tech Wizard",
    specialty: "Computer Science",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Historian Helena",
    specialty: "History & Culture",
    color: "bg-amber-500",
  },
];

const CharacterPreview: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Meet Your Learning Characters</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose from a variety of AI characters, each with unique teaching styles
          and expertise in different subjects.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character, index) => (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden h-full border hover:shadow-lg transition-all duration-300">
              <div className={`${character.color} h-3`}></div>
              <CardContent className="p-6">
                <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto border-4 border-background shadow-lg w-28 h-28">
                  <div className={`w-full h-full ${character.color} opacity-70 flex items-center justify-center text-white text-2xl font-bold`}>
                    {character.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-1">{character.name}</h3>
                <p className="text-center text-muted-foreground mb-4">{character.specialty}</p>
                <Button className="w-full" variant="outline" asChild>
                  <Link to={`/characters/${character.id}`}>Choose Character</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button size="lg" asChild>
          <Link to="/characters">View All Characters</Link>
        </Button>
      </div>
    </div>
  );
};

export default CharacterPreview;
