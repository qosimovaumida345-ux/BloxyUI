-- BLOXFX / Morph Blob  (Loaders)
-- A blob changing shape.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.1306, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.2417, 0.7, 1)
local dark = Color3.fromHSV(0.1306, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898673271" -- Real Roblox Vector Asset: Hexagon
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(257, 257)
local title = "BUY NOW"
local subtitle = "A blob changing shape."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_153")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_153"
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
local clickSound
pcall(function()
	clickSound = make("Sound", {
		SoundId = "rbxassetid://6895079853",
		Volume = 0.5,
		PlayOnRemove = false
	}, gui)
end)

-- LOADER (Spinning Orbit Satellites + Pulsing Core)
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
text(gui, {Text = "BUY NOW", TextSize = 16, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 105), Size = UDim2.fromOffset(220, 24), TextColor3 = accent2})
task.spawn(function()
	while gui.Parent do
		local tw = TweenService:Create(orbit, TweenInfo.new(2.2 * speed, Enum.EasingStyle.Linear), {Rotation = 360})
		tw:Play()
		tw.Completed:Wait()
		orbit.Rotation = 0
	end
end)

-- MOTION
-- Squishy Jelly Bounce & Icon Wobble
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
end)
