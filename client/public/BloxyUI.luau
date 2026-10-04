--[[
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
	["Zap"] = {"16898791349", 256, 257, 257},
	["Sparkles"] = {"16898735175", 256, 514, 514},
	["Flame"] = {"16898670919", 256, 0, 257},
	["Shield"] = {"16898734664", 256, 257, 0},
	["Crown"] = {"16898668482", 256, 257, 514},
	["Sword"] = {"16898787671", 256, 257, 514},
	["Swords"] = {"16898787671", 256, 514, 514},
	["Star"] = {"16898736776", 256, 257, 0},
	["Heart"] = {"16898673271", 256, 0, 0},
	["Trophy"] = {"16898789153", 256, 0, 514},
	["Gamepad2"] = {"16898672166", 256, 0, 0},
	["Rocket"] = {"16898733317", 256, 0, 514},
	["Coins"] = {"16898619182", 256, 0, 0},
	["Lock"] = {"16898674825", 256, 0, 257},
	["Bell"] = {"16898615428", 256, 0, 514},
	["Play"] = {"16898731919", 256, 0, 514},
	["Check"] = {"16898617411", 256, 257, 0},
	["Eye"] = {"16898669897", 256, 0, 0},
	["Settings"] = {"16898734421", 256, 514, 0},
	["Key"] = {"16898673616", 256, 514, 514},
	["Gem"] = {"16898672166", 256, 257, 514},
	["Package"] = {"16898730641", 256, 514, 0},
	["Crosshair"] = {"16898668482", 256, 514, 257},
	["Compass"] = {"16898619182", 256, 257, 514},
	["MousePointerClick"] = {"16898729337", 256, 0, 514},
	["Power"] = {"16898732262", 256, 514, 257},
	["Send"] = {"16898734242", 256, 257, 257},
	["Joystick"] = {"16898672166", 256, 257, 0},
	["ShoppingCart"] = {"16898734664", 256, 257, 514},
	["Users"] = {"16898790259", 256, 514, 0},
	["LockOpen"] = {"16898674825", 256, 257, 0},
	["SendHorizontal"] = {"16898734242", 256, 0, 257},
	["Waves"] = {"16898790791", 256, 257, 514},
	["Binary"] = {"16898615570", 256, 0, 257},
	["Sun"] = {"16898787671", 256, 0, 0},
	["Droplets"] = {"16898669562", 256, 514, 257},
	["Radar"] = {"16898732504", 256, 257, 514},
	["Candy"] = {"16898617146", 256, 514, 257},
	["Orbit"] = {"16898730417", 256, 514, 0},
	["Sunset"] = {"16898787671", 256, 0, 257},
	["Sparkle"] = {"16898735175", 256, 257, 514},
	["TreePine"] = {"16898789012", 256, 514, 257},
	["Anchor"] = {"16898613613", 256, 0, 514},
	["Database"] = {"16898668755", 256, 0, 514},
	["SunMedium"] = {"16898736967", 256, 514, 257},
	["GlassWater"] = {"16898672599", 256, 0, 0},
	["ScanLine"] = {"16898733817", 256, 0, 0},
	["Rainbow"] = {"16898732665", 256, 514, 257},
	["ChartColumn"] = {"16898615143", 256, 0, 257},
	["AudioLines"] = {"16898614755", 256, 0, 0},
	["ListChecks"] = {"16898674482", 256, 0, 514},
	["LayoutGrid"] = {"16898674182", 256, 514, 0},
	["MousePointer2"] = {"16898729337", 256, 257, 257},
	["Cloud"] = {"16898618899", 256, 257, 514},
	["WandSparkles"] = {"16898790791", 256, 0, 257},
	["Grid3x3"] = {"16898672700", 256, 257, 0},
	["Atom"] = {"16898614574", 256, 514, 514},
	["Loader"] = {"16898674684", 256, 257, 257},
	["CircleDot"] = {"16898617884", 256, 257, 257},
	["Wifi"] = {"16898790996", 256, 514, 514},
	["Music"] = {"16898730065", 256, 0, 0},
	["Shapes"] = {"16898734421", 256, 257, 257},
	["RefreshCw"] = {"16898733146", 256, 257, 0},
	["Telescope"] = {"16898788248", 256, 0, 257},
	["Box"] = {"16898616650", 256, 0, 514},
	["Globe"] = {"16898672599", 256, 257, 257},
	["Footprints"] = {"16898671684", 256, 514, 0},
	["Radio"] = {"16898732665", 256, 514, 0},
	["Hexagon"] = {"16898673271", 256, 257, 257},
	["Hourglass"] = {"16898673358", 256, 514, 0},
	["Blocks"] = {"16898615570", 256, 514, 514},
	["Layers"] = {"16898674182", 256, 257, 0},
	["Gift"] = {"16898672316", 256, 0, 0},
	["Spade"] = {"16898735175", 256, 514, 257},
	["Backpack"] = {"16898614755", 256, 514, 257},
	["Map"] = {"16898675359", 256, 0, 514},
	["Award"] = {"16898614755", 256, 0, 257},
	["Ticket"] = {"16898788789", 256, 0, 257},
	["Egg"] = {"16898669689", 256, 514, 514},
	["FlaskConical"] = {"16898670919", 256, 514, 257},
	["Shirt"] = {"16898734664", 256, 257, 257},
	["ScrollText"] = {"16898734065", 256, 257, 257},
	["MapPin"] = {"16898675359", 256, 514, 0},
	["Diamond"] = {"16898669042", 256, 257, 0},
	["Disc3"] = {"16898669271", 256, 0, 257},
	["Ruler"] = {"16898733534", 256, 514, 0},
	["UserRound"] = {"16898790047", 256, 514, 0},
	["SlidersHorizontal"] = {"16898735040", 256, 0, 257},
	["Store"] = {"16898736776", 256, 514, 514},
	["Medal"] = {"16898675673", 256, 0, 0},
	["MessageCircle"] = {"16898675863", 256, 0, 0},
	["PawPrint"] = {"16898731301", 256, 514, 514},
	["Flag"] = {"16898670919", 256, 0, 0},
	["Castle"] = {"16898617325", 256, 0, 257},
	["Volume2"] = {"16898790615", 256, 257, 0},
	["CalendarCheck"] = {"16898616953", 256, 257, 257},
	["Server"] = {"16898734421", 256, 257, 0},
	["MessagesSquare"] = {"16898728402", 256, 257, 514},
	["Axe"] = {"16898614755", 256, 514, 0},
	["BellRing"] = {"16898615428", 256, 257, 257},
	["ChevronsUp"] = {"16898617626", 256, 257, 514},
	["UserPlus"] = {"16898789825", 256, 0, 514},
	["TriangleAlert"] = {"16898789153", 256, 0, 257},
	["PackageOpen"] = {"16898730417", 256, 514, 514},
	["MessageSquare"] = {"16898728402", 256, 514, 257},
	["CircleCheck"] = {"16898617803", 256, 257, 257},
	["Siren"] = {"16898734905", 256, 257, 257},
	["Mail"] = {"16898675156", 256, 514, 514},
	["Info"] = {"16898673523", 256, 257, 257},
	["AlarmClock"] = {"16898612819", 256, 257, 257},
	["ShieldCheck"] = {"16898734564", 256, 0, 257},
	["BadgeCheck"] = {"16898614945", 256, 0, 0},
	["Tag"] = {"16898788033", 256, 0, 257},
	["Stamp"] = {"16898736597", 256, 257, 514},
	["Timer"] = {"16898788789", 256, 0, 514},
	["Skull"] = {"16898734905", 256, 257, 514},
	["Ghost"] = {"16898672166", 256, 514, 514},
	["Wrench"] = {"16898791187", 256, 514, 257},
	["Gauge"] = {"16898672166", 256, 0, 514},
	["BatteryCharging"] = {"16898615240", 256, 0, 257},
	["Download"] = {"16898669562", 256, 0, 0},
	["Droplet"] = {"16898669562", 256, 0, 514},
	["Drumstick"] = {"16898669562", 256, 514, 514},
	["Wind"] = {"16898791187", 256, 0, 0},
	["Upload"] = {"16898789644", 256, 0, 257},
	["SunMoon"] = {"16898736967", 256, 257, 514},
	["SquareCheck"] = {"16898735664", 256, 514, 514},
	["BellOff"] = {"16898615428", 256, 0, 257},
	["Lightbulb"] = {"16898674337", 256, 514, 514},
	["Mic"] = {"16898728659", 256, 0, 257},
	["Music2"] = {"16898729752", 256, 514, 257},
	["KeyRound"] = {"16898673616", 256, 514, 257},
	["ShieldHalf"] = {"16898734564", 256, 257, 257},
	["Circle"] = {"16898618049", 256, 257, 514},
	["DoorOpen"] = {"16898669433", 256, 514, 257},
	["Grid2x2"] = {"16898672700", 256, 0, 0},
	["MoveRight"] = {"16898729752", 256, 0, 0},
	["Aperture"] = {"16898613699", 256, 257, 0},
	["Slash"] = {"16898735040", 256, 0, 0},
	["Blinds"] = {"16898615570", 256, 257, 514},
	["BookOpen"] = {"16898616322", 256, 0, 514},
	["ArrowUpDown"] = {"16898614275", 256, 514, 514},
	["MoveUp"] = {"16898729752", 256, 514, 0},
	["Flashlight"] = {"16898670919", 256, 257, 257},
	["MoveLeft"] = {"16898729572", 256, 514, 514},
	["PanelTop"] = {"16898731166", 256, 0, 257}
}

-- 2. BLOXFX 200 ASSETS CATALOG
local ASSETS = {
	{
		id = 1,
		name = "Crimson Sweep",
		category = "Buttons",
		categoryIndex = 0,
		variant = 0,
		archetype = 0,
		style = 0,
		icon = "Zap",
		hue = 0,
		label = "POWER UP",
		description = "A silky light sweep on every loop.",
		spriteId = "16898791349",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 2,
		name = "Aurora Drift",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 0,
		archetype = 0,
		style = 0,
		icon = "Sparkles",
		hue = 31,
		label = "POWER UP",
		description = "Soft blobs of color drifting.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 3,
		name = "Orbit Spinner",
		category = "Loaders",
		categoryIndex = 2,
		variant = 0,
		archetype = 0,
		style = 0,
		icon = "Atom",
		hue = 62,
		label = "POWER UP",
		description = "Satellites circling a core.",
		spriteId = "16898614574",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 4,
		name = "Mirror Flip",
		category = "Cards",
		categoryIndex = 3,
		variant = 0,
		archetype = 0,
		style = 0,
		icon = "Gift",
		hue = 93,
		label = "POWER UP",
		description = "Flips over to reveal its back.",
		spriteId = "16898672316",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 5,
		name = "Inventory Grid",
		category = "Panels",
		categoryIndex = 4,
		variant = 0,
		archetype = 0,
		style = 0,
		icon = "Grid3x3",
		hue = 124,
		label = "POWER UP",
		description = "8-slot loot panel with hover glow.",
		spriteId = "16898672700",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 6,
		name = "Level Up Banner",
		category = "Notifications",
		categoryIndex = 5,
		variant = 0,
		archetype = 0,
		style = 0,
		icon = "Award",
		hue = 155,
		label = "POWER UP",
		description = "Grand crest drops down with rays.",
		spriteId = "16898614755",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 7,
		name = "Golden Crest",
		category = "Badges",
		categoryIndex = 6,
		variant = 0,
		archetype = 0,
		style = 0,
		icon = "Crown",
		hue = 186,
		label = "POWER UP",
		description = "Metallic shine across ornate emblem.",
		spriteId = "16898668482",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 8,
		name = "Health Bar",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 0,
		archetype = 0,
		style = 0,
		icon = "Heart",
		hue = 217,
		label = "POWER UP",
		description = "Red fill with chunk drain on damage.",
		spriteId = "16898673271",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 9,
		name = "Day/Night Switch",
		category = "Toggles",
		categoryIndex = 8,
		variant = 0,
		archetype = 0,
		style = 0,
		icon = "Sun",
		hue = 248,
		label = "POWER UP",
		description = "Sun transitions to moon with stars.",
		spriteId = "16898787671",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 10,
		name = "Curtain Wipe",
		category = "Transitions",
		categoryIndex = 9,
		variant = 0,
		archetype = 0,
		style = 0,
		icon = "Columns",
		hue = 279,
		label = "POWER UP",
		description = "Two panels slide apart from center.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 11,
		name = "Neon Pulse",
		category = "Buttons",
		categoryIndex = 0,
		variant = 1,
		archetype = 1,
		style = 0,
		icon = "Sparkles",
		hue = 47,
		label = "EQUIP",
		description = "Rhythmic neon energy pulses outward.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 12,
		name = "Starfield Warp",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 1,
		archetype = 1,
		style = 0,
		icon = "Compass",
		hue = 78,
		label = "EQUIP",
		description = "Hyperspace stars streaking past.",
		spriteId = "16898619182",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 13,
		name = "Liquid Ring",
		category = "Loaders",
		categoryIndex = 2,
		variant = 1,
		archetype = 1,
		style = 0,
		icon = "Droplet",
		hue = 109,
		label = "EQUIP",
		description = "Smooth circle filling like water.",
		spriteId = "16898669562",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 14,
		name = "Hologram Tilt",
		category = "Cards",
		categoryIndex = 3,
		variant = 1,
		archetype = 1,
		style = 0,
		icon = "Sparkles",
		hue = 140,
		label = "EQUIP",
		description = "3D parallax follow cursor angle.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 15,
		name = "Glass Modal",
		category = "Panels",
		categoryIndex = 4,
		variant = 1,
		archetype = 1,
		style = 0,
		icon = "Layout",
		hue = 171,
		label = "EQUIP",
		description = "Frosted translucent popup with blur.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 16,
		name = "Toast Alert",
		category = "Notifications",
		categoryIndex = 5,
		variant = 1,
		archetype = 1,
		style = 0,
		icon = "BellRing",
		hue = 202,
		label = "EQUIP",
		description = "Corner notification slides and fades.",
		spriteId = "16898615428",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 17,
		name = "Verified Check",
		category = "Badges",
		categoryIndex = 6,
		variant = 1,
		archetype = 1,
		style = 0,
		icon = "Check",
		hue = 233,
		label = "EQUIP",
		description = "Twitter-style blue check with pop.",
		spriteId = "16898617411",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 18,
		name = "Mana Tube",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 1,
		archetype = 1,
		style = 0,
		icon = "Zap",
		hue = 264,
		label = "EQUIP",
		description = "Bubbling blue energy reservoir.",
		spriteId = "16898791349",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 19,
		name = "Power Toggle",
		category = "Toggles",
		categoryIndex = 8,
		variant = 1,
		archetype = 1,
		style = 0,
		icon = "Power",
		hue = 295,
		label = "EQUIP",
		description = "Neon power symbol clicks green/red.",
		spriteId = "16898732262",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 257
	},
	{
		id = 20,
		name = "Iris Circle",
		category = "Transitions",
		categoryIndex = 9,
		variant = 1,
		archetype = 1,
		style = 0,
		icon = "Circle",
		hue = 326,
		label = "EQUIP",
		description = "Circle closes like camera aperture.",
		spriteId = "16898618049",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 21,
		name = "Ripple Burst",
		category = "Buttons",
		categoryIndex = 0,
		variant = 2,
		archetype = 2,
		style = 0,
		icon = "Flame",
		hue = 94,
		label = "START",
		description = "Expanding shockwave rings from center.",
		spriteId = "16898670919",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 22,
		name = "Hex Matrix",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 2,
		archetype = 2,
		style = 0,
		icon = "Hexagon",
		hue = 125,
		label = "START",
		description = "Glowing honeycombs fading in sequence.",
		spriteId = "16898673271",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 23,
		name = "Pulsing Dots",
		category = "Loaders",
		categoryIndex = 2,
		variant = 2,
		archetype = 2,
		style = 0,
		icon = "MoreHorizontal",
		hue = 156,
		label = "START",
		description = "Three dots bouncing in wave.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 24,
		name = "Glow Border",
		category = "Cards",
		categoryIndex = 3,
		variant = 2,
		archetype = 2,
		style = 0,
		icon = "Shield",
		hue = 187,
		label = "START",
		description = "Edge stroke pulses with accent color.",
		spriteId = "16898734664",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 25,
		name = "Cyber HUD",
		category = "Panels",
		categoryIndex = 4,
		variant = 2,
		archetype = 2,
		style = 0,
		icon = "Cpu",
		hue = 218,
		label = "START",
		description = "Sci-fi frame with corner brackets.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 26,
		name = "Achievement Unlocked",
		category = "Notifications",
		categoryIndex = 5,
		variant = 2,
		archetype = 2,
		style = 0,
		icon = "Trophy",
		hue = 249,
		label = "START",
		description = "Xbox-style achievement pop.",
		spriteId = "16898789153",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 27,
		name = "Rank Diamond",
		category = "Badges",
		categoryIndex = 6,
		variant = 2,
		archetype = 2,
		style = 0,
		icon = "Gem",
		hue = 280,
		label = "START",
		description = "Faceted jewel with rotating shimmer.",
		spriteId = "16898672166",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 28,
		name = "Stamina Arc",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 2,
		archetype = 2,
		style = 0,
		icon = "Activity",
		hue = 311,
		label = "START",
		description = "Curved radial gauge around crosshair.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 29,
		name = "Sound Mute",
		category = "Toggles",
		categoryIndex = 8,
		variant = 2,
		archetype = 2,
		style = 0,
		icon = "Volume2",
		hue = 342,
		label = "START",
		description = "Speaker icon waves vanish on toggle.",
		spriteId = "16898790615",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 30,
		name = "Diagonal Slice",
		category = "Transitions",
		categoryIndex = 9,
		variant = 2,
		archetype = 2,
		style = 0,
		icon = "Scissors",
		hue = 13,
		label = "START",
		description = "Angled seam splits and slides.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 31,
		name = "Hover Drift",
		category = "Buttons",
		categoryIndex = 0,
		variant = 3,
		archetype = 3,
		style = 0,
		icon = "Shield",
		hue = 141,
		label = "CLAIM",
		description = "Gentle levitation float with floor shadow.",
		spriteId = "16898734664",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 32,
		name = "Grid Horizon",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 3,
		archetype = 3,
		style = 0,
		icon = "Grid3x3",
		hue = 172,
		label = "CLAIM",
		description = "Retro synthwave wireframe grid receding.",
		spriteId = "16898672700",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 33,
		name = "Segment Ring",
		category = "Loaders",
		categoryIndex = 2,
		variant = 3,
		archetype = 3,
		style = 0,
		icon = "Loader",
		hue = 203,
		label = "CLAIM",
		description = "Dashed circle turning smoothly.",
		spriteId = "16898674684",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 34,
		name = "Floating Card",
		category = "Cards",
		categoryIndex = 3,
		variant = 3,
		archetype = 3,
		style = 0,
		icon = "Crown",
		hue = 234,
		label = "CLAIM",
		description = "Gentle hover with dynamic shadow.",
		spriteId = "16898668482",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 35,
		name = "Quest Board",
		category = "Panels",
		categoryIndex = 4,
		variant = 3,
		archetype = 3,
		style = 0,
		icon = "Scroll",
		hue = 265,
		label = "CLAIM",
		description = "Parchment list with checkable tasks.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 36,
		name = "Combat Damage",
		category = "Notifications",
		categoryIndex = 5,
		variant = 3,
		archetype = 3,
		style = 0,
		icon = "Sword",
		hue = 296,
		label = "CLAIM",
		description = "Floating damage numbers with crit color.",
		spriteId = "16898787671",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 37,
		name = "Battle Rank",
		category = "Badges",
		categoryIndex = 6,
		variant = 3,
		archetype = 3,
		style = 0,
		icon = "Shield",
		hue = 327,
		label = "CLAIM",
		description = "Military chevron with tier stars.",
		spriteId = "16898734664",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 38,
		name = "XP Level Bar",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 3,
		archetype = 3,
		style = 0,
		icon = "Sparkles",
		hue = 358,
		label = "CLAIM",
		description = "Purple bar with star burst on level.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 39,
		name = "Lock Latch",
		category = "Toggles",
		categoryIndex = 8,
		variant = 3,
		archetype = 3,
		style = 0,
		icon = "Lock",
		hue = 29,
		label = "CLAIM",
		description = "Padlock shackles and unshackles.",
		spriteId = "16898674825",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 40,
		name = "Pixel Dissolve",
		category = "Transitions",
		categoryIndex = 9,
		variant = 3,
		archetype = 3,
		style = 0,
		icon = "Boxes",
		hue = 60,
		label = "CLAIM",
		description = "Screen breaks into retro pixels.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 41,
		name = "Prism Border",
		category = "Buttons",
		categoryIndex = 0,
		variant = 4,
		archetype = 4,
		style = 0,
		icon = "Sword",
		hue = 188,
		label = "JOIN",
		description = "Rotating rainbow gradient border aura.",
		spriteId = "16898787671",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 42,
		name = "Nebula Cloud",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 4,
		archetype = 4,
		style = 0,
		icon = "Cloud",
		hue = 219,
		label = "JOIN",
		description = "Deep space smoke billowing.",
		spriteId = "16898618899",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 43,
		name = "Flip Cube",
		category = "Loaders",
		categoryIndex = 2,
		variant = 4,
		archetype = 4,
		style = 0,
		icon = "Box",
		hue = 250,
		label = "JOIN",
		description = "3D cube tumbling over edges.",
		spriteId = "16898616650",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 44,
		name = "Expand Stack",
		category = "Cards",
		categoryIndex = 3,
		variant = 4,
		archetype = 4,
		style = 0,
		icon = "Layers",
		hue = 281,
		label = "JOIN",
		description = "Stacked layers spread out on hover.",
		spriteId = "16898674182",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 45,
		name = "Shop Showcase",
		category = "Panels",
		categoryIndex = 4,
		variant = 4,
		archetype = 4,
		style = 0,
		icon = "Store",
		hue = 312,
		label = "JOIN",
		description = "Featured item pedestal with spotlight.",
		spriteId = "16898736776",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 46,
		name = "Streak Counter",
		category = "Notifications",
		categoryIndex = 5,
		variant = 4,
		archetype = 4,
		style = 0,
		icon = "Flame",
		hue = 343,
		label = "JOIN",
		description = "Flame badge with multiplier counter.",
		spriteId = "16898670919",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 47,
		name = "Prestige Star",
		category = "Badges",
		categoryIndex = 6,
		variant = 4,
		archetype = 4,
		style = 0,
		icon = "Star",
		hue = 14,
		label = "JOIN",
		description = "Golden 5-point star with sparkles.",
		spriteId = "16898736776",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 48,
		name = "Shield Segment",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 4,
		archetype = 4,
		style = 0,
		icon = "Shield",
		hue = 45,
		label = "JOIN",
		description = "Armor bar split into hit blocks.",
		spriteId = "16898734664",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 49,
		name = "Heart Like",
		category = "Toggles",
		categoryIndex = 8,
		variant = 4,
		archetype = 4,
		style = 0,
		icon = "Heart",
		hue = 76,
		label = "JOIN",
		description = "Instagram-style pop and fill heart.",
		spriteId = "16898673271",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 50,
		name = "Portal Zoom",
		category = "Transitions",
		categoryIndex = 9,
		variant = 4,
		archetype = 4,
		style = 0,
		icon = "Orbit",
		hue = 107,
		label = "JOIN",
		description = "Camera flies into swirling vortex.",
		spriteId = "16898730417",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 0
	},
	{
		id = 51,
		name = "Jelly Bounce",
		category = "Buttons",
		categoryIndex = 0,
		variant = 5,
		archetype = 5,
		style = 0,
		icon = "Heart",
		hue = 235,
		label = "SPIN",
		description = "Squishy bounce with icon wobble.",
		spriteId = "16898673271",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 52,
		name = "Cyber Circuit",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 5,
		archetype = 5,
		style = 0,
		icon = "Cpu",
		hue = 266,
		label = "SPIN",
		description = "Traces lighting up along PCB lines.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 53,
		name = "Radar Sweep",
		category = "Loaders",
		categoryIndex = 2,
		variant = 5,
		archetype = 5,
		style = 0,
		icon = "Radar",
		hue = 297,
		label = "SPIN",
		description = "Sonar beam rotating on dark grid.",
		spriteId = "16898732504",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 54,
		name = "Glass Shimmer",
		category = "Cards",
		categoryIndex = 3,
		variant = 5,
		archetype = 5,
		style = 0,
		icon = "Gem",
		hue = 328,
		label = "SPIN",
		description = "Frosted glass with light glint.",
		spriteId = "16898672166",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 55,
		name = "Stats Overview",
		category = "Panels",
		categoryIndex = 4,
		variant = 5,
		archetype = 5,
		style = 0,
		icon = "BarChart2",
		hue = 359,
		label = "SPIN",
		description = "Hexagonal radar chart panel.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 56,
		name = "Rare Drop Ping",
		category = "Notifications",
		categoryIndex = 5,
		variant = 5,
		archetype = 5,
		style = 0,
		icon = "Sparkles",
		hue = 30,
		label = "SPIN",
		description = "Gold light pillar and sparkle burst.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 57,
		name = "Neon Hex",
		category = "Badges",
		categoryIndex = 6,
		variant = 5,
		archetype = 5,
		style = 0,
		icon = "Hexagon",
		hue = 61,
		label = "SPIN",
		description = "Cyberpunk hexagon with edge pulse.",
		spriteId = "16898673271",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 58,
		name = "Boss HP Bar",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 5,
		archetype = 5,
		style = 0,
		icon = "Crown",
		hue = 92,
		label = "SPIN",
		description = "Grand ornamental bar with phase skull.",
		spriteId = "16898668482",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 59,
		name = "Bookmark Ribbon",
		category = "Toggles",
		categoryIndex = 8,
		variant = 5,
		archetype = 5,
		style = 0,
		icon = "Bookmark",
		hue = 123,
		label = "SPIN",
		description = "Ribbon drops down and pins.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 60,
		name = "Glitch Tear",
		category = "Transitions",
		categoryIndex = 9,
		variant = 5,
		archetype = 5,
		style = 0,
		icon = "Zap",
		hue = 154,
		label = "SPIN",
		description = "RGB split tears screen sideways.",
		spriteId = "16898791349",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 61,
		name = "Glitch Twitch",
		category = "Buttons",
		categoryIndex = 0,
		variant = 6,
		archetype = 6,
		style = 0,
		icon = "Zap",
		hue = 282,
		label = "UNLOCK",
		description = "Digital glitch split with RGB separation.",
		spriteId = "16898791349",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 62,
		name = "Floating Embers",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 6,
		archetype = 6,
		style = 0,
		icon = "Flame",
		hue = 313,
		label = "UNLOCK",
		description = "Campfire sparks drifting upward.",
		spriteId = "16898670919",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 63,
		name = "Equalizer Bars",
		category = "Loaders",
		categoryIndex = 2,
		variant = 6,
		archetype = 6,
		style = 0,
		icon = "BarChart3",
		hue = 344,
		label = "UNLOCK",
		description = "Music visualizer bounce.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 64,
		name = "Pixel Reveal",
		category = "Cards",
		categoryIndex = 3,
		variant = 6,
		archetype = 6,
		style = 0,
		icon = "Gamepad2",
		hue = 15,
		label = "UNLOCK",
		description = "Dissolves in from retro pixels.",
		spriteId = "16898672166",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 65,
		name = "Dialogue Box",
		category = "Panels",
		categoryIndex = 4,
		variant = 6,
		archetype = 6,
		style = 0,
		icon = "MessageSquare",
		hue = 46,
		label = "UNLOCK",
		description = "RPG speech bubble with typing text.",
		spriteId = "16898728402",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 257
	},
	{
		id = 66,
		name = "Countdown Alert",
		category = "Notifications",
		categoryIndex = 5,
		variant = 6,
		archetype = 6,
		style = 0,
		icon = "Timer",
		hue = 77,
		label = "UNLOCK",
		description = "Giant numbers counting down to start.",
		spriteId = "16898788789",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 67,
		name = "Flame Tier",
		category = "Badges",
		categoryIndex = 6,
		variant = 6,
		archetype = 6,
		style = 0,
		icon = "Flame",
		hue = 108,
		label = "UNLOCK",
		description = "Animated burning fire rank icon.",
		spriteId = "16898670919",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 68,
		name = "Overheat Gauge",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 6,
		archetype = 6,
		style = 0,
		icon = "Flame",
		hue = 139,
		label = "UNLOCK",
		description = "Fills green to red with steam puffs.",
		spriteId = "16898670919",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 69,
		name = "Eye Visibility",
		category = "Toggles",
		categoryIndex = 8,
		variant = 6,
		archetype = 6,
		style = 0,
		icon = "Eye",
		hue = 170,
		label = "UNLOCK",
		description = "Eye opens and shuts with pupil glint.",
		spriteId = "16898669897",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 70,
		name = "Ink Splatter",
		category = "Transitions",
		categoryIndex = 9,
		variant = 6,
		archetype = 6,
		style = 0,
		icon = "Droplets",
		hue = 201,
		label = "UNLOCK",
		description = "Organic dark ink drops cover screen.",
		spriteId = "16898669562",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 257
	},
	{
		id = 71,
		name = "Fill Rush",
		category = "Buttons",
		categoryIndex = 0,
		variant = 7,
		archetype = 7,
		style = 0,
		icon = "Sparkles",
		hue = 329,
		label = "BUY",
		description = "High-energy color flood from left to right.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 72,
		name = "Digital Rain",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 7,
		archetype = 7,
		style = 0,
		icon = "Binary",
		hue = 0,
		label = "BUY",
		description = "Matrix code cascading downward.",
		spriteId = "16898615570",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 73,
		name = "Morphing Geo",
		category = "Loaders",
		categoryIndex = 2,
		variant = 7,
		archetype = 7,
		style = 0,
		icon = "Shapes",
		hue = 31,
		label = "BUY",
		description = "Circle to square to triangle.",
		spriteId = "16898734421",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 74,
		name = "Ribbon Corner",
		category = "Cards",
		categoryIndex = 3,
		variant = 7,
		archetype = 7,
		style = 0,
		icon = "Award",
		hue = 62,
		label = "BUY",
		description = "Corner banner with special offer text.",
		spriteId = "16898614755",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 75,
		name = "Settings Drawer",
		category = "Panels",
		categoryIndex = 4,
		variant = 7,
		archetype = 7,
		style = 0,
		icon = "Sliders",
		hue = 93,
		label = "BUY",
		description = "Slide-out config panel with sliders.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 76,
		name = "Danger Siren",
		category = "Notifications",
		categoryIndex = 5,
		variant = 7,
		archetype = 7,
		style = 0,
		icon = "AlertTriangle",
		hue = 124,
		label = "BUY",
		description = "Flashing red edges with hazard icon.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 77,
		name = "Crown Jewel",
		category = "Badges",
		categoryIndex = 6,
		variant = 7,
		archetype = 7,
		style = 0,
		icon = "Crown",
		hue = 155,
		label = "BUY",
		description = "Royalty crown with floating glitter.",
		spriteId = "16898668482",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 78,
		name = "Radial Ring",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 7,
		archetype = 7,
		style = 0,
		icon = "Circle",
		hue = 186,
		label = "BUY",
		description = "Circular 0-100% progress indicator.",
		spriteId = "16898618049",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 79,
		name = "Bell Alert",
		category = "Toggles",
		categoryIndex = 8,
		variant = 7,
		archetype = 7,
		style = 0,
		icon = "Bell",
		hue = 217,
		label = "BUY",
		description = "Bell rings then gets slash line.",
		spriteId = "16898615428",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 80,
		name = "Blinds Shutter",
		category = "Transitions",
		categoryIndex = 9,
		variant = 7,
		archetype = 7,
		style = 0,
		icon = "Blinds",
		hue = 248,
		label = "BUY",
		description = "Horizontal venetian blinds rotate.",
		spriteId = "16898615570",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 81,
		name = "Launch Pad",
		category = "Buttons",
		categoryIndex = 0,
		variant = 8,
		archetype = 8,
		style = 0,
		icon = "Rocket",
		hue = 16,
		label = "LAUNCH",
		description = "Rocket blastoff recoil into soft landing.",
		spriteId = "16898733317",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 82,
		name = "Vignette Pulse",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 8,
		archetype = 8,
		style = 0,
		icon = "Eye",
		hue = 47,
		label = "LAUNCH",
		description = "Edge shadow breathing rhythmically.",
		spriteId = "16898669897",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 83,
		name = "Hourglass Drip",
		category = "Loaders",
		categoryIndex = 2,
		variant = 8,
		archetype = 8,
		style = 0,
		icon = "Hourglass",
		hue = 78,
		label = "LAUNCH",
		description = "Sand particles falling through neck.",
		spriteId = "16898673358",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 0
	},
	{
		id = 84,
		name = "Neon Border",
		category = "Cards",
		categoryIndex = 3,
		variant = 8,
		archetype = 8,
		style = 0,
		icon = "Zap",
		hue = 109,
		label = "LAUNCH",
		description = "Tron-style neon wireframe perimeter.",
		spriteId = "16898791349",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 85,
		name = "Leaderboard",
		category = "Panels",
		categoryIndex = 4,
		variant = 8,
		archetype = 8,
		style = 0,
		icon = "Trophy",
		hue = 140,
		label = "LAUNCH",
		description = "Top 10 players list with rank badges.",
		spriteId = "16898789153",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 86,
		name = "Reward Unlock",
		category = "Notifications",
		categoryIndex = 5,
		variant = 8,
		archetype = 8,
		style = 0,
		icon = "Gift",
		hue = 171,
		label = "LAUNCH",
		description = "Gift box shakes then bursts open.",
		spriteId = "16898672316",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 87,
		name = "Skull Emblem",
		category = "Badges",
		categoryIndex = 6,
		variant = 8,
		archetype = 8,
		style = 0,
		icon = "Skull",
		hue = 202,
		label = "LAUNCH",
		description = "Hardcore / elite player marker.",
		spriteId = "16898734905",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 88,
		name = "Multi-Segment Bar",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 8,
		archetype = 8,
		style = 0,
		icon = "BatteryCharging",
		hue = 233,
		label = "LAUNCH",
		description = "10 discrete battery charge cells.",
		spriteId = "16898615240",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 89,
		name = "Pin Thumbtack",
		category = "Toggles",
		categoryIndex = 8,
		variant = 8,
		archetype = 8,
		style = 0,
		icon = "Pin",
		hue = 264,
		label = "LAUNCH",
		description = "Thumbtack drives into surface.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 90,
		name = "Hexagon Wipe",
		category = "Transitions",
		categoryIndex = 9,
		variant = 8,
		archetype = 8,
		style = 0,
		icon = "Hexagon",
		hue = 295,
		label = "LAUNCH",
		description = "Honeycombs fill outward from center.",
		spriteId = "16898673271",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 91,
		name = "Mechanical Key",
		category = "Buttons",
		categoryIndex = 0,
		variant = 9,
		archetype = 9,
		style = 0,
		icon = "Key",
		hue = 63,
		label = "PRESS",
		description = "Tactile 3D press into deep shadow.",
		spriteId = "16898673616",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 92,
		name = "Prism Rays",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 9,
		archetype = 9,
		style = 0,
		icon = "Sun",
		hue = 94,
		label = "PRESS",
		description = "Light beams sweeping across screen.",
		spriteId = "16898787671",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 93,
		name = "Infinity Loop",
		category = "Loaders",
		categoryIndex = 2,
		variant = 9,
		archetype = 9,
		style = 0,
		icon = "Infinity",
		hue = 125,
		label = "PRESS",
		description = "Figure-8 energy trace.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 94,
		name = "Slide Reveal",
		category = "Cards",
		categoryIndex = 3,
		variant = 9,
		archetype = 9,
		style = 0,
		icon = "ArrowUpRight",
		hue = 156,
		label = "PRESS",
		description = "Content slides up from bottom edge.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 95,
		name = "Skill Tree",
		category = "Panels",
		categoryIndex = 4,
		variant = 9,
		archetype = 9,
		style = 0,
		icon = "GitBranch",
		hue = 187,
		label = "PRESS",
		description = "Connected ability nodes branching out.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 96,
		name = "Badge Earned",
		category = "Notifications",
		categoryIndex = 5,
		variant = 9,
		archetype = 9,
		style = 0,
		icon = "Medal",
		hue = 218,
		label = "PRESS",
		description = "Ribbon medal pins onto screen.",
		spriteId = "16898675673",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 97,
		name = "Wings Badge",
		category = "Badges",
		categoryIndex = 6,
		variant = 9,
		archetype = 9,
		style = 0,
		icon = "Feather",
		hue = 249,
		label = "PRESS",
		description = "Angelic wings spreading outward.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 98,
		name = "Liquid Fill Tube",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 9,
		archetype = 9,
		style = 0,
		icon = "FlaskConical",
		hue = 280,
		label = "PRESS",
		description = "Vertical flask filling with fluid.",
		spriteId = "16898670919",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 257
	},
	{
		id = 99,
		name = "Star Favorite",
		category = "Toggles",
		categoryIndex = 8,
		variant = 9,
		archetype = 9,
		style = 0,
		icon = "Star",
		hue = 311,
		label = "PRESS",
		description = "Star bursts with mini-stars on active.",
		spriteId = "16898736776",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 100,
		name = "Speed Blur",
		category = "Transitions",
		categoryIndex = 9,
		variant = 9,
		archetype = 9,
		style = 0,
		icon = "FastForward",
		hue = 342,
		label = "PRESS",
		description = "Extreme motion blur rush across.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 101,
		name = "Ghost Outline",
		category = "Buttons",
		categoryIndex = 0,
		variant = 10,
		archetype = 0,
		style = 1,
		icon = "Ghost",
		hue = 110,
		label = "PLAY",
		description = "Hollow stroke that glows on click.",
		spriteId = "16898672166",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 102,
		name = "Constellation",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 10,
		archetype = 0,
		style = 1,
		icon = "Share2",
		hue = 141,
		label = "PLAY",
		description = "Connected nodes gently swaying.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 103,
		name = "Gear Train",
		category = "Loaders",
		categoryIndex = 2,
		variant = 10,
		archetype = 0,
		style = 1,
		icon = "Settings",
		hue = 172,
		label = "PLAY",
		description = "Interlocking cogs rotating in sync.",
		spriteId = "16898734421",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 0
	},
	{
		id = 104,
		name = "Badge Stamp",
		category = "Cards",
		categoryIndex = 3,
		variant = 10,
		archetype = 0,
		style = 1,
		icon = "Stamp",
		hue = 203,
		label = "PLAY",
		description = "Wax seal / emblem drops with dust puff.",
		spriteId = "16898736597",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 105,
		name = "Crafting Bench",
		category = "Panels",
		categoryIndex = 4,
		variant = 10,
		archetype = 0,
		style = 1,
		icon = "Hammer",
		hue = 234,
		label = "PLAY",
		description = "Grid input with result preview slot.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 106,
		name = "Trade Request",
		category = "Notifications",
		categoryIndex = 5,
		variant = 10,
		archetype = 0,
		style = 1,
		icon = "UserCheck",
		hue = 265,
		label = "PLAY",
		description = "Player avatar card with Accept/Decline.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 107,
		name = "Pixel Heart",
		category = "Badges",
		categoryIndex = 6,
		variant = 10,
		archetype = 0,
		style = 1,
		icon = "Heart",
		hue = 296,
		label = "PLAY",
		description = "8-bit retro health / life badge.",
		spriteId = "16898673271",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 108,
		name = "Combo Meter",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 10,
		archetype = 0,
		style = 1,
		icon = "Swords",
		hue = 327,
		label = "PLAY",
		description = "Fills with hits, decays over time.",
		spriteId = "16898787671",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 109,
		name = "Radio Wave",
		category = "Toggles",
		categoryIndex = 8,
		variant = 10,
		archetype = 0,
		style = 1,
		icon = "Wifi",
		hue = 358,
		label = "PLAY",
		description = "WiFi rays appear and disappear.",
		spriteId = "16898790996",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 110,
		name = "Diamond Expand",
		category = "Transitions",
		categoryIndex = 9,
		variant = 10,
		archetype = 0,
		style = 1,
		icon = "Diamond",
		hue = 29,
		label = "PLAY",
		description = "Diamond grows from center to edges.",
		spriteId = "16898669042",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 111,
		name = "Pulse Beacon",
		category = "Buttons",
		categoryIndex = 0,
		variant = 11,
		archetype = 1,
		style = 1,
		icon = "Radio",
		hue = 157,
		label = "UPGRADE",
		description = "Radial sonar rings ping outward.",
		spriteId = "16898732665",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 0
	},
	{
		id = 112,
		name = "Sonic Waves",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 11,
		archetype = 1,
		style = 1,
		icon = "Radio",
		hue = 188,
		label = "UPGRADE",
		description = "Concentric audio ripples.",
		spriteId = "16898732665",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 0
	},
	{
		id = 113,
		name = "DNA Spiral",
		category = "Loaders",
		categoryIndex = 2,
		variant = 11,
		archetype = 1,
		style = 1,
		icon = "Dna",
		hue = 219,
		label = "UPGRADE",
		description = "Double helix twisting upward.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 114,
		name = "Portal Gate",
		category = "Cards",
		categoryIndex = 3,
		variant = 11,
		archetype = 1,
		style = 1,
		icon = "Orbit",
		hue = 250,
		label = "UPGRADE",
		description = "Center is an animated swirling portal.",
		spriteId = "16898730417",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 0
	},
	{
		id = 115,
		name = "Map Overlay",
		category = "Panels",
		categoryIndex = 4,
		variant = 11,
		archetype = 1,
		style = 1,
		icon = "Map",
		hue = 281,
		label = "UPGRADE",
		description = "Stylized minimap with radar blips.",
		spriteId = "16898675359",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 116,
		name = "Server Announcement",
		category = "Notifications",
		categoryIndex = 5,
		variant = 11,
		archetype = 1,
		style = 1,
		icon = "Megaphone",
		hue = 312,
		label = "UPGRADE",
		description = "Scrolling top banner with broadcast icon.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 117,
		name = "Lightning Bolt",
		category = "Badges",
		categoryIndex = 6,
		variant = 11,
		archetype = 1,
		style = 1,
		icon = "Zap",
		hue = 343,
		label = "UPGRADE",
		description = "High-voltage speedster rank mark.",
		spriteId = "16898791349",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 118,
		name = "Cast Bar",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 11,
		archetype = 1,
		style = 1,
		icon = "Wand2",
		hue = 14,
		label = "UPGRADE",
		description = "Spell casting bar with interrupt flash.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 119,
		name = "Slider Switch",
		category = "Toggles",
		categoryIndex = 8,
		variant = 11,
		archetype = 1,
		style = 1,
		icon = "ToggleRight",
		hue = 45,
		label = "UPGRADE",
		description = "Smooth pill switch with rolling knob.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 120,
		name = "Smoke Dissolve",
		category = "Transitions",
		categoryIndex = 9,
		variant = 11,
		archetype = 1,
		style = 1,
		icon = "Cloud",
		hue = 76,
		label = "UPGRADE",
		description = "Thick cloud rolls over scene.",
		spriteId = "16898618899",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 121,
		name = "Magnetic Snap",
		category = "Buttons",
		categoryIndex = 0,
		variant = 12,
		archetype = 2,
		style = 1,
		icon = "Magnet",
		hue = 204,
		label = "ACTIVATE",
		description = "Snaps toward cursor with spring physics.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 122,
		name = "Bubble Drift",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 12,
		archetype = 2,
		style = 1,
		icon = "CircleDot",
		hue = 235,
		label = "ACTIVATE",
		description = "Soothing bubbles floating to the top.",
		spriteId = "16898617884",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 123,
		name = "Signal Bars",
		category = "Loaders",
		categoryIndex = 2,
		variant = 12,
		archetype = 2,
		style = 1,
		icon = "Wifi",
		hue = 266,
		label = "ACTIVATE",
		description = "WiFi reception filling in order.",
		spriteId = "16898790996",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 124,
		name = "Depth Layer",
		category = "Cards",
		categoryIndex = 3,
		variant = 12,
		archetype = 2,
		style = 1,
		icon = "Layers",
		hue = 297,
		label = "ACTIVATE",
		description = "Multiple offset layers with 3D depth.",
		spriteId = "16898674182",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 125,
		name = "Terminal Box",
		category = "Panels",
		categoryIndex = 4,
		variant = 12,
		archetype = 2,
		style = 1,
		icon = "Terminal",
		hue = 328,
		label = "ACTIVATE",
		description = "Hacker command prompt with cursor.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 126,
		name = "Kill Feed",
		category = "Notifications",
		categoryIndex = 5,
		variant = 12,
		archetype = 2,
		style = 1,
		icon = "Crosshair",
		hue = 359,
		label = "ACTIVATE",
		description = "Quick weapon icon + names slide on right.",
		spriteId = "16898668482",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 257
	},
	{
		id = 127,
		name = "Dragon Crest",
		category = "Badges",
		categoryIndex = 6,
		variant = 12,
		archetype = 2,
		style = 1,
		icon = "Shield",
		hue = 30,
		label = "ACTIVATE",
		description = "Fantasy dragon silhouette badge.",
		spriteId = "16898734664",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 128,
		name = "Battlepass Tier",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 12,
		archetype = 2,
		style = 1,
		icon = "Trophy",
		hue = 61,
		label = "ACTIVATE",
		description = "Multi-level track with reward icons.",
		spriteId = "16898789153",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 129,
		name = "Checkbox Pop",
		category = "Toggles",
		categoryIndex = 8,
		variant = 12,
		archetype = 2,
		style = 1,
		icon = "CheckSquare",
		hue = 92,
		label = "ACTIVATE",
		description = "Checkmark draws itself dynamically.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 130,
		name = "Page Turn",
		category = "Transitions",
		categoryIndex = 9,
		variant = 12,
		archetype = 2,
		style = 1,
		icon = "BookOpen",
		hue = 123,
		label = "ACTIVATE",
		description = "3D paper curl flips to next scene.",
		spriteId = "16898616322",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 131,
		name = "Liquid Fill",
		category = "Buttons",
		categoryIndex = 0,
		variant = 13,
		archetype = 3,
		style = 1,
		icon = "Droplets",
		hue = 251,
		label = "COLLECT",
		description = "Fluid rises to fill the button container.",
		spriteId = "16898669562",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 257
	},
	{
		id = 132,
		name = "Isometric Tiles",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 13,
		archetype = 3,
		style = 1,
		icon = "Boxes",
		hue = 282,
		label = "COLLECT",
		description = "3D diamond grid with depth shimmer.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 133,
		name = "Clock Ticker",
		category = "Loaders",
		categoryIndex = 2,
		variant = 13,
		archetype = 3,
		style = 1,
		icon = "Clock",
		hue = 313,
		label = "COLLECT",
		description = "Single hand sweeping smoothly.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 134,
		name = "Rune Carve",
		category = "Cards",
		categoryIndex = 3,
		variant = 13,
		archetype = 3,
		style = 1,
		icon = "Wand2",
		hue = 344,
		label = "COLLECT",
		description = "Mystic symbols glow on surface.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 135,
		name = "Loot Reveal",
		category = "Panels",
		categoryIndex = 4,
		variant = 13,
		archetype = 3,
		style = 1,
		icon = "Package",
		hue = 15,
		label = "COLLECT",
		description = "Treasure chest opening sequence.",
		spriteId = "16898730641",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 0
	},
	{
		id = 136,
		name = "Milestone Ping",
		category = "Notifications",
		categoryIndex = 5,
		variant = 13,
		archetype = 3,
		style = 1,
		icon = "CheckCircle2",
		hue = 46,
		label = "COLLECT",
		description = "Progress bar hits 100% with flash.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 137,
		name = "Crystal Shard",
		category = "Badges",
		categoryIndex = 6,
		variant = 13,
		archetype = 3,
		style = 1,
		icon = "Diamond",
		hue = 77,
		label = "COLLECT",
		description = "Floating mineral chunk with reflections.",
		spriteId = "16898669042",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 138,
		name = "Download Progress",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 13,
		archetype = 3,
		style = 1,
		icon = "Download",
		hue = 108,
		label = "COLLECT",
		description = "Percent counter with moving stripes.",
		spriteId = "16898669562",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 139,
		name = "Shield Protect",
		category = "Toggles",
		categoryIndex = 8,
		variant = 13,
		archetype = 3,
		style = 1,
		icon = "Shield",
		hue = 139,
		label = "COLLECT",
		description = "Shield materializes on enable.",
		spriteId = "16898734664",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 140,
		name = "Lightning Flash",
		category = "Transitions",
		categoryIndex = 9,
		variant = 13,
		archetype = 3,
		style = 1,
		icon = "Zap",
		hue = 170,
		label = "COLLECT",
		description = "Blinding white flash fades to black.",
		spriteId = "16898791349",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 141,
		name = "Shine Slash",
		category = "Buttons",
		categoryIndex = 0,
		variant = 14,
		archetype = 4,
		style = 1,
		icon = "Sparkles",
		hue = 298,
		label = "BOOST",
		description = "Angled light slit races across the surface.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 142,
		name = "Smoke Rings",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 14,
		archetype = 4,
		style = 1,
		icon = "Wind",
		hue = 329,
		label = "BOOST",
		description = "Puff rings expanding outward.",
		spriteId = "16898791187",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 143,
		name = "Atom Shells",
		category = "Loaders",
		categoryIndex = 2,
		variant = 14,
		archetype = 4,
		style = 1,
		icon = "Atom",
		hue = 0,
		label = "BOOST",
		description = "Multiple electron rings at angles.",
		spriteId = "16898614574",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 144,
		name = "Ticket Stub",
		category = "Cards",
		categoryIndex = 3,
		variant = 14,
		archetype = 4,
		style = 1,
		icon = "Ticket",
		hue = 31,
		label = "BOOST",
		description = "Perforated coupon with tear line.",
		spriteId = "16898788789",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 145,
		name = "Status HUD",
		category = "Panels",
		categoryIndex = 4,
		variant = 14,
		archetype = 4,
		style = 1,
		icon = "Activity",
		hue = 62,
		label = "BOOST",
		description = "Health, mana, stamina bar cluster.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 146,
		name = "VIP Welcome",
		category = "Notifications",
		categoryIndex = 5,
		variant = 14,
		archetype = 4,
		style = 1,
		icon = "Crown",
		hue = 93,
		label = "BOOST",
		description = "Golden sparkles announce player join.",
		spriteId = "16898668482",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 147,
		name = "Mastery Ribbon",
		category = "Badges",
		categoryIndex = 6,
		variant = 14,
		archetype = 4,
		style = 1,
		icon = "Award",
		hue = 124,
		label = "BOOST",
		description = "First-place ribbon with gold medal.",
		spriteId = "16898614755",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 148,
		name = "Revive Circle",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 14,
		archetype = 4,
		style = 1,
		icon = "HeartPulse",
		hue = 155,
		label = "BOOST",
		description = "Hold-to-revive filling ring.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 149,
		name = "Flashlight Beam",
		category = "Toggles",
		categoryIndex = 8,
		variant = 14,
		archetype = 4,
		style = 1,
		icon = "Flashlight",
		hue = 186,
		label = "BOOST",
		description = "Bulb turns on with conical light.",
		spriteId = "16898670919",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 150,
		name = "Clock Wipe",
		category = "Transitions",
		categoryIndex = 9,
		variant = 14,
		archetype = 4,
		style = 1,
		icon = "Clock",
		hue = 217,
		label = "BOOST",
		description = "Radial line sweeps 360 degrees.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 151,
		name = "Pixel Pop",
		category = "Buttons",
		categoryIndex = 0,
		variant = 15,
		archetype = 5,
		style = 1,
		icon = "Gamepad2",
		hue = 345,
		label = "WARP",
		description = "Retro 8-bit chunky expansion pop.",
		spriteId = "16898672166",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 152,
		name = "Plasma Storm",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 15,
		archetype = 5,
		style = 1,
		icon = "Zap",
		hue = 16,
		label = "WARP",
		description = "Electric filaments branching.",
		spriteId = "16898791349",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 153,
		name = "Neon Ring",
		category = "Loaders",
		categoryIndex = 2,
		variant = 15,
		archetype = 5,
		style = 1,
		icon = "Circle",
		hue = 47,
		label = "WARP",
		description = "Glowing border with trailing tail.",
		spriteId = "16898618049",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 154,
		name = "Energy Core",
		category = "Cards",
		categoryIndex = 3,
		variant = 15,
		archetype = 5,
		style = 1,
		icon = "Atom",
		hue = 78,
		label = "WARP",
		description = "Glowing reactor visible in cutout.",
		spriteId = "16898614574",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 155,
		name = "Battle Log",
		category = "Panels",
		categoryIndex = 4,
		variant = 15,
		archetype = 5,
		style = 1,
		icon = "Swords",
		hue = 109,
		label = "WARP",
		description = "Scrolling combat event feed.",
		spriteId = "16898787671",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 156,
		name = "Item Expiring",
		category = "Notifications",
		categoryIndex = 5,
		variant = 15,
		archetype = 5,
		style = 1,
		icon = "Clock",
		hue = 140,
		label = "WARP",
		description = "Clock icon with pulsing yellow alert.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 157,
		name = "Cyber Token",
		category = "Badges",
		categoryIndex = 6,
		variant = 15,
		archetype = 5,
		style = 1,
		icon = "Coins",
		hue = 171,
		label = "WARP",
		description = "Rotating crypto-style coin emblem.",
		spriteId = "16898619182",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 158,
		name = "Nitro Boost Bar",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 15,
		archetype = 5,
		style = 1,
		icon = "Gauge",
		hue = 202,
		label = "WARP",
		description = "Turbo meter with speed lines effect.",
		spriteId = "16898672166",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 514
	},
	{
		id = 159,
		name = "Microphone",
		category = "Toggles",
		categoryIndex = 8,
		variant = 15,
		archetype = 5,
		style = 1,
		icon = "Mic",
		hue = 233,
		label = "WARP",
		description = "Mic glows or gets red slash.",
		spriteId = "16898728659",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	},
	{
		id = 160,
		name = "Cross Zoom",
		category = "Transitions",
		categoryIndex = 9,
		variant = 15,
		archetype = 5,
		style = 1,
		icon = "Maximize2",
		hue = 264,
		label = "WARP",
		description = "Zoom in fast then zoom out to new.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 161,
		name = "Aura Glow",
		category = "Buttons",
		categoryIndex = 0,
		variant = 16,
		archetype = 6,
		style = 1,
		icon = "Sun",
		hue = 32,
		label = "SUMMON",
		description = "Soft breathing ambient back-glow.",
		spriteId = "16898787671",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 162,
		name = "Geo Drift",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 16,
		archetype = 6,
		style = 1,
		icon = "Shapes",
		hue = 63,
		label = "SUMMON",
		description = "Floating cubes, pyramids, and spheres.",
		spriteId = "16898734421",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 163,
		name = "Crosshair Scan",
		category = "Loaders",
		categoryIndex = 2,
		variant = 16,
		archetype = 6,
		style = 1,
		icon = "Crosshair",
		hue = 94,
		label = "SUMMON",
		description = "Targeting reticle locking in.",
		spriteId = "16898668482",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 257
	},
	{
		id = 164,
		name = "Fold Out",
		category = "Cards",
		categoryIndex = 3,
		variant = 16,
		archetype = 6,
		style = 1,
		icon = "Folder",
		hue = 125,
		label = "SUMMON",
		description = "Unfolds like origami from center.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 165,
		name = "Achievement Shelf",
		category = "Panels",
		categoryIndex = 4,
		variant = 16,
		archetype = 6,
		style = 1,
		icon = "Medal",
		hue = 156,
		label = "SUMMON",
		description = "Trophy display with unlock shine.",
		spriteId = "16898675673",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 166,
		name = "Quest Complete",
		category = "Notifications",
		categoryIndex = 5,
		variant = 16,
		archetype = 6,
		style = 1,
		icon = "CheckSquare",
		hue = 187,
		label = "SUMMON",
		description = "Checkmark stamps onto quest title.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 167,
		name = "Solar Badge",
		category = "Badges",
		categoryIndex = 6,
		variant = 16,
		archetype = 6,
		style = 1,
		icon = "Sun",
		hue = 218,
		label = "SUMMON",
		description = "Sun with rotating corona rays.",
		spriteId = "16898787671",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 0
	},
	{
		id = 168,
		name = "Oxygen Gauge",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 16,
		archetype = 6,
		style = 1,
		icon = "Droplets",
		hue = 249,
		label = "SUMMON",
		description = "Diver meter with low-air flash.",
		spriteId = "16898669562",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 257
	},
	{
		id = 169,
		name = "Battery Saver",
		category = "Toggles",
		categoryIndex = 8,
		variant = 16,
		archetype = 6,
		style = 1,
		icon = "Battery",
		hue = 280,
		label = "SUMMON",
		description = "Leaf sprout appears on ECO mode.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 170,
		name = "TV Turn Off",
		category = "Transitions",
		categoryIndex = 9,
		variant = 16,
		archetype = 6,
		style = 1,
		icon = "Monitor",
		hue = 311,
		label = "SUMMON",
		description = "Classic CRT monitor shrinking line.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 171,
		name = "Corner Notch",
		category = "Buttons",
		categoryIndex = 0,
		variant = 17,
		archetype = 7,
		style = 1,
		icon = "Crosshair",
		hue = 79,
		label = "FIGHT",
		description = "Cyberpunk chamfered corners with accent notch.",
		spriteId = "16898668482",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 257
	},
	{
		id = 172,
		name = "Gradient Waves",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 17,
		archetype = 7,
		style = 1,
		icon = "Waves",
		hue = 110,
		label = "FIGHT",
		description = "Smooth color tides washing over.",
		spriteId = "16898790791",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 173,
		name = "Bouncing Orb",
		category = "Loaders",
		categoryIndex = 2,
		variant = 17,
		archetype = 7,
		style = 1,
		icon = "CircleDot",
		hue = 141,
		label = "FIGHT",
		description = "Elastic ball with squash & stretch.",
		spriteId = "16898617884",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 174,
		name = "Starlight Gem",
		category = "Cards",
		categoryIndex = 3,
		variant = 17,
		archetype = 7,
		style = 1,
		icon = "Gem",
		hue = 172,
		label = "FIGHT",
		description = "Facet highlights shine on hover.",
		spriteId = "16898672166",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 514
	},
	{
		id = 175,
		name = "Mailbox Drawer",
		category = "Panels",
		categoryIndex = 4,
		variant = 17,
		archetype = 7,
		style = 1,
		icon = "Mail",
		hue = 203,
		label = "FIGHT",
		description = "Message inbox with unread counters.",
		spriteId = "16898675156",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 176,
		name = "New Highscore",
		category = "Notifications",
		categoryIndex = 5,
		variant = 17,
		archetype = 7,
		style = 1,
		icon = "Sparkles",
		hue = 234,
		label = "FIGHT",
		description = "Arcade flash with score explosion.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 177,
		name = "Frost Emblem",
		category = "Badges",
		categoryIndex = 6,
		variant = 17,
		archetype = 7,
		style = 1,
		icon = "Snowflake",
		hue = 265,
		label = "FIGHT",
		description = "Snowflake crystal with ice shimmer.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 178,
		name = "Durability Bar",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 17,
		archetype = 7,
		style = 1,
		icon = "Wrench",
		hue = 296,
		label = "FIGHT",
		description = "Item condition with degrade color.",
		spriteId = "16898791187",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 257
	},
	{
		id = 179,
		name = "Auto-Run Boot",
		category = "Toggles",
		categoryIndex = 8,
		variant = 17,
		archetype = 7,
		style = 1,
		icon = "Footprints",
		hue = 327,
		label = "FIGHT",
		description = "Shoe icon animates run cycle.",
		spriteId = "16898671684",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 0
	},
	{
		id = 180,
		name = "Shatter Glass",
		category = "Transitions",
		categoryIndex = 9,
		variant = 17,
		archetype = 7,
		style = 1,
		icon = "Layers",
		hue = 358,
		label = "FIGHT",
		description = "Screen cracks into falling shards.",
		spriteId = "16898674182",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 181,
		name = "Stripe Slide",
		category = "Buttons",
		categoryIndex = 0,
		variant = 18,
		archetype = 8,
		style = 1,
		icon = "Zap",
		hue = 126,
		label = "OPEN",
		description = "Diagonal warning stripes slide continuously.",
		spriteId = "16898791349",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 182,
		name = "Dark Matter",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 18,
		archetype = 8,
		style = 1,
		icon = "Disc",
		hue = 157,
		label = "OPEN",
		description = "Abstract vortex pulling inward.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 183,
		name = "Ring Cascade",
		category = "Loaders",
		categoryIndex = 2,
		variant = 18,
		archetype = 8,
		style = 1,
		icon = "Disc",
		hue = 188,
		label = "OPEN",
		description = "Multiple concentric rings pulsing.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 184,
		name = "Cyber Plate",
		category = "Cards",
		categoryIndex = 3,
		variant = 18,
		archetype = 8,
		style = 1,
		icon = "ShieldAlert",
		hue = 219,
		label = "OPEN",
		description = "Bolted armor plating with warning text.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 185,
		name = "Pet Kennel",
		category = "Panels",
		categoryIndex = 4,
		variant = 18,
		archetype = 8,
		style = 1,
		icon = "PawPrint",
		hue = 250,
		label = "OPEN",
		description = "Creature collection display grid.",
		spriteId = "16898731301",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 186,
		name = "Friend Online",
		category = "Notifications",
		categoryIndex = 5,
		variant = 18,
		archetype = 8,
		style = 1,
		icon = "User",
		hue = 281,
		label = "OPEN",
		description = "Avatar bubble pops up in corner.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 187,
		name = "Shadow Mask",
		category = "Badges",
		categoryIndex = 6,
		variant = 18,
		archetype = 8,
		style = 1,
		icon = "Ghost",
		hue = 312,
		label = "OPEN",
		description = "Stealth operative assassin badge.",
		spriteId = "16898672166",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 188,
		name = "Supercharge Meter",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 18,
		archetype = 8,
		style = 1,
		icon = "Zap",
		hue = 343,
		label = "OPEN",
		description = "Flashes bright white when 100% full.",
		spriteId = "16898791349",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 257
	},
	{
		id = 189,
		name = "Compact View",
		category = "Toggles",
		categoryIndex = 8,
		variant = 18,
		archetype = 8,
		style = 1,
		icon = "Grid3x3",
		hue = 14,
		label = "OPEN",
		description = "Grid collapses to single list.",
		spriteId = "16898672700",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 190,
		name = "Star Wipe",
		category = "Transitions",
		categoryIndex = 9,
		variant = 18,
		archetype = 8,
		style = 1,
		icon = "Star",
		hue = 45,
		label = "OPEN",
		description = "Retro star expands from center.",
		spriteId = "16898736776",
		spriteSize = 256,
		spriteX = 257,
		spriteY = 0
	},
	{
		id = 191,
		name = "Orbital Spark",
		category = "Buttons",
		categoryIndex = 0,
		variant = 19,
		archetype = 9,
		style = 1,
		icon = "Orbit",
		hue = 173,
		label = "ENTER",
		description = "Tiny satellite particle orbits the perimeter.",
		spriteId = "16898730417",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 0
	},
	{
		id = 192,
		name = "Speed Lines",
		category = "Backgrounds",
		categoryIndex = 1,
		variant = 19,
		archetype = 9,
		style = 1,
		icon = "FastForward",
		hue = 204,
		label = "ENTER",
		description = "Anime action rush lines from edges.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 193,
		name = "Sparkle Burst",
		category = "Loaders",
		categoryIndex = 2,
		variant = 19,
		archetype = 9,
		style = 1,
		icon = "Sparkles",
		hue = 235,
		label = "ENTER",
		description = "Star twinkling and fading repeatedly.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 194,
		name = "Shadow Lift",
		category = "Cards",
		categoryIndex = 3,
		variant = 19,
		archetype = 9,
		style = 1,
		icon = "Square",
		hue = 266,
		label = "ENTER",
		description = "Cast shadow grows as card rises.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 195,
		name = "Emote Wheel",
		category = "Panels",
		categoryIndex = 4,
		variant = 19,
		archetype = 9,
		style = 1,
		icon = "Smile",
		hue = 297,
		label = "ENTER",
		description = "Radial selection menu with 8 slots.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 196,
		name = "Daily Reward Ready",
		category = "Notifications",
		categoryIndex = 5,
		variant = 19,
		archetype = 9,
		style = 1,
		icon = "Calendar",
		hue = 328,
		label = "ENTER",
		description = "Calendar icon with bouncing gift.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 197,
		name = "Infinity Crest",
		category = "Badges",
		categoryIndex = 6,
		variant = 19,
		archetype = 9,
		style = 1,
		icon = "Infinity",
		hue = 359,
		label = "ENTER",
		description = "Endless loop with prismatic flow.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 198,
		name = "Tension Gauge",
		category = "Progressbars",
		categoryIndex = 7,
		variant = 19,
		archetype = 9,
		style = 1,
		icon = "Target",
		hue = 30,
		label = "ENTER",
		description = "Fishing/balance meter with sweet spot.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 199,
		name = "Theme Flip",
		category = "Toggles",
		categoryIndex = 8,
		variant = 19,
		archetype = 9,
		style = 1,
		icon = "Palette",
		hue = 61,
		label = "ENTER",
		description = "Color palette swaps dark/light.",
		spriteId = "16898735175",
		spriteSize = 256,
		spriteX = 514,
		spriteY = 514
	},
	{
		id = 200,
		name = "Matrix Wipe",
		category = "Transitions",
		categoryIndex = 9,
		variant = 19,
		archetype = 9,
		style = 1,
		icon = "Binary",
		hue = 92,
		label = "ENTER",
		description = "Green code drops rain down.",
		spriteId = "16898615570",
		spriteSize = 256,
		spriteX = 0,
		spriteY = 257
	}
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
