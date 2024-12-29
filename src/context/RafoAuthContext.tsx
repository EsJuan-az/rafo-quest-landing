"use client";

import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import UserService from "../services/user.service";
import { RafoUser } from "@/types/userTypes";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Claims } from "@auth0/nextjs-auth0";

interface RafoUserContextType {
  user: RafoUser | null;
  loading: boolean;
  error: object | null;
  claims: Claims | undefined;
  accessToken: string | null;
  refresh: Dispatch<SetStateAction<null>>;
}

export const RafoUserContext = createContext<RafoUserContextType>({
  user: null,
  loading: true,
  error: null,
  claims: undefined,
  accessToken: null,
  refresh: () => {},
});

interface RafoUserProviderProps {
  children: ReactNode;
}

export const RafoUserProvider: React.FC<RafoUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<RafoUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [apiError, setApiError] = useState<object | null>(null);
  const [stateRefresh, refresh] = useState(null);
  const {
    user: claims,
    error: auth0Error,
    isLoading: auth0Loading,
  } = useUser();

  const error = auth0Error || apiError || null;

  const fetchAccessToken = async () => {
    try {
      const res = await fetch("/api/auth/token");
      const data = await res.json();
      if (!data.error && data.body.accessToken) {
        setAccessToken(data.body.accessToken);
      } else {
        setApiError(data.body);
      }
    } catch (err) {
      console.error("Error getting access token:", err);
      setApiError({ error: err });
    }
  };

  useEffect(() => {
    if (!auth0Loading && !accessToken) {
      fetchAccessToken();
    }
  }, [auth0Loading, accessToken]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.getMe(
          claims as Claims,
          accessToken as string
        );
        if (!userData.error && userData.body) {
          setUser(userData.body);
        } else {
          setApiError(userData.body);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setApiError({ error: err });
      } finally {
        setLoading(false);
      }
    };

    if (!auth0Loading && !auth0Error && accessToken && claims) {
      fetchUser();
    }
  }, [auth0Loading, auth0Error, accessToken, claims, stateRefresh]);

  return (
    <RafoUserContext.Provider
      value={{ user, loading, claims, error, accessToken, refresh }}
    >
      {children}
    </RafoUserContext.Provider>
  );
};
