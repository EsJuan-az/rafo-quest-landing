import * as THREE from "three";
import { GUI } from 'dat.gui'
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
    personaje: THREE.SpriteMaterial,
    hex: {
      base: THREE.MeshStandardMaterial,
      checkpoint: THREE.MeshStandardMaterial
    }
  };
  components: object;
  geometries: {
    hex: THREE.ExtrudeGeometry
  };
  gui: GUI;
  meshes: {
    hex: {
      base: Hex,
      checkpoint: Hex
    }
  };
}

export type DummyUpdate = {
  dummy: THREE.Object3D,
  update: () => void,
}
