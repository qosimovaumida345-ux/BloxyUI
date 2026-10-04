-- BLOXFX / Oxygen Cells  (Progress bars)
-- Air cells lighting one by one.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.3000, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.4111, 0.7, 1)
local dark = Color3.fromHSV(0.3000, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898791187" -- Real Roblox Vector Asset: Wind
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(0, 0)
local title = "RELAX"
local subtitle = "Air cells lighting one by one."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_138")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_138"
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
local icon = icon(gui, {Size = UDim2.fromOffset(38, 38), AnchorPoint = Vector2.new(1, 0.5), Position = UDim2.new(0.5, -236, 0.5, 0), ImageColor3 = accent2})
text(root, {Text = "RELAX", TextSize = 14, Size = UDim2.fromScale(1, 1), ZIndex = 4})
loop(fill, {Size = UDim2.fromScale(1, 1)}, 2.5, Enum.EasingStyle.Quad, true)

-- MOTION
-- Gentle Levitation Float with Floor Shadow
task.spawn(function()
	local origPos = root.Position
	while gui.Parent do
		local up = TweenService:Create(root, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Position = origPos - UDim2.fromOffset(0, 10)})
		local tilt = TweenService:Create(icon, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Rotation = 8})
		local shShrink = TweenService:Create(shadow, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Size = UDim2.fromOffset(140, 8), BackgroundTransparency = 0.85})
		up:Play() tilt:Play() shShrink:Play()
		up.Completed:Wait()
		
		local down = TweenService:Create(root, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Position = origPos})
		local tiltBack = TweenService:Create(icon, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Rotation = -4})
		local shGrow = TweenService:Create(shadow, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut), {Size = UDim2.fromOffset(180, 12), BackgroundTransparency = 0.65})
		down:Play() tiltBack:Play() shGrow:Play()
		down.Completed:Wait()
	end
end)
