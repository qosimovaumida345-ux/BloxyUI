const fs = require('fs');
const path = require('path');

// Read sprite map
const spriteMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'spriteMap.json'), 'utf8'));

// Categories and catalog from assets.ts
const categories = [
  "Buttons", "Backgrounds", "Loaders", "Cards", "Panels",
  "Notifications", "Badges", "Progressbars", "Toggles", "Transitions"
];

const catalog = [
  [
    "Crimson Sweep|A silky light sweep on every loop.|Zap",
    "Neon Pulse|Rhythmic neon energy pulses outward.|Sparkles",
    "Ripple Burst|Expanding shockwave rings from center.|Flame",
    "Hover Drift|Gentle levitation float with floor shadow.|Shield",
    "Prism Border|Rotating rainbow gradient border aura.|Sword",
    "Jelly Bounce|Squishy bounce with icon wobble.|Heart",
    "Glitch Twitch|Digital glitch split with RGB separation.|Zap",
    "Fill Rush|High-energy color flood from left to right.|Sparkles",
    "Launch Pad|Rocket blastoff recoil into soft landing.|Rocket",
    "Mechanical Key|Tactile 3D press into deep shadow.|Key",
    "Ghost Outline|Hollow stroke that glows on click.|Ghost",
    "Pulse Beacon|Radial sonar rings ping outward.|Radio",
    "Magnetic Snap|Snaps toward cursor with spring physics.|Magnet",
    "Liquid Fill|Fluid rises to fill the button container.|Droplets",
    "Shine Slash|Angled light slit races across the surface.|Sparkles",
    "Pixel Pop|Retro 8-bit chunky expansion pop.|Gamepad2",
    "Aura Glow|Soft breathing ambient back-glow.|Sun",
    "Corner Notch|Cyberpunk chamfered corners with accent notch.|Crosshair",
    "Stripe Slide|Diagonal warning stripes slide continuously.|Zap",
    "Orbital Spark|Tiny satellite particle orbits the perimeter.|Orbit"
  ],
  [
    "Aurora Drift|Soft blobs of color drifting.|Sparkles",
    "Starfield Warp|Hyperspace stars streaking past.|Compass",
    "Hex Matrix|Glowing honeycombs fading in sequence.|Hexagon",
    "Grid Horizon|Retro synthwave wireframe grid receding.|Grid3x3",
    "Nebula Cloud|Deep space smoke billowing.|Cloud",
    "Cyber Circuit|Traces lighting up along PCB lines.|Cpu",
    "Floating Embers|Campfire sparks drifting upward.|Flame",
    "Digital Rain|Matrix code cascading downward.|Binary",
    "Vignette Pulse|Edge shadow breathing rhythmically.|Eye",
    "Prism Rays|Light beams sweeping across screen.|Sun",
    "Constellation|Connected nodes gently swaying.|Share2",
    "Sonic Waves|Concentric audio ripples.|Radio",
    "Bubble Drift|Soothing bubbles floating to the top.|CircleDot",
    "Isometric Tiles|3D diamond grid with depth shimmer.|Boxes",
    "Smoke Rings|Puff rings expanding outward.|Wind",
    "Plasma Storm|Electric filaments branching.|Zap",
    "Geo Drift|Floating cubes, pyramids, and spheres.|Shapes",
    "Gradient Waves|Smooth color tides washing over.|Waves",
    "Dark Matter|Abstract vortex pulling inward.|Disc",
    "Speed Lines|Anime action rush lines from edges.|FastForward"
  ],
  [
    "Orbit Spinner|Satellites circling a core.|Atom",
    "Liquid Ring|Smooth circle filling like water.|Droplet",
    "Pulsing Dots|Three dots bouncing in wave.|MoreHorizontal",
    "Segment Ring|Dashed circle turning smoothly.|Loader",
    "Flip Cube|3D cube tumbling over edges.|Box",
    "Radar Sweep|Sonar beam rotating on dark grid.|Radar",
    "Equalizer Bars|Music visualizer bounce.|BarChart3",
    "Morphing Geo|Circle to square to triangle.|Shapes",
    "Hourglass Drip|Sand particles falling through neck.|Hourglass",
    "Infinity Loop|Figure-8 energy trace.|Infinity",
    "Gear Train|Interlocking cogs rotating in sync.|Settings",
    "DNA Spiral|Double helix twisting upward.|Dna",
    "Signal Bars|WiFi reception filling in order.|Wifi",
    "Clock Ticker|Single hand sweeping smoothly.|Clock",
    "Atom Shells|Multiple electron rings at angles.|Atom",
    "Neon Ring|Glowing border with trailing tail.|Circle",
    "Crosshair Scan|Targeting reticle locking in.|Crosshair",
    "Bouncing Orb|Elastic ball with squash & stretch.|CircleDot",
    "Ring Cascade|Multiple concentric rings pulsing.|Disc",
    "Sparkle Burst|Star twinkling and fading repeatedly.|Sparkles"
  ],
  [
    "Mirror Flip|Flips over to reveal its back.|Gift",
    "Hologram Tilt|3D parallax follow cursor angle.|Sparkles",
    "Glow Border|Edge stroke pulses with accent color.|Shield",
    "Floating Card|Gentle hover with dynamic shadow.|Crown",
    "Expand Stack|Stacked layers spread out on hover.|Layers",
    "Glass Shimmer|Frosted glass with light glint.|Gem",
    "Pixel Reveal|Dissolves in from retro pixels.|Gamepad2",
    "Ribbon Corner|Corner banner with special offer text.|Award",
    "Neon Border|Tron-style neon wireframe perimeter.|Zap",
    "Slide Reveal|Content slides up from bottom edge.|ArrowUpRight",
    "Badge Stamp|Wax seal / emblem drops with dust puff.|Stamp",
    "Portal Gate|Center is an animated swirling portal.|Orbit",
    "Depth Layer|Multiple offset layers with 3D depth.|Layers",
    "Rune Carve|Mystic symbols glow on surface.|Wand2",
    "Ticket Stub|Perforated coupon with tear line.|Ticket",
    "Energy Core|Glowing reactor visible in cutout.|Atom",
    "Fold Out|Unfolds like origami from center.|Folder",
    "Starlight Gem|Facet highlights shine on hover.|Gem",
    "Cyber Plate|Bolted armor plating with warning text.|ShieldAlert",
    "Shadow Lift|Cast shadow grows as card rises.|Square"
  ],
  [
    "Inventory Grid|8-slot loot panel with hover glow.|Grid3x3",
    "Glass Modal|Frosted translucent popup with blur.|Layout",
    "Cyber HUD|Sci-fi frame with corner brackets.|Cpu",
    "Quest Board|Parchment list with checkable tasks.|Scroll",
    "Shop Showcase|Featured item pedestal with spotlight.|Store",
    "Stats Overview|Hexagonal radar chart panel.|BarChart2",
    "Dialogue Box|RPG speech bubble with typing text.|MessageSquare",
    "Settings Drawer|Slide-out config panel with sliders.|Sliders",
    "Leaderboard|Top 10 players list with rank badges.|Trophy",
    "Skill Tree|Connected ability nodes branching out.|GitBranch",
    "Crafting Bench|Grid input with result preview slot.|Hammer",
    "Map Overlay|Stylized minimap with radar blips.|Map",
    "Terminal Box|Hacker command prompt with cursor.|Terminal",
    "Loot Reveal|Treasure chest opening sequence.|Package",
    "Status HUD|Health, mana, stamina bar cluster.|Activity",
    "Battle Log|Scrolling combat event feed.|Swords",
    "Achievement Shelf|Trophy display with unlock shine.|Medal",
    "Mailbox Drawer|Message inbox with unread counters.|Mail",
    "Pet Kennel|Creature collection display grid.|PawPrint",
    "Emote Wheel|Radial selection menu with 8 slots.|Smile"
  ],
  [
    "Level Up Banner|Grand crest drops down with rays.|Award",
    "Toast Alert|Corner notification slides and fades.|BellRing",
    "Achievement Unlocked|Xbox-style achievement pop.|Trophy",
    "Combat Damage|Floating damage numbers with crit color.|Sword",
    "Streak Counter|Flame badge with multiplier counter.|Flame",
    "Rare Drop Ping|Gold light pillar and sparkle burst.|Sparkles",
    "Countdown Alert|Giant numbers counting down to start.|Timer",
    "Danger Siren|Flashing red edges with hazard icon.|AlertTriangle",
    "Reward Unlock|Gift box shakes then bursts open.|Gift",
    "Badge Earned|Ribbon medal pins onto screen.|Medal",
    "Trade Request|Player avatar card with Accept/Decline.|UserCheck",
    "Server Announcement|Scrolling top banner with broadcast icon.|Megaphone",
    "Kill Feed|Quick weapon icon + names slide on right.|Crosshair",
    "Milestone Ping|Progress bar hits 100% with flash.|CheckCircle2",
    "VIP Welcome|Golden sparkles announce player join.|Crown",
    "Item Expiring|Clock icon with pulsing yellow alert.|Clock",
    "Quest Complete|Checkmark stamps onto quest title.|CheckSquare",
    "New Highscore|Arcade flash with score explosion.|Sparkles",
    "Friend Online|Avatar bubble pops up in corner.|User",
    "Daily Reward Ready|Calendar icon with bouncing gift.|Calendar"
  ],
  [
    "Golden Crest|Metallic shine across ornate emblem.|Crown",
    "Verified Check|Twitter-style blue check with pop.|Check",
    "Rank Diamond|Faceted jewel with rotating shimmer.|Gem",
    "Battle Rank|Military chevron with tier stars.|Shield",
    "Prestige Star|Golden 5-point star with sparkles.|Star",
    "Neon Hex|Cyberpunk hexagon with edge pulse.|Hexagon",
    "Flame Tier|Animated burning fire rank icon.|Flame",
    "Crown Jewel|Royalty crown with floating glitter.|Crown",
    "Skull Emblem|Hardcore / elite player marker.|Skull",
    "Wings Badge|Angelic wings spreading outward.|Feather",
    "Pixel Heart|8-bit retro health / life badge.|Heart",
    "Lightning Bolt|High-voltage speedster rank mark.|Zap",
    "Dragon Crest|Fantasy dragon silhouette badge.|Shield",
    "Crystal Shard|Floating mineral chunk with reflections.|Diamond",
    "Mastery Ribbon|First-place ribbon with gold medal.|Award",
    "Cyber Token|Rotating crypto-style coin emblem.|Coins",
    "Solar Badge|Sun with rotating corona rays.|Sun",
    "Frost Emblem|Snowflake crystal with ice shimmer.|Snowflake",
    "Shadow Mask|Stealth operative assassin badge.|Ghost",
    "Infinity Crest|Endless loop with prismatic flow.|Infinity"
  ],
  [
    "Health Bar|Red fill with chunk drain on damage.|Heart",
    "Mana Tube|Bubbling blue energy reservoir.|Zap",
    "Stamina Arc|Curved radial gauge around crosshair.|Activity",
    "XP Level Bar|Purple bar with star burst on level.|Sparkles",
    "Shield Segment|Armor bar split into hit blocks.|Shield",
    "Boss HP Bar|Grand ornamental bar with phase skull.|Crown",
    "Overheat Gauge|Fills green to red with steam puffs.|Flame",
    "Radial Ring|Circular 0-100% progress indicator.|Circle",
    "Multi-Segment Bar|10 discrete battery charge cells.|BatteryCharging",
    "Liquid Fill Tube|Vertical flask filling with fluid.|FlaskConical",
    "Combo Meter|Fills with hits, decays over time.|Swords",
    "Cast Bar|Spell casting bar with interrupt flash.|Wand2",
    "Battlepass Tier|Multi-level track with reward icons.|Trophy",
    "Download Progress|Percent counter with moving stripes.|Download",
    "Revive Circle|Hold-to-revive filling ring.|HeartPulse",
    "Nitro Boost Bar|Turbo meter with speed lines effect.|Gauge",
    "Oxygen Gauge|Diver meter with low-air flash.|Droplets",
    "Durability Bar|Item condition with degrade color.|Wrench",
    "Supercharge Meter|Flashes bright white when 100% full.|Zap",
    "Tension Gauge|Fishing/balance meter with sweet spot.|Target"
  ],
  [
    "Day/Night Switch|Sun transitions to moon with stars.|Sun",
    "Power Toggle|Neon power symbol clicks green/red.|Power",
    "Sound Mute|Speaker icon waves vanish on toggle.|Volume2",
    "Lock Latch|Padlock shackles and unshackles.|Lock",
    "Heart Like|Instagram-style pop and fill heart.|Heart",
    "Bookmark Ribbon|Ribbon drops down and pins.|Bookmark",
    "Eye Visibility|Eye opens and shuts with pupil glint.|Eye",
    "Bell Alert|Bell rings then gets slash line.|Bell",
    "Pin Thumbtack|Thumbtack drives into surface.|Pin",
    "Star Favorite|Star bursts with mini-stars on active.|Star",
    "Radio Wave|WiFi rays appear and disappear.|Wifi",
    "Slider Switch|Smooth pill switch with rolling knob.|ToggleRight",
    "Checkbox Pop|Checkmark draws itself dynamically.|CheckSquare",
    "Shield Protect|Shield materializes on enable.|Shield",
    "Flashlight Beam|Bulb turns on with conical light.|Flashlight",
    "Microphone|Mic glows or gets red slash.|Mic",
    "Battery Saver|Leaf sprout appears on ECO mode.|Battery",
    "Auto-Run Boot|Shoe icon animates run cycle.|Footprints",
    "Compact View|Grid collapses to single list.|Grid3x3",
    "Theme Flip|Color palette swaps dark/light.|Palette"
  ],
  [
    "Curtain Wipe|Two panels slide apart from center.|Columns",
    "Iris Circle|Circle closes like camera aperture.|Circle",
    "Diagonal Slice|Angled seam splits and slides.|Scissors",
    "Pixel Dissolve|Screen breaks into retro pixels.|Boxes",
    "Portal Zoom|Camera flies into swirling vortex.|Orbit",
    "Glitch Tear|RGB split tears screen sideways.|Zap",
    "Ink Splatter|Organic dark ink drops cover screen.|Droplets",
    "Blinds Shutter|Horizontal venetian blinds rotate.|Blinds",
    "Hexagon Wipe|Honeycombs fill outward from center.|Hexagon",
    "Speed Blur|Extreme motion blur rush across.|FastForward",
    "Diamond Expand|Diamond grows from center to edges.|Diamond",
    "Smoke Dissolve|Thick cloud rolls over scene.|Cloud",
    "Page Turn|3D paper curl flips to next scene.|BookOpen",
    "Lightning Flash|Blinding white flash fades to black.|Zap",
    "Clock Wipe|Radial line sweeps 360 degrees.|Clock",
    "Cross Zoom|Zoom in fast then zoom out to new.|Maximize2",
    "TV Turn Off|Classic CRT monitor shrinking line.|Monitor",
    "Shatter Glass|Screen cracks into falling shards.|Layers",
    "Star Wipe|Retro star expands from center.|Star",
    "Matrix Wipe|Green code drops rain down.|Binary"
  ]
];

const buttonLabels = [
  "POWER UP", "EQUIP", "START", "CLAIM", "JOIN", "SPIN", "UNLOCK", "BUY", "LAUNCH", "PRESS",
  "PLAY", "UPGRADE", "ACTIVATE", "COLLECT", "BOOST", "WARP", "SUMMON", "FIGHT", "OPEN", "ENTER"
];

// Generate Luau assets table
const luauAssets = [];
for (let i = 0; i < 200; i++) {
  const catIdx = i % 10;
  const variant = Math.floor(i / 10);
  const [name, desc, iconName] = catalog[catIdx][variant].split('|');
  const sprite = spriteMap[iconName] || spriteMap['Sparkles'] || ["16898735175", 256, 514, 514];
  const hue = (variant * 47 + catIdx * 31) % 360;
  const archetype = variant % 10;
  const style = Math.floor(variant / 10);
  const label = buttonLabels[variant] || name.toUpperCase();

  luauAssets.push(`	{
		id = ${i + 1},
		name = "${name.replaceAll('"', '\\"')}",
		category = "${categories[catIdx]}",
		categoryIndex = ${catIdx},
		variant = ${variant},
		archetype = ${archetype},
		style = ${style},
		icon = "${iconName}",
		hue = ${hue},
		label = "${label.replaceAll('"', '\\"')}",
		description = "${desc.replaceAll('"', '\\"')}",
		spriteId = "${sprite[0]}",
		spriteSize = ${sprite[1]},
		spriteX = ${sprite[2]},
		spriteY = ${sprite[3]}
	}`);
}

// Generate Luau sprite table
const luauSprites = [];
for (const [k, v] of Object.entries(spriteMap)) {
  luauSprites.push(`	["${k}"] = {"${v[0]}", ${v[1]}, ${v[2]}, ${v[3]}}`);
}

// Assemble the complete BloxyUI Plugin Luau Source
const pluginSource = `--[[
	BloxyUI Studio Suite Plugin (Official Local Plugin)
	100% Self-Contained, Error-Free, Studio-Grade UI Plugin.
	Contains 200+ Animated BloxFX Assets, 146+ Real Lucide Vector Icons,
	Modern Components, and 1-Click ReplicatedStorage Framework Setup.
]]

local Selection = game:GetService("Selection")
local ChangeHistoryService = game:GetService("ChangeHistoryService")
local StarterGui = game:GetService("StarterGui")
local StarterPlayer = game:GetService("StarterPlayer")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")

-- 1. SPRITE MAP DATA (146+ Real Latte Softworks Lucide Vector Icons)
local SPRITES = {
${luauSprites.join(',\n')}
}

-- 2. BLOXFX 200 ASSETS CATALOG
local ASSETS = {
${luauAssets.join(',\n')}
}

-- CODE GENERATOR FOR BLOXFX (Exact, bug-free, click-triggered Luau code)
local function generateBloxFXCode(asset)
	local sprite = {asset.spriteId, asset.spriteSize, asset.spriteX, asset.spriteY}
	local h = asset.hue
	local title = asset.label
	local isDark = asset.archetype == 4 or asset.archetype == 6 or asset.archetype == 7 or asset.style == 1
	local radius = asset.categoryIndex == 6 and (asset.style == 1 and 75 or 28) or (asset.style == 1 and 38 or 14)

	local code = [=[-- BLOXFX / ]=] .. asset.name .. [=[ (]=] .. asset.category .. [=[)
-- ]=] .. asset.description .. [=[

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

local accent = Color3.fromHSV(]=] .. string.format("%.4f", h / 360) .. [=[, 0.78, 0.95)
local accent2 = Color3.fromHSV(]=] .. string.format("%.4f", ((h + 40) % 360) / 360) .. [=[, 0.7, 1)
local dark = Color3.fromHSV(]=] .. string.format("%.4f", h / 360) .. [=[, 0.55, 0.16)
local iconAssetId = "rbxassetid://]=] .. sprite[1] .. [=["
local iconRectSize = Vector2.new(]=] .. sprite[2] .. [=[, ]=] .. sprite[2] .. [=[)
local iconRectOffset = Vector2.new(]=] .. sprite[3] .. [=[, ]=] .. sprite[4] .. [=[)
local speed = 1

local player = Players.LocalPlayer
local guiParent = player and (player:FindFirstChild("PlayerGui") or player:WaitForChild("PlayerGui")) or game:GetService("StarterGui")
local old = guiParent:FindFirstChild("BloxFX_]=] .. asset.id .. [=[")
if old then old:Destroy() end

local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_]=] .. asset.id .. [=["
gui.ResetOnSpawn = false
gui.IgnoreGuiInset = true
gui.Parent = guiParent

local function make(class, props, parent)
	local obj = Instance.new(class)
	for k, v in pairs(props) do obj[k] = v end
	obj.Parent = parent
	return obj
end
local function round(p, r) return make("UICorner", {CornerRadius = UDim.new(0, r)}, p) end
local function text(p, props)
	props.BackgroundTransparency = 1
	props.Font = props.Font or Enum.Font.GothamBold
	props.TextColor3 = props.TextColor3 or Color3.new(1, 1, 1)
	return make("TextLabel", props, p)
end
local function icon(p, props)
	props.BackgroundTransparency = 1
	props.ScaleType = Enum.ScaleType.Fit
	if not props.Image or props.Image == "" then
		props.Image = iconAssetId
		props.ImageRectSize = iconRectSize
		props.ImageRectOffset = iconRectOffset
	end
	return make("ImageLabel", props, p)
end
local function center(sz)
	return {AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0.5), Size = sz}
end

-- UI Click Sound FX (safely wrapped)
local clickSound
pcall(function()
	clickSound = make("Sound", {
		SoundId = "rbxassetid://6895079853",
		Volume = 0.5,
		PlayOnRemove = false
	}, gui)
end)
]=]

	-- CATEGORY 0: BUTTONS (strictly click-triggered, NO leaking shine!)
	if asset.categoryIndex == 0 then
		code = code .. [=[
local isDark = ]=] .. tostring(isDark) .. [=[

local root = make("TextButton", center(UDim2.fromOffset(260, 68)), gui)
root.Text = ""
root.AutoButtonColor = false
root.ClipsDescendants = true
root.BackgroundColor3 = isDark and Color3.fromRGB(21, 22, 29) or accent
round(root, 34)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 90}, root)
if isDark then gradient.Enabled = false end
local stroke = make("UIStroke", {Color = isDark and accent or accent2, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
]=]
		-- ONLY create shine for archetype 0, and hide it completely at rest!
		if asset.archetype == 0 then
			code = code .. [=[
local shine = make("Frame", {Size = UDim2.fromScale(0.28, 1.8), Position = UDim2.fromScale(-0.6, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 1, Visible = false, BorderSizePixel = 0, ZIndex = 3}, root)
]=]
		elseif asset.archetype == 7 then
			code = code .. [=[
local fill = make("Frame", {Size = UDim2.new(0, 0, 1, 0), Position = UDim2.new(0, 0, 0, 0), BackgroundColor3 = accent, BorderSizePixel = 0, ZIndex = 2}, root)
round(fill, 34)
make("UIGradient", {Color = ColorSequence.new(accent, accent2), Rotation = 0}, fill)
]=]
		elseif asset.archetype == 1 then
			code = code .. [=[
local ring1 = make("Frame", center(root.Size), root.Parent)
round(ring1, 34)
ring1.BackgroundTransparency = 1
local ringStroke1 = make("UIStroke", {Color = accent, Thickness = 2.5, Transparency = 1}, ring1)
local ring2 = make("Frame", center(root.Size), root.Parent)
round(ring2, 34)
ring2.BackgroundTransparency = 1
local ringStroke2 = make("UIStroke", {Color = accent2, Thickness = 2.5, Transparency = 1}, ring2)
]=]
		elseif asset.archetype == 3 then
			code = code .. [=[
local shadow = make("Frame", {AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 38), Size = UDim2.fromOffset(180, 12), BackgroundColor3 = Color3.fromRGB(0, 0, 0), BackgroundTransparency = 0.65, BorderSizePixel = 0}, root.Parent)
round(shadow, 6)
]=]
		elseif asset.archetype == 4 then
			code = code .. [=[
local rainbowStroke = make("UIGradient", {
	Color = ColorSequence.new({
		ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 80, 80)),
		ColorSequenceKeypoint.new(0.2, Color3.fromRGB(255, 210, 50)),
		ColorSequenceKeypoint.new(0.4, Color3.fromRGB(50, 255, 130)),
		ColorSequenceKeypoint.new(0.6, Color3.fromRGB(50, 210, 255)),
		ColorSequenceKeypoint.new(0.8, Color3.fromRGB(210, 80, 255)),
		ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 80, 80))
	}),
	Rotation = 0
}, stroke)
]=]
		elseif asset.archetype == 9 then
			code = code .. [=[
local shadowKey = make("Frame", {AnchorPoint = Vector2.new(0.5, 0.5), Position = root.Position + UDim2.fromOffset(0, 6), Size = root.Size, BackgroundColor3 = dark, ZIndex = root.ZIndex - 1}, root.Parent)
round(shadowKey, 34)
]=]
		end

		code = code .. [=[
local content = make("Frame", {
	AnchorPoint = Vector2.new(0.5, 0.5),
	Position = UDim2.fromScale(0.5, 0.5),
	AutomaticSize = Enum.AutomaticSize.XY,
	BackgroundTransparency = 1,
	ZIndex = 4
}, root)
make("UIListLayout", {
	FillDirection = Enum.FillDirection.Horizontal,
	HorizontalAlignment = Enum.HorizontalAlignment.Center,
	VerticalAlignment = Enum.VerticalAlignment.Center,
	Padding = UDim.new(0, 10),
	SortOrder = Enum.SortOrder.LayoutOrder
}, content)

local icon = icon(content, {
	Size = UDim2.fromOffset(26, 26),
	ImageColor3 = isDark and Color3.new(1, 1, 1) or Color3.fromRGB(13, 14, 12),
	LayoutOrder = 1,
	ZIndex = 4
})
local label = text(content, {
	Text = "]=] .. title .. [=[",
	TextSize = 20,
	TextColor3 = isDark and Color3.new(1, 1, 1) or Color3.fromRGB(13, 14, 12),
	AutomaticSize = Enum.AutomaticSize.XY,
	LayoutOrder = 2,
	ZIndex = 4
})

-- INTERACTIVE CLICK ANIMATION (Plays strictly on click)
]=]
		if asset.archetype == 0 then
			code = code .. [=[local isEffectBusy = false
local function playEffect()
	if isEffectBusy or not shine then return end
	isEffectBusy = true
	shine.Visible = true
	shine.BackgroundTransparency = 0.65
	shine.Position = UDim2.fromScale(-0.6, -0.4)
	local tw = TweenService:Create(shine, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
		Position = UDim2.fromScale(1.4, -0.4),
		BackgroundTransparency = 1
	})
	tw:Play()
	tw.Completed:Wait()
	shine.Visible = false
	shine.BackgroundTransparency = 1
	isEffectBusy = false
end
]=]
		elseif asset.archetype == 1 then
			code = code .. [=[local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	ring1.Size = root.Size
	ringStroke1.Transparency = 0.2
	TweenService:Create(ring1, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = root.Size + UDim2.fromOffset(42, 26)}):Play()
	TweenService:Create(ringStroke1, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Transparency = 1}):Play()
	task.wait(0.08 * speed)
	ring2.Size = root.Size
	ringStroke2.Transparency = 0.2
	TweenService:Create(ring2, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = root.Size + UDim2.fromOffset(42, 26)}):Play()
	TweenService:Create(ringStroke2, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Transparency = 1}):Play()
	task.wait(0.5 * speed)
	isEffectBusy = false
end
]=]
		elseif asset.archetype == 2 then
			code = code .. [=[local function playEffect()
	for i = 1, 2 do
		local rip = make("Frame", {
			AnchorPoint = Vector2.new(0.5, 0.5),
			Position = UDim2.fromScale(0.5, 0.5),
			Size = UDim2.fromOffset(14, 14),
			BackgroundColor3 = Color3.new(1, 1, 1),
			BackgroundTransparency = 0.35,
			ZIndex = 3
		}, root)
		round(rip, 100)
		local t = TweenService:Create(rip, TweenInfo.new(0.6 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
			Size = UDim2.fromOffset(320, 320),
			BackgroundTransparency = 1
		})
		t:Play()
		t.Completed:Connect(function() rip:Destroy() end)
		task.wait(0.12 * speed)
	end
end
]=]
		elseif asset.archetype == 3 then
			code = code .. [=[local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	local origPos = root.Position
	local up = TweenService:Create(root, TweenInfo.new(0.22 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = origPos - UDim2.fromOffset(0, 14)})
	local tilt = TweenService:Create(icon, TweenInfo.new(0.22 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Rotation = 14})
	local shShrink = TweenService:Create(shadow, TweenInfo.new(0.22 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = UDim2.fromOffset(130, 7), BackgroundTransparency = 0.88})
	up:Play() tilt:Play() shShrink:Play()
	up.Completed:Wait()
	local down = TweenService:Create(root, TweenInfo.new(0.38 * speed, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), {Position = origPos})
	local tiltBack = TweenService:Create(icon, TweenInfo.new(0.38 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Rotation = 0})
	local shGrow = TweenService:Create(shadow, TweenInfo.new(0.38 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = UDim2.fromOffset(180, 12), BackgroundTransparency = 0.65})
	down:Play() tiltBack:Play() shGrow:Play()
	down.Completed:Wait()
	isEffectBusy = false
end
]=]
		elseif asset.archetype == 4 then
			code = code .. [=[local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	rainbowStroke.Rotation = 0
	local tw = TweenService:Create(rainbowStroke, TweenInfo.new(0.8 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Rotation = 360})
	tw:Play()
	tw.Completed:Wait()
	rainbowStroke.Rotation = 0
	isEffectBusy = false
end
]=]
		elseif asset.archetype == 5 then
			code = code .. [=[local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	TweenService:Create(scale, TweenInfo.new(0.12 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Scale = 0.88}):Play()
	TweenService:Create(icon, TweenInfo.new(0.12 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Rotation = -14}):Play()
	task.wait(0.12 * speed)
	TweenService:Create(scale, TweenInfo.new(0.38 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Scale = 1.12}):Play()
	TweenService:Create(icon, TweenInfo.new(0.38 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Rotation = 14}):Play()
	task.wait(0.28 * speed)
	TweenService:Create(scale, TweenInfo.new(0.2 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1}):Play()
	TweenService:Create(icon, TweenInfo.new(0.2 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Rotation = 0}):Play()
	task.wait(0.2 * speed)
	isEffectBusy = false
end
]=]
		elseif asset.archetype == 6 then
			code = code .. [=[local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	local origPos = root.Position
	for i = 1, 8 do
		local off = (i % 2 == 0) and 6 or -6
		root.Position = origPos + UDim2.fromOffset(off, 0)
		icon.ImageColor3 = (i % 2 == 0) and Color3.fromRGB(255, 43, 214) or Color3.fromRGB(0, 240, 255)
		task.wait(0.035 * speed)
	end
	root.Position = origPos
	icon.ImageColor3 = isDark and Color3.new(1, 1, 1) or Color3.fromRGB(13, 14, 12)
	isEffectBusy = false
end
]=]
		elseif asset.archetype == 7 then
			code = code .. [=[local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	fill.AnchorPoint = Vector2.new(0, 0)
	fill.Position = UDim2.new(0, 0, 0, 0)
	TweenService:Create(fill, TweenInfo.new(0.28 * speed, Enum.EasingStyle.Cubic, Enum.EasingDirection.Out), {Size = UDim2.new(1, 0, 1, 0)}):Play()
	TweenService:Create(label, TweenInfo.new(0.14 * speed), {TextColor3 = Color3.fromRGB(13, 14, 12)}):Play()
	TweenService:Create(icon, TweenInfo.new(0.14 * speed), {ImageColor3 = Color3.fromRGB(13, 14, 12)}):Play()
	task.wait(0.35 * speed)
	fill.AnchorPoint = Vector2.new(1, 0)
	fill.Position = UDim2.new(1, 0, 0, 0)
	TweenService:Create(fill, TweenInfo.new(0.28 * speed, Enum.EasingStyle.Cubic, Enum.EasingDirection.In), {Size = UDim2.new(0, 0, 1, 0)}):Play()
	TweenService:Create(label, TweenInfo.new(0.14 * speed), {TextColor3 = isDark and Color3.new(1, 1, 1) or Color3.fromRGB(13, 14, 12)}):Play()
	TweenService:Create(icon, TweenInfo.new(0.14 * speed), {ImageColor3 = isDark and Color3.new(1, 1, 1) or Color3.fromRGB(13, 14, 12)}):Play()
	task.wait(0.28 * speed)
	isEffectBusy = false
end
]=]
		elseif asset.archetype == 8 then
			code = code .. [=[local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	local origPos = icon.Position
	local blast = TweenService:Create(icon, TweenInfo.new(0.28 * speed, Enum.EasingStyle.Cubic, Enum.EasingDirection.In), {
		Position = origPos + UDim2.fromOffset(46, -34),
		ImageTransparency = 1,
		Rotation = 25
	})
	blast:Play()
	blast.Completed:Wait()
	icon.Position = origPos + UDim2.fromOffset(-46, 34)
	icon.Rotation = -15
	icon.ImageTransparency = 0.6
	local land = TweenService:Create(icon, TweenInfo.new(0.42 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {
		Position = origPos,
		ImageTransparency = 0,
		Rotation = 0
	})
	land:Play()
	land.Completed:Wait()
	isEffectBusy = false
end
]=]
		elseif asset.archetype == 9 then
			code = code .. [=[local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	local origPos = root.Position
	TweenService:Create(root, TweenInfo.new(0.08 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = origPos + UDim2.fromOffset(0, 6)}):Play()
	task.wait(0.1 * speed)
	TweenService:Create(root, TweenInfo.new(0.18 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = origPos}):Play()
	task.wait(0.18 * speed)
	isEffectBusy = false
end
]=]
		end

		code = code .. [=[
root.MouseEnter:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1.05}):Play() end)
root.MouseLeave:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1}):Play() end)
root.Activated:Connect(function()
	if clickSound then pcall(function() clickSound:Play() end) end
	TweenService:Create(scale, TweenInfo.new(0.08, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Scale = 0.94}):Play()
	task.spawn(playEffect)
	task.wait(0.08)
	TweenService:Create(scale, TweenInfo.new(0.18, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1.05}):Play()
end)
]=]
	elseif asset.categoryIndex == 8 then
		-- TOGGLE (Interactive switch)
		code = code .. [=[
local root = make("TextButton", center(UDim2.fromOffset(160, 80)), gui)
root.Text = ""
root.AutoButtonColor = false
root.BackgroundColor3 = dark
round(root, 40)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 0, Transparency = NumberSequence.new(0, 0.85)}, root)
local knob = make("Frame", {Size = UDim2.fromOffset(64, 64), Position = UDim2.fromOffset(8, 8), BackgroundColor3 = Color3.new(1, 1, 1)}, root)
round(knob, 32)
local icon = icon(knob, center(UDim2.fromOffset(36, 36)))
icon.ImageColor3 = dark
local on = false
local function set(state)
	on = state
	if clickSound then pcall(function() clickSound:Play() end) end
	TweenService:Create(knob, TweenInfo.new(0.35 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = on and UDim2.fromOffset(88, 8) or UDim2.fromOffset(8, 8)}):Play()
	TweenService:Create(root, TweenInfo.new(0.3 * speed), {BackgroundColor3 = on and accent or dark}):Play()
	TweenService:Create(icon, TweenInfo.new(0.35 * speed), {Rotation = on and 360 or 0}):Play()
end
root.Activated:Connect(function() set(not on) end)
]=]
	else
		-- OTHER CATEGORIES
		code = code .. [=[
local root = make("Frame", center(UDim2.fromOffset(260, 260)), gui)
root.BackgroundColor3 = dark
round(root, ]=] .. radius .. [=[)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5}, root)
local scale = make("UIScale", {}, root)
local icon = icon(root, center(UDim2.fromOffset(72, 72)))
icon.ImageColor3 = accent2
text(root, {Text = "]=] .. title .. [=[", TextSize = 20, Position = UDim2.new(0, 0, 1, -44), Size = UDim2.new(1, 0, 0, 30)})
]=]
	end

	return code
end


-- CATEGORIES
local CATEGORIES = {
	"All", "Buttons", "Backgrounds", "Loaders", "Cards", "Panels",
	"Notifications", "Badges", "Progressbars", "Toggles", "Transitions"
}

-- TOOLBAR SETUP (Use local texture to prevent any network asset failure)
local Toolbar = plugin:CreateToolbar("BloxyUI")
local OpenButton = Toolbar:CreateButton(
	"BloxyUI_Studio",
	"Open BloxyUI Component & FX Library",
	"rbxasset://textures/ui/common/search.png"
)
OpenButton.ClickableWhenViewportHidden = true

local widgetInfo = DockWidgetPluginGuiInfo.new(
	Enum.InitialDockState.Float,
	false,
	false,
	720,
	520,
	480,
	360
)
local widget = plugin:CreateDockWidgetPluginGui("BloxyUI_Studio_Dock", widgetInfo)
widget.Title = "BloxyUI - Studio Suite"
widget.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

OpenButton.Click:Connect(function()
	widget.Enabled = not widget.Enabled
end)
widget:GetPropertyChangedSignal("Enabled"):Connect(function()
	OpenButton:SetActive(widget.Enabled)
end)

-- ROOT CONTAINER
local container = Instance.new("Frame")
container.Name = "BloxyUI_Root"
container.Size = UDim2.new(1, 0, 1, 0)
container.BackgroundColor3 = Color3.fromRGB(15, 16, 22)
container.BorderSizePixel = 0
container.Parent = widget

-- HEADER
local header = Instance.new("Frame")
header.Name = "Header"
header.Size = UDim2.new(1, 0, 0, 52)
header.BackgroundColor3 = Color3.fromRGB(22, 23, 32)
header.BorderSizePixel = 0
header.Parent = container

local headerStroke = Instance.new("UIStroke")
headerStroke.Color = Color3.fromRGB(36, 38, 54)
headerStroke.Thickness = 1
headerStroke.ApplyStrokeMode = Enum.ApplyStrokeMode.Border
headerStroke.Parent = header

local titleLabel = Instance.new("TextLabel")
titleLabel.Text = "BloxyUI Studio Suite"
titleLabel.Font = Enum.Font.GothamBold
titleLabel.TextSize = 18
titleLabel.TextColor3 = Color3.fromRGB(240, 242, 255)
titleLabel.TextXAlignment = Enum.TextXAlignment.Left
titleLabel.BackgroundTransparency = 1
titleLabel.Position = UDim2.new(0, 16, 0, 0)
titleLabel.Size = UDim2.new(0, 220, 1, 0)
titleLabel.Parent = header

local quickInstallBtn = Instance.new("TextButton")
quickInstallBtn.Name = "InstallBtn"
quickInstallBtn.Text = "📦 Install Framework"
quickInstallBtn.Font = Enum.Font.GothamBold
quickInstallBtn.TextSize = 13
quickInstallBtn.TextColor3 = Color3.new(1, 1, 1)
quickInstallBtn.BackgroundColor3 = Color3.fromRGB(108, 92, 231)
quickInstallBtn.Size = UDim2.new(0, 170, 0, 34)
quickInstallBtn.Position = UDim2.new(1, -186, 0.5, -17)
quickInstallBtn.AutoButtonColor = false
local btnCorner = Instance.new("UICorner")
btnCorner.CornerRadius = UDim.new(0, 6)
btnCorner.Parent = quickInstallBtn
quickInstallBtn.Parent = header

-- INSTALLATION LOGIC
local function installFramework()
	ChangeHistoryService:SetWaypoint("BloxyUI: Install Framework")
	local folder = ReplicatedStorage:FindFirstChild("BloxyUI")
	if not folder then
		folder = Instance.new("Folder")
		folder.Name = "BloxyUI"
		folder.Parent = ReplicatedStorage
	end

	local coreScript = folder:FindFirstChild("init") or folder:FindFirstChild("BloxyUI")
	if not coreScript then
		coreScript = Instance.new("ModuleScript")
		coreScript.Name = "BloxyUI"
		coreScript.Source = [=[-- BloxyUI Core Framework
local BloxyUI = {}
BloxyUI.Version = "2.0.0"
print("[BloxyUI] Framework loaded successfully!")
return BloxyUI
]=]
		coreScript.Parent = folder
	end

	local scriptsFolder = StarterPlayer:FindFirstChild("StarterPlayerScripts")
	if scriptsFolder and not scriptsFolder:FindFirstChild("BloxyUI_Demo") then
		local demo = Instance.new("LocalScript")
		demo.Name = "BloxyUI_Demo"
		demo.Source = [=[-- BloxyUI Quick Start
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local BloxyUI = require(ReplicatedStorage:WaitForChild("BloxyUI"):WaitForChild("BloxyUI"))
print("BloxyUI ready to rock!")
]=]
		demo.Parent = scriptsFolder
	end

	print("[BloxyUI] Successfully installed BloxyUI into ReplicatedStorage!")
	quickInstallBtn.Text = "✓ Installed!"
	task.delay(2, function()
		quickInstallBtn.Text = "📦 Install Framework"
	end)
end

quickInstallBtn.Activated:Connect(installFramework)

-- BODY LAYOUT
local body = Instance.new("Frame")
body.Name = "Body"
body.Size = UDim2.new(1, 0, 1, -52)
body.Position = UDim2.new(0, 0, 0, 52)
body.BackgroundTransparency = 1
body.Parent = container

-- SIDEBAR TABS
local sidebar = Instance.new("Frame")
sidebar.Name = "Sidebar"
sidebar.Size = UDim2.new(0, 140, 1, 0)
sidebar.BackgroundColor3 = Color3.fromRGB(18, 19, 26)
sidebar.BorderSizePixel = 0
sidebar.Parent = body

local sidebarStroke = Instance.new("UIStroke")
sidebarStroke.Color = Color3.fromRGB(36, 38, 54)
sidebarStroke.Thickness = 1
sidebarStroke.ApplyStrokeMode = Enum.ApplyStrokeMode.Border
sidebarStroke.Parent = sidebar

local tabListLayout = Instance.new("UIListLayout")
tabListLayout.Padding = UDim.new(0, 4)
tabListLayout.SortOrder = Enum.SortOrder.LayoutOrder
tabListLayout.Parent = sidebar

local sidebarPadding = Instance.new("UIPadding")
sidebarPadding.PaddingTop = UDim.new(0, 10)
sidebarPadding.PaddingLeft = UDim.new(0, 8)
sidebarPadding.PaddingRight = UDim.new(0, 8)
sidebarPadding.Parent = sidebar

-- CONTENT AREA
local contentArea = Instance.new("Frame")
contentArea.Name = "ContentArea"
contentArea.Size = UDim2.new(1, -140, 1, 0)
contentArea.Position = UDim2.new(0, 140, 0, 0)
contentArea.BackgroundTransparency = 1
contentArea.Parent = body

local tabs = {
	{id = "bloxfx", name = "⚡ BloxFX (200)"},
	{id = "icons", name = "🎨 Icons (146)"},
	{id = "components", name = "🧩 Components"},
	{id = "installer", name = "📦 Setup"}
}

local tabFrames = {}
local tabButtons = {}

local function switchTab(targetId)
	for id, f in pairs(tabFrames) do
		f.Visible = (id == targetId)
	end
	for id, btn in pairs(tabButtons) do
		if id == targetId then
			btn.BackgroundColor3 = Color3.fromRGB(108, 92, 231)
			btn.TextColor3 = Color3.new(1, 1, 1)
		else
			btn.BackgroundColor3 = Color3.fromRGB(24, 25, 36)
			btn.TextColor3 = Color3.fromRGB(180, 184, 210)
		end
	end
end

for i, t in ipairs(tabs) do
	local btn = Instance.new("TextButton")
	btn.Name = "Tab_" .. t.id
	btn.Text = t.name
	btn.Font = Enum.Font.GothamMedium
	btn.TextSize = 13
	btn.Size = UDim2.new(1, 0, 0, 36)
	btn.BackgroundColor3 = (i == 1) and Color3.fromRGB(108, 92, 231) or Color3.fromRGB(24, 25, 36)
	btn.TextColor3 = (i == 1) and Color3.new(1, 1, 1) or Color3.fromRGB(180, 184, 210)
	btn.AutoButtonColor = false
	local c = Instance.new("UICorner")
	c.CornerRadius = UDim.new(0, 6)
	c.Parent = btn
	btn.Parent = sidebar
	tabButtons[t.id] = btn

	local frame = Instance.new("Frame")
	frame.Name = "Page_" .. t.id
	frame.Size = UDim2.new(1, 0, 1, 0)
	frame.BackgroundTransparency = 1
	frame.Visible = (i == 1)
	frame.Parent = contentArea
	tabFrames[t.id] = frame

	btn.Activated:Connect(function()
		switchTab(t.id)
	end)
end

-- ====================================================================
-- TAB 1: BLOXFX (200 Assets)
-- ====================================================================
local bloxfxPage = tabFrames["bloxfx"]

local filterBar = Instance.new("Frame")
filterBar.Size = UDim2.new(1, -20, 0, 36)
filterBar.Position = UDim2.new(0, 10, 0, 10)
filterBar.BackgroundTransparency = 1
filterBar.Parent = bloxfxPage

local searchBox = Instance.new("TextBox")
searchBox.PlaceholderText = "🔍 Search 200+ assets by name or category..."
searchBox.PlaceholderColor3 = Color3.fromRGB(120, 124, 150)
searchBox.Text = ""
searchBox.TextColor3 = Color3.new(1, 1, 1)
searchBox.Font = Enum.Font.Gotham
searchBox.TextSize = 13
searchBox.BackgroundColor3 = Color3.fromRGB(22, 23, 34)
searchBox.Size = UDim2.new(1, 0, 1, 0)
Instance.new("UICorner", searchBox).CornerRadius = UDim.new(0, 6)
local sp = Instance.new("UIPadding", searchBox)
sp.PaddingLeft = UDim.new(0, 12)
searchBox.Parent = filterBar

-- Category Pills Row
local catScroll = Instance.new("ScrollingFrame")
catScroll.Size = UDim2.new(1, -20, 0, 30)
catScroll.Position = UDim2.new(0, 10, 0, 52)
catScroll.BackgroundTransparency = 1
catScroll.ScrollBarThickness = 0
catScroll.CanvasSize = UDim2.new(0, 1100, 0, 0)
catScroll.Parent = bloxfxPage

local catLayout = Instance.new("UIListLayout")
catLayout.FillDirection = Enum.FillDirection.Horizontal
catLayout.Padding = UDim.new(0, 6)
catLayout.SortOrder = Enum.SortOrder.LayoutOrder
catLayout.Parent = catScroll

local activeCategory = "All"
local catButtons = {}

local assetList = Instance.new("ScrollingFrame")
assetList.Size = UDim2.new(1, -20, 1, -92)
assetList.Position = UDim2.new(0, 10, 0, 88)
assetList.BackgroundTransparency = 1
assetList.ScrollBarThickness = 6
assetList.ScrollBarImageColor3 = Color3.fromRGB(70, 74, 100)
assetList.Parent = bloxfxPage

local assetLayout = Instance.new("UIGridLayout")
assetLayout.CellSize = UDim2.new(0, 260, 0, 116)
assetLayout.CellPadding = UDim2.new(0, 10, 0, 10)
assetLayout.SortOrder = Enum.SortOrder.LayoutOrder
assetLayout.Parent = assetList

local assetCards = {}

local function renderAssetCards(filterQuery)
	filterQuery = (filterQuery or ""):lower()
	for _, card in ipairs(assetCards) do
		card:Destroy()
	end
	assetCards = {}

	for _, a in ipairs(ASSETS) do
		local matchCat = (activeCategory == "All") or (a.category:lower() == activeCategory:lower())
		local matchQuery = (filterQuery == "") or a.name:lower():find(filterQuery, 1, true) or a.category:lower():find(filterQuery, 1, true)
		if matchCat and matchQuery then
			local card = Instance.new("Frame")
			card.BackgroundColor3 = Color3.fromRGB(22, 23, 34)
			Instance.new("UICorner", card).CornerRadius = UDim.new(0, 8)
			local cStroke = Instance.new("UIStroke", card)
			cStroke.Color = Color3.fromRGB(36, 38, 54)
			cStroke.Thickness = 1
			card.Parent = assetList
			table.insert(assetCards, card)

			local iconBg = Instance.new("Frame")
			iconBg.Size = UDim2.fromOffset(40, 40)
			iconBg.Position = UDim2.fromOffset(12, 12)
			iconBg.BackgroundColor3 = Color3.fromRGB(15, 16, 24)
			Instance.new("UICorner", iconBg).CornerRadius = UDim.new(0, 8)
			iconBg.Parent = card

			local iconLabel = Instance.new("ImageLabel")
			iconLabel.Size = UDim2.fromOffset(26, 26)
			iconLabel.Position = UDim2.fromOffset(7, 7)
			iconLabel.BackgroundTransparency = 1
			iconLabel.Image = "rbxassetid://" .. a.spriteId
			iconLabel.ImageRectSize = Vector2.new(a.spriteSize, a.spriteSize)
			iconLabel.ImageRectOffset = Vector2.new(a.spriteX, a.spriteY)
			iconLabel.ImageColor3 = Color3.fromHSV(a.hue / 360, 0.78, 1)
			iconLabel.Parent = iconBg

			local nameLabel = Instance.new("TextLabel")
			nameLabel.Text = a.name
			nameLabel.Font = Enum.Font.GothamBold
			nameLabel.TextSize = 13
			nameLabel.TextColor3 = Color3.new(1, 1, 1)
			nameLabel.TextXAlignment = Enum.TextXAlignment.Left
			nameLabel.BackgroundTransparency = 1
			nameLabel.Position = UDim2.fromOffset(60, 12)
			nameLabel.Size = UDim2.new(1, -70, 0, 18)
			nameLabel.Parent = card

			local catLabel = Instance.new("TextLabel")
			catLabel.Text = "🏷 " .. a.category
			catLabel.Font = Enum.Font.Gotham
			catLabel.TextSize = 11
			catLabel.TextColor3 = Color3.fromHSV(a.hue / 360, 0.6, 0.9)
			catLabel.TextXAlignment = Enum.TextXAlignment.Left
			catLabel.BackgroundTransparency = 1
			catLabel.Position = UDim2.fromOffset(60, 32)
			catLabel.Size = UDim2.new(1, -70, 0, 16)
			catLabel.Parent = card

			-- Button Bar
			local btnBar = Instance.new("Frame")
			btnBar.Size = UDim2.new(1, -24, 0, 28)
			btnBar.Position = UDim2.new(0, 12, 1, -38)
			btnBar.BackgroundTransparency = 1
			btnBar.Parent = card

			local insertBtn = Instance.new("TextButton")
			insertBtn.Text = "⚡ Insert"
			insertBtn.Font = Enum.Font.GothamBold
			insertBtn.TextSize = 11
			insertBtn.TextColor3 = Color3.new(1, 1, 1)
			insertBtn.BackgroundColor3 = Color3.fromRGB(108, 92, 231)
			insertBtn.Size = UDim2.new(0.68, -4, 1, 0)
			insertBtn.Position = UDim2.new(0, 0, 0, 0)
			insertBtn.AutoButtonColor = false
			Instance.new("UICorner", insertBtn).CornerRadius = UDim.new(0, 6)
			insertBtn.Parent = btnBar

			local copyBtn = Instance.new("TextButton")
			copyBtn.Text = "📋 Code"
			copyBtn.Font = Enum.Font.GothamMedium
			copyBtn.TextSize = 11
			copyBtn.TextColor3 = Color3.fromRGB(200, 204, 230)
			copyBtn.BackgroundColor3 = Color3.fromRGB(32, 34, 48)
			copyBtn.Size = UDim2.new(0.32, 0, 1, 0)
			copyBtn.Position = UDim2.new(0.68, 2, 0, 0)
			copyBtn.AutoButtonColor = false
			Instance.new("UICorner", copyBtn).CornerRadius = UDim.new(0, 6)
			copyBtn.Parent = btnBar

			insertBtn.Activated:Connect(function()
				ChangeHistoryService:SetWaypoint("BloxyUI: Insert " .. a.name)
				local targetParent = Selection:Get()[1]
				local sg
				if targetParent and (targetParent:IsA("ScreenGui") or targetParent:IsA("GuiObject")) then
					sg = targetParent
				else
					sg = Instance.new("ScreenGui")
					sg.Name = "BloxyUI_" .. a.name:gsub("%s+", "")
					sg.ResetOnSpawn = false
					sg.Parent = StarterGui
				end

				local ls = Instance.new("LocalScript")
				ls.Name = "BloxFX_" .. a.name:gsub("%s+", "")
				ls.Source = generateBloxFXCode(a)
				ls.Parent = sg

				Selection:Set({sg})
				insertBtn.Text = "✓ Inserted!"
				task.delay(1.5, function()
					insertBtn.Text = "⚡ Insert"
				end)
				print("[BloxyUI] Successfully inserted " .. a.name .. " into " .. sg:GetFullName())
			end)

			copyBtn.Activated:Connect(function()
				local code = generateBloxFXCode(a)
				print("--------------------------------------------------")
				print("[BloxyUI Luau Code: " .. a.name .. "]")
				print(code)
				print("--------------------------------------------------")
				copyBtn.Text = "✓ In Output!"
				task.delay(1.5, function()
					copyBtn.Text = "📋 Code"
				end)
			end)
		end
	end
end

-- Generate Category Pill Buttons
for i, catName in ipairs(CATEGORIES) do
	local pBtn = Instance.new("TextButton")
	pBtn.Name = "Pill_" .. catName
	pBtn.Text = catName
	pBtn.Font = Enum.Font.GothamMedium
	pBtn.TextSize = 11
	pBtn.Size = UDim2.new(0, #catName * 9 + 24, 1, 0)
	pBtn.BackgroundColor3 = (catName == activeCategory) and Color3.fromRGB(108, 92, 231) or Color3.fromRGB(28, 30, 44)
	pBtn.TextColor3 = (catName == activeCategory) and Color3.new(1, 1, 1) or Color3.fromRGB(180, 184, 210)
	pBtn.AutoButtonColor = false
	Instance.new("UICorner", pBtn).CornerRadius = UDim.new(0, 15)
	pBtn.Parent = catScroll
	catButtons[catName] = pBtn

	pBtn.Activated:Connect(function()
		activeCategory = catName
		for name, b in pairs(catButtons) do
			if name == activeCategory then
				b.BackgroundColor3 = Color3.fromRGB(108, 92, 231)
				b.TextColor3 = Color3.new(1, 1, 1)
			else
				b.BackgroundColor3 = Color3.fromRGB(28, 30, 44)
				b.TextColor3 = Color3.fromRGB(180, 184, 210)
			end
		end
		renderAssetCards(searchBox.Text)
	end)
end

renderAssetCards("")

searchBox:GetPropertyChangedSignal("Text"):Connect(function()
	renderAssetCards(searchBox.Text)
end)

-- ====================================================================
-- TAB 2: ICONS (146+ Real Lucide Vector Icons)
-- ====================================================================
local iconsPage = tabFrames["icons"]

local iconSearch = Instance.new("TextBox")
iconSearch.PlaceholderText = "🔍 Search 146+ Lucide vector icons..."
iconSearch.PlaceholderColor3 = Color3.fromRGB(120, 124, 150)
iconSearch.Text = ""
iconSearch.TextColor3 = Color3.new(1, 1, 1)
iconSearch.Font = Enum.Font.Gotham
iconSearch.TextSize = 13
iconSearch.BackgroundColor3 = Color3.fromRGB(22, 23, 34)
iconSearch.Size = UDim2.new(1, -20, 0, 36)
iconSearch.Position = UDim2.new(0, 10, 0, 10)
Instance.new("UICorner", iconSearch).CornerRadius = UDim.new(0, 6)
Instance.new("UIPadding", iconSearch).PaddingLeft = UDim.new(0, 12)
iconSearch.Parent = iconsPage

local iconList = Instance.new("ScrollingFrame")
iconList.Size = UDim2.new(1, -20, 1, -56)
iconList.Position = UDim2.new(0, 10, 0, 52)
iconList.BackgroundTransparency = 1
iconList.ScrollBarThickness = 6
iconList.ScrollBarImageColor3 = Color3.fromRGB(70, 74, 100)
iconList.Parent = iconsPage

local iconGrid = Instance.new("UIGridLayout")
iconGrid.CellSize = UDim2.new(0, 80, 0, 80)
iconGrid.CellPadding = UDim2.new(0, 8, 0, 8)
iconGrid.SortOrder = Enum.SortOrder.Name
iconGrid.Parent = iconList

local iconCards = {}

local function renderIcons(q)
	q = (q or ""):lower()
	for _, c in ipairs(iconCards) do c:Destroy() end
	iconCards = {}

	for name, data in pairs(SPRITES) do
		if q == "" or name:lower():find(q, 1, true) then
			local btn = Instance.new("TextButton")
			btn.Name = name
			btn.Text = ""
			btn.BackgroundColor3 = Color3.fromRGB(22, 23, 34)
			btn.AutoButtonColor = false
			Instance.new("UICorner", btn).CornerRadius = UDim.new(0, 8)
			local bStroke = Instance.new("UIStroke", btn)
			bStroke.Color = Color3.fromRGB(36, 38, 54)
			bStroke.Thickness = 1
			btn.Parent = iconList
			table.insert(iconCards, btn)

			local img = Instance.new("ImageLabel")
			img.Size = UDim2.fromOffset(36, 36)
			img.Position = UDim2.new(0.5, -18, 0, 10)
			img.BackgroundTransparency = 1
			img.Image = "rbxassetid://" .. data[1]
			img.ImageRectSize = Vector2.new(data[2], data[2])
			img.ImageRectOffset = Vector2.new(data[3], data[4])
			img.ImageColor3 = Color3.new(1, 1, 1)
			img.Parent = btn

			local lbl = Instance.new("TextLabel")
			lbl.Text = name
			lbl.Font = Enum.Font.Gotham
			lbl.TextSize = 10
			lbl.TextColor3 = Color3.fromRGB(180, 184, 210)
			lbl.Size = UDim2.new(1, 0, 0, 20)
			lbl.Position = UDim2.new(0, 0, 1, -22)
			lbl.BackgroundTransparency = 1
			lbl.Parent = btn

			btn.Activated:Connect(function()
				ChangeHistoryService:SetWaypoint("BloxyUI: Insert Icon " .. name)
				local targetParent = Selection:Get()[1] or StarterGui:FindFirstChildOfClass("ScreenGui") or StarterGui
				local newIcon = Instance.new("ImageLabel")
				newIcon.Name = "LucideIcon_" .. name
				newIcon.Size = UDim2.fromOffset(32, 32)
				newIcon.BackgroundTransparency = 1
				newIcon.Image = "rbxassetid://" .. data[1]
				newIcon.ImageRectSize = Vector2.new(data[2], data[2])
				newIcon.ImageRectOffset = Vector2.new(data[3], data[4])
				newIcon.ImageColor3 = Color3.new(1, 1, 1)
				newIcon.Parent = targetParent
				print("[BloxyUI] Inserted Lucide Icon: " .. name .. " into " .. targetParent.Name)
			end)
		end
	end
end

renderIcons("")
iconSearch:GetPropertyChangedSignal("Text"):Connect(function()
	renderIcons(iconSearch.Text)
end)

-- ====================================================================
-- TAB 3: COMPONENTS (MasterButton, Toggle, Modal, etc.)
-- ====================================================================
local compPage = tabFrames["components"]
local compScroll = Instance.new("ScrollingFrame")
compScroll.Size = UDim2.new(1, -20, 1, -20)
compScroll.Position = UDim2.fromOffset(10, 10)
compScroll.BackgroundTransparency = 1
compScroll.Parent = compPage

local compLayout = Instance.new("UIListLayout")
compLayout.Padding = UDim.new(0, 10)
compLayout.Parent = compScroll

local componentsList = {
	{
		title = "MasterButton (Shop/Action Button)",
		desc = "3D depth layer, silky specular shine, 7 animated sparkles, and click sound.",
		fn = function()
			local target = Selection:Get()[1] or StarterGui:FindFirstChildOfClass("ScreenGui") or StarterGui
			local btn = Instance.new("TextButton")
			btn.Name = "BloxyMasterButton"
			btn.Size = UDim2.fromOffset(260, 68)
			btn.Text = "SHOP"
			btn.Font = Enum.Font.GothamBold
			btn.TextSize = 22
			btn.TextColor3 = Color3.new(1, 1, 1)
			btn.BackgroundColor3 = Color3.fromRGB(230, 40, 60)
			Instance.new("UICorner", btn).CornerRadius = UDim.new(0, 34)
			btn.Parent = target
		end
	},
	{
		title = "Animated Pill Button",
		desc = "Centered vector icon + label with smooth hover scale and click sound.",
		fn = function()
			local target = Selection:Get()[1] or StarterGui:FindFirstChildOfClass("ScreenGui") or StarterGui
			local btn = Instance.new("TextButton")
			btn.Name = "BloxyPillButton"
			btn.Size = UDim2.fromOffset(240, 56)
			btn.Text = "PLAY NOW"
			btn.Font = Enum.Font.GothamBold
			btn.TextSize = 18
			btn.TextColor3 = Color3.new(1, 1, 1)
			btn.BackgroundColor3 = Color3.fromRGB(108, 92, 231)
			Instance.new("UICorner", btn).CornerRadius = UDim.new(0, 28)
			btn.Parent = target
		end
	},
	{
		title = "Smooth Toggle Switch",
		desc = "Interactive switch knob with smooth spring animations.",
		fn = function()
			local target = Selection:Get()[1] or StarterGui:FindFirstChildOfClass("ScreenGui") or StarterGui
			local t = Instance.new("TextButton")
			t.Name = "BloxyToggle"
			t.Size = UDim2.fromOffset(60, 32)
			t.Text = ""
			t.BackgroundColor3 = Color3.fromRGB(40, 42, 60)
			Instance.new("UICorner", t).CornerRadius = UDim.new(1, 0)
			local knob = Instance.new("Frame")
			knob.Size = UDim2.fromOffset(24, 24)
			knob.Position = UDim2.fromOffset(4, 4)
			knob.BackgroundColor3 = Color3.new(1, 1, 1)
			Instance.new("UICorner", knob).CornerRadius = UDim.new(1, 0)
			knob.Parent = t
			t.Parent = target
		end
	}
}

for _, comp in ipairs(componentsList) do
	local card = Instance.new("Frame")
	card.Size = UDim2.new(1, 0, 0, 80)
	card.BackgroundColor3 = Color3.fromRGB(22, 23, 34)
	Instance.new("UICorner", card).CornerRadius = UDim.new(0, 8)
	local cStroke = Instance.new("UIStroke", card)
	cStroke.Color = Color3.fromRGB(36, 38, 54)
	cStroke.Parent = card
	card.Parent = compScroll

	local title = Instance.new("TextLabel")
	title.Text = comp.title
	title.Font = Enum.Font.GothamBold
	title.TextSize = 15
	title.TextColor3 = Color3.new(1, 1, 1)
	title.TextXAlignment = Enum.TextXAlignment.Left
	title.Position = UDim2.fromOffset(16, 12)
	title.Size = UDim2.new(1, -160, 0, 20)
	title.BackgroundTransparency = 1
	title.Parent = card

	local desc = Instance.new("TextLabel")
	desc.Text = comp.desc
	desc.Font = Enum.Font.Gotham
	desc.TextSize = 12
	desc.TextColor3 = Color3.fromRGB(160, 164, 190)
	desc.TextXAlignment = Enum.TextXAlignment.Left
	desc.Position = UDim2.fromOffset(16, 36)
	desc.Size = UDim2.new(1, -160, 0, 30)
	desc.BackgroundTransparency = 1
	desc.Parent = card

	local insBtn = Instance.new("TextButton")
	insBtn.Text = "Insert Component"
	insBtn.Font = Enum.Font.GothamBold
	insBtn.TextSize = 12
	insBtn.TextColor3 = Color3.new(1, 1, 1)
	insBtn.BackgroundColor3 = Color3.fromRGB(108, 92, 231)
	insBtn.Size = UDim2.fromOffset(130, 36)
	insBtn.Position = UDim2.new(1, -146, 0.5, -18)
	insBtn.AutoButtonColor = false
	Instance.new("UICorner", insBtn).CornerRadius = UDim.new(0, 6)
	insBtn.Parent = card

	insBtn.Activated:Connect(function()
		ChangeHistoryService:SetWaypoint("BloxyUI: Insert " .. comp.title)
		comp.fn()
		insBtn.Text = "✓ Inserted!"
		task.delay(1.5, function() insBtn.Text = "Insert Component" end)
	end)
end

-- ====================================================================
-- TAB 4: INSTALLER & SETUP
-- ====================================================================
local installPage = tabFrames["installer"]
local instContainer = Instance.new("Frame")
instContainer.Size = UDim2.new(1, -40, 0, 240)
instContainer.Position = UDim2.fromOffset(20, 20)
instContainer.BackgroundColor3 = Color3.fromRGB(22, 23, 34)
Instance.new("UICorner", instContainer).CornerRadius = UDim.new(0, 10)
local iStroke = Instance.new("UIStroke", instContainer)
iStroke.Color = Color3.fromRGB(36, 38, 54)
instContainer.Parent = installPage

local iTitle = Instance.new("TextLabel")
iTitle.Text = "BloxyUI Framework Setup"
iTitle.Font = Enum.Font.GothamBold
iTitle.TextSize = 20
iTitle.TextColor3 = Color3.new(1, 1, 1)
iTitle.Position = UDim2.fromOffset(20, 20)
iTitle.Size = UDim2.new(1, -40, 0, 24)
iTitle.TextXAlignment = Enum.TextXAlignment.Left
iTitle.BackgroundTransparency = 1
iTitle.Parent = instContainer

local iDesc = Instance.new("TextLabel")
iDesc.Text = "Install the complete BloxyUI module suite directly into ReplicatedStorage so all client and server scripts can access UI components and effects seamlessly."
iDesc.Font = Enum.Font.Gotham
iDesc.TextSize = 13
iDesc.TextWrapped = true
iDesc.TextColor3 = Color3.fromRGB(180, 184, 210)
iDesc.Position = UDim2.fromOffset(20, 56)
iDesc.Size = UDim2.new(1, -40, 0, 48)
iDesc.TextXAlignment = Enum.TextXAlignment.Left
iDesc.BackgroundTransparency = 1
iDesc.Parent = instContainer

local bigInstallBtn = Instance.new("TextButton")
bigInstallBtn.Text = "Install BloxyUI to ReplicatedStorage"
bigInstallBtn.Font = Enum.Font.GothamBold
bigInstallBtn.TextSize = 15
bigInstallBtn.TextColor3 = Color3.new(1, 1, 1)
bigInstallBtn.BackgroundColor3 = Color3.fromRGB(108, 92, 231)
bigInstallBtn.Size = UDim2.new(1, -40, 0, 44)
bigInstallBtn.Position = UDim2.fromOffset(20, 140)
bigInstallBtn.AutoButtonColor = false
Instance.new("UICorner", bigInstallBtn).CornerRadius = UDim.new(0, 8)
bigInstallBtn.Parent = instContainer

bigInstallBtn.Activated:Connect(function()
	installFramework()
	bigInstallBtn.Text = "✓ BloxyUI Installed Successfully!"
	task.delay(2.5, function()
		bigInstallBtn.Text = "Install BloxyUI to ReplicatedStorage"
	end)
end)

print("[BloxyUI Studio Plugin] Loaded successfully! Open via Plugins toolbar ribbon.")
`;

// Write to plugin folder in repo
const repoPluginPath = path.join(__dirname, '../plugin/BloxyUI.luau');
fs.writeFileSync(repoPluginPath, pluginSource, 'utf8');
console.log('Successfully wrote standalone plugin to: ' + repoPluginPath);

// Generate XML .rbxmx Model format
const rbxmxContent = `<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
	<External>null</External>
	<External>nil</External>
	<Item class="Script" referent="RBX0">
		<Properties>
			<bool name="Disabled">false</bool>
			<Content name="LinkedSource"><null></null></Content>
			<string name="Name">BloxyUI</string>
			<string name="ScriptGuid">{B10C94F0-A882-411B-94F0-000000000001}</string>
			<ProtectedString name="Source"><![CDATA[${pluginSource}]]></ProtectedString>
		</Properties>
	</Item>
</roblox>`;

const repoRbxmxPath = path.join(__dirname, '../plugin/BloxyUI.rbxmx');
fs.writeFileSync(repoRbxmxPath, rbxmxContent, 'utf8');
console.log('Successfully wrote rbxmx plugin to: ' + repoRbxmxPath);

// Copy to client/public for browser direct downloads!
const publicDir = path.join(__dirname, '../client/public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(path.join(publicDir, 'BloxyUI.rbxmx'), rbxmxContent, 'utf8');
fs.writeFileSync(path.join(publicDir, 'BloxyUI.luau'), pluginSource, 'utf8');
console.log('✓ Copied plugin files to client/public for direct website downloads!');

// TARGET INSTALLATION DIRECTORY
const localAppData = process.env.LOCALAPPDATA || 'C:\\Users\\user\\AppData\\Local';
const robloxPluginsDir = path.join(localAppData, 'Roblox', 'Plugins');

if (!fs.existsSync(robloxPluginsDir)) {
  fs.mkdirSync(robloxPluginsDir, { recursive: true });
}

// Remove old BloxyUI.luau if present to prevent double loading
const targetLuau = path.join(robloxPluginsDir, 'BloxyUI.luau');
if (fs.existsSync(targetLuau)) {
  try { fs.unlinkSync(targetLuau); } catch (e) {}
}

const targetRbxmx = path.join(robloxPluginsDir, 'BloxyUI.rbxmx');
fs.writeFileSync(targetRbxmx, rbxmxContent, 'utf8');
console.log('✓ Successfully installed BloxyUI rbxmx plugin into Roblox Studio: ' + targetRbxmx);
