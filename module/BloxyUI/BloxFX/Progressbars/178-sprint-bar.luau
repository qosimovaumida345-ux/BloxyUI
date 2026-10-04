-- BLOXFX / Sprint Bar  (Progress bars)
-- A bright bar with a glowing head.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.8222, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.9333, 0.7, 1)
local dark = Color3.fromHSV(0.8222, 0.55, 0.16)
local iconAssetId = "rbxassetid://10709013563" -- Real Roblox Vector Asset: Wind
local title = "SPRINT BAR"
local subtitle = "A bright bar with a glowing head."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_178")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_178"
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
local function icon(parent, props)
	props.BackgroundTransparency = 1
	props.ScaleType = Enum.ScaleType.Fit
	if not props.Image or props.Image == "" then
		props.Image = iconAssetId
	end
	return make("ImageLabel", props, parent)
end
local function center(size)
	return {AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0.5), Size = size}
end

-- UI Click Sound FX
local clickSound = make("Sound", {
	SoundId = "rbxassetid://6895079853",
	Volume = 0.5,
	PlayOnRemove = false
}, gui)

-- PROGRESS BAR
local root = make("Frame", center(UDim2.fromOffset(440, 44)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 22)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local fill = make("Frame", {Size = UDim2.fromScale(0.1, 1), BackgroundColor3 = accent, BorderSizePixel = 0}, root)
round(fill, 22)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, accent2), Rotation = 0}, fill)
local shine = make("Frame", {Size = UDim2.fromScale(0.15, 2), Position = UDim2.fromScale(-0.3, -0.5), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.7, BorderSizePixel = 0, ZIndex = 3}, root)
local icon = icon(gui, {Image = iconAssetId, ImageColor3 = accent2, Size = UDim2.fromOffset(42, 42), AnchorPoint = Vector2.new(1, 0.5), Position = UDim2.new(0.5, -236, 0.5, 0)})
text(root, {Text = "UNLOCK", TextSize = 14, Size = UDim2.fromScale(1, 1), ZIndex = 4})
loop(fill, {Size = UDim2.fromScale(1, 1)}, 2.5, Enum.EasingStyle.Quad, true)

-- MOTION
-- High-Energy Color Flood
task.spawn(function()
	while gui.Parent do
		shine.Size = UDim2.fromScale(0.1, 1.6)
		shine.Position = UDim2.fromScale(-0.4, -0.3)
		local tw = TweenService:Create(shine, TweenInfo.new(0.9 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.Out), {Size = UDim2.fromScale(1.8, 1.6), Position = UDim2.fromScale(-0.1, -0.3)})
		tw:Play()
		tw.Completed:Wait()
		task.wait(0.4 * speed)
		TweenService:Create(shine, TweenInfo.new(0.4 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Size = UDim2.fromScale(0, 1.6), Position = UDim2.fromScale(1.4, -0.3)}):Play()
		task.wait(1.5 * speed)
	end
end)
