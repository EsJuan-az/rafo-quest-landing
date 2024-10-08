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
      };
      bridgeFor: {
        a: THREE.MeshStandardMaterial;
      };
      grass: {
        a: THREE.MeshStandardMaterial;
      };
      water: {
        a: THREE.MeshStandardMaterial;
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
      };
      bridgeFor: {
        a: Hex;
      };
      grass: {
        a: Hex;
      };
      water: {
        a: Hex;
      };
    };
  };
}

export type DummyUpdate = {
  dummy: THREE.Object3D;
  update: () => void;
  parent: Hex;
};
