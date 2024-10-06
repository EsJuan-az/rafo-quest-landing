import * as THREE from "three";
import { GameType } from "./types";
import {
  setBgColor,
  setGeometries,
  setGUI,
  setLights,
  setMaterials,
  setMeshes,
  setOrbitControls,
} from "./preferences";
import { renderComponents } from "./components";
import { animate } from "./movement";

export const setScene = (Game: GameType) => {
  Game.scene = new THREE.Scene();
};
export const setRenderer = (Game: GameType) => {
  const {
    mountRef: { current: mountElement },
  } = Game;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
  mountElement.appendChild(renderer.domElement);
  Game.renderer = renderer;
};
export const handleResize = ({
  mountRef: { current: mountElement },
  renderer,
  camera,
}: GameType) => {
  if (mountElement) {
    const width = mountElement.clientWidth;
    const height = mountElement.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
};

export const setComponents = (Game: GameType) => {
  // --- Iluminación ---
  setLights(Game);
  setBgColor(Game);
  // DEBUG
  setOrbitControls(Game);
  // setGUI(Game);
  // --- Cargar Texturas ---
  setMaterials(Game);
  setGeometries(Game);
  setMeshes(Game);
  // --- Crear la Componentes ---
  renderComponents(Game);
  // --- Animación ---
  animate(Game);
};
