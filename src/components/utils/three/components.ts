import * as THREE from "three";
import { GameType } from "./types";
import { HexPath } from "./prefabs/hex/hexPath";

// import { preferences } from "./preferences";
import { Facing } from "./prefabs/hex/hexUtils";


export const getIsla = (Game: GameType) => {
  const hp = new HexPath(Game);
  hp.doHexLine(1, Facing.NE).doHexCurve(4, Facing.NE, 1, true);
  Game.components = {
    ...Game.components,
    // isla: hp.hexes,
  };
};


export const getPersonaje = (Game: GameType) => {
  const { scene } = Game;
  const { materials } = Game;
  const personaje = new THREE.Sprite(materials.personaje);
  personaje.position.set(0, 2, 0); // Posición inicial en el centro de la isla
  personaje.scale.set(4, 4, 2); // Ajustar tamaño del sprite
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
