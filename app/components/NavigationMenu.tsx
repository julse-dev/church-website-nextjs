export function NavigationMenu() {
  return (
    <nav className="flex space-x-4">
      <a href="/about" className="text-white hover:text-gray-300">
        About
      </a>
      <a href="/services" className="text-white hover:text-gray-300">
        Services
      </a>
      <a href="/contact" className="text-white hover:text-gray-300">
        Contact
      </a>
    </nav>
  );
}
