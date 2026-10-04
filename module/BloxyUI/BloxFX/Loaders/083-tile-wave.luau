-- BLOXFX / Tile Wave  (Loaders)
-- A grid of tiles rippling.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.2167, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.3278, 0.7, 1)
local dark = Color3.fromHSV(0.2167, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898674182" -- Real Roblox Vector Asset: LayoutGrid
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(514, 0)
local title = "SEND"
local subtitle = "A grid of tiles rippling."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_83")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_83"
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
text(gui, {Text = "SEND", TextSize = 16, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 105), Size = UDim2.fromOffset(220, 24), TextColor3 = accent2})
task.spawn(function()
	while gui.Parent do
		local tw = TweenService:Create(orbit, TweenInfo.new(2.2 * speed, Enum.EasingStyle.Linear), {Rotation = 360})
		tw:Play()
		tw.Completed:Wait()
		orbit.Rotation = 0
	end
end)

-- MOTION
-- Rocket Launch Pad Lift & Recoil
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
end)
