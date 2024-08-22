import '../global.css';

import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';

import TestScene from '../components/TestScene';

const App = () => {

  return (
    <Canvas>
      <TestScene />

      <OrbitControls />
      <Stats />
    </Canvas>
  );
};

export default App;
