local Components = {}

-- Registry of loaded components
local Registry = {}

-- Load all child modules lazily
for _, child in ipairs(script:GetChildren()) do
	if child:IsA("ModuleScript") then
		Registry[child.Name] = require(child)
	end
end

function Components.Create(componentName, options)
	local ComponentClass = Registry[componentName]
	if not ComponentClass then
		warn("BloxyUI: Component '" .. tostring(componentName) .. "' not found!")
		return nil
	end
	
	return ComponentClass.new(options)
end

return Components
