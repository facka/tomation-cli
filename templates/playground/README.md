# __PROJECT_NAME__

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

This starts a Vite dev server that serves the automation bundle at:

```
http://localhost:5173/src/main.ts
```

### 3. Open the playground

Open the playground page in your browser:

**https://facka.github.io/tomation-playground/**

### 4. Load the bundle via the extension

Use the Tomation browser extension to load the bundle URL:

```
http://localhost:5173/src/main.ts
```

The extension will inject and execute the automation scripts on the playground page.

## Project Structure

```
__PROJECT_NAME__/
  src/
    pages/
      login.page.ts    # Page Object Model for the login form
    tests/
      login.test.ts    # Automated login tests
    main.ts            # Entry point — imports and runs all tests
  package.json
  tomation.config.ts   # Target URL configuration
  vite.config.ts       # Vite build configuration
```

## Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start Vite dev server                |
| `npm run build`   | Build the bundle to `dist/bundle.js` |
| `npm run preview` | Preview the production build         |

## Tests

Two automated login tests are included:

- **Login success** — logs in with `admin` / `1234` and expects `"Success"`
- **Login error** — logs in with invalid credentials and expects `"Error"`
