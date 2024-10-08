import * as THREE from "three";
const hexGeometries: Map<number[], THREE.ExtrudeGeometry> = new Map();
export const getHexagonGeometry = (radius: number, thickness: number) => {
  // Definir los vértices del hexágono en el plano xz
  const cached: THREE.ExtrudeGeometry | undefined = hexGeometries.get([radius, thickness]);
  if(cached) return cached; 

  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    if (i === 0) {
      shape.moveTo(x, z); // Usamos x y z para mantenerlo sobre el plano xz
    } else {
      shape.lineTo(x, z);
    }
  }
  shape.closePath(); // Cerrar la forma del hexágono

  // Crear la geometría con un grosor pequeño (sobre el eje y)
  const extrudeSettings = {
    depth: thickness, // Grosor pequeño en el eje y
    bevelEnabled: false, // Sin bisel
  };

  const hexGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  // Rotar la geometría para que quede alineada con los ejes xz
  hexGeometry.rotateX(Math.PI / 2); // Girar 90 grados para que el grosor esté en el eje Y
  hexGeometry.rotateY(Math.PI / 6);
  // Crear el material
  // Crear el mesh con la geometría y el material
  hexGeometries.set([radius, thickness], hexGeometry);
  return hexGeometry;
};
