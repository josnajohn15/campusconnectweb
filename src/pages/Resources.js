import { useNavigate } from "react-router-dom";
import "./Resources.css";
import { motion } from "framer-motion"; 

function Resources() {
  const navigate = useNavigate();

  const goToClassPage = (className) => {
    navigate(`/class/${className}`);
  };

  return (
    <div className="next-page-container">
      <motion.h1 
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        📚 Select Your Class
      </motion.h1>

      <motion.p 
        className="description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Choose your class to explore subjects and resources.
      </motion.p>

      <motion.div 
        className="class-buttons"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map((className) => (
          <motion.button 
            key={className} 
            className="class-btn"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 123, 255, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToClassPage(className)}
          >
            {className}
          </motion.button>
        ))}
      </motion.div>

      <motion.button 
        className="back-btn"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
      >
        ⬅ Back to Home
      </motion.button>
    </div>
  );
}

export default Resources;
