-- BLOXFX / Book Flip  (Transitions)
-- A page folding the other way.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.1250, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.2361, 0.7, 1)
local dark = Color3.fromHSV(0.1250, 0.55, 0.16)
local glyph = "⌛" -- text glyph, no external assets needed
local title = "BOOK FLIP"
local subtitle = "A page folding the other way."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_190")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_190"
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

-- TRANSITION (covers the screen, swaps scene, reveals)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = accent, BorderSizePixel = 0, ClipsDescendants = true, ZIndex = 10, Position = UDim2.fromScale(-1, 0)}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 45}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.1, 1.5), Position = UDim2.fromScale(0.9, -0.2), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.6, BorderSizePixel = 0}, root)
local icon = text(root, center(UDim2.fromOffset(160, 160)))
icon.Text = glyph
icon.TextSize = 120
icon.ZIndex = 11
text(root, {Text = title, TextSize = 26, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 90), Size = UDim2.fromOffset(400, 40), ZIndex = 11})
task.spawn(function()
	while gui.Parent do
		root.Position = UDim2.fromScale(-1, 0)
		TweenService:Create(root, TweenInfo.new(0.7 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.Out), {Position = UDim2.fromScale(0, 0)}):Play()
		task.wait(2 * speed)
		TweenService:Create(root, TweenInfo.new(0.7 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.In), {Position = UDim2.fromScale(1, 0)}):Play()
		task.wait(2.2 * speed)
	end
end)

-- MOTION
loop(icon, {Position = icon.Position + UDim2.fromOffset(0, -10), TextTransparency = 0.4, Rotation = 15}, 0.8, Enum.EasingStyle.Quad)
