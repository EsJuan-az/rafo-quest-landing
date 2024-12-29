import UserService from "@/services/user.service";
import { RafoUser } from "@/types/userTypes";
import { useEffect, useState } from "react";

export default function useRafoUsers() {
  const [users, setUsers] = useState<RafoUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchUsers = async () => {
      try {
        const response = await UserService.findAll();
        const {body: userData} = response;
        if (!response.error && userData) {
          setUsers(userData);
        } else {
          throw new Error("Invalid response structure from UserService.");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
  };
}
