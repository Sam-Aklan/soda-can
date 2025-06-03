"use client";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";


import { useRef } from "react";
import * as THREE from "three";
import { SodaCan } from "./Model/SodaCan";

const Scene = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const spotRef = useRef<THREE.SpotLight>(null!);
  const modelRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null!);

  const handleChange = (e: any) => {
    const postionX = e?.target.object.position.x.toFixed(2);
    const postionY = e?.target.object.position.y.toFixed(2);
    const postionZ = e?.target.object.position.z.toFixed(2);
  };
  return (
    <>
      {/* <OrbitControls onChange={handleChange} /> */}
      <PerspectiveCamera
        makeDefault
        near={0.1}
        far={10000}
        position={[0, 0, 5]}
        fov={75}
        aspect={window.innerWidth / window.innerHeight}
      />
      <ambientLight intensity={0.3} />

      <directionalLight
        ref={lightRef}
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <spotLight
        ref={spotRef}
        position={[0, 5, 5]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        castShadow
        shadow-bias={-0.0001}
      />
      <Environment preset="city" />
      <SodaCan ref={modelRef} />
      <axesHelper args={[2000]} />
    </>
  );
};

export default Scene;
