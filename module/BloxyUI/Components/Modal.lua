local TweenService = game:GetService("TweenService")
local BloxyUI = script.Parent.Parent
local Themes = require(BloxyUI.Themes)
local Animations = require(BloxyUI.Animations)

local Modal = {}
Modal.__index = Modal

function Modal.new(options)
	options = options or {}
	local self = setmetatable({}, Modal)
	
	self.Title = options.title or "Modal Title"
	self.Content = options.content or "This is the modal content."
	self.Theme = options.theme or "Default"
	self.OnConfirm = options.onConfirm
	self.OnCancel = options.onCancel
	
	self:_build()
	self:_applyTheme()
	
	return self
end

function Modal:_build()
	-- Overlay
	self.Overlay = Instance.new("Frame")
	self.Overlay.Name = "ModalOverlay"
	self.Overlay.Size = UDim2.new(1, 0, 1, 0)
	self.Overlay.BackgroundColor3 = Color3.new(0, 0, 0)
	self.Overlay.BackgroundTransparency = 1
	self.Overlay.Active = true
	
	-- Center Card
	self.Card = Instance.new("Frame")
	self.Card.Name = "ModalCard"
	self.Card.Size = UDim2.new(0, 400, 0, 250)
	self.Card.Position = UDim2.new(0.5, 0, 0.6, 0)
	self.Card.AnchorPoint = Vector2.new(0.5, 0.5)
	self.Card.BackgroundTransparency = 1
	self.Card.ClipsDescendants = true
	self.Card.Parent = self.Overlay
	
	self.CardCorner = Instance.new("UICorner")
	self.CardCorner.Parent = self.Card
	
	-- Title Bar
	self.TitleBar = Instance.new("Frame")
	self.TitleBar.Name = "TitleBar"
	self.TitleBar.Size = UDim2.new(1, 0, 0, 50)
	self.TitleBar.BackgroundTransparency = 1
	self.TitleBar.Parent = self.Card
	
	self.TitleLabel = Instance.new("TextLabel")
	self.TitleLabel.Name = "Title"
	self.TitleLabel.Size = UDim2.new(1, -60, 1, 0)
	self.TitleLabel.Position = UDim2.new(0, 20, 0, 0)
	self.TitleLabel.BackgroundTransparency = 1
	self.TitleLabel.Text = self.Title
	self.TitleLabel.TextSize = 20
	self.TitleLabel.TextXAlignment = Enum.TextXAlignment.Left
	self.TitleLabel.Parent = self.TitleBar
	
	self.CloseButton = Instance.new("TextButton")
	self.CloseButton.Name = "Close"
	self.CloseButton.Size = UDim2.new(0, 30, 0, 30)
	self.CloseButton.Position = UDim2.new(1, -40, 0.5, 0)
	self.CloseButton.AnchorPoint = Vector2.new(0, 0.5)
	self.CloseButton.BackgroundTransparency = 1
	self.CloseButton.Text = "X"
	self.CloseButton.TextSize = 18
	self.CloseButton.Parent = self.TitleBar
	
	-- Content Area
	self.ContentLabel = Instance.new("TextLabel")
	self.ContentLabel.Name = "Content"
	self.ContentLabel.Size = UDim2.new(1, -40, 1, -120)
	self.ContentLabel.Position = UDim2.new(0, 20, 0, 50)
	self.ContentLabel.BackgroundTransparency = 1
	self.ContentLabel.Text = self.Content
	self.ContentLabel.TextSize = 16
	self.ContentLabel.TextWrapped = true
	self.ContentLabel.TextXAlignment = Enum.TextXAlignment.Left
	self.ContentLabel.TextYAlignment = Enum.TextYAlignment.Top
	self.ContentLabel.Parent = self.Card
	
	-- Footer (Buttons)
	self.Footer = Instance.new("Frame")
	self.Footer.Name = "Footer"
	self.Footer.Size = UDim2.new(1, 0, 0, 70)
	self.Footer.Position = UDim2.new(0, 0, 1, -70)
	self.Footer.BackgroundTransparency = 1
	self.Footer.Parent = self.Card
	
	local layout = Instance.new("UIListLayout")
	layout.FillDirection = Enum.FillDirection.Horizontal
	layout.HorizontalAlignment = Enum.HorizontalAlignment.Right
	layout.VerticalAlignment = Enum.VerticalAlignment.Center
	layout.Padding = UDim.new(0, 15)
	layout.Parent = self.Footer
	
	local padding = Instance.new("UIPadding")
	padding.PaddingRight = UDim.new(0, 20)
	padding.Parent = self.Footer
	
	-- Buttons (Using native TextButtons for simplicity to avoid circular dep issues during instantiation, though ideally we use BloxyUI Button)
	self.CancelBtn = Instance.new("TextButton")
	self.CancelBtn.Name = "Cancel"
	self.CancelBtn.Size = UDim2.new(0, 100, 0, 40)
	self.CancelBtn.Text = "Cancel"
	self.CancelBtn.TextSize = 16
	self.CancelBtn.Parent = self.Footer
	Instance.new("UICorner").Parent = self.CancelBtn
	
	self.ConfirmBtn = Instance.new("TextButton")
	self.ConfirmBtn.Name = "Confirm"
	self.ConfirmBtn.Size = UDim2.new(0, 100, 0, 40)
	self.ConfirmBtn.Text = "Confirm"
	self.ConfirmBtn.TextSize = 16
	self.ConfirmBtn.Parent = self.Footer
	Instance.new("UICorner").Parent = self.ConfirmBtn
	
	-- Events
	self.CloseButton.Activated:Connect(function() self:Close() end)
	self.CancelBtn.Activated:Connect(function() 
		if self.OnCancel then self.OnCancel() end
		self:Close() 
	end)
	self.ConfirmBtn.Activated:Connect(function() 
		if self.OnConfirm then self.OnConfirm() end
		self:Close() 
	end)
end

function Modal:_applyTheme()
	local theme = Themes.Get(self.Theme)
	self.CardCorner.CornerRadius = theme.CornerRadius
	self.Card.BackgroundColor3 = theme.BackgroundColor
	self.TitleLabel.TextColor3 = theme.TextColor
	self.TitleLabel.FontFace = theme.FontFace
	self.CloseButton.TextColor3 = theme.SecondaryColor
	self.ContentLabel.TextColor3 = theme.SecondaryColor
	self.ContentLabel.FontFace = theme.FontFace
	
	self.CancelBtn.BackgroundColor3 = theme.SecondaryColor
	self.CancelBtn.TextColor3 = theme.BackgroundColor
	self.ConfirmBtn.BackgroundColor3 = theme.PrimaryColor
	self.ConfirmBtn.TextColor3 = theme.BackgroundColor
end

function Modal:Show(parent)
	self.Overlay.Parent = parent
	
	-- Animate In
	TweenService:Create(self.Overlay, TweenInfo.new(0.3), {BackgroundTransparency = 0.5}):Play()
	self.Card.BackgroundTransparency = 0
	
	local info = TweenInfo.new(0.5, Enum.EasingStyle.Back, Enum.EasingDirection.Out)
	TweenService:Create(self.Card, info, {Position = UDim2.new(0.5, 0, 0.5, 0)}):Play()
end

function Modal:Close()
	local info = TweenInfo.new(0.3, Enum.EasingStyle.Back, Enum.EasingDirection.In)
	TweenService:Create(self.Card, info, {Position = UDim2.new(0.5, 0, 0.6, 0)}):Play()
	local fade = TweenService:Create(self.Overlay, TweenInfo.new(0.3), {BackgroundTransparency = 1})
	fade:Play()
	
	fade.Completed:Connect(function()
		self.Overlay:Destroy()
	end)
end

return Modal
