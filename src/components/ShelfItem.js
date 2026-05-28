import React, { useRef } from "react";
import { Text } from "@react-three/drei";

/**
 * ShelfItem
 * @param {string} title - text to display floating above the item
 * @param {array} [position] - optional [x,y,z] for item placement
 * @param {function} [onClick] - callback when the item is clicked
 */
export default function ShelfItem({ title, position = [0, 0, 0], onItemClick, plateAssets }) {
  const groupRef = useRef();
  const handleClick = (event) => {
    event.stopPropagation();
    onItemClick(title);
  };

  return (
    <group 
    ref={groupRef} 
    position={position} 
    scale={0.004} 
    onClick={handleClick}>
      {/* Clickable mesh for the STL */}
      <mesh
        geometry={plateAssets.geometry}
        material={plateAssets.material}
        rotation={[0, Math.PI/2, 0]}
      />
      <lineSegments
        geometry={plateAssets.wireframeGeometry}
        material={plateAssets.helperLineMaterial}
        rotation={[0, Math.PI/2, 0]}
      />
      <lineSegments
        geometry={plateAssets.edgesGeometry}
        material={plateAssets.edgeLineMaterial}
        rotation={[0, Math.PI/2, 0]}
      />

      {/* Floating text title */}
      <Text
        position={[25, 80, -80]} // Y offset above the item
        fontSize={50}
        color="white"
        anchorX="center"
        anchorY="bottom"
        textAlign="center"
        font= {process.env.PUBLIC_URL + '/fonts/VT323-Regular.ttf'}
      >
        {title}
      </Text>
      <pointLight position={[0, 0, 0]} intensity={.7} />
    </group>
  );
}
