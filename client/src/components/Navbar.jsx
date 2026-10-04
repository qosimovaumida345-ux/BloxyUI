import { Link } from 'react-router-dom';
import { Search, ExternalLink, Menu } from 'lucide-react';
import SearchBar from './SearchBar';
import Logo from './Logo';

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
              <Logo />
            </Link>
            
            <div className="hidden md:flex items-center space-x-6 text-[var(--text-secondary)] text-sm">
              <Link to="/bloxfx" className="text-white font-bold flex items-center gap-1.5 hover:text-[#ff7675] transition-colors">
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-[#ff7675] text-[10px] font-mono border border-red-500/40">200</span>
                <span>BloxFX</span>
              </Link>
              <Link to="/icons" className="hover:text-[var(--text-primary)] transition-colors">Icons (520+)</Link>
              <Link to="/effects" className="hover:text-[var(--text-primary)] transition-colors">Effects</Link>
              <Link to="/animations" className="hover:text-[var(--text-primary)] transition-colors">Animations</Link>
              <Link to="/components" className="hover:text-[var(--text-primary)] transition-colors">Components</Link>
              <Link to="/builder" className="hover:text-[var(--text-primary)] transition-colors">Builder</Link>
              <Link to="/docs" className="hover:text-[var(--text-primary)] transition-colors">Docs</Link>
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
