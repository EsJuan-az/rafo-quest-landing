import { DummyUpdate, Facing, GameType } from "../types";
import { Hex } from "./hex";
import { getHexCurve, getHexLines, getHexRamp } from "./utils";
import { Game } from "./game";
import * as THREE from 'three';

export class HexPath {
  public Game: Game;
  public points: THREE.Vector3[] = [];
  public path: DummyUpdate[] = [];
  public decorativePath: DummyUpdate[] = [];
  public chainable: DummyUpdate | null = null;
  public chainedPaths: HexPath[] = [];
  public HexClass: Hex;
  addLastHexPoint(){
    this.points.push(this.hexAt(-1).dummy.position.clone());
  }
  getChainedHexPath(facing: Facing) {
    if (!this.chainEdge) {
      throw new Error("no chain edge");
    }
    const instance = new HexPath(this.Game, this.chainEdge);
    instance.setHexClass(this.Game.meshes.hex.checkpoint);
    instance.doHexLine(1, facing);
    instance.setHexClass(this.Game.meshes.hex.debug);
    instance.addLastHexPoint();
    return instance;
  }
  constructor(G: Game, initialHex: DummyUpdate | undefined = undefined) {
    this.Game = G;
    this.HexClass = G.meshes.hex.debug;
    if (initialHex) {
      this.path.push(initialHex);
    } else {
      this.path.push(G.meshes.hex.checkpoint.dummy);
      this.addLastHexPoint();
    }
  }

  fixPathEnd() {
    this.chainable = this.hexAt(-1);
    return this;
  }

  get chainEdge(): DummyUpdate | null {
    return this.chainable;
  }

  setHexClass(hc: Hex) {
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
    this.points = this.points.concat(newHexes.map(({dummy}) => dummy.position.clone()))
    return this;
  }

  doHexCurve(
    num: number,
    facing: Facing,
    clock: boolean = false,
    curveSize: number = 1,
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
    this.points = this.points.concat(newHexes.map(({dummy}) => dummy.position.clone()))
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
      this.HexClass.config.rad,
      rampUp
    );
    this.addHexes(newHexes);
    const first = newHexes.shift();
    const last = newHexes.pop();
    this.points = this.points.concat(newHexes.map(({dummy}) => dummy.position.clone()))
    const corners = new THREE.Vector3(Math.cos(facing), 0, Math.sin(facing)).multiplyScalar(Math.sqrt(3) * this.HexClass.config.rad / 2);
    if(first.dummy) this.points.push(first.dummy.position.clone().add(corners));
    if(last.dummy) this.points.push(last.dummy.position.clone().add(corners.clone().multiplyScalar(-1)));
    return this;
  }

  addHexes(newHexes: DummyUpdate[]) {
    newHexes.forEach(({ update }) => update());
    if (!this.chainEdge) {
      this.path.push(...newHexes);
    } else {
      this.decorativePath.push(...newHexes);
    }
  }
}
