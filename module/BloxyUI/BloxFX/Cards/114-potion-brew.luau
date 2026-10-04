-- BLOXFX / Potion Brew  (Cards)
-- A tilting card with a bubbling shine.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.6944, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.8056, 0.7, 1)
local dark = Color3.fromHSV(0.6944, 0.55, 0.16)
local iconAssetId = "rbxassetid://10709013563" -- Real Roblox Vector Asset: FlaskConical
local title = "POTION BREW"
local subtitle = "A tilting card with a bubbling shine."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_114")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_114"
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

-- CARD
local root = make("Frame", center(UDim2.fromOffset(250, 330)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 22)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 70, Transparency = NumberSequence.new(0.2, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.8), Position = UDim2.fromScale(-0.5, -0.4), Rotation = 22, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.78, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = icon(root, {Image = iconAssetId, ImageColor3 = accent2, Size = UDim2.fromOffset(72, 72), AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0, 42), ZIndex = 3})
text(root, {Text = "LIKE", TextSize = 22, Size = UDim2.new(1, -30, 0, 32), Position = UDim2.fromOffset(15, 150), ZIndex = 3})
text(root, {Text = subtitle, TextSize = 13, TextWrapped = true, Font = Enum.Font.Gotham, TextTransparency = 0.25, Size = UDim2.new(1, -40, 0, 80), Position = UDim2.fromOffset(20, 190), TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 3})

-- MOTION
-- Neon Pulse Rings + Heartbeat
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
end)
