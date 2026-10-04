-- BLOXFX / Gift Banner  (Notifications)
-- A celebratory banner with a burst.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.8667, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.9778, 0.7, 1)
local dark = Color3.fromHSV(0.8667, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898672316" -- Real Roblox Vector Asset: Gift
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(0, 0)
local title = "LIKE"
local subtitle = "A celebratory banner with a burst."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_116")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_116"
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

-- NOTIFICATION
local root = make("Frame", {AnchorPoint = Vector2.new(0.5, 0), Size = UDim2.fromOffset(380, 88), Position = UDim2.new(0.5, 0, 0, -120), BackgroundColor3 = dark, ClipsDescendants = true}, gui)
round(root, 18)
local stroke = make("UIStroke", {Color = accent, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent, dark), Rotation = 0, Transparency = NumberSequence.new(0.35, 0)}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.15, 2), Position = UDim2.fromScale(-0.3, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.75, BorderSizePixel = 0, ZIndex = 3}, root)
local icon = icon(root, {Size = UDim2.fromOffset(44, 44), Position = UDim2.fromOffset(16, 20), ImageColor3 = accent2, ZIndex = 3})
text(root, {Text = "LIKE", TextSize = 19, Size = UDim2.new(1, -85, 0, 26), Position = UDim2.fromOffset(72, 16), TextXAlignment = Enum.TextXAlignment.Left})
text(root, {Text = subtitle, TextSize = 12, Font = Enum.Font.Gotham, TextTransparency = 0.3, TextWrapped = true, Size = UDim2.new(1, -85, 0, 36), Position = UDim2.fromOffset(72, 44), TextXAlignment = Enum.TextXAlignment.Left, TextYAlignment = Enum.TextYAlignment.Top})
local timer = make("Frame", {Size = UDim2.new(1, 0, 0, 4), Position = UDim2.new(0, 0, 1, -4), BackgroundColor3 = accent2, BorderSizePixel = 0}, root)
task.spawn(function()
	while gui.Parent do
		root.Position = UDim2.new(0.5, 0, 0, -120)
		timer.Size = UDim2.new(1, 0, 0, 4)
		TweenService:Create(root, TweenInfo.new(0.6 * speed, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = UDim2.new(0.5, 0, 0, 32)}):Play()
		TweenService:Create(timer, TweenInfo.new(3.2 * speed, Enum.EasingStyle.Linear), {Size = UDim2.new(0, 0, 0, 4)}):Play()
		task.wait(3.4 * speed)
		TweenService:Create(root, TweenInfo.new(0.4 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Position = UDim2.new(0.5, 0, 0, -120)}):Play()
		task.wait(1.8 * speed)
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
