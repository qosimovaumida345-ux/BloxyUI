import { icons, effects, animations } from '../data/catalog';

const API_BASE = '/api';

export async function fetchIcons(params = {}) {
  try {
    const url = new URL(API_BASE + '/icons', window.location.origin);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const res = await fetch(url);
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return {
      data: data.data || data.items || [],
      total: data.total || icons.length,
      page: data.page || 1,
      totalPages: data.totalPages || 1
    };
  } catch (error) {
    // Return full 235 icons from client catalog
    let list = icons;
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(i => i.name.toLowerCase().includes(q) || i.tags.some(t => t.toLowerCase().includes(q)));
    }
    if (params.category && params.category !== 'all') {
      list = list.filter(i => i.category.toLowerCase() === params.category.toLowerCase());
    }
    return {
      data: list,
      total: list.length,
      page: 1,
      totalPages: 1
    };
  }
}

export async function fetchEffects(params = {}) {
  try {
    const url = new URL(API_BASE + '/effects', window.location.origin);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const res = await fetch(url);
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return {
      data: data.data || data.items || [],
      total: data.total || effects.length
    };
  } catch (error) {
    let list = effects;
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
    }
    if (params.type && params.type !== 'all') {
      list = list.filter(e => e.type.toLowerCase() === params.type.toLowerCase());
    }
    return {
      data: list,
      total: list.length
    };
  }
}

export async function fetchAnimations(params = {}) {
  try {
    const url = new URL(API_BASE + '/animations', window.location.origin);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const res = await fetch(url);
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return {
      data: data.data || data.items || [],
      total: data.total || animations.length
    };
  } catch (error) {
    let list = animations;
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
    }
    if (params.type && params.type !== 'all') {
      list = list.filter(a => a.type.toLowerCase() === params.type.toLowerCase());
    }
    return {
      data: list,
      total: list.length
    };
  }
}

export async function fetchComponents(params = {}) {
  try {
    const url = new URL(API_BASE + '/components', window.location.origin);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const res = await fetch(url);
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (error) {
    return {
      data: [
        { id: 1, name: 'Juicy 3D Button', slug: 'button', type: 'button', category: 'actions', description: 'Cartoony bevel button with physics squish' },
        { id: 2, name: 'Modal Dialog Window', slug: 'modal', type: 'modal', category: 'overlay', description: 'Pop-in animated modal with header and actions' },
        { id: 3, name: 'Loot Card', slug: 'card', type: 'card', category: 'layout', description: 'Interactive item card with tilt effect' },
        { id: 4, name: 'Game HUD TopBar', slug: 'topbar', type: 'topbar', category: 'layout', description: 'Currency counters and player info bar' },
        { id: 5, name: 'Toast Notification', slug: 'notification', type: 'notification', category: 'feedback', description: 'Slide-in achievement & alert toast' }
      ]
    };
  }
}

export async function fetchThemes() {
  try {
    const res = await fetch(API_BASE + '/themes');
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (error) {
    return {
      data: [
        { id: 1, name: 'Cartoony Juicy', slug: 'cartoony', colors: { primary: '#ff7675', secondary: '#d63031', accent: '#ffeaa7' } },
        { id: 2, name: 'Cyber Neon', slug: 'neon', colors: { primary: '#6c5ce7', secondary: '#00cec9', accent: '#fd79a8' } },
        { id: 3, name: 'Royal Gold', slug: 'royal-gold', colors: { primary: '#f1c40f', secondary: '#b7950b', accent: '#fff275' } },
        { id: 4, name: 'Dark Void', slug: 'dark-void', colors: { primary: '#2d3436', secondary: '#1e272e', accent: '#636e72' } },
        { id: 5, name: 'Emerald Nature', slug: 'emerald', colors: { primary: '#00b894', secondary: '#55efc4', accent: '#00cec9' } },
        { id: 6, name: 'Bubblegum Pink', slug: 'bubblegum', colors: { primary: '#fd79a8', secondary: '#e84393', accent: '#ffeaa7' } }
      ]
    };
  }
}

export async function generateCode(options = {}) {
  try {
    const res = await fetch(API_BASE + '/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });
    if (!res.ok) throw new Error('API failed');
    const result = await res.json();
    return result;
  } catch (error) {
    const text = options.text || 'SHOP';
    const type = options.type || 'button';
    const effect = options.effect || 'none';
    const anim = options.animation || 'none';

    return {
      code: `-- [BloxyUI] Generated ${type.toUpperCase()} Component
-- Generated with BloxyUI Engine
local TweenService = game:GetService("TweenService")

local container = Instance.new("Frame")
container.Name = "${text}_Container"
container.Size = UDim2.new(0, 200, 0, 60)
container.Position = UDim2.new(0.5, 0, 0.5, 0)
container.AnchorPoint = Vector2.new(0.5, 0.5)
container.BackgroundColor3 = Color3.fromRGB(255, 118, 117)

local corner = Instance.new("UICorner", container)
corner.CornerRadius = UDim.new(0, 14)

local stroke = Instance.new("UIStroke", container)
stroke.Thickness = 4
stroke.Color = Color3.fromRGB(255, 255, 255)

local label = Instance.new("TextLabel", container)
label.Size = UDim2.new(1, 0, 1, 0)
label.BackgroundTransparency = 1
label.Text = "${text}"
label.TextColor3 = Color3.fromRGB(255, 255, 255)
label.Font = Enum.Font.FredokaOne
label.TextSize = 22

-- Effect: ${effect}
${effect !== 'none' ? '-- (Applied effect preset: ' + effect + ')\nlocal grad = Instance.new("UIGradient", container)\ngrad.Color = ColorSequence.new(Color3.fromRGB(255, 118, 117), Color3.fromRGB(214, 48, 49))\ngrad.Rotation = 90' : ''}

-- Animation: ${anim}
${anim !== 'none' ? '-- (Connected animation: ' + anim + ')\nlocal origSize = container.Size\ncontainer.InputBegan:Connect(function(input)\n    if input.UserInputType == Enum.UserInputType.MouseButton1 then\n        TweenService:Create(container, TweenInfo.new(0.08, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = origSize - UDim2.new(0, 10, 0, 6)}):Play()\n    end\nend)\ncontainer.InputEnded:Connect(function(input)\n    if input.UserInputType == Enum.UserInputType.MouseButton1 then\n        TweenService:Create(container, TweenInfo.new(0.18, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {Size = origSize}):Play()\n    end\nend)' : ''}

return container
`
    };
  }
}
