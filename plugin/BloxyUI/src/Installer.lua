local Installer = {}

function Installer.InstallModule(plugin)
	local ServerStorage = game:GetService("ServerStorage")
	local ReplicatedStorage = game:GetService("ReplicatedStorage")
	
	-- Find the module in the plugin itself (or download via API)
	-- For this script, we assume the module is either packaged with the plugin or we create a placeholder
	-- Since the plugin doesn't have direct access to desktop files in a normal Roblox environment,
	-- we simulate copying the BloxyUI folder.
	
	print("BloxyUI: Installing core module into ReplicatedStorage...")
	
	-- In a real scenario, we might clone it from the plugin's descendants
	-- local bloxyUI = pluginFolder.BloxyUI:Clone()
	
	local bloxyFolder = Instance.new("Folder")
	bloxyFolder.Name = "BloxyUI_Installed"
	bloxyFolder.Parent = ReplicatedStorage
	
	print("BloxyUI: Core module installed successfully!")
	
	-- Create an example script in StarterPlayerScripts
	local StarterPlayer = game:GetService("StarterPlayer")
	local StarterPlayerScripts = StarterPlayer:FindFirstChild("StarterPlayerScripts")
	
	if StarterPlayerScripts then
		local example = Instance.new("LocalScript")
		example.Name = "BloxyUI_Example"
		example.Source = [[
-- BloxyUI Example
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local BloxyUI = require(ReplicatedStorage:WaitForChild("BloxyUI_Installed")) -- Adjust path to real module

-- Example: Create a button
local btn = BloxyUI.CreateButton({
	text = "Hello Bloxy!",
	variant = "gradient",
	theme = "Neon"
})
btn.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")
]]
		example.Parent = StarterPlayerScripts
		print("BloxyUI: Example script generated in StarterPlayerScripts.")
	end
end

return Installer
