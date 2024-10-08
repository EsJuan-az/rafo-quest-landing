import * as THREE from "three";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MutableRefObject } from "react";
import { Hex } from "./prefabs/hex/hex";
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
    hex: {
      debug: THREE.MeshStandardMaterial;
      checkpoint: THREE.MeshStandardMaterial;
      way: {
        a: THREE.MeshStandardMaterial;
        b: THREE.MeshStandardMaterial;
        c: THREE.MeshStandardMaterial;
        d: THREE.MeshStandardMaterial;
        // e: THREE.MeshStandardMaterial;
        // f: THREE.MeshStandardMaterial;
        // g: THREE.MeshStandardMaterial;
        // h: THREE.MeshStandardMaterial;
        // i: THREE.MeshStandardMaterial;
        // j: THREE.MeshStandardMaterial;
        // k: THREE.MeshStandardMaterial;
        // l: THREE.MeshStandardMaterial;
      };
      bridgeFor: {
        a: THREE.MeshStandardMaterial;
      };
      grass: {
        a: THREE.MeshStandardMaterial;
        b: THREE.MeshStandardMaterial;
        c: THREE.MeshStandardMaterial;
        // e: THREE.MeshStandardMaterial;
        // f: THREE.MeshStandardMaterial;
        // g: THREE.MeshStandardMaterial;
        // h: THREE.MeshStandardMaterial;
        // i: THREE.MeshStandardMaterial;
        // j: THREE.MeshStandardMaterial;
        // k: THREE.MeshStandardMaterial;
        // l: THREE.MeshStandardMaterial;
      };
      water: {
        a: THREE.MeshStandardMaterial;
      };
      decoWay: {
        b: THREE.MeshStandardMaterial;
        b2: THREE.MeshStandardMaterial;
        d: THREE.MeshStandardMaterial;
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
        // e: Hex;
        // f: Hex;
        // g: Hex;
        // h: Hex;
        // i: Hex;
        // j: Hex;
        // k: Hex;
        // l: Hex;
      };
      bridgeFor: {
        a: Hex;
      };
      grass: {
        a: Hex;
        b: Hex;
        c: Hex;
        // e: Hex;
        // f: Hex;
        // g: Hex;
        // h: Hex;
        // i: Hex;
        // j: Hex;
        // k: Hex;
        // l: Hex;
      };
      water: {
        a: Hex;
      };
      decoWay: {
        b: Hex;
        b2: Hex;
        d: Hex;
      };
    };
  };
}

export type DummyUpdate = {
  dummy: THREE.Object3D;
  update: () => void;
  parent: Hex;
};
