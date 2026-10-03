local BloxyUI = {}

BloxyUI.Components = require(script.Components)
BloxyUI.Animations = require(script.Animations)
BloxyUI.Effects = require(script.Effects)
BloxyUI.Themes = require(script.Themes)

-- Quick access functions
function BloxyUI.CreateButton(options) return BloxyUI.Components.Create("Button", options) end
function BloxyUI.CreateModal(options) return BloxyUI.Components.Create("Modal", options) end
function BloxyUI.CreateCard(options) return BloxyUI.Components.Create("Card", options) end
function BloxyUI.CreateTopBar(options) return BloxyUI.Components.Create("TopBar", options) end
function BloxyUI.CreateSideMenu(options) return BloxyUI.Components.Create("SideMenu", options) end
function BloxyUI.CreateNotification(options) return BloxyUI.Components.Create("Notification", options) end
function BloxyUI.CreateTooltip(options) return BloxyUI.Components.Create("Tooltip", options) end
function BloxyUI.CreateBadge(options) return BloxyUI.Components.Create("Badge", options) end
function BloxyUI.CreateProgressBar(options) return BloxyUI.Components.Create("ProgressBar", options) end
function BloxyUI.CreateInput(options) return BloxyUI.Components.Create("Input", options) end
function BloxyUI.CreateToggle(options) return BloxyUI.Components.Create("Toggle", options) end
function BloxyUI.CreateDropdown(options) return BloxyUI.Components.Create("Dropdown", options) end
function BloxyUI.CreateTabs(options) return BloxyUI.Components.Create("Tabs", options) end

-- Apply theme globally
function BloxyUI.SetTheme(themeName)
	BloxyUI.Themes.SetGlobalTheme(themeName)
end

return BloxyUI
