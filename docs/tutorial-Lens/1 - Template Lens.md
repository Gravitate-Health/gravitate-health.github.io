# Getting Started with Lens Development

:::tip Quick Start
The fastest way to start developing a [Lens](/reference/lens) is to use the official **[lens-template](https://github.com/Gravitate-Health/lens-template)** repository. This template provides a minimal working lens with a complete test suite to validate your lens implementation.
:::

## Fork the Template Repository

Start by creating your own copy of the lens-template repository:

1. **Navigate to the template repository**: [https://github.com/Gravitate-Health/lens-template](https://github.com/Gravitate-Health/lens-template)

2. **Fork the repository**:
   - Click the **"Fork"** button in the top-right corner of the GitHub page
   - Choose your GitHub account or organization as the destination
   - Optionally, customize the repository name for your specific lens (e.g., `pregnancy-warning-lens`)

3. **Clone your forked repository** to your local development machine:

```bash
# Replace YOUR-USERNAME with your GitHub username
git clone https://github.com/YOUR-USERNAME/lens-template.git

# Navigate into the cloned directory
cd lens-template
```

4. **Install dependencies**:

```bash
# Install Node.js dependencies
npm install
```

:::note Repository Setup
After forking, you have a complete development environment ready. The repository structure includes:

- `src/` - Lens source code
- `test/` - Test suite with sample ePIs and IPS
- `package.json` - Project configuration and scripts
:::

---

## What's Included in the Template

### Minimal Lens Implementation

The template contains a **simple, working lens** with minimal code that demonstrates:

- Proper function structure for [Lens Execution Environment](/reference/lee) execution
- How to access the three inputs: [p(ePI)](/reference/p-epi), [IPS](/reference/ips), and [Persona Vector](/reference/persona-vector)
- Proper handling of HTML elements without removing content

:::warning Regulatory Compliance
The template lens follows the critical constraint that **regulated ePI content cannot be removed or altered**. Your lens implementation must maintain this principle.
:::

### Comprehensive Test Suite

The template includes a **complete test suite** designed to ensure your lens operates correctly:

#### 1. Content Preservation Tests

**Critical validation** that ensures your lens does not remove or alter the original regulated content:

These tests verify that all text from the original ePI remains accessible in the focused output.

#### 2. Sample Test Data

The test suite provides:

- **Sample ePIs**: Pre-loaded [preprocessed ePIs](/reference/p-epi) (p(ePI)) with semantic annotations
- **Sample IPS**: Example [International Patient Summary](/reference/ips) resources with patient health data

:::tip Customizable Test Data
You can customize these sample resources to match your specific lens use case. For example:

- Add patient conditions relevant to your lens logic (e.g., pregnancy, allergies)
- Include specific medications or lab results
- Modify age, gender, or other persona attributes
:::

#### 3. Custom Test Functions

The test suite provides helper functions that enable you to build **custom tests** for your specific lens behavior:

```javascript
import { loadEPI, loadIPS, loadLens, applyLens, isTextHighlighted } from './lens-utils';

describe('My Lens Custom Tests', () => {
  const myLens = loadLens('my-lens');
  
  it('should highlight pregnancy warnings', async () => {
    const epi = loadEPI('Bundle-processedbundledovato-en.json');
    const ips = loadIPS('IPS-bundle-01.json');
    const result = await applyLens(epi, ips, myLens);
    
    expect(isTextHighlighted(result.epi, 'pregnancy')).toBe(true);
  });
});
```

These functions allow you to:

- Verify that specific CSS classes (`highlight`, `collapse`) are applied correctly
- Check that supplementary HTML content is added in appropriate locations
- Validate conditional logic based on patient data
- Ensure proper handling of edge cases

Read the test README file for more informaiton.

---

## Running Tests

Execute the test suite to validate your lens implementation:

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage
```

:::tip Test-Driven Development
As you develop your lens, continuously run the test suite to ensure:

1. You haven't accidentally removed content
2. Your focusing logic works as intended
3. Edge cases are properly handled
4. Performance remains acceptable
:::
