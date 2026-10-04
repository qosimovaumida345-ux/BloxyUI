-- BLOXFX / Bubble Bloom  (Backgrounds)
-- Glowing orbs floating upward.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.0000, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.1111, 0.7, 1)
local dark = Color3.fromHSV(0.0000, 0.55, 0.16)
local glyph = "✔" -- text glyph, no external assets needed
local title = "BUBBLE BLOOM"
local subtitle = "Glowing orbs floating upward."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_72")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_72"
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

-- BACKGROUND (full screen)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = dark, BorderSizePixel = 0, ClipsDescendants = true, Active = false}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 60, Transparency = NumberSequence.new(0, 0.55)}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.5), Position = UDim2.fromScale(-0.4, -0.2), Rotation = 20, BackgroundColor3 = accent2, BackgroundTransparency = 0.82, BorderSizePixel = 0}, root)
local icon = text(root, center(UDim2.fromOffset(120, 120)))
icon.Text = glyph
icon.TextSize = 96
icon.TextTransparency = 0.25
local random = Random.new(1224)
for index = 1, 22 do
	local size = random:NextInteger(6, 22)
	local dot = text(root, {Text = random:NextInteger(1, 3) == 1 and glyph or "", Size = UDim2.fromOffset(size, size), Position = UDim2.fromScale(random:NextNumber(), 1.05), BackgroundTransparency = 0.5, BackgroundColor3 = accent2, TextSize = size, TextColor3 = accent2})
	round(dot, size)
	local duration = random:NextNumber(4, 9)
	task.spawn(function()
		task.wait(random:NextNumber(0, duration))
		while gui.Parent do
			dot.Position = UDim2.fromScale(random:NextNumber(), 1.05)
			dot.BackgroundTransparency = 0.5
			local tween = TweenService:Create(dot, TweenInfo.new(duration * speed, Enum.EasingStyle.Sine), {Position = dot.Position - UDim2.fromScale(random:NextNumber(-0.1, 0.1), 1.2), BackgroundTransparency = 1})
			tween:Play()
			tween.Completed:Wait()
		end
	end)
end

-- MOTION
loop(shine, {Size = UDim2.fromScale(1.4, 1.6), BackgroundTransparency = 0.85}, 1.3, Enum.EasingStyle.Quad, true)
