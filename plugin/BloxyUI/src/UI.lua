local API = require(script.Parent.API)
local Preview = require(script.Parent.Preview)
local Installer = require(script.Parent.Installer)

local UIBuilder = {}

function UIBuilder.init(widget, plugin)
	local container = Instance.new("Frame")
	container.Name = "BloxyUI_Main"
	container.Size = UDim2.new(1, 0, 1, 0)
	container.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
	container.Parent = widget
	
	-- Header
	local header = Instance.new("Frame")
	header.Size = UDim2.new(1, 0, 0, 60)
	header.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
	header.Parent = container
	
	local title = Instance.new("TextLabel")
	title.Size = UDim2.new(1, -200, 1, 0)
	title.Position = UDim2.new(0, 20, 0, 0)
	title.BackgroundTransparency = 1
	title.Text = "BloxyUI Studio"
	title.TextColor3 = Color3.fromRGB(255, 255, 255)
	title.TextSize = 24
	title.Font = Enum.Font.GothamBold
	title.TextXAlignment = Enum.TextXAlignment.Left
	title.Parent = header
	
	local installBtn = Instance.new("TextButton")
	installBtn.Size = UDim2.new(0, 150, 0, 40)
	installBtn.Position = UDim2.new(1, -170, 0, 10)
	installBtn.BackgroundColor3 = Color3.fromRGB(0, 150, 255)
	installBtn.TextColor3 = Color3.new(1,1,1)
	installBtn.Text = "Install Module"
	installBtn.Font = Enum.Font.GothamMedium
	installBtn.TextSize = 14
	Instance.new("UICorner", installBtn).CornerRadius = UDim.new(0, 6)
	installBtn.Parent = header
	
	installBtn.Activated:Connect(function()
		Installer.InstallModule(plugin)
	end)
	
	-- Sidebar Navigation
	local sidebar = Instance.new("Frame")
	sidebar.Size = UDim2.new(0, 150, 1, -60)
	sidebar.Position = UDim2.new(0, 0, 0, 60)
	sidebar.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
	sidebar.Parent = container
	
	local tabLayout = Instance.new("UIListLayout")
	tabLayout.Padding = UDim.new(0, 5)
	tabLayout.Parent = sidebar
	
	-- Content Area
	local contentArea = Instance.new("Frame")
	contentArea.Size = UDim2.new(1, -150, 1, -60)
	contentArea.Position = UDim2.new(0, 150, 0, 60)
	contentArea.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
	contentArea.Parent = container
	
	local tabs = {"Icons", "Effects", "Animations", "Components", "Themes", "Builder"}
	local tabPages = {}
	
	for i, tabName in ipairs(tabs) do
		-- Nav Button
		local btn = Instance.new("TextButton")
		btn.Size = UDim2.new(1, 0, 0, 40)
		btn.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
		btn.TextColor3 = Color3.new(1,1,1)
		btn.Text = "  " .. tabName
		btn.Font = Enum.Font.Gotham
		btn.TextSize = 14
		btn.TextXAlignment = Enum.TextXAlignment.Left
		btn.BorderSizePixel = 0
		btn.Parent = sidebar
		
		-- Page
		local page = Instance.new("ScrollingFrame")
		page.Name = tabName .. "Page"
		page.Size = UDim2.new(1, 0, 1, 0)
		page.BackgroundTransparency = 1
		page.Visible = (i == 1)
		page.ScrollBarThickness = 6
		page.Parent = contentArea
		
		local pageLayout = Instance.new("UIGridLayout")
		pageLayout.CellSize = UDim2.new(0, 120, 0, 120)
		pageLayout.CellPadding = UDim2.new(0, 10, 0, 10)
		pageLayout.Parent = page
		
		local pagePadding = Instance.new("UIPadding")
		pagePadding.PaddingTop = UDim.new(0, 10)
		pagePadding.PaddingLeft = UDim.new(0, 10)
		pagePadding.Parent = page
		
		tabPages[tabName] = page
		
		btn.Activated:Connect(function()
			for name, p in pairs(tabPages) do
				p.Visible = (name == tabName)
			end
		end)
	end
	
	-- Populate Icons
	local icons = API.SearchIcons("", "")
	for _, icon in ipairs(icons) do
		local card = Instance.new("Frame")
		card.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
		Instance.new("UICorner", card).CornerRadius = UDim.new(0, 8)
		card.Parent = tabPages["Icons"]
		
		local img = Instance.new("ImageLabel")
		img.Size = UDim2.new(0, 60, 0, 60)
		img.Position = UDim2.new(0.5, -30, 0, 10)
		img.BackgroundTransparency = 1
		img.Image = icon.image
		img.Parent = card
		
		local lbl = Instance.new("TextLabel")
		lbl.Size = UDim2.new(1, 0, 0, 30)
		lbl.Position = UDim2.new(0, 0, 1, -30)
		lbl.BackgroundTransparency = 1
		lbl.Text = icon.name
		lbl.TextColor3 = Color3.new(1,1,1)
		lbl.Font = Enum.Font.Gotham
		lbl.Parent = card
	end
	
	-- Populate Themes (Different Layout)
	local themeLayout = tabPages["Themes"]:FindFirstChild("UIGridLayout")
	themeLayout.CellSize = UDim2.new(1, -20, 0, 80)
	
	local themes = API.GetThemes()
	for _, theme in ipairs(themes) do
		local card = Instance.new("Frame")
		card.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
		Instance.new("UICorner", card).CornerRadius = UDim.new(0, 8)
		card.Parent = tabPages["Themes"]
		
		local lbl = Instance.new("TextLabel")
		lbl.Size = UDim2.new(1, -100, 1, 0)
		lbl.Position = UDim2.new(0, 20, 0, 0)
		lbl.BackgroundTransparency = 1
		lbl.Text = theme.name
		lbl.TextColor3 = Color3.new(1,1,1)
		lbl.TextSize = 20
		lbl.Font = Enum.Font.GothamBold
		lbl.TextXAlignment = Enum.TextXAlignment.Left
		lbl.Parent = card
		
		local apply = Instance.new("TextButton")
		apply.Size = UDim2.new(0, 80, 0, 40)
		apply.Position = UDim2.new(1, -100, 0.5, -20)
		apply.BackgroundColor3 = Color3.fromRGB(0, 200, 100)
		apply.TextColor3 = Color3.new(1,1,1)
		apply.Text = "Apply"
		apply.Font = Enum.Font.Gotham
		Instance.new("UICorner", apply).CornerRadius = UDim.new(0, 4)
		apply.Parent = card
	end
	
	-- Preview Area for Builder
	local builderPage = tabPages["Builder"]
	builderPage:FindFirstChild("UIGridLayout"):Destroy() -- Custom layout
	
	local previewContainer = Instance.new("Frame")
	previewContainer.Size = UDim2.new(1, -40, 0, 300)
	previewContainer.Position = UDim2.new(0, 20, 0, 20)
	previewContainer.BackgroundColor3 = Color3.fromRGB(15, 15, 15)
	previewContainer.Parent = builderPage
	
	Preview.init(previewContainer)
	
	local insertBtn = Instance.new("TextButton")
	insertBtn.Size = UDim2.new(0, 200, 0, 50)
	insertBtn.Position = UDim2.new(0.5, -100, 0, 340)
	insertBtn.BackgroundColor3 = Color3.fromRGB(150, 50, 255)
	insertBtn.TextColor3 = Color3.new(1,1,1)
	insertBtn.Text = "Insert Component"
	insertBtn.Font = Enum.Font.GothamBold
	insertBtn.TextSize = 18
	Instance.new("UICorner", insertBtn).CornerRadius = UDim.new(0, 8)
	insertBtn.Parent = builderPage
	
	insertBtn.Activated:Connect(function()
		print("BloxyUI: Code generated for your component!")
		print(API.GenerateCode({}))
	end)
end

return UIBuilder
