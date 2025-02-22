import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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
        <Canvas
          camera={{ position: [3, -1, 3] }}
          style={{ background: "#000000" }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight intensity={1} position={[-5, 10, 7.5]} />
          <OrbitControls />
          <RobotModel
            urdfPath="/assets/pf400_description/urdf/PF400.urdf"
            animateJoints={animateJoints}
          />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={.9}
              intensity={10}
            />
          </EffectComposer>
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