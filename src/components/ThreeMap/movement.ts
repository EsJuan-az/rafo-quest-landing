import * as THREE from "three";
import { Tween, Easing, Group } from "@tweenjs/tween.js";
import { Game } from "./domain/game";
import { getPointOnPath } from "./domain/utils";

const tweenGroup = new Group();

/**
 * Mueve un objeto 3D con una transición suave utilizando Tween.js.
 * 
 * @param G - La instancia del juego que contiene los componentes necesarios.
 * @param bk - Índice de la isla (entero) que define la posición de referencia.
 * @param pct - Progreso (float) que indica el punto exacto en la trayectoria.
 */
export const $moveChar = (G: Game, bk: number, pct: number) => {
  // Obtener los componentes necesarios
  const { characters: { me }, island } = G.components;

  if (!me) {
    console.error("El personaje principal no está definido.");
    return;
  }

  if (!island[bk]) {
    console.error(`No se encontró la isla con índice ${bk}.`);
    return;
  }

  // Obtener la nueva posición de destino
  const targetPosition = getPointOnPath(island[bk].points, pct).add(me.initialPosition);

  // Configurar el tween para mover el objeto
  const characterTween = new Tween(me.position, tweenGroup)
    .to({
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
    }, 3000) // Duración de 3000ms
    .easing(Easing.Quadratic.InOut) // Efecto de suavizado
    .onUpdate(() => {
      G.orbitControls.target.copy(me.position); // Actualizar el objetivo de la cámara
      G.camera.lookAt(me.position); // Hacer que la cámara mire al personaje
    })
    .start();
};

/**
 * Inicia la animación continua del juego, actualizando los tweens.
 * 
 * @param G - La instancia del juego que contiene la escena y la cámara.
 */
export const animate = (G: Game) => {
  requestAnimationFrame(() => animate(G));
  tweenGroup.update();
  G.renderer.render(G.scene, G.camera);
};
