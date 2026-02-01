# Advanced Topic: Adding dependencies to your lens

It is assumed that lenses are bundled within a single JS object, but it may be possible to embed dependencies, like libraries, to your lens.

:::danger

The content in this page is not tested.

:::

It is possible bundle a TypeScript project into a single JavaScript file. There are several common ways to do it depending on the tooling you prefer.

Below are the most practical options:

---

## 1. Using esbuild (fastest + simplest)

**Install:**

```bash
npm install --save-dev esbuild
```

**Bundle:**

```bash
npx esbuild src/index.ts --bundle --outfile=dist/bundle.js --platform=node
```

Or for browser:

```bash
npx esbuild src/index.ts --bundle --outfile=dist/bundle.js --platform=browser
```

You can add:

* `--minify` for minification
* `--sourcemap` for debugging

---

## 2. Using Rollup (best for libraries)

**Install:**

```bash
npm install --save-dev rollup @rollup/plugin-typescript typescript
```

**rollup.config.js**

```js
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "cjs" // or "esm", "iife"
  },
  plugins: [typescript()],
};
```

Bundle:

```bash
npx rollup -c
```

---

## 3. Using Webpack (best for complex apps)

**Install:**

```bash
npm install --save-dev webpack webpack-cli ts-loader typescript
```

**webpack.config.js**

```js
module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, use: "ts-loader" }
    ]
  }
};
```

Build:

```bash
npx webpack
```

---

## 4. Using the TypeScript compiler (tsc) alone?

`tsc` **cannot** bundle into a single file by itself
(except for experimental `--outFile`, which only works for AMD/SystemJS modules).

So most real projects use a bundler.

