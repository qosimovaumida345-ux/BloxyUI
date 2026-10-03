local TweenService = game:GetService("TweenService")

local MasterButton = {}

function MasterButton.new(options)
	options = options or {}
	local text = options.Text or "SHOP"
	local buttonPosition = options.Position or UDim2.fromScale(0.5, 0.5)
	local animationsEnabled = options.AnimationsEnabled ~= false
	local parent = options.Parent

	local function create(className, properties, p)
		local instance = Instance.new(className)
		for property, value in pairs(properties) do
			instance[property] = value
		end
		instance.Parent = p
		return instance
	end

	local function corner(p, radius)
		create("UICorner", { CornerRadius = UDim.new(0, radius) }, p)
	end

	local holder = create("Frame", {
		Name = text .. "ButtonHolder",
		AnchorPoint = Vector2.new(0.5, 0.5),
		Position = buttonPosition,
		Size = UDim2.fromOffset(272, 90),
		BackgroundTransparency = 1,
	}, parent)

	local scale = create("UIScale", { Scale = 1 }, holder)

	-- 3D Depth Shadow
	local shadow = create("Frame", {
		Name = "DepthShadow",
		Position = UDim2.fromOffset(0, 7),
		Size = UDim2.fromScale(1, 1),
		BackgroundColor3 = Color3.fromRGB(154, 20, 40),
		BorderSizePixel = 0,
	}, holder)
	corner(shadow, 17)

	-- Button Surface
	local button = create("TextButton", {
		Name = "SurfaceButton",
		Size = UDim2.fromScale(1, 1),
		Text = "",
		BackgroundColor3 = Color3.new(1, 1, 1),
		BorderSizePixel = 0,
		AutoButtonColor = false,
		ClipsDescendants = true,
	}, holder)
	corner(button, 17)

	create("UIStroke", {
		ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
		Color = Color3.fromRGB(255, 149, 142),
		Thickness = 3
	}, button)

	create("UIGradient", {
		Rotation = 90,
		Color = ColorSequence.new(Color3.fromRGB(255, 87, 94), Color3.fromRGB(230, 34, 57))
	}, button)

	-- Procedural Market Stall Icon
	local icon = create("Frame", {
		Name = "MarketStallIcon",
		Position = UDim2.fromOffset(46, 21),
		Size = UDim2.fromOffset(49, 48),
		BackgroundTransparency = 1,
		ZIndex = 3,
	}, button)

	local white = Color3.new(1, 1, 1)
	local function part(p, position, size, color, layer)
		return create("Frame", {
			Position = position,
			Size = size,
			BackgroundColor3 = color,
			BorderSizePixel = 0,
			ZIndex = layer or 4
		}, p)
	end

	part(icon, UDim2.fromOffset(6, 1), UDim2.fromOffset(37, 6), white)
	part(icon, UDim2.fromOffset(1, 7), UDim2.fromOffset(47, 7), white)
	for stripe = 0, 4 do
		local awning = part(icon, UDim2.fromOffset(1 + stripe * 9, 14),
			UDim2.fromOffset(9, 10), stripe % 2 == 0 and white or Color3.fromRGB(228, 44, 64))
		corner(awning, 3)
	end
	part(icon, UDim2.fromOffset(5, 24), UDim2.fromOffset(4, 19), white)
	part(icon, UDim2.fromOffset(40, 24), UDim2.fromOffset(4, 19), white)
	corner(part(icon, UDim2.fromOffset(2, 38), UDim2.fromOffset(45, 10), white), 2)

	-- Dual-Layered Text
	local function textLabel(position, color, layer)
		return create("TextLabel", {
			BackgroundTransparency = 1,
			Position = position,
			Size = UDim2.fromOffset(130, 90),
			Text = text,
			TextColor3 = color,
			TextSize = 32,
			Font = Enum.Font.GothamBlack,
			ZIndex = layer,
		}, button)
	end
	textLabel(UDim2.fromOffset(110, 3), Color3.fromRGB(169, 24, 44), 4)
	textLabel(UDim2.fromOffset(110, 0), white, 5)

	-- 7 Animated Sparkles
	local locations = {
		{0.08, 0.19, 10}, {0.32, 0.11, 7}, {0.87, 0.18, 10},
		{0.91, 0.63, 8}, {0.68, 0.81, 7}, {0.09, 0.74, 6}, {0.40, 0.78, 6},
	}
	for index, location in ipairs(locations) do
		local sparkle = create("Frame", {
			Name = "WhiteSparkle",
			BackgroundTransparency = 1,
			Position = UDim2.fromScale(location[1], location[2]),
			Size = UDim2.fromOffset(location[3], location[3]),
			ZIndex = 2,
		}, button)
		local sparkleScale = create("UIScale", { Scale = 0.45 }, sparkle)
		local vertical = part(sparkle, UDim2.fromScale(0.4, 0), UDim2.fromScale(0.2, 1), white, 2)
		local horizontal = part(sparkle, UDim2.fromScale(0, 0.4), UDim2.fromScale(1, 0.2), white, 2)
		local center = part(sparkle, UDim2.fromScale(0.25, 0.25), UDim2.fromScale(0.5, 0.5), white, 2)
		center.Rotation = 45
		for _, segment in ipairs({vertical, horizontal, center}) do
			segment.BackgroundTransparency = 0.65
			if animationsEnabled then
				TweenService:Create(segment, TweenInfo.new(1.3, Enum.EasingStyle.Sine,
					Enum.EasingDirection.InOut, -1, true, index * 0.17), {
					BackgroundTransparency = 0.05,
				}):Play()
			end
		end
		if animationsEnabled then
			TweenService:Create(sparkleScale, TweenInfo.new(1.3, Enum.EasingStyle.Sine,
				Enum.EasingDirection.InOut, -1, true, index * 0.17), { Scale = 1 }):Play()
		end
	end

	-- Specular Shine Reflection Bar
	local shine = part(button, UDim2.fromScale(-0.4, -0.5), UDim2.fromOffset(40, 180), white, 2)
	shine.Rotation = 20
	shine.BackgroundTransparency = 0.87

	if animationsEnabled then
		TweenService:Create(holder, TweenInfo.new(1.5, Enum.EasingStyle.Sine,
			Enum.EasingDirection.InOut, -1, true), {
			Position = buttonPosition - UDim2.fromOffset(0, 4),
		}):Play()
	end

	local activeShineTween
	local function sweepShine()
		if not animationsEnabled then return end
		if activeShineTween then activeShineTween:Cancel() end
		shine.Position = UDim2.fromScale(-0.4, -0.5)
		activeShineTween = TweenService:Create(shine,
			TweenInfo.new(0.55, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
				Position = UDim2.fromScale(1.4, -0.5),
			})
		activeShineTween:Play()
	end

	local hovering = false
	local activeScaleTween
	local function resize(value)
		if activeScaleTween then activeScaleTween:Cancel() end
		activeScaleTween = TweenService:Create(scale, TweenInfo.new(0.15), { Scale = value })
		activeScaleTween:Play()
	end

	button.MouseEnter:Connect(function() hovering = true; resize(1.045) end)
	button.MouseLeave:Connect(function() hovering = false; resize(1) end)
	button.MouseButton1Down:Connect(function() resize(0.98); sweepShine() end)
	button.MouseButton1Up:Connect(function() resize(hovering and 1.045 or 1); sweepShine() end)

	if options.OnClick then
		button.Activated:Connect(function()
			resize(hovering and 1.045 or 1)
			options.OnClick()
		end)
	end

	return holder
end

return MasterButton
