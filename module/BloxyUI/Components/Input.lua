local TweenService = game:GetService("TweenService")
local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local Input = {}
Input.__index = Input

function Input.new(options)
	options = options or {}
	local self = setmetatable({}, Input)
	
	self.Placeholder = options.placeholder or "Enter text..."
	self.Label = options.label
	self.Theme = options.theme or "Default"
	
	self:_build()
	self:_applyTheme()
	
	return self
end

function Input:_build()
	self.Container = Instance.new("Frame")
	self.Container.Name = "InputContainer"
	self.Container.Size = UDim2.new(1, 0, 0, 40)
	self.Container.BackgroundTransparency = 1
	
	if self.Label then
		self.Container.Size = UDim2.new(1, 0, 0, 60)
		self.LabelText = Instance.new("TextLabel")
		self.LabelText.Size = UDim2.new(1, 0, 0, 20)
		self.LabelText.BackgroundTransparency = 1
		self.LabelText.Text = self.Label
		self.LabelText.TextSize = 14
		self.LabelText.TextXAlignment = Enum.TextXAlignment.Left
		self.LabelText.Parent = self.Container
	end
	
	self.Instance = Instance.new("TextBox")
	self.Instance.Name = "InputField"
	self.Instance.Size = UDim2.new(1, 0, 0, 40)
	self.Instance.Position = self.Label and UDim2.new(0, 0, 0, 20) or UDim2.new(0, 0, 0, 0)
	self.Instance.Text = ""
	self.Instance.PlaceholderText = self.Placeholder
	self.Instance.TextSize = 16
	self.Instance.TextXAlignment = Enum.TextXAlignment.Left
	self.Instance.Parent = self.Container
	
	self.Corner = Instance.new("UICorner")
	self.Corner.Parent = self.Instance
	
	self.Stroke = Instance.new("UIStroke")
	self.Stroke.Thickness = 1
	self.Stroke.Parent = self.Instance
	
	local padding = Instance.new("UIPadding")
	padding.PaddingLeft = UDim.new(0, 10)
	padding.PaddingRight = UDim.new(0, 10)
	padding.Parent = self.Instance
	
	-- Events
	self.Instance.Focused:Connect(function()
		local theme = Themes.Get(self.Theme)
		TweenService:Create(self.Stroke, TweenInfo.new(0.2), {Color = theme.PrimaryColor, Thickness = 2}):Play()
	end)
	
	self.Instance.FocusLost:Connect(function()
		local theme = Themes.Get(self.Theme)
		TweenService:Create(self.Stroke, TweenInfo.new(0.2), {Color = theme.BorderColor, Thickness = 1}):Play()
	end)
end

function Input:_applyTheme()
	local theme = Themes.Get(self.Theme)
	self.Instance.BackgroundColor3 = theme.BackgroundColor
	self.Instance.TextColor3 = theme.TextColor
	self.Instance.PlaceholderColor3 = theme.SecondaryColor
	self.Instance.FontFace = theme.FontFace
	self.Corner.CornerRadius = theme.CornerRadius
	self.Stroke.Color = theme.BorderColor
	
	if self.LabelText then
		self.LabelText.TextColor3 = theme.TextColor
		self.LabelText.FontFace = theme.FontFace
	end
end

return Input
