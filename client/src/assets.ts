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

// Verified Roblox Marketplace Lucide Spritesheet Map: [assetId, size, offsetX, offsetY]
export const iconToSprite: Record<string, [string, number, number, number]> = {
  "Zap": [
    "16898791349",
    256,
    257,
    257
  ],
  "Sparkles": [
    "16898735175",
    256,
    514,
    514
  ],
  "Flame": [
    "16898670919",
    256,
    0,
    257
  ],
  "Shield": [
    "16898734664",
    256,
    257,
    0
  ],
  "Crown": [
    "16898668482",
    256,
    257,
    514
  ],
  "Sword": [
    "16898787671",
    256,
    257,
    514
  ],
  "Swords": [
    "16898787671",
    256,
    514,
    514
  ],
  "Star": [
    "16898736776",
    256,
    257,
    0
  ],
  "Heart": [
    "16898673271",
    256,
    0,
    0
  ],
  "Trophy": [
    "16898789153",
    256,
    0,
    514
  ],
  "Gamepad2": [
    "16898672166",
    256,
    0,
    0
  ],
  "Rocket": [
    "16898733317",
    256,
    0,
    514
  ],
  "Coins": [
    "16898619182",
    256,
    0,
    0
  ],
  "Lock": [
    "16898674825",
    256,
    0,
    257
  ],
  "Bell": [
    "16898615428",
    256,
    0,
    514
  ],
  "Play": [
    "16898731919",
    256,
    0,
    514
  ],
  "Check": [
    "16898617411",
    256,
    257,
    0
  ],
  "Eye": [
    "16898669897",
    256,
    0,
    0
  ],
  "Settings": [
    "16898734421",
    256,
    514,
    0
  ],
  "Key": [
    "16898673616",
    256,
    514,
    514
  ],
  "Gem": [
    "16898672166",
    256,
    257,
    514
  ],
  "Package": [
    "16898730641",
    256,
    514,
    0
  ],
  "Crosshair": [
    "16898668482",
    256,
    514,
    257
  ],
  "Compass": [
    "16898619182",
    256,
    257,
    514
  ],
  "MousePointerClick": [
    "16898729337",
    256,
    0,
    514
  ],
  "Power": [
    "16898732262",
    256,
    514,
    257
  ],
  "Send": [
    "16898734242",
    256,
    257,
    257
  ],
  "Joystick": [
    "16898672166",
    256,
    257,
    0
  ],
  "ShoppingCart": [
    "16898734664",
    256,
    257,
    514
  ],
  "Users": [
    "16898790259",
    256,
    514,
    0
  ],
  "LockOpen": [
    "16898674825",
    256,
    257,
    0
  ],
  "SendHorizontal": [
    "16898734242",
    256,
    0,
    257
  ],
  "Waves": [
    "16898790791",
    256,
    257,
    514
  ],
  "Binary": [
    "16898615570",
    256,
    0,
    257
  ],
  "Sun": [
    "16898787671",
    256,
    0,
    0
  ],
  "Droplets": [
    "16898669562",
    256,
    514,
    257
  ],
  "Radar": [
    "16898732504",
    256,
    257,
    514
  ],
  "Candy": [
    "16898617146",
    256,
    514,
    257
  ],
  "Orbit": [
    "16898730417",
    256,
    514,
    0
  ],
  "Sunset": [
    "16898787671",
    256,
    0,
    257
  ],
  "Sparkle": [
    "16898735175",
    256,
    257,
    514
  ],
  "TreePine": [
    "16898789012",
    256,
    514,
    257
  ],
  "Anchor": [
    "16898613613",
    256,
    0,
    514
  ],
  "Database": [
    "16898668755",
    256,
    0,
    514
  ],
  "SunMedium": [
    "16898736967",
    256,
    514,
    257
  ],
  "GlassWater": [
    "16898672599",
    256,
    0,
    0
  ],
  "ScanLine": [
    "16898733817",
    256,
    0,
    0
  ],
  "Rainbow": [
    "16898732665",
    256,
    514,
    257
  ],
  "ChartColumn": [
    "16898615143",
    256,
    0,
    257
  ],
  "AudioLines": [
    "16898614755",
    256,
    0,
    0
  ],
  "ListChecks": [
    "16898674482",
    256,
    0,
    514
  ],
  "LayoutGrid": [
    "16898674182",
    256,
    514,
    0
  ],
  "MousePointer2": [
    "16898729337",
    256,
    257,
    257
  ],
  "Cloud": [
    "16898618899",
    256,
    257,
    514
  ],
  "WandSparkles": [
    "16898790791",
    256,
    0,
    257
  ],
  "Grid3x3": [
    "16898672700",
    256,
    257,
    0
  ],
  "Atom": [
    "16898614574",
    256,
    514,
    514
  ],
  "Loader": [
    "16898674684",
    256,
    257,
    257
  ],
  "CircleDot": [
    "16898617884",
    256,
    257,
    257
  ],
  "Wifi": [
    "16898790996",
    256,
    514,
    514
  ],
  "Music": [
    "16898730065",
    256,
    0,
    0
  ],
  "Shapes": [
    "16898734421",
    256,
    257,
    257
  ],
  "RefreshCw": [
    "16898733146",
    256,
    257,
    0
  ],
  "Telescope": [
    "16898788248",
    256,
    0,
    257
  ],
  "Box": [
    "16898616650",
    256,
    0,
    514
  ],
  "Globe": [
    "16898672599",
    256,
    257,
    257
  ],
  "Footprints": [
    "16898671684",
    256,
    514,
    0
  ],
  "Radio": [
    "16898732665",
    256,
    514,
    0
  ],
  "Hexagon": [
    "16898673271",
    256,
    257,
    257
  ],
  "Hourglass": [
    "16898673358",
    256,
    514,
    0
  ],
  "Blocks": [
    "16898615570",
    256,
    514,
    514
  ],
  "Layers": [
    "16898674182",
    256,
    257,
    0
  ],
  "Gift": [
    "16898672316",
    256,
    0,
    0
  ],
  "Spade": [
    "16898735175",
    256,
    514,
    257
  ],
  "Backpack": [
    "16898614755",
    256,
    514,
    257
  ],
  "Map": [
    "16898675359",
    256,
    0,
    514
  ],
  "Award": [
    "16898614755",
    256,
    0,
    257
  ],
  "Ticket": [
    "16898788789",
    256,
    0,
    257
  ],
  "Egg": [
    "16898669689",
    256,
    514,
    514
  ],
  "FlaskConical": [
    "16898670919",
    256,
    514,
    257
  ],
  "Shirt": [
    "16898734664",
    256,
    257,
    257
  ],
  "ScrollText": [
    "16898734065",
    256,
    257,
    257
  ],
  "MapPin": [
    "16898675359",
    256,
    514,
    0
  ],
  "Diamond": [
    "16898669042",
    256,
    257,
    0
  ],
  "Disc3": [
    "16898669271",
    256,
    0,
    257
  ],
  "Ruler": [
    "16898733534",
    256,
    514,
    0
  ],
  "UserRound": [
    "16898790047",
    256,
    514,
    0
  ],
  "SlidersHorizontal": [
    "16898735040",
    256,
    0,
    257
  ],
  "Store": [
    "16898736776",
    256,
    514,
    514
  ],
  "Medal": [
    "16898675673",
    256,
    0,
    0
  ],
  "MessageCircle": [
    "16898675863",
    256,
    0,
    0
  ],
  "PawPrint": [
    "16898731301",
    256,
    514,
    514
  ],
  "Flag": [
    "16898670919",
    256,
    0,
    0
  ],
  "Castle": [
    "16898617325",
    256,
    0,
    257
  ],
  "Volume2": [
    "16898790615",
    256,
    257,
    0
  ],
  "CalendarCheck": [
    "16898616953",
    256,
    257,
    257
  ],
  "Server": [
    "16898734421",
    256,
    257,
    0
  ],
  "MessagesSquare": [
    "16898728402",
    256,
    257,
    514
  ],
  "Axe": [
    "16898614755",
    256,
    514,
    0
  ],
  "BellRing": [
    "16898615428",
    256,
    257,
    257
  ],
  "ChevronsUp": [
    "16898617626",
    256,
    257,
    514
  ],
  "UserPlus": [
    "16898789825",
    256,
    0,
    514
  ],
  "TriangleAlert": [
    "16898789153",
    256,
    0,
    257
  ],
  "PackageOpen": [
    "16898730417",
    256,
    514,
    514
  ],
  "MessageSquare": [
    "16898728402",
    256,
    514,
    257
  ],
  "CircleCheck": [
    "16898617803",
    256,
    257,
    257
  ],
  "Siren": [
    "16898734905",
    256,
    257,
    257
  ],
  "Mail": [
    "16898675156",
    256,
    514,
    514
  ],
  "Info": [
    "16898673523",
    256,
    257,
    257
  ],
  "AlarmClock": [
    "16898612819",
    256,
    257,
    257
  ],
  "ShieldCheck": [
    "16898734564",
    256,
    0,
    257
  ],
  "BadgeCheck": [
    "16898614945",
    256,
    0,
    0
  ],
  "Tag": [
    "16898788033",
    256,
    0,
    257
  ],
  "Stamp": [
    "16898736597",
    256,
    257,
    514
  ],
  "Timer": [
    "16898788789",
    256,
    0,
    514
  ],
  "Skull": [
    "16898734905",
    256,
    257,
    514
  ],
  "Ghost": [
    "16898672166",
    256,
    514,
    514
  ],
  "Wrench": [
    "16898791187",
    256,
    514,
    257
  ],
  "Gauge": [
    "16898672166",
    256,
    0,
    514
  ],
  "BatteryCharging": [
    "16898615240",
    256,
    0,
    257
  ],
  "Download": [
    "16898669562",
    256,
    0,
    0
  ],
  "Droplet": [
    "16898669562",
    256,
    0,
    514
  ],
  "Drumstick": [
    "16898669562",
    256,
    514,
    514
  ],
  "Wind": [
    "16898791187",
    256,
    0,
    0
  ],
  "Upload": [
    "16898789644",
    256,
    0,
    257
  ],
  "SunMoon": [
    "16898736967",
    256,
    257,
    514
  ],
  "SquareCheck": [
    "16898735664",
    256,
    514,
    514
  ],
  "BellOff": [
    "16898615428",
    256,
    0,
    257
  ],
  "Lightbulb": [
    "16898674337",
    256,
    514,
    514
  ],
  "Mic": [
    "16898728659",
    256,
    0,
    257
  ],
  "Music2": [
    "16898729752",
    256,
    514,
    257
  ],
  "KeyRound": [
    "16898673616",
    256,
    514,
    257
  ],
  "ShieldHalf": [
    "16898734564",
    256,
    257,
    257
  ],
  "Circle": [
    "16898618049",
    256,
    257,
    514
  ],
  "DoorOpen": [
    "16898669433",
    256,
    514,
    257
  ],
  "Grid2x2": [
    "16898672700",
    256,
    0,
    0
  ],
  "MoveRight": [
    "16898729752",
    256,
    0,
    0
  ],
  "Aperture": [
    "16898613699",
    256,
    257,
    0
  ],
  "Slash": [
    "16898735040",
    256,
    0,
    0
  ],
  "Blinds": [
    "16898615570",
    256,
    257,
    514
  ],
  "BookOpen": [
    "16898616322",
    256,
    0,
    514
  ],
  "ArrowUpDown": [
    "16898614275",
    256,
    514,
    514
  ],
  "MoveUp": [
    "16898729752",
    256,
    514,
    0
  ],
  "Flashlight": [
    "16898670919",
    256,
    257,
    257
  ],
  "MoveLeft": [
    "16898729572",
    256,
    514,
    514
  ],
  "PanelTop": [
    "16898731166",
    256,
    0,
    257
  ]
}

export const iconToAssetId: Record<string, string> = Object.fromEntries(
  Object.entries(iconToSprite).map(([k, v]) => [k, 'rbxassetid://' + v[0]])
)

export const assets: Asset[] = Array.from({ length: 200 }, (_, index) => {
  const categoryIndex = index % 10
  const variant = Math.floor(index / 10)
  const [name, description, icon] = catalog[categoryIndex][variant].split('|')
  return { 
    id: index + 1, 
    name, 
    slug: `${String(index + 1).padStart(3, '0')}-${name.toLowerCase().replaceAll(' ', '-')}`, 
    category: categories[categoryIndex], 
    categoryIndex, 
    variant, 
    archetype: variant % 10, 
    style: Math.floor(variant / 10), 
    icon, 
    hue: (variant * 47 + categoryIndex * 31) % 360, 
    description 
  }
})

const prelude = (asset: Asset, custom?: CustomConfig) => {
  const h = custom?.customHue !== undefined ? custom.customHue : (asset.customHue !== undefined ? asset.customHue : asset.hue)
  const iconName = custom?.customIcon || asset.customIcon || asset.icon
  const sprite = iconToSprite[iconName] || iconToSprite['Sparkles'] || ['16898735175', 256, 514, 514]
  const lbl = custom?.customLabel || asset.customLabel || buttonLabels[asset.variant] || asset.name.toUpperCase()
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
local iconAssetId = "rbxassetid://${sprite[0]}" -- Real Roblox Vector Asset: ${iconName}
local iconRectSize = Vector2.new(${sprite[1]}, ${sprite[1]})
local iconRectOffset = Vector2.new(${sprite[2]}, ${sprite[3]})
local title = "${lbl.replaceAll('"', '\\\"')}"
local subtitle = "${asset.description.replaceAll('"', '\\\"')}"
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
local function icon(parent, props)
	props.BackgroundTransparency = 1
	props.ScaleType = Enum.ScaleType.Fit
	if not props.Image or props.Image == "" then
		props.Image = iconAssetId
		props.ImageRectSize = iconRectSize
		props.ImageRectOffset = iconRectOffset
	end
	return make("ImageLabel", props, parent)
end
local function center(size)
	return {AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0.5), Size = size}
end

-- UI Click Sound FX
local clickSound = make("Sound", {
	SoundId = "rbxassetid://6895079853",
	Volume = 0.5,
	PlayOnRemove = false
}, gui)
`
}

const buttonMotions: string[] = [
  // 0: Silk Shine Sweep
  `local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	shine.Position = UDim2.fromScale(-0.6, -0.4)
	local tw = TweenService:Create(shine, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = UDim2.fromScale(1.4, -0.4)})
	tw:Play()
	tw.Completed:Wait()
	isEffectBusy = false
end`,

  // 1: Neon Pulse Rings Burst
  `local isEffectBusy = false
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
end`,

  // 2: Expanding Ripple Burst
  `local function playEffect()
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
end`,

  // 3: Levitation Hop & Bounce
  `local isEffectBusy = false
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
end`,

  // 4: Rotating Rainbow Border Aura Burst
  `local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	rainbowStroke.Rotation = 0
	local tw = TweenService:Create(rainbowStroke, TweenInfo.new(0.8 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Rotation = 360})
	tw:Play()
	tw.Completed:Wait()
	rainbowStroke.Rotation = 0
	isEffectBusy = false
end`,

  // 5: Squishy Jelly Bounce & Icon Wobble
  `local isEffectBusy = false
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
end`,

  // 6: Digital Glitch Split Twitch
  `local isEffectBusy = false
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
end`,

  // 7: High-Energy Color Flood (Fill Rush)
  `local isEffectBusy = false
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
end`,

  // 8: Rocket Launch Pad Lift & Recoil
  `local isEffectBusy = false
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
end`,

  // 9: 3D Mechanical Key Tactile Press
  `local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	local origPos = root.Position
	TweenService:Create(root, TweenInfo.new(0.08 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = origPos + UDim2.fromOffset(0, 6)}):Play()
	task.wait(0.1 * speed)
	TweenService:Create(root, TweenInfo.new(0.18 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = origPos}):Play()
	task.wait(0.18 * speed)
	isEffectBusy = false
end`
]

const builders: ((a: Asset) => string)[] = [
  (a: Asset) => {
    const isDark = a.archetype === 4 || a.archetype === 6 || a.archetype === 7 || a.style === 1;
    return `-- BUTTON (Pill shape, auto-centered Icon + Label)
local isDark = ${isDark}
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
local shine = make("Frame", {Size = UDim2.fromScale(0.28, 1.8), Position = UDim2.fromScale(-0.5, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.7, BorderSizePixel = 0, ZIndex = 3}, root)

${a.archetype === 7 ? `local fill = make("Frame", {Size = UDim2.new(0, 0, 1, 0), Position = UDim2.new(0, 0, 0, 0), BackgroundColor3 = accent, BorderSizePixel = 0, ZIndex = 2}, root)
round(fill, 34)
make("UIGradient", {Color = ColorSequence.new(accent, accent2), Rotation = 0}, fill)` : ''}
${a.archetype === 1 ? `local ring1 = make("Frame", center(root.Size), root.Parent)
round(ring1, 34)
ring1.BackgroundTransparency = 1
local ringStroke1 = make("UIStroke", {Color = accent, Thickness = 2.5, Transparency = 0.2}, ring1)
local ring2 = make("Frame", center(root.Size), root.Parent)
round(ring2, 34)
ring2.BackgroundTransparency = 1
local ringStroke2 = make("UIStroke", {Color = accent2, Thickness = 2.5, Transparency = 0.2}, ring2)` : ''}
${a.archetype === 3 ? `local shadow = make("Frame", {AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 38), Size = UDim2.fromOffset(180, 12), BackgroundColor3 = Color3.fromRGB(0, 0, 0), BackgroundTransparency = 0.65, BorderSizePixel = 0}, root.Parent)
round(shadow, 6)` : ''}
${a.archetype === 4 ? `local rainbowStroke = make("UIGradient", {
	Color = ColorSequence.new({
		ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 80, 80)),
		ColorSequenceKeypoint.new(0.2, Color3.fromRGB(255, 210, 50)),
		ColorSequenceKeypoint.new(0.4, Color3.fromRGB(50, 255, 130)),
		ColorSequenceKeypoint.new(0.6, Color3.fromRGB(50, 210, 255)),
		ColorSequenceKeypoint.new(0.8, Color3.fromRGB(210, 80, 255)),
		ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 80, 80))
	}),
	Rotation = 0
}, stroke)` : ''}
${a.archetype === 9 ? `local shadowKey = make("Frame", {AnchorPoint = Vector2.new(0.5, 0.5), Position = root.Position + UDim2.fromOffset(0, 6), Size = root.Size, BackgroundColor3 = dark, ZIndex = root.ZIndex - 1}, root.Parent)
round(shadowKey, 34)` : ''}

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
	Text = "__LABEL__",
	TextSize = 20,
	TextColor3 = isDark and Color3.new(1, 1, 1) or Color3.fromRGB(13, 14, 12),
	AutomaticSize = Enum.AutomaticSize.XY,
	LayoutOrder = 2,
	ZIndex = 4
})

-- INTERACTIVE CLICK ANIMATION (Plays strictly on click)
${buttonMotions[a.archetype]}

root.MouseEnter:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1.05}):Play() end)
root.MouseLeave:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1}):Play() end)
root.Activated:Connect(function()
	if clickSound then clickSound:Play() end
	TweenService:Create(scale, TweenInfo.new(0.08, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Scale = 0.94}):Play()
	task.spawn(playEffect)
	task.wait(0.08)
	TweenService:Create(scale, TweenInfo.new(0.18, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1.05}):Play()
end)`
  },

  () => `-- BACKGROUND (Full Screen Ambient FX)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = dark, BorderSizePixel = 0, ClipsDescendants = true, Active = false}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 60, Transparency = NumberSequence.new(0, 0.55)}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.5), Position = UDim2.fromScale(-0.4, -0.2), Rotation = 20, BackgroundColor3 = accent2, BackgroundTransparency = 0.82, BorderSizePixel = 0}, root)
local icon = icon(root, center(UDim2.fromOffset(120, 120)))
icon.ImageColor3 = accent2
icon.ImageTransparency = 0.35
local random = Random.new(__SEED__)
for index = 1, 24 do
	local size = random:NextInteger(8, 26)
	local pFrame = make("Frame", {Size = UDim2.fromOffset(size, size), Position = UDim2.fromScale(random:NextNumber(), 1.05), BackgroundTransparency = 0.5, BackgroundColor3 = accent2, BorderSizePixel = 0}, root)
	round(pFrame, size / 2)
	local duration = random:NextNumber(4, 9)
	task.spawn(function()
		task.wait(random:NextNumber(0, duration))
		while gui.Parent do
			pFrame.Position = UDim2.fromScale(random:NextNumber(), 1.05)
			pFrame.BackgroundTransparency = 0.4
			local tween = TweenService:Create(pFrame, TweenInfo.new(duration * speed, Enum.EasingStyle.Sine), {Position = pFrame.Position - UDim2.fromScale(random:NextNumber(-0.1, 0.1), 1.2), BackgroundTransparency = 1})
			tween:Play()
			tween.Completed:Wait()
		end
	end)
end`,

  () => `-- LOADER (Spinning Orbit Satellites + Pulsing Core)
local root = make("Frame", center(UDim2.fromOffset(160, 160)), gui)
root.BackgroundColor3 = dark
round(root, 80)
local stroke = make("UIStroke", {Color = accent, Thickness = 4, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent)}, stroke)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundTransparency = 1}, root)
local icon = icon(root, center(UDim2.fromOffset(56, 56)))
icon.ImageColor3 = accent2
local orbit = make("Frame", {Size = UDim2.fromScale(1.3, 1.3), AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0.5), BackgroundTransparency = 1}, root)
for i = 1, 4 do
	local angle = (i / 4) * math.pi * 2
	local dot = make("Frame", {Size = UDim2.fromOffset(14, 14), AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.new(0.5 + math.cos(angle) * 0.48, 0, 0.5 + math.sin(angle) * 0.48, 0), BackgroundColor3 = accent2}, orbit)
	round(dot, 7)
end
text(gui, {Text = "__LABEL__", TextSize = 16, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 105), Size = UDim2.fromOffset(220, 24), TextColor3 = accent2})
task.spawn(function()
	while gui.Parent do
		local tw = TweenService:Create(orbit, TweenInfo.new(2.2 * speed, Enum.EasingStyle.Linear), {Rotation = 360})
		tw:Play()
		tw.Completed:Wait()
		orbit.Rotation = 0
	end
end)`,

  () => `-- CARD
local root = make("Frame", center(UDim2.fromOffset(250, 330)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 22)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 70, Transparency = NumberSequence.new(0.2, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.8), Position = UDim2.fromScale(-0.5, -0.4), Rotation = 22, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.78, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = icon(root, {Size = UDim2.fromOffset(72, 72), AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0, 42), ImageColor3 = accent2, ZIndex = 3})
text(root, {Text = "__LABEL__", TextSize = 22, Size = UDim2.new(1, -30, 0, 32), Position = UDim2.fromOffset(15, 140), ZIndex = 3})
text(root, {Text = subtitle, TextSize = 13, TextWrapped = true, Font = Enum.Font.Gotham, TextTransparency = 0.25, Size = UDim2.new(1, -40, 0, 80), Position = UDim2.fromOffset(20, 180), TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 3})`,

  () => `-- PANEL
local root = make("Frame", center(UDim2.fromOffset(440, 300)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 18)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 90, Transparency = NumberSequence.new(0, 0.75)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.2, 1.8), Position = UDim2.fromScale(-0.4, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.85, BorderSizePixel = 0, ZIndex = 5}, root)
local icon = icon(root, {Size = UDim2.fromOffset(32, 32), Position = UDim2.fromOffset(16, 16), ImageColor3 = accent2, ZIndex = 3})
text(root, {Text = "__LABEL__", TextSize = 20, Size = UDim2.new(1, -70, 0, 36), Position = UDim2.fromOffset(56, 14), TextXAlignment = Enum.TextXAlignment.Left})
local slots = {}
for index = 0, 7 do
	local slot = make("Frame", {Size = UDim2.fromOffset(92, 92), Position = UDim2.fromOffset(16 + (index % 4) * 105, 68 + math.floor(index / 4) * 105), BackgroundColor3 = accent, BackgroundTransparency = 0.75}, root)
	round(slot, 14)
	local slotIcon = icon(slot, center(UDim2.fromOffset(40, 40)))
	slotIcon.ImageColor3 = accent2
	local pop = make("UIScale", {Scale = 0}, slot)
	slots[index + 1] = pop
end
task.spawn(function()
	while gui.Parent do
		for _, pop in ipairs(slots) do
			TweenService:Create(pop, TweenInfo.new(0.35, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1}):Play()
			task.wait(0.1 * speed)
		end
		task.wait(2.0 * speed)
		for _, pop in ipairs(slots) do TweenService:Create(pop, TweenInfo.new(0.2), {Scale = 0}):Play() end
		task.wait(0.6 * speed)
	end
end)`,

  () => `-- NOTIFICATION
local root = make("Frame", {AnchorPoint = Vector2.new(0.5, 0), Size = UDim2.fromOffset(380, 88), Position = UDim2.new(0.5, 0, 0, -120), BackgroundColor3 = dark, ClipsDescendants = true}, gui)
round(root, 18)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 0, Transparency = NumberSequence.new(0.35, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.15, 2), Position = UDim2.fromScale(-0.3, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.75, BorderSizePixel = 0, ZIndex = 3}, root)
local icon = icon(root, {Size = UDim2.fromOffset(44, 44), Position = UDim2.fromOffset(16, 20), ImageColor3 = accent2, ZIndex = 3})
text(root, {Text = "__LABEL__", TextSize = 19, Size = UDim2.new(1, -85, 0, 26), Position = UDim2.fromOffset(72, 16), TextXAlignment = Enum.TextXAlignment.Left})
text(root, {Text = subtitle, TextSize = 12, Font = Enum.Font.Gotham, TextTransparency = 0.3, TextWrapped = true, Size = UDim2.new(1, -85, 0, 36), Position = UDim2.fromOffset(72, 44), TextXAlignment = Enum.TextXAlignment.Left, TextYAlignment = Enum.TextYAlignment.Top})
local timer = make("Frame", {Size = UDim2.new(1, 0, 0, 4), Position = UDim2.new(0, 0, 1, -4), BackgroundColor3 = accent2, BorderSizePixel = 0}, root)
task.spawn(function()
	while gui.Parent do
		root.Position = UDim2.new(0.5, 0, 0, -120)
		timer.Size = UDim2.new(1, 0, 0, 4)
		TweenService:Create(root, TweenInfo.new(0.6 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = UDim2.new(0.5, 0, 0, 32)}):Play()
		TweenService:Create(timer, TweenInfo.new(3.2 * speed, Enum.EasingStyle.Linear), {Size = UDim2.new(0, 0, 0, 4)}):Play()
		task.wait(3.4 * speed)
		TweenService:Create(root, TweenInfo.new(0.4 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Position = UDim2.new(0.5, 0, 0, -120)}):Play()
		task.wait(1.8 * speed)
	end
end)`,

  () => `-- BADGE
local root = make("Frame", center(UDim2.fromOffset(160, 160)), gui)
root.BackgroundColor3 = accent
root.ClipsDescendants = true
round(root, __RADIUS__)
local stroke = make("UIStroke", {Color = accent2, Thickness = 4, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 90}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.25, 2), Position = UDim2.fromScale(-0.4, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.6, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = icon(root, center(UDim2.fromOffset(68, 68)))
icon.ImageColor3 = Color3.new(1, 1, 1)
icon.ZIndex = 4
text(gui, {Text = "__LABEL__", TextSize = 16, Size = UDim2.fromOffset(260, 26), AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 105), TextColor3 = accent2})`,

  () => `-- PROGRESS BAR
local root = make("Frame", center(UDim2.fromOffset(440, 44)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 22)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local fill = make("Frame", {Size = UDim2.fromScale(0.1, 1), BackgroundColor3 = accent, BorderSizePixel = 0}, root)
round(fill, 22)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, accent2), Rotation = 0}, fill)
local shine = make("Frame", {Size = UDim2.fromScale(0.15, 2), Position = UDim2.fromScale(-0.3, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.7, BorderSizePixel = 0, ZIndex = 3}, root)
local icon = icon(gui, {Size = UDim2.fromOffset(38, 38), AnchorPoint = Vector2.new(1, 0.5), Position = UDim2.new(0.5, -236, 0.5, 0), ImageColor3 = accent2})
text(root, {Text = "__LABEL__", TextSize = 14, Size = UDim2.fromScale(1, 1), ZIndex = 4})
loop(fill, {Size = UDim2.fromScale(1, 1)}, 2.5, Enum.EasingStyle.Quad, true)`,

  () => `-- TOGGLE (Interactive switch)
local root = make("TextButton", center(UDim2.fromOffset(160, 80)), gui)
root.Text = ""
root.AutoButtonColor = false
root.BackgroundColor3 = dark
round(root, 40)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 0, Transparency = NumberSequence.new(0, 0.85)}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.2, 2), Position = UDim2.fromScale(-0.4, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.8, BorderSizePixel = 0}, root)
local knob = make("Frame", {Size = UDim2.fromOffset(64, 64), Position = UDim2.fromOffset(8, 8), BackgroundColor3 = Color3.new(1, 1, 1)}, root)
round(knob, 32)
local icon = icon(knob, center(UDim2.fromOffset(36, 36)))
icon.ImageColor3 = dark
local on = false
local function set(state)
	on = state
	if clickSound then clickSound:Play() end
	TweenService:Create(knob, TweenInfo.new(0.35 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = on and UDim2.fromOffset(88, 8) or UDim2.fromOffset(8, 8)}):Play()
	TweenService:Create(root, TweenInfo.new(0.3 * speed), {BackgroundColor3 = on and accent or dark}):Play()
	TweenService:Create(icon, TweenInfo.new(0.35 * speed), {Rotation = on and 360 or 0}):Play()
end
root.Activated:Connect(function() set(not on) end)`,

  () => `-- TRANSITION (Scene Wipe FX)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = accent, BorderSizePixel = 0, ClipsDescendants = true, ZIndex = 10, Position = UDim2.fromScale(-1, 0)}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 45}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.12, 1.6), Position = UDim2.fromScale(0.9, -0.2), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.6, BorderSizePixel = 0}, root)
local icon = icon(root, center(UDim2.fromOffset(130, 130)))
icon.ImageColor3 = Color3.new(1, 1, 1)
icon.ZIndex = 11
text(root, {Text = "__LABEL__", TextSize = 28, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 95), Size = UDim2.fromOffset(400, 40), ZIndex = 11})
task.spawn(function()
	while gui.Parent do
		root.Position = UDim2.fromScale(-1, 0)
		TweenService:Create(root, TweenInfo.new(0.75 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.Out), {Position = UDim2.fromScale(0, 0)}):Play()
		task.wait(2.2 * speed)
		TweenService:Create(root, TweenInfo.new(0.75 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.In), {Position = UDim2.fromScale(1, 0)}):Play()
		task.wait(2.2 * speed)
	end
end)`
]

const motions = [
  `-- Continuous Silk Shine Sweep
task.spawn(function()
	while gui.Parent do
		shine.Position = UDim2.fromScale(-0.6, -0.4)
		local tw = TweenService:Create(shine, TweenInfo.new(1.1 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = UDim2.fromScale(1.4, -0.4)})
		tw:Play()
		tw.Completed:Wait()
		task.wait(1.2 * speed)
	end
end)`,

  `-- Neon Pulse Rings + Heartbeat
task.spawn(function()
	while gui.Parent do
		ring1.Size = root.Size
		ringStroke1.Transparency = 0.2
		TweenService:Create(ring1, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = root.Size + UDim2.fromOffset(36, 24)}):Play()
		TweenService:Create(ringStroke1, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Transparency = 1}):Play()
		TweenService:Create(scale, TweenInfo.new(0.18 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Scale = 1.06}):Play()
		task.wait(0.2 * speed)
		TweenService:Create(scale, TweenInfo.new(0.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Scale = 1}):Play()
		task.wait(0.4 * speed)
		
		ring2.Size = root.Size
		ringStroke2.Transparency = 0.2
		TweenService:Create(ring2, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = root.Size + UDim2.fromOffset(36, 24)}):Play()
		TweenService:Create(ringStroke2, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Transparency = 1}):Play()
		task.wait(0.8 * speed)
	end
end)`,

  `-- Expanding Ripple Burst Loops
task.spawn(function()
	while gui.Parent do
		for i = 1, 2 do
			local rip = make("Frame", {
				AnchorPoint = Vector2.new(0.5, 0.5),
				Position = UDim2.fromScale(0.5, 0.5),
				Size = UDim2.fromOffset(12, 12),
				BackgroundColor3 = Color3.new(1, 1, 1),
				BackgroundTransparency = 0.35,
				ZIndex = 3
			}, root)
			round(rip, 100)
			local t = TweenService:Create(rip, TweenInfo.new(0.9 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
				Size = UDim2.fromOffset(320, 320),
				BackgroundTransparency = 1
			})
			t:Play()
			t.Completed:Connect(function() rip:Destroy() end)
			task.wait(0.22 * speed)
		end
		task.wait(1.4 * speed)
	end
end)`,

  `-- Gentle Levitation Float with Floor Shadow
task.spawn(function()
	local origPos = root.Position
	while gui.Parent do
		local up = TweenService:Create(root, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Position = origPos - UDim2.fromOffset(0, 10)})
		local tilt = TweenService:Create(icon, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Rotation = 8})
		local shShrink = TweenService:Create(shadow, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Size = UDim2.fromOffset(140, 8), BackgroundTransparency = 0.85})
		up:Play() tilt:Play() shShrink:Play()
		up.Completed:Wait()
		
		local down = TweenService:Create(root, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Position = origPos})
		local tiltBack = TweenService:Create(icon, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Rotation = -4})
		local shGrow = TweenService:Create(shadow, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Size = UDim2.fromOffset(180, 12), BackgroundTransparency = 0.65})
		down:Play() tiltBack:Play() shGrow:Play()
		down.Completed:Wait()
	end
end)`,

  `-- Rotating Rainbow Border Aura
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
task.spawn(function()
	while gui.Parent do
		local tw = TweenService:Create(rainbowStroke, TweenInfo.new(3.2 * speed, Enum.EasingStyle.Linear), {Rotation = 360})
		tw:Play()
		tw.Completed:Wait()
		rainbowStroke.Rotation = 0
	end
end)`,

  `-- Squishy Jelly Bounce & Icon Wobble
task.spawn(function()
	while gui.Parent do
		TweenService:Create(scale, TweenInfo.new(0.35 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.Out), {Scale = 1.09}):Play()
		TweenService:Create(icon, TweenInfo.new(0.35 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.Out), {Rotation = 12}):Play()
		task.wait(0.35 * speed)
		TweenService:Create(scale, TweenInfo.new(0.45 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Scale = 0.93}):Play()
		TweenService:Create(icon, TweenInfo.new(0.45 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Rotation = -12}):Play()
		task.wait(0.45 * speed)
		TweenService:Create(scale, TweenInfo.new(0.35 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1}):Play()
		TweenService:Create(icon, TweenInfo.new(0.35 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Rotation = 0}):Play()
		task.wait(1.4 * speed)
	end
end)`,

  `-- Digital Glitch Split Twitch
task.spawn(function()
	local origPos = root.Position
	while gui.Parent do
		task.wait(2.2 * speed)
		for i = 1, 6 do
			local off = (i % 2 == 0) and 4 or -4
			root.Position = origPos + UDim2.fromOffset(off, 0)
			icon.ImageColor3 = (i % 2 == 0) and Color3.fromRGB(255, 43, 214) or Color3.fromRGB(0, 240, 255)
			task.wait(0.04)
		end
		root.Position = origPos
		icon.ImageColor3 = isDark and Color3.new(1, 1, 1) or Color3.fromRGB(13, 14, 12)
	end
end)`,

  `-- High-Energy Color Flood (Fill Rush)
task.spawn(function()
	while gui.Parent do
		fill.AnchorPoint = Vector2.new(0, 0)
		fill.Position = UDim2.new(0, 0, 0, 0)
		TweenService:Create(fill, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Cubic, Enum.EasingDirection.InOut), {Size = UDim2.new(1, 0, 1, 0)}):Play()
		task.wait(0.2 * speed)
		TweenService:Create(label, TweenInfo.new(0.25 * speed), {TextColor3 = Color3.fromRGB(13, 14, 12)}):Play()
		TweenService:Create(icon, TweenInfo.new(0.25 * speed), {ImageColor3 = Color3.fromRGB(13, 14, 12)}):Play()
		task.wait(0.7 * speed)
		
		fill.AnchorPoint = Vector2.new(1, 0)
		fill.Position = UDim2.new(1, 0, 0, 0)
		TweenService:Create(fill, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Cubic, Enum.EasingDirection.InOut), {Size = UDim2.new(0, 0, 1, 0)}):Play()
		task.wait(0.25 * speed)
		TweenService:Create(label, TweenInfo.new(0.25 * speed), {TextColor3 = Color3.new(1, 1, 1)}):Play()
		TweenService:Create(icon, TweenInfo.new(0.25 * speed), {ImageColor3 = Color3.new(1, 1, 1)}):Play()
		task.wait(0.8 * speed)
	end
end)`,

  `-- Rocket Launch Pad Lift & Recoil
task.spawn(function()
	local origPos = icon.Position
	while gui.Parent do
		task.wait(1.8 * speed)
		local blast = TweenService:Create(icon, TweenInfo.new(0.4 * speed, Enum.EasingStyle.Cubic, Enum.EasingDirection.In), {
			Position = origPos + UDim2.fromOffset(46, -34),
			ImageTransparency = 1,
			Rotation = 25
		})
		blast:Play()
		blast.Completed:Wait()
		
		icon.Position = origPos + UDim2.fromOffset(-46, 34)
		icon.Rotation = -15
		icon.ImageTransparency = 0.6
		
		local land = TweenService:Create(icon, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {
			Position = origPos,
			ImageTransparency = 0,
			Rotation = 0
		})
		land:Play()
		land.Completed:Wait()
	end
end)`,

  `-- 3D Mechanical Key Tactile Press
task.spawn(function()
	local origPos = root.Position
	while gui.Parent do
		task.wait(1.8 * speed)
		TweenService:Create(root, TweenInfo.new(0.12 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = origPos + UDim2.fromOffset(0, 5)}):Play()
		task.wait(0.14 * speed)
		TweenService:Create(root, TweenInfo.new(0.18 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = origPos}):Play()
	end
end)`
]

export function scriptFor(asset: Asset, custom?: CustomConfig) {
  const c = asset.categoryIndex
  const radius = c === 6 ? (asset.style ? 75 : 28) : asset.style ? 38 : 14
  const label = custom?.customLabel || asset.customLabel || buttonLabels[asset.variant] || asset.name.toUpperCase()
  const body = builders[c](asset)
    .replaceAll('__RADIUS__', String(radius))
    .replaceAll('__LABEL__', label)
    .replaceAll('__SEED__', String(asset.id * 17))
    .replaceAll('${radius}', String(radius))
    .replaceAll('${LABEL}', label)
    .replaceAll('${seed}', String(asset.id * 17))
  // For Buttons (c === 0) and Toggles (c === 8), animations trigger strictly on click/interaction - no continuous background loop
  if (c === 0 || c === 8) {
    return `${prelude(asset, custom)}
${body}
`
  }

  const motion = asset.archetype === 3 && [1, 5, 9].includes(c) ? 'loop(icon, {Rotation = 10}, 1.1)' : motions[asset.archetype]
  return `${prelude(asset, custom)}
${body}

-- MOTION
${motion}
`
}
