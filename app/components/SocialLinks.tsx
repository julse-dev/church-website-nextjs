import { SocialLinks } from "../lib/links";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

function renderLink(href: string, className: string, IconComponent: React.ComponentType) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <IconComponent />
    </a>
  );
}

export default function socialLinks() {
  return (
    <div className="flex space-x-4">
      {renderLink(SocialLinks.youtube, "text-red-600 hover:text-red-800 text-2xl", FaYoutube)}
      {renderLink(SocialLinks.instagram, "text-pink-500 hover:text-pink-700 text-2xl", FaInstagram)}
      {renderLink(SocialLinks.facebook, "text-blue-600 hover:text-blue-800 text-2xl", FaFacebook)}
    </div>
  );
}
