import React, { useState } from "react";
import { Input } from "@/components/ui/input"; 
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [command, setCommand] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleProceed = () => {
    navigate("/characters");
  };

  return (
    <div className="flex min-h-screen justify-center items-center p-6 font-sans">
      <div className="flex flex-col items-center">
        <Header 
          title="Welcome to PersonaEd" 
          subtitle="Enter a command or upload a PDF, then choose a character to learn from!" 
        />
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mt-6">
          <div className="mb-4">
            <label className="block text-gray-800 mb-2">Enter your command:</label>
            <Input 
              type="text" 
              value={command} 
              onChange={handleCommandChange} 
              placeholder="Type your command here..." 
              className="text-gray-800 border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2">Or upload a PDF:</label>
            <Input 
              type="file" 
              accept="application/pdf" 
              onChange={handleFileChange} 
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <CustomButton label="Proceed" onClick={handleProceed} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
