local TweenService = game:GetService("TweenService")
local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local Toggle = {}
Toggle.__index = Toggle

function Toggle.new(options)
	options = options or {}
	local self = setmetatable({}, Toggle)
	
	self.Label = options.label
	self.Value = options.value or false
	self.Theme = options.theme or "Default"
	self.OnChanged = options.onChanged
	
	self:_build()
	self:_applyTheme()
	
	return self
end

function Toggle:_build()
	self.Container = Instance.new("Frame")
	self.Container.Name = "ToggleContainer"
	self.Container.Size = UDim2.new(1, 0, 0, 30)
	self.Container.BackgroundTransparency = 1
	
	self.Instance = Instance.new("TextButton")
	self.Instance.Name = "Toggle"
	self.Instance.Size = UDim2.new(0, 50, 0, 26)
	self.Instance.Position = UDim2.new(0, 0, 0.5, 0)
	self.Instance.AnchorPoint = Vector2.new(0, 0.5)
	self.Instance.Text = ""
	self.Instance.Parent = self.Container
	
	self.Corner = Instance.new("UICorner")
	self.Corner.CornerRadius = UDim.new(1, 0)
	self.Corner.Parent = self.Instance
	
	self.Knob = Instance.new("Frame")
	self.Knob.Size = UDim2.new(0, 20, 0, 20)
	self.Knob.Position = self.Value and UDim2.new(1, -23, 0.5, 0) or UDim2.new(0, 3, 0.5, 0)
	self.Knob.AnchorPoint = Vector2.new(0, 0.5)
	self.Knob.BackgroundColor3 = Color3.new(1, 1, 1)
	self.Knob.Parent = self.Instance
	
	Instance.new("UICorner", self.Knob).CornerRadius = UDim.new(1, 0)
	
	if self.Label then
		self.LabelText = Instance.new("TextLabel")
		self.LabelText.Size = UDim2.new(1, -60, 1, 0)
		self.LabelText.Position = UDim2.new(0, 60, 0, 0)
		self.LabelText.BackgroundTransparency = 1
		self.LabelText.Text = self.Label
		self.LabelText.TextSize = 16
		self.LabelText.TextXAlignment = Enum.TextXAlignment.Left
		self.LabelText.Parent = self.Container
	end
	
	self.Instance.Activated:Connect(function()
		self:SetValue(not self.Value)
	end)
end

function Toggle:_applyTheme()
	local theme = Themes.Get(self.Theme)
	self.Instance.BackgroundColor3 = self.Value and theme.PrimaryColor or theme.BorderColor
	
	if self.LabelText then
		self.LabelText.TextColor3 = theme.TextColor
		self.LabelText.FontFace = theme.FontFace
	end
end

function Toggle:SetValue(val)
	self.Value = val
	local theme = Themes.Get(self.Theme)
	
	local targetPos = self.Value and UDim2.new(1, -23, 0.5, 0) or UDim2.new(0, 3, 0.5, 0)
	local targetColor = self.Value and theme.PrimaryColor or theme.BorderColor
	
	TweenService:Create(self.Knob, TweenInfo.new(0.2, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {Position = targetPos}):Play()
	TweenService:Create(self.Instance, TweenInfo.new(0.2), {BackgroundColor3 = targetColor}):Play()
	
	if self.OnChanged then
		self.OnChanged(self.Value)
	end
end

return Toggle
