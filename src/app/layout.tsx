import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { montserrat } from "@/utils/fonts";
import Sidebar from "@/components/Sidebar";
import { RafoUserProvider } from "@/context/RafoAuthContext";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Auth, getAuth } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth: Auth = await getAuth();
  return (
    <html lang="en">
      <UserProvider>
        <RafoUserProvider>
          <body className={`${montserrat.className} antialiased bg-background`}>
            <div className="">
              <Sidebar user={auth.user || null} />
              <main className="ml-16 relative">
              {
                children
              }
              </main>
              <Toaster />
            </div>
          </body>
        </RafoUserProvider>
      </UserProvider>
    </html>
  );
}

// How to kill your children (?)
