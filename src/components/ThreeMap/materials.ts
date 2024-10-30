import * as THREE from "three";
import { Hex } from "./domain/hex";

import preferences from "./preferences.json";
import { Game } from "./domain/game";

const textureLoader = new THREE.TextureLoader();

export const MATERIALS = {
  personaje: new THREE.SpriteMaterial({
    map: textureLoader.load("/textures/personaje.png"),
    transparent: true,
  }),
  hex: {
    debug: new THREE.MeshStandardMaterial({ color: 0x2a9d8f }),
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
        color: 0x533286,
        roughness: 0.3,
      }),
      d: new THREE.MeshBasicMaterial({
        color: 0x616566,
        roughness: 0.3,
      }),
      e: new THREE.MeshBasicMaterial({
        color: 0x29433f,
        roughness: 0.3,
      }),
      f: new THREE.MeshBasicMaterial({
        color: 0x9b8136,
        roughness: 0.3,
      }),
      g: new THREE.MeshBasicMaterial({
        color: 0x2bfafa,
        roughness: 0.3,
      }),
      h: new THREE.MeshBasicMaterial({
        color: 0xf37042,
        roughness: 0.3,
      }),
      i: new THREE.MeshBasicMaterial({
        color: 0xebdbaa,
        roughness: 0.3,
      }),
      j: new THREE.MeshBasicMaterial({
        color: 0x0066cc,
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
      l: new THREE.MeshStandardMaterial({
        color: 0xe3e3e3, // Color base
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
      d: new THREE.MeshBasicMaterial({
        color: 0x4d5152, // Color base
        roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
      }),
      e: new THREE.MeshBasicMaterial({
        color: 0xffffff, // Color base
        roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
      }),
      f: new THREE.MeshBasicMaterial({
        color: 0x333445, // Color base
        roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
      }),
      g: new THREE.MeshBasicMaterial({
        color: 0x3e4339, // Color base
        roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
      }),
      h: new THREE.MeshBasicMaterial({
        color: 0x5a5e61, // Color base
        roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
      }),
      i: new THREE.MeshBasicMaterial({
        color: 0x5e533e, // Color base
        roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
      }),
      j: new THREE.MeshBasicMaterial({
        color: 0x17426b, // Color base
        roughness: 1, // Un poco de rugosidad para que no sea completamente reflectante
      }),
    },
  },
};

export const getMeshes = (G: Game) => ({
  hex: {
    debug: new Hex(G, 0, {
      rad: 8,
      thick: 0.3,
      material: MATERIALS.hex.debug,
    }),
    checkpoint: new Hex(G, 12, {
      rad: preferences.HEX_CHECKPOINT_RAD,
      thick: preferences.HEX_WAY_HEIGHT,
      material: MATERIALS.hex.checkpoint,
    }),
    way: {
      a: new Hex(G, 28, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: MATERIALS.hex.way.a,
      }),
      b: new Hex(G, 34, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: MATERIALS.hex.way.b,
      }),
      c: new Hex(G, 23, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: MATERIALS.hex.way.c,
      }),
      d: new Hex(G, 24, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: MATERIALS.hex.way.d,
      }),
      e: new Hex(G, 16, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: MATERIALS.hex.way.e,
      }),
      f: new Hex(G, 15, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: MATERIALS.hex.way.f,
      }),
      g: new Hex(G, 13, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: MATERIALS.hex.way.g,
      }),
      h: new Hex(G, 24, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: MATERIALS.hex.way.h,
      }),
      i: new Hex(G, 12, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: MATERIALS.hex.way.i,
      }),
      j: new Hex(G, 23, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT,
        material: MATERIALS.hex.way.j,
      }),
    },
    bridgeFor: {
      a: new Hex(G, 5, {
        rad: preferences.HEX_WAY_RAD,
        thick: preferences.HEX_WAY_HEIGHT * 1.25,
        material: MATERIALS.hex.bridgeFor.a,
      }),
    },
    grass: {
      a: new Hex(G, 36, {
        rad: 8,
        thick: preferences.HEX_GRASS_HEIGHT,
        material: MATERIALS.hex.grass.a,
      }),
      b: new Hex(G, 62, {
        rad: 8,
        thick: preferences.HEX_GRASS_HEIGHT,
        material: MATERIALS.hex.grass.b,
      }),
      c: new Hex(G, 52, {
        rad: 8,
        thick: preferences.HEX_GRASS_HEIGHT,
        material: MATERIALS.hex.grass.c,
      }),
      l: new Hex(G, 6, {
        rad: 8,
        thick: preferences.HEX_GRASS_HEIGHT,
        material: MATERIALS.hex.grass.l,
      }),
    },
    water: {
      a: new Hex(G, 32, {
        rad: 8,
        thick: preferences.HEX_WATER_HEIGHT,
        material: MATERIALS.hex.water.a,
      }),
    },
    decoWay: {
      b: new Hex(G, 52, {
        rad: 8,
        thick: preferences.HEX_DECO_WAY_HEIGHT,
        material: MATERIALS.hex.decoWay.b,
      }),
      b2: new Hex(G, 20, {
        rad: 8,
        thick: preferences.HEX_DECO_WAY_HEIGHT,
        material: MATERIALS.hex.decoWay.b2,
      }),
      d: new Hex(G, 26, {
        rad: 8,
        thick: preferences.HEX_DECO_WAY_HEIGHT,
        material: MATERIALS.hex.decoWay.d,
      }),
      e: new Hex(G, 45, {
        rad: 8,
        thick: preferences.HEX_DECO_WAY_HEIGHT,
        material: MATERIALS.hex.decoWay.e,
      }),
      f: new Hex(G, 17, {
        rad: 8,
        thick: preferences.HEX_DECO_WAY_HEIGHT,
        material: MATERIALS.hex.decoWay.f,
      }),
      g: new Hex(G, 23, {
        rad: 8,
        thick: preferences.HEX_DECO_WAY_HEIGHT,
        material: MATERIALS.hex.decoWay.g,
      }),
      h: new Hex(G, 21, {
        rad: 8,
        thick: preferences.HEX_DECO_WAY_HEIGHT,
        material: MATERIALS.hex.decoWay.h,
      }),
      i: new Hex(G, 12, {
        rad: 8,
        thick: preferences.HEX_DECO_WAY_HEIGHT,
        material: MATERIALS.hex.decoWay.i,
      }),
      j: new Hex(G, 15, {
        rad: 8,
        thick: preferences.HEX_DECO_WAY_HEIGHT,
        material: MATERIALS.hex.decoWay.j,
      }),
    },
  },
});
