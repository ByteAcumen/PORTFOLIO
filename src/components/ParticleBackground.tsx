import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Parallax drift for depth
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.07) * 0.08;
      ref.current.rotation.y = Math.cos(clock.elapsedTime * 0.09) * 0.12;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#6366f1" : "#60a5fa"}
        size={isDark ? 0.018 : 0.012}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isDark ? 0.35 : 0.22}
      />
    </Points>
  );
};

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  return (
    <div className={`fixed inset-0 z-0 ${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;