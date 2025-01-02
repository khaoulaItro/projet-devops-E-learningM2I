import React, { useState } from "react";
import Sidebar from "./Sidebar2";
import Topbar from "../etudiant/topBar";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { motion } from "framer-motion";
import "./QuizPage.css";

const QuizPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const subjects = [
   {
      name: "DevOps",
      image: "https://th.bing.com/th/id/OIP.eANRmne2w3FOdsss8lJkXAHaEK?rs=1&pid=ImgDetMain",
    },
    {
      name: "JavaScript",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    },
    {
      name: "Java",
      image: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
    },
    {
      name: "PHP",
      image: "https://cdn-icons-png.flaticon.com/512/919/919830.png",
    },
    {
      name: "C",
      image: "https://cdn-icons-png.flaticon.com/512/6132/6132222.png",
    },
    {
      name: "Python",
      image: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
    },
    
  ];

 const quizData = {
  JavaScript: [
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Google", "Apple"],
      answer: "Netscape",
     },
    
    {
      question: "What is the keyword for declaring a variable in JavaScript?",
      options: ["var", "let", "const", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "Which type of language is JavaScript?",
      options: ["Programming", "Scripting", "Markup", "None of the above"],
      answer: "Scripting",
    },
    {
      question: "What is the correct syntax to print something in the console?",
      options: ["console.log()", "print()", "log()", "console.print()"],
      answer: "console.log()",
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "/* */", "#", "Both // and /* */"],
      answer: "Both // and /* */",
    },
    {
      question: "Which JavaScript method is used to parse JSON strings?",
      options: ["JSON.stringify", "JSON.parse", "JSON.encode", "JSON.decode"],
      answer: "JSON.parse",
    },
  ],
  Java: [
    {
      question: "Which is a valid keyword in Java?",
      options: ["interface", "string", "Float", "unsigned"],
      answer: "interface",
    },
    {
      question: "Which company developed Java?",
      options: ["Oracle", "Sun Microsystems", "Microsoft", "IBM"],
      answer: "Sun Microsystems",
    },
    {
      question: "Which of the following is a primitive type in Java?",
      options: ["int", "Integer", "String", "Object"],
      answer: "int",
    },
    {
      question: "Which method is the entry point of a Java program?",
      options: ["main()", "start()", "run()", "init()"],
      answer: "main()",
    },
    {
      question: "What is used to handle exceptions in Java?",
      options: ["try-catch", "if-else", "switch-case", "for loop"],
      answer: "try-catch",
    },
  ],
  PHP: [
    {
      question: "What does PHP stand for?",
      options: [
        "Personal Home Page",
        "Private Hypertext Processor",
        "PHP Hypertext Preprocessor",
        "Programming Home Page",
      ],
      answer: "PHP Hypertext Preprocessor",
    },
    {
      question: "Which symbol is used to define a variable in PHP?",
      options: ["@", "$", "#", "&"],
      answer: "$",
    },
    {
      question: "Which PHP function is used to include files?",
      options: ["include", "require", "Both include and require", "import"],
      answer: "Both include and require",
    },
    {
      question: "What does isset() function do in PHP?",
      options: [
        "Checks if a variable is set",
        "Checks if a variable is empty",
        "Checks if a variable is undefined",
        "None of the above",
      ],
      answer: "Checks if a variable is set",
    },
    {
      question: "What is the default port for MySQL?",
      options: ["3306", "8080", "80", "1433"],
      answer: "3306",
    },
  ],
  C: [
    {
      question: "Which of the following is a valid C variable name?",
      options: ["int", "float", "_variable", "None of the above"],
      answer: "_variable",
    },
    {
      question: "Which header file is used for input/output in C?",
      options: ["stdio.h", "stdlib.h", "math.h", "string.h"],
      answer: "stdio.h",
    },
    {
      question: "Which symbol is used for comments in C?",
      options: ["//", "/* */", "#", "Both // and /* */"],
      answer: "Both // and /* */",
    },
    {
      question: "Which function is used to print text in C?",
      options: ["printf()", "print()", "cout", "println()"],
      answer: "printf()",
    },
    {
      question: "Which operator is used to access memory addresses?",
      options: ["&", "*", "%", "@"],
      answer: "&",
    },
  ],
  Python: [
    {
      question: "Which of the following is used to define a function in Python?",
      options: ["def", "func", "function", "lambda"],
      answer: "def",
    },
    {
      question: "What is the output of: print(2 ** 3)?",
      options: ["6", "8", "9", "None of the above"],
      answer: "8",
    },
    {
      question: "Which data type is immutable in Python?",
      options: ["List", "Set", "Dictionary", "Tuple"],
      answer: "Tuple",
    },
    {
      question: "How do you create a list in Python?",
      options: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "<1, 2, 3>"],
      answer: "[1, 2, 3]",
    },
    {
      question: "Which library is used for data manipulation in Python?",
      options: ["numpy", "pandas", "matplotlib", "scipy"],
      answer: "pandas",
    },
   ],
  DevOps: [
    {
      question: "What does CI stand for in DevOps?",
      options: ["Continuous Integration", "Critical Integration", "Code Integration", "None of the above"],
      answer: "Continuous Integration",
    },
    {
      question: "What is the primary purpose of a Docker container?",
      options: [
        "Virtualize hardware",
        "Encapsulate applications and dependencies",
        "Run operating systems",
        "Manage databases",
      ],
      answer: "Encapsulate applications and dependencies",
    },
    {
      question: "What tool is used for container orchestration?",
      options: ["Kubernetes", "Git", "Jenkins", "Maven"],
      answer: "Kubernetes",
    },
    {
      question: "Which command is used to check the status of a Git repository?",
      options: ["git init", "git commit", "git status", "git branch"],
      answer: "git status",
    },
    {
      question: "What is the purpose of Ansible in DevOps?",
      options: [
        "Source code management",
        "Infrastructure automation",
        "Monitoring services",
        "Continuous delivery",
      ],
      answer: "Infrastructure automation",
    },
    {
      question: "Which tool is used for monitoring in DevOps?",
      options: ["Prometheus", "Docker", "Terraform", "Git"],
      answer: "Prometheus",
    },
    {
      question: "Which command is used to build an image in Docker?",
      options: ["docker run", "docker build", "docker ps", "docker start"],
      answer: "docker build",
    },
    {
      question: "What is the purpose of Jenkins in DevOps?",
      options: [
        "Continuous integration and delivery",
        "Virtual machine management",
        "Container orchestration",
        "Code linting",
      ],
      answer: "Continuous integration and delivery",
    },
    {
      question: "What does YAML stand for?",
      options: [
        "Yet Another Markup Language",
        "YAML Ain't Markup Language",
        "Your Application Markup Language",
        "None of the above",
      ],
      answer: "YAML Ain't Markup Language",
    },
    {
      question: "Which cloud provider is not a part of the major three?",
      options: ["AWS", "Azure", "Google Cloud", "DigitalOcean"],
      answer: "DigitalOcean",
    },
    {
      question: "What is the purpose of Terraform in DevOps?",
      options: [
        "Infrastructure as Code",
        "Continuous Integration",
        "Monitoring services",
        "Building containers",
      ],
      answer: "Infrastructure as Code",
    },
    {
      question: "What is Helm used for in Kubernetes?",
      options: [
        "Container runtime",
        "Package management",
        "Service discovery",
        "Load balancing",
      ],
      answer: "Package management",
    },
    {
      question: "What does CD stand for in DevOps?",
      options: ["Code Delivery", "Continuous Deployment", "Container Development", "Critical Delivery"],
      answer: "Continuous Deployment",
    },
    {
      question: "Which tool is commonly used for log management in DevOps?",
      options: ["ELK Stack", "Kubernetes", "Terraform", "Docker"],
      answer: "ELK Stack",
    },
    {
      question: "What is the primary purpose of Grafana?",
      options: [
        "Code versioning",
        "Infrastructure management",
        "Data visualization and monitoring",
        "Container orchestration",
      ],
      answer: "Data visualization and monitoring",
    },
    {
      question: "What is the purpose of the command `kubectl get pods`?",
      options: [
        "Deploy an application",
        "Check the status of pods",
        "Delete a pod",
        "Restart a pod",
      ],
      answer: "Check the status of pods",
    },
    {
      question: "What is the difference between CI and CD?",
      options: [
        "CI focuses on code integration, while CD focuses on deployment",
        "CI is for monitoring, while CD is for automation",
        "CI is for orchestration, while CD is for logging",
        "They are the same",
      ],
      answer: "CI focuses on code integration, while CD focuses on deployment",
    },
    {
      question: "Which tool is used to deploy serverless applications?",
      options: ["AWS Lambda", "Terraform", "Docker", "Jenkins"],
      answer: "AWS Lambda",
    },
    {
      question: "What is the role of a reverse proxy in DevOps?",
      options: [
        "Route client requests to backend services",
        "Store database backups",
        "Perform unit tests",
        "Monitor application performance",
      ],
      answer: "Route client requests to backend services",
    },
    {
      question: "What is the primary benefit of microservices architecture?",
      options: [
        "Ease of scaling and deployment",
        "Centralized codebase",
        "Single point of failure",
        "Tightly coupled systems",
      ],
      answer: "Ease of scaling and deployment",
    },
  ],

};


  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject);
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setNumberOfQuestions(0); // Réinitialisation du nombre de questions
  };

  const startQuiz = () => {
    setShowQuiz(true);
  };

  const handleOptionSelect = (selectedOption) => {
    const currentQuestion =
      quizData[selectedSubject]?.[currentQuestionIndex] || null;

    if (currentQuestion && selectedOption === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (
      currentQuestionIndex + 1 <
      Math.min(quizData[selectedSubject]?.length || 0, numberOfQuestions)
    ) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResults(true);
      setShowAlert(true); // Afficher l'alert
    }
  };

  const handleBackToSubjects = () => {
    setSelectedSubject("");
    setShowQuiz(false);
  };

  return (
    <div className="container-fluid p-0">
      <Topbar />
      <div className="row no-gutters">
        <div className="col-md-2 col-12 position-fixed" style={{ height: "100vh", zIndex: 1000 }}>
          <Sidebar />
        </div>
        <div className="col-md-10 offset-md-2 col-12">
          <Box sx={{ padding: "30px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Typography variant="h4" gutterBottom>
              Quiz Platform
            </Typography>

            {!selectedSubject && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Select a subject to start the quiz:
                </Typography>
                <Grid container spacing={3} mt={2}>
                  {subjects.map((subject) => (
                    <Grid item xs={12} sm={6} md={4} key={subject.name}>
                      <Card
                        sx={{
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          "&:hover": { transform: "scale(1.05)" },
                          transition: "0.3s",
                        }}
                        onClick={() => handleSubjectSelection(subject.name)}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={subject.image}
                          alt={subject.name}
                        />
                        <CardContent>
                          <Typography variant="h6" textAlign="center">
                            {subject.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {selectedSubject && !showQuiz && (
              <Box mt={3}>
                <Typography variant="h5" gutterBottom>
                  Selected Subject: {selectedSubject}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Select the number of questions:
                </Typography>
                <Slider
                  value={numberOfQuestions}
                  onChange={(e, value) => setNumberOfQuestions(value)}
                  step={1}
                  marks
                  min={1}
                  max={quizData[selectedSubject]?.length || 0}
                  valueLabelDisplay="on"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startQuiz}
                  disabled={numberOfQuestions === 0}
                  sx={{ mt: 3 }}
                >
                  Start Quiz
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleBackToSubjects}
                  sx={{ mt: 3, ml: 2 }}
                >
                  Back to Subjects
                </Button>
              </Box>
            )}

            {showQuiz && !showResults && (
              <Box>
                <Typography variant="h6">
                  Question {currentQuestionIndex + 1} of {numberOfQuestions}
                </Typography>
                <Typography variant="body1" mt={2}>
                  {quizData[selectedSubject]?.[currentQuestionIndex]?.question}
                </Typography>
                <RadioGroup>
                  {quizData[selectedSubject]?.[currentQuestionIndex]?.options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                        onClick={() => handleOptionSelect(option)}
                      />
                    )
                  )}
                </RadioGroup>
              </Box>
            )}

          {showAlert && (
  <motion.div
    initial={{ opacity: 0, y: "100%" }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="quiz-results-container"
  >
    <div className="quiz-results">
      {/* Confetti Animation */}
      <div className="confetti"></div>
      
      {/* Quiz Result Text */}
      {score === numberOfQuestions ? (
        // حالة النجاح
        <>
          <Typography variant="h5" className="success">
            🎉 Quiz Completed! 🎉
          </Typography>
          <Typography variant="h6">
            Your score: {score} / {numberOfQuestions}
          </Typography>
        </>
      ) : (
        // حالة الفشل
        <>
          <Typography variant="h5" className="failed">
            Oops! Try Again 😅
          </Typography>
          <Typography variant="h6">
            Your score: {score} / {numberOfQuestions}
          </Typography>
        </>
      )}

      {/* Back Button */}
      <Button
        className="back-btn"
        onClick={() => {
          setShowAlert(false);
          setShowResults(false);
          handleBackToSubjects();
        }}
      >
        Back to Subjects
      </Button>
    </div>
  </motion.div>
)}

          </Box>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
