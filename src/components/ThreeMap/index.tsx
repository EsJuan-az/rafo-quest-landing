"use client";
// components/ThreeMap.js
import {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { Game } from "./domain/game";
import { Loader } from "./domain/loader";
import { RafoUser } from '../../types/userTypes';
import { $moveChar } from "./movement";

type PropTypes = {
  users: RafoUser[],
  myId: string,
  gameRef : MutableRefObject<Game | null>
}

function ThreeMap({ users, myId, gameRef }: PropTypes) {
  const mountRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const moveChar = useCallback(
    (bk: number, pct: number) => {
      if (gameRef.current) {
        $moveChar(gameRef.current, bk, pct);
      }
    },
    []
  );

  // Exponer la función moverPersonaje al componente padre
  // useImperativeHandle(ref, () => ({
  //   moveChar,
  //   Game: GameData.current,
  // }));

  useEffect(() => {

    const mountElement: HTMLElement | null | undefined = mountRef.current;
    if (!mountElement) return;

    const G = new Game(mountElement);
    Loader.set(G, users, myId);
    gameRef.current = G;

    const handleResize = () => G.handleResize();
    window.addEventListener("resize", handleResize);

    // Limpiar al desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
      if (G.renderer) {
        mountElement.removeChild(G.renderer.domElement);
      }
    };
  }, [users, myId, gameRef]);

  return (
    <div
      className="ml-[-4px]"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};


export default ThreeMap;
