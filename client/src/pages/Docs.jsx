import { Book, Terminal, Code, Settings } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Docs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Documentation</h1>
      <p className="text-xl text-[var(--text-secondary)] mb-12">Learn how to integrate BloxyUI into your Roblox project.</p>

      <div className="space-y-12">
        
        {/* Section 1 */}
        <section className="glass p-8 rounded-2xl border border-[var(--border-color)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Terminal className="w-24 h-24" /></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-[var(--accent-primary)]" />
              1. Installation
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Get the BloxyUI library using wally, or directly grab the module from the Creator Marketplace.
            </p>
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#2d2d2d]">
              <div className="px-4 py-2 bg-[#252526] text-xs text-gray-400 border-b border-[#333]">wally.toml</div>
              <SyntaxHighlighter language="toml" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem' }}>
{`[dependencies]
BloxyUI = "username/bloxyui@1.0.0"`}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="glass p-8 rounded-2xl border border-[var(--border-color)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Settings className="w-24 h-24" /></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Settings className="w-6 h-6 text-[var(--accent-success)]" />
              2. Setting up MCP (AI Integration)
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Use BloxyUI with Claude or Cursor by configuring the Model Context Protocol (MCP) server.
            </p>
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#2d2d2d]">
              <div className="px-4 py-2 bg-[#252526] text-xs text-gray-400 border-b border-[#333]">claude_desktop_config.json</div>
              <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem' }}>
{`{
  "mcpServers": {
    "bloxyui": {
      "command": "node",
      "args": ["path/to/server/mcp/server.js"]
    }
  }
}`}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="glass p-8 rounded-2xl border border-[var(--border-color)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Code className="w-24 h-24" /></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-[var(--accent-warning)]" />
              3. Basic Usage
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Here is an example of creating an animated button with BloxyUI in Luau.
            </p>
            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#2d2d2d]">
              <div className="px-4 py-2 bg-[#252526] text-xs text-gray-400 border-b border-[#333]">LocalScript.luau</div>
              <SyntaxHighlighter language="lua" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem' }}>
{`local BloxyUI = require(ReplicatedStorage.BloxyUI)

local button = BloxyUI.Components.Button.new({
    Text = "Play Game",
    Effect = "Glow",
    Animation = "Bounce",
    Theme = "Dark"
})

button.Parent = playerGui.ScreenGui`}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Docs;
