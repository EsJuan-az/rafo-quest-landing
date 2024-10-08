import * as THREE from "three";
import naturalA from "./processor/naturalA.json";
interface AtlasData{
  frames: object,
  meta: {
    image: string,
    size: object,
    scale: string,
  }
}
const processSprite = function (
  tl: THREE.TextureLoader,
  atlas: AtlasData
): Promise<THREE.SpriteMaterial[]> {
  const { frames, meta } = atlas;
  return new Promise((resolve, reject) => {
    tl.load(`/textures/sprites/${meta.image}`, (texture) => {

      const spriteMaterials: THREE.SpriteMaterial[] = Object.values(frames).map(
        (frameData: object) => {
          const { frame } = frameData;
          const { x, y, w, h } = frame;

          const material = new THREE.SpriteMaterial({
            map: new THREE.Texture(texture.image),
          });

          // Ajustar la porción de la textura que el sprite usará
          // Ajustar el offset y el repeat para mostrar la porción correcta del sprite sheet
          material.map.offset.set(x / meta.size.w, 1 - (y + h) / meta.size.h);
          material.map.repeat.set(w / meta.size.w, h / meta.size.h);

          // Marcar la textura para que sea actualizada
          material.map.needsUpdate = true;

          return material;
        }
      );
      resolve(spriteMaterials);
    });
  });
};

export const ProcessNaturalA = (tl:THREE.TextureLoader) => processSprite(tl, naturalA)