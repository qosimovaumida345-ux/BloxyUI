-- BLOXFX / Glass Disc  (Cards)
-- Frosted glass over spinning color.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.4778, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.5889, 0.7, 1)
local dark = Color3.fromHSV(0.4778, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898669271" -- Real Roblox Vector Asset: Disc3
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(0, 257)
local title = "UNLOCK"
local subtitle = "Frosted glass over spinning color."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_174")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_174"
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
		props.ImageRectSize = iconRectSize
		props.ImageRectOffset = iconRectOffset
	end
	return make("ImageLabel", props, parent)
end
local function center(size)
	return {AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0.5), Size = size}
end

-- UI Click Sound FX
local clickSound
pcall(function()
	clickSound = make("Sound", {
		SoundId = "rbxassetid://6895079853",
		Volume = 0.5,
		PlayOnRemove = false
	}, gui)
end)

-- CARD
local root = make("Frame", center(UDim2.fromOffset(250, 330)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 22)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 70, Transparency = NumberSequence.new(0.2, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.8), Position = UDim2.fromScale(-0.5, -0.4), Rotation = 22, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.78, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = icon(root, {Size = UDim2.fromOffset(72, 72), AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0, 42), ImageColor3 = accent2, ZIndex = 3})
text(root, {Text = "UNLOCK", TextSize = 22, Size = UDim2.new(1, -30, 0, 32), Position = UDim2.fromOffset(15, 140), ZIndex = 3})
text(root, {Text = subtitle, TextSize = 13, TextWrapped = true, Font = Enum.Font.Gotham, TextTransparency = 0.25, Size = UDim2.new(1, -40, 0, 80), Position = UDim2.fromOffset(20, 180), TextYAlignment = Enum.TextYAlignment.Top, ZIndex = 3})

-- MOTION
-- High-Energy Color Flood (Fill Rush)
task.spawn(function()
	while gui.Parent do
		fill.AnchorPoint = Vector2.new(0, 0)
		fill.Position = UDim2.new(0, 0, 0, 0)
		TweenService:Create(fill, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Cubic, Enum.EasingDirection.InOut), {Size = UDim2.new(1, 0, 1, 0)}):Play()
		task.wait(0.2 * speed)
		TweenService:Create(label, TweenInfo.new(0.25 * speed), {TextColor3 = Color3.fromRGB(13, 14, 12)}):Play()
		TweenService:Create(icon, TweenInfo.new(0.25 * speed), {ImageColor3 = Color3.fromRGB(13, 14, 12)}):Play()
		task.wait(0.7 * speed)
		
		fill.AnchorPoint = Vector2.new(1, 0)
		fill.Position = UDim2.new(1, 0, 0, 0)
		TweenService:Create(fill, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Cubic, Enum.EasingDirection.InOut), {Size = UDim2.new(0, 0, 1, 0)}):Play()
		task.wait(0.25 * speed)
		TweenService:Create(label, TweenInfo.new(0.25 * speed), {TextColor3 = Color3.new(1, 1, 1)}):Play()
		TweenService:Create(icon, TweenInfo.new(0.25 * speed), {ImageColor3 = Color3.new(1, 1, 1)}):Play()
		task.wait(0.8 * speed)
	end
end)
