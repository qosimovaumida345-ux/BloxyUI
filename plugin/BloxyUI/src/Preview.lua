local Preview = {}

-- Requires access to the Module in ReplicatedStorage for real previews, 
-- or uses the plugin's own copy.

function Preview.init(previewContainer)
	Preview.Container = previewContainer
	
	-- Setup viewport or frame for live preview
	Preview.DisplayArea = Instance.new("Frame")
	Preview.DisplayArea.Size = UDim2.new(1, -40, 1, -40)
	Preview.DisplayArea.Position = UDim2.new(0, 20, 0, 20)
	Preview.DisplayArea.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
	Preview.DisplayArea.Parent = Preview.Container
	
	local corner = Instance.new("UICorner")
	corner.CornerRadius = UDim.new(0, 10)
	corner.Parent = Preview.DisplayArea
	
	-- Grid background
	local grid = Instance.new("ImageLabel")
	grid.Size = UDim2.new(1, 0, 1, 0)
	grid.BackgroundTransparency = 1
	grid.Image = "rbxassetid://6031094670" -- placeholder for checkerboard
	grid.ImageTransparency = 0.9
	grid.ScaleType = Enum.ScaleType.Tile
	grid.TileSize = UDim2.new(0, 20, 0, 20)
	grid.Parent = Preview.DisplayArea
	
	Preview.CurrentComponent = nil
end

function Preview.RenderComponent(componentClass, options)
	if Preview.CurrentComponent then
		Preview.CurrentComponent:Destroy()
	end
	
	-- Safely attempt to construct component
	local success, obj = pcall(function()
		return componentClass.new(options)
	end)
	
	if success and obj then
		-- Some components return the instance directly, some return a wrapper
		local instance = obj.Instance or obj
		if typeof(instance) == "Instance" and instance:IsA("GuiObject") then
			instance.Position = UDim2.new(0.5, 0, 0.5, 0)
			instance.AnchorPoint = Vector2.new(0.5, 0.5)
			instance.Parent = Preview.DisplayArea
			Preview.CurrentComponent = instance
		end
	else
		warn("Failed to render preview: ", obj)
	end
end

function Preview.Clear()
	if Preview.CurrentComponent then
		Preview.CurrentComponent:Destroy()
		Preview.CurrentComponent = nil
	end
end

return Preview
