# Cypress – Simple CRUD Test Automation

A test automation project built with **Cypress** for a **Simple CRUD** web app. This repo includes **UI E2E tests**, **API-focused specs**, and **visual testing** samples using **Applitools Eyes**.

## 🚀 Features

### Core Capabilities
- **UI E2E Testing**: Cypress browser automation for CRUD flows
- **API Testing**: API specs under `cypress/e2e/simple-crud/api/`
- **Environment Switching**: `--env version=development|production` loads config from JSON
- **CI/CD Ready**: GitHub Actions workflow runs the Simple CRUD E2E suite on push

### Advanced Features
- **Parallel Execution**: `cypress-parallel` for folder-based parallel runs
- **Visual Testing**: `@applitools/eyes-cypress` sample specs
- **Config-as-Code**: environment JSON is applied dynamically in `cypress.config.js`
- **POM Helpers**: reusable helpers under `cypress/pom/`

## 📈 Framework Metrics

- **Language**: JavaScript (CommonJS)
- **Test Runner**: Cypress (`^15.12.0`)
- **Parallel Runner**: `cypress-parallel` (`^0.15.0`)
- **Visual Testing**: Applitools Eyes (`@applitools/eyes-cypress`)
- **CI/CD**: GitHub Actions (Node 20)

## 📁 Project Structure

```
cypress-basic/
├── .github/
│   └── workflows/
│       └── cypress-cloud-tests.yml        # CI: run E2E suite + upload artifacts on failure
├── cypress/
│   ├── e2e/
│   │   ├── simple-crud/
│   │   │   ├── api/                       # API-focused specs
│   │   │   └── ui/                        # UI E2E specs (incl. POM-based tests)
│   │   ├── visual-testing/                # Applitools sample specs
│   │   └── xample/                        # Cypress example specs (learning/reference)
│   ├── environment/
│   │   ├── development.json               # Local config (default)
│   │   └── production.json                # Production config
│   ├── fixtures/                          # Test data
│   ├── pom/                               # Helpers (page objects / API helpers)
│   └── support/                           # Commands + support setup
├── cypress.config.js                      # Loads environment JSON based on --env version=...
├── package.json
└── README.md
```

## 🗂️ Directory Overview

| Directory / File | Purpose |
|---|---|
| `.github/workflows/` | CI pipeline: install deps, run Cypress, upload failure artifacts |
| `cypress/e2e/simple-crud/ui/` | UI E2E specs for the CRUD app |
| `cypress/e2e/simple-crud/api/` | API specs for CRUD endpoints/flows |
| `cypress/e2e/visual-testing/` | Visual testing examples using Applitools |
| `cypress/environment/` | Environment JSON config files (baseUrl, timeouts, video, etc.) |
| `cypress/pom/` | Shared helpers used by specs (POM / API helper modules) |
| `cypress/support/` | Global Cypress support config + custom commands |
| `cypress.config.js` | Applies environment config at runtime based on `config.env.version` |

## 🛠️ Technologies & Dependencies

### Core Technologies

- **Cypress**: end-to-end test runner
- **dotenv**: local environment variable loading
- **cypress-parallel**: parallel execution across specs/folders
- **@applitools/eyes-cypress**: visual testing integration

### npm Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm test` | `cypress open` | Interactive runner (choose specs in UI) |
| `npm run test:prod:headless` | `cypress run --env version=production` | Headless run against production config |
| `npm run cy:e2e` | `cypress run --spec 'cypress/e2e/simple-crud/**/*.cy.js' --env version=production` | Run Simple CRUD suite (prod) |
| `npm run cy:api` | `cypress-parallel -d cypress/e2e/simple-crud/api/ -s test:prod:headless` | Run API specs in parallel (prod) |
| `npm run cy:full-e2e` | `cypress-parallel -d cypress/e2e/simple-crud/ -t 6 -s test:prod:headless` | Run full Simple CRUD folder in parallel (prod) |

## 🚦 Getting Started

### Prerequisites

- **Node.js 20+** (matches CI)
- **npm**

### Installation

```bash
npm install
```

## ▶️ Running Tests


### Headless run (production)

```bash
npm run test:prod:headless
```

### Run the Simple CRUD suite (production)

```bash
npm run cy:e2e
```

## 🌍 Environment Configuration

This repo loads environment config from JSON:

- **development** → `cypress/environment/development.json` (default if not provided)
- **production** → `cypress/environment/production.json`

How it works:
- `cypress.config.js` reads `config.env.version || 'development'`
- then loads `./cypress/environment/<version>.json`
- and applies values like `baseUrl`, `defaultCommandTimeout`, `video`, etc.

Example (force development):

```bash
cypress run --env version=development
```

## 👀 Visual Testing (Applitools)

Visual testing specs live under `cypress/e2e/visual-testing/`.

- **Required**: set `APPLITOOLS_API_KEY` in your environment
- **Recommended**: keep secrets out of git (don’t commit real keys)

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Workflow file: `cypress-cloud-tests.yml`

- Runs on push to `main` / `Master`
- Uses Node.js 20 + `npm ci`
- Executes: `npm run cy:e2e`
- Uploads `cypress/screenshots/` and `cypress/videos/` as artifacts on failures (when present)

## 🐛 Troubleshooting

### Tests fail locally with `baseUrl` / connection errors

- If you’re running locally, use `--env version=development` and ensure the app is running at the `baseUrl` from `cypress/environment/development.json`.

### Environment file not being applied

- Ensure you pass `--env version=production` (or `development`) exactly.
- Check `cypress.config.js` for the `config.env.version` logic.

### Applitools tests failing

- Verify `APPLITOOLS_API_KEY` is set in your shell environment before running tests.

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Commit your changes**: `git commit -m "Add your feature"`
4. **Push the branch**: `git push origin feature/your-feature`
5. **Open a Pull Request**

### Development Guidelines

- Keep specs organized under the relevant area (`simple-crud/api`, `simple-crud/ui`, `visual-testing`)
- Prefer reusing shared helpers under `cypress/pom/`
- Update this README when scripts, structure, or environment handling changes

## 🔗 Quick Links

- **Cypress Docs**: `https://docs.cypress.io`
- **Applitools Eyes Cypress Docs**: `https://applitools.com/docs/api-ref/sdk-api/cypress/`
- **Simple CRUD App (production target)**: `https://simple-crud-apps.vercel.app`

## 📄 License

ISC (see `package.json`).

## 📞 Support

- **Issues**: open a GitHub issue for bugs / feature requests
- **Debugging**: check the Cypress run output, plus screenshots/videos (especially from CI artifacts)