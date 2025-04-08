import React from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <ParticleBackground />

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to <span>Campus Connect</span></h1>
        <p>Your all-in-one student collaboration platform.</p>
      </div>

      {/* Features Section */}
      <div className="features">
        <FeatureCard emoji="📢" title="Announcements" description="Stay updated with important campus updates and events." />
        <FeatureCard emoji="💬" title="Group Chats" description="Join discussions for your courses, clubs, and groups." />
        <FeatureCard emoji="📅" title="Event Management" description="Keep track of upcoming university events and activities." />
        <FeatureCard emoji="📂" title="Resource Sharing" description="Access and share notes, books, and study materials." />
        <FeatureCard emoji="🤖" title="AI Chatbot" description="Get instant answers to your campus-related questions." />
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Campus Connect. All Rights Reserved.</p>
        <div>
          <Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ emoji, title, description }) => {
  return (
    <div className="feature-card">
      <span className="emoji">{emoji}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Home;
