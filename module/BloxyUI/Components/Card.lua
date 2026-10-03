local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local Card = {}
Card.__index = Card

function Card.new(options)
	options = options or {}
	local self = setmetatable({}, Card)
	
	self.Title = options.title
	self.Icon = options.icon
	self.Content = options.content
	self.Variant = options.variant or "default" -- default, outlined, elevated
	self.Theme = options.theme or "Default"
	
	self:_build()
	self:_applyTheme()
	
	return self.Instance
end

function Card:_build()
	self.Instance = Instance.new("Frame")
	self.Instance.Name = "Card"
	self.Instance.Size = UDim2.new(0, 300, 0, 200)
	
	self.Corner = Instance.new("UICorner")
	self.Corner.Parent = self.Instance
	
	local padding = Instance.new("UIPadding")
	padding.PaddingTop = UDim.new(0, 20)
	padding.PaddingBottom = UDim.new(0, 20)
	padding.PaddingLeft = UDim.new(0, 20)
	padding.PaddingRight = UDim.new(0, 20)
	padding.Parent = self.Instance
	
	local layout = Instance.new("UIListLayout")
	layout.SortOrder = Enum.SortOrder.LayoutOrder
	layout.Padding = UDim.new(0, 10)
	layout.Parent = self.Instance
	
	if self.Title or self.Icon then
		self.Header = Instance.new("Frame")
		self.Header.BackgroundTransparency = 1
		self.Header.Size = UDim2.new(1, 0, 0, 30)
		self.Header.LayoutOrder = 1
		self.Header.Parent = self.Instance
		
		local hl = Instance.new("UIListLayout")
		hl.FillDirection = Enum.FillDirection.Horizontal
		hl.VerticalAlignment = Enum.VerticalAlignment.Center
		hl.Padding = UDim.new(0, 10)
		hl.Parent = self.Header
		
		if self.Icon then
			self.IconImg = Instance.new("ImageLabel")
			self.IconImg.BackgroundTransparency = 1
			self.IconImg.Size = UDim2.new(0, 24, 0, 24)
			self.IconImg.Image = self.Icon
			self.IconImg.Parent = self.Header
		end
		
		if self.Title then
			self.TitleLbl = Instance.new("TextLabel")
			self.TitleLbl.BackgroundTransparency = 1
			self.TitleLbl.Size = UDim2.new(1, -34, 1, 0)
			self.TitleLbl.Text = self.Title
			self.TitleLbl.TextSize = 18
			self.TitleLbl.TextXAlignment = Enum.TextXAlignment.Left
			self.TitleLbl.Parent = self.Header
		end
	end
	
	if self.Content then
		self.ContentLbl = Instance.new("TextLabel")
		self.ContentLbl.BackgroundTransparency = 1
		self.ContentLbl.Size = UDim2.new(1, 0, 1, -40)
		self.ContentLbl.Text = self.Content
		self.ContentLbl.TextSize = 14
		self.ContentLbl.TextWrapped = true
		self.ContentLbl.TextXAlignment = Enum.TextXAlignment.Left
		self.ContentLbl.TextYAlignment = Enum.TextYAlignment.Top
		self.ContentLbl.LayoutOrder = 2
		self.ContentLbl.Parent = self.Instance
	end
end

function Card:_applyTheme()
	local theme = Themes.Get(self.Theme)
	
	self.Corner.CornerRadius = theme.CornerRadius
	
	if self.TitleLbl then
		self.TitleLbl.TextColor3 = theme.TextColor
		self.TitleLbl.FontFace = theme.FontFace
	end
	
	if self.IconImg then
		self.IconImg.ImageColor3 = theme.PrimaryColor
	end
	
	if self.ContentLbl then
		self.ContentLbl.TextColor3 = theme.SecondaryColor
		self.ContentLbl.FontFace = theme.FontFace
	end
	
	if self.Variant == "default" then
		self.Instance.BackgroundColor3 = theme.BackgroundColor
	elseif self.Variant == "outlined" then
		self.Instance.BackgroundColor3 = Color3.new(1, 1, 1)
		self.Instance.BackgroundTransparency = 1
		local stroke = Instance.new("UIStroke")
		stroke.Color = theme.BorderColor
		stroke.Thickness = theme.BorderWidth
		stroke.Parent = self.Instance
	elseif self.Variant == "elevated" then
		self.Instance.BackgroundColor3 = theme.BackgroundColor
		-- pseudo shadow
		local shadow = Instance.new("ImageLabel")
		shadow.BackgroundTransparency = 1
		shadow.Image = "rbxassetid://1316045217"
		shadow.ImageColor3 = Color3.new(0,0,0)
		shadow.ImageTransparency = 0.8
		shadow.ScaleType = Enum.ScaleType.Slice
		shadow.SliceCenter = Rect.new(10,10,118,118)
		shadow.Size = UDim2.new(1, 20, 1, 20)
		shadow.Position = UDim2.new(0.5, 0, 0.5, 4)
		shadow.AnchorPoint = Vector2.new(0.5, 0.5)
		shadow.ZIndex = self.Instance.ZIndex - 1
		shadow.Parent = self.Instance
	end
end

return Card
