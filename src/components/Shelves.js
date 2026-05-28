import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { STLLoader } from "three-stdlib";
import ShelfItem from "./ShelfItem";

export default function Shelves({onItemClick}) {
  const plateSourceGeometry = useLoader(
    STLLoader,
    process.env.PUBLIC_URL + "/assets/12wellplate_base.stl"
  );

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

  const plateAssets = useMemo(() => {
    plateSourceGeometry.computeVertexNormals();

    return {
      geometry: plateSourceGeometry,
      wireframeGeometry: new THREE.WireframeGeometry(plateSourceGeometry),
      edgesGeometry: new THREE.EdgesGeometry(plateSourceGeometry),
      material: new THREE.MeshStandardMaterial({
        color: 0xd8d8d8,
        metalness: 0.05,
        roughness: 0.35,
        side: THREE.DoubleSide,
      }),
      helperLineMaterial: new THREE.LineBasicMaterial({
        color: 0x000000,
        depthTest: false,
        opacity: 1,
        transparent: true,
      }),
      edgeLineMaterial: new THREE.LineBasicMaterial({
        color: 0x808080,
        depthTest: false,
        opacity: 0.35,
        transparent: true,
      }),
    };
  }, [plateSourceGeometry]);

  return (
    <group>
        <group key={1} position={[0, 0, 0]}>
          {/* The shelf itself */}
          <mesh geometry={shelfGeometry} material={shelfMaterial} />

          <ShelfItem title="PROJECTS" position={[-1, 0, 0]} onItemClick={onItemClick} plateAssets={plateAssets} />
          <ShelfItem title="ABOUT" position={[0, 0, 0]} onItemClick={onItemClick} plateAssets={plateAssets} />
          <ShelfItem title="CONTACT" position={[1, 0, 0]} onItemClick={onItemClick} plateAssets={plateAssets} />
          <ShelfItem title="RESUME" position={[2, 0, 0]} onItemClick={onItemClick} plateAssets={plateAssets} />

        </group>
    </group>
  );
}
