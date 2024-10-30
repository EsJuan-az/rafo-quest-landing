import * as THREE from "three";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MutableRefObject } from "react";
import { Hex } from "./domain/hex";
export interface GameType {
  scene: THREE.Scene;
  avance: number;
  mountRef: MutableRefObject<HTMLElement>;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  orbitControls: OrbitControls;
  lights: object;
  materials: {
    personaje: THREE.SpriteMaterial;
    sprites: {
      a: {
        flowers: THREE.SpriteMaterial[];
        palms: THREE.SpriteMaterial[];
        structure: THREE.SpriteMaterial[];
      };
      b: {
        natural: THREE.SpriteMaterial[];
        structure: THREE.SpriteMaterial[];
      };
    };
    hex: {
      debug: THREE.MeshStandardMaterial;
      checkpoint: THREE.MeshStandardMaterial;
      way: {
        a: THREE.MeshStandardMaterial;
        b: THREE.MeshStandardMaterial;
        c: THREE.MeshStandardMaterial;
        d: THREE.MeshStandardMaterial;
        e: THREE.MeshStandardMaterial;
        f: THREE.MeshStandardMaterial;
        g: THREE.MeshStandardMaterial;
        h: THREE.MeshStandardMaterial;
        i: THREE.MeshStandardMaterial;
        j: THREE.MeshStandardMaterial;
        // l: THREE.MeshStandardMaterial;
      };
      bridgeFor: {
        a: THREE.MeshStandardMaterial;
      };
      grass: {
        a: THREE.MeshStandardMaterial;
        b: THREE.MeshStandardMaterial;
        c: THREE.MeshStandardMaterial;
        l: THREE.MeshStandardMaterial;
      };
      water: {
        a: THREE.MeshStandardMaterial;
      };
      decoWay: {
        b: THREE.MeshStandardMaterial;
        b2: THREE.MeshStandardMaterial;
        d: THREE.MeshStandardMaterial;
        e: THREE.MeshStandardMaterial;
        f: THREE.MeshStandardMaterial;
        g: THREE.MeshStandardMaterial;
        h: THREE.MeshStandardMaterial;
        i: THREE.MeshStandardMaterial;
        j: THREE.MeshStandardMaterial;
      };
    };
  };
  components: object;
  gui: GUI;
  meshes: {
    hex: {
      debug: Hex;
      checkpoint: Hex;
      way: {
        a: Hex;
        b: Hex;
        c: Hex;
        d: Hex;
        e: Hex;
        f: Hex;
        g: Hex;
        h: Hex;
        i: Hex;
        j: Hex;
        // l: Hex;
      };
      bridgeFor: {
        a: Hex;
      };
      grass: {
        a: Hex;
        b: Hex;
        c: Hex;
        l: Hex;
      };
      water: {
        a: Hex;
      };
      decoWay: {
        b: Hex;
        b2: Hex;
        d: Hex;
        e: Hex;
        f: Hex;
        g: Hex;
        h: Hex;
        i: Hex;
        j: Hex;
      };
    };
  };
}

export type DummyUpdate = {
  dummy: THREE.Object3D;
  update: () => void;
  parent: Hex;
};

export enum Facing {
  N = 0,
  NE = (1 / 3) * Math.PI,
  SE = (2 / 3) * Math.PI,
  S = Math.PI,
  SW = (4 / 3) * Math.PI,
  NW = (5 / 3) * Math.PI,
}

export const CardinalPosition = {
  N: new THREE.Vector3(Math.cos(Facing.N), 0, Math.sin(Facing.N)),
  E: new THREE.Vector3(
    Math.cos(Facing.NE - Facing.N),
    0,
    Math.sin(Facing.NE - Facing.N)
  ),
  W: new THREE.Vector3(
    Math.cos(Facing.NW - Facing.N),
    0,
    Math.sin(Facing.NW - Facing.N)
  ),
  NE: new THREE.Vector3(Math.cos(Facing.NE), 0, Math.sin(Facing.NE)),
  SE: new THREE.Vector3(Math.cos(Facing.SE), 0, Math.sin(Facing.SE)),
  S: new THREE.Vector3(Math.cos(Facing.S), 0, Math.sin(Facing.S)),
  SW: new THREE.Vector3(Math.cos(Facing.SW), 0, Math.sin(Facing.SW)),
  NW: new THREE.Vector3(Math.cos(Facing.NW), 0, Math.sin(Facing.NW)),
} as const;
