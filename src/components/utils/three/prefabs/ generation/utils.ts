import * as THREE from "three";
import { DummyUpdate, GameType } from "../../types";
import { getRandomHexPoint } from "../../utils";

export const randomDraw = (
  Game: GameType,
  du: DummyUpdate,
  material: THREE.SpriteMaterial,
  num: number = 1,
  scale: number[] = [1, 1, 1]
): THREE.Sprite[] => {
  const sprites = [];
  for (let i = 1; i <= num; i++) {
    const positionDelta: THREE.Vector3 = getRandomHexPoint(du.parent);
    const sprite: THREE.Sprite = draw(Game, du, positionDelta, material, scale);
    sprites.push(sprite);
  }

  return sprites;
};

export const draw = (
  Game: GameType,
  du: DummyUpdate,
  position: THREE.Vector3,
  material: THREE.SpriteMaterial,
  scale: number[] = [1, 1, 1]
): THREE.Sprite => {
  const positionDelta = new THREE.Vector3().copy(position);
  positionDelta.add(du.dummy.position);
  const sprite: THREE.Sprite = new THREE.Sprite(material);
  sprite.scale.set(scale[0], scale[1], scale[2]);
  sprite.position.copy(positionDelta);
  Game.scene.add(sprite);
  return sprite;
};
