import { Link } from 'react-router-dom';
import { Search, ExternalLink, Menu, Zap } from 'lucide-react';
import SearchBar from './SearchBar';

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 anim-pulse">
              <Zap className="h-8 w-8 text-[var(--accent-primary)]" />
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
                BloxyUI
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-6 text-[var(--text-secondary)]">
              <Link to="/icons" className="hover:text-[var(--text-primary)] transition-colors hover:glow-purple">Icons</Link>
              <Link to="/effects" className="hover:text-[var(--text-primary)] transition-colors hover:glow-purple">Effects</Link>
              <Link to="/animations" className="hover:text-[var(--text-primary)] transition-colors hover:glow-purple">Animations</Link>
              <Link to="/components" className="hover:text-[var(--text-primary)] transition-colors hover:glow-purple">Components</Link>
              <Link to="/builder" className="hover:text-[var(--text-primary)] transition-colors hover:glow-purple">Builder</Link>
              <Link to="/docs" className="hover:text-[var(--text-primary)] transition-colors hover:glow-purple">Docs</Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-[var(--bg-card)] transition-colors">
              <ExternalLink className="h-5 w-5 text-[var(--text-secondary)] hover:text-white" />
            </a>
            <button className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
