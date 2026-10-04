// BloxyUI Figma-to-Roblox Master Luau Code Engine
// Generates 100% procedural, pixel-perfect, asset-free Roblox UI elements
// Supports 5 Component Types: Button, Panel, ProgressBar, Card, Toast

const THEMES = {
  cartoony: {
    name: 'Cartoony Red',
    shadow: 'Color3.fromRGB(154, 20, 40)',
    stroke: 'Color3.fromRGB(255, 149, 142)',
    gradTop: 'Color3.fromRGB(255, 87, 94)',
    gradBottom: 'Color3.fromRGB(230, 34, 57)',
    textShadow: 'Color3.fromRGB(169, 24, 44)',
    accent: 'Color3.fromRGB(228, 44, 64)'
  },
  gold: {
    name: 'Royal Gold',
    shadow: 'Color3.fromRGB(160, 110, 15)',
    stroke: 'Color3.fromRGB(255, 235, 150)',
    gradTop: 'Color3.fromRGB(255, 215, 0)',
    gradBottom: 'Color3.fromRGB(218, 165, 32)',
    textShadow: 'Color3.fromRGB(150, 95, 10)',
    accent: 'Color3.fromRGB(218, 165, 32)'
  },
  neon: {
    name: 'Cyber Neon',
    shadow: 'Color3.fromRGB(35, 15, 75)',
    stroke: 'Color3.fromRGB(0, 235, 255)',
    gradTop: 'Color3.fromRGB(120, 90, 255)',
    gradBottom: 'Color3.fromRGB(70, 40, 210)',
    textShadow: 'Color3.fromRGB(40, 20, 95)',
    accent: 'Color3.fromRGB(0, 200, 220)'
  },
  emerald: {
    name: 'Toxic Emerald',
    shadow: 'Color3.fromRGB(10, 90, 60)',
    stroke: 'Color3.fromRGB(120, 255, 190)',
    gradTop: 'Color3.fromRGB(46, 204, 113)',
    gradBottom: 'Color3.fromRGB(39, 174, 96)',
    textShadow: 'Color3.fromRGB(15, 80, 50)',
    accent: 'Color3.fromRGB(30, 150, 80)'
  },
  void: {
    name: 'Dark Obsidian',
    shadow: 'Color3.fromRGB(15, 15, 25)',
    stroke: 'Color3.fromRGB(140, 150, 170)',
    gradTop: 'Color3.fromRGB(50, 55, 70)',
    gradBottom: 'Color3.fromRGB(30, 35, 45)',
    textShadow: 'Color3.fromRGB(15, 15, 20)',
    accent: 'Color3.fromRGB(40, 45, 60)'
  },
  pink: {
    name: 'Bubblegum Pop',
    shadow: 'Color3.fromRGB(156, 20, 69)',
    stroke: 'Color3.fromRGB(255, 179, 209)',
    gradTop: 'Color3.fromRGB(255, 107, 157)',
    gradBottom: 'Color3.fromRGB(238, 63, 126)',
    textShadow: 'Color3.fromRGB(160, 16, 64)',
    accent: 'Color3.fromRGB(255, 64, 129)'
  },
  ocean: {
    name: 'Deep Ocean',
    shadow: 'Color3.fromRGB(3, 4, 94)',
    stroke: 'Color3.fromRGB(144, 224, 239)',
    gradTop: 'Color3.fromRGB(0, 180, 216)',
    gradBottom: 'Color3.fromRGB(0, 119, 182)',
    textShadow: 'Color3.fromRGB(2, 62, 138)',
    accent: 'Color3.fromRGB(0, 150, 199)'
  },
  magma: {
    name: 'Molten Magma',
    shadow: 'Color3.fromRGB(157, 2, 8)',
    stroke: 'Color3.fromRGB(255, 183, 3)',
    gradTop: 'Color3.fromRGB(255, 123, 0)',
    gradBottom: 'Color3.fromRGB(232, 93, 4)',
    textShadow: 'Color3.fromRGB(106, 4, 15)',
    accent: 'Color3.fromRGB(220, 47, 2)'
  },
  purple: {
    name: 'Mystic Amethyst',
    shadow: 'Color3.fromRGB(60, 9, 108)',
    stroke: 'Color3.fromRGB(224, 170, 255)',
    gradTop: 'Color3.fromRGB(157, 78, 221)',
    gradBottom: 'Color3.fromRGB(123, 44, 191)',
    textShadow: 'Color3.fromRGB(36, 0, 70)',
    accent: 'Color3.fromRGB(90, 24, 154)'
  },
  frost: {
    name: 'Frostbite Cyan',
    shadow: 'Color3.fromRGB(2, 62, 138)',
    stroke: 'Color3.fromRGB(202, 240, 248)',
    gradTop: 'Color3.fromRGB(72, 202, 228)',
    gradBottom: 'Color3.fromRGB(0, 150, 199)',
    textShadow: 'Color3.fromRGB(0, 119, 182)',
    accent: 'Color3.fromRGB(0, 180, 216)'
  },
  lime: {
    name: 'Biohazard Lime',
    shadow: 'Color3.fromRGB(43, 76, 6)',
    stroke: 'Color3.fromRGB(212, 241, 112)',
    gradTop: 'Color3.fromRGB(170, 204, 0)',
    gradBottom: 'Color3.fromRGB(128, 185, 24)',
    textShadow: 'Color3.fromRGB(30, 55, 4)',
    accent: 'Color3.fromRGB(85, 166, 48)'
  },
  sunset: {
    name: 'Sunset Coral',
    shadow: 'Color3.fromRGB(140, 29, 64)',
    stroke: 'Color3.fromRGB(254, 211, 48)',
    gradTop: 'Color3.fromRGB(255, 159, 67)',
    gradBottom: 'Color3.fromRGB(238, 82, 83)',
    textShadow: 'Color3.fromRGB(112, 21, 48)',
    accent: 'Color3.fromRGB(255, 107, 107)'
  },
  crimson: {
    name: 'Blood Crimson',
    shadow: 'Color3.fromRGB(64, 6, 3)',
    stroke: 'Color3.fromRGB(231, 76, 60)',
    gradTop: 'Color3.fromRGB(192, 57, 43)',
    gradBottom: 'Color3.fromRGB(120, 24, 18)',
    textShadow: 'Color3.fromRGB(48, 4, 2)',
    accent: 'Color3.fromRGB(150, 45, 34)'
  },
  galaxy: {
    name: 'Cosmic Nebula',
    shadow: 'Color3.fromRGB(44, 27, 116)',
    stroke: 'Color3.fromRGB(253, 121, 168)',
    gradTop: 'Color3.fromRGB(162, 155, 254)',
    gradBottom: 'Color3.fromRGB(108, 92, 231)',
    textShadow: 'Color3.fromRGB(30, 16, 88)',
    accent: 'Color3.fromRGB(129, 236, 236)'
  },
  silver: {
    name: 'Platinum Chrome',
    shadow: 'Color3.fromRGB(45, 52, 54)',
    stroke: 'Color3.fromRGB(223, 230, 233)',
    gradTop: 'Color3.fromRGB(178, 190, 195)',
    gradBottom: 'Color3.fromRGB(99, 110, 114)',
    textShadow: 'Color3.fromRGB(30, 39, 46)',
    accent: 'Color3.fromRGB(116, 185, 255)'
  },
  minimal: {
    name: 'Midnight Slate',
    shadow: 'Color3.fromRGB(12, 13, 16)',
    stroke: 'Color3.fromRGB(87, 96, 111)',
    gradTop: 'Color3.fromRGB(47, 53, 66)',
    gradBottom: 'Color3.fromRGB(30, 34, 42)',
    textShadow: 'Color3.fromRGB(5, 6, 8)',
    accent: 'Color3.fromRGB(112, 161, 255)'
  }
};

function getProceduralIconCode(iconKey, currentTheme, parentName = "button") {
  const white = 'Color3.new(1, 1, 1)';
  if (iconKey === 'shop') {
    return `
local icon = create("Frame", { Name = "IconShop", Position = UDim2.fromOffset(26, 21), Size = UDim2.fromOffset(48, 48), BackgroundTransparency = 1, ZIndex = 3 }, ${parentName})
part(icon, UDim2.fromOffset(6, 2), UDim2.fromOffset(36, 6), ${white})
part(icon, UDim2.fromOffset(1, 8), UDim2.fromOffset(46, 6), ${white})
for stripe = 0, 4 do
    local awning = part(icon, UDim2.fromOffset(1 + stripe * 9, 14), UDim2.fromOffset(9, 10), stripe % 2 == 0 and ${white} or ${currentTheme.accent})
    corner(awning, 3)
end
part(icon, UDim2.fromOffset(5, 24), UDim2.fromOffset(4, 18), ${white})
part(icon, UDim2.fromOffset(39, 24), UDim2.fromOffset(4, 18), ${white})
corner(part(icon, UDim2.fromOffset(2, 38), UDim2.fromOffset(44, 9), ${white}), 2)
`;
  } else if (iconKey === 'crown') {
    return `
local icon = create("Frame", { Name = "IconCrown", Position = UDim2.fromOffset(26, 22), Size = UDim2.fromOffset(48, 46), BackgroundTransparency = 1, ZIndex = 3 }, ${parentName})
corner(part(icon, UDim2.fromOffset(4, 34), UDim2.fromOffset(40, 8), ${white}), 3)
corner(part(icon, UDim2.fromOffset(6, 18), UDim2.fromOffset(8, 18), ${white}), 3)
corner(part(icon, UDim2.fromOffset(20, 10), UDim2.fromOffset(8, 26), ${white}), 3)
corner(part(icon, UDim2.fromOffset(34, 18), UDim2.fromOffset(8, 18), ${white}), 3)
corner(part(icon, UDim2.fromOffset(8, 12), UDim2.fromOffset(4, 4), ${currentTheme.accent}), 2)
corner(part(icon, UDim2.fromOffset(22, 4), UDim2.fromOffset(4, 4), ${currentTheme.accent}), 2)
corner(part(icon, UDim2.fromOffset(36, 12), UDim2.fromOffset(4, 4), ${currentTheme.accent}), 2)
`;
  } else if (iconKey === 'sword') {
    return `
local icon = create("Frame", { Name = "IconSword", Position = UDim2.fromOffset(28, 20), Size = UDim2.fromOffset(46, 48), BackgroundTransparency = 1, ZIndex = 3 }, ${parentName})
local blade = part(icon, UDim2.fromOffset(19, 4), UDim2.fromOffset(8, 28), ${white})
corner(blade, 3)
local guard = part(icon, UDim2.fromOffset(9, 31), UDim2.fromOffset(28, 5), ${white})
corner(guard, 2)
local hilt = part(icon, UDim2.fromOffset(20, 36), UDim2.fromOffset(6, 9), ${currentTheme.accent})
corner(hilt, 2)
`;
  } else if (iconKey === 'heart') {
    return `
local icon = create("Frame", { Name = "IconHeart", Position = UDim2.fromOffset(28, 22), Size = UDim2.fromOffset(46, 46), BackgroundTransparency = 1, ZIndex = 3 }, ${parentName})
local l = part(icon, UDim2.fromOffset(6, 6), UDim2.fromOffset(20, 20), ${white})
local r = part(icon, UDim2.fromOffset(20, 6), UDim2.fromOffset(20, 20), ${white})
corner(l, 10); corner(r, 10)
local bottom = part(icon, UDim2.fromOffset(11, 14), UDim2.fromOffset(24, 24), ${white})
bottom.Rotation = 45; corner(bottom, 4)
`;
  } else if (iconKey === 'shield') {
    return `
local icon = create("Frame", { Name = "IconShield", Position = UDim2.fromOffset(28, 20), Size = UDim2.fromOffset(46, 48), BackgroundTransparency = 1, ZIndex = 3 }, ${parentName})
local body = part(icon, UDim2.fromOffset(6, 4), UDim2.fromOffset(34, 38), ${white})
corner(body, 8)
local emblem = part(icon, UDim2.fromOffset(16, 14), UDim2.fromOffset(14, 18), ${currentTheme.accent})
corner(emblem, 4)
`;
  } else if (iconKey === 'coin') {
    return `
local icon = create("Frame", { Name = "IconCoin", Position = UDim2.fromOffset(28, 20), Size = UDim2.fromOffset(46, 46), BackgroundTransparency = 1, ZIndex = 3 }, ${parentName})
local coinCircle = part(icon, UDim2.fromOffset(4, 4), UDim2.fromOffset(38, 38), ${white})
corner(coinCircle, 19)
local coinInner = part(icon, UDim2.fromOffset(9, 9), UDim2.fromOffset(28, 28), ${currentTheme.accent})
corner(coinInner, 14)
`;
  } else if (iconKey === 'bolt') {
    return `
local icon = create("Frame", { Name = "IconBolt", Position = UDim2.fromOffset(28, 20), Size = UDim2.fromOffset(46, 48), BackgroundTransparency = 1, ZIndex = 3 }, ${parentName})
local topB = part(icon, UDim2.fromOffset(16, 4), UDim2.fromOffset(12, 22), ${white})
topB.Rotation = 25; corner(topB, 2)
local botB = part(icon, UDim2.fromOffset(16, 22), UDim2.fromOffset(12, 22), ${currentTheme.accent})
botB.Rotation = 25; corner(botB, 2)
`;
  } else {
    // Star Default
    return `
local icon = create("Frame", { Name = "IconStar", Position = UDim2.fromOffset(28, 22), Size = UDim2.fromOffset(46, 46), BackgroundTransparency = 1, ZIndex = 3 }, ${parentName})
local v = part(icon, UDim2.fromOffset(18, 4), UDim2.fromOffset(10, 38), ${white})
local h = part(icon, UDim2.fromOffset(4, 18), UDim2.fromOffset(38, 10), ${white})
corner(v, 4); corner(h, 4)
local c = part(icon, UDim2.fromOffset(13, 13), UDim2.fromOffset(20, 20), ${currentTheme.accent})
c.Rotation = 45; corner(c, 3)
`;
  }
}

function generateProceduralLuau(options = {}) {
  const componentType = options.componentType || 'button';
  const text = (options.text || (componentType === 'panel' ? 'INVENTORY' : componentType === 'progressbar' ? 'LEVEL 42' : 'SHOP')).toUpperCase();
  const subText = options.subText || (componentType === 'progressbar' ? '750 / 1,000 XP' : '99 ROBUX');
  const themeKey = options.theme || 'cartoony';
  const iconKey = options.icon || 'shop';
  const hasSparkles = options.sparkles !== false;
  const hasShine = options.shine !== false;
  const hasIdleFloat = options.idleFloat !== false;
  const bevelOffset = typeof options.bevelOffset === 'number' ? options.bevelOffset : 7;
  const cornerRadius = typeof options.cornerRadius === 'number' ? options.cornerRadius : 17;
  const strokeWidth = typeof options.strokeWidth === 'number' ? options.strokeWidth : 3;

  const currentTheme = THEMES[themeKey] || THEMES.cartoony;

  // COMMON HEADER
  const boilerplate = `-- ==============================================================================
-- [BloxyUI] Figma-to-Roblox Master Procedural Component
-- Type: ${componentType.toUpperCase()} | Theme: ${currentTheme.name}
-- Zero Asset IDs - 100% Procedural Vector Code - Studio Ready
-- ==============================================================================

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")
local animationsEnabled = true

local function create(className, properties, parent)
    local instance = Instance.new(className)
    for property, value in pairs(properties) do
        instance[property] = value
    end
    instance.Parent = parent
    return instance
end

local function corner(parent, radius)
    return create("UICorner", { CornerRadius = UDim.new(0, radius) }, parent)
end

local function part(parent, position, size, color, layer)
    return create("Frame", {
        Position = position, Size = size, BackgroundColor3 = color,
        BorderSizePixel = 0, ZIndex = layer or 4
    }, parent)
end

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local previous = playerGui:FindFirstChild("BloxyUI_${componentType.toUpperCase()}")
if previous then previous:Destroy() end

local screen = create("ScreenGui", {
    Name = "BloxyUI_${componentType.toUpperCase()}",
    ResetOnSpawn = false,
    ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
}, playerGui)
`;

  // 1. BUTTON COMPONENT
  if (componentType === 'button') {
    const iconCode = getProceduralIconCode(iconKey, currentTheme, "button");
    return `${boilerplate}
local holder = create("Frame", {
    Name = "ButtonHolder",
    AnchorPoint = Vector2.new(0.5, 0.5),
    Position = UDim2.fromScale(0.5, 0.5),
    Size = UDim2.fromOffset(272, 90),
    BackgroundTransparency = 1,
}, screen)

local scale = create("UIScale", { Scale = 1 }, holder)

-- 3D Extrusion Shadow Layer
local shadow = create("Frame", {
    Name = "DepthShadow",
    Position = UDim2.fromOffset(0, ${bevelOffset}),
    Size = UDim2.fromScale(1, 1),
    BackgroundColor3 = ${currentTheme.shadow},
    BorderSizePixel = 0,
}, holder)
corner(shadow, ${cornerRadius})

-- Top Interactive Button Surface
local button = create("TextButton", {
    Name = "TopButton",
    Size = UDim2.fromScale(1, 1),
    Text = "",
    BackgroundColor3 = Color3.new(1, 1, 1),
    BorderSizePixel = 0,
    AutoButtonColor = false,
    ClipsDescendants = true,
}, holder)
corner(button, ${cornerRadius})

create("UIStroke", {
    ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
    Color = ${currentTheme.stroke},
    Thickness = ${strokeWidth}
}, button)

create("UIGradient", {
    Rotation = 90,
    Color = ColorSequence.new(${currentTheme.gradTop}, ${currentTheme.gradBottom})
}, button)
${iconCode}
-- Dual-Layer Beveled 3D Text
local white = Color3.new(1, 1, 1)
local textShadow = create("TextLabel", {
    BackgroundTransparency = 1,
    Position = UDim2.fromOffset(92, 17),
    Size = UDim2.fromOffset(165, 34),
    Text = "${text}",
    TextColor3 = ${currentTheme.textShadow},
    TextSize = 28,
    Font = Enum.Font.GothamBlack,
    TextXAlignment = Enum.TextXAlignment.Left,
    ZIndex = 4,
}, button)

local textMain = create("TextLabel", {
    BackgroundTransparency = 1,
    Position = UDim2.fromOffset(92, 14),
    Size = UDim2.fromOffset(165, 34),
    Text = "${text}",
    TextColor3 = white,
    TextSize = 28,
    Font = Enum.Font.GothamBlack,
    TextXAlignment = Enum.TextXAlignment.Left,
    ZIndex = 5,
}, button)

local subLabel = create("TextLabel", {
    BackgroundTransparency = 1,
    Position = UDim2.fromOffset(92, 50),
    Size = UDim2.fromOffset(165, 20),
    Text = "${subText}",
    TextColor3 = ${currentTheme.stroke},
    TextSize = 13,
    Font = Enum.Font.GothamBold,
    TextXAlignment = Enum.TextXAlignment.Left,
    ZIndex = 5,
}, button)
${hasSparkles ? `
-- 7 Glint Sparkles
local locations = {
    {0.08, 0.19, 10}, {0.32, 0.11, 7}, {0.87, 0.18, 10},
    {0.91, 0.63, 8}, {0.68, 0.81, 7}, {0.09, 0.74, 6}, {0.40, 0.78, 6},
}
for index, loc in ipairs(locations) do
    local spk = create("Frame", {
        BackgroundTransparency = 1,
        Position = UDim2.fromScale(loc[1], loc[2]),
        Size = UDim2.fromOffset(loc[3], loc[3]),
        ZIndex = 6,
    }, button)
    local sScale = create("UIScale", { Scale = 0.4 }, spk)
    local v = part(spk, UDim2.fromScale(0.4, 0), UDim2.fromScale(0.2, 1), white, 6)
    local h = part(spk, UDim2.fromScale(0, 0.4), UDim2.fromScale(1, 0.2), white, 6)
    for _, seg in ipairs({v, h}) do
        seg.BackgroundTransparency = 0.7
        TweenService:Create(seg, TweenInfo.new(1.3, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true, index * 0.17), {
            BackgroundTransparency = 0.05
        }):Play()
    end
    TweenService:Create(sScale, TweenInfo.new(1.3, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true, index * 0.17), {
        Scale = 1
    }):Play()
end
` : ''}
${hasShine ? `
-- Specular Shine Reflection Sweep Bar
local shine = create("Frame", {
    Position = UDim2.fromScale(-0.4, -0.5),
    Size = UDim2.fromOffset(40, 200),
    BackgroundColor3 = white,
    BorderSizePixel = 0,
    Rotation = 22,
    BackgroundTransparency = 0.85,
    ZIndex = 6,
}, button)

local function sweepShine()
    shine.Position = UDim2.fromScale(-0.4, -0.5)
    TweenService:Create(shine, TweenInfo.new(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
        Position = UDim2.fromScale(1.4, -0.5)
    }):Play()
end
` : 'local function sweepShine() end'}
${hasIdleFloat ? `
-- Gentle Idle Floating Sine Breath
TweenService:Create(holder, TweenInfo.new(1.5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true), {
    Position = UDim2.fromScale(0.5, 0.5) - UDim2.fromOffset(0, 5),
}):Play()
` : ''}
-- Micro-Interactions & Spring Physics
local hovering = false
local function resize(value)
    TweenService:Create(scale, TweenInfo.new(0.15, Enum.EasingStyle.Back, Enum.EasingDirection.Out), { Scale = value }):Play()
end

button.MouseEnter:Connect(function()
    hovering = true
    resize(1.045)
end)

button.MouseLeave:Connect(function()
    hovering = false
    resize(1)
end)

button.MouseButton1Down:Connect(function()
    resize(0.96)
    sweepShine()
end)

button.MouseButton1Up:Connect(function()
    resize(hovering and 1.045 or 1)
end)

button.Activated:Connect(function()
    print("BloxyUI Button Activated: ${text}!")
end)

return screen
`;
  }

  // 2. PANEL / MODAL COMPONENT
  if (componentType === 'panel') {
    return `${boilerplate}
local holder = create("Frame", {
    Name = "PanelHolder",
    AnchorPoint = Vector2.new(0.5, 0.5),
    Position = UDim2.fromScale(0.5, 0.5),
    Size = UDim2.fromOffset(360, 280),
    BackgroundTransparency = 1,
}, screen)

local scale = create("UIScale", { Scale = 1 }, holder)

-- 3D Depth Shadow
local shadow = create("Frame", {
    Position = UDim2.fromOffset(0, ${bevelOffset}),
    Size = UDim2.fromScale(1, 1),
    BackgroundColor3 = ${currentTheme.shadow},
    BorderSizePixel = 0,
}, holder)
corner(shadow, ${cornerRadius})

-- Window Frame Body
local frame = create("Frame", {
    Name = "WindowFrame",
    Size = UDim2.fromScale(1, 1),
    BackgroundColor3 = Color3.fromRGB(24, 27, 36),
    BorderSizePixel = 0,
    ClipsDescendants = true,
}, holder)
corner(frame, ${cornerRadius})

create("UIStroke", {
    ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
    Color = ${currentTheme.stroke},
    Thickness = ${strokeWidth}
}, frame)

-- Beveled Header Bar
local header = create("Frame", {
    Name = "HeaderBar",
    Size = UDim2.new(1, 0, 0, 52),
    BackgroundColor3 = Color3.new(1, 1, 1),
    BorderSizePixel = 0,
}, frame)
corner(header, ${cornerRadius})

create("UIGradient", {
    Rotation = 90,
    Color = ColorSequence.new(${currentTheme.gradTop}, ${currentTheme.gradBottom})
}, header)

local white = Color3.new(1, 1, 1)
local titleLabel = create("TextLabel", {
    BackgroundTransparency = 1,
    Position = UDim2.fromOffset(20, 0),
    Size = UDim2.new(1, -70, 1, 0),
    Text = "${text}",
    TextColor3 = white,
    TextSize = 20,
    Font = Enum.Font.GothamBlack,
    TextXAlignment = Enum.TextXAlignment.Left,
    ZIndex = 3,
}, header)

-- Close Button
local closeBtn = create("TextButton", {
    Name = "CloseBtn",
    Position = UDim2.new(1, -42, 0, 10),
    Size = UDim2.fromOffset(32, 32),
    BackgroundColor3 = ${currentTheme.shadow},
    Text = "✕",
    TextColor3 = white,
    Font = Enum.Font.GothamBold,
    TextSize = 16,
    BorderSizePixel = 0,
    ZIndex = 3,
}, header)
corner(closeBtn, 8)

closeBtn.Activated:Connect(function()
    TweenService:Create(scale, TweenInfo.new(0.2, Enum.EasingStyle.Back, Enum.EasingDirection.In), { Scale = 0 }):Play()
    task.wait(0.22)
    screen:Destroy()
end)

-- Content Area with 4 Item Slots
local content = create("Frame", {
    Name = "SlotGrid",
    Position = UDim2.fromOffset(20, 72),
    Size = UDim2.new(1, -40, 0, 120),
    BackgroundTransparency = 1,
}, frame)

for i = 1, 4 do
    local slot = create("Frame", {
        Position = UDim2.fromOffset((i-1) * 82, 10),
        Size = UDim2.fromOffset(72, 90),
        BackgroundColor3 = Color3.fromRGB(36, 40, 52),
        BorderSizePixel = 0,
    }, content)
    corner(slot, 10)
    create("UIStroke", { Color = Color3.fromRGB(60, 66, 84), Thickness = 2 }, slot)
    
    local slotLabel = create("TextLabel", {
        BackgroundTransparency = 1,
        Position = UDim2.fromOffset(0, 62),
        Size = UDim2.fromOffset(72, 24),
        Text = "Item #" .. i,
        TextColor3 = Color3.fromRGB(180, 186, 200),
        TextSize = 11,
        Font = Enum.Font.GothamBold,
    }, slot)
end

-- Bottom Action Button
local actionBtn = create("TextButton", {
    Name = "ActionBtn",
    Position = UDim2.new(0.5, -90, 1, -56),
    Size = UDim2.fromOffset(180, 42),
    BackgroundColor3 = Color3.new(1, 1, 1),
    Text = "CLAIM ALL",
    TextColor3 = white,
    TextSize = 16,
    Font = Enum.Font.GothamBlack,
    BorderSizePixel = 0,
}, frame)
corner(actionBtn, 10)
create("UIGradient", { Rotation = 90, Color = ColorSequence.new(${currentTheme.gradTop}, ${currentTheme.gradBottom}) }, actionBtn)
create("UIStroke", { Color = ${currentTheme.stroke}, Thickness = 2 }, actionBtn)

actionBtn.Activated:Connect(function()
    print("BloxyUI Panel Claim Activated!")
end)

return screen
`;
  }

  // 3. PROGRESS / HEALTH / LOADING BAR
  if (componentType === 'progressbar') {
    return `${boilerplate}
local holder = create("Frame", {
    Name = "BarHolder",
    AnchorPoint = Vector2.new(0.5, 0.5),
    Position = UDim2.fromScale(0.5, 0.5),
    Size = UDim2.fromOffset(340, 58),
    BackgroundTransparency = 1,
}, screen)

-- 3D Depth Shadow
local shadow = create("Frame", {
    Position = UDim2.fromOffset(0, ${bevelOffset}),
    Size = UDim2.fromScale(1, 1),
    BackgroundColor3 = ${currentTheme.shadow},
    BorderSizePixel = 0,
}, holder)
corner(shadow, ${cornerRadius})

-- Background Well
local well = create("Frame", {
    Name = "Well",
    Size = UDim2.fromScale(1, 1),
    BackgroundColor3 = Color3.fromRGB(22, 24, 32),
    BorderSizePixel = 0,
    ClipsDescendants = true,
}, holder)
corner(well, ${cornerRadius})

create("UIStroke", {
    ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
    Color = ${currentTheme.stroke},
    Thickness = ${strokeWidth}
}, well)

-- Animated Filled Portion
local fill = create("Frame", {
    Name = "FillBar",
    Size = UDim2.fromScale(0.75, 1),
    BackgroundColor3 = Color3.new(1, 1, 1),
    BorderSizePixel = 0,
    ClipsDescendants = true,
}, well)
corner(fill, ${cornerRadius})

create("UIGradient", {
    Rotation = 90,
    Color = ColorSequence.new(${currentTheme.gradTop}, ${currentTheme.gradBottom})
}, fill)

-- Diagonal Moving Stripes
local stripeContainer = create("Frame", {
    Size = UDim2.fromScale(2, 1),
    Position = UDim2.fromOffset(0, 0),
    BackgroundTransparency = 1,
}, fill)

for s = 0, 16 do
    local strp = part(stripeContainer, UDim2.fromOffset(s * 28, -10), UDim2.fromOffset(14, 80), Color3.new(1, 1, 1), 2)
    strp.Rotation = 25
    strp.BackgroundTransparency = 0.88
end

-- Top Glass Highlight
local glass = create("Frame", {
    Size = UDim2.new(1, 0, 0.45, 0),
    BackgroundColor3 = Color3.new(1, 1, 1),
    BackgroundTransparency = 0.82,
    BorderSizePixel = 0,
    ZIndex = 4,
}, well)

local white = Color3.new(1, 1, 1)
local label = create("TextLabel", {
    BackgroundTransparency = 1,
    Position = UDim2.fromOffset(20, 0),
    Size = UDim2.new(1, -40, 1, 0),
    Text = "${text} — ${subText}",
    TextColor3 = white,
    TextSize = 16,
    Font = Enum.Font.GothamBlack,
    ZIndex = 5,
}, well)

-- Continuous Stripe Movement Animation
RunService.RenderStepped:Connect(function()
    stripeContainer.Position = UDim2.fromOffset((os.clock() * 30) % 28 - 28, 0)
end)

return screen
`;
  }

  // 4. ITEM / LOOT CARD
  if (componentType === 'card') {
    const iconCode = getProceduralIconCode(iconKey, currentTheme, "card");
    return `${boilerplate}
local holder = create("Frame", {
    Name = "CardHolder",
    AnchorPoint = Vector2.new(0.5, 0.5),
    Position = UDim2.fromScale(0.5, 0.5),
    Size = UDim2.fromOffset(210, 260),
    BackgroundTransparency = 1,
}, screen)

local scale = create("UIScale", { Scale = 1 }, holder)

local shadow = create("Frame", {
    Position = UDim2.fromOffset(0, ${bevelOffset}),
    Size = UDim2.fromScale(1, 1),
    BackgroundColor3 = ${currentTheme.shadow},
    BorderSizePixel = 0,
}, holder)
corner(shadow, ${cornerRadius})

local card = create("TextButton", {
    Name = "ItemCard",
    Size = UDim2.fromScale(1, 1),
    Text = "",
    BackgroundColor3 = Color3.fromRGB(24, 26, 36),
    BorderSizePixel = 0,
    ClipsDescendants = true,
}, holder)
corner(card, ${cornerRadius})

create("UIStroke", {
    Color = ${currentTheme.stroke},
    Thickness = ${strokeWidth}
}, card)

-- Top Rarity Badge
local badge = create("Frame", {
    Position = UDim2.fromOffset(16, 14),
    Size = UDim2.new(1, -32, 0, 24),
    BackgroundColor3 = ${currentTheme.accent},
    BorderSizePixel = 0,
}, card)
corner(badge, 6)

local white = Color3.new(1, 1, 1)
create("TextLabel", {
    BackgroundTransparency = 1,
    Size = UDim2.fromScale(1, 1),
    Text = "LEGENDARY ITEM",
    TextColor3 = white,
    TextSize = 11,
    Font = Enum.Font.GothamBlack,
}, badge)

-- Icon Spotlight Pedestal
local spotlight = create("Frame", {
    Position = UDim2.new(0.5, -45, 0, 52),
    Size = UDim2.fromOffset(90, 90),
    BackgroundColor3 = Color3.fromRGB(36, 40, 54),
    BorderSizePixel = 0,
}, card)
corner(spotlight, 45)
create("UIStroke", { Color = ${currentTheme.stroke}, Thickness = 2 }, spotlight)
${iconCode}
-- Card Item Name
create("TextLabel", {
    BackgroundTransparency = 1,
    Position = UDim2.fromOffset(10, 154),
    Size = UDim2.new(1, -20, 0, 28),
    Text = "${text}",
    TextColor3 = white,
    TextSize = 18,
    Font = Enum.Font.GothamBlack,
}, card)

-- Price / Stats
create("TextLabel", {
    BackgroundTransparency = 1,
    Position = UDim2.fromOffset(10, 186),
    Size = UDim2.new(1, -20, 0, 20),
    Text = "${subText}",
    TextColor3 = ${currentTheme.stroke},
    TextSize = 13,
    Font = Enum.Font.GothamBold,
}, card)

-- Bottom Equip Button
local eqBtn = create("TextButton", {
    Position = UDim2.new(0.5, -60, 1, -42),
    Size = UDim2.fromOffset(120, 32),
    BackgroundColor3 = Color3.new(1, 1, 1),
    Text = "EQUIP",
    TextColor3 = white,
    TextSize = 13,
    Font = Enum.Font.GothamBlack,
    BorderSizePixel = 0,
}, card)
corner(eqBtn, 8)
create("UIGradient", { Rotation = 90, Color = ColorSequence.new(${currentTheme.gradTop}, ${currentTheme.gradBottom}) }, eqBtn)

card.MouseEnter:Connect(function()
    TweenService:Create(scale, TweenInfo.new(0.15), { Scale = 1.05 }):Play()
end)
card.MouseLeave:Connect(function()
    TweenService:Create(scale, TweenInfo.new(0.15), { Scale = 1 }):Play()
end)

return screen
`;
  }

  // 5. NOTIFICATION / ACHIEVEMENT TOAST
  return `${boilerplate}
local holder = create("Frame", {
    Name = "ToastHolder",
    AnchorPoint = Vector2.new(0.5, 0),
    Position = UDim2.new(0.5, 0, 0, 25),
    Size = UDim2.fromOffset(360, 80),
    BackgroundTransparency = 1,
}, screen)

local scale = create("UIScale", { Scale = 1 }, holder)

local shadow = create("Frame", {
    Position = UDim2.fromOffset(0, ${bevelOffset}),
    Size = UDim2.fromScale(1, 1),
    BackgroundColor3 = ${currentTheme.shadow},
    BorderSizePixel = 0,
}, holder)
corner(shadow, ${cornerRadius})

local toast = create("Frame", {
    Name = "ToastBody",
    Size = UDim2.fromScale(1, 1),
    BackgroundColor3 = Color3.fromRGB(24, 26, 36),
    BorderSizePixel = 0,
    ClipsDescendants = true,
}, holder)
corner(toast, ${cornerRadius})

create("UIStroke", {
    Color = ${currentTheme.stroke},
    Thickness = ${strokeWidth}
}, toast)

-- Left Accent Stripe
local stripe = create("Frame", {
    Size = UDim2.new(0, 10, 1, 0),
    BackgroundColor3 = Color3.new(1, 1, 1),
    BorderSizePixel = 0,
}, toast)
create("UIGradient", { Rotation = 90, Color = ColorSequence.new(${currentTheme.gradTop}, ${currentTheme.gradBottom}) }, stripe)

local white = Color3.new(1, 1, 1)
create("TextLabel", {
    BackgroundTransparency = 1,
    Position = UDim2.fromOffset(30, 16),
    Size = UDim2.new(1, -40, 0, 24),
    Text = "${text}",
    TextColor3 = white,
    TextSize = 18,
    Font = Enum.Font.GothamBlack,
    TextXAlignment = Enum.TextXAlignment.Left,
}, toast)

create("TextLabel", {
    BackgroundTransparency = 1,
    Position = UDim2.fromOffset(30, 42),
    Size = UDim2.new(1, -40, 0, 20),
    Text = "${subText}",
    TextColor3 = ${currentTheme.stroke},
    TextSize = 13,
    Font = Enum.Font.GothamMedium,
    TextXAlignment = Enum.TextXAlignment.Left,
}, toast)

-- Pop-in animation
holder.Position = UDim2.new(0.5, 0, 0, -100)
TweenService:Create(holder, TweenInfo.new(0.4, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {
    Position = UDim2.new(0.5, 0, 0, 30)
}):Play()

return screen
`;
}

module.exports = {
  generateLuauCode: generateProceduralLuau,
  THEMES
};
