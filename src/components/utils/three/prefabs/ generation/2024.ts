import { GameType } from "../../types";
import { HexPath } from "../hex/hexPath";
import { Facing } from "../hex/hexUtils";

const drawAmorEnLosTiempos = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.a)
    .doHexLine(2, Facing.NE)
    .doHexCurve(3, Facing.SE, true)
    .doHexLine(1, Facing.S)
    .doHexCurve(4, Facing.SE, true)
    .doHexLine(1, Facing.NW)
    .doHexCurve(2, Facing.N)
    .doHexCurve(2, Facing.NW, true)
    .doHexCurve(2, Facing.N, true)
    .doHexLine(3, Facing.NE)
    .doHexCurve(4, Facing.N, true)
    .doHexCurve(2, Facing.S)
    .setHexClass(Game.meshes.hex.bridgeFor.a)
    .doHexLine(1, Facing.SE)
    .doHexRamp(1, Facing.S)
    .doHexRamp(1, Facing.S, false)
    .setHexClass(Game.meshes.hex.way.a)
    .doHexCurve(2, Facing.SW)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.grass.a) // 0-25 grass a
    .doHexLine(1, Facing.SE, 1)
    .doHexCurve(2, Facing.N, true, 1, 1)
    .doHexLine(1, Facing.NE, 4)
    .doHexLine(2, Facing.SE, 4)
    .doHexLine(2, Facing.NW, 8)
    .doHexLine(2, Facing.S, 8)
    .doHexCurve(2, Facing.S, false, 1, 10)
    .doHexLine(1, Facing.NW, 11)
    .doHexCurve(3, Facing.NW, true, 1, 15)
    .doHexLine(1, Facing.NE, 15)
    .doHexLine(2, Facing.SE, 15)
    .doHexCurve(3, Facing.NW, true, 1, 20)
    .doHexCurve(3, Facing.SE, false, 1, 31)
    .doHexCurve(2, Facing.SW, false, 1, 33)
    .setHexClass(Game.meshes.hex.water.a) // 26-37 water a
    .doHexCurve(2, Facing.NE, true, 1, 2)
    .doHexCurve(2, Facing.S, false, 2, 26)
    .doHexCurve(3, Facing.S, false, 1, 27)
    .doHexLine(1, Facing.SE, 27)
    .doHexCurve(3, Facing.N, true, 1, 32);

    
  return {
    path: hp,
    nextDir: Facing.S,
  }
};

const drawListaDeSchindler = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.b)
    .doHexLine(2, Facing.S)
    .doHexLine(4, Facing.SW)
    .doHexCurve(2, Facing.S, true)
    .doHexCurve(2, Facing.S)
    .doHexLine(1, Facing.S)
    .doHexLine(2, Facing.SE)
    .doHexCurve(2, Facing.NE)
    .doHexCurve(2, Facing.NE, true)
    .doHexLine(2, Facing.SE)
    .doHexCurve(2, Facing.NE)
    .doHexCurve(2, Facing.N, true)
    .doHexCurve(2, Facing.SE)
    .doHexCurve(2, Facing.NE)
    .doHexLine(2, Facing.NW)
    .doHexCurve(2, Facing.N, true)
    .doHexCurve(2, Facing.NE, true)
    .doHexCurve(1, Facing.NE, true)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.grass.b)
    .doHexCurve(2, Facing.NE, false, 1, 3)
    .doHexLine(2, Facing.S, 3)
    .doHexCurve(2, Facing.NW, false, 1, 4)
    .doHexCurve(2, Facing.NW, false, 1, 7)
    .doHexLine(2, Facing.SW, 9)
    .doHexLine(2, Facing.NE, 12)
    .doHexCurve(2, Facing.S, false, 1, 12)
    .doHexLine(1, Facing.SW, 16)
    .doHexCurve(2, Facing.S, false, 1, 18)
    .doHexCurve(2, Facing.NW, true, 1, 21)
    .doHexCurve(2, Facing.NE, false, 1, 21)
    .doHexLine(1, Facing.N, 24)
    .doHexLine(1, Facing.S, 25)
    .doHexLine(2, Facing.S, 26)
    .doHexLine(1, Facing.NE, 27)
    .doHexLine(1, Facing.SW, 31)
    .doHexLine(4, Facing.SE, 31)
    .doHexLine(1, Facing.SW, 31)
    .doHexLine(1, Facing.SE, 32)
    .doHexCurve(3, Facing.N, true, 1, 32)
    .doHexLine(1, Facing.N, 35)
    .doHexLine(1, Facing.NE, 35)
    .setHexClass(Game.meshes.hex.decoWay.b)
    .doHexLine(2, Facing.S, 4)
    .doHexLine(2, Facing.NW, 9)
    .doHexLine(2, Facing.SW, 12)
    .doHexCurve(2, Facing.SE, false, 1, 21)
    .doHexLine(2, Facing.N, 23)
    .doHexCurve(2, Facing.SE, false, 1, 27)
    .setHexClass(Game.meshes.hex.decoWay.b2)
    .doHexLine(1, Facing.SW, 7)
    .doHexCurve(2, Facing.SE, false, 1, 7)
    .doHexLine(1, Facing.SW, 10)
    .doHexCurve(3, Facing.S, true, 1, 14)
    .doHexLine(2, Facing.S, 15)
    .doHexLine(2, Facing.S, 17)
    .doHexLine(1, Facing.NE, 18)
    .doHexCurve(2, Facing.S, true, 1, 21)
    .doHexLine(1, Facing.NW, 23)
    .doHexLine(2, Facing.NE, 24)
    .doHexCurve(2, Facing.NW, false, 1, 32)
    .doHexLine(1, Facing.S, 35);
    return {
      path: hp,
      nextDir: Facing.SE,
    }
};

const drawMagoFrugal = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.c)
    .doHexCurve(2, Facing.SE)
    .doHexCurve(2, Facing.NE)
    .doHexLine(2, Facing.NW)
    .doHexCurve(3, Facing.N)
    .doHexLine(3, Facing.NW)
    .doHexRamp(1, Facing.N)
    .doHexRamp(1, Facing.N, false)
    .doHexCurve(4, Facing.NE)
    .doHexLine(2, Facing.SW)
    .doHexLine(1, Facing.NW)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.grass.c)
    .doHexLine(2, Facing.N, 2)
    .doHexLine(1, Facing.N, 3)
    .doHexLine(1, Facing.SE, 8)
    .doHexLine(1, Facing.NE, 8)
    .doHexLine(1, Facing.N, 8)
    .doHexLine(2, Facing.N, 9)
    .doHexLine(3, Facing.N, 10)
    .doHexLine(2, Facing.N, 11)
    .doHexLine(1, Facing.SW, 13)
    .doHexLine(1, Facing.NW, 13)
    .doHexLine(2, Facing.SW, 19)
    .doHexLine(1, Facing.N, 23)
    .doHexLine(2, Facing.SW, 23)
    .setHexClass(Game.meshes.hex.water.a)
    .doHexCurve(2, Facing.N, true, 2, 12)
    .doHexCurve(2, Facing.N, true, 2, 13)
    .doHexCurve(2, Facing.SE, false, 1, 17)
    .doHexCurve(2, Facing.S, true, 1, 23)
    .doHexLine(3, Facing.SE, 23);
    return {
      path: hp,
      nextDir: Facing.N,
    }
};

const drawClubPelea = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.d)
    .doHexCurve(2, Facing.NW, true)
    .doHexCurve(2, Facing.NW, true)
    .doHexCurve(2, Facing.NW)
    .doHexCurve(2, Facing.NW)
    .doHexCurve(2, Facing.NW, true)
    .doHexLine(2, Facing.NW)
    .doHexCurve(2, Facing.SW)
    .doHexCurve(3, Facing.SE, true)
    .doHexLine(1, Facing.SW)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.grass.b)
    .doHexLine(1, Facing.SW, 4)
    .doHexCurve(3, Facing.N, false, 1, 7)
    .doHexLine(1, Facing.NW, 10)
    .doHexLine(1, Facing.NW, 15)
    .setHexClass(Game.meshes.hex.decoWay.d)
    .doHexCurve(5, Facing.SE, false, 1, 5)
    .doHexLine(1, Facing.NE, 5)
    .doHexCurve(3, Facing.S, true, 1, 6)
    .doHexCurve(4, Facing.NE, false, 1, 11)
    .doHexLine(1, Facing.N, 11)
    .doHexLine(1, Facing.N, 13)
    .doHexLine(1, Facing.S, 13)
    .doHexCurve(4, Facing.N, false, 1, 18)
    .doHexLine(1, Facing.NW, 18)
    .doHexCurve(4, Facing.SE, true, 1, 18)
    .doHexLine(1, Facing.S, 18);
    return {
      path: hp,
      nextDir: Facing.SW,
    }
};
const drawGuardianCenteno = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.e)
    .doHexLine(1, Facing.SW)
    .doHexRamp(1, Facing.SW)
    .doHexRamp(1, Facing.SW, false)
    .doHexCurve(4, Facing.SW, true)
    .doHexCurve(3, Facing.N)
    .doHexCurve(2, Facing.SW)
    .doHexCurve(2, Facing.SW)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.grass.b)
    .doHexCurve(2, Facing.NW, false, 1, 1)
    .doHexCurve(2, Facing.S, true, 1, 1)
    .setHexClass(Game.meshes.hex.water.a)
    .doHexCurve(2, Facing.SW, true, 1, 2)
    .doHexCurve(2, Facing.NE, false, 1, 6)
    .setHexClass(Game.meshes.hex.decoWay.e)
    .doHexLine(1, Facing.SE, 6)
    .doHexLine(3, Facing.N, 6)
    .doHexLine(1, Facing.NW, 6)
    .doHexCurve(3, Facing.S, true, 1, 6)
    .doHexLine(1, Facing.SW, 8)
    .doHexCurve(3, Facing.NW, true, 1, 8)
    .doHexCurve(3, Facing.N, false, 1, 11)
    .doHexCurve(3, Facing.NW, false, 1, 13);
    return {
      path: hp,
      nextDir: Facing.S,
    }
};
const drawDorian = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.f)
    .doHexCurve(2, Facing.SE, true)
    .doHexCurve(2, Facing.SE)
    .doHexCurve(2, Facing.SE, true)
    .doHexCurve(2, Facing.SE)
    .doHexCurve(3, Facing.NE, true)
    .doHexCurve(4, Facing.SE, true)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.decoWay.f)
    .doHexLine(1, Facing.NE, 3)
    .doHexLine(2, Facing.S, 3)
    .doHexCurve(2, Facing.S, false, 1, 4)
    .doHexLine(1, Facing.SE, 4)
    .doHexLine(1, Facing.NE, 6)
    .doHexLine(2, Facing.NE, 7)
    .doHexLine(1, Facing.S, 7)
    .doHexCurve(2, Facing.S, true, 1, 10)
    .doHexCurve(3, Facing.NE, true, 1, 10)
    .doHexLine(2, Facing.NW, 14);
    return {
      path: hp,
      nextDir: Facing.SW,
    }
};
const drawSiddharta = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.g)
    .doHexLine(2, Facing.SW)
    .doHexCurve(2, Facing.S, false, 2)
    .doHexCurve(3, Facing.NE, true)
    .doHexCurve(2, Facing.S, true)
    .doHexCurve(2, Facing.SW, true)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.grass.c)
    .doHexCurve(2, Facing.S, true, 1, 1)
    .doHexCurve(3, Facing.NW, false, 1, 2)
    .doHexLine(2, Facing.SE, 4)
    .doHexLine(1, Facing.SW, 4)
    .setHexClass(Game.meshes.hex.decoWay.g)
    .doHexCurve(3, Facing.S, true, 1, 8)
    .doHexCurve(3, Facing.NE, true, 1, 8)
    .doHexCurve(3, Facing.SE, true, 1, 10)
    .doHexLine(2, Facing.SW, 10)
    .doHexCurve(2, Facing.S, true, 1, 12)
    .doHexCurve(2, Facing.S, true, 1, 14)
    .doHexCurve(2, Facing.NW, false, 1, 14);
    return {
      path: hp,
      nextDir: Facing.SW,
    }
};
const drawLolita = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.h)
    .doHexCurve(3, Facing.SW)
    .doHexCurve(2, Facing.SE, true)
    .doHexCurve(4, Facing.SE, true)
    .doHexCurve(3, Facing.NW)
    .doHexCurve(3, Facing.S)
    .doHexCurve(2, Facing.SE, false, 2)
    .doHexLine(3, Facing.N)
    .doHexCurve(2, Facing.NE, true)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.decoWay.g)
    .doHexCurve(2, Facing.NW, false, 1, 2)
    .setHexClass(Game.meshes.hex.decoWay.h)
    .doHexCurve(3, Facing.SW, false, 1, 2)
    .doHexCurve(3, Facing.SW, false, 1, 5)
    .doHexCurve(2, Facing.N, true, 1, 12)
    .doHexCurve(3, Facing.S, false, 1, 14)
    .doHexLine(1, Facing.S, 17)
    .doHexCurve(2, Facing.SE, false, 1, 19)
    .doHexLine(2, Facing.NE, 20)
    .doHexCurve(3, Facing.NW, true, 1, 22)
    .doHexCurve(2, Facing.N, false, 1, 25)
    .setHexClass(Game.meshes.hex.grass.c)
    .doHexCurve(2, Facing.SE, true, 1, 8)
    .doHexLine(2, Facing.S, 8)
    .doHexLine(3, Facing.SE, 12)
    .doHexLine(1, Facing.SE, 13)
    .doHexLine(1, Facing.SE, 22)
    .doHexCurve(2, Facing.NE, true, 1, 22);
    return {
      path: hp,
      nextDir: Facing.SE,
    }
};
const drawPedroParamo = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.i)
    .doHexCurve(2, Facing.SE, true)
    .doHexCurve(2, Facing.SE, false, 2)
    .doHexCurve(2, Facing.SE, true)
    .doHexCurve(4, Facing.S)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.decoWay.g)
    .doHexLine(1, Facing.N, 5)
    .doHexLine(1, Facing.SE, 5)
    .doHexLine(1, Facing.NE, 10)
    .doHexLine(1, Facing.S, 10)
    .setHexClass(Game.meshes.hex.decoWay.i)
    .doHexCurve(2, Facing.NE, false, 1, 3)
    .doHexLine(1, Facing.S, 3)
    .doHexLine(2, Facing.S, 4)
    .doHexLine(1, Facing.S, 5)
    .doHexCurve(2, Facing.SE, true, 1, 6)
    .doHexCurve(2, Facing.SE, false, 1, 8)
    .doHexLine(1, Facing.S, 11)
    .doHexLine(1, Facing.NE, 12);
    return {
      path: hp,
      nextDir: Facing.NE,
    }
};
const drawProblemaCuerpos = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.j)
    .doHexCurve(2, Facing.NE, true, 2)
    .doHexCurve(4, Facing.S)
    .doHexCurve(3, Facing.N, true)
    .doHexLine(2, Facing.SE)
    .doHexRamp(1, Facing.NE)
    .doHexLine(1, Facing.N)
    .doHexRamp(1, Facing.NW)
    .doHexLine(1, Facing.N)
    .doHexRamp(1, Facing.NE)
    .doHexCurve(2, Facing.N)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.grass.b)
    .doHexLine(2, Facing.SE, 2)
    .doHexCurve(3, Facing.NE, true, 1, 4)
    .doHexLine(2, Facing.NE, 8)
    .doHexLine(1, Facing.NE, 9)
    .setHexClass(Game.meshes.hex.decoWay.j)
    .doHexCurve(4, Facing.SE, false, 1, 16)
    .doHexLine(1, Facing.NE, 16)
    .doHexCurve(4, Facing.SW, true, 1, 19)
    .doHexLine(1, Facing.NW, 19)
    .doHexCurve(4, Facing.SE, false, 1, 22)
    .doHexLine(1, Facing.NE, 22);
    return {
      path: hp,
      nextDir: Facing.N,
    }
};
const drawMetamor = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.way.d)
    .doHexLine(4, Facing.NE)
    .doHexLine(2, Facing.N)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.grass.a)
    .doHexCurve(2, Facing.N, true, 1, 2)
    .doHexCurve(3, Facing.SE, false, 1, 4)
    .doHexCurve(2, Facing.N, false, 1, 4)
    .doHexLine(1, Facing.NW, 6)
    .doHexLine(1, Facing.NE, 6);
    return {
      path: hp,
      nextDir: Facing.NE,
    }
};
const drawResplandor = (Game: GameType, hp: HexPath) => {
  hp.setHexClass(Game.meshes.hex.decoWay.b)
    .doHexCurve(2, Facing.NE, true)
    .doHexLine(2, Facing.NE)
    .doHexLine(1, Facing.N)
    .doHexLine(3, Facing.NW)
    .doHexCurve(4, Facing.SW, true)
    .doHexRamp(1, Facing.NE)
    .doHexCurve(2, Facing.NE)
    .doHexRamp(1, Facing.NW)
    .doHexLine(1, Facing.SW)
    .doHexCurve(2, Facing.SW, true)
    .doHexCurve(4, Facing.SW, true)
    .doHexCurve(2, Facing.N, true)
    .doHexLine(1, Facing.N)
    .doHexRamp(1, Facing.NW)
    .doHexRamp(1, Facing.NW)
    .doHexCurve(2, Facing.SW, true)
    .doHexCurve(2, Facing.NW, true)
    .doHexLine(2, Facing.N)
    .doHexCurve(2, Facing.N, true)
    .fixPathEnd()
    .setHexClass(Game.meshes.hex.grass.c)
    .doHexCurve(3, Facing.N, true, 1, 1)
    .doHexCurve(3, Facing.S, false, 1, 2)
    .doHexCurve(3, Facing.SE, false, 1, 4)
    .doHexLine(2, Facing.NW, 5)
    .doHexLine(1, Facing.NE, 6)
    .doHexLine(1, Facing.N, 6)
    .setHexClass(Game.meshes.hex.grass.b)
    .doHexCurve(3, Facing.SE, false, 1, 15)
    .doHexCurve(3, Facing.NE, true, 1, 17)
    .setHexClass(Game.meshes.hex.grass.l)
    .doHexCurve(2, Facing.N, false, 1, 20)
    .doHexCurve(3, Facing.N, true, 1, 23)
    .doHexLine(1, Facing.NE, 26)

    .setHexClass(Game.meshes.hex.decoWay.e)
    .doHexCurve(2, Facing.N, false, 1, 33)
    .doHexCurve(2, Facing.N, false, 1, 34)
    .doHexCurve(2, Facing.S, false, 1, 35)
    .doHexCurve(3, Facing.SW, true, 1, 35)
    .doHexCurve(2, Facing.NW, false, 1, 37)
    .doHexLine(2, Facing.NE, 37)
    .doHexCurve(2, Facing.NW, false, 1, 38)
    .doHexLine(2, Facing.NE, 38)
    .doHexCurve(2, Facing.NW, false, 1, 39)
    .doHexLine(2, Facing.NE, 39)
    .doHexCurve(2, Facing.NW, false, 1, 40)
    .doHexLine(1, Facing.N, 40)
    .doHexCurve(2, Facing.N, true, 1, 41)
    .doHexLine(1, Facing.NE, 41)
  
    return {
      path: hp,
      nextDir: Facing.N,
    }
};

const drawFunc = [
  drawAmorEnLosTiempos,
  drawListaDeSchindler,
  drawMagoFrugal,
  drawClubPelea,
  drawGuardianCenteno,
  drawDorian,
  drawSiddharta,
  drawLolita,
  drawPedroParamo,
  drawProblemaCuerpos,
  drawMetamor,
  drawResplandor,
];
export const draw2024 = (Game: GameType) => {
  let hexPath = new HexPath(Game);
  const paths = []
  drawFunc.forEach((fn) => {
    const { nextDir } = fn(Game, hexPath);
    paths.push(hexPath);
    hexPath = hexPath.getChainedHexPath(Game, nextDir)
  })
};
