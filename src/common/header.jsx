import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <header className="w-full py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="images/logo.png" alt="Logo" className="h-12 md:h-16" />
        </Link>

        {/* Navigation */}
        {/* <nav>
          <ul className="flex items-center space-x-6">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className={`relative text-white text-lg font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-[#30cfce]"
                      : "hover:text-[#30cfce]"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-[#30cfce] transition-all duration-300 ${
                      location.pathname === link.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
