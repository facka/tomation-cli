# Tomation Starter

A ready-to-use starter template for the [Tomation](https://github.com/facka/tomation) automation framework, targeting the public playground:

👉 **https://facka.github.io/tomation-playground/**

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

or use tomation-cli command

```bash
tomation dev
```

This starts a Vite dev server that serves the automation bundle at:

```
http://localhost:5050/dist/tests.bundle.js
```

### 3. Open the playground

Open the playground page in your browser:

**https://facka.github.io/tomation-playground/**

### 4. Load the bundle via the extension

Use the Tomation browser extension to load the bundle URL:

```
http://localhost:5050/dist/tests.bundle.js
```

The extension will inject and execute the automation scripts on the playground page.

## Project Structure

```
template/
  src/
    pages/
      login.page.ts    # Page Object Model for the login form
    tests/
      login.test.ts    # Automated login tests
    main.ts            # Entry point — calls tomation to register tests
  package.json
  tomation.config.ts   # Target URL configuration
  vite.config.ts       # Vite build configuration
```

## Scripts

| Command           | Description                                |
|-------------------|--------------------------------------------|
| `tomation dev`     | Start Tomation dev server                 |

`tomation-cli` has to be installed globally to have access to `tomation` command

## Tests

Two automated login tests are included:

- **Login success** — logs in with `admin` / `1234` and expects `"Success"`
- **Login error** — logs in with invalid credentials and expects `"Error"`
