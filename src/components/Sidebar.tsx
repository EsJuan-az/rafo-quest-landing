import {
  FaCircleUser,
  FaHouse,
  FaBook,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import withLinkTooltip from "./utils/withLinkTooltip";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Claims } from "@auth0/nextjs-auth0";

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
  user?: Claims
}

export default function Sidebar({ user }: SidebarProps) {
  const ProfileLink = withLinkTooltip(
    () => (
      <Avatar>
        <AvatarImage src={user?.picture} />
        <AvatarFallback>{user?.nickname[0].toUpperCase()}</AvatarFallback>
      </Avatar>
    ),
    <p className="font-bold">Profile</p>,
    "/profile"
  );
  return (
    <nav
      className="bg-primary h-screen w-14 rounded-tr-md rounded-br-md py-2
      flex flex-col items-center justify-around"
    >
      <HomeLink className="fill-secondary size-8" />

      <section className="flex flex-col h-1/3 justify-around items-center">
        <Link href="/books">
          <BookLink className="fill-secondary size-8" />
        </Link>
        {user ? (
          <>
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
