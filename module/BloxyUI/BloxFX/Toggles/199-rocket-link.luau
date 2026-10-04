-- BLOXFX / Rocket Link  (Toggles)
-- A rocket link powering up.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.1694, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.2806, 0.7, 1)
local dark = Color3.fromHSV(0.1694, 0.55, 0.16)
local glyph = "❖" -- text glyph, no external assets needed
local title = "ROCKET LINK"
local subtitle = "A rocket link powering up."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_199")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_199"
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

-- TOGGLE (click to flip; also auto-flips so you can preview it)
local root = make("TextButton", center(UDim2.fromOffset(150, 76)), gui)
root.Text = ""
root.AutoButtonColor = false
root.BackgroundColor3 = dark
round(root, 38)
local stroke = make("UIStroke", {Color = accent, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 0, Transparency = NumberSequence.new(0, 0.85)}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.2, 2), Position = UDim2.fromScale(-0.4, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.8, BorderSizePixel = 0}, root)
local knob = make("Frame", {Size = UDim2.fromOffset(60, 60), Position = UDim2.fromOffset(8, 8), BackgroundColor3 = Color3.new(1, 1, 1)}, root)
round(knob, 30)
local icon = text(knob, {Text = glyph, TextSize = 30, Size = UDim2.fromScale(1, 1), TextColor3 = dark})
local on = false
local function set(state)
	on = state
	TweenService:Create(knob, TweenInfo.new(0.35 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = on and UDim2.fromOffset(82, 8) or UDim2.fromOffset(8, 8)}):Play()
	TweenService:Create(root, TweenInfo.new(0.3 * speed), {BackgroundColor3 = on and accent or dark}):Play()
	TweenService:Create(icon, TweenInfo.new(0.3 * speed), {Rotation = on and 360 or 0}):Play()
end
root.Activated:Connect(function() set(not on) end)
task.spawn(function() while gui.Parent do task.wait(2.2 * speed) set(not on) end end)

-- MOTION
loop(root, {BackgroundColor3 = accent2}, 1.4)
loop(scale, {Scale = 1.03}, 0.7)
