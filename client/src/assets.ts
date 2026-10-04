export const categories = ['Buttons', 'Backgrounds', 'Loaders', 'Cards', 'Panels', 'Notifications', 'Badges', 'Progress bars', 'Toggles', 'Transitions']

// name | tagline | lucide icon  — index = variant (0-19); archetype = variant % 10
const catalog: string[][] = [
  ['Crimson Sweep|A silky light sweep on every loop.|Zap', 'Neon Pulse|A heartbeat of glowing rings.|Power', 'Ripple Burst|Click energy spreading outward.|MousePointerClick', 'Hover Drift|Floats on a cushion of shadow.|Rocket', 'Prism Border|A rainbow edge that never rests.|Sparkles', 'Jelly Press|Squishy, springy, satisfying.|Gamepad2', 'Glitch Play|RGB split with digital static.|Play', 'Fill Rush|Color floods in from the left.|Swords', 'Launch Pad|The icon blasts off and returns.|Send', 'Arcade Key|A chunky 3D key that clicks down.|Joystick',
    'Gold Rush|A warm shine across a golden call to action.|Coins', 'Heartbeat Like|Thumps like a living thing.|Heart', 'Shock Ripple|Fiery rings on contact.|Flame', 'Cloud Lift|A soft, weightless bobbing button.|Cloud', 'Aurora Edge|Shifting northern-light outline.|WandSparkles', 'Gummy Buy|A bouncy shop button.|ShoppingCart', 'Static Join|A glitchy join-server button.|Users', 'Slide Unlock|A shutter of color sweeps across.|LockOpen', 'Paper Plane|Send with a satisfying swoosh.|SendHorizontal', 'Keycap Gold|Tactile, clicky, golden.|Crown'],
  ['Aurora Drift|Soft blobs of color drifting.|Sparkles', 'Grid Runner|A neon floor racing toward you.|Grid3x3', 'Star Field|Twinkling stars with slow parallax.|Star', 'Ember Rise|Warm sparks lifting off.|Flame', 'Deep Waves|Layered tides rolling past.|Waves', 'Code Rain|Falling streaks of light.|Binary', 'Sun Rays|Rotating beams from a bright core.|Sun', 'Bubble Bloom|Glowing orbs floating upward.|Droplets', 'Radar Sweep|A scanning beam over a dot grid.|Radar', 'Candy Stripes|Diagonal ribbons in motion.|Candy',
    'Nebula Swirl|Cosmic clouds slowly spiraling.|Orbit', 'Synth Horizon|Retro sunset over a moving grid.|Sunset', 'Cosmic Dust|Fine dust twinkling in deep space.|Sparkle', 'Firefly Forest|Tiny lights blinking in the dark.|TreePine', 'Ocean Swell|Bright water sliding sideways.|Anchor', 'Data Stream|Lines of light streaming past.|Database', 'Solar Flare|Pulsing rays with a warm glow.|SunMedium', 'Soda Pop|Fizzing bubbles in neon.|GlassWater', 'Pulse Scanner|Concentric sweeps from the center.|ScanLine', 'Pastel Ribbon|Gentle stripes drifting slowly.|Rainbow'],
  ['Orbit Spinner|Satellites circling a core.|Atom', 'Twin Rings|Counter-rotating rings.|Loader', 'Bounce Trio|Three dots bouncing in rhythm.|CircleDot', 'Sonar Pulse|Rings expanding outward.|Wifi', 'Equalizer|Bars dancing to the beat.|Music', 'Shape Shifter|A square morphing as it turns.|Shapes', 'Dash Ring|A stroke chasing its own tail.|RefreshCw', 'Comet Trail|A glowing comet with a tail.|Telescope', 'Tile Wave|A grid of tiles rippling.|LayoutGrid', 'Cube Flip|Tiles flipping over in sequence.|Box',
    'Planet Orbit|A moon swinging round a planet.|Globe', 'Gear Duo|Gears turning in opposite directions.|Settings', 'Hop Dots|Dots hopping on a spring.|Footprints', 'Radar Ping|Soft pings from a signal.|Radio', 'Wave Bars|A rolling wave of bars.|AudioLines', 'Morph Blob|A blob changing shape.|Hexagon', 'Dual Arc|Two arcs chasing each other.|Hourglass', 'Spark Trail|Sparkles orbiting a star.|Sparkle', 'Block Ripple|Squares rising and falling.|Blocks', 'Card Shuffle|Cards flipping in order.|Layers'],
  ['Mirror Flip|Flips over to reveal its back.|Gift', 'Tilt Glare|Leans toward you with a shine.|Sword', 'Fan Deck|Cards fan out one by one.|Spade', 'Glow Frame|A bright border circling the card.|Gem', 'Floating Icon|A hero icon bobbing above.|Backpack', 'Slide Reveal|Details slide up on a loop.|Map', 'Holo Foil|A rainbow foil sheen.|Award', 'Glass Orbit|Frosted glass over moving color.|Shield', 'Loot Burst|Rays spin behind the prize.|Trophy', 'Corner Peel|A folding corner reveals more.|Ticket',
    'Pet Egg|Flips over to reveal what hatched.|Egg', 'Potion Brew|A tilting card with a bubbling shine.|FlaskConical', 'Skin Locker|A fan of outfits to choose from.|Shirt', 'Quest Scroll|A glowing frame around the quest.|ScrollText', 'Treasure Crate|A crate bobbing above its card.|Package', 'Map Pin|Details slide up over the map.|MapPin', 'Gem Vault|A foil gem card with a rainbow sheen.|Diamond', 'Glass Disc|Frosted glass over spinning color.|Disc3', 'Mythic Pull|Rays spin behind a mythic pull.|Crown', 'Blueprint|A folding corner on the plan.|Ruler'],
  ['Inventory Grid|Slots pop in one by one.|Backpack', 'Stat Board|Bars growing to their values.|ChartColumn', 'Player Profile|An avatar with a spinning halo.|UserRound', 'Settings Deck|Sliders gliding to new values.|SlidersHorizontal', 'Item Shop|Wares glowing in turn.|Store', 'Leaderboard|Ranks sliding into place.|Medal', 'Quest Log|Tasks ticking themselves off.|ListChecks', 'Chat Window|Messages arriving with typing dots.|MessageCircle', 'Mini Map|A radar sweep with moving pings.|Compass', 'Skill Hotbar|Cooldown sweeps across ability slots.|Crosshair',
    'Pet Roster|Pets bouncing into their slots.|PawPrint', 'Match Summary|Score bars tallying up.|Flag', 'Clan Hall|Members around a glowing halo.|Castle', 'Audio Mixer|Sliders gliding to new levels.|Volume2', 'Daily Rewards|Prizes glowing one after another.|CalendarCheck', 'Server List|Ranks and pings sliding in.|Server', 'Daily Tasks|Chores ticking themselves off.|ListChecks', 'Team Chat|Messages arriving with typing dots.|MessagesSquare', 'World Map|A radar sweep over the world.|Globe', 'Gear Hotbar|Cooldown sweeps across gear slots.|Axe'],
  ['Slide Toast|Slides in from the edge.|BellRing', 'Trophy Banner|An achievement with a golden burst.|Trophy', 'Level Up|A ribbon stretching open.|ChevronsUp', 'Coin Reward|Coins floating up from a pickup.|Coins', 'Friend Request|An avatar with pulsing accept.|UserPlus', 'Warning Shake|A nervous, shaking alert.|TriangleAlert', 'Loot Drop|A rare drop popping in.|PackageOpen', 'Chat Bubble|A bubble pops with typing dots.|MessageSquare', 'Kill Feed|Entries sliding down the feed.|Crosshair', 'Bell Count|A bell ringing with a counter.|Bell',
    'Quest Complete|Slides in with a quest-complete check.|CircleCheck', 'Gift Banner|A celebratory banner with a burst.|Gift', 'Rank Up|A ribbon stretching to a new rank.|Medal', 'Gem Reward|Gems popping from a pickup.|Gem', 'Party Invite|A friend asking you to team up.|Users', 'Boss Alert|A pulsing, shaking siren alert.|Siren', 'Power-Up Drop|A power-up popping in with sparkles.|Zap', 'Whisper|A private message pops in.|Mail', 'Event Feed|Event lines sliding down the feed.|Info', 'Alarm Bell|A bell ringing with a counter.|AlarmClock'],
  ['Rank Shield|A shield with a sweeping glint.|ShieldCheck', 'Level Hex|A hexagon with an orbiting spark.|Hexagon', 'Medal Swing|A medal swaying on its ribbon.|Medal', 'Verified Pulse|A check that pulses softly.|BadgeCheck', 'XP Pill|A fill sliding in beside a star.|Star', 'Crown Float|A crown bobbing with sparkles.|Crown', 'Gem Spin|A gem turning with glints.|Gem', 'Streak Flame|A flame flickering alive.|Flame', 'Star Rating|Stars lighting up in sequence.|Star', 'Rarity Sticker|A shimmering rarity tag.|Tag',
    'Rank Crest|A crest with a sweeping glint.|Swords', 'Staff Seal|A spinning ring around a seal.|Stamp', 'Event Medal|A medal swinging on its ribbon.|Award', 'Trusted Seal|A seal that pulses softly.|ShieldCheck', 'Speed Pill|A timer pill with a sliding fill.|Timer', 'Royal Heart|A heart floating with sparkles.|Heart', 'Skull Gem|A skull turning with glints.|Skull', 'Ghost Flame|A flickering ghost light.|Ghost', 'Builder Rating|Stars lighting up for the builder.|Wrench', 'Founder Sticker|A shimmering founder tag.|Rocket'],
  ['Health Bar|A heart-driven bar with a damage trail.|Heart', 'XP Stripes|Moving stripes in the fill.|Star', 'Ring Gauge|A circular gauge filling.|Gauge', 'Segment Charge|Cells lighting up one at a time.|BatteryCharging', 'Download Run|A fill with a falling arrow.|Download', 'Mana Wave|Liquid waves inside a bar.|Droplet', 'Boss Bar|A menacing bar draining in steps.|Skull', 'Stamina Dash|A bright gradient with a bolt.|Zap', 'Cooldown Radial|A radial sweep on an ability.|Timer', 'Loot Charge|A vertical meter filling to the top.|Package',
    'Shield Bar|A bar with a metallic damage trail.|Shield', 'Hunger Meter|Stripes crawling through the fill.|Drumstick', 'Fuel Gauge|A circular fuel gauge.|Rocket', 'Oxygen Cells|Air cells lighting one by one.|Wind', 'Upload Run|An upload with a rising arrow.|Upload', 'Potion Tank|A tank filling with liquid.|FlaskConical', 'Raid Boss|A big boss bar draining in hits.|Swords', 'Sprint Bar|A bright bar with a glowing head.|Wind', 'Dash Ready|A radial cooldown that flashes ready.|Sparkles', 'Crystal Charge|A gem filling from the bottom.|Gem'],
  ['Sun Moon|Day to night in a flip.|SunMoon', 'Power Latch|A button latching on and off.|Power', 'Sound Waves|Speaker waves appearing.|Volume2', 'Check Draw|A box drawing its own check.|SquareCheck', 'Heart Like|A like with a burst.|Heart', 'Lock Switch|A shackle opening and closing.|Lock', 'Mode Slider|A selector sliding between modes.|Gamepad2', 'Star Fave|A star popping on.|Star', 'Bell Mute|A bell that rings then mutes.|BellOff', 'Wifi Link|Signal connecting and dropping.|Wifi',
    'Eye Toggle|An eye opening and closing.|Eye', 'Lamp Latch|A latching button with a glowing bulb.|Lightbulb', 'Mic Live|A mic with live meter bars.|Mic', 'Quest Check|A box that ticks itself.|CircleCheck', 'Music Like|A note bursting out on toggle.|Music2', 'Vault Lock|A shackle opening and closing.|KeyRound', 'Mode Select|A thumb sliding between modes.|Gamepad2', 'Fire Fave|A flame popping on with sparkles.|Flame', 'Shield Guard|Guard mode ringing on.|ShieldHalf', 'Rocket Link|A rocket link powering up.|Rocket'],
  ['Circle Wipe|A circle growing to reveal.|Circle', 'Curtain Doors|Doors parting from the center.|DoorOpen', 'Pixel Dissolve|Blocks dissolving into the next scene.|Grid2x2', 'Slide Push|One scene pushing another out.|MoveRight', 'Iris Close|An iris closing then opening.|Aperture', 'Zoom Portal|Zooming through a portal.|Orbit', 'Diagonal Swipe|A slanted swipe across.|Slash', 'Venetian Blinds|Slats turning to reveal.|Blinds', 'Page Turn|A page folding over.|BookOpen', 'Tile Flip|Tiles flipping to the new scene.|LayoutGrid',
    'Heart Wipe|A heart expanding to cover.|Heart', 'Elevator Doors|Doors closing then opening.|ArrowUpDown', 'Mosaic Shift|Mosaic blocks swapping scenes.|Grid2x2', 'Vertical Push|One scene pushing another up.|MoveUp', 'Spotlight|A spotlight widening on the scene.|Flashlight', 'Warp Zoom|Zooming deeper through a portal.|Zap', 'Reverse Swipe|A slanted swipe from the right.|MoveLeft', 'Roller Blinds|Slats turning to reveal.|PanelTop', 'Book Flip|A page folding the other way.|BookOpen', 'Checker Flip|Tiles flipping in a checker pattern.|Grid3x3'],
]

export const buttonLabels = ['POWER UP', 'ACTIVATE', 'CLICK ME', 'LAUNCH', 'EXPLORE', 'PLAY', 'JOIN GAME', 'FIGHT', 'SEND', 'START', 'CLAIM GOLD', 'LIKE', 'IGNITE', 'RELAX', 'DISCOVER', 'BUY NOW', 'JOIN SERVER', 'UNLOCK', 'SEND IT', 'CONTINUE']

export type CustomConfig = {
  customHue?: number
  customIcon?: string
  customLabel?: string
  customSpeed?: number
}

export type Asset = {
  id: number
  name: string
  slug: string
  category: string
  categoryIndex: number
  variant: number
  archetype: number
  style: number
  icon: string
  hue: number
  description: string
  customHue?: number
  customIcon?: string
  customLabel?: string
  customSpeed?: number
}

export const iconToGlyph: Record<string, string> = {
  Zap: '⚡', Star: '★', Heart: '♥', Sun: '☀', Sparkles: '✦', Sparkle: '✦',
  Swords: '⚔', Sword: '⚔', Music: '♪', Check: '✔', Cloud: '☁', Flag: '⚑',
  Flower: '✿', Skull: '☠', Settings: '⚙', Send: '✈', Flame: '🔥', Crown: '👑',
  Shield: '🛡', Trophy: '🏆', Coins: '🪙', Key: '🔑', Gem: '💎', Bell: '🔔',
  Rocket: '🚀', Lock: '🔒', Target: '🎯', Eye: '👁', Gamepad2: '🎮', Play: '▶',
  RefreshCw: '🔄', Compass: '🧭', Sliders: '🎚'
}

export const assets: Asset[] = Array.from({ length: 200 }, (_, index) => {
  const categoryIndex = index % 10
  const variant = Math.floor(index / 10)
  const [name, description, icon] = catalog[categoryIndex][variant].split('|')
  return { id: index + 1, name, slug: `${String(index + 1).padStart(3, '0')}-${name.toLowerCase().replaceAll(' ', '-')}`, category: categories[categoryIndex], categoryIndex, variant, archetype: variant % 10, style: Math.floor(variant / 10), icon, hue: (variant * 47 + categoryIndex * 31) % 360, description }
})

const glyphs = ['⚡', '★', '♥', '☀', '✦', '⚔', '♪', '✔', '☁', '⚑', '✿', '☠', '⚙', '✈', '☘', '♛', '✉', '☎', '⌛', '❖']

const prelude = (asset: Asset, custom?: CustomConfig) => {
  const h = custom?.customHue !== undefined ? custom.customHue : (asset.customHue !== undefined ? asset.customHue : asset.hue)
  const iconName = custom?.customIcon || asset.customIcon || asset.icon
  const glyph = iconToGlyph[iconName] || glyphs[asset.variant] || "⚡"
  const lbl = custom?.customLabel || asset.customLabel || asset.name.toUpperCase()
  const spd = custom?.customSpeed !== undefined ? custom.customSpeed : (asset.customSpeed !== undefined ? asset.customSpeed : 1)
  return `-- BLOXFX / ${asset.name}  (${asset.category})
-- ${asset.description}
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(${(h / 360).toFixed(4)}, 0.78, 0.95)
local accent2 = Color3.fromHSV(${(((h + 40) % 360) / 360).toFixed(4)}, 0.7, 1)
local dark = Color3.fromHSV(${(h / 360).toFixed(4)}, 0.55, 0.16)
local glyph = "${glyph}" -- text glyph: ${iconName}
local title = "${lbl.replaceAll('"', '\\"')}"
local subtitle = "${asset.description.replaceAll('"', '\\"')}"
local speed = ${spd} -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_${asset.id}")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_${asset.id}"
gui.ResetOnSpawn = false
gui.IgnoreGuiInset = true
gui.Parent = playerGui

local function make(class, props, parent)
	local object = Instance.new(class)
	for key, value in pairs(props) do object[key] = value end
	object.Parent = parent
	return object
end
local function round(parent, radius) return make("UICorner", {CornerRadius = UDim.new(0, radius)}, parent) end
local function loop(object, props, time, style, reverses)
	local info = TweenInfo.new(time * speed, style or Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, reverses ~= false)
	local tween = TweenService:Create(object, info, props)
	tween:Play()
	return tween
end
local function text(parent, props)
	props.BackgroundTransparency = 1
	props.Font = props.Font or Enum.Font.GothamBold
	props.TextColor3 = props.TextColor3 or Color3.new(1, 1, 1)
	return make("TextLabel", props, parent)
end
local function center(size)
	return {AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0.5), Size = size}
end
`
}

// Each builder creates category-specific objects, then exposes: root, icon, shine (a clipped sweep frame), scale (UIScale), gradient, stroke.
const builders: ((a: Asset) => string)[] = [
  () => `-- BUTTON
local root = make("TextButton", center(UDim2.fromOffset(280, 76)), gui)
root.Text = ""
root.AutoButtonColor = false
root.ClipsDescendants = true
root.BackgroundColor3 = accent
round(root, ${'${radius}'})
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 90}, root)
local stroke = make("UIStroke", {Color = accent2, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.25, 1.6), Position = UDim2.fromScale(-0.4, -0.3), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.7, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = text(root, {Text = glyph, TextSize = 30, Size = UDim2.fromOffset(44, 44), Position = UDim2.new(0, 22, 0.5, -22), ZIndex = 3})
local label = text(root, {Text = "${'${LABEL}'}", TextSize = 22, Size = UDim2.new(1, -90, 1, 0), Position = UDim2.fromOffset(72, 0), TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 3})
root.MouseEnter:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1.06}):Play() end)
root.MouseLeave:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1}):Play() end)
root.Activated:Connect(function() TweenService:Create(scale, TweenInfo.new(0.12, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 0.92}):Play() task.wait(0.12) TweenService:Create(scale, TweenInfo.new(0.2, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1.06}):Play() end)`,
  () => `-- BACKGROUND (full screen)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = dark, BorderSizePixel = 0, ClipsDescendants = true, Active = false}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 60, Transparency = NumberSequence.new(0, 0.55)}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.5), Position = UDim2.fromScale(-0.4, -0.2), Rotation = 20, BackgroundColor3 = accent2, BackgroundTransparency = 0.82, BorderSizePixel = 0}, root)
local icon = text(root, center(UDim2.fromOffset(120, 120)))
icon.Text = glyph
icon.TextSize = 96
icon.TextTransparency = 0.25
local random = Random.new(${'${seed}'})
for index = 1, 22 do
	local size = random:NextInteger(6, 22)
	local dot = text(root, {Text = random:NextInteger(1, 3) == 1 and glyph or "", Size = UDim2.fromOffset(size, size), Position = UDim2.fromScale(random:NextNumber(), 1.05), BackgroundTransparency = 0.5, BackgroundColor3 = accent2, TextSize = size, TextColor3 = accent2})
	round(dot, size)
	local duration = random:NextNumber(4, 9)
	task.spawn(function()
		task.wait(random:NextNumber(0, duration))
		while gui.Parent do
			dot.Position = UDim2.fromScale(random:NextNumber(), 1.05)
			dot.BackgroundTransparency = 0.5
			local tween = TweenService:Create(dot, TweenInfo.new(duration * speed, Enum.EasingStyle.Sine), {Position = dot.Position - UDim2.fromScale(random:NextNumber(-0.1, 0.1), 1.2), BackgroundTransparency = 1})
			tween:Play()
			tween.Completed:Wait()
		end
	end)
end`,
  () => `-- LOADER
local root = make("Frame", {Size = UDim2.fromOffset(150, 150), BackgroundColor3 = dark, ClipsDescendants = false}, gui)
root.AnchorPoint = Vector2.new(0.5, 0.5)
root.Position = UDim2.fromScale(0.5, 0.5)
round(root, 75)
local stroke = make("UIStroke", {Color = accent, Thickness = 6, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Transparency = NumberSequence.new({NumberSequenceKeypoint.new(0, 0), NumberSequenceKeypoint.new(0.45, 0), NumberSequenceKeypoint.new(0.55, 1), NumberSequenceKeypoint.new(1, 1)})}, stroke)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundTransparency = 1}, root)
local icon = text(root, {Text = glyph, TextSize = 52, Size = UDim2.fromScale(1, 1), TextColor3 = accent2})
local orbit = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundTransparency = 1}, root)
for index = 1, 3 do
	local dot = make("Frame", {Size = UDim2.fromOffset(12, 12), AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0), BackgroundColor3 = accent2}, orbit)
	round(dot, 6)
	orbit.Rotation = 0
end
text(gui, {Text = "LOADING", TextSize = 14, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 100), Size = UDim2.fromOffset(200, 24), TextColor3 = accent2})
local spin = TweenService:Create(orbit, TweenInfo.new(1.4 * speed, Enum.EasingStyle.Linear, Enum.EasingDirection.In, -1), {Rotation = 360})
spin:Play()`,
  () => `-- CARD
local root = make("Frame", center(UDim2.fromOffset(240, 320)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 20)
local stroke = make("UIStroke", {Color = accent, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 70, Transparency = NumberSequence.new(0.35, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.6), Position = UDim2.fromScale(-0.4, -0.3), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.8, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = text(root, {Text = glyph, TextSize = 90, Size = UDim2.new(1, 0, 0, 140), Position = UDim2.fromOffset(0, 36), TextColor3 = accent2})
text(root, {Text = title, TextSize = 22, Size = UDim2.new(1, -30, 0, 30), Position = UDim2.fromOffset(15, 190)})
text(root, {Text = subtitle, TextSize = 14, TextWrapped = true, Font = Enum.Font.Gotham, TextTransparency = 0.25, Size = UDim2.new(1, -40, 0, 60), Position = UDim2.fromOffset(20, 224), TextYAlignment = Enum.TextYAlignment.Top})`,
  () => `-- PANEL
local root = make("Frame", center(UDim2.fromOffset(420, 280)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 16)
local stroke = make("UIStroke", {Color = accent, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 90, Transparency = NumberSequence.new(0, 0.7)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.2, 1.6), Position = UDim2.fromScale(-0.4, -0.3), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.85, BorderSizePixel = 0, ZIndex = 5}, root)
local icon = text(root, {Text = glyph, TextSize = 28, Size = UDim2.fromOffset(40, 40), Position = UDim2.fromOffset(16, 12), TextColor3 = accent2})
text(root, {Text = title, TextSize = 20, Size = UDim2.new(1, -70, 0, 40), Position = UDim2.fromOffset(62, 12), TextXAlignment = Enum.TextXAlignment.Left})
local slots = {}
for index = 0, 7 do
	local slot = make("Frame", {Size = UDim2.fromOffset(88, 88), Position = UDim2.fromOffset(16 + (index % 4) * 100, 66 + math.floor(index / 4) * 100), BackgroundColor3 = accent, BackgroundTransparency = 0.7}, root)
	round(slot, 12)
	local mark = text(slot, {Text = glyph, TextSize = 34, Size = UDim2.fromScale(1, 1)})
	local pop = make("UIScale", {Scale = 0}, mark)
	slots[index + 1] = pop
end
task.spawn(function()
	while gui.Parent do
		for _, pop in ipairs(slots) do
			TweenService:Create(pop, TweenInfo.new(0.35, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1}):Play()
			task.wait(0.12 * speed)
		end
		task.wait(1.5 * speed)
		for _, pop in ipairs(slots) do TweenService:Create(pop, TweenInfo.new(0.25), {Scale = 0}):Play() end
		task.wait(0.6 * speed)
	end
end)`,
  () => `-- NOTIFICATION (slides in, waits, slides out)
local root = make("Frame", {AnchorPoint = Vector2.new(0.5, 0), Size = UDim2.fromOffset(360, 84), Position = UDim2.new(0.5, 0, 0, -120), BackgroundColor3 = dark, ClipsDescendants = true}, gui)
round(root, 16)
local stroke = make("UIStroke", {Color = accent, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 0, Transparency = NumberSequence.new(0.45, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.15, 2), Position = UDim2.fromScale(-0.3, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.75, BorderSizePixel = 0, ZIndex = 3}, root)
local icon = text(root, {Text = glyph, TextSize = 38, Size = UDim2.fromOffset(60, 60), Position = UDim2.fromOffset(14, 12), TextColor3 = accent2})
text(root, {Text = title, TextSize = 18, Size = UDim2.new(1, -90, 0, 28), Position = UDim2.fromOffset(78, 14), TextXAlignment = Enum.TextXAlignment.Left})
text(root, {Text = subtitle, TextSize = 12, Font = Enum.Font.Gotham, TextTransparency = 0.3, TextWrapped = true, Size = UDim2.new(1, -90, 0, 34), Position = UDim2.fromOffset(78, 40), TextXAlignment = Enum.TextXAlignment.Left, TextYAlignment = Enum.TextYAlignment.Top})
local timer = make("Frame", {Size = UDim2.new(1, 0, 0, 4), Position = UDim2.new(0, 0, 1, -4), BackgroundColor3 = accent2, BorderSizePixel = 0}, root)
task.spawn(function()
	while gui.Parent do
		root.Position = UDim2.new(0.5, 0, 0, -120)
		timer.Size = UDim2.new(1, 0, 0, 4)
		TweenService:Create(root, TweenInfo.new(0.6 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = UDim2.new(0.5, 0, 0, 24)}):Play()
		TweenService:Create(timer, TweenInfo.new(3 * speed, Enum.EasingStyle.Linear), {Size = UDim2.new(0, 0, 0, 4)}):Play()
		task.wait(3.2 * speed)
		TweenService:Create(root, TweenInfo.new(0.4 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Position = UDim2.new(0.5, 0, 0, -120)}):Play()
		task.wait(1.6 * speed)
	end
end)`,
  () => `-- BADGE
local root = make("Frame", center(UDim2.fromOffset(150, 150)), gui)
root.BackgroundColor3 = accent
root.ClipsDescendants = true
round(root, ${'${radius}'})
local stroke = make("UIStroke", {Color = accent2, Thickness = 4, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 90}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.25, 2), Position = UDim2.fromScale(-0.4, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.6, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = text(root, {Text = glyph, TextSize = 70, Size = UDim2.fromScale(1, 1), ZIndex = 4})
text(gui, {Text = title, TextSize = 14, Size = UDim2.fromOffset(240, 24), AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 96), TextColor3 = accent2})`,
  () => `-- PROGRESS BAR
local root = make("Frame", center(UDim2.fromOffset(420, 40)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 20)
local stroke = make("UIStroke", {Color = accent, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local fill = make("Frame", {Size = UDim2.fromScale(0.1, 1), BackgroundColor3 = accent, BorderSizePixel = 0}, root)
round(fill, 20)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, accent2), Rotation = 0}, fill)
local shine = make("Frame", {Size = UDim2.fromScale(0.15, 2), Position = UDim2.fromScale(-0.3, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.7, BorderSizePixel = 0, ZIndex = 3}, root)
local icon = text(gui, {Text = glyph, TextSize = 36, AnchorPoint = Vector2.new(1, 0.5), Position = UDim2.new(0.5, -226, 0.5, 0), Size = UDim2.fromOffset(44, 44), TextColor3 = accent2})
text(root, {Text = title, TextSize = 14, Size = UDim2.fromScale(1, 1), ZIndex = 4})
loop(fill, {Size = UDim2.fromScale(1, 1)}, 2.4, Enum.EasingStyle.Quad, true)`,
  () => `-- TOGGLE (click to flip; also auto-flips so you can preview it)
local root = make("TextButton", center(UDim2.fromOffset(150, 76)), gui)
root.Text = ""
root.AutoButtonColor = false
root.BackgroundColor3 = dark
round(root, 38)
local stroke = make("UIStroke", {Color = accent, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 0, Transparency = NumberSequence.new(0, 0.85)}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.2, 2), Position = UDim2.fromScale(-0.4, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.8, BorderSizePixel = 0}, root)
local knob = make("Frame", {Size = UDim2.fromOffset(60, 60), Position = UDim2.fromOffset(8, 8), BackgroundColor3 = Color3.new(1, 1, 1)}, root)
round(knob, 30)
local icon = text(knob, {Text = glyph, TextSize = 30, Size = UDim2.fromScale(1, 1), TextColor3 = dark})
local on = false
local function set(state)
	on = state
	TweenService:Create(knob, TweenInfo.new(0.35 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = on and UDim2.fromOffset(82, 8) or UDim2.fromOffset(8, 8)}):Play()
	TweenService:Create(root, TweenInfo.new(0.3 * speed), {BackgroundColor3 = on and accent or dark}):Play()
	TweenService:Create(icon, TweenInfo.new(0.3 * speed), {Rotation = on and 360 or 0}):Play()
end
root.Activated:Connect(function() set(not on) end)
task.spawn(function() while gui.Parent do task.wait(2.2 * speed) set(not on) end end)`,
  () => `-- TRANSITION (covers the screen, swaps scene, reveals)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = accent, BorderSizePixel = 0, ClipsDescendants = true, ZIndex = 10, Position = UDim2.fromScale(-1, 0)}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 45}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.1, 1.5), Position = UDim2.fromScale(0.9, -0.2), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.6, BorderSizePixel = 0}, root)
local icon = text(root, center(UDim2.fromOffset(160, 160)))
icon.Text = glyph
icon.TextSize = 120
icon.ZIndex = 11
text(root, {Text = title, TextSize = 26, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 90), Size = UDim2.fromOffset(400, 40), ZIndex = 11})
task.spawn(function()
	while gui.Parent do
		root.Position = UDim2.fromScale(-1, 0)
		TweenService:Create(root, TweenInfo.new(0.7 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.Out), {Position = UDim2.fromScale(0, 0)}):Play()
		task.wait(2 * speed)
		TweenService:Create(root, TweenInfo.new(0.7 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.In), {Position = UDim2.fromScale(1, 0)}):Play()
		task.wait(2.2 * speed)
	end
end)`,
]

// Looping motion chosen by archetype. Uses the objects exposed by every builder.
const motions = [
  'loop(shine, {Position = UDim2.fromScale(1.3, -0.3)}, 1.4, Enum.EasingStyle.Quad, false)',
  'loop(scale, {Scale = 1.07}, 0.9)\nloop(stroke, {Thickness = 6, Transparency = 0.6}, 0.9)',
  'TweenService:Create(icon, TweenInfo.new(2.4 * speed, Enum.EasingStyle.Linear, Enum.EasingDirection.In, -1), {Rotation = 360}):Play()',
  'loop(root, {Position = root.Position - UDim2.fromOffset(0, 10)}, 1.1)\nloop(icon, {Rotation = 8}, 1.1)',
  'TweenService:Create(gradient, TweenInfo.new(3 * speed, Enum.EasingStyle.Linear, Enum.EasingDirection.In, -1), {Rotation = gradient.Rotation + 360}):Play()',
  'task.spawn(function()\n\twhile gui.Parent do\n\t\tTweenService:Create(scale, TweenInfo.new(0.5 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Scale = 0.88}):Play()\n\t\ttask.wait(0.5 * speed)\n\t\tTweenService:Create(scale, TweenInfo.new(0.8 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Scale = 1}):Play()\n\t\ttask.wait(1.6 * speed)\n\tend\nend)',
  'task.spawn(function()\n\twhile gui.Parent do\n\t\tfor step = 1, 8 do\n\t\t\ticon.Position = icon.Position + UDim2.fromOffset(step % 2 == 0 and 4 or -4, 0)\n\t\t\ticon.Rotation = step % 2 == 0 and 6 or -6\n\t\t\ttask.wait(0.04)\n\t\tend\n\t\ticon.Rotation = 0\n\t\ttask.wait(1.8 * speed)\n\tend\nend)',
  'loop(shine, {Size = UDim2.fromScale(1.4, 1.6), BackgroundTransparency = 0.85}, 1.3, Enum.EasingStyle.Quad, true)',
  'loop(icon, {Position = icon.Position + UDim2.fromOffset(0, -10), TextTransparency = 0.4, Rotation = 15}, 0.8, Enum.EasingStyle.Quad)',
  'loop(root, {BackgroundColor3 = accent2}, 1.4)\nloop(scale, {Scale = 1.03}, 0.7)',
]

export function scriptFor(asset: Asset, custom?: CustomConfig) {
  const c = asset.categoryIndex
  const radius = c === 6 ? (asset.style ? 75 : 28) : asset.style ? 38 : 14
  const label = custom?.customLabel || asset.customLabel || buttonLabels[asset.variant]
  const body = builders[c](asset)
    .replace('${radius}', String(radius))
    .replace('${LABEL}', label)
    .replace('${seed}', String(asset.id * 17))
  const motion = asset.archetype === 3 && [1, 5, 9].includes(c) ? 'loop(icon, {Rotation = 10}, 1.1)' : motions[asset.archetype]
  return `${prelude(asset, custom)}
${body}

-- MOTION
${motion}
`
}
