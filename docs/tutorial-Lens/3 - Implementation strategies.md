# Basic lens structure

## Functions interface

A Lens is a JavaScript program that defines how to transform an ePI document. The basic structure of a Lens includes:

### Required and Optional Functions

- **`enhance` function (mandatory)**: This function takes the original ePI content as input and returns the transformed content. It is where you define how to modify the ePI.
- **`report` function (optional)**: This function generates a report of the changes made by the enhance function. It can be used for logging or debugging purposes.
- **`explanation` function (optional)**: This function provides a human-readable explanation of the changes made by the enhance function. It can be useful for users to understand what modifications were applied.

### Example Structure

Here is a simple example of a Lens structure:

```javascript
function enhance(originalContent) {
    // Your transformation logic here
    return transformedContent;
}

function report(changes) {
    // Your reporting logic here
    return reportData;
}

function explanation() {
    // Your explanation logic here
    return explanationText;
}

return {
    enhance: enhance,
    report: report,
    explanation: explanation
};
```

---

## Implementation strategies

When implementing a Lens, consider the following strategies to ensure it is effective and efficient:

### Use of Regular Expressions

**Regular expressions** are powerful tools for pattern matching and text manipulation. They can be used to identify specific sections of the ePI that need to be modified.

:::note Example Use Case
You can use regular expressions to find all instances of a particular term or phrase and replace them with a highlighted version.
:::

### DOM Manipulation

If the ePI content is structured as HTML, you can use **DOM manipulation techniques** to traverse and modify the document. This allows for more precise control over the elements being changed, such as adding classes or attributes to specific tags.

:::tip Precision Control
DOM manipulation provides fine-grained control over HTML elements, making it ideal for targeted modifications.
:::

### Performance Considerations

:::warning Efficiency Requirements
Lenses should be designed to run efficiently, especially if they are executed on client devices with limited resources. Avoid complex computations and ensure that the enhance function executes quickly.
:::

:::tip Offload Heavy Tasks
Consider using pre-processors for any heavy computational tasks that can be done before the Lens is applied.
:::

### Testing and Validation

:::caution Coming Soon
Testing and validation guidelines will be added in a future version of this documentation.
:::
