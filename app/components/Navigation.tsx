"use client";

import { useState } from "react";
import Link from "next/link";

interface NavigationProps {
  currentSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white z-50 px-6 py-4 border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-medium">Mihir K.</div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="#intro" isActive={currentSection === "intro"}>Home</NavLink>
          <NavLink href="#about" isActive={currentSection === "about"}>About</NavLink>
          <NavLink href="#experience" isActive={currentSection === "experience"}>Experience</NavLink>
          <NavLink href="#projects" isActive={currentSection === "projects"}>Projects</NavLink>
          <NavLink href="#contact" isActive={currentSection === "contact"}>Contact</NavLink>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white border-b border-gray-100 py-2 px-6">
          <div className="flex flex-col space-y-4 py-2">
            <MobileNavLink href="#intro" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</MobileNavLink>
            <MobileNavLink href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, isActive, children }) => {
  return (
    <Link
      href={href}
      className={`nav-link text-base transition duration-300 ${
        isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, onClick, children }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-lg py-1 hover:text-blue-600 transition duration-300"
    >
      {children}
    </Link>
  );
};

export default Navigation;