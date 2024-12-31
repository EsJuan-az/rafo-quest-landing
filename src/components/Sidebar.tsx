"use client";
import {
  FaCircleUser,
  FaHouse,
  FaBook,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import withLinkTooltip from "./utils/hoc/withLinkTooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { RafoUser } from "@/types/userTypes";

const HomeLink = withLinkTooltip(
  FaHouse,
  <p className="font-bold">Home</p>,
  "/"
);
const BookLink = withLinkTooltip(
  FaBook,
  <p className="font-bold">Book</p>,
  "/book"
);
const LoginLink = withLinkTooltip(
  FaCircleUser,
  <p className="font-bold">Log in</p>,
  "/api/auth/login"
);
const LogoutLink = withLinkTooltip(
  FaArrowRightFromBracket,
  <p className="font-bold">Log out</p>,
  "/api/auth/logout"
);

interface SidebarProps {
  user: RafoUser | null;
}

export default function Sidebar({ user }: SidebarProps) {
  const ProfileLink = withLinkTooltip(
    () => (
      <Avatar>
        <AvatarImage src={user?.avatar} />
        <AvatarFallback>{user?.name && user?.name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
    ),
    <p className="font-bold">Profile</p>,
    "/profile"
  );
  return (
    <nav
      className="bg-primary h-screen w-14 rounded-tr-md rounded-br-md py-2
      flex flex-col items-center justify-around fixed top-0 left-0 z-30"
    >
      <HomeLink className="fill-secondary size-8" />
      <section className="flex flex-col h-1/3 justify-around items-center">
        {user ? (
          <>
            <BookLink className="fill-secondary size-8" />
            <LogoutLink className="fill-secondary size-8" />
            <ProfileLink />
          </>
        ) : (
          <LoginLink className="fill-secondary size-8" />
        )}
      </section>
    </nav>
  );
}
