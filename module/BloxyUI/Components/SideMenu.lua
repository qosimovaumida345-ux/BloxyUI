local TweenService = game:GetService("TweenService")
local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local SideMenu = {}
SideMenu.__index = SideMenu

function SideMenu.new(options)
	options = options or {}
	local self = setmetatable({}, SideMenu)
	
	self.Items = options.items or {}
	self.Theme = options.theme or "Default"
	self.IsOpen = false
	
	self:_build()
	self:_applyTheme()
	
	return self
end

function SideMenu:_build()
	self.Instance = Instance.new("Frame")
	self.Instance.Name = "SideMenu"
	self.Instance.Size = UDim2.new(0, 250, 1, 0)
	self.Instance.Position = UDim2.new(0, -250, 0, 0) -- Hidden by default
	
	local dropShadow = Instance.new("UIStroke")
	dropShadow.Parent = self.Instance
	
	self.Title = Instance.new("TextLabel")
	self.Title.Size = UDim2.new(1, 0, 0, 60)
	self.Title.BackgroundTransparency = 1
	self.Title.Text = "Menu"
	self.Title.TextSize = 24
	self.Title.Parent = self.Instance
	
	self.CloseBtn = Instance.new("TextButton")
	self.CloseBtn.Size = UDim2.new(0, 40, 0, 40)
	self.CloseBtn.Position = UDim2.new(1, -50, 0, 10)
	self.CloseBtn.BackgroundTransparency = 1
	self.CloseBtn.Text = "X"
	self.CloseBtn.TextSize = 20
	self.CloseBtn.Parent = self.Instance
	self.CloseBtn.Activated:Connect(function() self:Close() end)
	
	self.ItemList = Instance.new("ScrollingFrame")
	self.ItemList.Size = UDim2.new(1, 0, 1, -70)
	self.ItemList.Position = UDim2.new(0, 0, 0, 70)
	self.ItemList.BackgroundTransparency = 1
	self.ItemList.ScrollBarThickness = 4
	self.ItemList.Parent = self.Instance
	
	local layout = Instance.new("UIListLayout")
	layout.Padding = UDim.new(0, 5)
	layout.Parent = self.ItemList
	
	for i, item in ipairs(self.Items) do
		local btn = Instance.new("TextButton")
		btn.Size = UDim2.new(1, -20, 0, 40)
		btn.Position = UDim2.new(0, 10, 0, 0)
		btn.Text = "  " .. item.name
		btn.TextXAlignment = Enum.TextXAlignment.Left
		btn.TextSize = 16
		btn.Parent = self.ItemList
		Instance.new("UICorner").Parent = btn
		
		btn.Activated:Connect(function()
			if item.onClick then item.onClick() end
		end)
	end
end

function SideMenu:_applyTheme()
	local theme = Themes.Get(self.Theme)
	self.Instance.BackgroundColor3 = theme.BackgroundColor
	self.Title.TextColor3 = theme.TextColor
	self.Title.FontFace = theme.FontFace
	self.CloseBtn.TextColor3 = theme.SecondaryColor
	
	for _, child in ipairs(self.ItemList:GetChildren()) do
		if child:IsA("TextButton") then
			child.BackgroundColor3 = theme.BackgroundColor
			child.TextColor3 = theme.TextColor
			child.FontFace = theme.FontFace
		end
	end
end

function SideMenu:Toggle()
	if self.IsOpen then self:Close() else self:Open() end
end

function SideMenu:Open()
	self.IsOpen = true
	TweenService:Create(self.Instance, TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Position = UDim2.new(0, 0, 0, 0)}):Play()
end

function SideMenu:Close()
	self.IsOpen = false
	TweenService:Create(self.Instance, TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {Position = UDim2.new(0, -250, 0, 0)}):Play()
end

return SideMenu
