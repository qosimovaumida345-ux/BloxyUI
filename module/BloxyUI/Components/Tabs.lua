local TweenService = game:GetService("TweenService")
local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local Tabs = {}
Tabs.__index = Tabs

function Tabs.new(options)
	options = options or {}
	local self = setmetatable({}, Tabs)
	
	self.Tabs = options.tabs or {{id = "tab1", label = "Tab 1"}}
	self.ActiveTab = options.activeTab or self.Tabs[1].id
	self.Theme = options.theme or "Default"
	self.OnChange = options.onChange
	
	self:_build()
	self:_applyTheme()
	
	return self
end

function Tabs:_build()
	self.Instance = Instance.new("Frame")
	self.Instance.Name = "Tabs"
	self.Instance.Size = UDim2.new(1, 0, 0, 40)
	self.Instance.BackgroundTransparency = 1
	
	local layout = Instance.new("UIListLayout")
	layout.FillDirection = Enum.FillDirection.Horizontal
	layout.Parent = self.Instance
	
	self.TabButtons = {}
	
	for i, tabInfo in ipairs(self.Tabs) do
		local btn = Instance.new("TextButton")
		btn.Size = UDim2.new(1 / #self.Tabs, 0, 1, 0)
		btn.BackgroundTransparency = 1
		btn.Text = tabInfo.label
		btn.TextSize = 16
		btn.Parent = self.Instance
		
		self.TabButtons[tabInfo.id] = btn
		
		btn.Activated:Connect(function()
			self:SetActiveTab(tabInfo.id)
		end)
	end
	
	-- Indicator
	self.Indicator = Instance.new("Frame")
	self.Indicator.Size = UDim2.new(1 / #self.Tabs, 0, 0, 3)
	self.Indicator.Position = UDim2.new(0, 0, 1, -3)
	self.Indicator.BorderSizePixel = 0
	self.Indicator.Parent = self.Instance
	
	self:_updateIndicator(true)
end

function Tabs:_applyTheme()
	local theme = Themes.Get(self.Theme)
	self.Indicator.BackgroundColor3 = theme.PrimaryColor
	
	for id, btn in pairs(self.TabButtons) do
		btn.TextColor3 = (id == self.ActiveTab) and theme.PrimaryColor or theme.SecondaryColor
		btn.FontFace = theme.FontFace
	end
end

function Tabs:_updateIndicator(instant)
	local index = 1
	for i, t in ipairs(self.Tabs) do
		if t.id == self.ActiveTab then
			index = i
			break
		end
	end
	
	local targetPos = UDim2.new((index - 1) / #self.Tabs, 0, 1, -3)
	if instant then
		self.Indicator.Position = targetPos
	else
		TweenService:Create(self.Indicator, TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = targetPos}):Play()
	end
	
	-- Update Colors
	local theme = Themes.Get(self.Theme)
	for id, btn in pairs(self.TabButtons) do
		local targetColor = (id == self.ActiveTab) and theme.PrimaryColor or theme.SecondaryColor
		TweenService:Create(btn, TweenInfo.new(0.3), {TextColor3 = targetColor}):Play()
	end
end

function Tabs:SetActiveTab(id)
	if self.ActiveTab == id then return end
	self.ActiveTab = id
	self:_updateIndicator(false)
	
	if self.OnChange then
		self.OnChange(id)
	end
end

return Tabs
