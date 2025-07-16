import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { ImageLinks } from "../lib/links";
import { cookies } from "next/headers";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";

function ChurchLogo() {
  return (
    <div className="flex items-center">
      <Link href="/">
        <Image src={ImageLinks.churchLogo} alt="Landscape picture" width={200} height={100} />
      </Link>
    </div>
  );
}

function NavigationMenu() {
  return (
    <nav className="hidden md:flex space-x-8">
      <Link href="/worship" className="hover:underline">
        예배
      </Link>
      <Link href="/about" className="hover:underline">
        교회소개
      </Link>
      <Link href="/news/church-news" className="hover:underline">
        교회소식
      </Link>
      <Link href="/resources" className="hover:underline">
        자료실
      </Link>
    </nav>
  );
}

export default async function Header() {
  const cookieName = "access_token";
  const accessToken = (await cookies()).get(cookieName);
  const isLoggedIn = !!accessToken;

  const AuthButton = isLoggedIn ? <SignOutButton /> : <SignInButton />;

  return (
    <header className="flex flex-col justify-between p-4 bg-violet-200 text-white">
      <div className="flex justify-end w-full text-sm pb-2">{AuthButton}</div>
      <div className="flex flex-row justify-between items-start w-full">
        <div className="flex items-center">
          <ChurchLogo />
        </div>
        <div className="flex flex-col items-end space-y-2">
          <SocialLinks />
          <NavigationMenu />
        </div>
      </div>
    </header>
  );
}
