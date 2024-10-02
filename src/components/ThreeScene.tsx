"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Obtener el div y sus dimensiones
    const container = containerRef.current;
    if( !container ) return;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Crear una escena, cámara y renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement); // Añadir el canvas al div

    // Crear un cubo simple
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Guardar el renderer en la referencia
    rendererRef.current = renderer;

    const handleResize = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      rendererRef.current.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
  
    window.addEventListener('resize', handleResize);
    // Limpiar el canvas cuando el componente se desmonte
    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className='ml-[-44px]'
      ref={containerRef}
    ></div>
  );
};

export default ThreeScene;
