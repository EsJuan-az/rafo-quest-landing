import { preferences } from "../../preferences";
import { Constructor, DummyUpdate, GameType } from "../../types";
import { Hex } from "./hex";
import * as THREE from "three";
import config from "../../../../../../tailwind.config";

export enum Facing {
  N = 0,
  NE = (1 / 3) * Math.PI,
  SE = (2 / 3) * Math.PI,
  S = Math.PI,
  SW = (4 / 3) * Math.PI,
  NW = (5 / 3) * Math.PI,
}

export const getHexLines = (
  HexClass: Hex,
  Game: GameType,
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

export const getHexCurve = (
  HexClass: Hex,
  Game: GameType,
  initial: DummyUpdate,
  num: number,
  angle: number,
  curveSize: number = 1,
  clock: boolean = false
): DummyUpdate[] => {
  const curveSegment: DummyUpdate[] = getHexLines(
    HexClass,
    Game,
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
      Game,
      lastHex,
      num - 1,
      angle + (clock ? Math.PI / 3 : -Math.PI / 3),
      curveSize,
      clock
    ),
  ];
};

export const getHexRamp = (
  HexClass: Hex,
  Game: GameType,
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
  const hexes = getHexLines(HexClass, Game, initial, num + 1, angle).map(
    (
      current: DummyUpdate,
      i: number,
      arr: DummyUpdate[]
    ) => {
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
