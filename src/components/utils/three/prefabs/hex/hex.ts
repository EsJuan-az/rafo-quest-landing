import { DummyUpdate, GameType } from "../../types";
import * as THREE from "three";
import { getHexagonGeometry } from "../geometry";

interface HexConfig{
  rad: number,
  thick: number,
  material?: THREE.MeshStandardMaterial
}


export class Hex extends THREE.InstancedMesh {
  public Game: GameType;
  public index: number = 0;
  public instances: number;
  public config: HexConfig;
  constructor(
    Game: GameType,
    instances: number,
    config: HexConfig,
  ) {
    const geometry = getHexagonGeometry(config.rad, config.thick);
    super(geometry, config.material || Game.materials.hex.debug, instances);
    this.config = {
      ...config,
      material: config.material || Game.materials.hex.debug,
    }
    this.instances = instances;
    this.initialPosition();
    this.Game = Game;
    this.Game.scene.add(this);
  }
  initialPosition(){
    const position = new THREE.Vector3(0, this.config.thick, 0);
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1); // Mantener escala predeterminada
    const matrix = new THREE.Matrix4()
    matrix.compose(position, rotation, scale);
    
    for (let i = 0; i < this.instances; i++) {
      this.setMatrixAt(i, matrix);
    }

  }
  onUpdate(dummy){ // Here we add sprites to the position as we want.

  }

  get dummy(): DummyUpdate {
    if(this.index > this.instances){
      throw new Error('not enough hexes');
    }
    const $dummy = new THREE.Object3D();
    const actualIndex = this.index;

    this.getMatrixAt(actualIndex, $dummy.matrix);
    $dummy.matrix.decompose($dummy.position, $dummy.quaternion, $dummy.scale);

    const update = () => {
      $dummy.updateMatrix();
      this.setMatrixAt(actualIndex, $dummy.matrix);
      this.instanceMatrix.needsUpdate = true; // Asegura que la matriz se actualice en la GPU
      this.onUpdate($dummy);
    };

    this.index += 1;
    return {dummy: $dummy, update, parent: this};
    // TODO: Hacer a partir de aquí en utils y hexPath.
  }
}

export class HexGrass extends Hex {
  // constructor(
  //   Game: GameType,
  //   instances: number,
  //   config: HexConfig,
  // ) {
  //   super(Game, instances, config);
  // }
}
export class HexWater extends Hex{
  
}