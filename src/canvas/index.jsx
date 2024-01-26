import { Canvas } from '@react-three/fiber'
import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import { Suspense } from 'react';

const CanvasModel = () => {
  return (
       <Canvas
       shadows
       camera={{ position: [0, 0, 0], fov: 25 }}
       gl={{ preserveDrawingBuffer: true }}
            className="w-full max-w-full h-full transition-all ease-in"
          >
            <ambientLight intensity={3.5} />
            <Suspense>
            <CameraRig>
              <Backdrop/>
              <Shirt />
            
            </CameraRig>
            </Suspense>
          </Canvas>
  )
}

export default CanvasModel