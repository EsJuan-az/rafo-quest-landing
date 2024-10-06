import { Constructor, DummyUpdate, GameType } from '../../types';
import * as THREE from "three";
import { Hex, HexCheckPoint } from "./hex";
import { Facing, getHexCurve, getHexLines, getHexRamp } from "./hexUtils";
import { preferences } from '../../preferences';
export enum HexPathAction {
  LINE = "line",
  CURVE = "curve",
  RAMP = "tamp",
}


export class HexPath {
  public Game: GameType;
  public path: DummyUpdate[] = [];
  public decorativePath: DummyUpdate[] = [];
  public chainable: DummyUpdate | null = null;
  public chainedPaths: HexPath[] = [];
  public HexClass: Hex;

  getChainedHexPath(Game: GameType, facing: Facing){
    if(!this.chainEdge){
      throw new Error('no chain edge');
    }
    const instance = new HexPath(Game, this.chainEdge);
    instance.setHexClass(Game.meshes.hex.checkpoint);
    instance.doHexLine(1, facing)
    instance.setHexClass(Game.meshes.hex.base);
    return instance;
  }

  constructor(Game: GameType, initialHex: DummyUpdate | undefined = undefined) {
    this.Game = Game;
    this.HexClass = Game.meshes.hex.base;
    if(initialHex){
      this.path.push(initialHex);
    }else{
      this.path.push(Game.meshes.hex.checkpoint.dummy)
    }
    
  }

  fixPathEnd(){
    this.chainable = this.hexAt(-1);
    return this;
  }

  get chainEdge(): DummyUpdate | null{
    return this.chainable;
  }

  setHexClass(hc: Hex){
    this.HexClass = hc;
    return this;
  }

  hexAt(index: number): DummyUpdate {
    const hex = this.path.at(index);
    if (!hex) throw new Error("Hex doesnt exist");
    return hex;
  }

  doHexLine(num: number, facing: Facing, initialIndex: number = -1) {
    const [, ...newHexes] = getHexLines(
      this.HexClass,
      this.Game,
      this.hexAt(initialIndex),
      num,
      facing
    );
    this.addHexes(newHexes);
    return this;
  }

  doHexCurve(
    num: number,
    facing: Facing,
    curveSize: number = 1,
    clock: boolean = false,
    initialIndex: number = -1
  ) {
    const [, ...newHexes] = getHexCurve(
      this.HexClass,
      this.Game,
      this.hexAt(initialIndex),
      num,
      facing,
      curveSize,
      clock
    );
    this.addHexes(newHexes);
    return this;
  }

  doHexRamp(
    num: number,
    facing: Facing,
    rampUp: boolean = true,
    initialIndex: number = -1
  ) {
    const [, ...newHexes] = getHexRamp(
      this.HexClass,
      this.Game,
      this.hexAt(initialIndex),
      num,
      facing,
      preferences.rampHeight,
      rampUp
    );
    this.addHexes(newHexes);
    return this;
  }

  addHexes(newHexes: DummyUpdate[]){
    if(!this.chainEdge){
      this.path = this.path.concat(newHexes);
    }else{
      this.decorativePath = this.path.concat(newHexes);
    }
  }
}
