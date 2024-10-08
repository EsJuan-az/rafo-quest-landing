import * as THREE from "three";
import { GameType } from "./types";
import { HexPath } from "./prefabs/hex/hexPath";


import { Facing } from "./prefabs/hex/hexUtils";


export const getIsla = (Game: GameType) => {
  const hp = new HexPath(Game); // El amor en los tiempos del cólera
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
  .doHexLine(2, Facing.S, 8)
  .doHexCurve(2, Facing.S, false, 1, 10)
  .doHexLine(1, Facing.NW, 11)
  .doHexCurve(3, Facing.NW, true, 1, 15)
  .doHexLine(1, Facing.NE, 15)
  .doHexLine(2, Facing.SE, 15)
  .doHexCurve(3, Facing.NW, true, 1, 20)
  .doHexCurve(3, Facing.SE, false, 1, 31)
  .doHexCurve(2, Facing.SW, false, 1, 33)
  .setHexClass(Game.meshes.hex.water.a)
  .doHexCurve(2, Facing.NE, true, 1, 2)
  .doHexCurve(2, Facing.S, false, 2, 26)
  .doHexCurve(3, Facing.S, false, 1, 27)
  .doHexLine(1, Facing.SE, 27)
  .doHexCurve(3, Facing.N, true, 1, 32)
  .fixPathEnd()
  
  const hp2 = hp.getChainedHexPath(Game, Facing.S); // La lista de Schindler
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
  .doHexCurve(1, Facing.NE, true)
  .fixPathEnd()
  .setHexClass(Game.meshes.hex.grass.b)
  .doHexCurve(2, Facing.NE, false, 1, 3)
  .doHexLine(2, Facing.S, 3)
  .doHexCurve(2, Facing.NW, false, 1, 4)
  .doHexCurve(2, Facing.NW, false, 1, 7)
  .doHexLine(2, Facing.SW, 9)
  .doHexLine(2, Facing.NE, 12)
  .doHexCurve(2, Facing.S, false, 1, 12)
  .doHexLine(1, Facing.SW, 16)
  .doHexCurve(2, Facing.S, false, 1, 18)
  .doHexCurve(2, Facing.NW, true, 1, 21)
  .doHexCurve(2, Facing.NE, false, 1, 21)
  .doHexLine(1, Facing.N, 24)
  .doHexLine(1, Facing.S, 25)
  .doHexLine(2, Facing.S, 26)
  .doHexLine(1, Facing.NE, 27)
  .doHexLine(1, Facing.SW, 31)
  .doHexLine(4, Facing.SE, 31)
  .doHexLine(1, Facing.SW, 31)
  .doHexLine(1, Facing.SE, 32)
  .doHexCurve(3, Facing.N, true, 1, 32)
  .doHexLine(1, Facing.N, 35)
  .doHexLine(1, Facing.NE, 35)
  .setHexClass(Game.meshes.hex.decoWay.b)
  .doHexLine(2, Facing.S, 4)
  .doHexLine(2, Facing.NW, 9)
  .doHexLine(2, Facing.SW, 12)
  .doHexCurve(2, Facing.SE, false, 1, 21)
  .doHexLine(2, Facing.N, 23)
  .doHexCurve(2, Facing.SE, false, 1, 27)
  .setHexClass(Game.meshes.hex.decoWay.b2)
  .doHexLine(1, Facing.SW, 7)
  .doHexCurve(2, Facing.SE, false, 1, 7)
  .doHexLine(1, Facing.SW, 10)
  .doHexCurve(3, Facing.S, true, 1, 14)
  .doHexLine(2, Facing.S, 15)
  .doHexLine(2, Facing.S, 17)
  .doHexLine(1, Facing.NE, 18)
  .doHexCurve(2, Facing.S, true, 1, 21)
  .doHexLine(1, Facing.NW, 23)
  .doHexLine(2, Facing.NE, 24)
  .doHexCurve(2, Facing.NW, false, 1, 32)
  .doHexLine(1, Facing.S, 35)
  .fixPathEnd()

  const hp3 = hp2.getChainedHexPath(Game, Facing.SE); // La guía del mago frugal para sobrevivir en la Inglaterra del medievo
  hp3
  .setHexClass(Game.meshes.hex.way.c)
  .doHexCurve(2, Facing.SE)
  .doHexCurve(2, Facing.NE)
  .doHexLine(2, Facing.NW)
  .doHexCurve(3, Facing.N)
  .doHexLine(3, Facing.NW)
  .doHexRamp(1, Facing.N)
  .doHexRamp(1, Facing.N, false)
  .doHexCurve(4, Facing.NE)
  .doHexLine(2, Facing.SW)
  .doHexLine(1, Facing.NW)
  .fixPathEnd()
  .setHexClass(Game.meshes.hex.grass.c)
  .doHexLine(2, Facing.N, 2)
  .doHexLine(1, Facing.N, 3)
  .doHexLine(1, Facing.SE, 8)
  .doHexLine(1, Facing.NE, 8)
  .doHexLine(1, Facing.N, 8)
  .doHexLine(2, Facing.N, 9)
  .doHexLine(3, Facing.N, 10)
  .doHexLine(2, Facing.N, 11)
  .doHexLine(1, Facing.SW, 13)
  .doHexLine(1, Facing.NW, 13)
  .doHexLine(2, Facing.SW, 19)
  .doHexLine(1, Facing.N, 23)
  .doHexLine(2, Facing.SW, 23)
  .setHexClass(Game.meshes.hex.water.a)
  .doHexCurve(2, Facing.N, true, 2, 12)
  .doHexCurve(2, Facing.N, true, 2, 13)
  .doHexCurve(2, Facing.SE, false, 1, 17)
  .doHexCurve(2, Facing.S, true, 1, 23)
  .doHexLine(3, Facing.SE, 23)
  .fixPathEnd()
  
  const hp4 = hp3.getChainedHexPath(Game, Facing.N);
  
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
