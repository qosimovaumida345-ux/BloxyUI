import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, Menu, X, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';
import Logo from './Logo';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    {
      to: '/builder',
      label: 'Visual Constructor',
      badge: 'STUDIO',
      highlight: true
    },
    {
      to: '/bloxfx',
      label: 'BloxFX',
      badge: '200'
    },
    {
      to: '/icons',
      label: 'Icons (520+)'
    },
    {
      to: '/plugin',
      label: 'Roblox Plugin',
      badge: 'v2.0',
      highlight: true
    },
    {
      to: '/docs',
      label: 'Docs & MCP'
    }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
              <Logo />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-5 text-sm">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 transition-all px-3 py-1.5 rounded-xl ${
                      isActive 
                        ? 'bg-white/10 text-white font-bold' 
                        : link.highlight 
                          ? 'text-white font-bold hover:bg-white/5' 
                          : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                        link.highlight 
                          ? 'bg-gradient-to-r from-red-500/30 to-purple-500/30 text-white border-red-500/50 shadow-sm' 
                          : 'bg-red-500/20 text-[#ff7675] border-red-500/40'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <a 
              href="https://github.com/qosimovaumida345-ux/BloxyUI" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors"
              title="GitHub Repository"
            >
              <ExternalLink className="h-5 w-5 text-[var(--text-secondary)] hover:text-white" />
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border-color)] flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-white/5 text-sm text-white"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-red-500/20 text-[#ff7675] border border-red-500/40">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
