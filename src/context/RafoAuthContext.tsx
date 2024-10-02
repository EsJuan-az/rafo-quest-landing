"use client"
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import UserService from '../services/user.service'; // Asegúrate de la ruta correcta
import { RafoUser } from '@/types/userTypes';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Claims } from '@auth0/nextjs-auth0';


interface RafoUserContextType {
  user: RafoUser | null;
  loading: boolean;
  error: object | null;
  claims: Claims | undefined;
}

export const RafoUserContext = createContext<RafoUserContextType>({
    user: null,
    loading: true,
    error: null,
    claims: undefined
});

interface RafoUserProviderProps {
    children: ReactNode;
}

export const RafoUserProvider: React.FC<RafoUserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<RafoUser | null>(null);
    const [loading, setLoading] = useState(true);
    const { user: claims, error: auth0Error, isLoading: auth0Loading } = useUser();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [ apiError, setApiError ] = useState(null);
    const error = auth0Error || apiError || null;

    useEffect(() => {
        const fetchAccessToken = async () => {
            if (user) {
                try {
                    const res = await fetch('/api/auth/access-token');
                    const data = await res.json();
                    setAccessToken(data.accessToken);
                } catch (err) {
                    console.error('Error getting access token:', err);
                    setApiError({ err });
                }
            }
        };
        fetchAccessToken();
    }, [user]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await UserService.getMe(claims, accessToken);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };
        if(!auth0Loading && !auth0Error && accessToken){
            fetchUser();
        }
    }, [auth0Loading, error, accessToken]);

    return (
        <RafoUserContext.Provider value={{ user, loading, claims, error }}>
            {children}
        </RafoUserContext.Provider>
    );
};
