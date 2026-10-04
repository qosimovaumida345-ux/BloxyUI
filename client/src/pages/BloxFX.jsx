import { useState, useMemo } from 'react';
import { bloxfxAssets } from '../data/bloxfxCatalog';
import { Search, Copy, Check, Play, Sparkles, Filter, Code2, Layers } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CATEGORIES = [
  'All',
  'Buttons',
  'Backgrounds',
  'Badges',
  'Cards',
  'Loaders',
  'Notifications',
  'Panels',
  'Progress bars',
  'Toggles',
  'Transitions'
];

function BloxFX() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [activeAsset, setActiveAsset] = useState(null);

  const filteredAssets = useMemo(() => {
    return bloxfxAssets.filter(asset => {
      const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
      const q = search.toLowerCase();
      const matchesSearch = !q || asset.name.toLowerCase().includes(q) || asset.description.toLowerCase().includes(q) || asset.slug.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/40 text-[var(--accent-secondary)] text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
            <span>200 Handcrafted Standalone Luau Effects</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">BloxFX 200 Library</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-2xl">
            200 standalone procedural UI scripts for Roblox Studio. Zero asset dependencies, no external textures. Paste directly into StarterPlayerScripts and test!
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)]" />
          <input 
            type="text" 
            placeholder="Search 200 effects (e.g. sweep, toast, shield)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--accent-primary)] text-white text-sm placeholder-gray-500 font-mono"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[var(--border-color)]">
        {CATEGORIES.map(cat => {
          const count = cat === 'All' ? bloxfxAssets.length : bloxfxAssets.filter(a => a.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-[var(--accent-primary)] text-white shadow-md glow-purple'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)]'
              }`}
            >
              <span>{cat}</span>
              <span className="opacity-60 text-[10px] font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid of 200 Assets */}
      {filteredAssets.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl p-8 border border-[var(--border-color)]">
          <Filter className="w-12 h-12 text-[var(--text-secondary)] mx-auto mb-3 opacity-40" />
          <h3 className="text-lg font-bold mb-1">No effects found</h3>
          <p className="text-sm text-[var(--text-secondary)]">Try searching for another keyword or select "All".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAssets.map(asset => (
            <div 
              key={asset.id}
              onClick={() => setActiveAsset(asset)}
              className="glass rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all overflow-hidden flex flex-col justify-between group cursor-pointer shadow-md select-none"
            >
              {/* Card Visual Stage */}
              <div className="h-36 bg-[#12122a] flex flex-col items-center justify-center p-4 relative overflow-hidden border-b border-[var(--border-color)]">
                <div className="absolute top-2 left-3 text-[10px] text-[var(--text-secondary)] font-mono uppercase">
                  {asset.category}
                </div>

                {/* Animated Glyph / Badge */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#2a2a5a] to-[#161632] border border-white/20 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  <span>{asset.glyph || '⚡'}</span>
                </div>

                <span className="text-[10px] text-gray-400 mt-2 font-mono">Click to inspect</span>
              </div>

              {/* Card Meta */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-[var(--bg-card)]">
                <div>
                  <h3 className="font-extrabold text-sm text-white group-hover:text-[var(--accent-secondary)] transition-colors truncate">
                    {asset.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                    {asset.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500 truncate max-w-[100px]">{asset.filename}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyCode(asset.code, asset.id);
                    }}
                    className="px-2.5 py-1 bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow"
                  >
                    {copiedId === asset.id ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === asset.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Code Inspector Modal */}
      {activeAsset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass max-w-3xl w-full rounded-3xl p-6 border border-[var(--border-color)] relative anim-pop flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setActiveAsset(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="mb-4 pr-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-primary)]/30 text-[var(--accent-secondary)] text-[11px] font-mono font-bold uppercase">
                  {activeAsset.category}
                </span>
                <span className="text-xs text-gray-400 font-mono">{activeAsset.filename}</span>
              </div>
              <h2 className="text-2xl font-black text-white">{activeAsset.name}</h2>
              <p className="text-xs text-gray-300 mt-1">{activeAsset.description}</p>
            </div>

            <div className="flex-1 overflow-auto bg-[#090914] rounded-2xl border border-[var(--border-color)] mb-4 p-1">
              <SyntaxHighlighter 
                language="lua" 
                style={vscDarkPlus} 
                customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '11px' }}
              >
                {activeAsset.code}
              </SyntaxHighlighter>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2 border-t border-[var(--border-color)]">
              <span className="text-xs text-gray-400 font-mono">
                Paste into a LocalScript in StarterPlayerScripts and press Play.
              </span>
              <button
                onClick={() => copyCode(activeAsset.code, 'modal-copy')}
                className="px-6 py-2.5 bg-gradient-to-r from-[var(--accent-primary)] to-[#ff7675] hover:opacity-90 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-lg"
              >
                {copiedId === 'modal-copy' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === 'modal-copy' ? 'Copied Full Script!' : 'Copy LocalScript'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BloxFX;
