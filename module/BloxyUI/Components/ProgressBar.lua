local TweenService = game:GetService("TweenService")
local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local ProgressBar = {}
ProgressBar.__index = ProgressBar

function ProgressBar.new(options)
	options = options or {}
	local self = setmetatable({}, ProgressBar)
	
	self.Value = options.value or 0 -- 0 to 1
	self.ShowText = options.showText or false
	self.Striped = options.striped or false
	self.Theme = options.theme or "Default"
	
	self:_build()
	self:_applyTheme()
	
	return self
end

function ProgressBar:_build()
	self.Instance = Instance.new("Frame")
	self.Instance.Name = "ProgressBar"
	self.Instance.Size = UDim2.new(1, 0, 0, 20)
	
	self.Corner = Instance.new("UICorner")
	self.Corner.Parent = self.Instance
	
	self.Fill = Instance.new("Frame")
	self.Fill.Name = "Fill"
	self.Fill.Size = UDim2.new(self.Value, 0, 1, 0)
	self.Fill.BorderSizePixel = 0
	self.Fill.Parent = self.Instance
	
	self.FillCorner = Instance.new("UICorner")
	self.FillCorner.Parent = self.Fill
	
	if self.Striped then
		self.Stripe = Instance.new("ImageLabel")
		self.Stripe.BackgroundTransparency = 1
		self.Stripe.Image = "rbxassetid://207869633" -- generic stripe
		self.Stripe.ImageTransparency = 0.8
		self.Stripe.Size = UDim2.new(2, 0, 2, 0)
		self.Stripe.Parent = self.Fill
	end
	
	if self.ShowText then
		self.Label = Instance.new("TextLabel")
		self.Label.BackgroundTransparency = 1
		self.Label.Size = UDim2.new(1, 0, 1, 0)
		self.Label.Text = tostring(math.floor(self.Value * 100)) .. "%"
		self.Label.TextSize = 12
		self.Label.ZIndex = 2
		self.Label.Parent = self.Instance
	end
end

function ProgressBar:_applyTheme()
	local theme = Themes.Get(self.Theme)
	self.Instance.BackgroundColor3 = theme.BorderColor
	self.Fill.BackgroundColor3 = theme.PrimaryColor
	self.Corner.CornerRadius = theme.CornerRadius
	self.FillCorner.CornerRadius = theme.CornerRadius
	
	if self.Label then
		self.Label.TextColor3 = theme.TextColor
		self.Label.FontFace = theme.FontFace
	end
end

function ProgressBar:SetValue(val)
	self.Value = math.clamp(val, 0, 1)
	TweenService:Create(self.Fill, TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = UDim2.new(self.Value, 0, 1, 0)}):Play()
	
	if self.ShowText then
		self.Label.Text = tostring(math.floor(self.Value * 100)) .. "%"
	end
end

return ProgressBar
