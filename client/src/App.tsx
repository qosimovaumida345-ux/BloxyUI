import { useState } from 'react'
import { zipSync, strToU8 } from 'fflate'
import { assets, categories, buttonLabels, scriptFor, type Asset } from './assets'
import { Preview, Ico } from './previews'

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, string> = {
    grid: 'M3 3h6v6H3z M15 3h6v6h-6z M3 15h6v6H3z M15 15h6v6h-6z',
    arrow: 'M5 12h14 M13 6l6 6-6 6',
    download: 'M12 3v12 M7 10l5 5 5-5 M4 16v5h16v-5',
    search: 'M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    star: 'm12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z',
    bolt: 'm13 2-9 12h7l-1 8 10-12h-7z',
    code: 'm8 6-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18',
    close: 'm6 6 12 12 M18 6 6 18',
    play: 'm9 5 11 7-11 7z',
    book: 'M4 3h13l3 3v15H4z M8 8h8 M8 12h8 M8 16h5',
    check: 'm5 12 4 4 10-10',
    heart: 'M12 21 3 12C-2 5 6 0 12 7c6-7 14-2 9 5z',
    box: 'm12 2 9 5v10l-9 5-9-5V7z M3 7l9 5 9-5 M12 12v10',
    circle: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
    sliders: 'M4 5h16 M4 12h16 M4 19h16 M8 2v6 M16 9v6 M10 16v6',
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.box} />
    </svg>
  )
}

function save(name: string, data: BlobPart, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([data], { type }))
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

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
]

const POPULAR_ICONS = [
  'Zap', 'Sparkles', 'Flame', 'Shield', 'Crown', 'Sword', 'Star', 'Heart',
  'Trophy', 'Gamepad2', 'Rocket', 'Coins', 'Lock', 'Bell', 'Play', 'Check',
  'Eye', 'Settings', 'Key', 'RefreshCw'
]

export default function App() {
  const [category, setCategory] = useState('All assets')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [selected, setSelected] = useState<Asset | null>(null)
  const [tab, setTab] = useState('Customize & Preview')
  const [copied, setCopied] = useState(false)
  const [guide, setGuide] = useState(false)
  const [sort, setSort] = useState('Featured')
  const [toast, setToast] = useState('')

  // Customization state
  const [customHue, setCustomHue] = useState<number | undefined>(undefined)
  const [customIcon, setCustomIcon] = useState<string | undefined>(undefined)
  const [customLabel, setCustomLabel] = useState<string>('')
  const [customSpeed, setCustomSpeed] = useState<number>(1)

  const openAsset = (asset: Asset) => {
    setSelected(asset)
    setCustomHue(asset.hue)
    setCustomIcon(asset.icon)
    setCustomLabel(buttonLabels[asset.variant] || asset.name)
    setCustomSpeed(1)
    setTab('Customize & Preview')
  }

  let visible = assets.filter(asset => 
    (category === 'All assets' || category === asset.category || (category === 'Favorites' && favorites.includes(asset.id))) &&
    `${asset.name} ${asset.category} ${asset.description}`.toLowerCase().includes(search.toLowerCase())
  )

  if (sort === 'Name A–Z') {
    visible = [...visible].sort((first, second) => first.name.localeCompare(second.name))
  }

  const notify = (text: string) => {
    setToast(text)
    setTimeout(() => setToast(''), 3000)
  }

  const downloadAll = () => {
    const files: Record<string, Uint8Array> = {}
    assets.forEach(asset => {
      files[`${asset.category}/${asset.slug}.luau`] = strToU8(scriptFor(asset))
    })
    files['START-HERE.txt'] = strToU8(
      'BLOXFX — 200 Roblox UI effects\n\n' +
      'Each .luau file is a standalone LocalScript. In Roblox Studio, open Explorer > StarterPlayer > StarterPlayerScripts. ' +
      'Insert a LocalScript, paste one file, and press Play. Each script creates its own ScreenGui. ' +
      'Remove previous scripts before trying another. No plugins, external images, or dependencies are required. ' +
      'Browser previews are illustrative; native Roblox rendering may differ.\n\n' +
      'To customize: edit the configuration at the top of each script. These are client-side visual demos, not game logic.'
    )
    save('BLOXFX-200-assets.zip', zipSync(files) as unknown as BlobPart, 'application/zip')
    notify('Your 200-asset pack is ready.')
  }

  const currentCode = selected ? scriptFor(selected, {
    customHue: customHue ?? selected.hue,
    customIcon: customIcon ?? selected.icon,
    customLabel: customLabel || buttonLabels[selected.variant],
    customSpeed,
  }) : ''

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#">
          <span className="brand-mark">B</span>
          BLOX<span>FX</span>
          <sup>®</sup>
        </a>

        <div className="workspace">
          <span className="workspace-icon"><Icon name="box" /></span>
          <div>Creator workspace<small>Personal library</small></div>
          <span className="workspace-chevron">⌄</span>
        </div>

        <div className="side-caption">WORKSPACE</div>
        <button className={`nav-item ${category !== 'Favorites' ? 'active' : ''}`} onClick={() => setCategory('All assets')}>
          <Icon name="grid" />
          Asset library
          <span>200</span>
        </button>
        <button className={`nav-item ${category === 'Favorites' ? 'active' : ''}`} onClick={() => setCategory('Favorites')}>
          <Icon name="star" />
          Favorites
          <span>{favorites.length.toString().padStart(2, '0')}</span>
        </button>
        <button className="nav-item" onClick={() => setGuide(true)}>
          <Icon name="book" />
          Getting started
          <Icon name="arrow" size={14} />
        </button>

        <div className="side-caption category-heading">CATEGORIES</div>
        {categories.map((item, index) => (
          <button
            key={item}
            className={`category-link ${category === item ? 'chosen' : ''}`}
            onClick={() => setCategory(item)}
          >
            <Icon name={['bolt', 'circle', 'circle', 'box', 'grid', 'check', 'star', 'sliders', 'sliders', 'circle'][index]} size={16} />
            {item}
            <span>20</span>
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="studio-note">
            <span className="status-dot" />
            Built for Roblox Studio
            <p>Your next great UI starts here.</p>
            <button onClick={() => setGuide(true)}>
              How to use assets <Icon name="arrow" size={14} />
            </button>
          </div>
          <div className="profile">
            <span className="profile-avatar">C</span>
            <div>Creator<small>Make something great.</small></div>
            <Icon name="sliders" size={16} />
          </div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div>Workspace <span>/</span> <strong>Asset library</strong></div>
          <div className="topbar-right">
            <span className="version">v1.0</span>
            <span className="studio-status"><span className="status-dot" /> Roblox Studio ready</span>
            <button onClick={() => setGuide(true)} className="help-button">?</button>
          </div>
        </header>

        <div className="main-content">
          <div className="page-heading">
            <div className="eyebrow"><span /> THE CREATOR’S TOOLKIT</div>
            <div className="title-row">
              <h1>Small details. <span>Big impact.</span></h1>
              <button className="download-all" onClick={downloadAll}>
                <Icon name="download" />
                Download all assets <span>200</span>
              </button>
            </div>
            <p>200 crafted UI effects with real-time CSS animation previews & Luau code generation. Made to bring your Roblox world to life.</p>
          </div>

          <section className="hero">
            <div className="hero-copy">
              <span className="hero-label"><Icon name="bolt" size={13} /> FEATURED EFFECT</span>
              <h2>A little motion.<br />A lot of energy.</h2>
              <p>Meet Crimson Sweep. A bold button with a<br className="desktop-break" /> silky light sweep. 200 effects, 100 different motions.</p>
              <button onClick={() => openAsset(assets[0])}>
                Explore effect &amp; customize <Icon name="arrow" size={16} />
              </button>
              <div className="hero-tags">
                <span>LocalScript</span>
                <span>TweenService</span>
                <span>No dependencies</span>
              </div>
            </div>
            <div className="hero-demo">
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <Preview asset={assets[0]} large />
              <div className="hero-coordinate">FX_001 <span>INTERACTIVE PREVIEW</span></div>
            </div>
          </section>

          <div className="library-heading">
            <h2>{category} <span>{visible.length}</span></h2>
            <div><Icon name="check" size={14} />Live Previews · Customization · Luau LocalScripts</div>
          </div>

          <div className="filter-toolbar">
            <div className="filter-tabs">
              {['All assets', 'Buttons', 'Backgrounds', 'Loaders', 'Cards'].map(item => (
                <button
                  className={category === item ? 'selected' : ''}
                  key={item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
              <select
                aria-label="More categories"
                value={categories.slice(4).includes(category) ? category : ''}
                onChange={event => event.target.value && setCategory(event.target.value)}
              >
                <option value="">More ↓</option>
                {categories.slice(4).map(item => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="filter-actions">
              <label className="search">
                <Icon name="search" size={15} />
                <input
                  placeholder="Search 200 effects..."
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                />
                <kbd>/</kbd>
              </label>
              <select aria-label="Sort assets" value={sort} onChange={event => setSort(event.target.value)}>
                <option>Featured</option>
                <option>Name A–Z</option>
              </select>
            </div>
          </div>

          <div className="asset-grid">
            {visible.map(asset => (
              <article className="asset-card" key={asset.id}>
                <div className="card-preview">
                  <Preview asset={asset} />
                  <button
                    className={`favorite ${favorites.includes(asset.id) ? 'saved' : ''}`}
                    aria-label={`Favorite ${asset.name}`}
                    onClick={() => setFavorites(current => current.includes(asset.id) ? current.filter(id => id !== asset.id) : [...current, asset.id])}
                  >
                    <Icon name="star" size={15} />
                  </button>
                  {asset.id < 4 && <span className="new-badge">{asset.id === 1 ? 'POPULAR' : 'NEW'}</span>}
                </div>
                <div className="card-details">
                  <div className="card-title">
                    <button onClick={() => openAsset(asset)}>{asset.name}</button>
                    <button aria-label={`Download ${asset.name}`} onClick={() => save(`${asset.slug}.luau`, scriptFor(asset))}>
                      <Icon name="download" size={17} />
                    </button>
                  </div>
                  <p>{asset.description}</p>
                  <div className="card-footer">
                    <span>{asset.category}</span>
                    <button className="card-customize-btn" onClick={() => openAsset(asset)}>
                      <Icon name="sliders" size={13} />
                      Customize
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="empty-state">
              <Icon name="search" size={30} />
              <h3>No effects found</h3>
              <p>Try another search or save a few favorites.</p>
              <button onClick={() => { setSearch(''); setCategory('All assets') }}>Show all assets</button>
            </div>
          )}

          <footer>
            <span>BLOXFX / BloxyUI © 2026</span>
            <span>Made for Roblox Creators. Pure Luau &amp; Native Tweens.</span>
            <span>200 assets · 10 categories</span>
          </footer>
        </div>
      </main>

      {(selected || guide) && (
        <div className="modal-backdrop" onClick={() => { setSelected(null); setGuide(false) }}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={guide ? 'Getting started' : selected?.name}
            onClick={event => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => { setSelected(null); setGuide(false) }}
              aria-label="Close"
            >
              <Icon name="close" />
            </button>

            {guide ? (
              <>
                <span className="eyebrow">FROM LIBRARY TO YOUR WORLD</span>
                <h2>Ready in three steps.</h2>
                <p>Each asset is a complete, dependency-free Luau LocalScript.</p>
                <ol>
                  <li>
                    <strong>Choose and Customize your effect</strong>
                    <p>Tweak color hues, change icons, edit button titles, or adjust speed in real time.</p>
                  </li>
                  <li>
                    <strong>Add a LocalScript in Roblox Studio</strong>
                    <p>In Studio’s Explorer, go to <code>StarterPlayer → StarterPlayerScripts</code>. Insert a LocalScript and paste the code.</p>
                  </li>
                  <li>
                    <strong>Press Play (F5)</strong>
                    <p>Interact with the live UI. Native Roblox TweenService handles the animations smoothly. No external image assets or plugins needed!</p>
                  </li>
                </ol>
                <div className="guide-note">
                  Browser previews demonstrate the style with CSS. Roblox uses native GuiObjects and TweenService, running smoothly on mobile, PC, and console.
                </div>
                <button className="download-all" onClick={downloadAll}>
                  <Icon name="download" />
                  Get the complete 200-asset pack (.zip)
                </button>
              </>
            ) : selected && (
              <>
                <span className="eyebrow">FX_{String(selected.id).padStart(3, '0')} / {selected.category.toUpperCase()}</span>
                <h2>{selected.name}</h2>
                <p>{selected.description}</p>

                <div className="modal-tabs">
                  {['Customize & Preview', 'Luau code'].map(item => (
                    <button
                      key={item}
                      className={tab === item ? 'selected' : ''}
                      onClick={() => setTab(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {tab === 'Customize & Preview' ? (
                  <>
                    <Preview
                      asset={selected}
                      large
                      customHue={customHue}
                      customIcon={customIcon}
                      customLabel={customLabel}
                      customSpeed={customSpeed}
                    />

                    {/* LIVE CUSTOMIZER CONTROLS */}
                    <div className="customizer-box">
                      <div className="customizer-title">
                        <Icon name="sliders" size={15} />
                        <span>LIVE EFFECT CUSTOMIZER &amp; PROPERTIES</span>
                        {(customHue !== selected.hue || customIcon !== selected.icon || customLabel !== (buttonLabels[selected.variant] || selected.name) || customSpeed !== 1) && (
                          <button
                            className="reset-btn"
                            onClick={() => {
                              setCustomHue(selected.hue)
                              setCustomIcon(selected.icon)
                              setCustomLabel(buttonLabels[selected.variant] || selected.name)
                              setCustomSpeed(1)
                            }}
                          >
                            Reset to default
                          </button>
                        )}
                      </div>

                      {/* Color Hue Slider & Swatches */}
                      <div className="custom-field">
                        <div className="field-header">
                          <label>Accent Color &amp; Glow Hue</label>
                          <span
                            className="hue-badge"
                            style={{ background: `hsl(${customHue ?? selected.hue}, 85%, 55%)` }}
                          >
                            {customHue ?? selected.hue}° Hue
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={customHue ?? selected.hue}
                          onChange={e => setCustomHue(Number(e.target.value))}
                          className="hue-slider"
                        />
                        <div className="swatches-row">
                          {PALETTES.map(s => (
                            <button
                              key={s.name}
                              className={`swatch-btn ${(customHue ?? selected.hue) === s.h ? 'active' : ''}`}
                              style={{ '--swatch-color': s.color } as any}
                              title={`${s.name} (${s.h}°)`}
                              onClick={() => setCustomHue(s.h)}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Icon Picker */}
                      <div className="custom-field">
                        <div className="field-header">
                          <label>Active Icon</label>
                          <span className="icon-name-tag">{customIcon ?? selected.icon}</span>
                        </div>
                        <div className="icons-grid">
                          {POPULAR_ICONS.map(iconName => (
                            <button
                              key={iconName}
                              className={`icon-choice ${(customIcon ?? selected.icon) === iconName ? 'selected' : ''}`}
                              onClick={() => setCustomIcon(iconName)}
                              title={iconName}
                            >
                              <Ico n={iconName} size={16} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Text / Label */}
                      <div className="custom-field">
                        <div className="field-header">
                          <label>Button / Title Label</label>
                        </div>
                        <div className="text-input-row">
                          <input
                            type="text"
                            value={customLabel}
                            onChange={e => setCustomLabel(e.target.value)}
                            placeholder="Enter button text..."
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

                      {/* Motion Speed */}
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
                  </>
                ) : (
                  <pre><code>{currentCode}</code></pre>
                )}

                <div className="guide-note">
                  Paste into a LocalScript in <code>StarterPlayer → StarterPlayerScripts</code>, then press Play.
                </div>

                <div className="modal-actions">
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(currentCode)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      } catch {
                        notify('Clipboard unavailable. Download the script instead.')
                      }
                    }}
                  >
                    <Icon name={copied ? 'check' : 'code'} />
                    {copied ? 'Custom Code Copied!' : 'Copy Customized Luau'}
                  </button>
                  <button
                    className="download-all"
                    onClick={() => save(`${selected.slug}-custom.luau`, currentCode)}
                  >
                    <Icon name="download" />
                    Download .luau
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {toast && (
        <div className="toast">
          <Icon name="check" />
          {toast}
        </div>
      )}
    </div>
  )
}
