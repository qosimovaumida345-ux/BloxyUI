local Themes = {}

Themes.Default = {
	PrimaryColor = Color3.fromRGB(0, 120, 255),
	SecondaryColor = Color3.fromRGB(100, 100, 100),
	AccentColor = Color3.fromRGB(0, 200, 150),
	BackgroundColor = Color3.fromRGB(240, 240, 240),
	TextColor = Color3.fromRGB(30, 30, 30),
	BorderColor = Color3.fromRGB(200, 200, 200),
	BorderWidth = 1,
	CornerRadius = UDim.new(0, 8),
	FontFace = Font.fromEnum(Enum.Font.GothamMedium),
	ShadowDepth = 2
}

Themes.Neon = {
	PrimaryColor = Color3.fromRGB(255, 0, 255),
	SecondaryColor = Color3.fromRGB(0, 255, 255),
	AccentColor = Color3.fromRGB(255, 255, 0),
	BackgroundColor = Color3.fromRGB(20, 20, 20),
	TextColor = Color3.fromRGB(255, 255, 255),
	BorderColor = Color3.fromRGB(255, 0, 255),
	BorderWidth = 2,
	CornerRadius = UDim.new(0, 12),
	FontFace = Font.fromEnum(Enum.Font.SciFi),
	ShadowDepth = 4
}

Themes.Cartoony = {
	PrimaryColor = Color3.fromRGB(255, 150, 0),
	SecondaryColor = Color3.fromRGB(0, 150, 255),
	AccentColor = Color3.fromRGB(100, 255, 0),
	BackgroundColor = Color3.fromRGB(255, 255, 255),
	TextColor = Color3.fromRGB(50, 50, 50),
	BorderColor = Color3.fromRGB(50, 50, 50),
	BorderWidth = 4,
	CornerRadius = UDim.new(0, 16),
	FontFace = Font.fromEnum(Enum.Font.FredokaOne),
	ShadowDepth = 6
}

Themes.Minimal = {
	PrimaryColor = Color3.fromRGB(0, 0, 0),
	SecondaryColor = Color3.fromRGB(150, 150, 150),
	AccentColor = Color3.fromRGB(50, 50, 50),
	BackgroundColor = Color3.fromRGB(255, 255, 255),
	TextColor = Color3.fromRGB(0, 0, 0),
	BorderColor = Color3.fromRGB(230, 230, 230),
	BorderWidth = 1,
	CornerRadius = UDim.new(0, 4),
	FontFace = Font.fromEnum(Enum.Font.SourceSans),
	ShadowDepth = 0
}

Themes.Fantasy = {
	PrimaryColor = Color3.fromRGB(150, 50, 200),
	SecondaryColor = Color3.fromRGB(200, 150, 50),
	AccentColor = Color3.fromRGB(50, 200, 150),
	BackgroundColor = Color3.fromRGB(40, 30, 50),
	TextColor = Color3.fromRGB(240, 230, 255),
	BorderColor = Color3.fromRGB(100, 80, 120),
	BorderWidth = 2,
	CornerRadius = UDim.new(0, 6),
	FontFace = Font.fromEnum(Enum.Font.Antique),
	ShadowDepth = 3
}

Themes.Retro = {
	PrimaryColor = Color3.fromRGB(0, 255, 0),
	SecondaryColor = Color3.fromRGB(255, 0, 255),
	AccentColor = Color3.fromRGB(0, 255, 255),
	BackgroundColor = Color3.fromRGB(0, 0, 0),
	TextColor = Color3.fromRGB(0, 255, 0),
	BorderColor = Color3.fromRGB(0, 255, 0),
	BorderWidth = 2,
	CornerRadius = UDim.new(0, 0),
	FontFace = Font.fromEnum(Enum.Font.Arcade),
	ShadowDepth = 0
}

local currentGlobalTheme = "Default"

function Themes.SetGlobalTheme(themeName)
	if Themes[themeName] then
		currentGlobalTheme = themeName
	end
end

function Themes.Apply(instance, themeName, overrideProps)
	local theme = Themes.Get(themeName)
	if not theme then return end
	
	-- Apply basic properties
	if instance:IsA("GuiObject") then
		if instance:IsA("TextLabel") or instance:IsA("TextButton") or instance:IsA("TextBox") then
			instance.TextColor3 = theme.TextColor
			instance.FontFace = theme.FontFace
		end
		
		if overrideProps and overrideProps.isBackground then
			instance.BackgroundColor3 = theme.BackgroundColor
		else
			instance.BackgroundColor3 = theme.PrimaryColor
		end
		
		local corner = instance:FindFirstChildOfClass("UICorner")
		if corner then
			corner.CornerRadius = theme.CornerRadius
		end
		
		local stroke = instance:FindFirstChildOfClass("UIStroke")
		if stroke then
			stroke.Color = theme.BorderColor
			stroke.Thickness = theme.BorderWidth
		end
	end
end

function Themes.Get(themeName)
	return Themes[themeName] or Themes[currentGlobalTheme] or Themes.Default
end

return Themes
