import * as THREE from 'three';
import { Hex } from '../components/ThreeMap/domain/hex';
export const getRandomHexPoint = (h: Hex) => {
  const points = h.vertex;
  if (points.length !== 6) {
      throw new Error("La cantidad de puntos debe ser 6.");
  }
  // Generar 6 números aleatorios
  const randomWeights = Array.from({ length: 6 }, () => Math.random());
  // Normalizar los pesos para que sumen 1
  const sum = randomWeights.reduce((a, b) => a + b, 0);
  const normalizedWeights = randomWeights.map(weight => weight / sum);
  // Inicializar el vector combinado en (0, 0, 0)
  const combinedVector = new THREE.Vector3(0, 0, 0);
  // Calcular la combinación lineal convexa
  for (let i = 0; i < 6; i++) {
      combinedVector.add(points[i].clone().multiplyScalar(normalizedWeights[i]));
  }
  return combinedVector;
}