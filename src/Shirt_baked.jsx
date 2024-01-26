import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';

export function ShirtModel(props) {
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.lambert1} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

useGLTF.preload('/shirt_baked.glb');

