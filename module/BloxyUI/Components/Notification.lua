local TweenService = game:GetService("TweenService")
local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local Notification = {}
Notification.__index = Notification

function Notification.new(options)
	options = options or {}
	local self = setmetatable({}, Notification)
	
	self.Title = options.title or "Notification"
	self.Message = options.message or ""
	self.Type = options.type or "info" -- success, error, warning, info
	self.Duration = options.duration or 3
	self.Theme = options.theme or "Default"
	
	self:_build()
	self:_applyTheme()
	
	return self
end

function Notification:_build()
	self.Instance = Instance.new("Frame")
	self.Instance.Name = "Notification"
	self.Instance.Size = UDim2.new(0, 300, 0, 80)
	self.Instance.Position = UDim2.new(1, 20, 1, -100) -- Start offscreen right
	self.Instance.AnchorPoint = Vector2.new(1, 1)
	
	self.Corner = Instance.new("UICorner")
	self.Corner.Parent = self.Instance
	
	self.Icon = Instance.new("ImageLabel")
	self.Icon.Size = UDim2.new(0, 24, 0, 24)
	self.Icon.Position = UDim2.new(0, 15, 0, 15)
	self.Icon.BackgroundTransparency = 1
	self.Icon.Parent = self.Instance
	
	-- Determine Icon
	if self.Type == "success" then self.Icon.Image = "rbxassetid://6031094670"
	elseif self.Type == "error" then self.Icon.Image = "rbxassetid://6031094733"
	elseif self.Type == "warning" then self.Icon.Image = "rbxassetid://6031095034"
	else self.Icon.Image = "rbxassetid://6031094895" end
	
	self.TitleLabel = Instance.new("TextLabel")
	self.TitleLabel.Size = UDim2.new(1, -60, 0, 20)
	self.TitleLabel.Position = UDim2.new(0, 50, 0, 15)
	self.TitleLabel.BackgroundTransparency = 1
	self.TitleLabel.Text = self.Title
	self.TitleLabel.TextSize = 16
	self.TitleLabel.TextXAlignment = Enum.TextXAlignment.Left
	self.TitleLabel.Parent = self.Instance
	
	self.MessageLabel = Instance.new("TextLabel")
	self.MessageLabel.Size = UDim2.new(1, -60, 0, 30)
	self.MessageLabel.Position = UDim2.new(0, 50, 0, 35)
	self.MessageLabel.BackgroundTransparency = 1
	self.MessageLabel.Text = self.Message
	self.MessageLabel.TextSize = 14
	self.MessageLabel.TextWrapped = true
	self.MessageLabel.TextXAlignment = Enum.TextXAlignment.Left
	self.MessageLabel.TextYAlignment = Enum.TextYAlignment.Top
	self.MessageLabel.Parent = self.Instance
	
	self.ProgressBar = Instance.new("Frame")
	self.ProgressBar.Size = UDim2.new(1, 0, 0, 4)
	self.ProgressBar.Position = UDim2.new(0, 0, 1, -4)
	self.ProgressBar.BorderSizePixel = 0
	self.ProgressBar.Parent = self.Instance
	Instance.new("UICorner", self.ProgressBar)
end

function Notification:_applyTheme()
	local theme = Themes.Get(self.Theme)
	self.Instance.BackgroundColor3 = theme.BackgroundColor
	self.Corner.CornerRadius = theme.CornerRadius
	
	self.TitleLabel.TextColor3 = theme.TextColor
	self.TitleLabel.FontFace = theme.FontFace
	self.MessageLabel.TextColor3 = theme.SecondaryColor
	self.MessageLabel.FontFace = theme.FontFace
	
	-- Type colors
	if self.Type == "success" then
		self.Icon.ImageColor3 = Color3.fromRGB(40, 200, 80)
		self.ProgressBar.BackgroundColor3 = Color3.fromRGB(40, 200, 80)
	elseif self.Type == "error" then
		self.Icon.ImageColor3 = Color3.fromRGB(240, 60, 60)
		self.ProgressBar.BackgroundColor3 = Color3.fromRGB(240, 60, 60)
	elseif self.Type == "warning" then
		self.Icon.ImageColor3 = Color3.fromRGB(250, 180, 50)
		self.ProgressBar.BackgroundColor3 = Color3.fromRGB(250, 180, 50)
	else
		self.Icon.ImageColor3 = theme.PrimaryColor
		self.ProgressBar.BackgroundColor3 = theme.PrimaryColor
	end
end

function Notification:Show(parent)
	self.Instance.Parent = parent
	
	-- Slide In
	TweenService:Create(self.Instance, TweenInfo.new(0.5, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = UDim2.new(1, -20, 1, -100)}):Play()
	
	-- Progress Bar animation
	local progressTween = TweenService:Create(self.ProgressBar, TweenInfo.new(self.Duration, Enum.EasingStyle.Linear), {Size = UDim2.new(0, 0, 0, 4)})
	progressTween:Play()
	
	progressTween.Completed:Connect(function()
		self:Close()
	end)
end

function Notification:Close()
	local tween = TweenService:Create(self.Instance, TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Position = UDim2.new(1, 350, 1, -100)})
	tween:Play()
	tween.Completed:Connect(function()
		self.Instance:Destroy()
	end)
end

return Notification
