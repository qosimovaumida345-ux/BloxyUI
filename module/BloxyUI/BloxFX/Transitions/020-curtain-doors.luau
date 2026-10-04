-- BLOXFX / Curtain Doors  (Transitions)
-- Doors parting from the center.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.9056, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.0167, 0.7, 1)
local dark = Color3.fromHSV(0.9056, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898669433" -- Real Roblox Vector Asset: DoorOpen
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(514, 257)
local title = "ACTIVATE"
local subtitle = "Doors parting from the center."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_20")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_20"
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

-- TRANSITION (Scene Wipe FX)
local root = make("Frame", {Size = UDim2.fromScale(1, 1), BackgroundColor3 = accent, BorderSizePixel = 0, ClipsDescendants = true, ZIndex = 10, Position = UDim2.fromScale(-1, 0)}, gui)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 45}, root)
local scale = make("UIScale", {}, root)
local stroke = make("UIStroke", {Thickness = 0, Transparency = 1}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.12, 1.6), Position = UDim2.fromScale(0.9, -0.2), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.6, BorderSizePixel = 0}, root)
local icon = icon(root, center(UDim2.fromOffset(130, 130)))
icon.ImageColor3 = Color3.new(1, 1, 1)
icon.ZIndex = 11
text(root, {Text = "ACTIVATE", TextSize = 28, AnchorPoint = Vector2.new(0.5, 0), Position = UDim2.new(0.5, 0, 0.5, 95), Size = UDim2.fromOffset(400, 40), ZIndex = 11})
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
-- Neon Pulse Rings + Heartbeat
task.spawn(function()
	while gui.Parent do
		ring1.Size = root.Size
		ringStroke1.Transparency = 0.2
		TweenService:Create(ring1, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = root.Size + UDim2.fromOffset(36, 24)}):Play()
		TweenService:Create(ringStroke1, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Transparency = 1}):Play()
		TweenService:Create(scale, TweenInfo.new(0.18 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Scale = 1.06}):Play()
		task.wait(0.2 * speed)
		TweenService:Create(scale, TweenInfo.new(0.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Scale = 1}):Play()
		task.wait(0.4 * speed)
		
		ring2.Size = root.Size
		ringStroke2.Transparency = 0.2
		TweenService:Create(ring2, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = root.Size + UDim2.fromOffset(36, 24)}):Play()
		TweenService:Create(ringStroke2, TweenInfo.new(1.2 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Transparency = 1}):Play()
		task.wait(0.8 * speed)
	end
end)
