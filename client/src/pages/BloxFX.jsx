import { useState, useMemo } from 'react';
import { zipSync, strToU8 } from 'fflate';
import { assets, categories, buttonLabels, scriptFor } from '../assets';
import { Preview, Ico } from '../previews';
import { 
  Search, Copy, Check, Download, Sparkles, Filter, Code2, Sliders, 
  RotateCcw, Star, X, Play, Layers, ExternalLink
} from 'lucide-react';

const PALETTES = [
  { name: 'Crimson', h: 0, color: '#ff3b56' },
  { name: 'Lava', h: 28, color: '#ff6d00' },
  { name: 'Gold', h: 48, color: '#ffd600' },
  { name: 'Lime', h: 95, color: '#c5f774' },
  { name: 'Emerald', h: 145, color: '#00e676' },
  { name: 'Cyan', h: 185, color: '#00e5ff' },
  { name: 'Electric', h: 225, color: '#2979ff' },
  { name: 'Violet', h: 275, color: '#d500f9' },
  { name: 'Magenta', h: 325, color: '#ff1744' },
];

const POPULAR_ICONS = [
  'Zap', 'Sparkles', 'Flame', 'Shield', 'Crown', 'Sword', 'Star', 'Heart',
  'Trophy', 'Gamepad2', 'Rocket', 'Coins', 'Lock', 'Bell', 'Play', 'Check',
  'Eye', 'Settings', 'Key', 'RefreshCw'
];

function saveFile(name, data, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function BloxFX() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [activeAsset, setActiveAsset] = useState(null);
  const [modalTab, setModalTab] = useState('Customize & Preview');
  const [toast, setToast] = useState('');

  // Live customization state
  const [customHue, setCustomHue] = useState(undefined);
  const [customIcon, setCustomIcon] = useState(undefined);
  const [customLabel, setCustomLabel] = useState('');
  const [customSpeed, setCustomSpeed] = useState(1);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openInspector = (asset) => {
    setActiveAsset(asset);
    setCustomHue(asset.hue);
    setCustomIcon(asset.icon);
    setCustomLabel(buttonLabels[asset.variant] || asset.name);
    setCustomSpeed(1);
    setModalTab('Customize & Preview');
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesCategory = 
        selectedCategory === 'All' ? true :
        selectedCategory === 'Favorites' ? favorites.includes(asset.id) :
        asset.category === selectedCategory;

      const q = search.toLowerCase();
      const matchesSearch = !q || 
        asset.name.toLowerCase().includes(q) || 
        asset.category.toLowerCase().includes(q) || 
        asset.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search, favorites]);

  const downloadAllZip = () => {
    const files = {};
    assets.forEach(asset => {
      files[`${asset.category}/${asset.slug}.luau`] = strToU8(scriptFor(asset));
    });
    files['START-HERE.txt'] = strToU8(
      'BLOXFX — 200 Roblox UI effects\n\n' +
      'Each .luau file is a standalone LocalScript. In Roblox Studio, open Explorer > StarterPlayer > StarterPlayerScripts. ' +
      'Insert a LocalScript, paste one file, and press Play. Each script creates its own ScreenGui. ' +
      'Remove previous scripts before trying another. No plugins, external images, or dependencies are required. ' +
      'Browser previews are illustrative; native Roblox rendering may differ.\n\n' +
      'To customize: edit the configuration at the top of each script. These are client-side visual demos, not game logic.'
    );
    saveFile('BloxFX-200-Assets.zip', zipSync(files), 'application/zip');
    notify('200-asset pack ZIP downloaded successfully!');
  };

  const currentCode = activeAsset ? scriptFor(activeAsset, {
    customHue: customHue ?? activeAsset.hue,
    customIcon: customIcon ?? activeAsset.icon,
    customLabel: customLabel || buttonLabels[activeAsset.variant],
    customSpeed,
  }) : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Page Header */}
      <div className="border-b border-[var(--border-color)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/40 text-[var(--accent-secondary)] text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>200 Handcrafted Roblox UI Effects · Live Animated Previews</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span>BloxFX 200 Catalog</span>
            <span className="text-xs px-2.5 py-1 bg-[var(--accent-success)]/20 text-[var(--accent-success)] border border-[var(--accent-success)]/40 rounded-full font-mono font-bold">
              v1.0 Live
            </span>
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-2xl">
            Real animated preview cards for every effect. Live-customize color hues, change icons, edit button titles, and copy production-grade Luau scripts directly into Roblox Studio!
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search 200 effects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl outline-none focus:border-[var(--accent-primary)] text-sm text-white placeholder-gray-500"
            />
          </div>

          <button
            onClick={downloadAllZip}
            className="px-4 py-2 bg-gradient-to-r from-[var(--lime)] to-[#a8e050] text-[#131d0b] font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download All (200 ZIP)</span>
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {['All', 'Favorites', ...categories].map(cat => {
          const isSelected = selectedCategory === cat;
          const count = 
            cat === 'All' ? assets.length :
            cat === 'Favorites' ? favorites.length :
            assets.filter(a => a.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 border border-[var(--border-color)] select-none ${
                isSelected
                  ? 'bg-[var(--accent-primary)] text-white shadow-md glow-purple border-[var(--accent-primary)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)]'
              }`}
            >
              {cat === 'Favorites' && <Star className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'text-yellow-400 fill-yellow-400' : ''}`} />}
              <span>{cat}</span>
              <span className="opacity-60 text-[10px] font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid of 200 Assets — EACH CARD HAS REAL ANIMATED PREVIEW */}
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
              onClick={() => openInspector(asset)}
              className="glass rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all overflow-hidden flex flex-col justify-between group cursor-pointer shadow-md select-none relative"
            >
              {/* CARD REAL ANIMATED PREVIEW */}
              <div className="relative overflow-hidden border-b border-[var(--border-color)]">
                <Preview asset={asset} />

                {/* Favorite Star Button */}
                <button
                  onClick={(e) => toggleFavorite(e, asset.id)}
                  aria-label="Save Favorite"
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/50 border border-white/10 backdrop-blur-sm transition-all hover:scale-110 z-10 ${
                    favorites.includes(asset.id) ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${favorites.includes(asset.id) ? 'fill-yellow-400' : ''}`} />
                </button>

                {/* Badge Tag */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono uppercase text-gray-300 z-10">
                  {asset.category}
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-[var(--bg-card)]">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-extrabold text-sm text-white group-hover:text-[var(--accent-secondary)] transition-colors truncate">
                      {asset.name}
                    </h3>
                    <span className="text-[10px] font-mono text-[var(--text-secondary)]">#{String(asset.id).padStart(3, '0')}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                    {asset.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openInspector(asset);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)]/30 border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                    <span>Customize</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(scriptFor(asset));
                        setCopiedId(asset.id);
                        setTimeout(() => setCopiedId(null), 1800);
                        notify(`Copied ${asset.name} Luau code!`);
                      }}
                      title="Copy Standalone Luau Code"
                      className="p-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] text-white rounded-lg transition-all"
                    >
                      {copiedId === asset.id ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveFile(`${asset.slug}.luau`, scriptFor(asset));
                        notify(`Downloaded ${asset.name}.luau!`);
                      }}
                      title="Download .luau File"
                      className="p-1.5 bg-[var(--bg-secondary)] hover:bg-green-600 text-white rounded-lg transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIVE INSPECTOR & CUSTOMIZER MODAL */}
      {activeAsset && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveAsset(null)}
        >
          <div 
            className="bg-[#151622] border border-[var(--border-color)] rounded-2xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveAsset(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-secondary)]">
                <span>FX_{String(activeAsset.id).padStart(3, '0')}</span>
                <span>/</span>
                <span className="uppercase">{activeAsset.category}</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">{activeAsset.name}</h2>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{activeAsset.description}</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3 mb-4">
              {['Customize & Preview', 'Luau Code'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setModalTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    modalTab === tab 
                      ? 'bg-[var(--accent-primary)] text-white shadow glow-purple' 
                      : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            {modalTab === 'Customize & Preview' ? (
              <div className="flex flex-col gap-5">
                {/* LARGE LIVE ANIMATED PREVIEW */}
                <div className="rounded-xl overflow-hidden border border-[var(--border-color)] bg-[#0d0e18]">
                  <Preview
                    asset={activeAsset}
                    large
                    customHue={customHue}
                    customIcon={customIcon}
                    customLabel={customLabel}
                    customSpeed={customSpeed}
                  />
                </div>

                {/* INTERACTIVE CUSTOMIZER TOOLBELT */}
                <div className="customizer-box">
                  <div className="customizer-title">
                    <Sliders className="w-4 h-4 text-[var(--accent-secondary)]" />
                    <span>LIVE EFFECT PROPERTIES &amp; CUSTOMIZATION</span>
                    {(customHue !== activeAsset.hue || customIcon !== activeAsset.icon || customLabel !== (buttonLabels[activeAsset.variant] || activeAsset.name) || customSpeed !== 1) && (
                      <button
                        className="reset-btn"
                        onClick={() => {
                          setCustomHue(activeAsset.hue);
                          setCustomIcon(activeAsset.icon);
                          setCustomLabel(buttonLabels[activeAsset.variant] || activeAsset.name);
                          setCustomSpeed(1);
                        }}
                      >
                        <RotateCcw className="w-3 h-3 inline mr-1" />
                        Reset to default
                      </button>
                    )}
                  </div>

                  {/* Accent Color & Glow Hue Slider */}
                  <div className="custom-field">
                    <div className="field-header">
                      <label>Color &amp; Glow Hue (HSV Angle)</label>
                      <span
                        className="hue-badge"
                        style={{ background: `hsl(${customHue ?? activeAsset.hue}, 85%, 55%)` }}
                      >
                        {customHue ?? activeAsset.hue}° Hue
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={customHue ?? activeAsset.hue}
                      onChange={(e) => setCustomHue(Number(e.target.value))}
                      className="hue-slider"
                    />
                    <div className="swatches-row">
                      {PALETTES.map(p => (
                        <button
                          key={p.name}
                          className={`swatch-btn ${(customHue ?? activeAsset.hue) === p.h ? 'active' : ''}`}
                          style={{ '--swatch-color': p.color }}
                          title={`${p.name} (${p.h}°)`}
                          onClick={() => setCustomHue(p.h)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Icon Picker */}
                  <div className="custom-field">
                    <div className="field-header">
                      <label>Choose Icon</label>
                      <span className="icon-name-tag">{customIcon ?? activeAsset.icon}</span>
                    </div>
                    <div className="icons-grid">
                      {POPULAR_ICONS.map(name => (
                        <button
                          key={name}
                          className={`icon-choice ${(customIcon ?? activeAsset.icon) === name ? 'selected' : ''}`}
                          onClick={() => setCustomIcon(name)}
                          title={name}
                        >
                          <Ico n={name} size={16} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Button / Label Text */}
                  <div className="custom-field">
                    <div className="field-header">
                      <label>Button / Title Label</label>
                    </div>
                    <div className="text-input-row">
                      <input
                        type="text"
                        value={customLabel}
                        onChange={(e) => setCustomLabel(e.target.value)}
                        placeholder="Enter text..."
                        className="custom-text-input"
                      />
                      <div className="quick-tags">
                        {['SHOP', 'CLAIM', 'PLAY', 'UPGRADE', 'EQUIP', 'BUY'].map(w => (
                          <button key={w} onClick={() => setCustomLabel(w)} className="quick-tag-btn">
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Animation Speed */}
                  <div className="custom-field">
                    <div className="field-header">
                      <label>Animation Speed</label>
                      <span className="speed-val">{customSpeed}x</span>
                    </div>
                    <div className="speed-buttons">
                      {[
                        { l: '⚡ Fast (0.6x)', v: 0.6 },
                        { l: '▶ Normal (1.0x)', v: 1.0 },
                        { l: '🎬 Cinematic (1.6x)', v: 1.6 },
                      ].map(sp => (
                        <button
                          key={sp.v}
                          className={`speed-btn ${customSpeed === sp.v ? 'active' : ''}`}
                          onClick={() => setCustomSpeed(sp.v)}
                        >
                          {sp.l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="text-xs text-[var(--text-secondary)] font-mono">
                  Pure Luau code configured with your live custom properties:
                </div>
                <pre className="max-h-96 overflow-y-auto bg-[#0a0a14] border border-[var(--border-color)] p-4 rounded-xl text-xs font-mono text-emerald-300 leading-relaxed">
                  <code>{currentCode}</code>
                </pre>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[var(--text-secondary)]">
                Paste into a <code className="text-white bg-black/40 px-1 py-0.5 rounded">LocalScript</code> in <code className="text-white bg-black/40 px-1 py-0.5 rounded">StarterPlayerScripts</code>.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(currentCode);
                    notify('Customized Luau script copied to clipboard!');
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow glow-purple"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Customized Luau</span>
                </button>
                <button
                  onClick={() => {
                    saveFile(`${activeAsset.slug}-custom.luau`, currentCode);
                    notify(`Downloaded ${activeAsset.name}-custom.luau!`);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[var(--lime)] hover:brightness-110 text-[#131d0b] rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .luau</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#1a2e1c] border border-green-500/50 text-green-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm z-50 animate-bounce">
          <Check className="w-4 h-4 text-green-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default BloxFX;
