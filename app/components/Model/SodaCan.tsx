import * as THREE from 'three'
import React, { use, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'
import MyScrollProgress from '@/app/lib/context/ScrollContext'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
    Object_7: THREE.Mesh
    Object_8: THREE.Mesh
    Object_9: THREE.Mesh
    Object_10: THREE.Mesh
    Object_11: THREE.Mesh
    Object_12: THREE.Mesh
    Object_13: THREE.Mesh
    Object_14: THREE.Mesh
    Object_16: THREE.Mesh
  }
  materials: {
    Can_Label: THREE.MeshStandardMaterial
    Can_Metal_Base: THREE.MeshStandardMaterial
    Can_Pulltab: THREE.MeshStandardMaterial
    Can_Rivet: THREE.MeshStandardMaterial
  }
}

const keyframes = [
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(Math.PI / 2, 0, 0),
  new THREE.Euler(Math.PI , 0, 0),
  new THREE.Euler(Math.PI * (3/2) ,0,0),
  new THREE.Euler(2*Math.PI,0,0),
  new THREE.Euler(0,0,0),
  new THREE.Euler(0, Math.PI, 0),

 
]

const lerpEuler = (v1: THREE.Euler, v2: THREE.Euler, t: number): THREE.Euler => {
  const q1 = new THREE.Quaternion().setFromEuler(v1)
  const q2 = new THREE.Quaternion().setFromEuler(v2)
  const qInterpolated = new THREE.Quaternion().slerpQuaternions(q1, q2, t)
  return new THREE.Euler().setFromQuaternion(qInterpolated)
}

export function SodaCan(props: React.JSX.IntrinsicElements['group']) {
  const gltf = useGLTF('/model/arknights_originium_soda.glb') as unknown as GLTFResult
  const modelRef = useRef<THREE.Group<THREE.Object3DEventMap>>(null)
  const {scrollProgress}= use(MyScrollProgress)
  useFrame(({clock})=>{
    if (modelRef.current) {
        
        const t =clock.getElapsedTime()
        modelRef.current.position.y = Math.sin(t*2) * .2
        // modelRef.current.rotation.x = t * Math.PI * 4 *.2
        if(scrollProgress){

           const totalSteps = keyframes.length - 1
    const currentStep = Math.floor(scrollProgress.get() * totalSteps)
    const nextStep = Math.min(currentStep + 1, totalSteps)

    const localT = (scrollProgress.get() * totalSteps) % 1

    const current = keyframes[currentStep]
    const next = keyframes[nextStep]

    const  interpolated = lerpEuler(current,next,localT)
    
    if ( modelRef.current) {
      modelRef.current.rotation.copy(interpolated)
        // console.log("modelRef", modelRef.current)
        
    }

        }
    }
  })
  const {nodes,materials,} = gltf
  useEffect(()=>{
    return ()=>{
        gltf.scene.traverse(child=>{
            if ((child as THREE.Mesh).geometry) {
                (child as THREE.Mesh).geometry.dispose()
            }
            if ((child as THREE.Mesh).material) {
                const material =  (child as THREE.Mesh).material
                if(Array.isArray(material)) material.forEach(m=>m.dispose)
                else material.dispose()
            }
        })
    }
  },[gltf])
  return (
    <group {...props} ref={modelRef}  rotation={[0, 0, 0]} >
      <group position={[0, 0.773, -0.134]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.1}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.Can_Pulltab}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.Can_Pulltab}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials.Can_Pulltab}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials.Can_Pulltab}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_11.geometry}
          material={materials.Can_Pulltab}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_12.geometry}
          material={materials.Can_Pulltab}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_13.geometry}
          material={materials.Can_Pulltab}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_14.geometry}
          material={materials.Can_Pulltab}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.Can_Label}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.Can_Metal_Base}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_16.geometry}
        material={materials.Can_Rivet}
        position={[0, 0.829, 0.008]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.027, 0.002, 0.027]}
      />
    </group>
  )
}

useGLTF.preload('/model/arknights_originium_soda.glb')
