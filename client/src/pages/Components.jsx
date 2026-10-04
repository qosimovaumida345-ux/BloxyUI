import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Sparkles, Box, Layout, Bell, Shield, Sliders, Layers } from 'lucide-react';

const COMPONENTS_CATALOG = [
  {
    id: 1,
    name: '3D Cartoony Button',
    category: 'Actions',
    type: 'Button',
    desc: 'Extruded dual-layer button with 4px border, shine sparkle, and physics squish on click.',
    luauCode: `local BloxyUI = require(ReplicatedStorage.BloxyUI)
local shopBtn = BloxyUI.CreateButton({
    Text = "SHOP",
    Icon = "rbxassetid://10709000000",
    Theme = "Cartoony",
    Size = "Large",
    OnClick = function() print("Shop Clicked!") end
})`,
    preview: (
      <div className="relative group cursor-pointer active:translate-y-1 select-none">
        <div className="absolute inset-0 bg-[#8b0000] rounded-xl translate-y-2"></div>
        <button className="relative z-10 px-6 py-2.5 bg-gradient-to-b from-[#ff7675] to-[#d63031] border-2 border-white rounded-xl font-black text-white text-base shadow-md flex items-center gap-2">
          <span>SHOP</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </button>
      </div>
    )
  },
  {
    id: 2,
    name: 'Modal Dialog Window',
    category: 'Overlay',
    type: 'Modal',
    desc: 'Pop-in animated game modal with header, blurred backdrop, close cross, and action buttons.',
    luauCode: `local modal = BloxyUI.CreateModal({
    Title = "INVENTORY",
    Size = UDim2.new(0, 500, 0, 360),
    Theme = "Cartoony",
    OnClose = function() print("Modal closed") end
})`,
    preview: (
      <div className="w-56 bg-[#1a1a3e] border-2 border-white/60 rounded-xl p-3 shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-700 pb-1.5 mb-2">
          <span className="font-bold text-xs text-white">REWARDS</span>
          <span className="text-[10px] text-gray-400">✕</span>
        </div>
        <div className="h-10 bg-gray-900/50 rounded flex items-center justify-center text-[11px] text-gray-400 mb-2">
          Modal Content
        </div>
        <div className="flex gap-1.5">
          <button className="flex-1 py-1 bg-gray-700 text-white rounded text-[10px] font-bold">CLOSE</button>
          <button className="flex-1 py-1 bg-[#ff7675] text-white rounded text-[10px] font-bold">CLAIM</button>
        </div>
      </div>
    )
  },
  {
    id: 3,
    name: 'Loot & Item Card',
    category: 'Layout',
    type: 'Card',
    desc: 'Interactive item card with rarity tier, hover lift, 3D border, and equip action button.',
    luauCode: `local card = BloxyUI.CreateCard({
    Title = "Flame Sword",
    Rarity = "Legendary",
    Icon = "rbxassetid://10709000049",
    Theme = "Cartoony"
})`,
    preview: (
      <div className="w-44 bg-[#1a1a3e] border-2 border-yellow-400 rounded-xl p-3 shadow-md hover:-translate-y-1 transition-transform">
        <div className="flex items-center justify-between mb-1">
          <span className="font-extrabold text-xs text-white">Flame Sword</span>
          <span className="text-[9px] text-yellow-300 font-mono">LEGENDARY</span>
        </div>
        <div className="h-12 bg-red-950/40 rounded-lg flex items-center justify-center text-xl mb-2">
          ⚔️
        </div>
        <button className="w-full py-1 bg-yellow-500 text-black font-extrabold rounded-lg text-[10px]">
          EQUIP
        </button>
      </div>
    )
  },
  {
    id: 4,
    name: 'Game TopBar HUD',
    category: 'Layout',
    type: 'TopBar',
    desc: 'HUD header featuring animated Coin & Gem counters, level progression, and avatar image.',
    luauCode: `local topBar = BloxyUI.CreateTopBar({
    Coins = 15000,
    Gems = 250,
    Level = 42,
    Theme = "CyberNeon"
})`,
    preview: (
      <div className="w-64 bg-[#12122a] border border-[var(--border-color)] rounded-xl p-2 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg">
          <span className="text-yellow-400 text-xs">🪙</span>
          <span className="text-xs font-bold font-mono text-yellow-300">14.5K</span>
        </div>
        <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg">
          <span className="text-cyan-400 text-xs">💎</span>
          <span className="text-xs font-bold font-mono text-cyan-300">350</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-[10px] font-bold">
          42
        </div>
      </div>
    )
  },
  {
    id: 5,
    name: 'Side Navigation Drawer',
    category: 'Navigation',
    type: 'SideMenu',
    desc: 'Slide-in menu bar with animated icons, active item highlight, and sub-panels.',
    luauCode: `local sideMenu = BloxyUI.CreateSideMenu({
    Items = {"Inventory", "Pets", "Shop", "Settings", "Quests"},
    Theme = "Cartoony"
})`,
    preview: (
      <div className="w-40 bg-[#12122a] border border-[var(--border-color)] rounded-xl p-2 space-y-1 shadow-md">
        <div className="px-2 py-1 bg-[var(--accent-primary)] text-white rounded-lg text-xs font-bold flex items-center gap-2">
          <span>🎒</span> <span>Inventory</span>
        </div>
        <div className="px-2 py-1 hover:bg-gray-800 text-gray-400 rounded-lg text-xs flex items-center gap-2">
          <span>🐾</span> <span>Pets</span>
        </div>
        <div className="px-2 py-1 hover:bg-gray-800 text-gray-400 rounded-lg text-xs flex items-center gap-2">
          <span>🛒</span> <span>Shop</span>
        </div>
      </div>
    )
  },
  {
    id: 6,
    name: 'Toast Notification',
    category: 'Feedback',
    type: 'Notification',
    desc: 'Screen corner pop-up with auto-dismiss progress bar and success / error / alert sound.',
    luauCode: `BloxyUI.CreateNotification({
    Title = "Achievement Unlocked!",
    Message = "Master Trader badge earned",
    Type = "Success",
    Duration = 3
})`,
    preview: (
      <div className="w-56 bg-[#1a1a3e] border border-green-500 rounded-xl p-2.5 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-green-400 text-xs font-bold">✓</span>
          <span className="text-xs font-extrabold text-white">Level Up!</span>
        </div>
        <p className="text-[10px] text-gray-300">You reached Level 25!</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500"></div>
      </div>
    )
  },
  {
    id: 7,
    name: 'Health / XP Progress Bar',
    category: 'Feedback',
    type: 'ProgressBar',
    desc: 'Smooth animated gradient progress fill bar with striped pattern and percentage label.',
    luauCode: `local hpBar = BloxyUI.CreateProgressBar({
    Current = 85,
    Max = 100,
    Variant = "Gradient",
    Color = Color3.fromRGB(0, 200, 100)
})`,
    preview: (
      <div className="w-52">
        <div className="flex justify-between text-[11px] font-bold text-gray-300 mb-1">
          <span>HP: 850/1000</span>
          <span className="text-green-400 font-mono">85%</span>
        </div>
        <div className="w-full h-4 bg-gray-900 rounded-full border border-gray-700 p-0.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full w-[85%] shadow-sm"></div>
        </div>
      </div>
    )
  },
  {
    id: 8,
    name: 'Badge / Pill Tag',
    category: 'Data',
    type: 'Badge',
    desc: 'Compact rounded status pills for VIP indicators, discounts, or rank indicators.',
    luauCode: `local badge = BloxyUI.CreateBadge({
    Text = "50% OFF",
    Color = Color3.fromRGB(255, 100, 50)
})`,
    preview: (
      <div className="flex gap-2">
        <span className="px-3 py-1 bg-red-500 text-white font-black text-[11px] rounded-full shadow">50% OFF</span>
        <span className="px-3 py-1 bg-yellow-400 text-black font-black text-[11px] rounded-full shadow">VIP</span>
        <span className="px-3 py-1 bg-purple-600 text-white font-black text-[11px] rounded-full shadow">NEW</span>
      </div>
    )
  },
  {
    id: 9,
    name: 'Animated Toggle Switch',
    category: 'Forms',
    type: 'Toggle',
    desc: 'Silky smooth sliding physics switch for game settings (SFX, Music, Shadows).',
    luauCode: `local toggle = BloxyUI.CreateToggle({
    Label = "Music",
    Default = true,
    OnChanged = function(state) print("Toggled:", state) end
})`,
    preview: (
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-white">Music BGM</span>
        <div className="w-11 h-6 bg-[var(--accent-primary)] rounded-full p-0.5 cursor-pointer relative shadow-inner">
          <div className="w-5 h-5 bg-white rounded-full ml-auto shadow"></div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    name: 'Styled Input Field',
    category: 'Forms',
    type: 'Input',
    desc: 'Text input with glowing focus border, placeholder text, and clear button.',
    luauCode: `local input = BloxyUI.CreateInput({
    Placeholder = "Enter Redeem Code...",
    Theme = "CyberNeon"
})`,
    preview: (
      <div className="w-48 bg-gray-900 border-2 border-[var(--accent-primary)] rounded-xl px-3 py-2 flex items-center justify-between text-xs text-white glow-purple">
        <span className="text-gray-400">PROMO2026</span>
        <span className="text-gray-500 cursor-pointer">✕</span>
      </div>
    )
  },
  {
    id: 11,
    name: 'Dropdown Selection Menu',
    category: 'Forms',
    type: 'Dropdown',
    desc: 'Expandable option select box with smooth unfold animation and selection highlight.',
    luauCode: `local dropdown = BloxyUI.CreateDropdown({
    Options = {"Low Graphics", "Medium Graphics", "Ultra Graphics"},
    Default = "Ultra Graphics"
})`,
    preview: (
      <div className="w-48 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 flex items-center justify-between text-xs text-white">
        <span>Server Region: US</span>
        <span className="text-gray-400 text-[10px]">▼</span>
      </div>
    )
  },
  {
    id: 12,
    name: 'Tabs Segmented Navigation',
    category: 'Layout',
    type: 'Tabs',
    desc: 'Horizontal navigation switcher with animated sliding indicator bar.',
    luauCode: `local tabs = BloxyUI.CreateTabs({
    Tabs = {"Weapons", "Armor", "Potions", "Skins"},
    Theme = "Cartoony"
})`,
    preview: (
      <div className="w-60 bg-gray-900/80 p-1 rounded-xl flex gap-1 border border-gray-800">
        <div className="flex-1 py-1 text-center bg-[var(--accent-primary)] text-white text-[10px] font-bold rounded-lg shadow">Weapons</div>
        <div className="flex-1 py-1 text-center text-gray-400 text-[10px] font-bold">Armor</div>
        <div className="flex-1 py-1 text-center text-gray-400 text-[10px] font-bold">Potions</div>
      </div>
    )
  }
];

function Components() {
  const [copiedId, setCopiedId] = useState(null);

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-[var(--accent-primary)] text-white text-xs font-bold rounded-full">
            12+ PRODUCTION COMPONENTS
          </span>
          <span className="text-xs text-[var(--text-secondary)]">Complete Game UI Kit</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Roblox Component Suite</h1>
        <p className="text-[var(--text-secondary)] mt-1 max-w-2xl">
          BloxyUI is not just buttons! It is a complete design system for Roblox games — modals, cards, HUD topbars, notifications, progress bars, dropdowns, inputs, and tabs.
        </p>
      </div>

      {/* Visual Constructor Integration Banner */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 border border-red-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex-shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-black text-white">All Components Unified in Visual Constructor!</h4>
            <p className="text-xs text-gray-300">
              Panels, Health & XP Bars, Buttons, Loot Cards, and Toasts are all now fully interactive with live physics, 16 palettes, and Luau generation.
            </p>
          </div>
        </div>
        <Link 
          to="/builder" 
          className="px-5 py-2.5 bg-gradient-to-r from-[var(--accent-primary)] to-[#ff7675] hover:opacity-90 text-white rounded-xl text-xs font-black transition-all whitespace-nowrap shadow-md hover:scale-105"
        >
          Open Visual Constructor →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPONENTS_CATALOG.map(comp => (
          <div key={comp.id} className="glass rounded-2xl border border-[var(--border-color)] overflow-hidden flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all">
            {/* Live Visual Showcase Stage */}
            <div className="h-44 bg-[#12122a] flex items-center justify-center p-6 border-b border-[var(--border-color)] relative">
              <div className="absolute top-2.5 left-3 text-[10px] text-[var(--accent-secondary)] font-mono uppercase">
                {comp.category}
              </div>
              {comp.preview}
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-[var(--bg-card)]">
              <div>
                <h3 className="font-extrabold text-lg text-white mb-1">{comp.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{comp.desc}</p>
              </div>

              <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400">Luau Component</span>
                <button
                  onClick={() => copyCode(comp.luauCode, comp.id)}
                  className="px-3 py-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                >
                  {copiedId === comp.id ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === comp.id ? 'Copied' : 'Copy Luau'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Components;
