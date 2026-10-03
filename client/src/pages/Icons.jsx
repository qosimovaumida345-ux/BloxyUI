import { useState, useEffect } from 'react';
import { fetchIcons } from '../lib/api';
import { Search, Loader2, Copy, Check, Sparkles, Filter } from 'lucide-react';

const CATEGORIES = [
  'all', 'general', 'commerce', 'gaming', 'combat', 'magic', 'navigation', 'media', 'social', 'tools', 'status'
];

function Icons() {
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchIcons({ category: activeCategory, search });
      setIcons(res.data || []);
      setLoading(false);
    }
    load();
  }, [activeCategory, search]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[var(--accent-primary)] text-white text-xs font-bold rounded-full">
              {icons.length} ICONS READY
            </span>
            <span className="text-xs text-[var(--text-secondary)]">Roblox Asset ID & Luau Verified</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Icon Library</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Browse 230+ pixel-perfect Roblox icons. Click any icon to copy its Asset ID or Luau code.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)]" />
          <input 
            type="text" 
            placeholder="Search icons (e.g. shop, coin, sword)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8 pb-2 border-b border-[var(--border-color)]">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
              activeCategory === cat
                ? 'bg-[var(--accent-primary)] text-white glow-purple shadow-md'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 animate-spin text-[var(--accent-primary)] mb-4" />
          <p className="text-[var(--text-secondary)]">Loading icons...</p>
        </div>
      ) : icons.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl p-8 border border-[var(--border-color)]">
          <Filter className="w-12 h-12 text-[var(--text-secondary)] mx-auto mb-3 opacity-40" />
          <h3 className="text-lg font-bold mb-1">No icons found</h3>
          <p className="text-sm text-[var(--text-secondary)]">Try searching for another keyword or select "all" category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {icons.map(icon => (
            <div 
              key={icon.id}
              onClick={() => setSelectedIcon(icon)}
              className="glass p-4 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:glow-purple transition-all cursor-pointer flex flex-col items-center group relative overflow-hidden"
            >
              {/* Icon SVG Display */}
              <div className="w-14 h-14 bg-[var(--bg-secondary)] rounded-xl mb-3 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--accent-primary)] group-hover:bg-opacity-20 transition-all border border-transparent group-hover:border-[var(--accent-primary)]">
                <svg 
                  className="w-7 h-7 text-white group-hover:text-[var(--accent-secondary)] transition-colors" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d={icon.svgPath} />
                </svg>
              </div>

              {/* Title & Category */}
              <span className="text-sm font-bold text-center truncate w-full text-white">{icon.name}</span>
              <span className="text-[11px] text-[var(--text-secondary)] mt-1 px-2 py-0.5 bg-[var(--bg-primary)] rounded-full capitalize">
                {icon.category}
              </span>

              {/* Copy Overlay button on hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(icon.assetId, icon.id);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] opacity-0 group-hover:opacity-100 hover:bg-[var(--accent-primary)] hover:text-white transition-all text-xs"
                title="Copy Asset ID"
              >
                {copiedId === icon.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-[var(--text-secondary)]" />}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedIcon && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass max-w-md w-full rounded-2xl p-6 border border-[var(--border-color)] relative anim-pop">
            <button 
              onClick={() => setSelectedIcon(null)}
              className="absolute top-4 right-4 p-2 text-[var(--text-secondary)] hover:text-white"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center border border-[var(--accent-primary)]">
                <svg className="w-9 h-9 text-[var(--accent-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={selectedIcon.svgPath} />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{selectedIcon.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] capitalize">{selectedIcon.category} Icon • {selectedIcon.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Roblox Asset ID</label>
                <div className="flex items-center gap-2 bg-[var(--bg-secondary)] p-2.5 rounded-lg border border-[var(--border-color)]">
                  <code className="text-xs text-[var(--accent-success)] font-mono flex-1">{selectedIcon.assetId}</code>
                  <button 
                    onClick={() => copyToClipboard(selectedIcon.assetId, 'modal-id')}
                    className="p-1.5 hover:bg-[var(--bg-card)] rounded text-[var(--text-secondary)] hover:text-white"
                  >
                    {copiedId === 'modal-id' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Luau Code Snippet</label>
                <div className="bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border-color)] font-mono text-xs overflow-x-auto text-gray-300">
                  <pre>{`local icon = Instance.new("ImageLabel")
icon.Size = UDim2.new(0, 32, 0, 32)
icon.BackgroundTransparency = 1
icon.Image = "${selectedIcon.assetId}"
icon.Parent = button`}</pre>
                </div>
                <button 
                  onClick={() => copyToClipboard(`local icon = Instance.new("ImageLabel")\nicon.Size = UDim2.new(0, 32, 0, 32)\nicon.BackgroundTransparency = 1\nicon.Image = "${selectedIcon.assetId}"\nicon.Parent = button`, 'modal-code')}
                  className="w-full mt-3 py-2.5 bg-[var(--accent-primary)] hover:bg-[#5b4dcf] text-white rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  {copiedId === 'modal-code' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedId === 'modal-code' ? 'Copied Snippet!' : 'Copy Luau Snippet'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Icons;
