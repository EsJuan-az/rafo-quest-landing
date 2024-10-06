import * as THREE from 'three';

export const getColorMaterial = (color: number) => {
  const material = new THREE.MeshStandardMaterial({ color });
  return material
}
