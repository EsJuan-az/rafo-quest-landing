import * as THREE from "three";
import { draw2024 } from "../ generation/2024";
import { Game } from "./game";
import { getMeshes, MATERIALS } from "../materials";
import preferences from '../preferences.json';
export class Loader {
  static set(G: Game) {
    G.setMeshes(getMeshes(G));
    return {
      personaje: this.loadCharacter(G),
      map: this.loadIsla(G),
    }
  }
  static loadIsla(G: Game) {
    return draw2024(G);
  }
  static loadCharacter(G: Game) {
    const personaje = new THREE.Sprite(MATERIALS.personaje);
    personaje.position.set(0, preferences.CHAR_HEIGHT / 2, 0); // Posición inicial en el centro de la isla
    personaje.scale.set(preferences.CHAR_WIDTH, preferences.CHAR_HEIGHT, 3); // Ajustar tamaño del sprite
    G.camera.lookAt(personaje.position);
    G.scene.add(personaje);
    return personaje;
  }
}
