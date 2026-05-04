# 📚 Prompt Library

A curated collection of AI prompts for productivity, creativity, and professional development. Accessible via Raycast, browser bookmarklet, and web interface.

## Quick Access

- **🌐 Web Interface**: [Browse prompts online](https://davidmooreuk.github.io/prompt-library/)
- **⚡ Raycast**: Install the extension from `clients/raycast/prompt-library/`
- **🔖 Bookmarklet**: Copy code from `clients/bookmarklet/prompt-picker.js` and save as bookmark

## Structure

```
prompt-library/
├── prompts.json          # Machine-readable prompt index
├── schema.json           # JSON schema for validation
├── prompts/              # Human-readable prompt documentation
├── tags/                 # Tag-based collections
├── clients/              # Access methods (Raycast, web, bookmarklet)
├── scripts/              # Validation and build tools
└── .github/workflows/    # Automated testing and deployment
```

## Usage

### Raw JSON Access

Fetch prompts directly from GitHub:
```
https://raw.githubusercontent.com/DavidMooreUK/prompt-library/main/prompts.json
```

### Adding New Prompts

1. Add your prompt to `prompts.json`
2. Create a markdown file in `prompts/` with detailed documentation
3. Update relevant tag collections in `tags/`
4. Run validation: `node scripts/validate.mjs`

### Prompt Format

```json
{
  "id": "unique-prompt-id",
  "title": "Human-readable title",
  "description": "Brief description of what this prompt does",
  "prompt": "The actual prompt with {variable} placeholders",
  "tags": ["tag1", "tag2"],
  "category": "category-name",
  "variables": ["variable"],
  "example_usage": "Example of how to use this prompt"
}
```

## Development

```bash
# Validate prompts
node scripts/validate.mjs

# Build and update stats
node scripts/build.mjs

# Setup and run Raycast extension
cd clients/raycast/prompt-library
npm install && npm run dev
```

## Installation Instructions

### Raycast Extension
1. In Raycast, type "Create Extension" and select it
2. Choose the directory: `clients/raycast/prompt-library/`
3. Open terminal in that directory and run:
   ```bash
   npm install && npm run dev
   ```
4. The extension will appear in Raycast as "Search Prompts"

### Browser Bookmarklet
1. Copy the JavaScript code from `clients/bookmarklet/prompt-picker.js`
2. Create a new bookmark in your browser
3. Paste the code as the bookmark URL
4. Name it "Prompt Library"
5. Click the bookmark on any webpage to open the prompt picker

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your prompts following the established format
4. Ensure validation passes
5. Submit a pull request

## License

All rights reserved - see [LICENSE](LICENSE) for details.