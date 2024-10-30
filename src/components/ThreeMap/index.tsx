// components/ThreeMap.js
"use client";
import {
  forwardRef,
  LegacyRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { Game } from "./domain/game";
import { Loader } from "./domain/loader";
import { BOOKS } from "./static";
import { getPointOnPath } from "./domain/utils";
import preferences from "./preferences.json";
import * as THREE from "three";

const ThreeMap = forwardRef(function ThreeMap(props, ref) {
  const mountRef: LegacyRef<HTMLDivElement> | undefined = useRef(undefined);
  const GameData: MutableRefObject<Game | null> = useRef(null);
  // const moverPersonaje = useCallback(() => $moverPersonaje(Game), []);
  // // Exponer la función moverPersonaje al componente padre
  // useImperativeHandle(ref, () => ({
  //   moverPersonaje,
  //   Game,
  // }));

  useEffect(() => {
    const mountElement: HTMLElement | null | undefined = mountRef.current;
    if (!mountElement) return;
    const G = new Game(mountElement);
    const { personaje } = Loader.set(G);
    GameData.current = G;
    const params = {
      percentage: 0, // Controla el porcentaje en el camino
      number: 0, // Controla un número entre 0 y 12
    };
    console.log(BOOKS[params.number].path.points)
    G.gui.add(params, "percentage", 0, 1, 0.01).onChange(() => {
      personaje.position
        .copy(
          getPointOnPath(BOOKS[params.number].path.points, params.percentage)
        )
        .add(new THREE.Vector3(0, preferences.CHAR_HEIGHT / 2, 0));
    });
    G.gui.add(params, "number", 0, 12, 1).onChange(() => {
      console.log("Number changed to: ", params.number);
      personaje.position
        .copy(
          getPointOnPath(BOOKS[params.number].path.points, params.percentage)
        )
        .add(new THREE.Vector3(0, preferences.CHAR_HEIGHT / 2, 0));
    });

    window.addEventListener("resize", () => G.handleResize());
    // --- Limpiar al Desmontar el Componente ---
    return () => {
      window.removeEventListener("resize", () => G.handleResize());
      mountElement.removeChild(G.renderer.domElement);
    };
  }, [mountRef]);

  return (
    <div
      className="ml-[-4px]"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
});

export default ThreeMap;
