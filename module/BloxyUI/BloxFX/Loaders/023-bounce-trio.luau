-- BLOXFX / Bounce Trio  (Loaders)
-- Three dots bouncing in rhythm.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.4333, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.5444, 0.7, 1)
local dark = Color3.fromHSV(0.4333, 0.55, 0.16)
local glyph = "♥" -- text glyph, no external assets needed
local title = "BOUNCE TRIO"
local subtitle = "Three dots bouncing in rhythm."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_23")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_23"
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
local function center(size)
	return {AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0.5), Size = size}
end

-- LOADER
local root = make("Frame", {Size = UDim2.fromOffset(150, 150), BackgroundColor3 = dark, ClipsDescendants = false}, gui)
root.AnchorPoint = Vector2.new(0.5, 0.5)
root.Position = UDim2.fromScale(0.5, 0.5)
round(root, 75)
local stroke = make("UIStroke", {Color = accent, Thickness = 6, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Transparency = NumberSequence.new({NumberSequenceKeypoint.new(0, 0), NumberSequenceKeypoint.new(0.45, 0), NumberSequenceKeypoint.new(0.55, 1), NumberSequenceKeypoint.new(1, 1)})}, stroke)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundTransparency = 1}, root)
local icon = text(root, {Text = glyph, TextSize = 52, Size = UDim2.fromScale(1, 1), TextColor3 = accent2})
local orbit = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundTransparency = 1}, root)
for index = 1, 3 do
	local dot = make("Frame", {Size = UDim2.fromOffset(12, 12), AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0), BackgroundColor3 = accent2}, orbit)
	round(dot, 6)
	orbit.Rotation = 0
end
text(gui, {Text = "LOADING", TextSize = 14, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 100), Size = UDim2.fromOffset(200, 24), TextColor3 = accent2})
local spin = TweenService:Create(orbit, TweenInfo.new(1.4 * speed, Enum.EasingStyle.Linear, Enum.EasingDirection.In, -1), {Rotation = 360})
spin:Play()

-- MOTION
TweenService:Create(icon, TweenInfo.new(2.4 * speed, Enum.EasingStyle.Linear, Enum.EasingDirection.In, -1), {Rotation = 360}):Play()
