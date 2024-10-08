import * as THREE from "three";
import { GameType } from "./types";
import { draw2024 } from "./prefabs/ generation/2024";

export const getIsla = (Game: GameType) => {
  draw2024(Game)

  Game.components = {
    ...Game.components,
    // isla: hp.hexes,
  };
};

export const getPersonaje = (Game: GameType) => {
  const { scene } = Game;
  const { materials } = Game;
  const personaje = new THREE.Sprite(materials.personaje);
  personaje.position.set(0, 3, 0); // Posición inicial en el centro de la isla
  personaje.scale.set(6, 6, 3); // Ajustar tamaño del sprite
  Game.camera.lookAt(personaje.position);
  scene.add(personaje);
  Game.materials.sprites.natural.a.forEach((mat, i) => {
    console.log(mat);
    const m = new THREE.Sprite(mat);
    m.position.set(i * 5, 3, i * 5);
    m.scale.set(2, 3, 2);
    scene.add(m);
  });
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
