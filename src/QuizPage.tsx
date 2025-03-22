import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavigationHeader from "@/components/NavigationHeader";

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center h-12 w-12">
    <svg
      className="animate-spin h-8 w-8 text-primary"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </div>
);


const Option: React.FC<{ option: string; isSelected: boolean; onSelect: () => void }> = ({ option, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`p-4 cursor-pointer transition-all ${
          isSelected
            ? "border-blue-500 bg-primary/10"
            : "hover:border-primary/50"
        }`}
        onClick={onSelect}
      >
        <p className="text-lg">{option}</p>
      </Card>
    </motion.div>
  );
};

const quizData = [
  {
    question: "Who is Pythagoras?",
    options: [
      "A Greek philosopher",
      "A Roman emperor",
      "An Egyptian pharaoh"
    ],
    correct_answer: "A Greek philosopher"
  },
  {
    question: "What is the name of the theorem associated with Pythagoras?",
    options: [
      "Theorem of Euclid",
      "Theorem of Archimedes",
      "Pythagorean Theorem"
    ],
    correct_answer: "Pythagorean Theorem"
  },
  {
    question: "In which century did Pythagoras live?",
    options: [
      "5th century BC",
      "10th century AD",
      "15th century AD"
    ],
    correct_answer: "5th century BC"
  }
];

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === quizData[currentQuestion].correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 to-secondary/10">
      <NavigationHeader />
      
      <div className="container mx-auto px-6 py-12 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="backdrop-blur-sm bg-background/80 border shadow-lg p-6">
            {!showResults ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >

                  <h1 className="text-3xl font-bold mb-8">
                    {quizData[currentQuestion].question}
                  </h1>

                  <div className="grid gap-4 mb-8">
                    {quizData[currentQuestion].options.map((option) => (
                      <Option
                        key={option}
                        option={option}
                        isSelected={selectedAnswer === option}
                        onSelect={() => handleAnswerSelect(option)}
                      />
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleNext}
                      disabled={!selectedAnswer}
                      className="rounded-full px-8 py-4 text-lg"
                    >
                      {currentQuestion === quizData.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <h1 className="text-4xl font-bold mb-4">Quiz Complete! 🎉</h1>
                <p className="text-2xl mb-8">
                  You scored {score} out of {quizData.length}
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setScore(0);
                      setShowResults(false);
                      setSelectedAnswer(null);
                    }}
                    className="rounded-full px-8 py-4 text-lg"
                  >
                    Try Again
                  </Button>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
