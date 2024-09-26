import { useEffect, useRef } from 'react';

import { io } from 'socket.io-client';

import * as THREE from 'three';
import { useHelper } from '@react-three/drei';

import { useMounted } from '../tools/useMounted';

const TestScene = () => {
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) {
      const socket = io();
      console.log('🚀 ~ useEffect ~ socket:', socket);
    }
  }, [mounted]);

  const spotlight = useRef<THREE.SpotLight>(null);
  useHelper(
    // @ts-expect-error Maybe this is wrongly typed but the hook accepts the ref entirely
    spotlight,
    THREE.SpotLightHelper,
  );

  const pointlight = useRef<THREE.PointLight>(null);
  useHelper(
    // @ts-expect-error Maybe this is wrongly typed but the hook accepts the ref entirely
    pointlight,
    THREE.PointLightHelper,
  );

  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        ref={spotlight}
        position={[5, 10, 5]}
        angle={0.15}
        penumbra={0.4}
        decay={0.1}
        intensity={3}
      />

      <pointLight
        ref={pointlight}
        position={[1, 0, -2]}
        intensity={3}
        color="green"
      />

      <mesh rotation={[-(Math.PI / 2), 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      <mesh scale={1}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};

export default TestScene;
