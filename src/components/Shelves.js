import React, { useMemo } from "react";
import * as THREE from "three";
import ShelfItem from "./ShelfItem";

export default function Shelves({onItemClick}) {
  // Create your shelf geometry once
  const shelfGeometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(50, 0.05, 0.7);

    // The same transforms you previously applied at the geometry level
    geo.translate(-0.3, -0.025, -.25);
    // geo.rotateY(Math.PI / 4);

    return geo;
  }, []);

  // Create your shelf material once
  const shelfMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffffff),
      metalness: 0.1,
      roughness: 5,
      opacity: 0.2,
      transparent: false, // needed if you want to see the opacity
    });
  }, []);

  return (
    <group>
        <group key={1} position={[0, 0, 0]}>
          {/* The shelf itself */}
          <mesh geometry={shelfGeometry} material={shelfMaterial} />

          <ShelfItem title="PROJECTS" position={[-1, 0, 0]} onItemClick={onItemClick} />
          <ShelfItem title="ABOUT" position={[0, 0, 0]} onItemClick={onItemClick} />
          <ShelfItem title="CONTACT" position={[1, 0, 0]} onItemClick={onItemClick} />
          <ShelfItem title="RESUME" position={[2, 0, 0]} onItemClick={onItemClick} />

        </group>
    </group>
  );
}