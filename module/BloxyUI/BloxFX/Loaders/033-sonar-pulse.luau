-- BLOXFX / Sonar Pulse  (Loaders)
-- Rings expanding outward.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.5639, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.6750, 0.7, 1)
local dark = Color3.fromHSV(0.5639, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898790996" -- Real Roblox Vector Asset: Wifi
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(514, 514)
local title = "LAUNCH"
local subtitle = "Rings expanding outward."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_33")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_33"
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
text(gui, {Text = "LAUNCH", TextSize = 16, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 105), Size = UDim2.fromOffset(220, 24), TextColor3 = accent2})
task.spawn(function()
	while gui.Parent do
		local tw = TweenService:Create(orbit, TweenInfo.new(2.2 * speed, Enum.EasingStyle.Linear), {Rotation = 360})
		tw:Play()
		tw.Completed:Wait()
		orbit.Rotation = 0
	end
end)

-- MOTION
-- Gentle Levitation Float with Floor Shadow
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
end)
