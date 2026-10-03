import { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'w-64' : 'w-48'}`}>
      <Search className="absolute left-3 h-4 w-4 text-[var(--text-secondary)]" />
      <input
        type="text"
        placeholder="Search components..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-10 pr-12 py-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all glass"
      />
      <div className="absolute right-2 flex items-center">
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs font-semibold text-[var(--text-secondary)] bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md">
          Ctrl K
        </kbd>
      </div>
    </div>
  );
}

export default SearchBar;
