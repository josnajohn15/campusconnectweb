import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ResourcePage.css"; 
import { motion } from "framer-motion"; 

const ResourcePage = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`https://campusconnectweb.onrender.com/resources/${subject}`);
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setError("⚠ Failed to fetch resources. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [subject]);

  return (
    <motion.div 
      className="resource-container"
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
        📂 Resources for <span className="subject-name">{subject}</span>
      </motion.h2>

      {loading ? (
        <motion.p 
          className="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ⏳ Fetching resources...
        </motion.p>
      ) : error ? (
        <motion.p 
          className="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      ) : resources.length > 0 ? (
        <motion.div 
          className="resources-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {resources.map((res, index) => (
            <motion.a 
              key={index} 
              className="resource-card"
              href={`https://campusconnectweb.onrender.com/${res.filePath}`} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="resource-icon">📄</div>
              <div className="resource-content">
                <b>{res.title}</b>
                <p className="desc">{res.description}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      ) : (
        <motion.p 
          className="no-resources"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ⚠ No resources available for this subject.
        </motion.p>
      )}

      <motion.button 
        className="back-btn"
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/resources")}
      >
        ⬅ Back to Classes
      </motion.button>
    </motion.div>
  );
};

export default ResourcePage;
