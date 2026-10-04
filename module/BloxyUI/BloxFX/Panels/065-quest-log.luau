-- BLOXFX / Quest Log  (Panels)
-- Tasks ticking themselves off.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.1278, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.2389, 0.7, 1)
local dark = Color3.fromHSV(0.1278, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898674482" -- Real Roblox Vector Asset: ListChecks
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(0, 514)
local title = "JOIN GAME"
local subtitle = "Tasks ticking themselves off."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_65")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_65"
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
local clickSound = make("Sound", {
	SoundId = "rbxassetid://6895079853",
	Volume = 0.5,
	PlayOnRemove = false
}, gui)

-- PANEL
local root = make("Frame", center(UDim2.fromOffset(440, 300)), gui)
root.BackgroundColor3 = dark
root.ClipsDescendants = true
round(root, 18)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(dark, accent), Rotation = 90, Transparency = NumberSequence.new(0, 0.75)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.2, 1.8), Position = UDim2.fromScale(-0.4, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.85, BorderSizePixel = 0, ZIndex = 5}, root)
local icon = icon(root, {Size = UDim2.fromOffset(32, 32), Position = UDim2.fromOffset(16, 16), ImageColor3 = accent2, ZIndex = 3})
text(root, {Text = "JOIN GAME", TextSize = 20, Size = UDim2.new(1, -70, 0, 36), Position = UDim2.fromOffset(56, 14), TextXAlignment = Enum.TextXAlignment.Left})
local slots = {}
for index = 0, 7 do
	local slot = make("Frame", {Size = UDim2.fromOffset(92, 92), Position = UDim2.fromOffset(16 + (index % 4) * 105, 68 + math.floor(index / 4) * 105), BackgroundColor3 = accent, BackgroundTransparency = 0.75}, root)
	round(slot, 14)
	local slotIcon = icon(slot, center(UDim2.fromOffset(40, 40)))
	slotIcon.ImageColor3 = accent2
	local pop = make("UIScale", {Scale = 0}, slot)
	slots[index + 1] = pop
end
task.spawn(function()
	while gui.Parent do
		for _, pop in ipairs(slots) do
			TweenService:Create(pop, TweenInfo.new(0.35, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1}):Play()
			task.wait(0.1 * speed)
		end
		task.wait(2.0 * speed)
		for _, pop in ipairs(slots) do TweenService:Create(pop, TweenInfo.new(0.2), {Scale = 0}):Play() end
		task.wait(0.6 * speed)
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
