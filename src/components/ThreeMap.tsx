// components/ThreeMap.js
"use client";
import {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  setRenderer,
  handleResize,
  setScene,
  setComponents,
} from "./utils/three/settings";
import {
  moverPersonaje as $moverPersonaje,
} from "./utils/three/movement";
import {
  setPerspectiveCamera,
} from "./utils/three/components";
import { GameType } from "./utils/three/types";

const ThreeMap = forwardRef(function ThreeMap(props, ref) {
  const GameData: MutableRefObject<GameType> = useRef({
    mountRef: useRef(null),
    avanceRef: 0,
  });
  const Game = GameData.current;
  const moverPersonaje = useCallback(() => $moverPersonaje(Game), []);
  // Exponer la función moverPersonaje al componente padre
  useImperativeHandle(ref, () => ({
    moverPersonaje,
    Game,
  }));

  useEffect(() => {
    // --- Escena, Cámara y Renderer ---
    // Obtener el valor de la variable CSS --background
    const Game = GameData.current;
    setScene(Game);
    const mountElement = Game.mountRef.current;

    if (!Game || !mountElement) return;
    // Configuración y preferencias
    setPerspectiveCamera(Game);
    setRenderer(Game);
    setComponents(Game);
    // --- Manejo de Redimensionamiento ---

    window.addEventListener("resize", () => handleResize(Game));

    // --- Limpiar al Desmontar el Componente ---
    return () => {
      window.removeEventListener("resize", () => handleResize(Game));
      mountElement.removeChild(Game.renderer.domElement);
    };
  }, [Game.mountRef]);

  return <div ref={Game.mountRef} style={{ width: "100%", height: "100vh" }} />;
});

export default ThreeMap;
