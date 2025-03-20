import React from "react";
import { Button } from "@/components/ui/button"; // Using shadcn's Button component

interface CustomButtonProps {
  label: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick }) => {
  return (
    <Button onClick={onClick} className="mt-4 px-6 py-2 text-lg">
      {label}
    </Button>
  );
};

export default CustomButton;
