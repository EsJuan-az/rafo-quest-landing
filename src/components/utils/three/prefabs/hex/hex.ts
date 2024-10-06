import { DummyUpdate, GameType } from "../../types";
import * as THREE from "three";

export class Hex extends THREE.InstancedMesh {
  public Game: GameType;
  public index: number = 0;
  public instances: number;
  constructor(
    Game: GameType,
    instances: number,
    material?: THREE.MeshStandardMaterial
  ) {
    super(Game.geometries.hex, material || Game.materials.hex.base, instances);
    this.instances = instances;
    this.Game = Game;
    this.Game.scene.add(this);
  }

  onFirstUpdate(dummy){

  }

  get dummy(): DummyUpdate {
    if(this.index > this.instances){
      throw new Error('not enough hexes');
    }
    const $dummy = new THREE.Object3D();
    const actualIndex = this.index;
    $dummy.firstUpdate = true;

    this.getMatrixAt(actualIndex, $dummy.matrix);
    $dummy.matrix.decompose($dummy.position, $dummy.quaternion, $dummy.scale);

    const update = () => {
      if($dummy.firstUpdate){
        this.onFirstUpdate($dummy);
        $dummy.firstUpdate = false;
      }
      $dummy.updateMatrix();
      this.setMatrixAt(actualIndex, $dummy.matrix);
      this.instanceMatrix.needsUpdate = true; // Asegura que la matriz se actualice en la GPU
    };

    this.index += 1;
    return {dummy: $dummy, update};
    // TODO: Hacer a partir de aquí en utils y hexPath.
  }
}

export class HexCheckPoint extends Hex {
  constructor(Game: GameType, instances: number) {
    super(Game, instances, Game.materials.hex.checkpoint);
  }
}
