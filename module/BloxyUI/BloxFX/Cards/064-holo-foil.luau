-- BLOXFX / Holo Foil  (Cards)
-- A rainbow foil sheen.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.0417, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.1528, 0.7, 1)
local dark = Color3.fromHSV(0.0417, 0.55, 0.16)
local glyph = "♪" -- text glyph, no external assets needed
local title = "HOLO FOIL"
local subtitle = "A rainbow foil sheen."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_64")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_64"
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

-- CARD
local root = make("Frame", center(UDim2.fromOffset(240, 320)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 20)
local stroke = make("UIStroke", {Color = accent, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 70, Transparency = NumberSequence.new(0.35, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.6), Position = UDim2.fromScale(-0.4, -0.3), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.8, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = text(root, {Text = glyph, TextSize = 90, Size = UDim2.new(1, 0, 0, 140), Position = UDim2.fromOffset(0, 36), TextColor3 = accent2})
text(root, {Text = title, TextSize = 22, Size = UDim2.new(1, -30, 0, 30), Position = UDim2.fromOffset(15, 190)})
text(root, {Text = subtitle, TextSize = 14, TextWrapped = true, Font = Enum.Font.Gotham, TextTransparency = 0.25, Size = UDim2.new(1, -40, 0, 60), Position = UDim2.fromOffset(20, 224), TextYAlignment = Enum.TextYAlignment.Top})

-- MOTION
task.spawn(function()
	while gui.Parent do
		for step = 1, 8 do
			icon.Position = icon.Position + UDim2.fromOffset(step % 2 == 0 and 4 or -4, 0)
			icon.Rotation = step % 2 == 0 and 6 or -6
			task.wait(0.04)
		end
		icon.Rotation = 0
		task.wait(1.8 * speed)
	end
end)
