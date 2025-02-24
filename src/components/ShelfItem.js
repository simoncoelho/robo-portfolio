import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { EffectComposer, STLLoader } from "three-stdlib";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { Bloom, Glitch } from "@react-three/postprocessing";

/**
 * ShelfItem
 * @param {string} title - text to display floating above the item
 * @param {array} [position] - optional [x,y,z] for item placement
 * @param {function} [onClick] - callback when the item is clicked
 */
export default function ShelfItem({ title, position = [0, 0, 0], onClick }) {
  const groupRef = useRef();

  // Load geometry with STLLoader
  const geometry = useLoader(STLLoader, '/assets/12wellplate_base.stl');

  // Optional: set a default material, or pass as a prop if you want
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    metalness: 0.2,
    roughness: 0.8,
  });

  return (
    <group ref={groupRef} position={position} scale={0.004} >
      {/* Clickable mesh for the STL */}
      <mesh
        geometry={geometry}
        material={material}
        onPointerDown={(e) => {
          e.stopPropagation(); 
          if (onClick) onClick();
        }}
        rotation={[0, Math.PI/2, 0]}
      >
        {/* Adjust scale to match your scene units if needed */}
        <primitive object={geometry} attach="geometry"/>
      </mesh>

      {/* Floating text title */}
      <Text
        position={[25, 80, -80]} // Y offset above the item
        fontSize={50}
        color="white"
        anchorX="center"
        anchorY="bottom"
        textAlign="center"
      >
        {title}
      </Text>
      <pointLight position={[0, 0, 0]} intensity={.7} />
    </group>
  );
}