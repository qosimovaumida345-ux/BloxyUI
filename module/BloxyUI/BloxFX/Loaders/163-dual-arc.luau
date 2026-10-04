-- BLOXFX / Dual Arc  (Loaders)
-- Two arcs chasing each other.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.2611, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.3722, 0.7, 1)
local dark = Color3.fromHSV(0.2611, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898673358" -- Real Roblox Vector Asset: Hourglass
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(514, 0)
local title = "JOIN SERVER"
local subtitle = "Two arcs chasing each other."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_163")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_163"
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
text(gui, {Text = "JOIN SERVER", TextSize = 16, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 105), Size = UDim2.fromOffset(220, 24), TextColor3 = accent2})
task.spawn(function()
	while gui.Parent do
		local tw = TweenService:Create(orbit, TweenInfo.new(2.2 * speed, Enum.EasingStyle.Linear), {Rotation = 360})
		tw:Play()
		tw.Completed:Wait()
		orbit.Rotation = 0
	end
end)

-- MOTION
-- Digital Glitch Split Twitch
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
end)
