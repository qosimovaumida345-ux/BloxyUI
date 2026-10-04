-- BLOXFX / Boss Alert  (Notifications)
-- A pulsing, shaking siren alert.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.3889, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.5000, 0.7, 1)
local dark = Color3.fromHSV(0.3889, 0.55, 0.16)
local glyph = "♛" -- text glyph, no external assets needed
local title = "BOSS ALERT"
local subtitle = "A pulsing, shaking siren alert."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_156")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_156"
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

-- NOTIFICATION (slides in, waits, slides out)
local root = make("Frame", {AnchorPoint = Vector2.new(0.5, 0), Size = UDim2.fromOffset(360, 84), Position = UDim2.new(0.5, 0, 0, -120), BackgroundColor3 = dark, ClipsDescendants = true}, gui)
round(root, 16)
local stroke = make("UIStroke", {Color = accent, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 0, Transparency = NumberSequence.new(0.45, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.15, 2), Position = UDim2.fromScale(-0.3, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.75, BorderSizePixel = 0, ZIndex = 3}, root)
local icon = text(root, {Text = glyph, TextSize = 38, Size = UDim2.fromOffset(60, 60), Position = UDim2.fromOffset(14, 12), TextColor3 = accent2})
text(root, {Text = title, TextSize = 18, Size = UDim2.new(1, -90, 0, 28), Position = UDim2.fromOffset(78, 14), TextXAlignment = Enum.TextXAlignment.Left})
text(root, {Text = subtitle, TextSize = 12, Font = Enum.Font.Gotham, TextTransparency = 0.3, TextWrapped = true, Size = UDim2.new(1, -90, 0, 34), Position = UDim2.fromOffset(78, 40), TextXAlignment = Enum.TextXAlignment.Left, TextYAlignment = Enum.TextYAlignment.Top})
local timer = make("Frame", {Size = UDim2.new(1, 0, 0, 4), Position = UDim2.new(0, 0, 1, -4), BackgroundColor3 = accent2, BorderSizePixel = 0}, root)
task.spawn(function()
	while gui.Parent do
		root.Position = UDim2.new(0.5, 0, 0, -120)
		timer.Size = UDim2.new(1, 0, 0, 4)
		TweenService:Create(root, TweenInfo.new(0.6 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = UDim2.new(0.5, 0, 0, 24)}):Play()
		TweenService:Create(timer, TweenInfo.new(3 * speed, Enum.EasingStyle.Linear), {Size = UDim2.new(0, 0, 0, 4)}):Play()
		task.wait(3.2 * speed)
		TweenService:Create(root, TweenInfo.new(0.4 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Position = UDim2.new(0.5, 0, 0, -120)}):Play()
		task.wait(1.6 * speed)
	end
end)

-- MOTION
task.spawn(function()
	while gui.Parent do
		TweenService:Create(scale, TweenInfo.new(0.5 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Scale = 0.88}):Play()
		task.wait(0.5 * speed)
		TweenService:Create(scale, TweenInfo.new(0.8 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Scale = 1}):Play()
		task.wait(1.6 * speed)
	end
end)
