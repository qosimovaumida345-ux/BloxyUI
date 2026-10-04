import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { icons } from 'lucide-react'
import { buttonLabels, type Asset } from './assets'
import './fx.css'

const vars = (o: Record<string, string | number>) => o as CSSProperties
const range = (n: number) => Array.from({ length: n }, (_, i) => i)
const rnd = (i: number, s = 1) => { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x) }

export function Ico({ n, size = 18, fill = false }: { n: string; size?: number; fill?: boolean }) {
  const Cmp = icons[n as keyof typeof icons] || icons.Sparkles
  return <Cmp size={size} strokeWidth={2} fill={fill ? 'currentColor' : 'none'} />
}

const offIcons: Record<string, string> = { Power: 'PowerOff', Volume2: 'VolumeX', Heart: 'HeartOff', Star: 'StarOff', BellOff: 'Bell', Wifi: 'WifiOff', Lightbulb: 'LightbulbOff', Mic: 'MicOff', Camera: 'CameraOff', Eye: 'EyeOff', SunMoon: 'Moon', Lock: 'LockOpen', SquareCheck: 'Square', Gamepad2: 'Gamepad' }
const lorem = {
  slots: ['Sword', 'Shield', 'FlaskConical', 'Gem', 'Key', 'Coins', 'Scroll', 'Apple', 'Axe', 'Crown'],
  stats: [['STR', 82], ['AGI', 64], ['INT', 91], ['LUK', 47]] as [string, number][],
  names: ['Nova_Rider', 'PixelFox', 'Mika_07', 'Ironclad'],
}

/* ───────────── Buttons ───────────── */
function Buttons({ a, asset }: { a: number; asset: Asset }) {
  const label = asset.customLabel || buttonLabels[asset.variant]
  const ico = asset.customIcon || asset.icon
  return <div className="body"><div className="bw">
    {a === 1 && <><i className="ring" /><i className="ring r2" /></>}
    <div className="btn">
      {(a === 7 || a === 2) && <span className={a === 7 ? 'fill' : ''} />}
      {a === 2 && range(2).map(i => <i key={i} className="rip" style={vars({ '--i': i })} />)}
      {a === 0 && <span className="shine" />}
      <span className="in"><Ico n={ico} size={18} /><span className="t">{label}</span></span>
      {a === 6 && <><span className="g g1">{label}</span><span className="g g2">{label}</span></>}
    </div>
    {a === 2 && <span className="cur"><Ico n="MousePointer2" size={22} fill /></span>}
    {a === 3 && <span className="drop" />}
  </div></div>
}

/* ───────────── Backgrounds ───────────── */
function Backgrounds({ a, asset }: { a: number; asset: Asset }) {
  const floats = range(5).map(i => <span key={i} className="fi" style={vars({ '--x': `${8 + rnd(i, 3) * 80}%`, '--y': `${10 + rnd(i, 4) * 70}%`, '--i': i })}><Ico n={asset.icon} size={12 + (i % 3) * 5} /></span>)
  let layers: ReactNode = null
  if (a === 0) layers = <><i className="blob b1" /><i className="blob b2" /><i className="blob b3" /></>
  if (a === 1) layers = <><i className="hz" /><i className="floor" /></>
  if (a === 2) layers = [0, 1].map(l => <div key={l} className={`layer l${l}`}>{[0, 1].map(h => <div key={h} className="half">{range(l ? 18 : 30).map(i => <i key={i} className="star" style={vars({ left: `${rnd(i, l + 1) * 100}%`, top: `${rnd(i, l + 7) * 100}%`, '--s': `${l ? 2.5 : 1.5}px`, '--i': i % 7 })} />)}</div>)}</div>)
  if (a === 3) layers = range(28).map(i => <i key={i} className="ember" style={vars({ left: `${rnd(i, 1) * 100}%`, '--s': `${2 + rnd(i, 2) * 4}px`, '--t': `${3 + rnd(i, 3) * 3.5}s`, '--dl': `${-rnd(i, 4) * 6}s`, '--w': `${(rnd(i, 5) - 0.5) * 40}px` })} />)
  if (a === 4) layers = range(3).map(i => <svg key={i} className={`wave w${i}`} viewBox="0 0 200 60" preserveAspectRatio="none"><path d="M0 20 Q12.5 5 25 20 T50 20 T75 20 T100 20 T125 20 T150 20 T175 20 T200 20 V60 H0Z" /></svg>)
  if (a === 5) layers = range(22).map(i => <i key={i} className="col" style={vars({ left: `${i * 4.6}%`, '--t': `${1.2 + rnd(i, 1) * 2}s`, '--dl': `${-rnd(i, 2) * 3}s`, '--h2': `${30 + rnd(i, 3) * 40}%` })} />)
  if (a === 6) layers = <><i className="rays" /><i className="sun" /></>
  if (a === 7) layers = range(16).map(i => <i key={i} className="bub" style={vars({ left: `${rnd(i, 1) * 95}%`, '--s': `${8 + rnd(i, 2) * 26}px`, '--t': `${4 + rnd(i, 3) * 4}s`, '--dl': `${-rnd(i, 4) * 8}s` })} />)
  if (a === 8) layers = <><i className="dots" />{range(3).map(i => <i key={i} className="rg" style={vars({ '--i': i })} />)}<i className="sweep" />{range(5).map(i => <i key={i} className="blip" style={vars({ left: `${15 + rnd(i, 1) * 70}%`, top: `${15 + rnd(i, 2) * 70}%`, '--dl': `${i * 0.6}s` })} />)}</>
  if (a === 9) layers = <><i className="st" /><i className="shade" /></>
  return <><div className="layers">{layers}</div>{floats}<div className="chip"><Ico n={asset.icon} size={14} />{asset.name.toUpperCase()}</div></>
}

/* ───────────── Loaders ───────────── */
function Loaders({ a, asset }: { a: number; asset: Asset }) {
  const icon = <span className="lico"><Ico n={asset.icon} size={a === 0 ? 24 : 20} /></span>
  let core: ReactNode = null
  if (a === 0) core = <>{range(3).map(i => <i key={i} className="arm" style={vars({ '--i': i })}><b /></i>)}{icon}</>
  if (a === 1) core = <><i className="r r1" /><i className="r r2" />{icon}</>
  if (a === 2) core = <><div className="hop">{range(3).map(i => <i key={i} className="dot" style={vars({ '--i': i })} />)}</div><div className="hop sh">{range(3).map(i => <i key={i} style={vars({ '--i': i })} />)}</div><span className="lico top">{icon}</span></>
  if (a === 3) core = <>{range(3).map(i => <i key={i} className="sn" style={vars({ '--i': i })} />)}{icon}</>
  if (a === 4) core = <><div className="eq">{range(9).map(i => <i key={i} style={vars({ '--i': i })} />)}</div><span className="lico top">{icon}</span></>
  if (a === 5) core = <><i className="shp" />{icon}</>
  if (a === 6) core = <><svg viewBox="0 0 80 80" className="dash"><circle cx="40" cy="40" r="34" className="trk" /><circle cx="40" cy="40" r="34" className="arc" /><circle cx="40" cy="40" r="24" className="arc a2" /></svg>{icon}</>
  if (a === 7) core = <><i className="tail" /><i className="cw"><b /></i>{icon}</>
  if (a === 8) core = <div className="tiles">{range(9).map(i => <i key={i} className="tile" style={vars({ '--k': (i % 3) + Math.floor(i / 3) })}>{i === 4 && <Ico n={asset.icon} size={14} />}</i>)}</div>
  if (a === 9) core = <div className="tiles two">{range(4).map(i => <i key={i} className="flipt" style={vars({ '--k': i })}><Ico n={asset.icon} size={16} /></i>)}</div>
  return <div className="body"><div className="lw">{core}</div><div className="lab">LOADING<span /></div></div>
}

/* ───────────── Cards ───────────── */
function Cards({ a, asset }: { a: number; asset: Asset }) {
  const face = (extra?: ReactNode) => <><div className="cico"><Ico n={asset.customIcon || asset.icon} size={30} /></div><b>{asset.customLabel || asset.name}</b><small>{asset.description}</small>{extra}</>
  let inner: ReactNode
  if (a === 0) inner = <div className="flip"><div className="cd f">{face()}</div><div className="cd bk"><Ico n="Sparkles" size={20} /><b>REVEALED</b><div className="stars">{range(5).map(i => <Ico key={i} n="Star" size={11} fill />)}</div><small>{asset.variant < 10 ? 'Rare find' : 'Epic find'}</small></div></div>
  else if (a === 2) inner = <div className="fan">{range(3).map(i => <div key={i} className={`cd fc fc${i}`}>{i === 2 ? face() : <Ico n={asset.icon} size={22} />}</div>)}</div>
  else if (a === 4) inner = <div className="cd up"><span className="hero"><Ico n={asset.icon} size={36} /></span><span className="shd" />{face()}</div>
  else if (a === 5) inner = <div className="cd sl"><div className="map">{range(6).map(i => <i key={i} style={vars({ '--i': i })} />)}<Ico n={asset.icon} size={30} /></div><div className="ov"><b>{asset.name}</b><small>{asset.description}</small></div></div>
  else if (a === 8) inner = <div className="cd lo"><i className="rays" /><div className="cico big"><Ico n={asset.icon} size={34} /></div><b>{asset.name}</b><div className="stars">{range(5).map(i => <Ico key={i} n="Star" size={10} fill />)}</div>{range(4).map(i => <Ico key={i} n="Sparkle" size={10} fill />)}</div>
  else if (a === 9) inner = <div className="cd pl">{face()}<i className="peel" /></div>
  else inner = <div className={`cd c${a}`}>{a === 7 && <><i className="gb gb1" /><i className="gb gb2" /></>}{a === 1 && <i className="glare" />}{a === 6 && <i className="foil" />}{face()}</div>
  return <div className="body"><div className={`cw cw${a}`}>{inner}</div></div>
}

/* ───────────── Panels ───────────── */
function Panels({ a, asset }: { a: number; asset: Asset }) {
  const head = (tag: string) => <div className="ph"><Ico n={asset.customIcon || asset.icon} size={13} />{asset.customLabel || asset.name}<em>{tag}</em></div>
  let body: ReactNode
  if (a === 0) body = <div className="slots">{range(10).map(i => <span key={i} className="slot" style={vars({ '--i': i })}><Ico n={lorem.slots[i]} size={15} /></span>)}</div>
  else if (a === 1) body = <div className="stats">{lorem.stats.map(([k, v], i) => <div className="row" key={k}><span>{k}</span><div className="trk"><i style={vars({ '--w': `${v}%`, '--i': i })} /></div><b>{v}</b></div>)}</div>
  else if (a === 2) body = <div className="prof"><div className="av"><i /><span><Ico n="UserRound" size={24} /></span></div><div className="pi"><b>{lorem.names[0]}</b><div className="chips"><span>LVL 24</span><span>1,240 ★</span></div><div className="trk"><i style={vars({ '--w': '68%', '--i': 0 })} /></div></div></div>
  else if (a === 3) body = <div className="stats">{['Master', 'Music', 'Voices'].map((k, i) => <div className="row" key={k}><span>{k}</span><div className="trk sld"><i style={vars({ '--i': i })} /></div></div>)}</div>
  else if (a === 4) body = <div className="shop">{['Sword', 'Gem', 'Crown'].map((n, i) => <div key={n} className="itm" style={vars({ '--i': i })}><Ico n={n} size={20} /><span><Ico n="Coins" size={10} />{[250, 900, 1500][i]}</span></div>)}</div>
  else if (a === 5) body = <div className="lb">{lorem.names.map((n, i) => <div key={n} className={`lr lr${i}`} style={vars({ '--i': i })}><b>{i + 1}</b><span className="dot" /><em>{n}</em><span>{[9840, 8120, 7455, 6030][i].toLocaleString()}</span></div>)}</div>
  else if (a === 6) body = <div className="tasks">{['Defeat 5 slimes', 'Collect 3 gems', 'Reach the castle'].map((t, i) => <div key={t} className="tk" style={vars({ '--i': i })}><span className="cb"><Ico n="Check" size={11} /></span><em>{t}</em></div>)}</div>
  else if (a === 7) body = <div className="chat"><div className="bb b1" style={vars({ '--i': 0 })}><i>Nova</i>Ready for the raid?</div><div className="bb b2" style={vars({ '--i': 1 })}>Always.</div><div className="bb b3" style={vars({ '--i': 2 })}><i>Mika</i><span className="typing"><u /><u /><u /></span></div></div>
  else if (a === 8) body = <div className="mm"><div className="radar"><i className="sw" />{range(3).map(i => <i key={i} className="rg" style={vars({ '--i': i })} />)}{range(4).map(i => <i key={i} className="blip" style={vars({ left: `${20 + rnd(i, 1) * 60}%`, top: `${20 + rnd(i, 2) * 60}%`, '--dl': `${i * 0.7}s` })} />)}</div><div className="coords"><span>X 482</span><span>Y 117</span><span>2 NEARBY</span></div></div>
  else body = <div className="hot">{['Flame', 'Zap', 'Snowflake', 'Shield', 'Heart'].map((n, i) => <span key={n} className="ab" style={vars({ '--i': i })}><Ico n={n} size={17} /><i className="cool" /><kbd>{i + 1}</kbd></span>)}</div>
  return <div className="body"><div className="pn">{head(['24 / 40', 'LIVE', 'ONLINE', 'MIX', 'SALE', 'TOP 4', '1 / 3', '3 ONLINE', 'N 12°', 'READY'][a])}{body}</div></div>
}

/* ───────────── Notifications ───────────── */
function Notifications({ a, asset }: { a: number; asset: Asset }) {
  const ico = (cls = '') => <span className={`ni ${cls}`}><Ico n={asset.customIcon || asset.icon} size={18} /></span>
  const txt = <div className="nx"><b>{asset.customLabel || asset.name}</b><small>{asset.description}</small></div>
  let inner: ReactNode
  if (a === 0) inner = <div className="nt">{ico()}{txt}<i className="pg" /></div>
  else if (a === 1) inner = <div className="nt gold"><i className="burst" />{ico('trophy')}{txt}{range(8).map(i => <i key={i} className="conf" style={vars({ '--r': `${i * 45}deg` })} />)}</div>
  else if (a === 2) inner = <div className="rb"><span className="chev"><Ico n={asset.icon} size={20} /></span><b>LEVEL 25</b><span className="chev"><Ico n="ChevronsUp" size={20} /></span></div>
  else if (a === 3) inner = <div className="coin"><span className="big"><Ico n={asset.icon} size={32} /></span><b className="plus">+250</b>{range(6).map(i => <i key={i} className="mc" style={vars({ '--r': `${i * 60 + 20}deg` })}><Ico n={asset.icon} size={10} /></i>)}</div>
  else if (a === 4) inner = <div className="nt fr"><span className="avt">M</span><div className="nx"><b>Mika_07</b><small>wants to be friends</small></div><span className="no"><Ico n="X" size={14} /></span><span className="yes"><Ico n="Check" size={14} /></span></div>
  else if (a === 5) inner = <div className="nt warn"><span className="ni"><Ico n={asset.icon} size={18} /></span>{txt}</div>
  else if (a === 6) inner = <div className="nt loot"><i className="burst" /><span className="ni big">{<Ico n={asset.icon} size={22} />}</span><div className="nx"><b>{asset.name}</b><small>LEGENDARY · just dropped</small></div>{range(4).map(i => <Ico key={i} n="Sparkle" size={10} fill />)}</div>
  else if (a === 7) inner = <div className="chatn"><span className="avt">N</span><div className="bub"><span className="ty"><u /><u /><u /></span><span className="msg"><Ico n={asset.icon} size={12} /> {asset.name}: hey!</span></div></div>
  else if (a === 8) inner = <div className="kfw">{[['Nova', 'Ironclad'], ['Mika', 'PixelFox'], ['You', 'Voidling']].map(([x, y], i) => <div key={i} className="kf" style={vars({ '--i': i })}><b>{x}</b><Ico n={asset.icon} size={13} /><em>{y}</em></div>)}</div>
  else inner = <div className="nt bell"><span className="bl"><Ico n={asset.icon} size={26} /><i>3</i></span>{txt}</div>
  return <div className="body"><div className={`nw nw${a}`}>{inner}</div></div>
}

/* ───────────── Badges ───────────── */
function Badges({ a, asset }: { a: number; asset: Asset }) {
  let inner: ReactNode
  const tag = ['DIAMOND II', 'LEVEL 24', 'EVENT WINNER', 'VERIFIED', '+250 XP', 'KING', 'MYTHIC', '7 DAY STREAK', 'BUILDER', 'LEGENDARY'][a]
  if (a === 0) inner = <div className="shield"><span className="shine" /><Ico n={asset.icon} size={30} /></div>
  else if (a === 1) inner = <div className="hexw"><i className="orbit"><b /></i><div className="hex"><Ico n={asset.icon} size={16} /><strong>24</strong></div></div>
  else if (a === 2) inner = <div className="sw"><div className="rbn"><i /><i /></div><div className="med"><Ico n={asset.icon} size={26} /></div></div>
  else if (a === 3) inner = <div className="ver"><i className="pr" /><i className="pr p2" /><div><Ico n={asset.icon} size={30} /></div><Ico n="Sparkle" size={10} fill /></div>
  else if (a === 4) inner = <div className="pill"><i className="fl" /><span className="st"><Ico n={asset.icon} size={16} fill /></span><b>+250 XP</b></div>
  else if (a === 5) inner = <div className="crown"><Ico n={asset.icon} size={42} fill />{range(3).map(i => <Ico key={i} n="Sparkle" size={10} fill />)}<span className="ped" /></div>
  else if (a === 6) inner = <div className="gem"><Ico n={asset.icon} size={46} />{range(3).map(i => <Ico key={i} n="Sparkle" size={11} fill />)}</div>
  else if (a === 7) inner = <div className="flame"><i className="glow" /><Ico n={asset.icon} size={46} fill /></div>
  else if (a === 8) inner = <div className="rate"><span className="top"><Ico n={asset.icon} size={20} /></span><div>{range(5).map(i => <i key={i} style={vars({ '--i': i })}><Ico n="Star" size={18} fill /></i>)}</div></div>
  else inner = <div className="stk"><span className="shine" /><Ico n={asset.icon} size={14} />{asset.variant < 10 ? 'LEGENDARY' : 'FOUNDER'}</div>
  return <div className="body"><div className={`bd bd${a}`}>{inner}{a !== 9 && a !== 4 && <small>{tag}</small>}</div></div>
}

/* ───────────── Progress bars ───────────── */
function Progress({ a, asset }: { a: number; asset: Asset }) {
  let inner: ReactNode
  if (a === 0) inner = <div className="hb"><span className="hi"><Ico n={asset.icon} size={20} fill /></span><div className="col"><div className="trk"><i className="dmg" /><i className="fl" /></div><small>84 / 100</small></div></div>
  else if (a === 1) inner = <div className="xb"><span className="lv"><Ico n={asset.icon} size={13} fill />LV 24</span><div className="trk"><i className="fl" /></div><small>62%</small></div>
  else if (a === 2) inner = <div className="ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" className="rtrk" /><circle cx="50" cy="50" r="40" className="arc" /></svg><span><Ico n={asset.icon} size={22} /><b>76%</b></span></div>
  else if (a === 3) inner = <div className="seg"><div className="cells">{range(10).map(i => <i key={i} style={vars({ '--i': i })} />)}</div><small><Ico n={asset.icon} size={12} /> CHARGING</small></div>
  else if (a === 4) inner = <div className="dl"><span className="di"><Ico n={asset.icon} size={18} /></span><div className="col"><div className="trk"><i className="fl" /></div><small>DOWNLOADING · 62%</small></div></div>
  else if (a === 5) inner = <div className="tank"><span className="ti"><Ico n={asset.icon} size={18} /></span><div className="tube"><div className="liq"><svg viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0Z" /></svg><i /></div></div></div>
  else if (a === 6) inner = <div className="boss"><div className="bn"><Ico n={asset.icon} size={14} fill /> VOIDLORD KRAZ</div><div className="trk"><i className="dmg" /><i className="fl" /><i className="ticks" /></div></div>
  else if (a === 7) inner = <div className="sp"><small>STAMINA</small><div className="trk"><i className="fl"><b><Ico n={asset.icon} size={13} fill /></b></i></div></div>
  else if (a === 8) inner = <div className="abil"><div className="ab"><Ico n={asset.icon} size={26} /><i className="cool" /><i className="rdy" /></div><small>COOLDOWN</small></div>
  else inner = <div className="vt"><span className="top"><Ico n={asset.icon} size={18} /></span><div className="tube"><i className="fl" />{range(4).map(i => <u key={i} style={vars({ '--i': i })} />)}</div><small>CHARGE</small></div>
  return <div className="body"><div className={`pb pb${a}`}>{inner}</div></div>
}

/* ───────────── Toggles ───────────── */
function Toggles({ a, asset }: { a: number; asset: Asset }) {
  const on = asset.icon === 'SunMoon' ? 'Sun' : asset.icon
  const off = asset.icon === 'SunMoon' ? 'Moon' : offIcons[asset.icon] || asset.icon
  const state = <span className="state"><u>OFF</u><u>ON</u></span>
  let inner: ReactNode
  if (a === 0) inner = <div className="tr"><i className="sky" /><i className="kn"><span className="o"><Ico n={on} size={18} /></span><span className="p"><Ico n={off} size={18} /></span></i></div>
  else if (a === 1) inner = <div className="pwr"><i className="halo" /><div className="pbtn"><Ico n={asset.icon} size={26} /></div><i className="led" /></div>
  else if (a === 2) inner = <div className="snd"><span className="ic"><span className="o"><Ico n={on} size={20} /></span><span className="p"><Ico n={off} size={20} /></span></span><div className="eq">{range(5).map(i => <i key={i} style={vars({ '--i': i })} />)}</div></div>
  else if (a === 3) inner = <div className="cbx"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9" /></svg></div>
  else if (a === 4) inner = <div className="lk"><div className="bs">{range(8).map(i => <i key={i} style={vars({ '--r': `${i * 45}deg` })} />)}</div><span className="o"><Ico n={on} size={34} /></span><span className="p"><Ico n={off} size={34} /></span></div>
  else if (a === 5) inner = <div className="lck"><i className="sh" /><div><Ico n="KeyRound" size={16} /></div></div>
  else if (a === 6) inner = <div className="sg"><i className="th" />{['Gamepad2', 'Swords', 'Eye'].map(n => <span key={n}><Ico n={n} size={18} /></span>)}</div>
  else if (a === 7) inner = <div className="stf"><div className="rs">{range(6).map(i => <i key={i} style={vars({ '--r': `${i * 60}deg` })} />)}</div><span className="o"><Ico n={on} size={38} fill /></span><span className="p"><Ico n={off} size={38} /></span><Ico n="Sparkle" size={10} fill /><Ico n="Sparkle" size={9} fill /></div>
  else if (a === 8) inner = <div className="bel"><span className="o"><Ico n={on} size={34} /></span><span className="p"><Ico n={off} size={34} /></span><i className="dot" /></div>
  else inner = <div className="wf"><i className="pr" /><i className="pr p2" /><span className="o"><Ico n={on} size={32} /></span><span className="p"><Ico n={off} size={32} /></span></div>
  return <div className="body"><div className={`tg tg${a}`}>{inner}{state}</div></div>
}

/* ───────────── Transitions ───────────── */
function Transitions({ a, asset }: { a: number; asset: Asset }) {
  const sa = <div className="sc a"><Ico n="House" size={26} /><b>LOBBY</b></div>
  const sb = <div className="sc b"><Ico n="Gamepad2" size={26} /><b>ARENA</b></div>
  let inner: ReactNode
  if (a === 0) inner = <>{sa}{sb}<span className="stamp"><Ico n={asset.icon} size={30} fill /></span></>
  else if (a === 1) inner = <>{sa}{sb}<i className="door dl" /><i className="door dr" /></>
  else if (a === 2) inner = <>{sa}{sb}<div className="blocks">{range(24).map(i => <i key={i} style={vars({ '--dl': `${rnd(i, 9) * 0.45}s` })} />)}</div></>
  else if (a === 3) inner = <div className="pushw">{sa}{sb}</div>
  else if (a === 4) inner = <>{sa}{sb}<i className="iris" /></>
  else if (a === 5) inner = <>{sa}{sb}<i className="warp" /></>
  else if (a === 6) inner = <>{sa}{sb}</>
  else if (a === 7) inner = <>{sb}<div className="slats">{range(6).map(i => <i key={i} style={vars({ '--i': i })} />)}</div></>
  else if (a === 8) inner = <>{sb}<div className="pg"><div className="front"><Ico n="House" size={26} /><b>LOBBY</b></div><div className="back" /></div></>
  else inner = <div className="flips">{range(6).map(i => <i key={i} className="ft" style={vars({ '--dl': `${(a === 9 && asset.variant > 9 ? (i + Math.floor(i / 3)) % 2 : i % 3) * 0.12}s` })}><span className="fa"><Ico n="House" size={14} /></span><span className="fb"><Ico n="Gamepad2" size={14} /></span></i>)}</div>
  return <div className="body"><div className={`scr scr${a}`}>{inner}</div></div>
}

const bodies = [Buttons, Backgrounds, Loaders, Cards, Panels, Notifications, Badges, Progress, Toggles, Transitions]
const prefixes = ['b', 'g', 'l', 'c', 'p', 'n', 'd', 'r', 't', 'x']

export function Preview({
  asset,
  large = false,
  customHue,
  customIcon,
  customLabel,
  customSpeed,
}: {
  asset: Asset
  large?: boolean
  customHue?: number
  customIcon?: string
  customLabel?: string
  customSpeed?: number
}) {
  const [run, setRun] = useState(0)
  const [live, setLive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), { rootMargin: '80px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const effHue = customHue !== undefined ? customHue : (asset.customHue !== undefined ? asset.customHue : asset.hue)
  const effIcon = customIcon || asset.customIcon || asset.icon
  const effLabel = customLabel || asset.customLabel
  const effSpeed = customSpeed !== undefined ? customSpeed : (asset.customSpeed !== undefined ? asset.customSpeed : 1)

  const effectiveAsset: Asset = {
    ...asset,
    hue: effHue,
    icon: effIcon,
    customLabel: effLabel,
    customSpeed: effSpeed,
  }

  const Body = bodies[asset.categoryIndex]
  return <div ref={ref} className={`preview ${large ? 'large' : ''}`} onClick={() => setRun(run + 1)} style={vars({ '--h': effHue, '--v': asset.variant })}>
    <div key={run} className={`fx fxc-${prefixes[asset.categoryIndex]} fx-${prefixes[asset.categoryIndex]}${asset.archetype} ${large ? 'lg' : ''} ${live ? 'live' : ''}`} data-s={asset.style} style={effSpeed !== 1 ? vars({ animationDuration: `${effSpeed * 2}s` }) : undefined}><Body a={asset.archetype} asset={effectiveAsset} /></div>
    <span className="preview-hint">Click to replay</span>
  </div>
}
