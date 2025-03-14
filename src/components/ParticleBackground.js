import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import React from "react";


const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine); // Load the slim version
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#000", // Background color
        },
        particles: {
          number: {
            value: 100, // Number of particles
          },
          color: {
            value: "#ffffff", // Particle color
          },
          shape: {
            type: "circle", // Shape of particles
          },
          opacity: {
            value: 0.7,
            random: true,
          },
          size: {
            value: { min: 1, max: 3 }, // Random size variation
          },
          move: {
            enable: true, // Enable movement
            speed: 1, // Speed of movement
            direction: "none", // Random movement direction
            random: true,
            straight: false,
            outModes: {
              default: "bounce", // Bounces back instead of disappearing
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Particles move away when hovered
            },
            onClick: {
              enable: true,
              mode: "push", // Adds more particles on click
            },
          },
          modes: {
            repulse: {
              distance: 100,
            },
            push: {
              quantity: 4,
            },
          },
        },
      }}
    />
  );
};

export default ParticleBackground;
