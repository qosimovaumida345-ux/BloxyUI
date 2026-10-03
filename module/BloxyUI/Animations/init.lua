local TweenService = game:GetService("TweenService")
local Animations = {}

local function createTween(instance, info, properties)
	local tween = TweenService:Create(instance, info, properties)
	tween:Play()
	return tween
end

function Animations.Bounce(instance, options)
	options = options or {}
	local scale = options.scale or 1.1
	local time = options.time or 0.3
	local originalSize = instance.Size
	
	local info = TweenInfo.new(time, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out)
	createTween(instance, info, {Size = UDim2.new(originalSize.X.Scale * scale, originalSize.X.Offset * scale, originalSize.Y.Scale * scale, originalSize.Y.Offset * scale)})
	task.delay(time, function()
		local revertInfo = TweenInfo.new(time, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
		createTween(instance, revertInfo, {Size = originalSize})
	end)
end

function Animations.Squish(instance, options)
	options = options or {}
	local scale = options.scale or 0.9
	local time = options.time or 0.1
	local originalSize = instance.Size
	
	local info = TweenInfo.new(time, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
	createTween(instance, info, {Size = UDim2.new(originalSize.X.Scale * scale, originalSize.X.Offset * scale, originalSize.Y.Scale * scale, originalSize.Y.Offset * scale)})
	task.delay(time, function()
		createTween(instance, info, {Size = originalSize})
	end)
end

function Animations.FadeIn(instance, options)
	options = options or {}
	local time = options.time or 0.3
	
	if instance:IsA("GuiObject") then
		instance.BackgroundTransparency = 1
		local props = {BackgroundTransparency = 0}
		if instance:IsA("TextLabel") or instance:IsA("TextButton") or instance:IsA("TextBox") then
			instance.TextTransparency = 1
			props.TextTransparency = 0
		end
		if instance:IsA("ImageLabel") or instance:IsA("ImageButton") then
			instance.ImageTransparency = 1
			props.ImageTransparency = 0
		end
		
		local info = TweenInfo.new(time, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
		createTween(instance, info, props)
	end
end

function Animations.FadeOut(instance, options)
	options = options or {}
	local time = options.time or 0.3
	
	if instance:IsA("GuiObject") then
		local props = {BackgroundTransparency = 1}
		if instance:IsA("TextLabel") or instance:IsA("TextButton") or instance:IsA("TextBox") then
			props.TextTransparency = 1
		end
		if instance:IsA("ImageLabel") or instance:IsA("ImageButton") then
			props.ImageTransparency = 1
		end
		
		local info = TweenInfo.new(time, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
		createTween(instance, info, props)
	end
end

function Animations.SlideIn(instance, direction, options)
	options = options or {}
	local time = options.time or 0.4
	local originalPos = instance.Position
	
	local startPos
	if direction == "left" then startPos = UDim2.new(-1, 0, originalPos.Y.Scale, originalPos.Y.Offset)
	elseif direction == "right" then startPos = UDim2.new(2, 0, originalPos.Y.Scale, originalPos.Y.Offset)
	elseif direction == "top" then startPos = UDim2.new(originalPos.X.Scale, originalPos.X.Offset, -1, 0)
	elseif direction == "bottom" then startPos = UDim2.new(originalPos.X.Scale, originalPos.X.Offset, 2, 0)
	else startPos = UDim2.new(originalPos.X.Scale, originalPos.X.Offset, 2, 0) end
	
	instance.Position = startPos
	local info = TweenInfo.new(time, Enum.EasingStyle.Back, Enum.EasingDirection.Out)
	createTween(instance, info, {Position = originalPos})
end

function Animations.SlideOut(instance, direction, options)
	options = options or {}
	local time = options.time or 0.4
	local originalPos = instance.Position
	
	local endPos
	if direction == "left" then endPos = UDim2.new(-1, 0, originalPos.Y.Scale, originalPos.Y.Offset)
	elseif direction == "right" then endPos = UDim2.new(2, 0, originalPos.Y.Scale, originalPos.Y.Offset)
	elseif direction == "top" then endPos = UDim2.new(originalPos.X.Scale, originalPos.X.Offset, -1, 0)
	elseif direction == "bottom" then endPos = UDim2.new(originalPos.X.Scale, originalPos.X.Offset, 2, 0)
	else endPos = UDim2.new(originalPos.X.Scale, originalPos.X.Offset, 2, 0) end
	
	local info = TweenInfo.new(time, Enum.EasingStyle.Back, Enum.EasingDirection.In)
	createTween(instance, info, {Position = endPos})
end

function Animations.Pop(instance, options)
	options = options or {}
	local time = options.time or 0.3
	local originalSize = instance.Size
	
	instance.Size = UDim2.new(0, 0, 0, 0)
	local info = TweenInfo.new(time, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out)
	createTween(instance, info, {Size = originalSize})
end

function Animations.Wobble(instance, options)
	options = options or {}
	local time = options.time or 0.5
	local originalRot = instance.Rotation
	
	local info = TweenInfo.new(time/4, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, 3, true)
	createTween(instance, info, {Rotation = originalRot + 15})
	task.delay(time, function() instance.Rotation = originalRot end)
end

function Animations.Shake(instance, options)
	options = options or {}
	local time = options.time or 0.4
	local intensity = options.intensity or 10
	local originalPos = instance.Position
	
	for i = 1, 5 do
		local offset = (i % 2 == 0) and intensity or -intensity
		local info = TweenInfo.new(time/5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
		createTween(instance, info, {Position = UDim2.new(originalPos.X.Scale, originalPos.X.Offset + offset, originalPos.Y.Scale, originalPos.Y.Offset)})
		task.wait(time/5)
	end
	instance.Position = originalPos
end

function Animations.Spin(instance, options)
	options = options or {}
	local time = options.time or 1
	local info = TweenInfo.new(time, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1)
	createTween(instance, info, {Rotation = 360})
end

function Animations.Pulse(instance, options)
	options = options or {}
	local time = options.time or 0.8
	local scale = options.scale or 1.05
	local originalSize = instance.Size
	
	local info = TweenInfo.new(time/2, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true)
	createTween(instance, info, {Size = UDim2.new(originalSize.X.Scale * scale, originalSize.X.Offset * scale, originalSize.Y.Scale * scale, originalSize.Y.Offset * scale)})
end

function Animations.Elastic(instance, options)
	options = options or {}
	local time = options.time or 0.6
	local scale = options.scale or 1.2
	local originalSize = instance.Size
	
	instance.Size = UDim2.new(originalSize.X.Scale / scale, originalSize.X.Offset / scale, originalSize.Y.Scale / scale, originalSize.Y.Offset / scale)
	local info = TweenInfo.new(time, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out)
	createTween(instance, info, {Size = originalSize})
end

function Animations.Float(instance, options)
	options = options or {}
	local time = options.time or 2
	local offset = options.offset or 10
	local originalPos = instance.Position
	
	local info = TweenInfo.new(time, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true)
	createTween(instance, info, {Position = UDim2.new(originalPos.X.Scale, originalPos.X.Offset, originalPos.Y.Scale, originalPos.Y.Offset - offset)})
end

function Animations.ShineSweep(instance, options)
	-- Assumes a UIGradient exists
	local gradient = instance:FindFirstChildOfClass("UIGradient")
	if gradient then
		local time = options.time or 1
		gradient.Offset = Vector2.new(-1, 0)
		local info = TweenInfo.new(time, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut)
		createTween(gradient, info, {Offset = Vector2.new(1, 0)})
	end
end

function Animations.RubberBand(instance, options)
	options = options or {}
	local time = options.time or 0.5
	local originalSize = instance.Size
	
	local info = TweenInfo.new(time, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out)
	createTween(instance, info, {Size = UDim2.new(originalSize.X.Scale * 1.2, originalSize.X.Offset * 1.2, originalSize.Y.Scale * 0.8, originalSize.Y.Offset * 0.8)})
	task.delay(time, function()
		createTween(instance, TweenInfo.new(time/2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = originalSize})
	end)
end

function Animations.HeartBeat(instance, options)
	options = options or {}
	local time = options.time or 1
	local originalSize = instance.Size
	
	local info = TweenInfo.new(time/4, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true)
	createTween(instance, info, {Size = UDim2.new(originalSize.X.Scale * 1.1, originalSize.X.Offset * 1.1, originalSize.Y.Scale * 1.1, originalSize.Y.Offset * 1.1)})
end

function Animations.Ripple(instance, options)
	-- Ripple effect involves creating a circle and scaling it up
	options = options or {}
	local time = options.time or 0.5
	
	local ripple = Instance.new("Frame")
	ripple.BackgroundColor3 = Color3.new(1, 1, 1)
	ripple.BackgroundTransparency = 0.5
	ripple.AnchorPoint = Vector2.new(0.5, 0.5)
	ripple.Position = UDim2.new(0.5, 0, 0.5, 0)
	ripple.Size = UDim2.new(0, 0, 0, 0)
	
	local corner = Instance.new("UICorner")
	corner.CornerRadius = UDim.new(1, 0)
	corner.Parent = ripple
	
	ripple.Parent = instance
	ripple.ClipsDescendants = true
	
	local info = TweenInfo.new(time, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
	createTween(ripple, info, {Size = UDim2.new(2, 0, 2, 0), BackgroundTransparency = 1})
	task.delay(time, function() ripple:Destroy() end)
end

function Animations.Typewriter(textLabel, text, options)
	options = options or {}
	local speed = options.speed or 0.05
	textLabel.Text = ""
	
	for i = 1, #text do
		textLabel.Text = string.sub(text, 1, i)
		task.wait(speed)
	end
end

function Animations.Counter(textLabel, startVal, endVal, options)
	options = options or {}
	local time = options.time or 1
	local steps = options.steps or 30
	local prefix = options.prefix or ""
	local suffix = options.suffix or ""
	
	for i = 0, steps do
		local alpha = i / steps
		-- Ease out quad
		alpha = 1 - (1 - alpha) * (1 - alpha)
		local currentVal = math.floor(startVal + (endVal - startVal) * alpha)
		textLabel.Text = prefix .. tostring(currentVal) .. suffix
		task.wait(time / steps)
	end
function Animations.DepthPress(topFrame, options)
	options = options or {}
	local depth = options.depth or 4
	local origPos = topFrame.Position
	createTween(topFrame, TweenInfo.new(0.06, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = origPos + UDim2.new(0, 0, 0, depth)})
	task.delay(0.1, function()
		createTween(topFrame, TweenInfo.new(0.12, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = origPos})
	end)
end

function Animations.CoinFlip(card, options)
	options = options or {}
	local time = options.time or 0.5
	local origSize = card.Size
	card.Size = UDim2.new(0, 0, origSize.Y.Scale, origSize.Y.Offset)
	createTween(card, TweenInfo.new(time, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Size = origSize})
end

function Animations.JellyWobble(instance, options)
	options = options or {}
	local angle = options.angle or 6
	local t1 = createTween(instance, TweenInfo.new(0.08, Enum.EasingStyle.Sine), {Rotation = -angle})
	t1.Completed:Connect(function()
		local t2 = createTween(instance, TweenInfo.new(0.1, Enum.EasingStyle.Sine), {Rotation = angle})
		t2.Completed:Connect(function()
			createTween(instance, TweenInfo.new(0.14, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Rotation = 0})
		end)
	end)
end

return Animations
