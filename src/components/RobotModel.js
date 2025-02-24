import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import URDFLoader from "urdf-loader";
import * as THREE from "three";

/**
 * A helper class that steps through an array of poses.
 * On each frame update, it lerps the joints to the current pose.
 * When the current pose is reached, it advances to the next.
 */
class PoseSequenceRunner {
  constructor(poses, onComplete) {
    this.poses = poses;
    this.onComplete = onComplete;
    this.currentIndex = 0;
    this.complete = false;
    
    // Tweak as needed:
    this.lerpFactor = 0.01;  // bigger = faster movement
    this.threshold = 0.001;   // bigger = easier to consider "close enough"
    this.requiredStableFrames = 2; // number of consecutive stable frames
    this.framesStable = 0;   // how many frames we've been in range consecutively
  }

  update(joints) {
    // If we've already completed or have no more poses, do nothing.
    if (this.complete || this.currentIndex >= this.poses.length) return;

    const targetPose = this.poses[this.currentIndex];
    let allInRange = true;

    // Lerp each joint toward its target
    for (const jointName in targetPose) {
      const joint = joints[jointName];
      if (!joint) continue;

      const currentValue = joint.jointValue;
      const targetValue = targetPose[jointName];

      const newValue = THREE.MathUtils.lerp(currentValue, targetValue, this.lerpFactor);
      joint.setJointValue(newValue);

      // Compare directly against newValue
      const diff = Math.abs(newValue - targetValue);
      if (diff > this.threshold) {
        console.log(`Joint ${jointName} out of range: ${diff}`);
        allInRange = false;
      }
    }

    // If we are in range this frame, increment; otherwise reset
    if (allInRange) {
      this.framesStable++;
    } else {
      this.framesStable = 0;
    }

    // Only if we've been stable for enough consecutive frames, finalize
    if (this.framesStable >= this.requiredStableFrames) {
      console.log(`Pose complete: ${this.currentIndex}`);
      this.currentIndex++;
      this.framesStable = 0;

      // If that was our last pose, fire onComplete
      if (this.currentIndex >= this.poses.length) {
        this.complete = true;
        if (this.onComplete) this.onComplete();
      }
    }
  }
}
/**
 * RobotModel: loads a URDF and optionally runs through a pose sequence.
 */
function RobotModel({ urdfPath, poseSequence = [], onSequenceComplete }) {
  const robotRef = useRef();
  const [joints, setJoints] = useState({});
  const [sequenceRunner, setSequenceRunner] = useState(null);

  // Load the URDF once
  useEffect(() => {
    const loader = new URDFLoader();

    loader.load(urdfPath, (robot) => {
      // Basic transforms
      robot.rotateX(-Math.PI / 2);
      // robot.rotateZ(Math.PI / 2);
      robot.translateZ(-1);
      robot.translateY(-.8);
      robot.scale.set(2, 2, 2);

      // Attach to the scene
      if (robotRef.current) {
        robotRef.current.add(robot);

        // Extract joints by name
        const loadedJoints = {
          J0: robot.joints["rail_link"],
          J1: robot.joints["J1"],
          J2: robot.joints["J2"],
          J3: robot.joints["J3"],
          J4: robot.joints["J4"],
          J5: robot.joints["J5"],
          J6: robot.joints["J6"],
          // add more as needed
        };
        setJoints(loadedJoints);
      }
    });
  }, [urdfPath]);

  // Whenever the user passes a new sequence, create or reset our runner
  useEffect(() => {
    if (poseSequence.length > 0) {
      setSequenceRunner(new PoseSequenceRunner(poseSequence, onSequenceComplete));
    } else {
      setSequenceRunner(null);
    }
  }, [poseSequence, onSequenceComplete]);

  // Each frame, if we have a sequenceRunner, let it do its thing
  useFrame(() => {
    if (sequenceRunner && Object.keys(joints).length > 0) {
      sequenceRunner.update(joints);
    }
  });

  return <group ref={robotRef} />;
}

export default RobotModel;