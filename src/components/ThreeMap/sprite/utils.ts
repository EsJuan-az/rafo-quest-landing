// import * as THREE from "three";
// import { DummyUpdate } from "../types";
// import { getRandomHexPoint } from "../utils";
// import { genIntArr } from "@/utils/general";
// interface RandomDrawOneConfig {
//   material: THREE.SpriteMaterial;
//   scale: THREE.Vector3 | undefined;
//   howMany: number;
// }
// const defaultScale = new THREE.Vector3(1, 1, 1)
// export const randomDrawOneSprite = (
//   du: DummyUpdate,
//   { material, scale = defaultScale, howMany = 1 }: RandomDrawOneConfig
// ): THREE.Sprite[] => {
//   const positions: THREE.Vector3[] = getRandomHexPoint(du.parent, howMany, scale.x * 0.5);
//   const sprites = positions.map((p: THREE.Vector3) => {
//     const sprite: THREE.Sprite = drawOneSprite(du, {
//       scale,
//       material,
//       position: p,
//     });
//     return sprite
//   })
//   return sprites;
// };
// interface DrawOneConfig {
//   scale: THREE.Vector3 | undefined;
//   material: THREE.SpriteMaterial;
//   position: THREE.Vector3;
// }
// export const drawOneSprite = (
//   du: DummyUpdate,
//   { scale = defaultScale, position, material }: DrawOneConfig
// ): THREE.Sprite => {
//   const ypos = scale.y / 2;
//   const positionDelta = new THREE.Vector3().copy(position).add(du.dummy.position).add(new THREE.Vector3(0, ypos, 0));
//   const sprite: THREE.Sprite = new THREE.Sprite(material);
//   sprite.scale.copy(scale);
//   sprite.position.copy(positionDelta);
//   return sprite;
// };

// interface RandomDrawManyConfig {
//   scale: THREE.Vector3 | undefined;
//   materials: THREE.SpriteMaterial[];
//   min: number,
//   max: number,
// }
// export const randomDrawManySprites = (
//   du: DummyUpdate,
//   { materials, scale = defaultScale, min = 0, max = 5 }: RandomDrawManyConfig
// ): THREE.Sprite[] => {
//   const numArr = genIntArr(materials.length, min, max);
//   let sprites: THREE.Sprite[] = [];
//   materials.forEach((mat: THREE.SpriteMaterial, i: number) => {
//     const howMany = numArr[i];
//     if(howMany === 0) return;
//     const newSprites = randomDrawOneSprite(du, {
//       material: mat,
//       scale,
//       howMany,
//     })
//     sprites = sprites.concat(newSprites)
//   });
//   return sprites;
// };
