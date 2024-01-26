import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture ,Center} from '@react-three/drei';

import state from '../store';

export default function Shirt(props)  {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  if (!nodes || !materials) {
    // Loading or error state
    return null;
  }

  useFrame((state,delta)=>easing.dampC(materials.lambert1.color,snap.color,0.25,delta))
  const stringState=JSON.stringify(snap)
  return (
    <Center {...props}>
    <group key={stringState}  dispose={null}>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.lambert1}
        castShadow
       
      >
        {snap.isFullTexture && (
          <Decal
            position={[0,0,0]}
            rotation={[0,0,0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0,0.04,0.15]}
            rotation={[0,0,0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  </Center>
  );
}

useGLTF.preload('/shirt_baked.glb');