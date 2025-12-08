# Testing Your Lens

:::tip Testing Philosophy
Comprehensive testing ensures your [Lens](/reference/lens) operates correctly, maintains regulatory compliance, and delivers the intended personalization without removing regulated content. Use a combination of automated unit tests and visual inspection to validate your lens implementation.
:::

Testing lenses involves two complementary approaches: **automated unit testing** for functionality validation and **visual testing** for user experience verification.

---

## Unit Testing

### Overview

The [lens-template repository](https://github.com/Gravitate-Health/lens-template) includes a comprehensive test suite that enables automated testing of your lens implementation. Unit tests validate that your lens:

- Does not remove or alter regulated content
- Applies correct CSS classes (`highlight`, `collapse`) based on patient data
- Adds supplementary content in appropriate locations
- Handles edge cases and invalid inputs gracefully
- Performs within acceptable execution time limits

:::warning Critical Compliance Test
The most important test validates that **no content is removed** from the original [ePI](/reference/epi). This ensures regulatory compliance and patient safety.
:::

Read the [Test README](https://github.com/Gravitate-Health/lens-template/tree/main/tests#readme) for more detailed information about testing and developing tests.

### Running Unit Tests

The lens template provides npm scripts for running tests:

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test -- path/to/test-file.test.js
```

### Test Structure

A typical lens test suite includes:

1. Content Preservation Tests
2. Functional Tests, These verify your lens applies the correct focusing logic.
3. Edge Case Tests, Test boundary conditions and error handling.
4. Supplementary Content Tests

### Test Data Customization

The lens template includes sample test data that you should customize for your use case.


### Best Practices for Unit Testing

:::tip Testing Best Practices
1. **Test one thing at a time**: Each test should validate a single behavior
2. **Use descriptive test names**: Clearly state what is being tested
3. **Test both positive and negative cases**: Verify expected behavior and error handling
4. **Keep tests independent**: Tests should not depend on each other's state
5. **Use test fixtures**: Create reusable test data to avoid duplication
6. **Aim for high coverage**: Target 80%+ code coverage for critical lens logic
7. **Run tests frequently**: Test after each significant code change
:::

---

## Visual Testing

### Using the Focusing Inspector

The **Focusing Inspector** tool provides a visual interface for testing lens operation and seeing the actual rendered output. This tool is part of the [focusing-SDK](https://github.com/Gravitate-Health/focusing-sdk) and enables you to:

- Preview how your lens transforms ePI content
- Inspect applied CSS classes visually
- Verify supplementary content appears correctly
- Test with different IPS and ePI combinations
- Debug focusing logic in real-time

:::info Tool Location
The Focusing Inspector is available in the [focusing-SDK repository](https://github.com/Gravitate-Health/focusing-sdk). See the [Focusing Inspector reference](/reference/focusing-inspector) for detailed information.
:::

### Setting Up Visual Testing

#### 1. Install the Focusing SDK

```bash
# Clone the focusing-SDK repository
git clone https://github.com/Gravitate-Health/focusing-sdk.git
cd focusing-sdk

# Start the Focusing Inspector
docker-compose up -d
```

#### 2. Load Your Lens

There are 3 main methods to load your lens into the SDK

1. The easiest is just to copy/develop your lens in the `Lenses` folder. There is a lens-selector-file already configured to monitor this folder.
2. You can add another lens-selector-file service which monitors another folder in your file system.
3. add a lens-selector-git service pointing to your git repository (remember to set `CACHE_TTL_MINUTES` to 0 if you want it to load the latest commit every time)

#### 3. Execute and Inspect

Once loaded:

- **Execute prerequisites**, which are selecting an input ePI, and preprocessing it.
- **Select an IPS** which will determine the patient profile (remember you can edit this in the `patient`folder) 
- **Execute the lens** to generate the [f(ePI)](/reference/f-epi)
- **View side-by-side comparison** of original and focused ePI
- **Inspect HTML changes** to see applied classes and added content
- **Toggle views** between different focusing modes (programmer view vs. end-user view)

### Visual Testing Checklist

Use this checklist when visually testing your lens:

#### Content Verification
- [ ] All original text is visible or accessible (not deleted)
- [ ] Collapsed sections can be expanded to view hidden content
- [ ] No broken HTML structure or rendering issues

#### Highlighting/Collapsing
- [ ] Relevant sections are visually highlighted appropriately
- [ ] Irrelevant sections are collapsed/dimmed but not removed
- [ ] Standard sections remain with normal styling
- [ ] Visual hierarchy makes sense for patient understanding

#### Supplementary Content
- [ ] Added links open to correct destinations
- [ ] Added images/icons display correctly
- [ ] Added interactive elements function properly
- [ ] New content doesn't obscure original information

#### Patient Context Scenarios
- [ ] Test with different ages (pediatric, adult, geriatric)
- [ ] Test with various medical conditions
- [ ] Test with different medication lists
- [ ] Test with edge cases (missing data, extreme values)

#### Performance
- [ ] Lens executes quickly (< 2 seconds for typical ePI)
- [ ] Page remains responsive after focusing
- [ ] No console errors or warnings

#### Accessibility
- [ ] Focus indicators work correctly for keyboard navigation
- [ ] Color contrast meets accessibility standards
- [ ] Screen reader compatibility (if applicable)
