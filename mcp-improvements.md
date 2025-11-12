# MCP (Model Context Protocol) Improvements

This document outlines the improvements made to the MCP integration using the `use-mcp` package and our custom implementation.

## Issues Fixed

### 1. **Manual JSON-RPC Handling**
- **Before**: Manual construction of JSON-RPC requests with basic error handling
- **After**: Improved JSON-RPC implementation with proper headers and error handling

### 2. **Limited Authentication Support**
- **Before**: Only basic OAuth and token authentication
- **After**: Enhanced authentication with proper header formatting and MCP-specific headers

### 3. **No Session Management**
- **Before**: One-off requests without connection state
- **After**: Proper connection state management with the `useMCPClient` hook

### 4. **Missing Tool Calling**
- **Before**: Could discover tools but couldn't invoke them
- **After**: Full tool calling functionality with result handling

### 5. **Poor Error Handling**
- **Before**: Basic error messages
- **After**: Detailed error information with proper HTTP status handling

## New Features

### Enhanced Headers
The new implementation includes proper MCP headers:
```typescript
{
  "Content-Type": "application/json",
  "Accept": "application/json, text/event-stream",
  "User-Agent": "plai-ui/1.0.0 MCP-Client",
  "X-MCP-Version": "2024-11-05"
}
```

**Critical Fix**: The `Accept` header must include `text/event-stream` as MCP servers require support for both JSON and Server-Sent Events.

### Connection State Management
- `isConnected`: Boolean indicating connection status
- `isConnecting`: Boolean for connection in progress
- `error`: Current error state
- `tools`: Array of available tools

### Tool Calling Interface
```typescript
const result = await mcpClient.callTool(toolName, args)
```

## Components Added

### 1. `useMCPClient` Hook (`hooks/use-mcp-client.ts`)
A React hook that provides:
- Connection management
- Tool discovery
- Tool execution
- Error handling
- State management

### 2. `MCPToolCaller` Component (`components/mcp-tool-caller.tsx`)
A React component that provides:
- Visual connection status
- Tool selection interface
- Argument input (JSON format)
- Result display
- Error visualization

### 3. Enhanced MCP Tool Form
The MCP server tool form now includes:
- Tabs for Configuration and Tool Testing
- Real-time tool testing capabilities
- Better connection feedback

## Usage Example

```typescript
import { useMCPClient } from "@/hooks/use-mcp-client"

function MyComponent() {
  const mcpClient = useMCPClient()
  
  const config = {
    server_url: "https://your-mcp-server.com",
    auth_type: "oauth" as const,
    auth_config: {
      access_token: "your-token"
    }
  }
  
  // Connect to server
  await mcpClient.connectToServer(config)
  
  // Call a tool
  const result = await mcpClient.callTool("tool_name", { arg1: "value" })
  
  return (
    <div>
      <p>Connected: {mcpClient.isConnected ? "Yes" : "No"}</p>
      <p>Tools: {mcpClient.tools.length}</p>
    </div>
  )
}
```

## Troubleshooting

### 406 Not Acceptable Error - SOLVED ✅
This was the original issue you encountered. The key fixes include:
1. **Critical Accept headers**: Must include `text/event-stream` - MCP servers require clients to accept both `application/json` AND `text/event-stream`
2. **MCP version header**: Added `X-MCP-Version: 2024-11-05`
3. **User-Agent header**: Added proper user agent identification
4. **Content-Type validation**: Check server response content type
5. **Clean JSON payload**: Remove empty params object, use undefined instead

**Error message was**: `Not Acceptable: Client must accept both application/json and text/event-stream`
**Solution**: Change Accept header from `"application/json"` to `"application/json, text/event-stream"`

### 400 Bad Request - Server not initialized - SOLVED ✅
After fixing the 406 error, you may encounter this error. This is because MCP servers require proper initialization handshake:

**Error message**: `Bad Request: Server not initialized`
**Solution**: Follow the MCP initialization protocol with proper JSON-RPC message types:
1. Call `initialize` **request** (with ID) with protocol version and capabilities
2. Send `initialized` **notification** (without ID)
3. Then proceed with other method calls like `tools/list`

**Critical**: `initialized` must be sent as a notification, not a request!

```typescript
// Step 1: Initialize (REQUEST - has ID)
await makeJsonRpcRequest(config, "initialize", {
  protocolVersion: "2024-11-05",
  capabilities: { tools: { listChanged: true } },
  clientInfo: { name: "plai-ui", version: "1.0.0" }
})

// Step 2: Send initialized notification (NOTIFICATION - no ID)
await sendJsonRpcNotification(config, "initialized", {})

// Step 3: Now you can call tools/list (REQUEST - has ID)
const result = await makeJsonRpcRequest(config, "tools/list")
```

**JSON-RPC Message Types:**
- **Request**: Has `id` field, expects response
- **Notification**: No `id` field, no response expected

```typescript
// Request format
{ "jsonrpc": "2.0", "id": 123, "method": "initialize", "params": {...} }

// Notification format
{ "jsonrpc": "2.0", "method": "initialized", "params": {...} }
```

### Invalid content type: text/event-stream - SOLVED ✅
After fixing the initialization, some MCP servers respond with Server-Sent Events instead of plain JSON:

**Error message**: `Invalid content type: text/event-stream. Expected JSON response.`
**Solution**: Handle both JSON and Server-Sent Events response formats:

```typescript
const contentType = response.headers.get("content-type")
let jsonRpcResponse: any

if (contentType?.includes("text/event-stream")) {
  // Handle Server-Sent Events response
  const text = await response.text()
  // SSE format: data: {json}\n\n
  const lines = text.split('\n').filter(line => line.startsWith('data: '))
  if (lines.length > 0) {
    const dataLine = lines[0].replace('data: ', '')
    jsonRpcResponse = JSON.parse(dataLine)
  } else {
    // Fallback: try to parse the entire response as JSON
    jsonRpcResponse = JSON.parse(text)
  }
} else if (contentType?.includes("json")) {
  // Handle regular JSON response
  jsonRpcResponse = await response.json()
} else {
  // Try to parse as JSON regardless of content type
  try {
    jsonRpcResponse = await response.json()
  } catch (e) {
    const text = await response.text()
    throw new Error(`Invalid response format. Content-Type: ${contentType}. Response: ${text}`)
  }
}
```

### CORS Issues
If you encounter CORS issues, ensure your MCP server includes proper CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-MCP-Version, User-Agent
```

### Authentication Issues
1. Check token format and expiration
2. Verify header names match server expectations
3. Ensure proper token prefix (Bearer, etc.)

## Testing the Integration

1. **Navigate to Tools section** in your project dashboard
2. **Create a new MCP Server tool**
3. **Configure your server URL and authentication**
4. **Click "Test Connection"** to verify connectivity
5. **Switch to "Test Tools" tab** to interact with discovered tools
6. **Select a tool and provide JSON arguments**
7. **Click "Call Tool"** to execute and see results

## Migration from Old Implementation

The old server actions in `mcp-server-actions.ts` have been deprecated in favor of the client-side hook. Benefits include:

1. **Better UX**: Real-time connection status and error handling
2. **State Management**: Persistent connection state across components
3. **Type Safety**: Full TypeScript support with proper types
4. **Extensibility**: Easy to add new features and capabilities

The old API endpoints in `lib/api.ts` have also been updated with the same improvements for backward compatibility.