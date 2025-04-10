import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { ImageLinks } from "../lib/links";

function ChurchLogo() {
  return (
    <div className="flex items-center">
      <Link href="/">
        <Image src={ImageLinks.churchLogo} alt="Landscape picture" width={150} height={50} />
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
      <Link href="/news" className="hover:underline">
        교회소식
      </Link>
      <Link href="/resources" className="hover:underline">
        자료실
      </Link>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-violet-200 text-white">
      <ChurchLogo />
      <div className="flex items-center space-x-8">
        <NavigationMenu />
        <div className="flex space-x-4">
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}
