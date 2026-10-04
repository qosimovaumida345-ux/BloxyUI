-- BLOXFX / Gear Hotbar  (Panels)
-- Cooldown sweeps across gear slots.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.8250, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.9361, 0.7, 1)
local dark = Color3.fromHSV(0.8250, 0.55, 0.16)
local glyph = "❖" -- text glyph, no external assets needed
local title = "GEAR HOTBAR"
local subtitle = "Cooldown sweeps across gear slots."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_195")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_195"
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

-- PANEL
local root = make("Frame", center(UDim2.fromOffset(420, 280)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 16)
local stroke = make("UIStroke", {Color = accent, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 90, Transparency = NumberSequence.new(0, 0.7)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.2, 1.6), Position = UDim2.fromScale(-0.4, -0.3), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.85, BorderSizePixel = 0, ZIndex = 5}, root)
local icon = text(root, {Text = glyph, TextSize = 28, Size = UDim2.fromOffset(40, 40), Position = UDim2.fromOffset(16, 12), TextColor3 = accent2})
text(root, {Text = title, TextSize = 20, Size = UDim2.new(1, -70, 0, 40), Position = UDim2.fromOffset(62, 12), TextXAlignment = Enum.TextXAlignment.Left})
local slots = {}
for index = 0, 7 do
	local slot = make("Frame", {Size = UDim2.fromOffset(88, 88), Position = UDim2.fromOffset(16 + (index % 4) * 100, 66 + math.floor(index / 4) * 100), BackgroundColor3 = accent, BackgroundTransparency = 0.7}, root)
	round(slot, 12)
	local mark = text(slot, {Text = glyph, TextSize = 34, Size = UDim2.fromScale(1, 1)})
	local pop = make("UIScale", {Scale = 0}, mark)
	slots[index + 1] = pop
end
task.spawn(function()
	while gui.Parent do
		for _, pop in ipairs(slots) do
			TweenService:Create(pop, TweenInfo.new(0.35, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1}):Play()
			task.wait(0.12 * speed)
		end
		task.wait(1.5 * speed)
		for _, pop in ipairs(slots) do TweenService:Create(pop, TweenInfo.new(0.25), {Scale = 0}):Play() end
		task.wait(0.6 * speed)
	end
end)

-- MOTION
loop(root, {BackgroundColor3 = accent2}, 1.4)
loop(scale, {Scale = 1.03}, 0.7)
