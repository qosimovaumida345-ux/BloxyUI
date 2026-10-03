local Effects = {}
local TweenService = game:GetService("TweenService")

function Effects.Gradient(instance, options)
	options = options or {}
	local colors = options.colors or {ColorSequenceKeypoint.new(0, Color3.new(1,1,1)), ColorSequenceKeypoint.new(1, Color3.new(0,0,0))}
	local rotation = options.rotation or 0
	
	local gradient = instance:FindFirstChildOfClass("UIGradient")
	if not gradient then
		gradient = Instance.new("UIGradient")
		gradient.Parent = instance
	end
	
	gradient.Color = type(colors) == "table" and ColorSequence.new(colors) or colors
	gradient.Rotation = rotation
	return gradient
end

function Effects.Sparkle(instance, options)
	options = options or {}
	local amount = options.amount or 10
	local color = options.color or Color3.new(1, 1, 0)
	
	for i = 1, amount do
		local dot = Instance.new("Frame")
		dot.Size = UDim2.new(0, 4, 0, 4)
		dot.Position = UDim2.new(math.random(), 0, math.random(), 0)
		dot.BackgroundColor3 = color
		dot.BackgroundTransparency = 0
		
		local corner = Instance.new("UICorner")
		corner.CornerRadius = UDim.new(1, 0)
		corner.Parent = dot
		
		dot.Parent = instance
		
		-- Animate
		local tweenInfo = TweenInfo.new(math.random(10, 20)/10, Enum.EasingStyle.Sine, Enum.EasingDirection.Out, -1, true)
		TweenService:Create(dot, tweenInfo, {
			Size = UDim2.new(0, 0, 0, 0),
			BackgroundTransparency = 1,
			Position = UDim2.new(dot.Position.X.Scale, math.random(-20, 20), dot.Position.Y.Scale, math.random(-20, 20))
		}):Play()
	end
end

function Effects.Glow(instance, options)
	options = options or {}
	local color = options.color or Color3.new(1, 1, 1)
	local size = options.size or 20
	
	local glow = Instance.new("ImageLabel")
	glow.Name = "GlowEffect"
	glow.BackgroundTransparency = 1
	glow.Image = "rbxassetid://6015671569" -- Generic glow circle
	glow.ImageColor3 = color
	glow.Size = UDim2.new(1, size, 1, size)
	glow.Position = UDim2.new(0.5, 0, 0.5, 0)
	glow.AnchorPoint = Vector2.new(0.5, 0.5)
	glow.ZIndex = instance.ZIndex - 1
	glow.Parent = instance
end

function Effects.Sunburst(parent, options)
	options = options or {}
	local color = options.color or Color3.new(1, 1, 0.8)
	local rays = options.rays or 12
	local speed = options.speed or 2
	
	local container = Instance.new("Frame")
	container.Size = UDim2.new(2, 0, 2, 0)
	container.Position = UDim2.new(0.5, 0, 0.5, 0)
	container.AnchorPoint = Vector2.new(0.5, 0.5)
	container.BackgroundTransparency = 1
	container.ClipsDescendants = false
	container.Parent = parent
	
	for i = 1, rays do
		local ray = Instance.new("Frame")
		ray.Size = UDim2.new(0.1, 0, 0.5, 0)
		ray.Position = UDim2.new(0.5, 0, 0.5, 0)
		ray.AnchorPoint = Vector2.new(0.5, 1)
		ray.BackgroundColor3 = color
		ray.BackgroundTransparency = 0.5
		ray.BorderSizePixel = 0
		ray.Rotation = (360 / rays) * i
		ray.Parent = container
	end
	
	local info = TweenInfo.new(speed, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1)
	TweenService:Create(container, info, {Rotation = 360}):Play()
end

function Effects.Particles(parent, options)
	-- Placeholder for generic particle system using frames
end

function Effects.Stripe(instance, options)
	options = options or {}
	local color = options.color or Color3.new(1, 1, 1)
	
	local pattern = Instance.new("ImageLabel")
	pattern.Name = "StripePattern"
	pattern.BackgroundTransparency = 1
	pattern.Image = "rbxassetid://207869633" -- Diagonal stripes
	pattern.ImageColor3 = color
	pattern.ImageTransparency = 0.8
	pattern.Size = UDim2.new(2, 0, 2, 0)
	pattern.Position = UDim2.new(0, 0, 0, 0)
	pattern.TileSize = UDim2.new(0, 50, 0, 50)
	pattern.Parent = instance
	
	local info = TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1)
	TweenService:Create(pattern, info, {Position = UDim2.new(-1, 0, -1, 0)}):Play()
end

function Effects.NeonBorder(instance, options)
	options = options or {}
	local color = options.color or Color3.fromRGB(0, 255, 255)
	
	local stroke = Instance.new("UIStroke")
	stroke.Color = color
	stroke.Thickness = 3
	stroke.Transparency = 0
	stroke.Parent = instance
	
	local info = TweenInfo.new(1, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true)
	TweenService:Create(stroke, info, {Transparency = 0.8, Thickness = 6}):Play()
end

function Effects.Holographic(instance, options)
	local gradient = Effects.Gradient(instance, {
		colors = {
			ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 100, 100)),
			ColorSequenceKeypoint.new(0.33, Color3.fromRGB(100, 255, 100)),
			ColorSequenceKeypoint.new(0.66, Color3.fromRGB(100, 100, 255)),
			ColorSequenceKeypoint.new(1, Color3.fromRGB(255, 100, 255))
		}
	})
	
	local info = TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1)
	TweenService:Create(gradient, info, {Offset = Vector2.new(1, 0)}):Play()
end

function Effects.Pulse(instance, options)
	options = options or {}
	local color = options.color or Color3.new(1, 1, 1)
	
	local pulse = Instance.new("Frame")
	pulse.BackgroundColor3 = color
	pulse.Size = UDim2.new(1, 0, 1, 0)
	pulse.Position = UDim2.new(0.5, 0, 0.5, 0)
	pulse.AnchorPoint = Vector2.new(0.5, 0.5)
	pulse.ZIndex = instance.ZIndex - 1
	
	local corner = instance:FindFirstChildOfClass("UICorner")
	if corner then
		corner:Clone().Parent = pulse
	end
	
	pulse.Parent = instance
	
	local info = TweenInfo.new(1.5, Enum.EasingStyle.Sine, Enum.EasingDirection.Out, -1)
	TweenService:Create(pulse, info, {Size = UDim2.new(1.2, 0, 1.5, 0), BackgroundTransparency = 1}):Play()
end

function Effects.Confetti(parent, options)
	-- Similar to sparkle but falling
end

return Effects
