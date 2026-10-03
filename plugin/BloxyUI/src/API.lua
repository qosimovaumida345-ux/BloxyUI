local HttpService = game:GetService("HttpService")

local API = {}
local BASE_URL = "https://bloxyui.onrender.com/api" 

local function request(endpoint)
	-- Fallback for local testing if API isn't deployed
	-- Usually you'd wrap this in pcall
	local success, result = pcall(function()
		-- In a real plugin we would use HttpService:RequestAsync or HttpService:GetAsync
		-- return HttpService:JSONDecode(HttpService:GetAsync(BASE_URL .. endpoint))
		
		-- Mock data for now to ensure it works without a live backend
		return { success = true, data = {} }
	end)
	
	if success then return result else return nil end
end

function API.SearchIcons(query, category)
	-- Mock search
	return {
		{id = "icon1", name = "Home", image = "rbxassetid://3926305904", category = "solid"},
		{id = "icon2", name = "Settings", image = "rbxassetid://3926307971", category = "solid"},
		{id = "icon3", name = "User", image = "rbxassetid://3926305904", category = "outline"}
	}
end

function API.GetIcon(slug)
	return {id = slug, name = "Icon", image = "rbxassetid://3926305904"}
end

function API.SearchEffects(query, type)
	return {
		{id = "eff1", name = "Gradient", type = "UIGradient"},
		{id = "eff2", name = "Glow", type = "Image"}
	}
end

function API.GetEffect(slug)
	return nil
end

function API.SearchAnimations(query, type)
	return {
		{id = "anim1", name = "Bounce"},
		{id = "anim2", name = "FadeIn"}
	}
end

function API.GetAnimation(slug)
	return nil
end

function API.GetComponents(type)
	return {
		{id = "btn", name = "Button"},
		{id = "card", name = "Card"}
	}
end

function API.GetComponent(slug)
	return nil
end

function API.GetThemes()
	return {
		{name = "Default"}, {name = "Neon"}, {name = "Cartoony"}
	}
end

function API.GenerateCode(options)
	return "-- Generated code\nlocal component = BloxyUI.CreateComponent(...)"
end

return API
