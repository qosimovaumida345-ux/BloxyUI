import { Link } from 'react-router-dom';
import { Zap, Globe, ExternalLink } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Zap className="h-6 w-6 text-[var(--accent-primary)]" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
              BloxyUI
            </span>
          </div>
          
          <div className="flex space-x-6 text-[var(--text-secondary)]">
            <Link to="/docs" className="hover:text-white transition-colors">Documentation</Link>
            <Link to="/builder" className="hover:text-white transition-colors">Builder</Link>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Discord</a>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://roblox.com" target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors" title="Roblox">
              <Globe className="h-5 w-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors" title="GitHub">
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-8">
          &copy; {new Date().getFullYear()} BloxyUI. The premier UI library for Roblox.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
