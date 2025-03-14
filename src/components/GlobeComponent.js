import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const RotatingAsteroid = () => {
  const asteroidRef = useRef();

  useFrame(() => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.y += 0.01;
      asteroidRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={asteroidRef} position={[2, 1, -5]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

const GlobeComponent = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      {/* Stars in the background */}
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

      {/* Globe */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Asteroids */}
      <RotatingAsteroid />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />

      {/* Camera Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default GlobeComponent;
