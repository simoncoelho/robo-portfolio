import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Shelves from "./components/Shelves"; // optional component, remove if you don’t need it
import RobotModel from "./components/RobotModel";
import "./App.css";
import HeaderBar from "./components/HeaderBar";
import SectionPanel from "./components/SectionPanel";

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

    const [poseSequence, setPoseSequence] = useState([]);
    const [shouldLoadRobot, setShouldLoadRobot] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const [pendingSection, setPendingSection] = useState(null);

    useEffect(() => {
      const loadRobot = () => setShouldLoadRobot(true);

      if ("requestIdleCallback" in window) {
        const idleId = window.requestIdleCallback(loadRobot, { timeout: 1500 });
        return () => window.cancelIdleCallback(idleId);
      }

      const timeoutId = window.setTimeout(loadRobot, 800);
      return () => window.clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
      if (!pendingSection) return undefined;

      const timeoutId = window.setTimeout(() => {
        setActiveSection(pendingSection);
        setPendingSection(null);
      }, 300);

      return () => window.clearTimeout(timeoutId);
    }, [pendingSection]);
  
  // Called when the last pose finishes
  const handleSequenceComplete = () => {
    console.log("Sequence complete!");
    // Optionally reset if you want to be able to trigger it again:
    // setSequencePoses([]);
  };

  const handleCloseSection = () => {
    setActiveSection(null);
    setPendingSection(null);
    setPoseSequence([]);
  };

    // Called by Shelves when a box is clicked
    const handleBoxClicked = (boxIndex) => {
      console.log("Box clicked:", boxIndex);
      setShouldLoadRobot(true);
      setActiveSection(null);
      setPendingSection(boxIndex);

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
            enabled={!activeSection}
            autoRotate={false}
            // Optionally limit how close/far you can zoom
            minDistance={0.5}
            maxDistance={5}
          />

          <pointLight position={[0, 3, 1]} intensity={1} color="white" />

        {/* RobotModel with internal sequence handling */}
          {shouldLoadRobot && (
            <RobotModel
              urdfPath= {process.env.PUBLIC_URL + "/assets/pf400_description/urdf/PF400.urdf"}
              poseSequence={poseSequence}
              onSequenceComplete={handleSequenceComplete}
            />
          )}

          {/* Shelves is optional; remove if you don’t need it */}
          <Suspense fallback={null}>
            <Shelves onItemClick={handleBoxClicked}/>
          </Suspense>
        </Canvas>

        {/* Button to start the sequence */}
      </div>
      <SectionPanel section={activeSection} onClose={handleCloseSection} />
      {/* <button onClick={handleStartSequence} style={{ marginTop: "1rem" }}>
        Start Sequence
      </button> */}
    </div>

  );
}

export default App;
