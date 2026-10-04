const fs = require('fs');
const path = require('path');

const assetsTs = fs.readFileSync(path.join(__dirname, '../client/src/assets.ts'), 'utf8');

// Extract categories
const catMatch = assetsTs.match(/export const categories = (\[[\s\S]*?\])/);
const categories = eval(catMatch[1]);

// Extract catalog using indexOf
const catStart = assetsTs.indexOf('const catalog: string[][] = [');
const catEnd = assetsTs.indexOf('export const buttonLabels');
const catalogStr = assetsTs.substring(catStart + 'const catalog: string[][] = '.length, catEnd).trim();
const catalog = eval(catalogStr);

// Extract iconToAssetId
const iconMapMatch = assetsTs.match(/export const iconToAssetId: Record<string, string> = (\{[\s\S]*?\n\})/);
const iconToAssetId = eval('(' + iconMapMatch[1] + ')');

const buttonLabels = ['POWER UP', 'ACTIVATE', 'CLICK ME', 'LAUNCH', 'EXPLORE', 'PLAY', 'JOIN GAME', 'FIGHT', 'SEND', 'START', 'CLAIM GOLD', 'LIKE', 'IGNITE', 'RELAX', 'DISCOVER', 'BUY NOW', 'JOIN SERVER', 'UNLOCK', 'SEND IT', 'CONTINUE'];

const assets = Array.from({ length: 200 }, (_, index) => {
  const categoryIndex = index % 10;
  const variant = Math.floor(index / 10);
  const [name, description, icon] = catalog[categoryIndex][variant].split('|');
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
  };
});

const prelude = (asset) => {
  const h = asset.hue;
  const iconName = asset.icon;
  const assetId = iconToAssetId[iconName] || 'rbxassetid://10709013563';
  const lbl = asset.name.toUpperCase();
  const spd = 1;
  return `-- BLOXFX / ${asset.name}  (${asset.category})
-- ${asset.description}
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(${(h / 360).toFixed(4)}, 0.78, 0.95)
local accent2 = Color3.fromHSV(${(((h + 40) % 360) / 360).toFixed(4)}, 0.7, 1)
local dark = Color3.fromHSV(${(h / 360).toFixed(4)}, 0.55, 0.16)
local iconAssetId = "${assetId}" -- Real Roblox Vector Asset: ${iconName}
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
local function icon(parent, props)
	props.BackgroundTransparency = 1
	props.ScaleType = Enum.ScaleType.Fit
	if not props.Image or props.Image == "" then
		props.Image = iconAssetId
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
`;
};

const builders = [
  (radius, label) => `-- BUTTON
local root = make("TextButton", center(UDim2.fromOffset(280, 76)), gui)
root.Text = ""
root.AutoButtonColor = false
root.ClipsDescendants = true
root.BackgroundColor3 = accent
round(root, ${radius})
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 90}, root)
local stroke = make("UIStroke", {Color = accent2, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.25, 1.8), Position = UDim2.fromScale(-0.5, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.7, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = icon(root, {Image = iconAssetId, ImageColor3 = Color3.new(1, 1, 1), Size = UDim2.fromOffset(36, 36), Position = UDim2.new(0, 22, 0.5, -18), ZIndex = 3})
local label = text(root, {Text = "${label}", TextSize = 22, Size = UDim2.new(1, -85, 1, 0), Position = UDim2.fromOffset(68, 0), TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 3})
root.MouseEnter:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1.06}):Play() end)
root.MouseLeave:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1}):Play() end)
root.Activated:Connect(function()
	if clickSound then clickSound:Play() end
	TweenService:Create(scale, TweenInfo.new(0.08, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Scale = 0.92}):Play()
	task.wait(0.08)
	TweenService:Create(scale, TweenInfo.new(0.18, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1.06}):Play()
end)`,

  (radius, label, seed) => `-- BACKGROUND (Full Screen Ambient FX)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = dark, BorderSizePixel = 0, ClipsDescendants = true, Active = false}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 60, Transparency = NumberSequence.new(0, 0.55)}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.5), Position = UDim2.fromScale(-0.4, -0.2), Rotation = 20, BackgroundColor3 = accent2, BackgroundTransparency = 0.82, BorderSizePixel = 0}, root)
local icon = icon(root, center(UDim2.fromOffset(120, 120)))
icon.ImageColor3 = accent2
icon.ImageTransparency = 0.35
local random = Random.new(${seed})
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

  (radius, label) => `-- LOADER (Spinning Orbit Satellites + Pulsing Core)
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
text(gui, {Text = "${label}", TextSize = 16, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 105), Size = UDim2.fromOffset(220, 24), TextColor3 = accent2})
task.spawn(function()
	while gui.Parent do
		local tw = TweenService:Create(orbit, TweenInfo.new(2.2 * speed, Enum.EasingStyle.Linear), {Rotation = 360})
		tw:Play()
		tw.Completed:Wait()
		orbit.Rotation = 0
	end
end)`,

  (radius, label, seed, subtitle) => `-- CARD
local root = make("Frame", center(UDim2.fromOffset(250, 330)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 22)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 70, Transparency = NumberSequence.new(0.2, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.8), Position = UDim2.fromScale(-0.5, -0.4), Rotation = 22, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.78, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = icon(root, {Image = iconAssetId, ImageColor3 = accent2, Size = UDim2.fromOffset(72, 72), AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0, 42), ZIndex = 3})
text(root, {Text = "${label}", TextSize = 22, Size = UDim2.new(1, -30, 0, 32), Position = UDim2.fromOffset(15, 150), ZIndex = 3})
text(root, {Text = subtitle, TextSize = 13, TextWrapped = true, Font = Enum.Font.Gotham, TextTransparency = 0.25, Size = UDim2.new(1, -40, 0, 80), Position = UDim2.fromOffset(20, 190), TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 3})`,

  (radius, label) => `-- PANEL
local root = make("Frame", center(UDim2.fromOffset(440, 300)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 18)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 90, Transparency = NumberSequence.new(0, 0.75)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.2, 1.8), Position = UDim2.fromScale(-0.4, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.85, BorderSizePixel = 0, ZIndex = 5}, root)
local icon = icon(root, {Image = iconAssetId, ImageColor3 = accent2, Size = UDim2.fromOffset(36, 36), Position = UDim2.fromOffset(16, 14), ZIndex = 3})
text(root, {Text = "${label}", TextSize = 20, Size = UDim2.new(1, -70, 0, 36), Position = UDim2.fromOffset(60, 14), TextXAlignment = Enum.TextXAlignment.Left})
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

  (radius, label, seed, subtitle) => `-- NOTIFICATION
local root = make("Frame", {AnchorPoint = Vector2.new(0.5, 0), Size = UDim2.fromOffset(380, 88), Position = UDim2.new(0.5, 0, 0, -120), BackgroundColor3 = dark, ClipsDescendants = true}, gui)
round(root, 18)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 0, Transparency = NumberSequence.new(0.35, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.15, 2), Position = UDim2.fromScale(-0.3, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.75, BorderSizePixel = 0, ZIndex = 3}, root)
local icon = icon(root, {Image = iconAssetId, ImageColor3 = accent2, Size = UDim2.fromOffset(46, 46), Position = UDim2.fromOffset(16, 20), ZIndex = 3})
text(root, {Text = "${label}", TextSize = 19, Size = UDim2.new(1, -85, 0, 26), Position = UDim2.fromOffset(72, 16), TextXAlignment = Enum.TextXAlignment.Left})
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

  (radius, label) => `-- BADGE
local root = make("Frame", center(UDim2.fromOffset(160, 160)), gui)
root.BackgroundColor3 = accent
root.ClipsDescendants = true
round(root, ${radius})
local stroke = make("UIStroke", {Color = accent2, Thickness = 4, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 90}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.25, 2), Position = UDim2.fromScale(-0.4, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.6, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = icon(root, center(UDim2.fromOffset(72, 72)))
icon.ImageColor3 = Color3.new(1, 1, 1)
icon.ZIndex = 4
text(gui, {Text = "${label}", TextSize = 16, Size = UDim2.fromOffset(260, 26), AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 105), TextColor3 = accent2})`,

  (radius, label) => `-- PROGRESS BAR
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
local icon = icon(gui, {Image = iconAssetId, ImageColor3 = accent2, Size = UDim2.fromOffset(42, 42), AnchorPoint = Vector2.new(1, 0.5), Position = UDim2.new(0.5, -236, 0.5, 0)})
text(root, {Text = "${label}", TextSize = 14, Size = UDim2.fromScale(1, 1), ZIndex = 4})
loop(fill, {Size = UDim2.fromScale(1, 1)}, 2.5, Enum.EasingStyle.Quad, true)`,

  (radius, label) => `-- TOGGLE (Interactive switch)
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
root.Activated:Connect(function() set(not on) end)
task.spawn(function() while gui.Parent do task.wait(2.4 * speed) set(not on) end end)`,

  (radius, label) => `-- TRANSITION (Scene Wipe FX)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = accent, BorderSizePixel = 0, ClipsDescendants = true, ZIndex = 10, Position = UDim2.fromScale(-1, 0)}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 45}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.12, 1.6), Position = UDim2.fromScale(0.9, -0.2), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.6, BorderSizePixel = 0}, root)
local icon = icon(root, center(UDim2.fromOffset(130, 130)))
icon.ImageColor3 = Color3.new(1, 1, 1)
icon.ZIndex = 11
text(root, {Text = "${label}", TextSize = 28, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 95), Size = UDim2.fromOffset(400, 40), ZIndex = 11})
task.spawn(function()
	while gui.Parent do
		root.Position = UDim2.fromScale(-1, 0)
		TweenService:Create(root, TweenInfo.new(0.75 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.Out), {Position = UDim2.fromScale(0, 0)}):Play()
		task.wait(2.2 * speed)
		TweenService:Create(root, TweenInfo.new(0.75 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.In), {Position = UDim2.fromScale(1, 0)}):Play()
		task.wait(2.2 * speed)
	end
end)`
];

const motions = [
  `-- Continuous Silk Shine Sweep
task.spawn(function()
	while gui.Parent do
		shine.Position = UDim2.fromScale(-0.6, -0.3)
		local tw = TweenService:Create(shine, TweenInfo.new(1.1 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = UDim2.fromScale(1.4, -0.3)})
		tw:Play()
		tw.Completed:Wait()
		task.wait(1.2 * speed)
	end
end)`,

  `-- Neon Pulse Rings + Heartbeat
local pRing = make("Frame", center(root.Size), root.Parent)
round(pRing, 16)
pRing.BackgroundTransparency = 1
local pStroke = make("UIStroke", {Color = accent2, Thickness = 3, Transparency = 0.2}, pRing)
task.spawn(function()
	while gui.Parent do
		pRing.Size = root.Size
		pStroke.Transparency = 0.2
		local t1 = TweenService:Create(pRing, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = root.Size + UDim2.fromOffset(40, 24)})
		local t2 = TweenService:Create(pStroke, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Transparency = 1})
		local tBeat = TweenService:Create(scale, TweenInfo.new(0.18 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Scale = 1.07})
		t1:Play() t2:Play() tBeat:Play()
		task.wait(0.2 * speed)
		TweenService:Create(scale, TweenInfo.new(0.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Scale = 1}):Play()
		task.wait(1.1 * speed)
	end
end)`,

  `-- Expanding Ripple Burst Loops
task.spawn(function()
	while gui.Parent do
		local rip = make("Frame", {
			AnchorPoint = Vector2.new(0.5, 0.5),
			Position = UDim2.fromScale(0.5, 0.5),
			Size = UDim2.fromOffset(12, 12),
			BackgroundColor3 = Color3.new(1, 1, 1),
			BackgroundTransparency = 0.35,
			ZIndex = 2
		}, root)
		round(rip, 100)
		local t = TweenService:Create(rip, TweenInfo.new(0.9 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
			Size = UDim2.fromOffset(340, 340),
			BackgroundTransparency = 1
		})
		t:Play()
		t.Completed:Connect(function() rip:Destroy() end)
		task.wait(1.3 * speed)
	end
end)`,

  `-- Gentle Levitation Float
task.spawn(function()
	local origPos = root.Position
	while gui.Parent do
		local up = TweenService:Create(root, TweenInfo.new(1.1 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Position = origPos - UDim2.fromOffset(0, 10)})
		local iconTilt = TweenService:Create(icon, TweenInfo.new(1.1 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Rotation = 8})
		up:Play() iconTilt:Play()
		up.Completed:Wait()
		local down = TweenService:Create(root, TweenInfo.new(1.1 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Position = origPos})
		local iconTiltBack = TweenService:Create(icon, TweenInfo.new(1.1 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Rotation = -4})
		down:Play() iconTiltBack:Play()
		down.Completed:Wait()
	end
end)`,

  `-- Rotating Border Aura
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

  `-- Squishy Jelly Bounce
task.spawn(function()
	while gui.Parent do
		TweenService:Create(scale, TweenInfo.new(0.35 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.Out), {Scale = 1.08}):Play()
		task.wait(0.35 * speed)
		TweenService:Create(scale, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Scale = 0.94}):Play()
		task.wait(0.55 * speed)
		TweenService:Create(scale, TweenInfo.new(0.35 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1}):Play()
		task.wait(1.4 * speed)
	end
end)`,

  `-- Digital Glitch Twitch
task.spawn(function()
	local origPos = icon.Position
	while gui.Parent do
		task.wait(2.2 * speed)
		for i = 1, 6 do
			local off = (i % 2 == 0) and 4 or -4
			icon.Position = origPos + UDim2.fromOffset(off, 0)
			icon.ImageColor3 = (i % 2 == 0) and Color3.fromRGB(255, 75, 75) or Color3.fromRGB(80, 220, 255)
			task.wait(0.04)
		end
		icon.Position = origPos
		icon.ImageColor3 = Color3.new(1, 1, 1)
	end
end)`,

  `-- High-Energy Color Flood
task.spawn(function()
	while gui.Parent do
		shine.Size = UDim2.fromScale(0.1, 1.6)
		shine.Position = UDim2.fromScale(-0.4, -0.3)
		local tw = TweenService:Create(shine, TweenInfo.new(0.9 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.Out), {Size = UDim2.fromScale(1.8, 1.6), Position = UDim2.fromScale(-0.1, -0.3)})
		tw:Play()
		tw.Completed:Wait()
		task.wait(0.4 * speed)
		TweenService:Create(shine, TweenInfo.new(0.4 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Size = UDim2.fromScale(0, 1.6), Position = UDim2.fromScale(1.4, -0.3)}):Play()
		task.wait(1.5 * speed)
	end
end)`,

  `-- Rocket Launch Pad Lift
task.spawn(function()
	local origPos = icon.Position
	while gui.Parent do
		task.wait(1.8 * speed)
		local blast = TweenService:Create(icon, TweenInfo.new(0.45 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.In), {Position = origPos - UDim2.fromOffset(0, 45), ImageTransparency = 1})
		blast:Play()
		blast.Completed:Wait()
		icon.Position = origPos + UDim2.fromOffset(0, 35)
		icon.ImageTransparency = 1
		local enter = TweenService:Create(icon, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Position = origPos, ImageTransparency = 0})
		enter:Play()
		enter.Completed:Wait()
	end
end)`,

  `-- 3D Mechanical Key Tactile Press
task.spawn(function()
	local origPos = root.Position
	while gui.Parent do
		task.wait(1.6 * speed)
		TweenService:Create(root, TweenInfo.new(0.12 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = origPos + UDim2.fromOffset(0, 6)}):Play()
		task.wait(0.14 * speed)
		TweenService:Create(root, TweenInfo.new(0.16 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = origPos}):Play()
	end
end)`,
];

function scriptFor(asset) {
  const c = asset.categoryIndex;
  const radius = c === 6 ? (asset.style ? 75 : 28) : asset.style ? 38 : 14;
  const label = buttonLabels[asset.variant] || asset.name.toUpperCase();
  const seed = asset.id * 17;
  const subtitle = asset.description.replace(/"/g, '\\"');
  
  const body = builders[c](radius, label, seed, subtitle);
  const motion = asset.archetype === 3 && [1, 5, 9].includes(c) ? 'loop(icon, {Rotation = 10}, 1.1)' : motions[asset.archetype];
  
  return `${prelude(asset)}
${body}

-- MOTION
${motion}
`;
}

// Write to module/BloxyUI/BloxFX
const baseDir = path.join(__dirname, '../module/BloxyUI/BloxFX');
let updatedCount = 0;

assets.forEach(asset => {
  const catFolder = asset.category.replace(/\s+/g, '');
  const folderPath = path.join(baseDir, catFolder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, `${asset.slug}.luau`);
  const code = scriptFor(asset);
  fs.writeFileSync(filePath, code, 'utf8');
  updatedCount++;
});

console.log(`Successfully synced all ${updatedCount} BloxFX Luau files in module/BloxyUI/BloxFX/!`);
