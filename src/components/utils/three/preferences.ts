import * as THREE from "three";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GameType } from "./types";
import { getHexagonGeometry } from "./prefabs/geometry";
import { getColorMaterial } from "./utils";
import { Hex, HexCheckPoint } from "./prefabs/hex/hex";

export const preferences = {
  hexRad: 5,
  hexThick: 1,
  rampHeight: 5,
};

export const setBgColor = ({ renderer }: GameType) => {
  const rootStyle = getComputedStyle(document.documentElement);
  const backgroundHSL = rootStyle.getPropertyValue("--background").trim(); // Obtiene el valor HSL
  // Separar los valores de HSL (formato: "240 5.9% 10%")
  const [hue, saturation, lightness] = backgroundHSL
    .split(" ")
    .map((value) => parseFloat(value)); // Convertir a números
  const backgroundColor = new THREE.Color();
  backgroundColor.setHSL(hue / 360, saturation / 100, lightness / 100); // Convertir valores y aplicar
  renderer.setClearColor(backgroundColor);
};

export const setLights = (Game: GameType) => {
  const { scene } = Game;
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  scene.add(directionalLight);
  Game.lights = { ambientLight, directionalLight };
};

export const setMaterials = (Game: GameType) => {
  const textureLoader = new THREE.TextureLoader();
  const personajeTex = textureLoader.load("/textures/personaje.png");
  const personaje = new THREE.SpriteMaterial({
    map: personajeTex,
    transparent: true,
  });
  Game.materials = {
    personaje,
    hex:{
      base: getColorMaterial(0x2a9d8f),
      checkpoint: new THREE.MeshStandardMaterial({
        color: 0x8338ec,
        metalness: 1,
        roughness: 0.1,
        emissive: 0xb5179e, 
        emissiveIntensity: 0.6,
      }),
      waya: new THREE.MeshStandardMaterial({
        color: 0xfd8a08, // Color base 
        roughness: 0.3,  // Un poco de rugosidad para que no sea completamente reflectante
      }),
    },
    
  };
};

export const setMeshes = ( Game: GameType ) => {
  Game.meshes = {
    hex: {
      base: new Hex(Game, 50),
      checkpoint: new HexCheckPoint(Game, 10),
    }
  }
}


export const setGUI = (Game: GameType) => {
  Game.gui = new GUI();
};

export const setGeometries = (Game: GameType) => {
  Game.geometries = {
    hex: getHexagonGeometry(preferences.hexRad, preferences.hexThick),
  };
};

export const setOrbitControls = (Game: GameType) => {
  const { camera, renderer } = Game;
  const controls = new OrbitControls(camera, renderer.domElement);
  // Configura los límites de movimiento
  controls.minDistance = 25; // Distancia mínima de la cámara
  controls.maxDistance = 25; // Distancia máxima de la cámara
  controls.minPolarAngle = Math.PI / 4; // Límite inferior del ángulo vertical (45 grados)
  controls.maxPolarAngle = (75 * Math.PI) / 180; // Límite superior del ángulo vertical (90 grados)
  // controls.enablePan = false;
  controls.update();
  Game.orbitControls = controls;
};
