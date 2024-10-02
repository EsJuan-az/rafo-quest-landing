import { RafoUserContext } from "@/context/RafoAuthContext";
import { useContext } from "react";

export default function useRafoUser() {
  const { loading, user } = useContext(RafoUserContext);
  return {
    loading, user
  }
}