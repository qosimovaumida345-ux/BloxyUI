import { useState, useEffect } from 'react';
import { fetchEffects } from '../lib/api';
import { Search, Loader2, Copy, Check, Sparkles, Wand2 } from 'lucide-react';

const EFFECT_TYPES = ['all', 'background', 'overlay', 'border', 'particle'];

function Effects() {
  const [effects, setEffects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedEffect, setSelectedEffect] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchEffects({ type: activeType, search });
      setEffects(res.data || []);
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
            <span className="px-3 py-1 bg-[var(--accent-success)] text-black text-xs font-bold rounded-full">
              {effects.length} EFFECTS READY
            </span>
            <span className="text-xs text-[var(--text-secondary)]">UIGradient, UIStroke & Particle Systems</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Juicy Effects & Textures</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Sunburst rays, 3D cartoony bevels, neon auras, sparkles, and particle bursts ready for Roblox.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[var(--text-secondary)]" />
          <input 
            type="text" 
            placeholder="Search effects (e.g. sunburst, bevel, neon)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 pb-2 border-b border-[var(--border-color)]">
        {EFFECT_TYPES.map(type => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
              activeType === type
                ? 'bg-[var(--accent-success)] text-black shadow-md font-bold'
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
          <Loader2 className="w-10 h-10 animate-spin text-[var(--accent-primary)] mb-4" />
          <p className="text-[var(--text-secondary)]">Loading effects...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {effects.map(effect => {
            const previewStyle = effect.previewData?.css 
              ? Object.fromEntries(
                  effect.previewData.css
                    .split(';')
                    .filter(Boolean)
                    .map(pair => {
                      const [k, ...v] = pair.split(':');
                      if (!k) return null;
                      const camelKey = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                      return [camelKey, v.join(':').trim()];
                    })
                    .filter(Boolean)
                )
              : {};

            return (
              <div 
                key={effect.id}
                onClick={() => setSelectedEffect(effect)}
                className="glass rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent-success)] transition-all overflow-hidden group cursor-pointer flex flex-col"
              >
                {/* Live Preview Box */}
                <div className="h-44 bg-[var(--bg-secondary)] flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                  
                  {/* Dynamic effect simulation button */}
                  <div 
                    className="relative z-10 px-8 py-3.5 rounded-xl font-extrabold text-white text-base shadow-xl transition-transform group-hover:scale-105 flex items-center gap-2"
                    style={previewStyle}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
                    <span>{effect.name.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Footer details */}
                <div className="p-5 border-t border-[var(--border-color)] flex-1 flex flex-col justify-between bg-[var(--bg-card)]">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-lg text-white group-hover:text-[var(--accent-success)] transition-colors">{effect.name}</h3>
                      <span className="text-[11px] font-semibold text-[var(--accent-success)] px-2.5 py-0.5 bg-[var(--bg-secondary)] rounded-full uppercase tracking-wider border border-[var(--border-color)]">
                        {effect.type}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{effect.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)] font-mono">Luau Preset</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyCode(effect.luauCode, effect.id);
                      }}
                      className="px-3 py-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--accent-success)] hover:text-black rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 text-white"
                    >
                      {copiedId === effect.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === effect.id ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedEffect && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass max-w-xl w-full rounded-2xl p-6 border border-[var(--border-color)] relative anim-pop">
            <button 
              onClick={() => setSelectedEffect(null)}
              className="absolute top-4 right-4 p-2 text-[var(--text-secondary)] hover:text-white"
            >
              ✕
            </button>
            
            <div className="mb-4">
              <span className="text-xs text-[var(--accent-success)] font-bold uppercase tracking-wider">{selectedEffect.type} effect</span>
              <h3 className="text-2xl font-bold mt-1 text-white">{selectedEffect.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{selectedEffect.description}</p>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-[var(--text-secondary)] block mb-1">Roblox Luau Code</label>
              <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] font-mono text-xs overflow-x-auto text-gray-200 max-h-64">
                <pre>{selectedEffect.luauCode}</pre>
              </div>
            </div>

            <button
              onClick={() => copyCode(selectedEffect.luauCode, 'modal-effect')}
              className="w-full py-3 bg-[var(--accent-success)] hover:bg-[#00a884] text-black rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              {copiedId === 'modal-effect' ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
              {copiedId === 'modal-effect' ? 'Code Copied to Clipboard!' : 'Copy Luau Script'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Effects;
