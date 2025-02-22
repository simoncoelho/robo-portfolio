import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RobotModel from "./components/RobotModel";
import "./App.css";

function App() {
  const [animateJoints, setAnimateJoints] = useState(false);

  return (
    <div className="app-container">
      <header className="header">
        <nav>
          <ul>
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <div className="viewer">
        <Canvas camera={{ position: [3, 3, 3] }}>
          <ambientLight intensity={0.6} />
          <directionalLight intensity={0.8} position={[5, 10, 7.5]} />
          <OrbitControls />
          <RobotModel urdfPath="/assets/pf400_description/urdf/PF400.urdf" animateJoints={animateJoints} />
        </Canvas>
        <button
          className="toggle-button"
          onClick={() => setAnimateJoints((prev) => !prev)}
        >
          Toggle Joint Animation
        </button>
      </div>
    </div>
  );
}

export default App;