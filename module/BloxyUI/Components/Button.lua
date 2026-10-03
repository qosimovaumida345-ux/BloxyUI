local TweenService = game:GetService("TweenService")
local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)
local Animations = require(BloxyUI.Animations)

local Button = {}
Button.__index = Button

local SIZES = {
	small = { Height = 32, Padding = 12, TextSize = 14, IconSize = 16 },
	medium = { Height = 44, Padding = 16, TextSize = 16, IconSize = 20 },
	large = { Height = 56, Padding = 24, TextSize = 20, IconSize = 24 }
}

function Button.new(options)
	options = options or {}
	local self = setmetatable({}, Button)
	
	self.Size = options.size or "medium"
	self.Variant = options.variant or "solid" -- solid, outline, ghost, gradient
	self.Text = options.text or "Button"
	self.Icon = options.icon
	self.Theme = options.theme or "Default"
	self.Disabled = options.disabled or false
	self.OnClick = options.onClick
	
	self:_build()
	self:_applyTheme()
	self:_bindEvents()
	
	return self.Instance
end

function Button:_build()
	local sizeData = SIZES[self.Size]
	
	-- Main Button Container
	self.Instance = Instance.new("TextButton")
	self.Instance.Name = "BloxyButton"
	self.Instance.AutoButtonColor = false
	self.Instance.Text = ""
	self.Instance.Size = UDim2.new(0, 0, 0, sizeData.Height)
	self.Instance.AutomaticSize = Enum.AutomaticSize.X
	self.Instance.ClipsDescendants = false
	
	-- Depth Layer (Shadow)
	self.Shadow = Instance.new("Frame")
	self.Shadow.Name = "Shadow"
	self.Shadow.Size = UDim2.new(1, 0, 1, 0)
	self.Shadow.Position = UDim2.new(0, 0, 0, 4) -- Depth offset
	self.Shadow.ZIndex = 0
	self.Shadow.Parent = self.Instance
	
	-- Surface Layer (Interactive part)
	self.Surface = Instance.new("Frame")
	self.Surface.Name = "Surface"
	self.Surface.Size = UDim2.new(1, 0, 1, 0)
	self.Surface.Position = UDim2.new(0, 0, 0, 0)
	self.Surface.ZIndex = 1
	self.Surface.Parent = self.Instance
	
	-- Corners
	self.SurfaceCorner = Instance.new("UICorner")
	self.SurfaceCorner.Parent = self.Surface
	
	self.ShadowCorner = Instance.new("UICorner")
	self.ShadowCorner.Parent = self.Shadow
	
	-- Layout & Padding
	local padding = Instance.new("UIPadding")
	padding.PaddingLeft = UDim.new(0, sizeData.Padding)
	padding.PaddingRight = UDim.new(0, sizeData.Padding)
	padding.Parent = self.Surface
	
	local layout = Instance.new("UIListLayout")
	layout.FillDirection = Enum.FillDirection.Horizontal
	layout.HorizontalAlignment = Enum.HorizontalAlignment.Center
	layout.VerticalAlignment = Enum.VerticalAlignment.Center
	layout.Padding = UDim.new(0, 8)
	layout.SortOrder = Enum.SortOrder.LayoutOrder
	layout.Parent = self.Surface
	
	-- Icon
	if self.Icon then
		self.IconImage = Instance.new("ImageLabel")
		self.IconImage.Name = "Icon"
		self.IconImage.BackgroundTransparency = 1
		self.IconImage.Image = self.Icon
		self.IconImage.Size = UDim2.new(0, sizeData.IconSize, 0, sizeData.IconSize)
		self.IconImage.LayoutOrder = 1
		self.IconImage.ZIndex = 2
		self.IconImage.Parent = self.Surface
	end
	
	-- Text
	self.TextLabel = Instance.new("TextLabel")
	self.TextLabel.Name = "Label"
	self.TextLabel.BackgroundTransparency = 1
	self.TextLabel.Text = self.Text
	self.TextLabel.TextSize = sizeData.TextSize
	self.TextLabel.AutomaticSize = Enum.AutomaticSize.XY
	self.TextLabel.LayoutOrder = 2
	self.TextLabel.ZIndex = 2
	self.TextLabel.Parent = self.Surface
end

function Button:_applyTheme()
	local themeData = Themes.Get(self.Theme)
	
	self.SurfaceCorner.CornerRadius = themeData.CornerRadius
	self.ShadowCorner.CornerRadius = themeData.CornerRadius
	
	self.TextLabel.FontFace = themeData.FontFace
	self.Shadow.BackgroundColor3 = themeData.SecondaryColor
	
	if self.Disabled then
		self.Surface.BackgroundColor3 = themeData.BorderColor
		self.TextLabel.TextColor3 = themeData.SecondaryColor
		if self.IconImage then self.IconImage.ImageColor3 = themeData.SecondaryColor end
		self.Shadow.BackgroundTransparency = 1
		self.Surface.Position = UDim2.new(0, 0, 0, 2)
		return
	end
	
	if self.Variant == "solid" then
		self.Surface.BackgroundColor3 = themeData.PrimaryColor
		self.TextLabel.TextColor3 = themeData.BackgroundColor
		if self.IconImage then self.IconImage.ImageColor3 = themeData.BackgroundColor end
		self.Shadow.BackgroundTransparency = 0
		
	elseif self.Variant == "outline" then
		self.Surface.BackgroundColor3 = themeData.BackgroundColor
		self.TextLabel.TextColor3 = themeData.PrimaryColor
		if self.IconImage then self.IconImage.ImageColor3 = themeData.PrimaryColor end
		self.Shadow.BackgroundTransparency = 1
		
		local stroke = Instance.new("UIStroke")
		stroke.Color = themeData.PrimaryColor
		stroke.Thickness = 2
		stroke.Parent = self.Surface
		
	elseif self.Variant == "ghost" then
		self.Surface.BackgroundTransparency = 1
		self.TextLabel.TextColor3 = themeData.PrimaryColor
		if self.IconImage then self.IconImage.ImageColor3 = themeData.PrimaryColor end
		self.Shadow.BackgroundTransparency = 1
		
	elseif self.Variant == "gradient" then
		self.Surface.BackgroundColor3 = Color3.new(1,1,1)
		self.TextLabel.TextColor3 = themeData.BackgroundColor
		if self.IconImage then self.IconImage.ImageColor3 = themeData.BackgroundColor end
		
		local gradient = Instance.new("UIGradient")
		gradient.Color = ColorSequence.new({
			ColorSequenceKeypoint.new(0, themeData.PrimaryColor),
			ColorSequenceKeypoint.new(1, themeData.AccentColor)
		})
		gradient.Parent = self.Surface
		self.Shadow.BackgroundTransparency = 0
	end
end

function Button:_bindEvents()
	if self.Disabled then return end
	
	local hoverInfo = TweenInfo.new(0.2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
	local clickInfo = TweenInfo.new(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
	
	self.Instance.MouseEnter:Connect(function()
		TweenService:Create(self.Instance.UIScale or self:_ensureScale(), hoverInfo, {Scale = 1.05}):Play()
	end)
	
	self.Instance.MouseLeave:Connect(function()
		TweenService:Create(self.Instance.UIScale or self:_ensureScale(), hoverInfo, {Scale = 1}):Play()
		TweenService:Create(self.Surface, clickInfo, {Position = UDim2.new(0, 0, 0, 0)}):Play()
	end)
	
	self.Instance.MouseButton1Down:Connect(function()
		local depth = self.Shadow.BackgroundTransparency == 0 and 4 or 0
		TweenService:Create(self.Surface, clickInfo, {Position = UDim2.new(0, 0, 0, depth)}):Play()
	end)
	
	self.Instance.MouseButton1Up:Connect(function()
		TweenService:Create(self.Surface, clickInfo, {Position = UDim2.new(0, 0, 0, 0)}):Play()
	end)
	
	self.Instance.Activated:Connect(function()
		Animations.Ripple(self.Surface)
		if self.OnClick then
			self.OnClick()
		end
	end)
end

function Button:_ensureScale()
	local scale = self.Instance:FindFirstChildOfClass("UIScale")
	if not scale then
		scale = Instance.new("UIScale")
		scale.Parent = self.Instance
	end
	return scale
end

function Button:SetLoading(isLoading)
	if isLoading then
		self.TextLabel.Text = "Loading..."
		if self.IconImage then self.IconImage.Visible = false end
	else
		self.TextLabel.Text = self.Text
		if self.IconImage then self.IconImage.Visible = true end
	end
end

return Button
