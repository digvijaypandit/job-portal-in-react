  import React from 'react';
  import { useFrame } from '@react-three/fiber';

  const Sphere = ({ position, rotationSpeed = 0.01, size = 2 }) => {
    const meshRef = React.useRef();

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += rotationSpeed;
      }
    });

    return (
      <mesh ref={meshRef} position={position} rotation={[-(23 * Math.PI) / 360, 0, 0]}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial color="lightblue" wireframe={true} />
      </mesh>
    );
  };

  export default Sphere;
