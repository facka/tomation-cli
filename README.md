# tomation-cli

This CLI helps developers create starter projects for the Tomation automation framework.

## Installation

```bash
npm install -g tomation-cli
```

Or use it directly with `npx`:

```bash
npx tomation-cli create my-project
```

## Usage

### Create a new project

```bash
tomation create <project-name>
```

**Example:**

```bash
npx tomation-cli create my-project
```

This will:

1. Create a new folder named `my-project` in the current directory.
2. Copy the **playground template** (a ready-to-use tomation test project) into the folder.
3. Replace `__PROJECT_NAME__` placeholders with the actual project name.

## What you get

The generated project uses a **playground template** that includes:

- `package.json` — pre-configured with tomation
- `tomation.config.ts` — basic tomation configuration
- `tests/example.spec.ts` — a sample test to get you started
- `README.md` — project-specific docs

## Next steps after creation

```bash
cd my-project
npm install
npm run live-server
```
Install tomation-webext extension
Open https://facka.github.io/tomation-playground/ in a browser
Then open tomation web extension to connect test scripts and run the tests

## Development

```bash
# Install dependencies
npm install

# Build the CLI
npm run build

# Run locally
node dist/index.js create my-project
```

