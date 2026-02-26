# Robot Framework – SauceDemo Test Automation

A web UI test automation suite for [SauceDemo](https://www.saucedemo.com) built with Robot Framework and Selenium Library. Tests run in headless Chrome and results are published automatically to GitHub Pages via GitHub Actions.

## 🚀 Features

### Core Capabilities
- **UI Testing**: Selenium WebDriver through Robot Framework SeleniumLibrary
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
│   └── saucedemo/
│       ├── keywords/                 # Reusable business-logic keywords
│       │   ├── cart_keywords.robot
│       │   ├── checkout_keywords.robot
│       │   ├── common_keywords.robot
│       │   ├── login_keywords.robot
│       │   └── product_keywords.robot
│       ├── locators/                 # Element selectors (CSS / ID), separated from logic
│       │   ├── cart_locators.robot
│       │   ├── checkout_locators.robot
│       │   ├── login_locators.robot
│       │   └── product_locators.robot
│       └── variables/               # Centralised test data and configuration
│           └── common_variables.robot
├── tests/
│   └── saucedemo/
│       ├── cart_tests.robot
│       ├── checkout_tests.robot
│       ├── login_tests.robot
│       └── product_tests.robot
└── results/                         # Generated after a local run (git-ignored)
    ├── log.html
    ├── output.xml
    └── report.html
```

## 🗂️ Directory Overview

| Directory | Purpose |
|---|---|
| `.github/workflows/` | GitHub Actions pipeline — runs tests on push/PR and deploys the HTML report to GitHub Pages |
| `resources/keywords/` | Custom keywords that combine SeleniumLibrary calls into readable, business-level steps |
| `resources/locators/` | CSS and ID selectors for every page element, kept separate from test logic for easy maintenance |
| `resources/variables/` | Centralised test data: base URL, credentials, timeouts, product names, prices, and checkout data |
| `tests/` | Test cases organised by feature module (login, product, cart, checkout) |
| `results/` | Robot Framework output files generated after execution — excluded from version control |

## 🧪 Test Coverage

| Module | Test IDs | Tags |
|---|---|---|
| Login | TC_LOGIN_001 – TC_LOGIN_002 | smoke, regression, negative |
| Products | TC_PRD_001 – TC_PRD_008 | smoke, regression |
| Cart | TC_CART_001 – TC_CART_002 | smoke, regression |
| Checkout | TC_CHK_001 – TC_CHK_006 | smoke, regression, negative, e2e |

## 🛠️ Technologies & Dependencies

| Package | Purpose |
|---|---|
| `robotframework` | Core test framework and DSL runner |
| `robotframework-seleniumlibrary` | Selenium WebDriver bindings for Robot Framework |
| `webdriver-manager` | Automatic ChromeDriver version management |
| `robotframework-pabot` | Parallel test execution support (in development) |

## 🚦 Getting Started

### Prerequisites

- **Python 3.7** or higher
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
```

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

### Common Keywords (`common_keywords.robot`)

Core browser lifecycle and element interaction utilities shared across all test suites:

```robot
# Browser lifecycle
Open Browser To Login Page    # Opens headless Chrome and navigates to login
Close Test Browser            # Captures screenshot on failure, then closes browser

# Navigation
Wait Until Page Is Loaded     # Polls document.readyState until complete
Navigate To URL    ${url}     # Go To + wait for page load
Verify Current URL Contains   ${fragment}

# Element interactions
Wait And Click Element        ${locator}
Wait And Input Text           ${locator}    ${text}
Wait And Get Text             ${locator}
Wait And Select From List By Value    ${locator}    ${value}
Element Should Be Present     ${locator}
Element Should Not Be Present ${locator}
```

### Keyword Modules

| File | Responsibility |
|---|---|
| `login_keywords.robot` | Fill and submit the login form, assert success/failure messages, logout |
| `product_keywords.robot` | Cart badge tracking, add/remove items by locator, sort dropdown, product card assertions |
| `cart_keywords.robot` | Cart page assertions, proceed to checkout, clear all items between tests |
| `checkout_keywords.robot` | Multi-step checkout flow, field validation errors, order total math verification |

### Variables (`common_variables.robot`)

All configuration values are centralised and referenced via Robot Framework variables:

```robot
# Browser & Timeouts
${BROWSER}              chrome
${PAGE_LOAD_TIMEOUT}    30 seconds
${ELEMENT_TIMEOUT}      15 seconds

# Credentials
${STANDARD_USER}        standard_user
${VALID_PASSWORD}       secret_sauce

# URLs
${LOGIN_URL}            ${BASE_URL}/
${PRODUCT_URL}          ${BASE_URL}/inventory.html

# Product data
${PROD_NAME_BACKPACK}   Sauce Labs Backpack
${PROD_PRICE_BACKPACK}  $29.99
```

## 🌐 Browser Configuration

Tests run in **headless Chrome** with the following arguments configured in `common_keywords.robot`:

| Argument | Reason |
|---|---|
| `--no-sandbox` | Required inside Linux containers and CI runners |
| `--disable-dev-shm-usage` | Prevents shared memory crashes on Linux |
| `--incognito` | Ensures a clean, isolated session for every suite |
| `--headless=new` | Modern headless mode available from Chrome 112+ |

To run with a **visible browser window** locally, remove `add_argument("--headless=new")` from `Open Browser To Login Page` in `resources/saucedemo/keywords/common_keywords.robot`.

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