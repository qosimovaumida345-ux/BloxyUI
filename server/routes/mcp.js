const express = require('express');
const router = express.Router();
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { SSEServerTransport } = require("@modelcontextprotocol/sdk/server/sse.js");
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");
const { tools, handleToolCall } = require('../mcp/tools');

// Active SSE Transports map by session
const activeTransports = new Map();

function createMcpServer() {
  const server = new Server(
    {
      name: "bloxyui-remote-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    return handleToolCall(request.params.name, request.params.arguments);
  });

  return server;
}

// ---------------------------------------------------------------------------
// 1. Remote SSE MCP Protocol Endpoints (For Claude, Cursor, Antigravity)
// ---------------------------------------------------------------------------

// GET /sse or /api/mcp/sse
router.get(['/', '/sse'], async (req, res) => {
  try {
    const transport = new SSEServerTransport('/api/mcp/message', res);
    const server = createMcpServer();

    activeTransports.set(transport.sessionId, { transport, server });

    req.on('close', () => {
      activeTransports.delete(transport.sessionId);
    });

    await server.connect(transport);
  } catch (err) {
    console.error('SSE Connection Error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to establish SSE MCP connection' });
    }
  }
});

// POST /message or /api/mcp/message
router.post('/message', async (req, res) => {
  const sessionId = req.query.sessionId;
  const session = sessionId ? activeTransports.get(sessionId) : null;

  if (session && session.transport) {
    await session.transport.handlePostMessage(req, res);
  } else {
    // If sessionId not in query, try first active transport or handle error
    const firstSession = activeTransports.values().next().value;
    if (firstSession && firstSession.transport) {
      await firstSession.transport.handlePostMessage(req, res);
    } else {
      res.status(400).json({ error: 'No active SSE MCP session found' });
    }
  }
});

// ---------------------------------------------------------------------------
// 2. Direct HTTP REST API (For ChatGPT Actions, Curl, Python, Frontend)
// ---------------------------------------------------------------------------

// GET /api/mcp/tools -> List all tools
router.get('/tools', (req, res) => {
  res.json({
    success: true,
    count: tools.length,
    tools
  });
});

// POST /api/mcp/call or POST /api/mcp -> Direct tool execution
router.post(['/call', '/execute'], async (req, res) => {
  try {
    const toolName = req.body.tool || req.body.name || req.body.method;
    const args = req.body.arguments || req.body.params || req.body.args || {};

    if (!toolName) {
      return res.status(400).json({
        success: false,
        error: 'Missing tool name. Provide "tool" or "name" in request body.',
        availableTools: tools.map(t => t.name)
      });
    }

    const result = await handleToolCall(toolName, args);
    const luauCode = (result && result.content && result.content[0] && result.content[0].text) || '';

    res.json({
      success: true,
      tool: toolName,
      result,
      code: luauCode
    });
  } catch (error) {
    console.error('MCP Tool Call Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
