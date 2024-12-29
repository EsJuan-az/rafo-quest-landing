import * as THREE from "three";
import { draw2024 } from "../ generation/2024";
import { Game } from "./game";
import { getMeshes, MATERIALS } from "../materials";
import preferences from "../preferences.json";
import { RafoUser } from "@/types/userTypes";
import { HexPath } from "./path";
import { getPointOnPath } from "./utils";
import { CardinalPosition } from "../types";

export class Loader {
  static set(G: Game, users: RafoUser[], myId: string) {
    G.setMeshes(getMeshes(G));
    const island = this.loadIsla(G);

    G.setComponents({
      characters: this.loadCharacters(G, users, island, myId),
      island,
    });
  }

  static loadIsla(G: Game) {
    return draw2024(G);
  }

  static loadCharacters(G: Game, users: RafoUser[], island: HexPath[], myId: string) {
    let me: THREE.Sprite | null = null;
    const initialPositions = Object.values(CardinalPosition);
    
    const chars = users.map((u: RafoUser, i: number) => {
      const char = new THREE.Sprite(MATERIALS.personaje);

      // Calcular avance en el libro
      const pct = u?.currentBook?.UserBookData?.advanceRatio || 0;
      const book = u?.currentBook?.sortIndex || 0;

      // Validar existencia de la isla y sus puntos
      if (!island[book] || !island[book].points) {
        console.warn(`Invalid island or points for book index ${book}`);
        return null;
      }

      // Posición inicial basada en CardinalPosition
      const initialPosition = initialPositions[i % initialPositions.length]
      .clone()
      .multiplyScalar(preferences.HEX_WAY_RAD / 4)
      .add(new THREE.Vector3(0, preferences.CHAR_HEIGHT / 2, 0));

      const pos = getPointOnPath(island[book].points, pct)
        .add(initialPosition);

      // Configurar propiedades del sprite
      char.initialPosition = initialPosition;
      char.position.copy(pos);
      char.scale.set(preferences.CHAR_WIDTH, preferences.CHAR_HEIGHT, 3);

      // Si el usuario es el actual
      if (myId === u.id) {
        me = char;
        G.camera.position.add(pos);
        G.camera.lookAt(char.position);

        // Sincronizar OrbitControls
        G.orbitControls.target.copy(pos);
        G.orbitControls.update();
      }

      G.scene.add(char);
      return char;
    });

    // Filtrar personajes nulos
    const validChars = chars.filter((char) => char !== null) as THREE.Sprite[];

    return { chars: validChars, me };
  }
}
