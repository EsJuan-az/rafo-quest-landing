import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import { montserrat } from "@/utils/fonts";
import Sidebar from "@/components/Sidebar";
import { Claims, getSession, Session } from "@auth0/nextjs-auth0";
import UserService from "@/services/user.service";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const  resp: Session | undefined | null = await getSession();
  const user: Claims | undefined = resp?.user;
  if(!!user){
    const a = await UserService.getMe(user);
    console.log(a)
  }
  // console.log(await UserService.getAccessToken())
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${montserrat.className} antialiased bg-background`}>
          <div className="flex gap-3">
            <Sidebar user={user} />
            <section className="flex-1">{children}</section>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}

// How to kill your children (?)
