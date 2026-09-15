# PLai Framework Documentation

This repository contains the complete documentation for PLai Framework - The low-code AI multi-agent framework. The documentation is built with [Mintlify](https://mintlify.com) and automatically syncs with the main application configuration.

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn
- Access to the main PLai Framework repository

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/plaisolutions/docs.git
   cd docs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000` to see the documentation.

## 📖 Documentation Structure

```
docs/
├── docs.json              # Mintlify configuration
├── package.json           # Node.js dependencies and scripts
├── README.md              # This file
├── index.mdx              # Homepage
├── quickstart.mdx         # Quick start guide
├── concepts.mdx           # Core concepts
├── authentication.mdx     # Authentication guide
├── agents/                # Agent documentation
│   ├── overview.mdx
│   ├── creating-agents.mdx
│   ├── analytics/         # Analytics sub-section
│   ├── filters/           # Filters sub-section
│   └── guardrails/        # Guardrails sub-section
├── tools/                 # Tools documentation (auto-generated)
│   ├── overview.mdx
│   ├── api-requests.mdx
│   ├── perplexity-ai.mdx
│   ├── mcp-servers.mdx
│   ├── browser-tools.mdx
│   ├── code-interpreter.mdx
│   └── external-datasource.mdx
├── guides/                # Step-by-step guides
│   ├── first-agent.mdx
│   ├── multi-tool-setup.mdx
│   └── best-practices.mdx
├── api-reference/         # API documentation
└── scripts/               # Automation scripts
    └── sync-tools-from-app.js
```

## 🔄 Synchronization with Main App

### Auto-Sync Tools Documentation

The tools documentation is automatically synchronized from the main PLai Framework application configuration. This ensures that the documentation always reflects the current tool configurations.

#### Run Sync Manually

```bash
npm run sync
```

This command:
1. Reads tool configurations from `../config/site.ts`
2. Creates backups of existing documentation
3. Generates new tool documentation files
4. Updates the tools overview page

#### Sync Configuration

The sync script is configured in `scripts/sync-tools-from-app.js`. Key settings:

```javascript
const CONFIG = {
  // Path to the main app's site config
  APP_CONFIG_PATH: '../../config/site.ts',
  DOCS_TOOLS_PATH: './tools',
  BACKUP_PATH: './backups'
};
```

Adjust the `APP_CONFIG_PATH` based on your local directory structure.

### Automated Sync (Recommended)

Set up automated synchronization using GitHub Actions or similar CI/CD tools:

```yaml
# .github/workflows/sync-docs.yml
name: Sync Documentation
on:
  push:
    branches: [main]
    paths: ['config/site.ts']
  
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run sync
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "Auto-sync tools documentation" || exit 0
          git push
```

## 📝 Writing Documentation

### Mintlify Components

This documentation uses Mintlify's enhanced Markdown (MDX) with special components:

#### Cards and Card Groups
```mdx
<CardGroup cols={2}>
  <Card title="Feature 1" icon="rocket">
    Description of feature 1
  </Card>
  <Card title="Feature 2" icon="star">
    Description of feature 2
  </Card>
</CardGroup>
```

#### Steps
```mdx
<Steps>
  <Step title="First Step">
    Do this first
  </Step>
  <Step title="Second Step">
    Then do this
  </Step>
</Steps>
```

#### Parameter Fields
```mdx
<ParamField path="parameter_name" type="string" required>
  Description of the parameter
  <br />**Example**: `example_value`
  <br />**Default**: `default_value`
</ParamField>
```

#### Tabs
```mdx
<Tabs>
  <Tab title="Option 1">
    Content for option 1
  </Tab>
  <Tab title="Option 2">
    Content for option 2
  </Tab>
</Tabs>
```

#### Accordions
```mdx
<AccordionGroup>
  <Accordion title="Question 1">
    Answer to question 1
  </Accordion>
  <Accordion title="Question 2">
    Answer to question 2
  </Accordion>
</AccordionGroup>
```

#### Callouts
```mdx
<Note>
Important information
</Note>

<Tip>
Helpful tip
</Tip>

<Warning>
Warning message
</Warning>
```

#### Code Groups
```mdx
<CodeGroup>
  ```javascript JavaScript
  console.log("Hello World");
  ```
  
  ```python Python
  print("Hello World")
  ```
</CodeGroup>
```

#### Frames (for images)
```mdx
<Frame>
  <img src="/images/screenshot.png" alt="Screenshot" />
</Frame>
```

### Writing Guidelines

1. **Use Clear Headings**: Structure content with proper H1, H2, H3 hierarchy
2. **Include Code Examples**: Always provide practical examples
3. **Add Visual Elements**: Use cards, tabs, and accordions to organize information
4. **Test Links**: Ensure all internal links work correctly
5. **Optimize Images**: Use `/images/` directory and optimize file sizes
6. **Mobile-Friendly**: Test on mobile devices

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production documentation
- `npm run sync` - Sync tools documentation from main app
- `npm run preview` - Preview built documentation
- `npm run deploy` - Deploy to production
- `npm run lint` - Check for broken links
- `npm run validate` - Validate Mintlify configuration

## 🚢 Deployment

### Mintlify Hosting (Recommended)

1. Connect this repository to your Mintlify dashboard
2. Configure custom domain (docs.plaisolutions.com)
3. Enable automatic deployments on push to main branch

### Manual Deployment

```bash
npm run build
npm run deploy
```

### Custom Hosting

The built documentation is static HTML/CSS/JS and can be hosted anywhere:

```bash
npm run build
# Upload the _site directory to your hosting provider
```

## 🔧 Configuration

### Mintlify Configuration

Main configuration is in `docs.json`:

```json
{
  "name": "PLai Framework Documentation",
  "colors": {
    "primary": "#0D9488",
    "light": "#13B5A3", 
    "dark": "#0F766E"
  },
  "navigation": {
    // Navigation structure
  }
}
```

### Adding New Sections

1. Create new directory and files
2. Update `docs.json` navigation
3. Add to table of contents
4. Test locally before deploying

## 🤝 Contributing

### Documentation Updates

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b docs/new-feature`
3. **Make your changes**
4. **Test locally**: `npm run dev`
5. **Submit a pull request**

### Tool Documentation

Tool documentation is auto-generated. To modify:

1. **Update tool configuration** in main app
2. **Run sync script**: `npm run sync`
3. **Review generated changes**
4. **Commit and push**

### Content Guidelines

- Write in clear, concise language
- Include practical examples
- Test all code snippets
- Optimize images and media
- Follow existing style and structure
- Ensure mobile compatibility

## 🐛 Troubleshooting

### Common Issues

#### Sync Script Fails
```bash
Error: App config not found at ../../config/site.ts
```
**Solution**: Adjust the `APP_CONFIG_PATH` in `scripts/sync-tools-from-app.js`

#### Development Server Won't Start
```bash
Error: Cannot find module '@mintlify/cli'
```
**Solution**: Run `npm install` to install dependencies

#### Broken Links
```bash
npm run lint
```
**Solution**: Fix any broken internal or external links

#### Build Fails
Check Mintlify validation:
```bash
npm run validate
```

### Getting Help

- **Documentation Issues**: Open an issue in this repository
- **PLai Framework Issues**: Use the main framework repository
- **Mintlify Issues**: Check [Mintlify documentation](https://mintlify.com/docs)
- **Support**: Email support@plaisolutions.com

## 📊 Analytics and Monitoring

### Mintlify Analytics

Track documentation usage through Mintlify's built-in analytics:
- Page views and popular content
- User engagement metrics
- Search queries and results
- Geographic usage data

### Custom Analytics

Add Google Analytics or other tracking:

```json
// In docs.json
{
  "analytics": {
    "ga4": "G-XXXXXXXXXX"
  }
}
```

## 🔒 Security

- **Sensitive Information**: Never commit API keys or credentials
- **Access Control**: Manage repository access carefully
- **Dependencies**: Keep dependencies updated
- **Content Review**: Review all content before publishing

## 📚 Resources

- [Mintlify Documentation](https://mintlify.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [PLai Framework Repository](https://github.com/plaisolutions/plai-framework)
- [PLai Solutions Website](https://plaisolutions.com)

## 📄 License

This documentation is licensed under the MIT License. See the main PLai Framework repository for complete license information.

---

For questions or support, contact the PLai Solutions team at support@plaisolutions.com.
