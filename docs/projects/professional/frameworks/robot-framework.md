# Robot Framework – Web UI + API Test Automation

A test automation repository built with Robot Framework covering:

- **Web UI testing** with SeleniumLibrary (headless Chrome)
- **API testing** with RequestsLibrary

Currently includes suites for **SauceDemo** (`saucedemo.com`) and **Simple CRUD Apps** (`simple-crud-apps.vercel.app`). Results are published automatically to GitHub Pages via GitHub Actions.

## 🚀 Features

### Core Capabilities
- **UI Testing**: Selenium WebDriver through Robot Framework SeleniumLibrary
- **API Testing**: HTTP API validation through Robot Framework RequestsLibrary
- **Headless Execution**: Chrome headless mode (`--headless=new`) for CI/CD compatibility
- **Keyword-Driven**: Modular, reusable keywords separated by responsibility
- **Reporting**: Built-in Robot Framework HTML report and log, auto-deployed to GitHub Pages
- **CI/CD Ready**: GitHub Actions integration with automated report deployment

### Advanced Features
- **Page Object Pattern**: Locators decoupled from keywords into dedicated locator files
- **Centralised Variables**: All test data, URLs, and timeouts defined in one place
- **Clean State Management**: Automatic cart cleanup between tests via `Test Teardown`
- **Noise-Free Logging**: `Get Element Count` and direct `IF` comparisons avoid false `[ FAIL ]` log entries
- **Screenshot on Failure**: Automatic page screenshot captured before browser closes on failure

## 📈 Framework Metrics

- **Language**: Robot Framework DSL
- **Browser Automation**: SeleniumLibrary + Selenium WebDriver
- **Browser**: Google Chrome (headless)
- **Python**: 3.12
- **CI/CD**: GitHub Actions
- **Report Hosting**: GitHub Pages

## 📁 Project Structure

```
robot-framework/
├── .github/
│   └── workflows/
│       └── robot-runner.yml          # CI/CD: run tests + deploy report to GitHub Pages
├── README.md                         # Project documentation
├── requirements.txt                  # Python dependencies
├── resources/
│   ├── saucedemo/
│   │   ├── keywords/                 # Reusable business-logic keywords
│   │   │   ├── cart_keywords.robot
│   │   │   ├── checkout_keywords.robot
│   │   │   ├── common_keywords.robot
│   │   │   ├── login_keywords.robot
│   │   │   └── product_keywords.robot
│   │   ├── locators/                 # Element selectors (CSS / ID), separated from logic
│   │   │   ├── cart_locators.robot
│   │   │   ├── checkout_locators.robot
│   │   │   ├── login_locators.robot
│   │   │   └── product_locators.robot
│   │   └── variables/               # Centralised test data and configuration
│   │       └── common_variables.robot
│   └── simple-crud-apps/
│       ├── keywords/                 # UI + API reusable keywords
│       │   ├── api_keywords.robot
│       │   ├── common_keywords.robot
│       │   └── simple_crud_keywords.robot
│       ├── locators/                 # UI selectors
│       │   └── simple_crud_locators.robot
│       └── variables/                # UI + API test data/config
│           ├── api_variables.robot
│           └── common_variables.robot
├── tests/
│   ├── saucedemo/
│   │   ├── cart_tests.robot
│   │   ├── checkout_tests.robot
│   │   ├── login_tests.robot
│   │   └── product_tests.robot
│   └── simple-crud-apps/
│       ├── simple-crud-api.robot
│       └── simple-crud-ui-e2e.robot
└── results/                         # Generated after a local run (git-ignored)
    ├── log.html
    ├── output.xml
    └── report.html
```

## 🗂️ Directory Overview

| Directory | Purpose |
|---|---|
| `.github/workflows/` | GitHub Actions pipeline — runs tests on push/PR and deploys the HTML report to GitHub Pages |
| `resources/` | Shared keywords/locators/variables by application (`saucedemo`, `simple-crud-apps`) |
| `tests/` | Test cases grouped by application |
| `results/` | Robot Framework output files generated after execution — excluded from version control |

## 🧪 Test Coverage

| Module | Test IDs | Tags |
|---|---|---|
| Login | TC_LOGIN_001 – TC_LOGIN_002 | smoke, regression, negative |
| Products | TC_PRD_001 – TC_PRD_008 | smoke, regression |
| Cart | TC_CART_001 – TC_CART_002 | smoke, regression |
| Checkout | TC_CHK_001 – TC_CHK_006 | smoke, regression, negative, e2e |
| Simple CRUD UI (E2E) | TC_CRUD_001 – TC_CRUD_004 | crud, smoke, regression, e2e |
| Simple CRUD API | TC_API_001 – TC_API_006 | api, smoke, regression, negative |

## 🛠️ Technologies & Dependencies

| Package | Purpose |
|---|---|
| `robotframework` | Core test framework and DSL runner |
| `robotframework-seleniumlibrary` | Selenium WebDriver bindings for Robot Framework |
| `robotframework-requests` | API testing via persistent HTTP sessions |
| `webdriver-manager` | Automatic ChromeDriver version management |
| `robotframework-pabot` | Parallel test execution support (in development) |

## 🚦 Getting Started

### Prerequisites

- **Python 3.12** (recommended; CI uses 3.12)
- **Git**
- **Google Chrome** (stable)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd robot-framework
```

### 2. Create and Activate a Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
python -m venv .venv
.venv\Scripts\activate.bat
```

**macOS / Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Verify Installation

```bash
robot --version
```

## ▶️ Running Tests

### Run the Full Suite

```bash
robot --outputdir results tests/
```

This will execute all test files under `tests/`, save output to `results/`, and generate three files: `log.html`, `report.html`, and `output.xml`.

### Run a Specific Module

```bash
# Login tests
robot --outputdir results tests/saucedemo/login_tests.robot

# Product tests
robot --outputdir results tests/saucedemo/product_tests.robot

# Cart tests
robot --outputdir results tests/saucedemo/cart_tests.robot

# Checkout tests
robot --outputdir results tests/saucedemo/checkout_tests.robot

# Simple CRUD UI E2E tests
robot --outputdir results tests/simple-crud-apps/simple-crud-ui-e2e.robot

# Simple CRUD API tests
robot --outputdir results tests/simple-crud-apps/simple-crud-api.robot
```

### Notes for Simple CRUD Apps suites

- **UI suite state**: `tests/simple-crud-apps/simple-crud-ui-e2e.robot` captures `${PRODUCT_ID}` from the UI notification in `TC_CRUD_002`; the update/delete tests depend on it. Run the suite as a whole.
- **API suite state**: `tests/simple-crud-apps/simple-crud-api.robot` captures `${PRODUCT_ID}` from the POST response in `TC_API_002`; the remaining tests depend on it. Run the suite as a whole.

### Run by Tag

```bash
# Smoke tests only
robot --include smoke --outputdir results tests/

# Full regression suite
robot --include regression --outputdir results tests/

# End-to-end tests only
robot --include e2e --outputdir results tests/

# Negative / validation tests only
robot --include negative --outputdir results tests/

# Exclude specific tests
robot --exclude skip --outputdir results tests/
```

### View the Report Locally

```bash
start results/report.html     # Windows
open results/report.html      # macOS
xdg-open results/report.html  # Linux
```

## 📊 Test Reporting

### Robot Framework Built-in Reports

Every test run generates three output files in the `results/` directory:

- **`report.html`** — high-level summary showing pass/fail counts, elapsed time, and tag statistics
- **`log.html`** — step-by-step execution log with keyword calls, variable values, and screenshots
- **`output.xml`** — machine-readable results for integration with external tools

### GitHub Pages Report

The CI pipeline automatically deploys the latest `report.html` to GitHub Pages after every run — including failed runs, so results are always visible.

Access the live report at:
```
https://<your-username>.github.io/<your-repo-name>/
```

## 🔧 Framework Components

### Simple CRUD Apps — UI components (SeleniumLibrary)

**Shared browser + interaction helpers**

- File: `resources/simple-crud-apps/keywords/common_keywords.robot`
- Used by: `tests/simple-crud-apps/simple-crud-ui-e2e.robot`

Key responsibilities:

- **Browser lifecycle**: `Open Browser To Simple CRUD App`, `Close Test Browser`
- **Navigation**: `Wait Until Page Is Loaded`, `Navigate To URL`, `Verify Current URL Contains`
- **Element helpers**: `Wait And Click Element`, `Wait And Input Text`, `Wait And Get Text`, `Element Should Be Present`, `Element Should Not Be Present`

**CRUD UI workflow keywords**

- File: `resources/simple-crud-apps/keywords/simple_crud_keywords.robot`

| Keyword / Area | Responsibility |
|---|---|
| `Open Simple CRUD App`, `Verify Product List Loaded` | Open the app and wait for product list readiness |
| `Add Product`, `Get Product Id From Notification` | Create a product and capture the generated ID from the UI notification |
| `Update Product`, `Delete Product` | Update/delete by captured product ID (modal flows) |
| `Assert Product Details`, `Product Should Not Be Present` | Verify row fields and post-delete absence |

**UI locators + variables**

- Locators: `resources/simple-crud-apps/locators/simple_crud_locators.robot`
- Variables: `resources/simple-crud-apps/variables/common_variables.robot` (includes `${BASE_URL}`, timeouts, and product test data)

> Note: the UI E2E suite captures `${PRODUCT_ID}` at runtime (in `TC_CRUD_002`). `TC_CRUD_003` and `TC_CRUD_004` depend on that state, so run the suite as a whole.

### Simple CRUD Apps — API components (RequestsLibrary)

- Keywords: `resources/simple-crud-apps/keywords/api_keywords.robot`
- Variables: `resources/simple-crud-apps/variables/api_variables.robot`
- Used by: `tests/simple-crud-apps/simple-crud-api.robot`

API design in this repo:

- **Session management**: `Create Simple CRUD API Session` (suite setup)
- **Operations**: `API Get All Products`, `API Create Product`, `API Get Product By Id`, `API Update Product`, `API Delete Product`
- **Assertions**: response status + JSON shape/field assertions (e.g. `Response Body Should Be A List`, `Response Field Should Equal As Numbers`)

> Note: the API suite stores `${PRODUCT_ID}` from `TC_API_002` and all subsequent tests depend on it, so run the suite as a whole.

## 🌐 Browser Configuration

Tests run in **headless Chrome** with the following arguments configured in each app’s `common_keywords.robot` (for example `resources/simple-crud-apps/keywords/common_keywords.robot`):

| Argument | Reason |
|---|---|
| `--no-sandbox` | Required inside Linux containers and CI runners |
| `--disable-dev-shm-usage` | Prevents shared memory crashes on Linux |
| `--incognito` | Ensures a clean, isolated session for every suite |
| `--headless=new` | Modern headless mode available from Chrome 112+ |

To run with a **visible browser window** locally, remove `add_argument("--headless=new")` from `Open Browser To Simple CRUD App` in `resources/simple-crud-apps/keywords/common_keywords.robot` (and/or the equivalent browser-open keyword in other suites).

## 🔄 CI/CD Pipeline

The workflow at `.github/workflows/robot-runner.yml` triggers automatically on every push or pull request to `main` / `master`, and can also be triggered manually via `workflow_dispatch`.

```
Push
    │
    ▼
┌────────────────────────────────────┐
│  Job 1: test                       │
│  • Setup Python 3.12               │
│  • pip install -r requirements.txt │
│  • Install Chrome (stable)         │
│  • robot --outputdir results tests/│
│  • Upload results/ as artifact     │
└──────────────┬─────────────────────┘
               │  always (pass or fail)
               ▼
┌────────────────────────────────────┐
│  Job 2: deploy-report              │
│  • Download artifact               │
│  • Create index.html redirect      │
│  • Deploy to GitHub Pages          │
└────────────────────────────────────┘
```

### One-Time GitHub Repository Setup

1. Go to **Settings → Pages → Source** and select **GitHub Actions**.
2. Go to **Settings → Actions → General → Workflow permissions** and enable **Read and write permissions**.

## 🐛 Troubleshooting

### Virtual Environment Not Activating
Ensure you are using the correct path for your OS. On Windows, you may need to allow script execution first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Module Not Found Error
Ensure the virtual environment is active and dependencies are installed:
```bash
pip install -r requirements.txt
```

### Tests Failing Locally
1. Open `results/log.html` for a detailed step-by-step breakdown
2. Verify credentials in `resources/saucedemo/variables/common_variables.robot`
3. Confirm you have a stable internet connection (tests run against the live SauceDemo site)
4. Try running without `--headless=new` to observe the browser directly

### Chrome / ChromeDriver Version Mismatch
`webdriver-manager` handles driver downloads automatically. If you encounter a version mismatch, upgrade it:
```bash
pip install --upgrade webdriver-manager
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Commit your changes**: `git commit -m 'Add your feature'`
4. **Push to the branch**: `git push origin feature/your-feature`
5. **Open a Pull Request**

### Development Guidelines
- Add new keywords to the appropriate keyword file and keep locators in the matching locator file
- Tag all new test cases with at least one of: `smoke`, `regression`, `e2e`, or `negative`
- Ensure the full suite passes locally before opening a PR
- Update this README if adding new modules or changing the project structure

## 🔗 Quick Links

- **Live Test Report**: [https://fahmi-wiradika.github.io/robot-framework/](https://fahmi-wiradika.github.io/robot-framework/)
- **SauceDemo Site**: [https://www.saucedemo.com](https://www.saucedemo.com)
- **Robot Framework Docs**: [https://robotframework.org](https://robotframework.org)
- **SeleniumLibrary Docs**: [https://robotframework.org/SeleniumLibrary/](https://robotframework.org/SeleniumLibrary/)

## 📄 License

This project is licensed under the Apache 2.0 License.

---

**Happy Testing! 🎉**