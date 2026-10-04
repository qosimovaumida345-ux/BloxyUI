-- BLOXFX / Gummy Buy  (Buttons)
-- A bouncy shop button.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.9583, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.0694, 0.7, 1)
local dark = Color3.fromHSV(0.9583, 0.55, 0.16)
local glyph = "♛" -- text glyph, no external assets needed
local title = "GUMMY BUY"
local subtitle = "A bouncy shop button."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_151")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_151"
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

-- BUTTON
local root = make("TextButton", center(UDim2.fromOffset(280, 76)), gui)
root.Text = ""
root.AutoButtonColor = false
root.ClipsDescendants = true
root.BackgroundColor3 = accent
round(root, 38)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 90}, root)
local stroke = make("UIStroke", {Color = accent2, Thickness = 2, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.25, 1.6), Position = UDim2.fromScale(-0.4, -0.3), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.7, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = text(root, {Text = glyph, TextSize = 30, Size = UDim2.fromOffset(44, 44), Position = UDim2.new(0, 22, 0.5, -22), ZIndex = 3})
local label = text(root, {Text = "BUY NOW", TextSize = 22, Size = UDim2.new(1, -90, 1, 0), Position = UDim2.fromOffset(72, 0), TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 3})
root.MouseEnter:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1.06}):Play() end)
root.MouseLeave:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1}):Play() end)
root.Activated:Connect(function() TweenService:Create(scale, TweenInfo.new(0.12, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 0.92}):Play() task.wait(0.12) TweenService:Create(scale, TweenInfo.new(0.2, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1.06}):Play() end)

-- MOTION
task.spawn(function()
	while gui.Parent do
		TweenService:Create(scale, TweenInfo.new(0.5 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Scale = 0.88}):Play()
		task.wait(0.5 * speed)
		TweenService:Create(scale, TweenInfo.new(0.8 * speed, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Scale = 1}):Play()
		task.wait(1.6 * speed)
	end
end)
