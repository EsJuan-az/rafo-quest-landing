import { DummyUpdate } from "../types";
import { Hex } from "./hex";
import * as THREE from "three";
import { Game } from "./game";

/**
 * Function that, givens a hex class, returns a certain number of random points.
 *
 * @param {Hex} hex
 * @param {number} numPoints
 * @param {number} [offsetRadius=0]
 * @returns {THREE.Vector3[]}
 */
export const getRandomHexPoint = (
  hex: Hex,
  numPoints: number,
  offsetRadius: number = 0
): THREE.Vector3[] => {
  const points = hex.vertex.map((v) =>
    v.normalize().multiplyScalar(Math.max(hex.config.rad - offsetRadius, 0))
  );

  if (points.length !== 6) {
    throw new Error("La cantidad de puntos debe ser 6.");
  }

  const randomPoints: THREE.Vector3[] = [];

  // Generar puntos aleatorios dentro de cada triángulo
  for (let i = 0; i < numPoints; i++) {
    // Elegir un triángulo aleatorio (6 triángulos en total)
    const triangleIndex = Math.floor(Math.random() * 6);

    // Los vértices del triángulo son:
    const v1 = new THREE.Vector3(0, 0, 0); // Centro del hexágono
    const v2 = points[triangleIndex]; // Vértice del hexágono
    const v3 = points[(triangleIndex + 1) % 6]; // Vértice adyacente

    // Generar un punto aleatorio dentro del triángulo usando coordenadas baricéntricas
    const randomBary = Array.from({ length: 3 }, () => Math.random());
    const sum = randomBary.reduce((acc, a) => acc + a);
    const [b1, b2, b3] = randomBary.map((bary) => bary / sum);

    // Interpolar para obtener el punto
    const x = b1 * v1.x + b2 * v2.x + b3 * v3.x;
    const z = b1 * v1.z + b2 * v2.z + b3 * v3.z;

    randomPoints.push(new THREE.Vector3(x, 0, z)); // Suponiendo que trabajas en 2D
  }

  return randomPoints;
};

/**
 * Draw a line of hexagons.
 *
 * @param {Hex} HexClass
 * @param {Game} G
 * @param {DummyUpdate} initial
 * @param {number} num
 * @param {number} angle
 * @returns {DummyUpdate[]}
 */
export const getHexLines = (
  HexClass: Hex,
  G: Game,
  initial: DummyUpdate,
  num: number,
  angle: number
): DummyUpdate[] => {
  const hexes = [];
  for (let i = 1; i <= num; i++) {
    const xnew =
      initial.dummy.position.x +
      Math.sqrt(3) *
        Math.max(HexClass.config.rad, initial.parent.config.rad) *
        Math.cos(angle) *
        i;
    const ynew =
      initial.dummy.position.y -
      (initial.parent.config.thick - HexClass.config.thick);
    const znew =
      initial.dummy.position.z +
      Math.sqrt(3) *
        Math.max(HexClass.config.rad, initial.parent.config.rad) *
        Math.sin(angle) *
        i;
    const current: DummyUpdate = HexClass.dummy;

    const { dummy: hex } = current;
    hex.position.x = xnew;
    hex.position.y = ynew;
    hex.position.z = znew;
    // hex.position.y = initial.dummy.position.y;
    hexes.push(current);
  }
  return [initial, ...hexes];
};

/**
 * Draw a curve of hexagons given the direction.
 *
 * @param {Hex} HexClass
 * @param {Game} G
 * @param {DummyUpdate} initial
 * @param {number} num
 * @param {number} angle
 * @param {number} [curveSize=1]
 * @param {boolean} [clock=false]
 * @returns {DummyUpdate[]}
 */
export const getHexCurve = (
  HexClass: Hex,
  G: Game,
  initial: DummyUpdate,
  num: number,
  angle: number,
  curveSize: number = 1,
  clock: boolean = false
): DummyUpdate[] => {
  const curveSegment: DummyUpdate[] = getHexLines(
    HexClass,
    G,
    initial,
    curveSize,
    angle
  );
  if (num == 1) {
    return curveSegment;
  }
  const lastHex: DummyUpdate | undefined = curveSegment.pop();
  return [
    ...curveSegment,
    ...getHexCurve(
      HexClass,
      G,
      lastHex,
      num - 1,
      angle + (clock ? Math.PI / 3 : -Math.PI / 3),
      curveSize,
      clock
    ),
  ];
};

/**
 * Draw a hexagon ramp that go a certain height up.
 *
 * @param {Hex} HexClass
 * @param {Game} G
 * @param {DummyUpdate} initial
 * @param {number} num
 * @param {number} angle
 * @param {number} [height=10]
 * @param {boolean} [rampUp=true]
 * @returns {DummyUpdate[]}
 */
export const getHexRamp = (
  HexClass: Hex,
  G: Game,
  initial: DummyUpdate,
  num: number,
  angle: number,
  height: number = 10,
  rampUp: boolean = true
): DummyUpdate[] => {
  const deltay = height / num;
  // Vector de avance
  const advanceVector = new THREE.Vector3(
    Math.cos(angle),
    deltay,
    Math.sin(angle)
  );
  // Vector Y
  const upVector = new THREE.Vector3(0, 1, 0);
  // Eje de rotación (producto cruzado)
  const rotationAxis = new THREE.Vector3()
    .crossVectors(advanceVector, upVector)
    .normalize();
  const hexes = getHexLines(HexClass, G, initial, num + 1, angle).map(
    (current: DummyUpdate, i: number, arr: DummyUpdate[]) => {
      const { dummy: hex } = current;
      if (i == arr.length - 1) {
        hex.position.y += height * (rampUp ? 1 : -1);
      } else if (i != 0) {
        hex.position.y +=
          deltay * i * (rampUp ? 1 : -1) + (deltay / 2) * (!rampUp ? 1 : -1);
        // Crear un cuaternión para la rotación
        const quaternion = new THREE.Quaternion();

        // Calcular el ángulo de rotación en función de deltay y la distancia en el plano XZ
        const rotationAngle = Math.atan2(
          deltay,
          Math.sqrt(3) * HexClass.config.rad
        );

        // Establecer la rotación a partir del eje y el ángulo
        quaternion.setFromAxisAngle(
          rotationAxis,
          rotationAngle * (rampUp ? 1 : -1)
        );

        // Aplicar la rotación al objeto
        hex.quaternion.multiplyQuaternions(quaternion, hex.quaternion);
      }
      return current;
    }
  );
  return hexes;
};

/**
 * Hexagon Geometry Caché structure.
 *
 * @type {Map<number[], THREE.ExtrudeGeometry>}
 */
const hexGeometries: Map<number[], THREE.ExtrudeGeometry> = new Map();
/**
 * Generates a hexagon geometry given its radius and its thickness.
 *
 * @param {number} radius
 * @param {number} thickness
 * @returns {*}
 */
export const getHexagonGeometry = (radius: number, thickness: number) => {
  // Definir los vértices del hexágono en el plano xz
  const cached: THREE.ExtrudeGeometry | undefined = hexGeometries.get([
    radius,
    thickness,
  ]);
  if (cached) return cached;

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

/**
 * Interpolates between two points based on a given percentage.
 * @param {THREE.Vector3} start Starting point of the segment.
 * @param {THREE.Vector3} end End point of the segment.
 * @param {number} t Percentage between 0 and 1 along the segment.
 * @returns {THREE.Vector3} The interpolated point.
 */
export function interpolate(
  start: THREE.Vector3,
  end: THREE.Vector3,
  t: number
): THREE.Vector3 {
  return new THREE.Vector3(
    start.x + (end.x - start.x) * t,
    start.y + (end.y - start.y) * t,
    start.z + (end.z - start.z) * t
  );
}

/**
 * Gets the point on the path corresponding to a given percentage.
 * @param {THREE.Vector3[]} points List of points defining the path.
 * @param {number} percentage Percentage along the path (0.0 to 1.0).
 * @returns {THREE.Vector3} The point corresponding to the percentage.
 */
export function getPointOnPath(
  points: THREE.Vector3[],
  percentage: number
): THREE.Vector3 {
  // Calculate total length of the path
  const segmentLengths: number[] = [];
  let totalLength = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const segmentLength = points[i].distanceTo(points[i + 1]);
    segmentLengths.push(segmentLength);
    totalLength += segmentLength;
  }
  // Determine the target distance along the path corresponding to the percentage
  const targetDistance = percentage * totalLength;
  // Traverse the path to find the segment containing the target point
  let accumulatedDistance = 0;
  for (let i = 0; i < segmentLengths.length; i++) {
    const segmentLength = segmentLengths[i];

    if (accumulatedDistance + segmentLength >= targetDistance) {
      // The point lies within this segment
      const remainingDistance = targetDistance - accumulatedDistance;
      const t = remainingDistance / segmentLength;

      // Interpolate between the two points of the segment
      return interpolate(points[i], points[i + 1], t);
    }

    accumulatedDistance += segmentLength;
  }

  // In case of rounding errors, return the last point if clampedPercentage is exactly 1
  return points[points.length - 1];
}
