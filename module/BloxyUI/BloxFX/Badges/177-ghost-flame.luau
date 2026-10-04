-- BLOXFX / Ghost Flame  (Badges)
-- A flickering ghost light.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.7361, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.8472, 0.7, 1)
local dark = Color3.fromHSV(0.7361, 0.55, 0.16)
local glyph = "☎" -- text glyph, no external assets needed
local title = "GHOST FLAME"
local subtitle = "A flickering ghost light."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_177")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_177"
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

-- BADGE
local root = make("Frame", center(UDim2.fromOffset(150, 150)), gui)
root.BackgroundColor3 = accent
root.ClipsDescendants = true
round(root, 75)
local stroke = make("UIStroke", {Color = accent2, Thickness = 4, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 90}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.25, 2), Position = UDim2.fromScale(-0.4, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.6, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = text(root, {Text = glyph, TextSize = 70, Size = UDim2.fromScale(1, 1), ZIndex = 4})
text(gui, {Text = title, TextSize = 14, Size = UDim2.fromOffset(240, 24), AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 96), TextColor3 = accent2})

-- MOTION
loop(shine, {Size = UDim2.fromScale(1.4, 1.6), BackgroundTransparency = 0.85}, 1.3, Enum.EasingStyle.Quad, true)
