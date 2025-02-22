import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Shelves() {
  const shelves = new THREE.Group();

  const shelfMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffffff),
    metalness: 1,
    roughness: 5,
    opacity: 0.2,
  });

  const shelfGeometry = new THREE.BoxGeometry(5, 0.05, 0.5);
  shelfGeometry.translate(.3, -1, -1);
  shelfGeometry.rotateY(Math.PI/4);

  for (let i = 0; i < 2; i++) {
    const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
    shelf.position.y = i ;
    shelves.add(shelf);
  }

  return <primitive object={shelves} />;
}