import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import URDFLoader from "urdf-loader";
import * as THREE from "three";

function RobotModel({ urdfPath, targetJointPositions, onJointsLoaded }) {
  const robotRef = useRef();
  const [joints, setJoints] = useState({});

  useEffect(() => {
    const envMap = new THREE.CubeTextureLoader()
      .setPath("/env/") // Ensure this path is correct
      .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

    const loader = new URDFLoader();
    loader.load(urdfPath, (robot) => {
      robot.rotateX(-Math.PI / 2);
      robot.rotateZ(Math.PI / 4);
      robot.translateZ(-2);
      robot.scale.set(2, 2, 2);

      robot.traverse((child) => {
        if (child.geometry) {
          let newMaterial;
          if (child.name.toLowerCase().includes("finger")) {
            newMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color(0x999999),
              metalness: 0.8,
              roughness: 0.2,
              envMap: envMap,
              envMapIntensity: 1.0,
            });
          } else {
            newMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color(0xffd700), // Gold
              metalness: 1.0,
              roughness: 0.3,
              envMap: envMap,
              envMapIntensity: 1.0,
            });
          }
          child.material = newMaterial;
        }
      });

      if (robotRef.current) {
        robotRef.current.add(robot);
        console.log("Loaded robot:", robot);
        // Extract joints based on URDF joint names
        const loadedJoints = {
          J0: robot.joints["rail_link"],
          J1: robot.joints["J1"],
          J2: robot.joints["J2"],
          J3: robot.joints["J3"],
          J4: robot.joints["J4"],
          J5: robot.joints["J5"],
          J6: robot.joints["J6"],
          // add more joints as needed
        };
        setJoints(loadedJoints);
        if (onJointsLoaded) onJointsLoaded(loadedJoints);
      }
    });
  }, [urdfPath, onJointsLoaded]);

  // In each frame, if targetJointPositions is provided, smoothly interpolate to them
  useFrame((state, delta) => {
    if (targetJointPositions) {
      Object.keys(targetJointPositions).forEach((jointName) => {
        const joint = joints[jointName];
        console.log(jointName, joint);
        if (joint) {
          const currentValue = joint.jointValue;
          const targetValue = targetJointPositions[jointName];
          // Use a lerp factor; higher values result in faster transitions
          const lerpFactor = 0.01;
          const newValue = THREE.MathUtils.lerp(currentValue, targetValue, lerpFactor);
          joint.setJointValue(newValue);
        }
      });
    }
  });

  return <group ref={robotRef} />;
}

export default RobotModel;