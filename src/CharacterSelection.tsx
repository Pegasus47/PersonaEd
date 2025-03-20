import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CharacterCard from "@/components/CharacterCard";

const characters = [
  { 
    name: "Sherlock Holmes", 
    image: "https://source.unsplash.com/featured/400x300/?sherlock,holmes" 
  },
  { 
    name: "Darth Vader", 
    image: "https://source.unsplash.com/featured/400x300/?darth,vader" 
  },
  { 
    name: "Iron Man", 
    image: "https://source.unsplash.com/featured/400x300/?iron,man" 
  },
  { 
    name: "Batman", 
    image: "https://source.unsplash.com/featured/400x300/?batman" 
  },
  { 
    name: "Superman", 
    image: "https://source.unsplash.com/featured/400x300/?superman" 
  },
  { 
    name: "Spiderman", 
    image: "https://source.unsplash.com/featured/400x300/?spiderman" 
  },
  { 
    name: "Wonder Woman", 
    image: "https://source.unsplash.com/featured/400x300/?wonder,woman" 
  },
  { 
    name: "Yoda", 
    image: "https://source.unsplash.com/featured/400x300/?yoda" 
  },
];

const CharacterSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleCharacterSelect = (characterName: string) => {
    // You might store the choice in state/context before proceeding
    alert(`You selected ${characterName}!`);
    // Navigate to next step or back to home for now
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-sky-200 flex flex-col items-center p-6">
      <Header 
        title="Choose Your Mentor" 
        subtitle="Select a movie/series character to learn from" 
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            name={character.name}
            image={character.image}
            onSelect={() => handleCharacterSelect(character.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;
