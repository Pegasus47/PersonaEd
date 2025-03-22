import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

const NavigationHeader: React.FC = () => {
  return (
    <motion.header
      className="w-full py-4 px-6 flex justify-between items-center border-b"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="text-2xl font-bold">
            PersonaEd
          </Link>
        </motion.div>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white opacity-100 rounded-md border">
              <ul className="grid gap-3 p-4 w-[400px]">
                <li>
                  <Link
                    to="/characters"
                    className={navigationMenuTriggerStyle()}
                  >
                    Characters
                  </Link>
                </li>
                <li>
                  <Link to="/quiz" className={navigationMenuTriggerStyle()}>
                    Quiz
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources"
                    className={navigationMenuTriggerStyle()}
                  >
                    Resources
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/about" className={navigationMenuTriggerStyle()}>
              About
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center space-x-4">
        <ModeToggle />
        <Button>Sign In</Button>
      </div>
    </motion.header>
  );
};

export default NavigationHeader;
