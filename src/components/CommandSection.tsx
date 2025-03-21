// CommandSection.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Upload, FileText, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommandSection: React.FC = () => {
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
    <div className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Start Your Learning Journey</h2>
        <p className="text-center text-muted-foreground mb-8">
          Enter a command or upload a PDF, then choose a character to learn from!
        </p>

        <Card className="backdrop-blur-sm bg-background/80 border shadow-lg">
          <CardHeader>
            <CardTitle>Choose Your Learning Material</CardTitle>
            <CardDescription>
              We'll transform your content into an interactive learning experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="command" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="command">Command</TabsTrigger>
                <TabsTrigger value="upload">Upload PDF</TabsTrigger>
              </TabsList>
              <TabsContent value="command">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      value={command}
                      onChange={handleCommandChange}
                      placeholder="Type your learning command here..."
                      className="pr-10"
                    />
                    <Send className="h-4 w-4 absolute right-3 top-3 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Example: "Teach me about quantum physics" or "Explain the history of Renaissance art"
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="upload">
                <div className="space-y-4">
                  <label
                    htmlFor="pdf-upload"
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF (up to 10MB)
                    </p>
                    <Input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {file && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto"
                        onClick={() => setFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={handleProceed} size="lg">
                Choose Character
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default CommandSection;
