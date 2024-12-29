import UserService from "@/services/user.service";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getSession, Session } from "@auth0/nextjs-auth0";
import { RafoUser } from "@/types/userTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Auth = {
  user: RafoUser|null,
  error: boolean,
  accessToken: string,
}
export async function getAuth(){
  const session: Session = await getSession() as Session;
  const auth = {
    user: null,
    error: false,
    accessToken: '',
  }
  if (session) {
    const { user: claims, accessToken = '' } = session;
    auth.accessToken = accessToken;
    try {
      const resp = await UserService.getMe(claims, accessToken as string);
      if(!resp.error){
        auth.user = resp.body;
      }else{
        auth.error = true;
      }
    } catch (err) {
      auth.error = true;
    }
  }
  return auth;
}