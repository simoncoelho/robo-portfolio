import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import URDFLoader from "urdf-loader";
import { rotateUV } from "three/tsl";

function RobotModel({ urdfPath, animateJoints }) {
  const robotRef = useRef();
  const [joints, setJoints] = useState({});

  useEffect(() => {
    const loader = new URDFLoader();
    loader.load(urdfPath, (robot) => {
      robot.rotateX(-Math.PI/2);
      robot.rotateZ(Math.PI/4);
      robot.translateZ(-2)
      robot.scale.set(2,2,2);
      if (robotRef.current) {
        robotRef.current.add(robot);
        console.log(robot);
        // Extract joints (update with actual joint names from your URDF)
        setJoints({
          axis0: robot.joints["rail_link"],
          axis1: robot.joints["J1"],
          axis3: robot.joints["J3"], // Replace with your actual joint name
          axis4: robot.joints["J4"], // Replace with your actual joint name
        });
      }
    });
  }, [urdfPath]);

  // Update joint angles using useFrame (runs every frame)
  useFrame(() => {
    if (animateJoints && joints.axis3 && joints.axis4) {
      // Example: oscillate axis 3 and 4
      console.log('animating')
      joints.axis0.setJointValue(Math.sin(Date.now() * 0.01) * 1.0);
      joints.axis1.setJointValue(Math.sin(Date.now() * 0.001) * 1.0);
      joints.axis3.setJointValue(Math.sin(Date.now() * 0.001) * 1.0);
      joints.axis4.setJointValue(Math.cos(Date.now() * 0.01) * 0.5);
    }
  });

  return <group ref={robotRef} />;
}

export default RobotModel;