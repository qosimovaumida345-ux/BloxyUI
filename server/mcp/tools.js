const { PrismaClient } = require('@prisma/client');
const { generateLuauCode } = require('../utils/luau-generator');
const catalog = require('../data/catalog');
const prisma = new PrismaClient();

const tools = [
  {
    name: 'bloxyui_search_icons',
    description: 'Search for Roblox-ready icons across 230+ verified icons by keyword, category (general, commerce, gaming, combat, magic, navigation, media, social, tools, status) or tags',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term e.g. shop, coin, sword, potion, star' },
        category: { type: 'string', description: 'Category filter' },
        limit: { type: 'number', description: 'Max results to return (default 10)' }
      }
    }
  },
  {
    name: 'bloxyui_search_effects',
    description: 'Search for Roblox UI effects across 50+ presets (sunburst rays, cartoony bevels, neon glows, sparkles, particle bursts, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search keyword' },
        type: { type: 'string', description: 'Effect type: background, overlay, border, particle' }
      }
    }
  },
  {
    name: 'bloxyui_search_animations',
    description: 'Search for Roblox TweenService animations across 50+ presets (squish click, spring bounce, jelly wobble, pop-in, 3d coin flip, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Animation search term' },
        type: { type: 'string', description: 'Animation trigger type: click, hover, entrance, exit, loop, attention' }
      }
    }
  },
  {
    name: 'bloxyui_get_component',
    description: 'Get a UI component Luau template by slug (e.g. primary-button, card, modal, notification)',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Component slug' }
      },
      required: ['slug']
    }
  },
  {
    name: 'bloxyui_list_themes',
    description: 'List all available Roblox UI design themes (Cartoony, Cyber Neon, Royal Gold, Dark Void, Emerald, Bubblegum, Retro, Minimal)',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'bloxyui_build_ui',
    description: 'Generate complete, production-grade, juicy Roblox Luau code combining component + icon + effect + animation + theme',
    inputSchema: {
      type: 'object',
      properties: {
        componentSlug: { type: 'string', description: 'Component type slug: primary-button, card, modal, etc.' },
        iconSlug: { type: 'string', description: 'Icon slug from catalog' },
        effectSlug: { type: 'string', description: 'Effect slug from catalog' },
        animationSlug: { type: 'string', description: 'Animation slug from catalog' },
        themeSlug: { type: 'string', description: 'Theme slug: cartoony, neon, royal-gold, dark-void, etc.' },
        customText: { type: 'string', description: 'Custom text label for the component' }
      },
      required: ['componentSlug', 'themeSlug']
    }
  },
  {
    name: 'bloxyui_generate_screen',
    description: 'Generate an entire game screen (e.g. shop, inventory, settings, daily-rewards) with complete layout and juicy UI',
    inputSchema: {
      type: 'object',
      properties: {
        screenType: { type: 'string', description: 'Screen type: shop, inventory, settings, rewards' },
        themeSlug: { type: 'string', description: 'Theme to apply' }
      },
      required: ['screenType', 'themeSlug']
    }
  },
  {
    name: 'bloxyui_get_bloxfx_asset',
    description: 'Search or get any of the 200 standalone BloxFX effects (Buttons, Backgrounds, Badges, Cards, Loaders, Notifications, Panels, Progress bars, Toggles, Transitions) with complete, dependency-free Luau code',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Effect name or keyword (e.g. crimson sweep, star field, orbit spinner, flip)' },
        category: { type: 'string', description: 'Category: Buttons, Backgrounds, Badges, Cards, Loaders, Notifications, Panels, Progressbars, Toggles, Transitions' },
        assetId: { type: 'number', description: 'Asset ID (1 to 200)' }
      }
    }
  }
];

async function handleToolCall(name, args) {
  try {
    switch (name) {
      case 'bloxyui_search_icons': {
        const q = (args.query || '').toLowerCase();
        const cat = (args.category || '').toLowerCase();
        const limit = args.limit || 15;

        try {
          const where = {};
          if (args.query) where.name = { contains: args.query, mode: 'insensitive' };
          if (args.category) where.category = args.category;
          const results = await prisma.icon.findMany({ where, take: limit });
          if (results.length > 0) {
            return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
          }
        } catch (e) {}

        let matched = catalog.icons;
        if (q) matched = matched.filter(i => i.name.toLowerCase().includes(q) || i.tags.some(t => t.toLowerCase().includes(q)));
        if (cat) matched = matched.filter(i => i.category.toLowerCase() === cat);
        return { content: [{ type: 'text', text: JSON.stringify(matched.slice(0, limit), null, 2) }] };
      }

      case 'bloxyui_search_effects': {
        const q = (args.query || '').toLowerCase();
        const t = (args.type || '').toLowerCase();

        try {
          const where = {};
          if (args.query) where.name = { contains: args.query, mode: 'insensitive' };
          if (args.type) where.type = args.type;
          const results = await prisma.effect.findMany({ where, take: 10 });
          if (results.length > 0) {
            return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
          }
        } catch (e) {}

        let matched = catalog.effects;
        if (q) matched = matched.filter(e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
        if (t) matched = matched.filter(e => e.type.toLowerCase() === t);
        return { content: [{ type: 'text', text: JSON.stringify(matched.slice(0, 10), null, 2) }] };
      }

      case 'bloxyui_search_animations': {
        const q = (args.query || '').toLowerCase();
        const t = (args.type || '').toLowerCase();

        try {
          const where = {};
          if (args.query) where.name = { contains: args.query, mode: 'insensitive' };
          if (args.type) where.type = args.type;
          const results = await prisma.animation.findMany({ where, take: 10 });
          if (results.length > 0) {
            return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
          }
        } catch (e) {}

        let matched = catalog.animations;
        if (q) matched = matched.filter(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
        if (t) matched = matched.filter(a => a.type.toLowerCase() === t);
        return { content: [{ type: 'text', text: JSON.stringify(matched.slice(0, 10), null, 2) }] };
      }

      case 'bloxyui_get_component': {
        try {
          const result = await prisma.component.findUnique({ where: { slug: args.slug } });
          if (result) return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
        } catch (e) {}
        return { content: [{ type: 'text', text: JSON.stringify({ slug: args.slug, status: 'available in BloxyUI library' }, null, 2) }] };
      }

      case 'bloxyui_list_themes': {
        const themes = [
          { name: 'Cartoony Juicy', slug: 'cartoony', primary: '#ff7675', secondary: '#d63031', style: '3D thick bevels, bold white stroke' },
          { name: 'Cyber Neon', slug: 'neon', primary: '#6c5ce7', secondary: '#00cec9', style: 'Outer glows, cyber borders' },
          { name: 'Royal Gold', slug: 'royal-gold', primary: '#f1c40f', secondary: '#b7950b', style: 'Reflective gold, crown motifs' },
          { name: 'Dark Void', slug: 'dark-void', primary: '#2d3436', secondary: '#1e272e', style: 'Obsidian borders, minimal glows' },
          { name: 'Emerald Nature', slug: 'emerald', primary: '#00b894', secondary: '#55efc4', style: 'Crystal green, nature aura' },
          { name: 'Bubblegum Pink', slug: 'bubblegum', primary: '#fd79a8', secondary: '#e84393', style: 'Cute candy curves, high bounce' }
        ];
        return { content: [{ type: 'text', text: JSON.stringify(themes, null, 2) }] };
      }

      case 'bloxyui_build_ui': {
        const luauCode = generateLuauCode({
          componentType: args.componentSlug || 'button',
          text: args.customText || 'SHOP',
          theme: args.themeSlug || 'cartoony',
          icon: args.iconSlug || 'shop'
        });

        return { content: [{ type: 'text', text: luauCode }] };
      }

      case 'bloxyui_generate_screen': {
        const screenCode = `-- [BloxyUI] Generated ${args.screenType.toUpperCase()} Screen
-- Theme: ${args.themeSlug}
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local screenGui = Instance.new("ScreenGui")
screenGui.Name = "BloxyUI_${args.screenType}"
screenGui.ResetOnSpawn = false
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

local mainModal = Instance.new("Frame")
mainModal.Name = "MainModal"
mainModal.Size = UDim2.new(0, 520, 0, 380)
mainModal.Position = UDim2.new(0.5, 0, 0.5, 0)
mainModal.AnchorPoint = Vector2.new(0.5, 0.5)
mainModal.BackgroundColor3 = Color3.fromRGB(35, 35, 50)
mainModal.Parent = screenGui

local corner = Instance.new("UICorner", mainModal)
corner.CornerRadius = UDim.new(0, 16)

local stroke = Instance.new("UIStroke", mainModal)
stroke.Thickness = 4
stroke.Color = Color3.fromRGB(255, 255, 255)

local title = Instance.new("TextLabel", mainModal)
title.Size = UDim2.new(1, -60, 0, 50)
title.Position = UDim2.new(0, 20, 0, 10)
title.BackgroundTransparency = 1
title.Text = string.upper("${args.screenType}")
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.Font = Enum.Font.FredokaOne
title.TextSize = 28
title.TextXAlignment = Enum.TextXAlignment.Left

screenGui.Parent = playerGui
print("BloxyUI ${args.screenType} screen loaded successfully!")
`;
        return { content: [{ type: 'text', text: screenCode }] };
      }

      case 'bloxyui_get_bloxfx_asset': {
        const bloxfxCatalog = require('../data/bloxfxCatalog');
        if (args.assetId) {
          const found = bloxfxCatalog.find(a => a.id === args.assetId);
          if (found) {
            return { content: [{ type: 'text', text: JSON.stringify(found, null, 2) }] };
          }
        }
        let matched = bloxfxCatalog;
        if (args.category) {
          const cat = args.category.toLowerCase();
          matched = matched.filter(a => a.category.toLowerCase().includes(cat));
        }
        if (args.query) {
          const q = args.query.toLowerCase();
          matched = matched.filter(a => 
            a.name.toLowerCase().includes(q) || 
            a.description.toLowerCase().includes(q) || 
            a.slug.toLowerCase().includes(q)
          );
        }
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(matched.slice(0, 10).map(a => ({
              id: a.id,
              name: a.name,
              category: a.category,
              description: a.description,
              slug: a.slug,
              code: a.code
            })), null, 2)
          }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return { content: [{ type: 'text', text: `Error: ${error.message}` }], isError: true };
  }
}

module.exports = { tools, handleToolCall };
