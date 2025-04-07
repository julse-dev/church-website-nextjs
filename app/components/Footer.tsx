import SocialLinks from "./SocialLinks";
import { Info } from "../lib/Info";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <div className="flex justify-center mt-2">
        <SocialLinks />
      </div>
      <p>{Info.churchName}</p>
      <p>{Info.address}</p>
      <p>{Info.contacts}</p>
      <p>{Info.email}</p>
      <p>{Info.copyright}</p>
    </footer>
  );
}
