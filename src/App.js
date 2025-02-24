import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Bloom, EffectComposer, Glitch } from "@react-three/postprocessing";
import Shelves from "./components/Shelves"; // optional component, remove if you don’t need it
import RobotModel from "./components/RobotModel";
import "./App.css";
import HeaderBar from "./components/HeaderBar";

function App() {
    // Poses
    const poseA = { J1: 0,    J2: 0,   J3: 0.2,   J4: 0,   J5: 0,   J6: 0 };
    const poseB = { J1: 0.5,  J2: 1.0, J3: 0.16, J4: 0.75, J6: 0.8 };
    const poseC = { J1: 0.3, J2: 0.8, J3: 0.0,  J4: -1.0, J6: -0.2 };
    const closeGripper = { J5: 0.03};
    const openGripper = { J5: 0.065};
    
  
    const [poseSequence, setPoseSequence] = useState([]);
  
    const handleStartSequence = () => {
      // Pass the entire array directly to RobotModel
      setPoseSequence([poseA, openGripper, poseB, poseC, closeGripper, poseA, openGripper, poseC]);
    };
  
  // Called when the last pose finishes
  const handleSequenceComplete = () => {
    console.log("Sequence complete!");
    // Optionally reset if you want to be able to trigger it again:
    // setSequencePoses([]);
  };

    // Called by Shelves when a box is clicked
    const handleBoxClicked = (boxIndex) => {
      console.log("Box clicked:", boxIndex);
  
      // For instance, you can load different sequences depending on which box
      if (boxIndex === 0) {
        setPoseSequence([poseA, poseB, poseC]);
      } else if (boxIndex === 1) {
        setPoseSequence([poseC, poseB, poseA]);
      } else {
        setPoseSequence([poseA]); // just do one pose
      }
    };
  

  return (
    <div className="app-container">
      <HeaderBar />

      <div className="viewer">
        <Canvas camera={{ position: [0, .7, 5], fov: 60, }} style={{ background: "#000" } }>
          {/* OrbitControls with no autoRotate */}
          <OrbitControls 
            autoRotate={false}
            // Optionally limit how close/far you can zoom
            minDistance={0.5}
            maxDistance={5}
          />

          {/* Some test spheres for lighting/visual reference */}
          <Sphere args={[0.08]} position={[0, 3, 1]}>
            <meshBasicMaterial color="white" />
            <pointLight intensity={1} color="white" />
          </Sphere>

        {/* RobotModel with internal sequence handling */}
          <RobotModel
            urdfPath="/assets/pf400_description/urdf/PF400.urdf"
            poseSequence={poseSequence}
            onSequenceComplete={handleSequenceComplete}
          />

          {/* Shelves is optional; remove if you don’t need it */}
          <Shelves onItemClick={handleBoxClicked}/>
        </Canvas>

        {/* Button to start the sequence */}
      </div>
      {/* <button onClick={handleStartSequence} style={{ marginTop: "1rem" }}>
        Start Sequence
      </button> */}
    </div>

  );
}

export default App;