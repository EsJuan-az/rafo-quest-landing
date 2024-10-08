import * as THREE from "three";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GameType } from "./types";
import { Hex, HexGrass, HexWater } from "./prefabs/hex/hex";

const preferences = {
  HEX_WAY_HEIGHT: 0.5,
  HEX_WAY_RAD: 8,
  HEX_CHECKPOINT_RAD: 7.5,
  HEX_GRASS_HEIGHT: 1.5,
  HEX_WATER_HEIGHT: 0.1
}

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
    hex: {
      debug: new THREE.MeshStandardMaterial({color: 0x2a9d8f}),
      checkpoint: new THREE.MeshStandardMaterial({
        color: 0x8338ec,
        metalness: 1,
        roughness: 0.1,
        emissive: 0xb5179e,
        emissiveIntensity: 0.6,
      }),
      way: {
        a: new THREE.MeshBasicMaterial({
          color: 0xf4a261, 
          roughness: 0.3, 
        }),
        b: new THREE.MeshBasicMaterial({
          color: 0xd12e2e, 
          roughness: 0.3,
        }),
        c: new THREE.MeshBasicMaterial({
          color: 0xd12e2e, 
          roughness: 0.3,
        }),
      },
      bridgeFor: {
        a: new THREE.MeshStandardMaterial({
          color: 0x6f4e37, 
          roughness: 0.4, 
        }),
      },
      grass: {
        a: new THREE.MeshStandardMaterial({
          color: 0x2a9d8f, // Color base
          roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
        }),
        b: new THREE.MeshStandardMaterial({
          color: 0xd2e9af, // Color base
          roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
        }),
        c: new THREE.MeshStandardMaterial({
          color: 0x8cb055, // Color base
          roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
        }),
      },
      water: {
        a: new THREE.MeshStandardMaterial({
          color: 0x219ebc, // Color base
          roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
        }),
      },
      decoWay: {
        b: new THREE.MeshBasicMaterial({
          color: 0x861d1d, // Color base
          roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
        }),
        b2: new THREE.MeshBasicMaterial({
          color: 0xabaeb0, // Color base
          roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
          transparent: true, // El objeto es transparente
          opacity: 0.7, // Controla el grado de opacidad del objeto
        }),
      },
    },
  };
};

export const setMeshes = (Game: GameType) => {
  Game.meshes = {
    hex: {
      debug: new Hex(Game, 0, {
        rad: 8,
        thick: 0.3,
        material: Game.materials.hex.debug,
      }),
      checkpoint: new Hex(Game, 10, {
        rad: preferences.HEX_CHECKPOINT_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: Game.materials.hex.checkpoint,
      }),
      way: {
        a: new Hex(Game, 28, {
          rad: preferences.HEX_WAY_RAD,
          thick: preferences.HEX_WAY_HEIGHT,
          material: Game.materials.hex.way.a,
        }),
        b: new Hex(Game, 34, {
          rad: preferences.HEX_WAY_RAD,
          thick: preferences.HEX_WAY_HEIGHT,
          material: Game.materials.hex.way.b,
        }),
        c: new Hex(Game, 34, {
          rad: preferences.HEX_WAY_RAD,
          thick: preferences.HEX_WAY_HEIGHT,
          material: Game.materials.hex.way.c,
        }),
      },
      bridgeFor: {
        a: new Hex(Game, 5, {
          rad: preferences.HEX_WAY_RAD,
          thick: preferences.HEX_WAY_HEIGHT * 1.25,
          material: Game.materials.hex.bridgeFor.a,
        }),
      },
      grass: {
        a: new HexGrass(Game, 27, {
          rad: 8,
          thick: preferences.HEX_GRASS_HEIGHT,
          material: Game.materials.hex.grass.a,
        }),
        b: new HexGrass(Game, 38, {
          rad: 8,
          thick: preferences.HEX_GRASS_HEIGHT,
          material: Game.materials.hex.grass.b,
        }),
        c: new HexGrass(Game, 38, {
          rad: 8,
          thick: preferences.HEX_GRASS_HEIGHT,
          material: Game.materials.hex.grass.c,
        }),
      },
      water: {
        a: new HexWater(Game, 10, {
          rad: 8,
          thick: preferences.HEX_WATER_HEIGHT,
          material: Game.materials.hex.water.a,
        }),
      },
      decoWay: {
        b: new HexWater(Game, 12, {
          rad: 8,
          thick: preferences.HEX_WAY_HEIGHT,
          material: Game.materials.hex.decoWay.b,
        }),
        b2: new HexWater(Game, 20, {
          rad: 8,
          thick: preferences.HEX_WAY_HEIGHT,
          material: Game.materials.hex.decoWay.b2,
        }),
      }
    },
  };
};

export const setGUI = (Game: GameType) => {
  Game.gui = new GUI();
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
