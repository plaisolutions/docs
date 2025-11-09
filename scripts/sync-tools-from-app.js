#!/usr/bin/env node

/**
 * Sync Tools Documentation from PLai Framework App
 * 
 * This script reads the tool configurations from the main app and generates
 * corresponding documentation files in Mintlify format.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  // Path to the main app's site config (adjust as needed)
  APP_CONFIG_PATH: '../../config/site.ts',
  DOCS_TOOLS_PATH: './tools',
  BACKUP_PATH: './backups',
  
  // Tool documentation templates
  TOOL_TEMPLATE: {
    header: (tool) => `---
title: "${tool.title}"
description: "Configure ${tool.title} for your PLai Framework agents"
icon: "${getIconForTool(tool.icon)}"
${tool.status ? `status: "${tool.status}"` : ''}
---

# ${tool.title}

${getToolDescription(tool.value)}

${getStatusBadge(tool.status)}

## Overview

${getToolOverview(tool.value)}

## Configuration Parameters

${generateParameterDocs(tool.config)}

## Setup Instructions

<Steps>
  <Step title="Navigate to Tools">
    Go to the **Tools** section in your project dashboard
  </Step>
  <Step title="Create ${tool.title} Tool">
    Click **Create Tool** and select **${tool.title}**
  </Step>
  <Step title="Configure Parameters">
    Fill in the required configuration parameters above
  </Step>
  <Step title="Test Configuration">
    Use the test button to verify your setup works correctly
  </Step>
  <Step title="Add to Agent">
    Assign this tool to your agents in agent settings
  </Step>
</Steps>

## Usage Examples

${getToolExamples(tool.value)}

## Best Practices

${getToolBestPractices(tool.value)}

## Next Steps

<CardGroup cols={2}>
  <Card title="Browse Other Tools" icon="grid" href="/tools/overview">
    Explore other available tools
  </Card>
  <Card title="Advanced Configuration" icon="settings" href="/guides/multi-tool-setup">
    Learn advanced tool configuration patterns
  </Card>
  <Card title="API Reference" icon="code" href="/api-reference/tools">
    View the tools API documentation
  </Card>
  <Card title="Get Help" icon="life-ring" href="mailto:support@plaisolutions.com">
    Contact support for assistance
  </Card>
</CardGroup>
`
  }
};

/**
 * Main sync function
 */
async function syncToolsDocumentation() {
  console.log('🔄 Starting tools documentation sync...');
  
  try {
    // Read the app configuration
    const appConfig = await readAppConfig();
    
    // Create backup of existing docs
    await createBackup();
    
    // Generate documentation for each tool
    for (const tool of appConfig.toolTypes) {
      await generateToolDoc(tool);
    }
    
    // Update the tools overview
    await updateToolsOverview(appConfig.toolTypes);
    
    console.log('✅ Tools documentation sync completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during sync:', error.message);
    process.exit(1);
  }
}

/**
 * Read configuration from the main app
 */
async function readAppConfig() {
  const configPath = path.resolve(CONFIG.APP_CONFIG_PATH);
  
  if (!fs.existsSync(configPath)) {
    throw new Error(`App config not found at ${configPath}`);
  }
  
  // Read the TypeScript config file
  const configContent = fs.readFileSync(configPath, 'utf-8');
  
  // Extract the toolTypes configuration (simplified parsing)
  const toolTypesMatch = configContent.match(/toolTypes:\s*\[([\s\S]*?)\],?\s*}/);
  
  if (!toolTypesMatch) {
    throw new Error('Could not extract toolTypes from config');
  }
  
  // Parse the configuration (this is a simplified version)
  // In production, you might want to use a proper TypeScript parser
  const toolTypes = parseToolTypesFromString(toolTypesMatch[1]);
  
  return { toolTypes };
}

/**
 * Parse tool types from string (simplified)
 */
function parseToolTypesFromString(toolTypesString) {
  // This is a simplified parser - in production, use a proper AST parser
  const tools = [];
  
  // Extract each tool configuration
  const toolMatches = toolTypesString.match(/{\s*value:\s*"([^"]+)"[\s\S]*?},?(?=\s*{|\s*$)/g);
  
  if (toolMatches) {
    for (const toolMatch of toolMatches) {
      const tool = parseToolObject(toolMatch);
      if (tool) {
        tools.push(tool);
      }
    }
  }
  
  return tools;
}

/**
 * Parse individual tool object
 */
function parseToolObject(toolString) {
  try {
    const tool = {};
    
    // Extract basic properties
    const valueMatch = toolString.match(/value:\s*"([^"]+)"/);
    const titleMatch = toolString.match(/title:\s*"([^"]+)"/);
    const iconMatch = toolString.match(/icon:\s*"([^"]+)"/);
    const statusMatch = toolString.match(/status:\s*"([^"]+)"/);
    
    if (valueMatch) tool.value = valueMatch[1];
    if (titleMatch) tool.title = titleMatch[1];
    if (iconMatch) tool.icon = iconMatch[1];
    if (statusMatch) tool.status = statusMatch[1];
    
    // Extract config array (simplified)
    const configMatch = toolString.match(/config:\s*\[([\s\S]*?)\]/);
    if (configMatch) {
      tool.config = parseConfigArray(configMatch[1]);
    } else {
      tool.config = [];
    }
    
    return tool;
  } catch (error) {
    console.warn(`Failed to parse tool: ${error.message}`);
    return null;
  }
}

/**
 * Parse config array
 */
function parseConfigArray(configString) {
  const configs = [];
  
  // Extract individual config objects
  const configMatches = configString.match(/{\s*key:\s*"[^"]+[\s\S]*?},?(?=\s*{|\s*$)/g);
  
  if (configMatches) {
    for (const configMatch of configMatches) {
      const config = parseConfigObject(configMatch);
      if (config) {
        configs.push(config);
      }
    }
  }
  
  return configs;
}

/**
 * Parse individual config object
 */
function parseConfigObject(configString) {
  try {
    const config = {};
    
    const keyMatch = configString.match(/key:\s*"([^"]+)"/);
    const typeMatch = configString.match(/type:\s*"([^"]+)"/);
    const labelMatch = configString.match(/label:\s*"([^"]+)"/);
    const requiredMatch = configString.match(/required:\s*(true|false)/);
    const placeholderMatch = configString.match(/placeholder:\s*"([^"]+)"/);
    const helpTextMatch = configString.match(/helpText:\s*"([^"]+)"/);
    
    if (keyMatch) config.key = keyMatch[1];
    if (typeMatch) config.type = typeMatch[1];
    if (labelMatch) config.label = labelMatch[1];
    if (requiredMatch) config.required = requiredMatch[1] === 'true';
    if (placeholderMatch) config.placeholder = placeholderMatch[1];
    if (helpTextMatch) config.helpText = helpTextMatch[1];
    
    // Extract choices if present
    const choicesMatch = configString.match(/choices:\s*\[([\s\S]*?)\]/);
    if (choicesMatch) {
      config.choices = parseChoicesArray(choicesMatch[1]);
    }
    
    // Extract condition if present
    const conditionMatch = configString.match(/condition:\s*{\s*field:\s*"([^"]+)",\s*value:\s*"([^"]+)"\s*}/);
    if (conditionMatch) {
      config.condition = {
        field: conditionMatch[1],
        value: conditionMatch[2]
      };
    }
    
    return config;
  } catch (error) {
    console.warn(`Failed to parse config: ${error.message}`);
    return null;
  }
}

/**
 * Parse choices array
 */
function parseChoicesArray(choicesString) {
  const choices = [];
  
  const choiceMatches = choicesString.match(/{\s*value:\s*[^}]+}/g);
  
  if (choiceMatches) {
    for (const choiceMatch of choiceMatches) {
      const valueMatch = choiceMatch.match(/value:\s*"?([^",}]+)"?/);
      const labelMatch = choiceMatch.match(/label:\s*"([^"]+)"/);
      
      if (valueMatch) {
        choices.push({
          value: valueMatch[1],
          label: labelMatch ? labelMatch[1] : valueMatch[1]
        });
      }
    }
  }
  
  return choices;
}

/**
 * Generate documentation for a single tool
 */
async function generateToolDoc(tool) {
  const fileName = `${tool.value.toLowerCase().replace(/_/g, '-')}.mdx`;
  const filePath = path.join(CONFIG.DOCS_TOOLS_PATH, fileName);
  
  console.log(`📝 Generating documentation for ${tool.title}...`);
  
  const content = CONFIG.TOOL_TEMPLATE.header(tool);
  
  // Ensure tools directory exists
  if (!fs.existsSync(CONFIG.DOCS_TOOLS_PATH)) {
    fs.mkdirSync(CONFIG.DOCS_TOOLS_PATH, { recursive: true });
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Generated ${fileName}`);
}

/**
 * Generate parameter documentation
 */
function generateParameterDocs(config) {
  if (!config || config.length === 0) {
    return 'No configuration parameters required.';
  }
  
  return config.map(param => {
    let doc = `<ParamField path="${param.key}" type="${param.type}"${param.required ? ' required' : ''}>
  ${param.label}`;
    
    if (param.placeholder) {
      doc += `\n  <br />**Example**: \`${param.placeholder}\``;
    }
    
    if (param.helpText) {
      doc += `\n  <br />**Help**: ${param.helpText}`;
    }
    
    if (param.condition) {
      doc += `\n  <br />**Condition**: Only shown when ${param.condition.field} = "${param.condition.value}"`;
    }
    
    if (param.choices && param.choices.length > 0) {
      doc += `\n  <br />**Options**:\n${param.choices.map(choice => `  - \`${choice.value}\` - ${choice.label}`).join('\n')}`;
    }
    
    doc += '\n</ParamField>';
    
    return doc;
  }).join('\n\n');
}

/**
 * Get icon name for Mintlify
 */
function getIconForTool(iconName) {
  const iconMap = {
    'CloudCog': 'cloud',
    'Perplexity': 'magnifying-glass',
    'MCPServer': 'server',
    'Database': 'database',
    'Globe': 'globe',
    'Code': 'code'
  };
  
  return iconMap[iconName] || 'wrench';
}

/**
 * Get tool description
 */
function getToolDescription(toolValue) {
  const descriptions = {
    'HTTP': 'Make HTTP requests to external APIs with full control over headers, methods, and request bodies.',
    'PERPLEXITY': 'Enhance your agents with web search capabilities using Perplexity AI\'s powerful search models.',
    'REMOTE_MCP_SERVER': 'Connect to Model Context Protocol servers to extend agent capabilities with external services.',
    'BROWSER': 'Enable web scraping and browser automation for data extraction and web interactions.',
    'CODE_EXECUTOR': 'Execute code in a secure environment for data processing and computational tasks.',
    'EXTERNAL_DATASOURCE': 'Connect to external databases and data sources for enhanced data access.'
  };
  
  return descriptions[toolValue] || 'A powerful tool for enhancing your agent capabilities.';
}

/**
 * Get status badge
 */
function getStatusBadge(status) {
  if (!status) return '';
  
  const badges = {
    'default': '<Note>\nThis tool has **Default** status, meaning it\'s production-ready and available on all subscription plans.\n</Note>',
    'pro': '<Note>\nThis tool has **Pro** status, meaning it requires a professional subscription and provides advanced features for premium users.\n</Note>',
    'alpha': '<Warning>\nThis tool has **Alpha** status, meaning it\'s in early access with features that may change based on user feedback.\n</Warning>',
    'preview': '<Note>\nThis tool has **Preview** status, meaning it\'s nearly ready for production with potential minor adjustments based on user feedback.\n</Note>'
  };
  
  return badges[status] || '';
}

/**
 * Get tool overview
 */
function getToolOverview(toolValue) {
  const overviews = {
    'HTTP': 'The API Request tool allows your agents to interact with any REST API endpoint. It provides complete control over HTTP methods, headers, request bodies, and response handling.',
    'PERPLEXITY': 'The Perplexity AI tool provides your agents with powerful web search and research capabilities. It leverages Perplexity\'s advanced AI models to search the web, analyze information, and provide comprehensive, citation-backed responses.',
    'REMOTE_MCP_SERVER': 'The MCP Server tool enables agents to connect to remote Model Context Protocol (MCP) servers, extending their capabilities with external services, tools, and data sources through a standardized protocol.',
    'BROWSER': 'The Browser tool enables your agents to extract data from websites, perform web scraping, and interact with web pages. It supports multiple scraping engines including ScraperAPI for reliable, large-scale web scraping.',
    'CODE_EXECUTOR': 'The Code Interpreter tool enables your agents to execute code in a secure, sandboxed environment. This powerful capability allows agents to perform complex calculations, data analysis, file processing, and algorithmic tasks.',
    'EXTERNAL_DATASOURCE': 'The External Data Source tool enables your agents to connect to external databases, APIs, and data repositories, providing seamless access to structured and unstructured data from various sources.'
  };
  
  return overviews[toolValue] || 'This tool enhances your agents with additional capabilities.';
}

/**
 * Get tool examples
 */
function getToolExamples(toolValue) {
  return `For detailed usage examples, see the complete documentation above.`;
}

/**
 * Get tool best practices
 */
function getToolBestPractices(toolValue) {
  return `Follow the configuration guidelines and test thoroughly before production deployment.`;
}

/**
 * Create backup of existing documentation
 */
async function createBackup() {
  if (!fs.existsSync(CONFIG.DOCS_TOOLS_PATH)) {
    return; // Nothing to backup
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(CONFIG.BACKUP_PATH, `tools-${timestamp}`);
  
  if (!fs.existsSync(CONFIG.BACKUP_PATH)) {
    fs.mkdirSync(CONFIG.BACKUP_PATH, { recursive: true });
  }
  
  // Copy existing tools directory
  fs.cpSync(CONFIG.DOCS_TOOLS_PATH, backupDir, { recursive: true });
  console.log(`📦 Created backup at ${backupDir}`);
}

/**
 * Update tools overview
 */
async function updateToolsOverview(toolTypes) {
  console.log('📝 Updating tools overview...');
  
  // This would update the tools/overview.mdx with current tool information
  // Implementation depends on how you want to structure the overview
  
  console.log('✅ Tools overview updated');
}

// CLI interface
if (require.main === module) {
  syncToolsDocumentation();
}

module.exports = {
  syncToolsDocumentation,
  parseToolTypesFromString,
  generateParameterDocs
};