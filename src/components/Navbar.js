import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Campus Connect</h2>
      </div>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
        <span className={isOpen ? "bar open" : "bar"}></span>
      </div>
      <ul className={isOpen ? "navbar-links open" : "navbar-links"}>
        <li><Link to="/home" className="navbar-link">Home</Link></li>
        <li><Link to="/announcements" className="navbar-link">Announcements</Link></li>
        <li><Link to="/groupchats" className="navbar-link">Group Chats</Link></li>
        <li><Link to="/events" className="navbar-link">Events</Link></li>

        {/* Change Resources Link Based on User Role */}
        <li>
          <Link 
            to={username === "faculty" ? "/classespage" : "/resources"} 
            className="navbar-link"
          >
            Resources
          </Link>
        </li>

        <li><Link to="/chatbot" className="navbar-link">ChatBot</Link></li>
        <li><Link to="/logout" className="navbar-link logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
