import { useState, useEffect } from 'react';
import { fetchAnimations } from '../lib/api';
import { Search, Loader2, Play, Copy, Check, Activity } from 'lucide-react';

const ANIM_TYPES = ['all', 'click', 'hover', 'entrance', 'exit', 'loop', 'attention'];

function Animations() {
  const [animations, setAnimations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedAnim, setSelectedAnim] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchAnimations({ type: activeType, search });
      setAnimations(res.data || []);
      setLoading(false);
    }
    load();
  }, [activeType, search]);

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[var(--accent-warning)] text-black text-xs font-bold rounded-full">
              {animations.length} ANIMATIONS READY
            </span>
            <span className="text-xs text-[var(--text-secondary)]">TweenService Easing & Spring Physics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Juicy Animations Engine</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Squish clicks, elastic bounces, 3D coin flips, jelly wobbles, and shine sweeps. Hover to test!
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)]" />
          <input 
            type="text" 
            placeholder="Search animations (e.g. squish, wobble, flip)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--accent-warning)] focus:ring-1 focus:ring-[var(--accent-warning)] transition-all text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 pb-2 border-b border-[var(--border-color)]">
        {ANIM_TYPES.map(type => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
              activeType === type
                ? 'bg-[var(--accent-warning)] text-black shadow-md font-bold'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 animate-spin text-[var(--accent-warning)] mb-4" />
          <p className="text-[var(--text-secondary)]">Loading animations...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {animations.map(anim => (
            <div 
              key={anim.id}
              onClick={() => setSelectedAnim(anim)}
              className="glass rounded-2xl border border-[var(--border-color)] overflow-hidden group cursor-pointer hover:border-[var(--accent-warning)] transition-all flex flex-col justify-between"
            >
              {/* Animation Stage */}
              <div className="h-44 bg-[var(--bg-secondary)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-2 left-3 text-[10px] text-[var(--text-secondary)] font-mono uppercase">
                  {anim.type} • {anim.duration}s
                </div>

                {/* Animated Sample Button */}
                <div 
                  className={`px-6 py-3 bg-[var(--accent-primary)] text-white font-extrabold rounded-xl shadow-lg border-2 border-white/40 flex items-center gap-2 select-none transition-all group-hover:${anim.cssClass || 'anim-bounce'}`}
                >
                  <Activity className="w-4 h-4 text-white" />
                  <span>Interactive</span>
                </div>
                
                <span className="text-[11px] text-[var(--text-secondary)] mt-3">Hover card to test</span>
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-card)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-white group-hover:text-[var(--accent-warning)] transition-colors truncate">
                    {anim.name}
                  </h3>
                  <Play className="w-3.5 h-3.5 text-[var(--accent-warning)] opacity-60 group-hover:opacity-100 flex-shrink-0 ml-1" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
                  <span className="text-[11px] text-[var(--text-secondary)] font-mono capitalize">{anim.category}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyCode(anim.luauCode, anim.id);
                    }}
                    className="p-1 px-2.5 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--accent-warning)] hover:text-black transition-all text-xs font-bold flex items-center gap-1 text-white"
                  >
                    {copiedId === anim.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    {copiedId === anim.id ? 'Copied' : 'Luau'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedAnim && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass max-w-xl w-full rounded-2xl p-6 border border-[var(--border-color)] relative anim-pop">
            <button 
              onClick={() => setSelectedAnim(null)}
              className="absolute top-4 right-4 p-2 text-[var(--text-secondary)] hover:text-white"
            >
              ✕
            </button>
            
            <div className="mb-4">
              <span className="text-xs text-[var(--accent-warning)] font-bold uppercase tracking-wider">{selectedAnim.type} animation • {selectedAnim.duration}s</span>
              <h3 className="text-2xl font-bold mt-1 text-white">{selectedAnim.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Roblox TweenService implementation with custom easing curve.</p>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Roblox Luau Script</label>
              <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] font-mono text-xs overflow-x-auto text-gray-200 max-h-64">
                <pre>{selectedAnim.luauCode}</pre>
              </div>
            </div>

            <button
              onClick={() => copyCode(selectedAnim.luauCode, 'modal-anim')}
              className="w-full py-3 bg-[var(--accent-warning)] hover:bg-[#e0b04e] text-black rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              {copiedId === 'modal-anim' ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
              {copiedId === 'modal-anim' ? 'Code Copied to Clipboard!' : 'Copy Luau Script'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Animations;
