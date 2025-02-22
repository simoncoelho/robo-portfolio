import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Backdrop, Box, Grid, OrbitControls, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Scanline, DotScreen, ASCII, Autofocus, DepthOfField, FXAA, GodRays, LensFlare, N8AO, Outline, Pixelation, Texture, Vignette } from "@react-three/postprocessing";
import { BlendFunction, LensDistortionEffect } from "postprocessing";
import RobotModel from "./components/RobotModel";
import Shelves from "./components/Shelves";
import "./App.css";
import { MeshBasicMaterial, MeshDepthMaterial, MeshMatcapMaterial, PointLight } from "three";
import Background from "three/src/renderers/common/Background.js";
import { AsciiEffect } from "three/examples/jsm/Addons.js";

function App() {
  // Define two example poses for the robot's joints.
  const poseA = {
    J1: 0,
    J2: 0,
    J3: 0,
    J4: 0,
    J5: 0,
    J6: 0,
  };

  const poseB = {
    J1: 0.5,
    J2: 1.0,
    J3: -0.5,
    J4: 0.75,
    J5: 0.2,
    J6: 0.8,
  };

  // Start with poseA.
  const [targetPose, setTargetPose] = useState(poseA);

  // Toggle between poseA and poseB.
  const togglePose = () => {
    if (Math.abs(targetPose.J1) < 0.001) {
      setTargetPose(poseB);
    } else {
      setTargetPose(poseA);
    }
  };

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
          <Sphere args={[0.08]} position={[0, 1.5, 0]}>
            <meshBasicMaterial color={"white"} />
            <pointLight intensity={5} color={"white"} />
          </Sphere>
          <Sphere args={[0.08]} position={[0, 1.5, 2]}>
            <meshBasicMaterial color={"white"} />
            <pointLight intensity={5} color={"white"} />
          </Sphere>
          <Sphere args={[0.08]} position={[0, 1.5, -2]}>
            <meshBasicMaterial color={"white"} />
            <pointLight intensity={5} color={"white"} />
          </Sphere>
          <OrbitControls />
          {/* Updated RobotModel receives targetJointPositions */}
          <RobotModel
            urdfPath="/assets/pf400_description/urdf/PF400.urdf"
            targetJointPositions={targetPose}
          />
          <Shelves />
          <EffectComposer>
            {/* You can add your postprocessing effects here */}
          </EffectComposer>
        </Canvas>
        <button
          className="toggle-button"
          onClick={togglePose}
        >
          Toggle Pose
        </button>
      </div>
    </div>
  );
}

export default App;