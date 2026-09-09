# AGENTS.md - Documentation Guidelines

This document provides guidance for agents (and humans) creating and maintaining PLai Framework documentation.

---

## 📁 Directory Structure

```
docs/
├── index.mdx                    # Homepage - DO NOT MODIFY
├── getting-started/             # Login, setup, initial concepts
├── concepts/                    # Core PLai concepts (organizations, projects, roles)
├── agents/                      # Agent feature documentation
├── tools/                       # Tool integrations and configuration
├── datasources/                 # Datasource management
├── workflows/                   # Workflow documentation
├── jobs/                        # Job documentation (IN PROGRESS)
├── triggers/                    # Trigger documentation (IN PROGRESS)
├── monitor/                     # Monitoring and analytics (IN PROGRESS)
├── api/                         # API reference (IN PROGRESS)
├── guides/                      # Step-by-step tutorials
├── _internal/                   # Infrastructure, non-user docs
├── docs.json                    # Navigation configuration (UPDATE AFTER ADDING FILES)
├── images/                      # Assets (PNG, SVG, GIF)
└── logo/                        # Branding assets
```

---

## 📝 Frontmatter Template

Every `.mdx` file must start with this frontmatter:

```mdx
---
title: "Page Title"
description: "Brief one-line description for SEO and navigation"
icon: "icon-name"
---
```

### Common Icons
- `robot` - Agents
- `wrench` - Tools
- `database` - Datasources
- `flow` - Workflows
- `list-check` - Jobs
- `zap` - Triggers
- `chart-line` - Monitor
- `play` - Getting started
- `book-open` - Guides

---

## 📋 File Naming Conventions

### General Rules
- **Use kebab-case**: `my-file-name.mdx` ✅ (NOT `myFileName.mdx`)
- **Be descriptive**: `agent-configuration.mdx` ✅ (NOT `config.mdx`)
- **Start with action/object**: `create-datasource.mdx`, `understanding-tools.mdx`

### Section-Specific Patterns

| Section | Pattern | Example |
|---------|---------|---------|
| **Getting Started** | `{topic}.mdx` | `login-registro.mdx` |
| **Concepts** | `{concept}.mdx` | `concepts.mdx`, `organizations.mdx` |
| **Agents** | `{feature}.mdx` | `que-es-un-agent.mdx`, `configuracion.mdx` |
| **Tools** | `{tool-name}.mdx` | `api-requests.mdx`, `mcp-servers.mdx` |
| **Guides** | `{use-case}.mdx` | `first-agent.mdx`, `setup-api-tool.mdx` |

---

## 🎨 Content Standards

### Tone & Style
- **Clear and concise** - Explain concepts simply
- **User-focused** - Write for end-users, not developers
- **Action-oriented** - Use imperative: "Create an agent", not "You can create an agent"
- **Avoid jargon** - Explain technical terms on first use
- **Use examples** - Every feature should have a practical example

### Structure Guidelines

#### For "What is..." pages
```mdx
---
title: "What is an Agent?"
description: "Learn the basics of AI agents in PLai"
icon: "robot"
---

# What is an Agent?

[1-2 sentence explanation]

## Key Concepts
- **Concept 1**: Definition and why it matters
- **Concept 2**: Definition and why it matters

## Common Use Cases
- Use case 1
- Use case 2
- Use case 3

## How Agents Work
[Simple explanation with diagram or visual]

<Tip>
Agents are most powerful when combined with tools.
</Tip>
```

#### For "How to configure..." pages
```mdx
---
title: "Configure Your Agent"
description: "Set up agent properties and behavior"
icon: "settings"
---

# Configure Your Agent

## Basic Settings

<Steps>
  <Step title="Access Agent Settings">
    1. Go to your project
    2. Select the agent
    3. Click Settings
  </Step>
  <Step title="Update Properties">
    Fill in the required fields...
  </Step>
</Steps>

## Advanced Configuration

### System Instructions
[Detailed explanation]

```

### MDX Components Available

Use these Mintlify components for rich documentation:

```mdx
<!-- Card Groups -->
<CardGroup cols={2}>
  <Card title="Feature A" icon="star">
    Description of feature A
  </Card>
  <Card title="Feature B" icon="fire">
    Description of feature B
  </Card>
</CardGroup>

<!-- Steps (for tutorials) -->
<Steps>
  <Step title="Step 1">
    Instructions for step 1
  </Step>
  <Step title="Step 2">
    Instructions for step 2
  </Step>
</Steps>

<!-- Tabs (for multiple options) -->
<Tabs>
  <Tab title="Option A">
    Content for option A
  </Tab>
  <Tab title="Option B">
    Content for option B
  </Tab>
</Tabs>

<!-- Callouts -->
<Note>
Important information that should be highlighted
</Note>

<Tip>
Helpful tip or best practice
</Tip>

<Warning>
Potential issue or gotcha to be aware of
</Warning>

<!-- Code Blocks -->
```javascript
// Code example with syntax highlighting
const example = "code";
```

<!-- Frames for images -->
<Frame>
  <img src="/images/screenshot.png" alt="Description" />
</Frame>

<!-- Accordions for Q&A -->
<AccordionGroup>
  <Accordion title="Question 1">
    Answer to question 1
  </Accordion>
  <Accordion title="Question 2">
    Answer to question 2
  </Accordion>
</AccordionGroup>

<!-- Parameter Fields (for API docs) -->
<ParamField path="parameter_name" type="string" required>
  Description of parameter
  <br />**Example**: `value`
  <br />**Default**: `default_value`
</ParamField>
```

---

## 📄 Do's and Don'ts

### ✅ DO

- Write for the end-user (not internal developers)
- Include practical examples and screenshots
- Explain the "why" before the "how"
- Use headers to organize content hierarchically (H2 for main sections, H3 for subsections)
- Link to related documentation using markdown: `[Link text](./related-page.mdx)`
- Keep sentences short and clear
- Use bullet points for lists
- Test links before committing

### ❌ DON'T

- Use overly technical language without explanation
- Mix Spanish and English (choose one language per file)
- Create orphaned pages (not linked from docs.json or other pages)
- Use H1 headers (# is reserved for page title)
- Add comments or meta-documentation to user-facing docs
- Include screenshots of UI that changes frequently (use diagrams instead)
- Write stories or narratives longer than 2-3 sentences
- Use "we", "our", "you" inconsistently - pick a tone and stick with it

---

## 🔍 Code Validation

Before publishing documentation, verify that what you document actually exists in the codebase. This ensures accuracy and prevents outdated documentation.

### Repositories to Check

| Section | Repository | Key Directories |
|---------|------------|-----------------|
| **UI Features** | `plai-ui` | `src/app`, `src/components`, `src/lib`, `src/config` |
| **API Reference** | `plai-api` | `src/controllers`, `src/models`, `src/schemas`, `src/routes` |
| **Tools Config** | `plai-ui` | `src/config/site.ts` (toolTypes definitions) |
| **Datasources** | `plai-api` | `src/models/datasource.ts`, `src/services` |

### What to Validate

#### For Tools Documentation
```bash
# Check if a tool type exists in site config
grep -r "toolName" ../plai-ui/src/config/site.ts

# Look for MetadataField definitions
grep -r "MetadataField" ../plai-ui/src/config/site.ts
```

**Example**: If documenting "API Requests" tool, verify:
- ✅ Tool type defined in `plai-ui/src/config/site.ts` (look for `ApiRequest` or similar)
- ✅ MetadataFields match documented configuration options
- ✅ Authentication types match backend support

#### For Agent Features
```bash
# Check agent configuration schema
grep -r "agent" ../plai-api/src/models/agent.ts
grep -r "Agent" ../plai-api/src/schemas/
```

**Verify**:
- ✅ Fields like "system_instructions", "model_id", etc. exist
- ✅ Model types are current (check LLM enum values)
- ✅ Supported capabilities match code

#### For API Endpoints
```bash
# Find endpoints in routes
grep -r "router.get\|router.post" ../plai-api/src/routes/

# Check parameter validation
grep -r "validate\|schema" ../plai-api/src/controllers/
```

**Verify**:
- ✅ Endpoints exist with correct HTTP methods
- ✅ Required parameters match schema definitions
- ✅ Response format examples are accurate

#### For Datasources/Resources
```bash
# Check supported resource types
grep -r "RESOURCE_TYPE\|ResourceType" ../plai-api/src/

# Look for supported formats
grep -r "FILE_TYPES\|MIME_TYPES" ../plai-api/src/
```

**Verify**:
- ✅ Resource types (Files, URLs, Content) are implemented
- ✅ Supported file formats match backend
- ✅ Size limits or restrictions exist

### Validation Checklist

Before considering documentation complete:

- [ ] All feature names match code exactly (case-sensitive)
- [ ] Configuration options documented are real fields in code
- [ ] Example values are valid according to schema/validation
- [ ] API endpoints exist and use correct HTTP methods
- [ ] Required vs optional parameters match code definitions
- [ ] Authentication methods are supported by backend
- [ ] Error messages/codes mentioned in docs are actually returned by API
- [ ] Tool types, resource types, and enums match code values
- [ ] Field types (string, integer, boolean, etc.) are accurate
- [ ] No deprecated features are documented as current

### Tools for Validation

#### Using grep
```bash
# Find exact field definitions
grep -r "fieldName" ../plai-api/src/

# Search for enum values
grep -r "enum\|ENUM" ../plai-api/src/schemas/

# Find route definitions
grep -r "\/api\/agents\|router\." ../plai-api/src/routes/

# Check configuration constants
grep -r "const.*=" ../plai-ui/src/config/
```

#### Using find + grep
```bash
# Find all TypeScript files with specific pattern
find ../plai-ui/src -name "*.ts" -o -name "*.tsx" | xargs grep "toolTypes"

# Find recent changes to a file
find ../plai-api/src/models -name "agent.ts" -exec cat {} \;
```

#### IDE Tools (Recommended)
- Use your IDE's "Go to Definition" on field/type names
- Search across repo for exact matches
- Check git history for recent changes
- Use TypeScript intellisense to verify types

### Common Validation Scenarios

**Scenario 1: Documenting a Tool Type**
```
1. Open: plai-ui/src/config/site.ts
2. Find: toolTypes array
3. Locate: Your tool definition (e.g., APIRequest)
4. Verify: All MetadataFields you document exist
5. Example value: Copy from actual field definition
```

**Scenario 2: Documenting an API Endpoint**
```
1. Open: plai-api/src/routes/
2. Find: Route file for resource (e.g., agents.ts)
3. Check: HTTP method (GET, POST, etc.)
4. Verify: Parameter names in src/schemas/
5. Test: Make actual API request to verify response
```

**Scenario 3: Documenting a Datasource Type**
```
1. Open: plai-api/src/models/datasource.ts
2. Find: Type definitions (enum or interface)
3. Check: Supported resource types in src/services/
4. Verify: Field limitations (max file size, formats, etc.)
5. Example: Create test datasource to show UI flow
```

### If Documentation Conflicts with Code

⚠️ **STOP** - Document discrepancies should be resolved:

1. **Check code is current** - Verify the code was recently changed
2. **Check docs are outdated** - Was this feature recently modified?
3. **File an issue** - If code has breaking changes, update docs immediately
4. **Ask for clarification** - Ping the team if behavior is unclear

**NEVER** document features that don't exist or work differently than code shows.

---

## 🔄 Updating docs.json Navigation

When adding new documentation, update `docs.json` to make it discoverable.

### Adding a Single Page
```json
{
  "group": "Getting Started",
  "pages": ["index", "getting-started/login-registro", "concepts/concepts"]
}
```

### Adding a New Section
```json
{
  "group": "📋 New Section",
  "pages": [
    "new-section/overview",
    "new-section/feature-1",
    "new-section/feature-2"
  ]
}
```

### Adding Nested Groups
```json
{
  "group": "🤖 Agents",
  "pages": [
    "agents/overview",
    {
      "group": "Advanced Features",
      "pages": ["agents/advanced/structured-output", "agents/advanced/versioning"]
    }
  ]
}
```

**⚠️ IMPORTANT**: After updating docs.json, verify:
1. File paths are correct (no `.mdx` extension)
2. Files exist at those paths
3. All files have frontmatter with `title` and `description`
4. Local preview works: `npm run dev`

---

## 📚 Current Documentation Map

### ✅ COMPLETE (Ready to reference)
- `index.mdx` - Homepage
- `getting-started/login-registro.mdx`
- `concepts/concepts.mdx`
- `agents/que-es-un-agent.mdx`
- `agents/configuracion.mdx`
- `tools/que-es-una-tool.mdx`
- `tools/api-requests.mdx`
- `tools/mcp-servers.mdx`
- `tools/browser-tool.mdx`
- `tools/external-datasource.mdx`
- `tools/perplexity-ai.mdx`
- `tools/agents.mdx`
- `guides/first-agent.mdx`

### ⏳ IN PROGRESS (Needs content)
- `datasources/` - Start with overview, types, metadata
- `workflows/` - Overview, execution model, nodes, variables
- `jobs/` - Overview, configuration, monitoring
- `triggers/` - Overview, types, setup
- `monitor/` - Overview, metrics, analytics
- `api/` - Authentication, endpoints reference

---

## 🚀 Creating New Documentation

### Step 1: Create the File
```bash
touch docs/section-name/new-page.mdx
```

### Step 2: Add Frontmatter
```mdx
---
title: "Your Page Title"
description: "One sentence description"
icon: "appropriate-icon"
---
```

### Step 3: Write Content
- Start with one clear H2 heading
- Use the templates above for common patterns
- Include examples and screenshots
- Link to related pages

### Step 4: Update docs.json
1. Open `docs/docs.json`
2. Find the appropriate group
3. Add your page filename (without `.mdx`) to the `pages` array
4. Save and test: `npm run dev`

### Step 5: Verify
- Run `npm run dev` and test the link
- Check for broken image links
- Verify all code examples work
- Proofread for typos and clarity

---

## 📍 Internal Documentation (_internal/)

Files in `_internal/` are NOT user-facing. Use this folder for:

- **Infrastructure docs**: How to run Mintlify locally, deployment notes
- **Developer guides**: Technical implementation details, architecture
- **Archived content**: Old documentation kept for reference
- **Auto-generated content**: API references that may be generated automatically
- **Meta-documentation**: Docs about the docs (like this file, if it were there)

**DO NOT** include `_internal/` files in docs.json navigation.

---

## 🔍 Quality Checklist

Before considering documentation complete:

- [ ] Frontmatter complete (title, description, icon)
- [ ] File follows naming conventions
- [ ] Content is clear and concise (no jargon without explanation)
- [ ] Includes at least one example or screenshot
- [ ] All links work (test locally with `npm run dev`)
- [ ] No orphaned pages (linked from docs.json or other pages)
- [ ] Consistent with other documentation in same section
- [ ] No typos or grammar errors
- [ ] Images are optimized and in `/images/` folder
- [ ] Follows Do's and Don'ts guidelines

---

## 💡 Examples to Reference

Good documentation examples in this repo:

- **Overview style**: `agents/que-es-un-agent.mdx` - Clear introduction with use cases
- **Configuration guide**: `agents/configuracion.mdx` - Step-by-step setup
- **Feature reference**: `tools/api-requests.mdx` - Configuration options with examples
- **Tutorial**: `guides/first-agent.mdx` - Complete walkthrough with steps

When creating new docs, study these files for structure and tone.

---

## ❓ Common Questions

**Q: Should I use H1 or H2 for the main heading?**
A: Always use H2 (`##`). H1 is reserved for the page title in frontmatter.

**Q: How do I link to other documentation pages?**
A: Use relative paths: `[Link text](../agents/configuracion.mdx)` or `[Link text](./related-page.mdx)`

**Q: Can I add HTML to .mdx files?**
A: Yes, but avoid it. Use Mintlify components instead - they're more maintainable.

**Q: How do I add images?**
A: Place in `/images/` folder, then use: `<Frame><img src="/images/filename.png" alt="Description" /></Frame>`

**Q: Do I need to update docs.json for every file I create?**
A: Yes. Without updating docs.json, the page won't appear in navigation and is "orphaned".

**Q: What's the difference between docs/ and _internal/?**
A: `docs/` = user-facing documentation. `_internal/` = infrastructure, developer guides, archived content.

---

## 📞 Support

For questions about:
- **Structure or organization**: See STRUCTURE_STATUS.md in `_internal/`
- **Mintlify components**: Check Mintlify docs at https://mintlify.com/docs
- **Content guidelines**: See "Content Standards" section above
- **Examples**: Reference existing docs in same section

**Last updated**: September 7, 2026
**Version**: 1.0
