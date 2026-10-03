local TweenService = game:GetService("TweenService")
local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local Dropdown = {}
Dropdown.__index = Dropdown

function Dropdown.new(options)
	options = options or {}
	local self = setmetatable({}, Dropdown)
	
	self.Options = options.options or {"Option 1", "Option 2"}
	self.Selected = options.selected or self.Options[1]
	self.Theme = options.theme or "Default"
	self.OnSelect = options.onSelect
	self.IsOpen = false
	
	self:_build()
	self:_applyTheme()
	
	return self
end

function Dropdown:_build()
	self.Instance = Instance.new("Frame")
	self.Instance.Name = "Dropdown"
	self.Instance.Size = UDim2.new(1, 0, 0, 40)
	self.Instance.BackgroundTransparency = 1
	self.Instance.ZIndex = 10
	
	-- Main Button
	self.Button = Instance.new("TextButton")
	self.Button.Size = UDim2.new(1, 0, 0, 40)
	self.Button.Text = self.Selected
	self.Button.TextSize = 16
	self.Button.TextXAlignment = Enum.TextXAlignment.Left
	self.Button.Parent = self.Instance
	self.Corner = Instance.new("UICorner")
	self.Corner.Parent = self.Button
	
	local padding = Instance.new("UIPadding")
	padding.PaddingLeft = UDim.new(0, 10)
	padding.PaddingRight = UDim.new(0, 10)
	padding.Parent = self.Button
	
	self.Icon = Instance.new("TextLabel")
	self.Icon.Size = UDim2.new(0, 20, 1, 0)
	self.Icon.Position = UDim2.new(1, 0, 0, 0)
	self.Icon.AnchorPoint = Vector2.new(1, 0)
	self.Icon.BackgroundTransparency = 1
	self.Icon.Text = "▼"
	self.Icon.Parent = self.Button
	
	-- Options List
	self.ListFrame = Instance.new("ScrollingFrame")
	self.ListFrame.Size = UDim2.new(1, 0, 0, 0)
	self.ListFrame.Position = UDim2.new(0, 0, 0, 45)
	self.ListFrame.ClipsDescendants = true
	self.ListFrame.ScrollBarThickness = 4
	self.ListFrame.ZIndex = 11
	self.ListFrame.Parent = self.Instance
	self.ListCorner = Instance.new("UICorner")
	self.ListCorner.Parent = self.ListFrame
	
	local layout = Instance.new("UIListLayout")
	layout.SortOrder = Enum.SortOrder.LayoutOrder
	layout.Parent = self.ListFrame
	
	for i, opt in ipairs(self.Options) do
		local btn = Instance.new("TextButton")
		btn.Size = UDim2.new(1, 0, 0, 35)
		btn.Text = "  " .. opt
		btn.TextSize = 14
		btn.TextXAlignment = Enum.TextXAlignment.Left
		btn.ZIndex = 12
		btn.Parent = self.ListFrame
		
		btn.Activated:Connect(function()
			self:Select(opt)
			self:Close()
		end)
	end
	
	self.Button.Activated:Connect(function()
		if self.IsOpen then self:Close() else self:Open() end
	end)
end

function Dropdown:_applyTheme()
	local theme = Themes.Get(self.Theme)
	self.Button.BackgroundColor3 = theme.BackgroundColor
	self.Button.TextColor3 = theme.TextColor
	self.Button.FontFace = theme.FontFace
	self.Icon.TextColor3 = theme.SecondaryColor
	self.Corner.CornerRadius = theme.CornerRadius
	
	self.ListFrame.BackgroundColor3 = theme.BackgroundColor
	self.ListCorner.CornerRadius = theme.CornerRadius
	
	for _, child in ipairs(self.ListFrame:GetChildren()) do
		if child:IsA("TextButton") then
			child.BackgroundColor3 = theme.BackgroundColor
			child.TextColor3 = theme.TextColor
			child.FontFace = theme.FontFace
		end
	end
end

function Dropdown:Open()
	self.IsOpen = true
	local targetHeight = math.min(#self.Options * 35, 150)
	self.ListFrame.CanvasSize = UDim2.new(0, 0, 0, #self.Options * 35)
	TweenService:Create(self.ListFrame, TweenInfo.new(0.2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = UDim2.new(1, 0, 0, targetHeight)}):Play()
	TweenService:Create(self.Icon, TweenInfo.new(0.2), {Rotation = 180}):Play()
end

function Dropdown:Close()
	self.IsOpen = false
	TweenService:Create(self.ListFrame, TweenInfo.new(0.2, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = UDim2.new(1, 0, 0, 0)}):Play()
	TweenService:Create(self.Icon, TweenInfo.new(0.2), {Rotation = 0}):Play()
end

function Dropdown:Select(opt)
	self.Selected = opt
	self.Button.Text = opt
	if self.OnSelect then self.OnSelect(opt) end
end

return Dropdown
