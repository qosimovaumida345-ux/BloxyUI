const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catalog = require('../server/data/catalog');

const icons = catalog.icons.map(icon => ({
  name: icon.name,
  slug: icon.slug,
  category: icon.category,
  tags: icon.tags,
  assetId: icon.assetId,
  svgPath: icon.svgPath,
  description: icon.description
}));

const effects = catalog.effects.map(effect => ({
  name: effect.name,
  slug: effect.slug,
  type: effect.type,
  category: effect.category,
  description: effect.description,
  luauCode: effect.luauCode,
  parameters: effect.parameters || {},
  previewData: effect.previewData || null
}));

const animations = catalog.animations.map(anim => ({
  name: anim.name,
  slug: anim.slug,
  type: anim.type,
  category: anim.category,
  description: anim.description,
  luauCode: anim.luauCode,
  parameters: anim.parameters || {},
  previewCss: anim.previewCss || null,
  duration: anim.duration || 0.3
}));

const components = [
  { name: 'Primary Button', slug: 'primary-button', type: 'button', category: 'actions', luauCode: 'local btn = Instance.new("TextButton")\nbtn.Size = UDim2.new(1, 0, 1, 0)\nbtn.BackgroundTransparency = 1\nbtn.Text = "Click Me"\nbtn.TextColor3 = Color3.fromRGB(255, 255, 255)\nbtn.Font = Enum.Font.GothamBold\nbtn.TextSize = 16\nbtn.Parent = container' },
  { name: 'Card', slug: 'card', type: 'card', category: 'layout', luauCode: 'container.Size = UDim2.new(0, 300, 0, 200)\ncontainer.Position = UDim2.new(0.5, -150, 0.5, -100)\nlocal title = Instance.new("TextLabel")\ntitle.Size = UDim2.new(1, -20, 0, 40)\ntitle.Position = UDim2.new(0, 10, 0, 10)\ntitle.BackgroundTransparency = 1\ntitle.Text = "Card Title"\ntitle.TextXAlignment = Enum.TextXAlignment.Left\ntitle.Font = Enum.Font.GothamBold\ntitle.TextSize = 20\ntitle.Parent = container' },
  { name: 'Modal', slug: 'modal', type: 'modal', category: 'overlay', luauCode: 'container.Size = UDim2.new(0, 400, 0, 300)\ncontainer.Position = UDim2.new(0.5, -200, 0.5, -150)\nlocal title = Instance.new("TextLabel")\ntitle.Size = UDim2.new(1, 0, 0, 50)\ntitle.BackgroundTransparency = 1\ntitle.Text = "Modal Title"\ntitle.Font = Enum.Font.GothamBold\ntitle.TextSize = 24\ntitle.Parent = container' },
  { name: 'Notification Toast', slug: 'notification', type: 'notification', category: 'feedback', luauCode: 'container.Size = UDim2.new(0, 250, 0, 60)\ncontainer.Position = UDim2.new(1, -270, 1, -80)\nlocal title = Instance.new("TextLabel")\ntitle.Size = UDim2.new(1, -50, 0, 30)\ntitle.Position = UDim2.new(0, 50, 0, 5)\ntitle.BackgroundTransparency = 1\ntitle.Text = "Notification"\ntitle.Font = Enum.Font.GothamBold\ntitle.TextSize = 16\ntitle.Parent = container' },
  { name: 'Progress Bar', slug: 'progress', type: 'progress', category: 'feedback', luauCode: 'local bg = Instance.new("Frame")\nbg.Size = UDim2.new(1, -20, 0, 10)\nbg.Position = UDim2.new(0, 10, 0.5, -5)\nbg.BackgroundColor3 = Color3.fromRGB(200, 200, 200)\nbg.Parent = container\nlocal fill = Instance.new("Frame")\nfill.Size = UDim2.new(0.7, 0, 1, 0)\nfill.BackgroundColor3 = Color3.fromRGB(52, 152, 219)\nfill.Parent = bg' },
  { name: 'Badge', slug: 'badge', type: 'badge', category: 'data', luauCode: 'container.Size = UDim2.new(0, 60, 0, 24)\nlocal txt = Instance.new("TextLabel")\ntxt.Size = UDim2.new(1, 0, 1, 0)\ntxt.BackgroundTransparency = 1\ntxt.Text = "New"\ntxt.TextColor3 = Color3.new(1,1,1)\ntxt.Font = Enum.Font.GothamBold\ntxt.TextSize = 12\ntxt.Parent = container' },
  { name: 'Avatar Frame', slug: 'avatar', type: 'avatar', category: 'data', luauCode: 'container.Size = UDim2.new(0, 50, 0, 50)\nlocal img = Instance.new("ImageLabel")\nimg.Size = UDim2.new(1, 0, 1, 0)\nimg.BackgroundTransparency = 1\nimg.Image = "rbxasset://textures/ui/GuiImagePlaceholder.png"\nimg.Parent = container' },
  { name: 'Input Field', slug: 'input', type: 'input', category: 'forms', luauCode: 'local box = Instance.new("TextBox")\nbox.Size = UDim2.new(1, -20, 1, -10)\nbox.Position = UDim2.new(0, 10, 0, 5)\nbox.BackgroundTransparency = 1\nbox.PlaceholderText = "Enter text..."\nbox.Parent = container' },
  { name: 'Toggle Switch', slug: 'toggle', type: 'toggle', category: 'forms', luauCode: 'container.Size = UDim2.new(0, 50, 0, 26)\nlocal knob = Instance.new("Frame")\nknob.Size = UDim2.new(0, 20, 0, 20)\nknob.Position = UDim2.new(0, 3, 0.5, -10)\nknob.Parent = container' },
  { name: 'Tooltip', slug: 'tooltip', type: 'tooltip', category: 'overlay', luauCode: 'container.Size = UDim2.new(0, 120, 0, 30)\nlocal txt = Instance.new("TextLabel")\ntxt.Size = UDim2.new(1, 0, 1, 0)\ntxt.BackgroundTransparency = 1\ntxt.Text = "Tooltip"\ntxt.Parent = container' },
  { name: 'Dropdown Select', slug: 'dropdown', type: 'dropdown', category: 'forms', luauCode: 'local btn = Instance.new("TextButton")\nbtn.Size = UDim2.new(1, 0, 1, 0)\nbtn.Text = "Select Option"\nbtn.Parent = container' },
  { name: 'Tabs Bar', slug: 'tabs', type: 'tabs', category: 'layout', luauCode: 'container.Size = UDim2.new(0, 300, 0, 40)\nlocal list = Instance.new("UIListLayout")\nlist.FillDirection = Enum.FillDirection.Horizontal\nlist.Parent = container' },
  { name: 'Topbar HUD', slug: 'topbar', type: 'topbar', category: 'layout', luauCode: 'container.Size = UDim2.new(1, 0, 0, 60)\nlocal title = Instance.new("TextLabel")\ntitle.Text = "Bloxy Game"\ntitle.Parent = container' }
];

const themes = [
  { name: 'Cartoony Juicy', slug: 'cartoony', colors: { primary: '#ff7675', secondary: '#d63031', accent: '#ffeaa7', background: '#2d3436', text: '#ffffff' }, style: { cornerRadius: 16, borderWidth: 4 } },
  { name: 'Cyber Neon', slug: 'neon', colors: { primary: '#6c5ce7', secondary: '#00cec9', accent: '#fd79a8', background: '#0a0a1a', text: '#ffffff' }, style: { cornerRadius: 8, borderWidth: 2 } },
  { name: 'Royal Gold', slug: 'royal-gold', colors: { primary: '#f1c40f', secondary: '#b7950b', accent: '#fff275', background: '#1e272e', text: '#ffffff' }, style: { cornerRadius: 12, borderWidth: 3 } },
  { name: 'Dark Void', slug: 'dark-void', colors: { primary: '#2d3436', secondary: '#1e272e', accent: '#636e72', background: '#000000', text: '#ffffff' }, style: { cornerRadius: 6, borderWidth: 1 } },
  { name: 'Emerald Nature', slug: 'emerald', colors: { primary: '#00b894', secondary: '#55efc4', accent: '#00cec9', background: '#0c241e', text: '#ffffff' }, style: { cornerRadius: 10, borderWidth: 2 } },
  { name: 'Bubblegum Pink', slug: 'bubblegum', colors: { primary: '#fd79a8', secondary: '#e84393', accent: '#ffeaa7', background: '#2c1b2d', text: '#ffffff' }, style: { cornerRadius: 20, borderWidth: 3 } },
  { name: 'Retro 8-Bit', slug: 'retro', colors: { primary: '#ff4757', secondary: '#2ed573', accent: '#ffa502', background: '#1e90ff', text: '#ffffff' }, style: { cornerRadius: 0, borderWidth: 4 } },
  { name: 'Minimal Arctic', slug: 'minimal', colors: { primary: '#dfe6e9', secondary: '#b2bec3', accent: '#0984e3', background: '#1e272e', text: '#ffffff' }, style: { cornerRadius: 4, borderWidth: 1 } }
];

async function main() {
  console.log(`Seeding database: ${icons.length} icons, ${effects.length} effects, ${animations.length} animations, ${components.length} components, ${themes.length} themes...`);
  await prisma.icon.createMany({ data: icons, skipDuplicates: true });
  await prisma.effect.createMany({ data: effects, skipDuplicates: true });
  await prisma.animation.createMany({ data: animations, skipDuplicates: true });
  await prisma.component.createMany({ data: components, skipDuplicates: true });
  await prisma.theme.createMany({ data: themes, skipDuplicates: true });
  console.log('Seed completed successfully with extensive catalog!');
}

main()
  .catch(e => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
