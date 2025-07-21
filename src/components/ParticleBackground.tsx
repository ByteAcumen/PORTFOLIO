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
        opacity={isDark ? 0.22 : 0.13}
      />
    </Points>
  );
};

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [contextLost, setContextLost] = React.useState(false);

  React.useEffect(() => {
    const div = canvasRef.current;
    if (!div) return;
    // Wait for canvas to mount
    const observer = new MutationObserver(() => {
      const canvas = div.querySelector('canvas');
      if (canvas) {
        // Add context loss listeners
        const handleLost = (e: Event) => {
          e.preventDefault();
          setContextLost(true);
        };
        const handleRestored = () => {
          setContextLost(false);
        };
        canvas.addEventListener('webglcontextlost', handleLost, false);
        canvas.addEventListener('webglcontextrestored', handleRestored, false);
      }
    });
    observer.observe(div, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={canvasRef} className={`fixed inset-0 z-0 pointer-events-none ${className || ''}`} style={{ filter: 'blur(1.5px)', opacity: 0.85 }}>
      {contextLost ? (
        <div className="absolute inset-0 flex items-center justify-center text-center text-red-500 bg-black/60 z-10">
          <div>
            <p className="font-bold text-lg">WebGL context lost</p>
            <p className="text-sm">Please reload the page to restore the 3D background.</p>
          </div>
        </div>
      ) : (
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleField />
        </Canvas>
      )}
    </div>
  );
};

export default ParticleBackground;