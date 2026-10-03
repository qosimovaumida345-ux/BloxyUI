local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local Badge = {}
Badge.__index = Badge

function Badge.new(options)
	options = options or {}
	local self = setmetatable({}, Badge)
	
	self.Text = options.text
	self.Variant = options.variant or "pill" -- pill, dot
	self.Theme = options.theme or "Default"
	
	self:_build()
	self:_applyTheme()
	
	return self.Instance
end

function Badge:_build()
	self.Instance = Instance.new("Frame")
	self.Instance.Name = "Badge"
	
	self.Corner = Instance.new("UICorner")
	self.Corner.Parent = self.Instance
	
	if self.Variant == "dot" then
		self.Instance.Size = UDim2.new(0, 12, 0, 12)
		self.Corner.CornerRadius = UDim.new(1, 0)
	else
		self.Instance.AutomaticSize = Enum.AutomaticSize.X
		self.Instance.Size = UDim2.new(0, 0, 0, 20)
		self.Corner.CornerRadius = UDim.new(1, 0)
		
		local padding = Instance.new("UIPadding")
		padding.PaddingLeft = UDim.new(0, 8)
		padding.PaddingRight = UDim.new(0, 8)
		padding.Parent = self.Instance
		
		self.Label = Instance.new("TextLabel")
		self.Label.BackgroundTransparency = 1
		self.Label.Size = UDim2.new(1, 0, 1, 0)
		self.Label.Text = self.Text or "New"
		self.Label.TextSize = 12
		self.Label.Parent = self.Instance
	end
end

function Badge:_applyTheme()
	local theme = Themes.Get(self.Theme)
	self.Instance.BackgroundColor3 = theme.PrimaryColor
	
	if self.Label then
		self.Label.TextColor3 = theme.BackgroundColor
		self.Label.FontFace = theme.FontFace
	end
end

return Badge
