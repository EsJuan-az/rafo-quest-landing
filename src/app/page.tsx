"use client"
import ThreeMap from "@/components/ThreeMap";
import { useRef } from "react";


export default function Home() {
  const threeMapRef = useRef(null);
  const handleLeerLibro = () => {
    if (threeMapRef.current) {
      threeMapRef.current.moverPersonaje();
    }
  };
  return (
    <>
      {/* <h1 className={`${pixel.className} text-black text-5xl`}>Rafo Quest</h1> */}
      <button
        onClick={handleLeerLibro}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          borderRadius: '5px',
          zIndex: 40,
        }}
      >
        Leer Libro
      </button>
      <ThreeMap ref={threeMapRef}/>
    </>
  )
}
