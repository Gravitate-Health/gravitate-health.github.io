# Lens Tool Bundler Tutorial

This tutorial guides you through the complete workflow of using the Lens Tool Bundler to manage your FHIR Lenses - from creation to deployment.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- A lens JavaScript file (or create one following the lens development guide)

## Installation

Install the Lens Tool Bundler globally:

```bash
npm install -g @gravitate-health/lens-tool-bundler
```

Verify the installation:

```bash
lens-tool-bundler --version
```

:::tip
You can also use `npx` to run commands without global installation:
```bash
npx @gravitate-health/lens-tool-bundler COMMAND
```
:::

## Workflow Overview

The typical workflow for managing a lens with this tool:

1. **Create** - Initialize lens files
2. **Bundle** - Convert JavaScript to FHIR Library resource
3. **Check** - Verify integrity of bundled content
4. **Test** - Run comprehensive lens tests
5. **Upload** - Deploy to FHIR server

## Step 1: Create a New Lens

Initialize a new lens using the `new` command:

```bash
lens-tool-bundler new MyLens
```

The tool will prompt you for metadata (name, description, purpose, usage).

:::info Alternative: Use Default Values
Skip the interactive prompts with the `-d` flag:
```bash
lens-tool-bundler new MyLens -d
```
This creates the lens with placeholder metadata that you can update later.
:::

This creates two files:
- `my-lens.js` - Your enhance function (edit this file with your lens logic)
- `my-lens.json` - FHIR Library bundle (auto-generated, don't edit directly)

## Step 2: Bundle JavaScript into FHIR Library

After editing your `my-lens.js` file, convert it to a FHIR Library bundle:

```bash
lens-tool-bundler bundle my-lens.js -u
```

The `-u` flag updates the existing bundle while preserving metadata.

:::tip Using package.json for Metadata
If your project has a `package.json`, use the `-p` flag to automatically populate metadata:
```bash
lens-tool-bundler bundle my-lens.js -p
```
This reads `name`, `version`, `description`, `author`, and `license` from your package.json.
:::

## Step 3: Verify Bundle Integrity

Before testing, verify that your JavaScript file matches the bundle content:

```bash
lens-tool-bundler check my-lens.js
```

**Success output:**
```
✅ Integrity check passed: my-lens.js ↔ my-lens.json
```

**Failure output:**
```
❌ Integrity check failed: Content mismatch
   Run 'bundle -u' to update the bundle with current JS content.
```

:::warning
If integrity check fails, you modified the `.js` file but forgot to run `bundle -u`.
:::

## Step 4: Test Your Lens

Run comprehensive tests against real EPI and IPS samples:

```bash
lens-tool-bundler test my-lens.json
```

The test framework validates content preservation, FHIR structure integrity, and functionality.

:::tip Verbose Output
Add `-v` flag for detailed test information including preservation percentages and full metrics:
```bash
lens-tool-bundler test my-lens.json -v
```
:::

## Step 5: Upload to FHIR Server

Deploy your lens to a FHIR R4-compliant server:

```bash
lens-tool-bundler upload my-lens.json -d https://fhir.example.com/api/fhir
```

:::danger Important URL Format
**Do NOT** include `/Library` in the URL - the tool adds it automatically.
- ✅ Correct: `https://fhir.example.com/api/fhir`
- ❌ Incorrect: `https://fhir.example.com/api/fhir/Library`
:::

The tool automatically:
- Checks if the lens exists (searches by name)
- Updates existing lens (PUT) or creates new lens (POST)
- Handles FHIR-compliant operations

## Updating Your Lens

To modify an existing lens, follow the same workflow:

1. Edit `my-lens.js`
2. Bundle: `lens-tool-bundler bundle my-lens.js -u`
3. Check: `lens-tool-bundler check my-lens.js`
4. Test: `lens-tool-bundler test my-lens.json`
5. Upload: `lens-tool-bundler upload my-lens.json -d $FHIR_SERVER`

:::tip Chain Commands
For efficiency, chain commands together:
```bash
lens-tool-bundler bundle my-lens.js -u && \
lens-tool-bundler check my-lens.js && \
lens-tool-bundler test my-lens.json && \
lens-tool-bundler upload my-lens.json -d $FHIR_SERVER
```
:::

## Best Practices

### 1. Keep Metadata in Sync

Maintain consistency between `package.json` and your FHIR Library metadata. Use the `-p` flag when bundling:

```bash
lens-tool-bundler bundle my-lens.js -p
```

This automatically syncs name, version, description, author, and license from your `package.json`.

### 2. Version Control

Always commit both `.js` and `.json` files together:

```bash
git add my-lens.js my-lens.json
git commit -m "feat: add new lens functionality"
```

### 3. Test Before Upload

Never skip the testing step:

```bash
# ✅ Good workflow
lens-tool-bundler bundle my-lens.js -u
lens-tool-bundler check my-lens.js
lens-tool-bundler test my-lens.json
lens-tool-bundler upload my-lens.json -d $FHIR_SERVER

# ❌ Bad workflow (skips testing)
lens-tool-bundler bundle my-lens.js -u
lens-tool-bundler upload my-lens.json -d $FHIR_SERVER
```

## Troubleshooting

### "Integrity check failed"

**Cause**: JavaScript file and bundle are out of sync.

**Solution**:
```bash
lens-tool-bundler bundle my-lens.js -u
```

### "Upload failed with 400"

**Cause**: Incorrect URL format or server configuration.

**Solution**:
- Ensure URL does NOT include `/Library` at the end
- Verify FHIR server is accessible
- Check server logs for detailed error

### "Test failed"

**Cause**: Lens functionality issues or test data problems.

**Solution**: Review test output and ensure your lens logic is correct. Consult the lens development guide for best practices.

## CI/CD Integration

For automated lens deployment, use the Gravitate Health reusable workflow:

**Repository**: [Gravitate-Health/reusable-workflows](https://github.com/Gravitate-Health/reusable-workflows)  
**Example**: [lens-upload.yml](https://github.com/Gravitate-Health/reusable-workflows/blob/main/examples/lens-upload.yml)

This provides a ready-to-use GitHub Actions workflow that:
- Checks lens integrity
- Runs comprehensive tests
- Uploads to FHIR servers on success
- Handles proper exit codes and error reporting

## Additional Resources

- **Command Reference**: See [README.md](https://github.com/Gravitate-Health/lens-tool-bundler) for all commands and options
- **Batch Operations**: For managing multiple lenses, check batch commands in the README
- **Advanced Usage**: Run `lens-tool-bundler help [COMMAND]` for detailed help
- **Support**: [GitHub Issues](https://github.com/Gravitate-Health/lens-tool-bundler/issues)

## Quick Reference

```bash
# Create new lens
lens-tool-bundler new MyLens

# Bundle JavaScript to FHIR
lens-tool-bundler bundle my-lens.js -u

# Verify integrity
lens-tool-bundler check my-lens.js

# Test lens
lens-tool-bundler test my-lens.json

# Upload to server
lens-tool-bundler upload my-lens.json -d https://fhir.example.com/api/fhir
```

---

**Workflow Summary:**

```
Create → Bundle → Check → Test → Upload
```