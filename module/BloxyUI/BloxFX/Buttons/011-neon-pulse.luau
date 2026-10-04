-- BLOXFX / Neon Pulse  (Buttons)
-- A heartbeat of glowing rings.
-- Paste into a LocalScript in StarterPlayer > StarterPlayerScripts, then press Play.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- CONFIG ----------------------------------------------------------
local accent = Color3.fromHSV(0.1306, 0.78, 0.95)
local accent2 = Color3.fromHSV(0.2417, 0.7, 1)
local dark = Color3.fromHSV(0.1306, 0.55, 0.16)
local iconAssetId = "rbxassetid://16898732262" -- Real Roblox Vector Asset: Power
local iconRectSize = Vector2.new(256, 256)
local iconRectOffset = Vector2.new(514, 257)
local title = "ACTIVATE"
local subtitle = "A heartbeat of glowing rings."
local speed = 1 -- higher = slower
---------------------------------------------------------------------

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")
local old = playerGui:FindFirstChild("BloxFX_11")
if old then old:Destroy() end
local gui = Instance.new("ScreenGui")
gui.Name = "BloxFX_11"
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

-- BUTTON (Pill shape, auto-centered Icon + Label)
local isDark = false
local root = make("TextButton", center(UDim2.fromOffset(260, 68)), gui)
root.Text = ""
root.AutoButtonColor = false
root.ClipsDescendants = true
root.BackgroundColor3 = isDark and Color3.fromRGB(21, 22, 29) or accent
round(root, 34)
local gradient = make("UIGradient", {Color = ColorSequence.new(accent2, accent), Rotation = 90}, root)
if isDark then gradient.Enabled = false end
local stroke = make("UIStroke", {Color = isDark and accent or accent2, Thickness = 2.5, ApplyStrokeMode = Enum.ApplyStrokeMode.Border}, root)
local scale = make("UIScale", {}, root)



local ring1 = make("Frame", center(root.Size), root.Parent)
round(ring1, 34)
ring1.BackgroundTransparency = 1
local ringStroke1 = make("UIStroke", {Color = accent, Thickness = 2.5, Transparency = 1}, ring1)
local ring2 = make("Frame", center(root.Size), root.Parent)
round(ring2, 34)
ring2.BackgroundTransparency = 1
local ringStroke2 = make("UIStroke", {Color = accent2, Thickness = 2.5, Transparency = 1}, ring2)




local content = make("Frame", {
	AnchorPoint = Vector2.new(0.5, 0.5),
	Position = UDim2.fromScale(0.5, 0.5),
	AutomaticSize = Enum.AutomaticSize.XY,
	BackgroundTransparency = 1,
	ZIndex = 4
}, root)
make("UIListLayout", {
	FillDirection = Enum.FillDirection.Horizontal,
	HorizontalAlignment = Enum.HorizontalAlignment.Center,
	VerticalAlignment = Enum.VerticalAlignment.Center,
	Padding = UDim.new(0, 10),
	SortOrder = Enum.SortOrder.LayoutOrder
}, content)

local icon = icon(content, {
	Size = UDim2.fromOffset(26, 26),
	ImageColor3 = isDark and Color3.new(1, 1, 1) or Color3.fromRGB(13, 14, 12),
	LayoutOrder = 1,
	ZIndex = 4
})
local label = text(content, {
	Text = "ACTIVATE",
	TextSize = 20,
	TextColor3 = isDark and Color3.new(1, 1, 1) or Color3.fromRGB(13, 14, 12),
	AutomaticSize = Enum.AutomaticSize.XY,
	LayoutOrder = 2,
	ZIndex = 4
})

-- INTERACTIVE CLICK ANIMATION (Plays strictly on click)
local isEffectBusy = false
local function playEffect()
	if isEffectBusy then return end
	isEffectBusy = true
	ring1.Size = root.Size
	ringStroke1.Transparency = 0.2
	TweenService:Create(ring1, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = root.Size + UDim2.fromOffset(42, 26)}):Play()
	TweenService:Create(ringStroke1, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Transparency = 1}):Play()
	task.wait(0.08 * speed)
	ring2.Size = root.Size
	ringStroke2.Transparency = 0.2
	TweenService:Create(ring2, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = root.Size + UDim2.fromOffset(42, 26)}):Play()
	TweenService:Create(ringStroke2, TweenInfo.new(0.55 * speed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Transparency = 1}):Play()
	task.wait(0.5 * speed)
	isEffectBusy = false
end

root.MouseEnter:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1.05}):Play() end)
root.MouseLeave:Connect(function() TweenService:Create(scale, TweenInfo.new(0.15), {Scale = 1}):Play() end)
root.Activated:Connect(function()
	if clickSound then clickSound:Play() end
	TweenService:Create(scale, TweenInfo.new(0.08, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Scale = 0.94}):Play()
	task.spawn(playEffect)
	task.wait(0.08)
	TweenService:Create(scale, TweenInfo.new(0.18, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Scale = 1.05}):Play()
end)
