import * as THREE from "three";
import { Tween, Easing, Group } from "@tweenjs/tween.js";
import { sumPosition } from "@/utils/general";
import { GameType } from "./types";
import { Game } from "./domain/game";
const tweenGroup = new Group();

export const moverPersonaje = (Game: GameType) => {
  const {
    camera,
    components: { personaje },
    orbitControls,
  } = Game;
  if (!personaje || !camera) return;
  // Verificar si hay más pasos por avanzar
  const avance = {
    x: 3,
    y: 0,
    z: 3,
  };
  Game.avance += 1;
  // Crear un objeto para la posición del personaje
  const charPosition = { ...personaje.position };
  // Configurar el tween para mover el personaje
  const characterTween = new Tween(charPosition)
    .to(sumPosition(charPosition, avance), 1000)
    .onUpdate((pos) => {
      personaje.position.lerp(pos, 1);
      // camera.position.set(pos.x, pos.y + 10, pos.z + 15);
      orbitControls.target.set(pos.x, pos.y, pos.z);

      camera.lookAt(pos.x, pos.y, pos.z);
    })
    .start();

  tweenGroup.add(characterTween);
};

export const animate = (G: Game) => {
  requestAnimationFrame(() => animate(G));
  tweenGroup.update();
  G.renderer.render(G.scene, G.camera);
};
