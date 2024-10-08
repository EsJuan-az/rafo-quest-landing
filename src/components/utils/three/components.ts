import * as THREE from "three";
import { GameType } from "./types";
import { HexPath } from "./prefabs/hex/hexPath";


import { Facing } from "./prefabs/hex/hexUtils";


export const getIsla = (Game: GameType) => {
  const hp = new HexPath(Game);
  hp
  .setHexClass(Game.meshes.hex.way.a)
  .doHexLine(2, Facing.NE)
  .doHexCurve(3, Facing.SE, true)
  .doHexLine(1, Facing.S)
  .doHexCurve(4, Facing.SE, true)
  .doHexLine(1, Facing.NW)
  .doHexCurve(2, Facing.N)
  .doHexCurve(2, Facing.NW, true)
  .doHexCurve(2, Facing.N, true)
  .doHexLine(3, Facing.NE)
  .doHexCurve(4, Facing.N, true)
  .doHexCurve(2, Facing.S)
  .setHexClass(Game.meshes.hex.bridgeFor.a)
  .doHexLine(1, Facing.SE)
  .doHexRamp(1, Facing.S)
  .doHexRamp(1, Facing.S, false)
  .setHexClass(Game.meshes.hex.way.a)
  .doHexCurve(2, Facing.SW)
  .fixPathEnd()
  .setHexClass(Game.meshes.hex.grass.a)
  .doHexLine(1, Facing.SE, 1)
  .doHexCurve(2, Facing.N, true, 1, 1)
  .doHexLine(1, Facing.NE, 4)
  .doHexLine(2, Facing.SE, 4)
  .doHexLine(2, Facing.NW, 8)
  .doHexCurve(3, Facing.S, false, 1, 10)
  .doHexLine(1, Facing.NW, 11)
  .doHexCurve(3, Facing.NW, true, 1, 15)
  .doHexLine(1, Facing.NE, 15)
  .doHexLine(2, Facing.SE, 15)
  .doHexCurve(3, Facing.NW, true, 1, 20)
  .doHexCurve(3, Facing.SE, false, 1, 31)
  .setHexClass(Game.meshes.hex.water.a)
  .doHexCurve(2, Facing.NE, true, 1, 2)
  .doHexCurve(2, Facing.S, false, 2, 26)
  .doHexCurve(1, Facing.S, false, 1, 27)
  .doHexCurve(3, Facing.N, true, 1, 32)
  .fixPathEnd()
  
  const hp2 = hp.getChainedHexPath(Game, Facing.S);

  hp2
  .setHexClass(Game.meshes.hex.way.b)
  .doHexLine(2, Facing.S)
  .doHexLine(4, Facing.SW)
  .doHexCurve(2, Facing.S, true)
  .doHexCurve(2, Facing.S)
  .doHexLine(1, Facing.S)
  .doHexLine(2, Facing.SE)
  .doHexCurve(2, Facing.NE)
  .doHexCurve(2, Facing.NE, true)
  .doHexLine(2, Facing.SE)
  .doHexCurve(2, Facing.NE)
  .doHexCurve(2, Facing.N, true)
  .doHexCurve(2, Facing.SE)
  .doHexCurve(2, Facing.NE)
  .doHexLine(2, Facing.NW)
  .doHexCurve(2, Facing.N, true)
  .doHexCurve(2, Facing.NE, true)
  .doHexCurve(2, Facing.NE, true)

  // .doHexCurve(2, Facing.NW)
  // .doHexCurve(2, Facing.NE)
  // .doHexLine(2, Facing.NW)
  // .doHexCurve(2, Facing.N, true)

  console.log(hp.path)
  
  Game.components = {
    ...Game.components,
    // isla: hp.hexes,
  };
};


export const getPersonaje = (Game: GameType) => {
  const { scene } = Game;
  const { materials } = Game;
  const personaje = new THREE.Sprite(materials.personaje);
  personaje.position.set(0, 4, 0); // Posición inicial en el centro de la isla
  personaje.scale.set(8, 8, 4); // Ajustar tamaño del sprite
  Game.camera.lookAt(personaje.position);
  scene.add(personaje);
  Game.components = {
    ...Game.components,
    personaje,
  };
};

export const setPerspectiveCamera = (Game: GameType) => {
  const {
    mountRef: { current: mountElement },
  } = Game;
  const camera = new THREE.PerspectiveCamera(
    75,
    mountElement.clientWidth / mountElement.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 10, 15);
  Game.camera = camera;
};

export const renderComponents = (Game: GameType) => {
  getPersonaje(Game);
  getIsla(Game);
};
