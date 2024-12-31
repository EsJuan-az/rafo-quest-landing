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
}
const ThreeMap = forwardRef(function ThreeMap({users, myId}: PropTypes, ref) {
  const mountRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const GameData: MutableRefObject<Game | null> = useRef(null);
  const moveChar = useCallback((bk: number, pct: number) => $moveChar(GameData.current, bk, pct), [GameData]);
  // Exponer la función moverPersonaje al componente padre
  useImperativeHandle(ref, () => ({
    moveChar,
    Game: GameData.current,
  }));

  useEffect(() => {
    const mountElement: HTMLElement | null | undefined = mountRef.current;
    if (!mountElement) return;
    const G = new Game(mountElement);
    Loader.set(G, users, myId);
    GameData.current = G;
    
    
    if (typeof window == 'undefined') return;
    window.addEventListener("resize", () => G.handleResize());
    // --- Limpiar al Desmontar el Componente ---
    return () => {
      window.removeEventListener("resize", () => G.handleResize());
      if(!G.renderer) return;
      mountElement.removeChild(G.renderer.domElement);
    };
  }, [mountRef, users, myId]);

  return (
    <div
      className="ml-[-4px]"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
});

export default ThreeMap;
