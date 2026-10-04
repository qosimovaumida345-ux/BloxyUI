-- BLOXFX / Prism Border  (Buttons)
-- A rainbow edge that never rests.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.5222, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.6333, 0.7, 1)
local dark = Color3.fromHSV(0.5222, 0.55, 0.16)
local iconAssetId = "rbxassetid://10709003973" -- Real Roblox Vector Asset: Sparkles
local title = "PRISM BORDER"
local subtitle = "A rainbow edge that never rests."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_41")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_41"
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

-- BUTTON
local root = make("TextButton", center(UDim2.fromOffset(280, 76)), gui)
root.Text = ""
root.AutoButtonColor = false
root.ClipsDescendants = true
root.BackgroundColor3 = accent
round(root, 14)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 90}, root)
local stroke = make("UIStroke", {Color = accent2, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)
local shine = make("Frame", {Size = UDim2.fromScale(0.25, 1.8), Position = UDim2.fromScale(-0.5, -0.4), Rotation = 20, BackgroundColor3 = Color3.new(1, 1, 1), BackgroundTransparency = 0.7, BorderSizePixel = 0, ZIndex = 2}, root)
local icon = icon(root, {Image = iconAssetId, ImageColor3 = Color3.new(1, 1, 1), Size = UDim2.fromOffset(36, 36), Position = UDim2.new(0, 22, 0.5, -18), ZIndex = 3})
local label = text(root, {Text = "EXPLORE", TextSize = 22, Size = UDim2.new(1, -85, 1, 0), Position = UDim2.fromOffset(68, 0), TextXAlignment = Enum.TextXAlignment.Left, ZIndex = 3})
root.MouseEnter:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1.06}):Play() end)
root.MouseLeave:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1}):Play() end)
root.Activated:Connect(function()
	if clickSound then clickSound:Play() end
	TweenService:Create(scale, TweenInfo.new(0.08, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Scale = 0.92}):Play()
	task.wait(0.08)
	TweenService:Create(scale, TweenInfo.new(0.18, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1.06}):Play()
end)

-- MOTION
-- Rotating Border Aura
local rainbowStroke = make("UIGradient", {
	Color = ColorSequence.new({
		ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 80, 80)),
		ColorSequenceKeypoint.new(0.2, Color3.fromRGB(255, 210, 50)),
		ColorSequenceKeypoint.new(0.4, Color3.fromRGB(50, 255, 130)),
		ColorSequenceKeypoint.new(0.6, Color3.fromRGB(50, 210, 255)),
		ColorSequenceKeypoint.new(0.8, Color3.fromRGB(210, 80, 255)),
		ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 80, 80))
	}),
	Rotation = 0
}, stroke)
task.spawn(function()
	while gui.Parent do
		local tw = TweenService:Create(rainbowStroke, TweenInfo.new(3.2 * speed, Enum.EasingStyle.Linear), {Rotation = 360})
		tw:Play()
		tw.Completed:Wait()
		rainbowStroke.Rotation = 0
	end
end)
