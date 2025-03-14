import { useNavigate, useParams } from "react-router-dom";
import "./Class.css"; 
import { motion } from "framer-motion"; 

// 📚 Subjects list mapped to each semester
const subjectsMapping = {
  S1: ["LINEAR ALGEBRA AND CALCULUS", "ENGINEERING PHYSICS", "ENGINEERING GRAPHICS", 
       "LIFE SKILLS", "ENGINEERING CHEMISTRY", "BASICS OF ELECTRICAL & MECHANICAL"],
  S2: ["ADVANCED CALCULUS", "MATERIAL SCIENCE", "PROGRAMMING IN C", 
       "ELECTRICAL CIRCUITS", "ENGINEERING ETHICS", "ENVIRONMENTAL STUDIES"],
  S3: ["DISCRETE MATH", "OBJECT ORIENTED PROGRAMMING", "DATA STRUCTURES", 
       "LOGIC DESIGN", "SUSTAINABLE ENGINEERING", "PROFESSIONAL ETHICS"],
  S4: ["COMPUTER ORGANIZATION", "GRAPH THEORY", "DATABASE SYSTEMS", 
       "OPERATING SYSTEMS", "CONSTITUTION OF INDIA", "DESIGN ENGINEERING"],
  S5: ["AUTOMATA THEORY", "SOFTWARE ENGINEERING", "MICROPROCESSORS", 
       "COMPUTER NETWORKS", "SYSTEM SOFTWARE", "DISASTER MANAGEMENT"],
  S6: ["COMPUTER GRAPHICS", "ALGORITHM ANALYSIS", "COMPILER DESIGN", 
       "ECONOMICS & FOREIGN TRADE", "PYTHON PROGRAMMING", "DATA ANALYTICS"],
  S7: ["NLP", "MACHINE LEARNING", "CLOUD COMPUTING", 
       "ARTIFICIAL INTELLIGENCE", "WEB PROGRAMMING", "COMPUTER GRAPHICS"],
  S8: ["DISTRIBUTED COMPUTING", "DATA MINING", "MOBILE COMPUTING", 
       "EMBEDDED SYSTEMS", "IOT", "PROGRAMMING PARADIGMS"]
};

const ClassPage = () => {
  const navigate = useNavigate();
  const { className } = useParams();
  const subjects = subjectsMapping[className] || [];

  const goToResourcePage = (subject) => {
    navigate(`/resources/${subject}`);
  };

  return (
    <motion.div 
      className="class-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📘 Subjects for {className}
      </motion.h2>

      <motion.p 
        className="description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Select a subject to access resources.
      </motion.p>

      <motion.div 
        className="subjects-container"
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {subjects.map((subject, index) => (
          <motion.button 
            key={index} 
            className="subject-btn"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0, 123, 255, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToResourcePage(subject)}
          >
            {subject}
          </motion.button>
        ))}
      </motion.div>

      <motion.button 
        className="back-btn"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/resources")}
      >
        ⬅ Back to Classes
      </motion.button>
    </motion.div>
  );
};

export default ClassPage;
