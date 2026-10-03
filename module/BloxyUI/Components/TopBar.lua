local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)

local TopBar = {}
TopBar.__index = TopBar

function TopBar.new(options)
	options = options or {}
	local self = setmetatable({}, TopBar)
	
	self.PlayerName = options.playerName or "Player"
	self.Coins = options.coins or 0
	self.Level = options.level or 1
	self.Theme = options.theme or "Default"
	
	self:_build()
	self:_applyTheme()
	
	return self.Instance
end

function TopBar:_build()
	self.Instance = Instance.new("Frame")
	self.Instance.Name = "TopBar"
	self.Instance.Size = UDim2.new(1, 0, 0, 60)
	self.Instance.BackgroundTransparency = 1
	
	local padding = Instance.new("UIPadding")
	padding.PaddingTop = UDim.new(0, 10)
	padding.PaddingLeft = UDim.new(0, 20)
	padding.PaddingRight = UDim.new(0, 20)
	padding.Parent = self.Instance
	
	-- Left: Player Info
	self.PlayerFrame = Instance.new("Frame")
	self.PlayerFrame.Size = UDim2.new(0, 200, 1, 0)
	self.PlayerFrame.BackgroundTransparency = 1
	self.PlayerFrame.Parent = self.Instance
	
	local playLayout = Instance.new("UIListLayout")
	playLayout.FillDirection = Enum.FillDirection.Horizontal
	playLayout.VerticalAlignment = Enum.VerticalAlignment.Center
	playLayout.Padding = UDim.new(0, 10)
	playLayout.Parent = self.PlayerFrame
	
	self.Avatar = Instance.new("ImageLabel")
	self.Avatar.Size = UDim2.new(0, 40, 0, 40)
	self.Avatar.Image = "rbxasset://textures/ui/GuiImagePlaceholder.png"
	self.Avatar.Parent = self.PlayerFrame
	Instance.new("UICorner", self.Avatar).CornerRadius = UDim.new(1,0)
	
	self.NameLabel = Instance.new("TextLabel")
	self.NameLabel.Size = UDim2.new(0, 100, 1, 0)
	self.NameLabel.BackgroundTransparency = 1
	self.NameLabel.Text = self.PlayerName
	self.NameLabel.TextSize = 18
	self.NameLabel.TextXAlignment = Enum.TextXAlignment.Left
	self.NameLabel.Parent = self.PlayerFrame
	
	-- Right: Stats
	self.StatsFrame = Instance.new("Frame")
	self.StatsFrame.Size = UDim2.new(0, 300, 1, 0)
	self.StatsFrame.Position = UDim2.new(1, 0, 0, 0)
	self.StatsFrame.AnchorPoint = Vector2.new(1, 0)
	self.StatsFrame.BackgroundTransparency = 1
	self.StatsFrame.Parent = self.Instance
	
	local statsLayout = Instance.new("UIListLayout")
	statsLayout.FillDirection = Enum.FillDirection.Horizontal
	statsLayout.HorizontalAlignment = Enum.HorizontalAlignment.Right
	statsLayout.VerticalAlignment = Enum.VerticalAlignment.Center
	statsLayout.Padding = UDim.new(0, 20)
	statsLayout.Parent = self.StatsFrame
	
	self.CoinLabel = Instance.new("TextLabel")
	self.CoinLabel.Size = UDim2.new(0, 100, 0, 30)
	self.CoinLabel.Text = "🪙 " .. tostring(self.Coins)
	self.CoinLabel.TextSize = 16
	self.CoinLabel.Parent = self.StatsFrame
	self.CoinCorner = Instance.new("UICorner")
	self.CoinCorner.Parent = self.CoinLabel
	
	self.LevelLabel = Instance.new("TextLabel")
	self.LevelLabel.Size = UDim2.new(0, 100, 0, 30)
	self.LevelLabel.Text = "⭐ Lvl " .. tostring(self.Level)
	self.LevelLabel.TextSize = 16
	self.LevelLabel.Parent = self.StatsFrame
	self.LevelCorner = Instance.new("UICorner")
	self.LevelCorner.Parent = self.LevelLabel
end

function TopBar:_applyTheme()
	local theme = Themes.Get(self.Theme)
	
	self.NameLabel.TextColor3 = theme.TextColor
	self.NameLabel.FontFace = theme.FontFace
	
	self.CoinLabel.BackgroundColor3 = theme.BackgroundColor
	self.CoinLabel.TextColor3 = theme.TextColor
	self.CoinLabel.FontFace = theme.FontFace
	self.CoinCorner.CornerRadius = theme.CornerRadius
	
	self.LevelLabel.BackgroundColor3 = theme.PrimaryColor
	self.LevelLabel.TextColor3 = theme.BackgroundColor
	self.LevelLabel.FontFace = theme.FontFace
	self.LevelCorner.CornerRadius = theme.CornerRadius
end

return TopBar
