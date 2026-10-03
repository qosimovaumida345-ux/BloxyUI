// BloxyUI Figma-to-Roblox Master Luau Code Engine
// Generates 100% procedural, pixel-perfect, asset-free Roblox UI elements

function generateProceduralLuau(options = {}) {
  const text = (options.text || 'SHOP').toUpperCase();
  const themeKey = options.theme || 'cartoony';
  const iconKey = options.icon || 'shop';
  const hasSparkles = options.sparkles !== false;
  const hasShine = options.shine !== false;
  const hasIdleFloat = options.idleFloat !== false;

  // Color Palettes
  const themes = {
    cartoony: {
      shadow: 'Color3.fromRGB(154, 20, 40)',
      stroke: 'Color3.fromRGB(255, 149, 142)',
      gradTop: 'Color3.fromRGB(255, 87, 94)',
      gradBottom: 'Color3.fromRGB(230, 34, 57)',
      textShadow: 'Color3.fromRGB(169, 24, 44)',
      stripeSecondary: 'Color3.fromRGB(228, 44, 64)'
    },
    gold: {
      shadow: 'Color3.fromRGB(160, 110, 15)',
      stroke: 'Color3.fromRGB(255, 235, 150)',
      gradTop: 'Color3.fromRGB(255, 215, 0)',
      gradBottom: 'Color3.fromRGB(218, 165, 32)',
      textShadow: 'Color3.fromRGB(150, 95, 10)',
      stripeSecondary: 'Color3.fromRGB(218, 165, 32)'
    },
    neon: {
      shadow: 'Color3.fromRGB(35, 15, 75)',
      stroke: 'Color3.fromRGB(0, 235, 255)',
      gradTop: 'Color3.fromRGB(120, 90, 255)',
      gradBottom: 'Color3.fromRGB(70, 40, 210)',
      textShadow: 'Color3.fromRGB(40, 20, 95)',
      stripeSecondary: 'Color3.fromRGB(0, 200, 220)'
    },
    emerald: {
      shadow: 'Color3.fromRGB(10, 90, 60)',
      stroke: 'Color3.fromRGB(120, 255, 190)',
      gradTop: 'Color3.fromRGB(46, 204, 113)',
      gradBottom: 'Color3.fromRGB(39, 174, 96)',
      textShadow: 'Color3.fromRGB(15, 80, 50)',
      stripeSecondary: 'Color3.fromRGB(30, 150, 80)'
    },
    void: {
      shadow: 'Color3.fromRGB(15, 15, 25)',
      stroke: 'Color3.fromRGB(140, 150, 170)',
      gradTop: 'Color3.fromRGB(50, 55, 70)',
      gradBottom: 'Color3.fromRGB(30, 35, 45)',
      textShadow: 'Color3.fromRGB(15, 15, 20)',
      stripeSecondary: 'Color3.fromRGB(40, 45, 60)'
    }
  };

  const currentTheme = themes[themeKey] || themes.cartoony;

  // Procedural Icon Construction
  let iconCode = '';
  if (iconKey === 'shop') {
    iconCode = `
-- Procedural Market Stall Icon (Zero texture dependencies)
local icon = create("Frame", {
    Name = "MarketStallIcon", Position = UDim2.fromOffset(46, 21),
    Size = UDim2.fromOffset(49, 48), BackgroundTransparency = 1, ZIndex = 3,
}, button)
local white = Color3.new(1, 1, 1)
local function part(parent, position, size, color, layer)
    return create("Frame", { Position = position, Size = size,
        BackgroundColor3 = color, BorderSizePixel = 0, ZIndex = layer or 4 }, parent)
end
part(icon, UDim2.fromOffset(6, 1), UDim2.fromOffset(37, 6), white)
part(icon, UDim2.fromOffset(1, 7), UDim2.fromOffset(47, 7), white)
for stripe = 0, 4 do
    local awning = part(icon, UDim2.fromOffset(1 + stripe * 9, 14),
        UDim2.fromOffset(9, 10), stripe % 2 == 0 and white or ${currentTheme.stripeSecondary})
    corner(awning, 3)
end
part(icon, UDim2.fromOffset(5, 24), UDim2.fromOffset(4, 19), white)
part(icon, UDim2.fromOffset(40, 24), UDim2.fromOffset(4, 19), white)
corner(part(icon, UDim2.fromOffset(2, 38), UDim2.fromOffset(45, 10), white), 2)
`;
  } else if (iconKey === 'crown') {
    iconCode = `
-- Procedural VIP Crown Icon
local icon = create("Frame", {
    Name = "CrownIcon", Position = UDim2.fromOffset(46, 22),
    Size = UDim2.fromOffset(48, 46), BackgroundTransparency = 1, ZIndex = 3,
}, button)
local white = Color3.new(1, 1, 1)
local function part(parent, position, size, color, layer)
    return create("Frame", { Position = position, Size = size,
        BackgroundColor3 = color, BorderSizePixel = 0, ZIndex = layer or 4 }, parent)
end
-- Crown base and jewels
corner(part(icon, UDim2.fromOffset(4, 34), UDim2.fromOffset(40, 8), white), 3)
corner(part(icon, UDim2.fromOffset(6, 18), UDim2.fromOffset(8, 18), white), 3)
corner(part(icon, UDim2.fromOffset(20, 10), UDim2.fromOffset(8, 26), white), 3)
corner(part(icon, UDim2.fromOffset(34, 18), UDim2.fromOffset(8, 18), white), 3)
corner(part(icon, UDim2.fromOffset(8, 12), UDim2.fromOffset(4, 4), ${currentTheme.stripeSecondary}), 2)
corner(part(icon, UDim2.fromOffset(22, 4), UDim2.fromOffset(4, 4), ${currentTheme.stripeSecondary}), 2)
corner(part(icon, UDim2.fromOffset(36, 12), UDim2.fromOffset(4, 4), ${currentTheme.stripeSecondary}), 2)
`;
  } else if (iconKey === 'sword') {
    iconCode = `
-- Procedural Combat Sword Icon
local icon = create("Frame", {
    Name = "SwordIcon", Position = UDim2.fromOffset(48, 20),
    Size = UDim2.fromOffset(46, 48), BackgroundTransparency = 1, ZIndex = 3,
}, button)
local white = Color3.new(1, 1, 1)
local function part(parent, position, size, color, layer)
    return create("Frame", { Position = position, Size = size,
        BackgroundColor3 = color, BorderSizePixel = 0, ZIndex = layer or 4 }, parent)
end
local blade = part(icon, UDim2.fromOffset(19, 4), UDim2.fromOffset(8, 28), white)
corner(blade, 3)
local guard = part(icon, UDim2.fromOffset(9, 31), UDim2.fromOffset(28, 5), white)
corner(guard, 2)
local hilt = part(icon, UDim2.fromOffset(20, 36), UDim2.fromOffset(6, 9), ${currentTheme.stripeSecondary})
corner(hilt, 2)
`;
  } else {
    // Star / Gem procedural
    iconCode = `
-- Procedural Star Icon
local icon = create("Frame", {
    Name = "StarIcon", Position = UDim2.fromOffset(48, 22),
    Size = UDim2.fromOffset(46, 46), BackgroundTransparency = 1, ZIndex = 3,
}, button)
local white = Color3.new(1, 1, 1)
local function part(parent, position, size, color, layer)
    return create("Frame", { Position = position, Size = size,
        BackgroundColor3 = color, BorderSizePixel = 0, ZIndex = layer or 4 }, parent)
end
local v = part(icon, UDim2.fromOffset(18, 4), UDim2.fromOffset(10, 38), white)
local h = part(icon, UDim2.fromOffset(4, 18), UDim2.fromOffset(38, 10), white)
corner(v, 4)
corner(h, 4)
local c = part(icon, UDim2.fromOffset(13, 13), UDim2.fromOffset(20, 20), ${currentTheme.stripeSecondary})
c.Rotation = 45
corner(c, 3)
`;
  }

  return `-- ==============================================================================
-- [BloxyUI] Figma-to-Roblox Master Component
-- Component: ${text} Button
-- Architecture: Procedural Vector Render (Zero Asset ID Dependencies)
-- ==============================================================================

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local animationsEnabled = true
local buttonPosition = UDim2.fromScale(0.5, 0.5)

local function create(className, properties, parent)
    local instance = Instance.new(className)
    for property, value in pairs(properties) do
        instance[property] = value
    end
    instance.Parent = parent
    return instance
end

local function corner(parent, radius)
    create("UICorner", { CornerRadius = UDim.new(0, radius) }, parent)
end

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local previous = playerGui:FindFirstChild("${text}ButtonGui")
if previous then previous:Destroy() end

local screen = create("ScreenGui", {
    Name = "${text}ButtonGui",
    ResetOnSpawn = false,
    ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
}, playerGui)

-- Holder with UIScale for spring physics
local holder = create("Frame", {
    Name = "ButtonHolder",
    AnchorPoint = Vector2.new(0.5, 0.5),
    Position = buttonPosition,
    Size = UDim2.fromOffset(272, 90),
    BackgroundTransparency = 1,
}, screen)

local scale = create("UIScale", { Scale = 1 }, holder)

-- 3D Extrusion Shadow Layer
local shadow = create("Frame", {
    Name = "DepthShadow",
    Position = UDim2.fromOffset(0, 7),
    Size = UDim2.fromScale(1, 1),
    BackgroundColor3 = ${currentTheme.shadow},
    BorderSizePixel = 0,
}, holder)
corner(shadow, 17)

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
corner(button, 17)

-- Upper Highlight Stroke & 3D Gradient
create("UIStroke", {
    ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
    Color = ${currentTheme.stroke},
    Thickness = 3
}, button)

create("UIGradient", {
    Rotation = 90,
    Color = ColorSequence.new(${currentTheme.gradTop}, ${currentTheme.gradBottom})
}, button)
${iconCode}
-- Dual-Layered Beveled 3D Text
local white = Color3.new(1, 1, 1)
local function textLabel(position, color, layer)
    return create("TextLabel", {
        BackgroundTransparency = 1,
        Position = position,
        Size = UDim2.fromOffset(130, 90),
        Text = "${text}",
        TextColor3 = color,
        TextSize = 32,
        Font = Enum.Font.GothamBlack,
        ZIndex = layer,
    }, button)
end

textLabel(UDim2.fromOffset(110, 3), ${currentTheme.textShadow}, 4) -- Drop shadow
textLabel(UDim2.fromOffset(110, 0), white, 5) -- Crisp top text
${hasSparkles ? `
-- 7 Animated Procedural Glint Sparkles
local locations = {
    {0.08, 0.19, 10}, {0.32, 0.11, 7}, {0.87, 0.18, 10},
    {0.91, 0.63, 8}, {0.68, 0.81, 7}, {0.09, 0.74, 6}, {0.40, 0.78, 6},
}

for index, location in ipairs(locations) do
    local sparkle = create("Frame", {
        Name = "WhiteSparkle",
        BackgroundTransparency = 1,
        Position = UDim2.fromScale(location[1], location[2]),
        Size = UDim2.fromOffset(location[3], location[3]),
        ZIndex = 2,
    }, button)

    local sparkleScale = create("UIScale", { Scale = 0.45 }, sparkle)
    local vertical = create("Frame", {
        Position = UDim2.fromScale(0.4, 0), Size = UDim2.fromScale(0.2, 1),
        BackgroundColor3 = white, BorderSizePixel = 0, ZIndex = 2
    }, sparkle)
    local horizontal = create("Frame", {
        Position = UDim2.fromScale(0, 0.4), Size = UDim2.fromScale(1, 0.2),
        BackgroundColor3 = white, BorderSizePixel = 0, ZIndex = 2
    }, sparkle)
    local center = create("Frame", {
        Position = UDim2.fromScale(0.25, 0.25), Size = UDim2.fromScale(0.5, 0.5),
        BackgroundColor3 = white, BorderSizePixel = 0, ZIndex = 2, Rotation = 45
    }, sparkle)

    for _, segment in ipairs({vertical, horizontal, center}) do
        segment.BackgroundTransparency = 0.65
        if animationsEnabled then
            TweenService:Create(segment, TweenInfo.new(1.3, Enum.EasingStyle.Sine,
                Enum.EasingDirection.InOut, -1, true, index * 0.17), {
                BackgroundTransparency = 0.05,
            }):Play()
        end
    end

    if animationsEnabled then
        TweenService:Create(sparkleScale, TweenInfo.new(1.3, Enum.EasingStyle.Sine,
            Enum.EasingDirection.InOut, -1, true, index * 0.17), { Scale = 1 }):Play()
    end
end
` : ''}
${hasShine ? `
-- Specular Reflection Sweep Bar
local shine = create("Frame", {
    Position = UDim2.fromScale(-0.4, -0.5),
    Size = UDim2.fromOffset(40, 180),
    BackgroundColor3 = white,
    BorderSizePixel = 0,
    Rotation = 20,
    BackgroundTransparency = 0.87,
    ZIndex = 2,
}, button)

local activeShineTween
local function sweepShine()
    if not animationsEnabled then return end
    if activeShineTween then activeShineTween:Cancel() end
    shine.Position = UDim2.fromScale(-0.4, -0.5)
    activeShineTween = TweenService:Create(shine,
        TweenInfo.new(0.55, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
            Position = UDim2.fromScale(1.4, -0.5),
        })
    activeShineTween:Play()
end
` : 'local function sweepShine() end'}
${hasIdleFloat ? `
-- Gentle Idle Levitation Float
if animationsEnabled then
    TweenService:Create(holder, TweenInfo.new(1.5, Enum.EasingStyle.Sine,
        Enum.EasingDirection.InOut, -1, true), {
        Position = buttonPosition - UDim2.fromOffset(0, 4),
    }):Play()
end
` : ''}
-- Micro-Interactions & Spring Physics
local hovering = false
local activeScaleTween
local function resize(value)
    if activeScaleTween then activeScaleTween:Cancel() end
    activeScaleTween = TweenService:Create(scale, TweenInfo.new(0.15), { Scale = value })
    activeScaleTween:Play()
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
    resize(0.98)
    sweepShine()
end)

button.MouseButton1Up:Connect(function()
    resize(hovering and 1.045 or 1)
    sweepShine()
end)

-- Activation BindableEvent
local buttonClicked = create("BindableEvent", { Name = "${text}Clicked" }, screen)
button.Activated:Connect(function()
    resize(hovering and 1.045 or 1)
    buttonClicked:Fire()
    print("BloxyUI: ${text} Activated!")
end)

return screen
`;
}

module.exports = {
  generateLuauCode: generateProceduralLuau
};
