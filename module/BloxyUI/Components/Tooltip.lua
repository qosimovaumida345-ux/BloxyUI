local TweenService = game:GetService("TweenService")
local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local Tooltip = {}
Tooltip.__index = Tooltip

function Tooltip.new(options)
	options = options or {}
	local self = setmetatable({}, Tooltip)
	
	self.Text = options.text or "Tooltip"
	self.Position = options.position or "top" -- top, bottom, left, right
	self.Theme = options.theme or "Default"
	
	self:_build()
	self:_applyTheme()
	
	return self
end

function Tooltip:_build()
	self.Instance = Instance.new("Frame")
	self.Instance.Name = "Tooltip"
	self.Instance.AutomaticSize = Enum.AutomaticSize.XY
	
	self.Corner = Instance.new("UICorner")
	self.Corner.Parent = self.Instance
	
	local padding = Instance.new("UIPadding")
	padding.PaddingTop = UDim.new(0, 8)
	padding.PaddingBottom = UDim.new(0, 8)
	padding.PaddingLeft = UDim.new(0, 12)
	padding.PaddingRight = UDim.new(0, 12)
	padding.Parent = self.Instance
	
	self.Label = Instance.new("TextLabel")
	self.Label.BackgroundTransparency = 1
	self.Label.Text = self.Text
	self.Label.TextSize = 14
	self.Label.AutomaticSize = Enum.AutomaticSize.XY
	self.Label.Parent = self.Instance
	
	-- Arrow (simplified using rotation)
	self.Arrow = Instance.new("Frame")
	self.Arrow.Size = UDim2.new(0, 10, 0, 10)
	self.Arrow.Rotation = 45
	self.Arrow.ZIndex = 0
	self.Arrow.Parent = self.Instance
	
	-- Position arrow based on setting
	if self.Position == "top" then
		self.Arrow.Position = UDim2.new(0.5, -5, 1, -5)
	elseif self.Position == "bottom" then
		self.Arrow.Position = UDim2.new(0.5, -5, 0, -5)
	elseif self.Position == "left" then
		self.Arrow.Position = UDim2.new(1, -5, 0.5, -5)
	elseif self.Position == "right" then
		self.Arrow.Position = UDim2.new(0, -5, 0.5, -5)
	end
end

function Tooltip:_applyTheme()
	local theme = Themes.Get(self.Theme)
	self.Instance.BackgroundColor3 = theme.TextColor -- Inverted for tooltip
	self.Corner.CornerRadius = theme.CornerRadius
	self.Arrow.BackgroundColor3 = theme.TextColor
	
	self.Label.TextColor3 = theme.BackgroundColor
	self.Label.FontFace = theme.FontFace
end

function Tooltip:Attach(target)
	self.Instance.Parent = target.Parent
	
	target.MouseEnter:Connect(function()
		self.Instance.Visible = true
		
		-- Simple positioning relative to target (assuming standard absolute sizes)
		local tPos = target.AbsolutePosition
		local tSize = target.AbsoluteSize
		local mySize = self.Instance.AbsoluteSize
		
		if self.Position == "top" then
			self.Instance.Position = UDim2.new(0, tPos.X + tSize.X/2 - mySize.X/2, 0, tPos.Y - mySize.Y - 10)
		elseif self.Position == "bottom" then
			self.Instance.Position = UDim2.new(0, tPos.X + tSize.X/2 - mySize.X/2, 0, tPos.Y + tSize.Y + 10)
		end
		
		self.Instance.BackgroundTransparency = 1
		self.Label.TextTransparency = 1
		self.Arrow.BackgroundTransparency = 1
		
		TweenService:Create(self.Instance, TweenInfo.new(0.2), {BackgroundTransparency = 0}):Play()
		TweenService:Create(self.Label, TweenInfo.new(0.2), {TextTransparency = 0}):Play()
		TweenService:Create(self.Arrow, TweenInfo.new(0.2), {BackgroundTransparency = 0}):Play()
	end)
	
	target.MouseLeave:Connect(function()
		self.Instance.Visible = false
	end)
	
	self.Instance.Visible = false
end

return Tooltip
