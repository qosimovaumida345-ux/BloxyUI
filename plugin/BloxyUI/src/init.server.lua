local Toolbar = plugin:CreateToolbar("BloxyUI")
local Button = Toolbar:CreateButton("OpenUI", "Open BloxyUI Library", "rbxassetid://1316045217")

local widgetInfo = DockWidgetPluginGuiInfo.new(
	Enum.InitialDockState.Float,
	false, -- Initially hidden
	false,
	800,
	600,
	400,
	300
)

local Widget = plugin:CreateDockWidgetPluginGui("BloxyUIWidget", widgetInfo)
Widget.Title = "BloxyUI - Professional UI Framework"

-- Bootstrapping the UI
local UIBuilder = require(script.UI)
UIBuilder.init(Widget, plugin)

Button.Click:Connect(function()
	Widget.Enabled = not Widget.Enabled
end)

Widget:GetPropertyChangedSignal("Enabled"):Connect(function()
	Button:SetActive(Widget.Enabled)
end)
