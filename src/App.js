import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import Shelves from "./components/Shelves"; // optional component, remove if you don’t need it
import RobotModel from "./components/RobotModel";
import "./App.css";
import HeaderBar from "./components/HeaderBar";

function App() {
    // Poses
    // J1 height, J6 rail, J5 gripper
    const poseAbout = { J1: .34,    J2: 0.17,   J3: 1.2,   J4: .22,   J5: 0.1,   J6: -.5 };
    const poseAboutSafe = { J1: .34,    J2: -0.35,   J3: 1.67,   J4: .23,   J5: 0.1,   J6: -.5 };
    const poseProjects = { J1: .34,    J2: 0.17,   J3: 1.2,   J4: .22,   J5: 0.1,   J6: -1 };
    const poseProjectsSafe = { J1: .34,    J2: -0.35,   J3: 1.67,   J4: .23,   J5: 0.1,   J6: -1 };
    const poseResume = { J1: .34,    J2: 0.17,   J3: 1.2,   J4: .22,   J5: 0.1,   J6: 0.5 };
    const poseResumeSafe = { J1: .34,    J2: -0.35,   J3: 1.67,   J4: .23,   J5: 0.1,   J6: 0.5 };
    const poseContact = { J1: .34,    J2: 0.17,   J3: 1.2,   J4: .22,   J5: 0.1,   J6: 0.0 };
    const poseContactSafe = { J1: .34,    J2: -0.35,   J3: 1.67,   J4: .23,   J5: 0.1,   J6: 0.0 };

    const moveSafe = { J1: .34,    J2: -0.35,   J3: 1.67,   J4: .23,   J5: 0.1};

    const closeGripper = { J5: 0.03};
    const openGripper = { J5: 0.065};
    
  
    const [poseSequence, setPoseSequence] = useState([]);
  
    const handleStartSequence = () => {
      // Pass the entire array directly to RobotModel
      setPoseSequence([poseAbout]);
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
  
      setPoseSequence([poseAboutSafe, poseAbout]);
      // For instance, you can load different sequences depending on which box
      if (boxIndex === 'ABOUT') {
        setPoseSequence([moveSafe, poseAboutSafe, poseAbout]);
      } else if (boxIndex === 'PROJECTS') {
        setPoseSequence([moveSafe, poseProjectsSafe, poseProjects]);
      } else if (boxIndex === 'CONTACT') {
        setPoseSequence([moveSafe, poseContactSafe, poseContact]);
      } else if (boxIndex === 'RESUME') {
        setPoseSequence([moveSafe, poseResumeSafe, poseResume]);
      } else {
        setPoseSequence([moveSafe]); // just do one pose
      }
    };
  

  return (
    <div className="app-container">
      <HeaderBar />

      <div className="viewer">
        <Canvas 
          camera={{ position: [-3, 2, 4], fov: 40, }} 
          style={{ background: "#000" } }>
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
            urdfPath= {process.env.PUBLIC_URL + "/assets/pf400_description/urdf/PF400.urdf"}
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