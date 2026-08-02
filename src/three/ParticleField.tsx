import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 220;

function Dust() {
  const points = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speeds[i] = 0.04 + Math.random() * 0.08;
    }
    return { positions, speeds };
  }, []);

  useFrame((state) => {
    if (document.hidden || !points.current) return;
    const geo = points.current.geometry;
    const arr = geo.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * 0.01;
      if (arr[i * 3 + 1] > 4.6) arr[i * 3 + 1] = -4.6;
      arr[i * 3] += Math.sin(t * 0.15 + i) * 0.0015;
    }
    geo.attributes.position.needsUpdate = true;

    points.current.rotation.y = pointer.x * 0.08;
    points.current.rotation.x = -pointer.y * 0.05;
    points.current.position.x += (pointer.x * 0.6 - points.current.position.x) * 0.02;
    points.current.position.y += (pointer.y * 0.35 - points.current.position.y) * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#f2e1dc"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      className="hero-particles"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
    >
      <Dust />
    </Canvas>
  );
}
