import { useNavigate, useParams } from "react-router-dom";
import "./Class.css"; 
import { motion } from "framer-motion"; 

// 📚 Subjects list mapped to each semester
const subjectsMapping = {
  S1: ["LINEAR ALGEBRA AND CALCULUS", "ENGINEERING PHYSICS A", "ENGINEERING GRAPHICS", "LIFE SKILLS", "ENGINEERING CHEMISTRY"],
  S2: ["LINEAR ALGEBRA AND CALCULUS", "ENGINEERING MECHANICS", "BASICS OF ELECTRICAL & ELECTRONICS", "BASICS OF CIVIL & MECHANICAL"],
  S3: ["Discrete Mathematical Structures", "Data Structures", "Logic System Design", "Professional Ethics"],
  S4: ["COMPUTER ORGANISATION & ARCHITECTURE", "DATABASE MANAGEMENT SYSTEMS", "OPERATING SYSTEMS", "GRAPH THEORY"],
  S5: ["FORMAL LANGUAGES & AUTOMATA THEORY", "COMPUTER NETWORKS", "SYSTEM SOFTWARE", "DISASTER MANAGEMENT"],
  S6: ["COMPUTER GRAPHICS", "ALGORITHM ANALYSIS & DESIGN", "DATA ANALYTICS", "PROGRAMMING IN PYTHON"],
  S7: ["NATURAL LANGUAGE PROCESSING", "MACHINE LEARNING", "CLOUD COMPUTING", "ARTIFICIAL INTELLIGENCE"],
  S8: ["DISTRIBUTED COMPUTING", "DATA MINING", "MOBILE COMPUTING", "INTERNET OF THINGS"],
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
