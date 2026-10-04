-- BLOXFX / Crystal Charge  (Progress bars)
-- A gem filling from the bottom.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.0833, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.1944, 0.7, 1)
local dark = Color3.fromHSV(0.0833, 0.55, 0.16)
local glyph = "❖" -- text glyph, no external assets needed
local title = "CRYSTAL CHARGE"
local subtitle = "A gem filling from the bottom."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_198")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_198"
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

-- PROGRESS BAR
local root = make("Frame", center(UDim2.fromOffset(420, 40)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 20)
local stroke = make("UIStroke", {Color = accent, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local fill = make("Frame", {Size = UDim2.fromScale(0.1, 1), BackgroundColor3 = accent, BorderSizePixel = 0}, root)
round(fill, 20)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, accent2), Rotation = 0}, fill)
local shine = make("Frame", {Size = UDim2.fromScale(0.15, 2), Position = UDim2.fromScale(-0.3, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.7, BorderSizePixel = 0, ZIndex = 3}, root)
local icon = text(gui, {Text = glyph, TextSize = 36, AnchorPoint = Vector2.new(1, 0.5), Position = UDim2.new(0.5, -226, 0.5, 0), Size = UDim2.fromOffset(44, 44), TextColor3 = accent2})
text(root, {Text = title, TextSize = 14, Size = UDim2.fromScale(1, 1), ZIndex = 4})
loop(fill, {Size = UDim2.fromScale(1, 1)}, 2.4, Enum.EasingStyle.Quad, true)

-- MOTION
loop(root, {BackgroundColor3 = accent2}, 1.4)
loop(scale, {Scale = 1.03}, 0.7)
