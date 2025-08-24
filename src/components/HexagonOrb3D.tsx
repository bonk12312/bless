import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const HexagonOrb3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const hexagonRef = useRef<THREE.Group>();
  const orbRef = useRef<THREE.Mesh>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create hexagon group
    const hexagonGroup = new THREE.Group();
    hexagonRef.current = hexagonGroup;

    // Create hexagon outline
    const hexagonShape = new THREE.Shape();
    const radius = 1.5;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        hexagonShape.moveTo(x, y);
      } else {
        hexagonShape.lineTo(x, y);
      }
    }
    hexagonShape.lineTo(Math.cos(0) * radius, Math.sin(0) * radius);

    // Create hexagon edges
    const hexagonGeometry = new THREE.EdgesGeometry(new THREE.ShapeGeometry(hexagonShape));
    const hexagonMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.8 
    });
    const hexagonEdges = new THREE.LineSegments(hexagonGeometry, hexagonMaterial);
    hexagonGroup.add(hexagonEdges);

    // Create connecting lines to center
    const linesGeometry = new THREE.BufferGeometry();
    const linesVertices = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      linesVertices.push(x, y, 0, 0, 0, 0);
    }
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linesVertices, 3));
    const linesMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.4 
    });
    const connectingLines = new THREE.LineSegments(linesGeometry, linesMaterial);
    hexagonGroup.add(connectingLines);

    // Create glowing orb
    const orbGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const orbMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.9
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orbRef.current = orb;

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4169E1,
      transparent: true,
      opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    orb.add(glow);

    hexagonGroup.add(orb);
    scene.add(hexagonGroup);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      targetRotationRef.current.x = mouseRef.current.y * 0.5;
      targetRotationRef.current.y = mouseRef.current.x * 0.5;
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (hexagonRef.current && orbRef.current) {
        // Smooth rotation towards target
        hexagonRef.current.rotation.x += (targetRotationRef.current.x - hexagonRef.current.rotation.x) * 0.05;
        hexagonRef.current.rotation.y += (targetRotationRef.current.y - hexagonRef.current.rotation.y) * 0.05;
        
        // Orb pulsing animation
        const time = Date.now() * 0.003;
        orbRef.current.scale.setScalar(1 + Math.sin(time) * 0.2);
        
        // Orb material opacity animation
        if (orbRef.current.material instanceof THREE.MeshBasicMaterial) {
          orbRef.current.material.opacity = 0.7 + Math.sin(time * 2) * 0.3;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="flex items-center justify-center cursor-pointer"
      style={{ width: '200px', height: '200px' }}
    />
  );
};

export default HexagonOrb3D;