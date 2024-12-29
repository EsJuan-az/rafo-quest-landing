import { RafoUserContext } from "@/context/RafoAuthContext";
import { useContext } from "react";

export default function useRafoUser() {
  const ctx = useContext(RafoUserContext);
  return ctx;
}