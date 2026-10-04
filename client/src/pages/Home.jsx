import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Layers, Box, Code2, ArrowRight, Wand2, Terminal, ShieldCheck, Copy, Check } from 'lucide-react';

const SPARKLE_LOCATIONS = [
  { left: '8%', top: '19%', size: 10, delay: '0s' },
  { left: '32%', top: '11%', size: 7, delay: '0.17s' },
  { left: '87%', top: '18%', size: 10, delay: '0.34s' },
  { left: '91%', top: '63%', size: 8, delay: '0.51s' },
  { left: '68%', top: '81%', size: 7, delay: '0.68s' },
  { left: '9%', top: '74%', size: 6, delay: '0.85s' },
  { left: '40%', top: '78%', size: 6, delay: '1.02s' }
];

function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isShining, setIsShining] = useState(false);
  const [copied, setCopied] = useState(false);

  const triggerShine = () => {
    setIsShining(true);
    setTimeout(() => setIsShining(false), 550);
  };

  const copyMasterCode = () => {
    const code = `-- [BloxyUI] Master Market Stall Button (Zero Broken Texture Dependencies)
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local buttonPosition = UDim2.fromScale(0.5, 0.5)

local function create(className, properties, parent)
    local instance = Instance.new(className)
    for p, v in pairs(properties) do instance[p] = v end
    instance.Parent = parent
    return instance
end

local function corner(parent, radius)
    create("UICorner", { CornerRadius = UDim.new(0, radius) }, parent)
end

local screen = create("ScreenGui", { Name = "MarketShopButton", ResetOnSpawn = false }, Players.LocalPlayer:WaitForChild("PlayerGui"))
local holder = create("Frame", { AnchorPoint = Vector2.new(0.5, 0.5), Position = buttonPosition, Size = UDim2.fromOffset(272, 90), BackgroundTransparency = 1 }, screen)
local scale = create("UIScale", { Scale = 1 }, holder)
local shadow = create("Frame", { Position = UDim2.fromOffset(0, 7), Size = UDim2.fromScale(1, 1), BackgroundColor3 = Color3.fromRGB(154, 20, 40), BorderSizePixel = 0 }, holder)
corner(shadow, 17)

local button = create("TextButton", { Size = UDim2.fromScale(1, 1), Text = "", BackgroundColor3 = Color3.new(1, 1, 1), BorderSizePixel = 0, AutoButtonColor = false, ClipsDescendants = true }, holder)
corner(button, 17)
create("UIStroke", { ApplyStrokeMode = Enum.ApplyStrokeMode.Border, Color = Color3.fromRGB(255, 149, 142), Thickness = 3 }, button)
create("UIGradient", { Rotation = 90, Color = ColorSequence.new(Color3.fromRGB(255, 87, 94), Color3.fromRGB(230, 34, 57)) }, button)

-- Procedural Stall Icon
local icon = create("Frame", { Position = UDim2.fromOffset(46, 21), Size = UDim2.fromOffset(49, 48), BackgroundTransparency = 1, ZIndex = 3 }, button)
local white = Color3.new(1, 1, 1)
local function part(parent, pos, sz, col) return create("Frame", { Position = pos, Size = sz, BackgroundColor3 = col, BorderSizePixel = 0, ZIndex = 4 }, parent) end
part(icon, UDim2.fromOffset(6, 1), UDim2.fromOffset(37, 6), white)
part(icon, UDim2.fromOffset(1, 7), UDim2.fromOffset(47, 7), white)
for s = 0, 4 do
    local aw = part(icon, UDim2.fromOffset(1 + s * 9, 14), UDim2.fromOffset(9, 10), s % 2 == 0 and white or Color3.fromRGB(228, 44, 64))
    corner(aw, 3)
end
part(icon, UDim2.fromOffset(5, 24), UDim2.fromOffset(4, 19), white)
part(icon, UDim2.fromOffset(40, 24), UDim2.fromOffset(4, 19), white)
corner(part(icon, UDim2.fromOffset(2, 38), UDim2.fromOffset(45, 10), white), 2)

-- Dual Layer Beveled Text
local function text(pos, col, z) return create("TextLabel", { BackgroundTransparency = 1, Position = pos, Size = UDim2.fromOffset(130, 90), Text = "SHOP", TextColor3 = col, TextSize = 32, Font = Enum.Font.GothamBlack, ZIndex = z }, button) end
text(UDim2.fromOffset(110, 3), Color3.fromRGB(169, 24, 44), 4)
text(UDim2.fromOffset(110, 0), white, 5)

-- 7 Sparkles
local locations = {{0.08, 0.19, 10}, {0.32, 0.11, 7}, {0.87, 0.18, 10}, {0.91, 0.63, 8}, {0.68, 0.81, 7}, {0.09, 0.74, 6}, {0.40, 0.78, 6}}
for idx, loc in ipairs(locations) do
    local sp = create("Frame", { BackgroundTransparency = 1, Position = UDim2.fromScale(loc[1], loc[2]), Size = UDim2.fromOffset(loc[3], loc[3]), ZIndex = 2 }, button)
    local sc = create("UIScale", { Scale = 0.45 }, sp)
    local v = part(sp, UDim2.fromScale(0.4, 0), UDim2.fromScale(0.2, 1), white)
    local h = part(sp, UDim2.fromScale(0, 0.4), UDim2.fromScale(1, 0.2), white)
    local c = part(sp, UDim2.fromScale(0.25, 0.25), UDim2.fromScale(0.5, 0.5), white)
    c.Rotation = 45
    for _, seg in ipairs({v, h, c}) do
        seg.BackgroundTransparency = 0.65
        TweenService:Create(seg, TweenInfo.new(1.3, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true, idx * 0.17), { BackgroundTransparency = 0.05 }):Play()
    end
    TweenService:Create(sc, TweenInfo.new(1.3, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true, idx * 0.17), { Scale = 1 }):Play()
end

-- Shine Bar
local shine = part(button, UDim2.fromScale(-0.4, -0.5), UDim2.fromOffset(40, 180), white)
shine.Rotation = 20
shine.BackgroundTransparency = 0.87
local function sweepShine()
    shine.Position = UDim2.fromScale(-0.4, -0.5)
    TweenService:Create(shine, TweenInfo.new(0.55, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), { Position = UDim2.fromScale(1.4, -0.5) }):Play()
end

-- Physics
local hovering = false
local function resize(v) TweenService:Create(scale, TweenInfo.new(0.15), { Scale = v }):Play() end
button.MouseEnter:Connect(function() hovering = true; resize(1.045) end)
button.MouseLeave:Connect(function() hovering = false; resize(1) end)
button.MouseButton1Down:Connect(function() resize(0.98); sweepShine() end)
button.MouseButton1Up:Connect(function() resize(hovering and 1.045 or 1); sweepShine() end)
`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      {/* Hero Section */}
      <section className="text-center py-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] mb-6 text-xs font-mono uppercase tracking-wider text-[var(--accent-secondary)]">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
          <span>520+ Icons • 200 BloxFX Assets • Zero Asset Dependencies</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tight text-white">
          <span>Pixel-Perfect</span>{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff7675] via-[#fdcb6e] to-[#6c5ce7]">
            Roblox Game UI
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
          High-performance, procedural vector Roblox interfaces. 200 standalone BloxFX effects, 520+ vector icons, multi-layer 3D depth, specular shine sweeps, and spring physics.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/bloxfx" className="px-8 py-4 bg-gradient-to-r from-[var(--accent-primary)] to-[#ff7675] hover:opacity-95 text-white rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2">
            <span>Explore 200 BloxFX Effects</span> <Sparkles className="w-5 h-5 text-yellow-300" />
          </Link>
          <Link to="/builder" className="px-8 py-4 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-gray-400 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2">
            <span>Visual Builder</span> <Wand2 className="w-5 h-5" />
          </Link>
          <Link to="/icons" className="px-8 py-4 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-gray-400 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2">
            <span>520+ Icons</span> <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Live Interactive Button Masterpiece */}
      <section className="my-10 w-full max-w-3xl">
        <div className="glass rounded-3xl p-8 sm:p-12 border border-[var(--border-color)] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#ff7675] rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[var(--accent-primary)] rounded-full blur-[100px] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-secondary)] mb-2 font-bold">
              Interactive Live Simulation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-8 text-white">Hover & Click to Experience Tactile Physics</h2>
            
            {/* The Canvas Stage */}
            <div className="p-14 bg-[#0d0d1a] rounded-2xl border border-[var(--border-color)] flex items-center justify-center w-full shadow-inner select-none relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Exact Procedural Button */}
              <div 
                className="relative cursor-pointer transition-all animate-bounce"
                style={{ animationDuration: '3.5s' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
                onMouseDown={() => { setIsPressed(true); triggerShine(); }}
                onMouseUp={() => { setIsPressed(false); triggerShine(); }}
              >
                {/* 3D Depth Shadow (+7px) */}
                <div className="absolute inset-0 bg-[#9a1428] rounded-[18px] translate-y-[7px]"></div>

                {/* Top Surface */}
                <div 
                  className="relative z-10 w-[272px] h-[90px] rounded-[18px] overflow-hidden flex items-center px-6 bg-gradient-to-b from-[#ff575e] to-[#e62239] transition-transform duration-150 shadow-md"
                  style={{
                    border: '3px solid #ff958e',
                    transform: isPressed ? 'scale(0.98)' : isHovered ? 'scale(1.045)' : 'scale(1)'
                  }}
                >
                  {/* Procedural Market Stall Icon */}
                  <div className="relative z-20 flex-shrink-0 mr-4">
                    <div className="w-12 h-11 relative flex flex-col items-center">
                      <div className="w-9 h-1.5 bg-white rounded-t-sm"></div>
                      <div className="w-11 h-1.5 bg-white"></div>
                      <div className="w-11 h-3 flex overflow-hidden rounded-b-sm">
                        {[0, 1, 2, 3, 4].map(s => (
                          <div key={s} className="flex-1 h-full" style={{ backgroundColor: s % 2 === 0 ? '#ffffff' : '#e42c40' }}></div>
                        ))}
                      </div>
                      <div className="w-9 flex justify-between h-4">
                        <div className="w-1 h-full bg-white"></div>
                        <div className="w-1 h-full bg-white"></div>
                      </div>
                      <div className="w-11 h-2.5 bg-white rounded-sm"></div>
                    </div>
                  </div>

                  {/* Dual-Layered Beveled 3D Text */}
                  <div className="relative z-20 flex-1">
                    <span className="absolute font-black text-3xl font-sans tracking-wide translate-y-[3px] text-[#a9182c]">
                      SHOP
                    </span>
                    <span className="relative font-black text-3xl font-sans tracking-wide text-white">
                      SHOP
                    </span>
                  </div>

                  {/* 7 Animated Glint Sparkles */}
                  {SPARKLE_LOCATIONS.map((loc, i) => (
                    <div 
                      key={i}
                      className="absolute pointer-events-none z-10 flex items-center justify-center animate-pulse"
                      style={{
                        left: loc.left,
                        top: loc.top,
                        width: loc.size,
                        height: loc.size,
                        animationDelay: loc.delay,
                        animationDuration: '1.3s'
                      }}
                    >
                      <div className="w-[20%] h-full bg-white absolute"></div>
                      <div className="w-full h-[20%] bg-white absolute"></div>
                      <div className="w-[50%] h-[50%] bg-white rotate-45 absolute"></div>
                    </div>
                  ))}

                  {/* Specular Shine Reflection Bar */}
                  <div 
                    className={`
                      absolute pointer-events-none w-10 h-48 bg-white/30 rotate-[20deg] -top-10
                      transition-all duration-500 ease-out z-15
                      ${isShining ? 'translate-x-[320px]' : '-translate-x-32'}
                    `}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <button 
                onClick={copyMasterCode}
                className="px-6 py-2.5 bg-[var(--bg-secondary)] hover:bg-white hover:text-black border border-[var(--border-color)] text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 shadow"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied Master Luau Script!' : 'Copy Master Luau Script (Figma-to-Roblox)'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto my-12 w-full">
        <div className="glass p-7 rounded-2xl border border-[var(--border-color)]">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
            <Box className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Zero Texture Dependencies</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Icons are assembled procedurally with Roblox GuiObjects. No moderation delays, no HTTP timeouts, and zero broken Asset IDs.
          </p>
        </div>

        <div className="glass p-7 rounded-2xl border border-[var(--border-color)]">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Micro-Physics & Shine</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Specular shine sweeps on button down, staggered Sine sparkle pulses, and cancellation-safe UIScale bounce curves.
          </p>
        </div>

        <div className="glass p-7 rounded-2xl border border-[var(--border-color)]">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">AI MCP Engine</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Connects seamlessly to Claude, Antigravity, and ChatGPT. Generates production-ready Luau screens instantly without prompting struggles.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
