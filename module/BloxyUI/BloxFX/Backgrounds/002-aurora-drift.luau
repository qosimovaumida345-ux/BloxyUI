-- BLOXFX / Aurora Drift  (Backgrounds)
-- Soft blobs of color drifting.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.0861, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.1972, 0.7, 1)
local dark = Color3.fromHSV(0.0861, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898735175" -- Real Roblox Vector Asset: Sparkles
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(514, 514)
local title = "POWER UP"
local subtitle = "Soft blobs of color drifting."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_2")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_2"
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

-- BACKGROUND (Full Screen Ambient FX)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = dark, BorderSizePixel = 0, ClipsDescendants = true, Active = false}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 60, Transparency = NumberSequence.new(0, 0.55)}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.3, 1.5), Position = UDim2.fromScale(-0.4, -0.2), Rotation = 20, BackgroundColor3 = accent2, BackgroundTransparency = 0.82, BorderSizePixel = 0}, root)
local icon = icon(root, center(UDim2.fromOffset(120, 120)))
icon.ImageColor3 = accent2
icon.ImageTransparency = 0.35
local random = Random.new(34)
for index = 1, 24 do
	local size = random:NextInteger(8, 26)
	local pFrame = make("Frame", {Size = UDim2.fromOffset(size, size), Position = UDim2.fromScale(random:NextNumber(), 1.05), BackgroundTransparency = 0.5, BackgroundColor3 = accent2, BorderSizePixel = 0}, root)
	round(pFrame, size / 2)
	local duration = random:NextNumber(4, 9)
	task.spawn(function()
		task.wait(random:NextNumber(0, duration))
		while gui.Parent do
			pFrame.Position = UDim2.fromScale(random:NextNumber(), 1.05)
			pFrame.BackgroundTransparency = 0.4
			local tween = TweenService:Create(pFrame, TweenInfo.new(duration * speed, Enum.EasingStyle.Sine), {Position = pFrame.Position - UDim2.fromScale(random:NextNumber(-0.1, 0.1), 1.2), BackgroundTransparency = 1})
			tween:Play()
			tween.Completed:Wait()
		end
	end)
end

-- MOTION
-- Continuous Silk Shine Sweep
task.spawn(function()
	while gui.Parent do
		shine.Position = UDim2.fromScale(-0.6, -0.4)
		local tw = TweenService:Create(shine, TweenInfo.new(1.1 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = UDim2.fromScale(1.4, -0.4)})
		tw:Play()
		tw.Completed:Wait()
		task.wait(1.2 * speed)
	end
end)
