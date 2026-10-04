-- BLOXFX / Diagonal Swipe  (Transitions)
-- A slanted swipe across.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.5583, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.6694, 0.7, 1)
local dark = Color3.fromHSV(0.5583, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898735040" -- Real Roblox Vector Asset: Slash
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(0, 0)
local title = "JOIN GAME"
local subtitle = "A slanted swipe across."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_70")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_70"
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

-- TRANSITION (Scene Wipe FX)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = accent, BorderSizePixel = 0, ClipsDescendants = true, ZIndex = 10, Position = UDim2.fromScale(-1, 0)}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 45}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.12, 1.6), Position = UDim2.fromScale(0.9, -0.2), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.6, BorderSizePixel = 0}, root)
local icon = icon(root, center(UDim2.fromOffset(130, 130)))
icon.ImageColor3 = Color3.new(1, 1, 1)
icon.ZIndex = 11
text(root, {Text = "JOIN GAME", TextSize = 28, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 95), Size = UDim2.fromOffset(400, 40), ZIndex = 11})
task.spawn(function()
	while gui.Parent do
		root.Position = UDim2.fromScale(-1, 0)
		TweenService:Create(root, TweenInfo.new(0.75 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.Out), {Position = UDim2.fromScale(0, 0)}):Play()
		task.wait(2.2 * speed)
		TweenService:Create(root, TweenInfo.new(0.75 * speed, Enum.EasingStyle.Quart, Enum.EasingDirection.In), {Position = UDim2.fromScale(1, 0)}):Play()
		task.wait(2.2 * speed)
	end
end)

-- MOTION
-- Digital Glitch Split Twitch
task.spawn(function()
	local origPos = root.Position
	while gui.Parent do
		task.wait(2.2 * speed)
		for i = 1, 6 do
			local off = (i % 2 == 0) and 4 or -4
			root.Position = origPos + UDim2.fromOffset(off, 0)
			icon.ImageColor3 = (i % 2 == 0) and Color3.fromRGB(255, 43, 214) or Color3.fromRGB(0, 240, 255)
			task.wait(0.04)
		end
		root.Position = origPos
		icon.ImageColor3 = isDark and Color3.new(1, 1, 1) or Color3.fromRGB(13, 14, 12)
	end
end)
