# Mobilewright – Mobile Automation with TypeScript

A mobile test automation project built with **Mobilewright** (Playwright-style API for mobile) and **TypeScript** targeting **Android** (emulator & real device), using the [Sauce Labs My Demo App](https://github.com/saucelabs/my-demo-app-android/releases) as the application under test.

This is the TypeScript counterpart of [robot-appium](https://github.com/fahmi-wiradika/robot-appium): same app under test, same login scenarios, but a Playwright-style runner with fixtures and auto-waiting instead of Robot Framework + Appium.

## Features

- **Mobile UI Automation**: Mobilewright + `@mobilewright/test` for Android app testing
- **Auto-waiting Locators**: `getByRole`, `getByLabel`, `getByTestId` — no manual waits
- **Emulator & Real Device Support**: device picked automatically, or filtered by name via `DEVICE_NAME`
- **Page Object Structure**: screens, reusable components, and flows separated by concern
- **Fixture-driven Tests**: screens and a logged-in state are injected into tests, no manual setup code
- **Path Aliases**: clean imports (`@screens/*`, `@fixtures`, `@config/*`, …)
- **Failure Diagnostics**: accessibility view tree attached to the report on failure
- **HTML Reporting**: Mobilewright HTML report out of the box
- **Environment-based Config**: app package, APK path, device, and credentials come from `.env`
- **Faster Execution**: the same login flow runs in 17s vs 44s on Robot Framework + Appium (see [Performance](#performance-mobilewright-vs-robot-framework--appium))

## Framework Metrics

- **Language**: TypeScript (strict mode)
- **Test Runner**: Mobilewright (`@mobilewright/test`, Playwright Test based)
- **Mobile Driver**: mobilecli (bundled with Mobilewright)
- **Device Target**: Android Emulator / Real Device (USB)
- **App Under Test**: Sauce Labs My Demo App Android (`com.saucelabs.mydemoapp.android`)
- **Execution**: 1 worker, 1 retry, 60s test timeout (see [Configuration](#configuration))

## Project Structure

```
mobilewright-automation/
├── apps/                                   # Place the APK here (binaries are gitignored)
├── config/
│   ├── app.ts                              # App package name & optional APK path
│   └── env.ts                              # Environment & test credentials (from .env)
├── src/
│   ├── core/
│   │   ├── base.screen.ts                  # Abstract BaseScreen + Screen/Device type re-exports
│   │   ├── device.ts                       # Deep link & app launch helpers
│   │   ├── gestures.ts                     # Swipe, back, scrollUntilVisible helpers
│   │   └── logger.ts                       # Timestamped console logger
│   ├── components/
│   │   └── tab-bar.ts                      # Navigation menu: open, login, logout, confirm
│   ├── screens/
│   │   ├── auth/
│   │   │   └── login.screen.ts             # Login form & account error message
│   │   └── home/
│   │       └── home.screen.ts              # Home screen (title check, owns a TabBar)
│   ├── flows/
│   │   └── auth.flows.ts                   # Multi-screen flows (loginAs)
│   ├── fixtures/
│   │   ├── screen.fixture.ts               # loginScreen, homeScreen, tabBarScreen
│   │   ├── auth.fixture.ts                 # loggedInHome (already logged in)
│   │   └── index.ts                        # Re-exports `test` and `expect`
│   └── data/
│       └── users.ts                        # Test users (standard, invalid)
├── tests/
│   ├── smoke/
│   │   └── lauch.smoke.test.ts             # App launch & navigation to login
│   └── regression/
│       └── auth/
│           └── login.test.ts               # Invalid login, valid login & logout
├── mobilewright.config.ts                  # Runner configuration
├── tsconfig.json                           # TypeScript & path alias configuration
├── .env.sample                             # Environment variable template
├── artifacts/                              # Test output (gitignored)
├── mobilewright-report/                    # HTML report (generated)
├── package.json
└── README.md
```

## Directory Overview

| Directory / File | Purpose |
|---|---|
| `config/app.ts` | Reads `APP_PACKAGE` and `APK_PATH` from the environment |
| `config/env.ts` | Reads `TEST_ENV`, `DEVICE_NAME`, `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`; fails fast if credentials are missing |
| `src/core/base.screen.ts` | `BaseScreen` — every screen must implement `waitUntilLoaded()` |
| `src/core/gestures.ts` | `scrollUntilVisible`, `swipeUp`, `swipeDown`, `goBack` |
| `src/core/device.ts` | `openDeepLink`, `launchApp` |
| `src/core/logger.ts` | `logger.info / warn / error` with ISO timestamps |
| `src/components/tab-bar.ts` | Reusable navigation menu component shared across screens |
| `src/screens/**` | Page objects — locators and actions for a single screen |
| `src/flows/auth.flows.ts` | Reusable multi-step flows that span screens |
| `src/fixtures/*` | Fixtures that build page objects and prepared states for tests |
| `src/data/users.ts` | Test data (`users.standard`, `users.invalid`) |
| `tests/smoke/` | Fast sanity checks: app opens, login page reachable |
| `tests/regression/` | Feature-level scenarios, grouped by area (e.g. `auth/`) |
| `mobilewright.config.ts` | Platform, timeouts, retries, reporter, view tree |
| `tsconfig.json` | Strict TS settings and `@alias` path mappings |
| `artifacts/` | Test results and failure attachments — gitignored |

## Architecture

Tests only talk to fixtures; fixtures build page objects; page objects wrap the Mobilewright `screen`.

```
 tests/            ──►  import { test } from '@fixtures'
    │
 fixtures/         ──►  screen.fixture  (loginScreen, homeScreen, tabBarScreen)
    │                    auth.fixture    (loggedInHome = loginAs(...) + use(homeScreen))
    │
 flows/            ──►  loginAs(loginScreen, homeScreen, creds)
    │
 screens/ + components/ ► LoginScreen, HomeScreen, TabBar   (extend BaseScreen)
    │
 core/             ──►  BaseScreen, gestures, device helpers, logger
    │
 @mobilewright/test ──► `screen` / `device` fixtures → mobilecli → Android device
```

Design rules used in this project:

1. **Tests contain no locators.** Locators live in screens and components only.
2. **Every screen defines "loaded".** `waitUntilLoaded()` is abstract in `BaseScreen`, so flows can synchronise on any screen the same way.
3. **Fixtures hide setup.** A test asks for `loginScreen` or `loggedInHome` by name; construction and login happen in the fixture.
4. **Flows are reusable sequences.** Anything spanning more than one screen goes in `src/flows/`.
5. **Credentials never live in code.** They come from `.env` through `config/env.ts`.

### What happens before each test

Mobilewright's `device` fixture runs for every test: allocate a device → connect → terminate the app if running → launch it → run the test → disconnect and release. Keep this in mind when judging execution time: setup is repeated per test, not per run.

## Technologies & Dependencies

| Package | Purpose |
|---|---|
| `mobilewright` | CLI, config helper, `expect`, device connection |
| `@mobilewright/test` | Playwright-based test runner with `screen` and `device` fixtures |
| `dotenv` | Loads `.env` into `process.env` |
| `typescript` | Type checking (`npm run typecheck`) |
| `@types/node` | Node.js typings |

## Test Cases

| ID | Suite | Test Case | Description |
|---|---|---|---|
| TC_01 | smoke | open apps | App launches and the home screen is shown |
| TC_02 | smoke | open apps and navigate to login page | Open the menu, tap Login, login screen is shown |
| TC_03 | regression / auth | rejects invalid credentials | Login with `users.invalid`, the account error message is shown |
| TC_04 | regression / auth | login with valid credentials | Login with the standard user, then open the menu and log out |

The same app and login flow are also covered in [robot-appium](https://github.com/fahmi-wiradika/robot-appium) (login, cancel logout, confirm logout), which makes it easy to compare the two frameworks side by side.

## Performance: Mobilewright vs Robot Framework + Appium

Mobilewright noticeably improves test execution speed. Running the exact same login flow against the same app, the Mobilewright suite finishes in **17s**, compared to **44s** for the Robot Framework + Appium suite.

| Framework | Suite | Execution Time |
|---|---|---|
| Mobilewright (this repo) | `tests/regression/auth/login.test.ts` | **17s** |
| Robot Framework + Appium ([robot-appium](https://github.com/fahmi-wiradika/robot-appium)) | `sauce_login.robot` | 44s |

That is roughly **2.6x faster** (about **61% less** execution time) for the same flow.

> These timings are measured by the repository author on the same app and flow. Absolute numbers vary with the device, emulator state and machine, so re-run both suites in your own environment to compare.

---

## Getting Started

### Prerequisites

- **Node.js 22.12+** (required by Mobilewright)
- npm
- Android Studio + Android SDK (for an emulator) or a physical device connected via USB
- ADB available in your `PATH`
- The Sauce Labs My Demo App installed on the device, or its APK available locally

### Installation

```bash
# Clone the repository
git clone https://github.com/fahmi-wiradika/mobilewright-automation.git
cd mobilewright-automation

# Install dependencies
npm install

# Create your environment file
cp .env.sample .env        # macOS/Linux
# copy .env.sample .env    # Windows
```

### Environment Variables

Edit `.env`:

```dotenv
APP_PACKAGE=com.saucelabs.mydemoapp.android
APK_PATH=
DEVICE_NAME=
TEST_ENV=staging
TEST_USER_EMAIL=<your test user email>
TEST_USER_PASSWORD=<your test user password>
```

| Variable | Required | Description |
|---|---|---|
| `APP_PACKAGE` | No | Android package under test. Defaults to `com.example.myapp`, so set it |
| `APK_PATH` | No | Path to an APK to install before launching, e.g. `./apps/app-debug.apk`. Leave empty if the app is already installed |
| `DEVICE_NAME` | No | Regex to pick a device by name. Empty = first available device |
| `TEST_ENV` | No | Environment label. Defaults to `staging` |
| `TEST_USER_EMAIL` | **Yes** | Valid user email. Tests fail on startup if missing |
| `TEST_USER_PASSWORD` | **Yes** | Valid user password. Tests fail on startup if missing |

> `.env` is gitignored. Never commit real credentials.

### Device Setup

#### **Emulator**

Create and start an Android emulator (see the [robot-appium setup guide](https://github.com/fahmi-wiradika/robot-appium#device-setup) for the full `sdkmanager` / `avdmanager` walkthrough), then start it:

```bash
emulator -avd Pixel_API34
```

#### **Real Device**

Enable Developer Options + USB Debugging on your device and connect via USB.

Finally, verify the device is visible:

```bash
adb devices
npm run devices
npm run doctor      # checks your environment for mobile development readiness
```

## Running Tests

| Command | What it does |
|---|---|
| `npm test` | Run every test under `tests/` |
| `npm run test:smoke` | Run `tests/smoke` only |
| `npm run test:regression` | Run `tests/regression` only |
| `npm run test:report` | Run all tests with the HTML reporter |
| `npm run report` | Open the last HTML report |
| `npm run devices` | List connected devices, simulators and emulators |
| `npm run doctor` | Check environment readiness |
| `npm run typecheck` | Type-check the project without running tests |

```bash
# Run a single test by name
npx mobilewright test --grep "navigate to login page"

# List all tests without running them
npx mobilewright test --list

# Run one file
npx mobilewright test tests/regression/auth/login.test.ts

# Show internal timing logs (device allocation, connect, launch)
DEBUG=mw:* npx mobilewright test tests/smoke
```

Output is written to:
- `mobilewright-report/` — HTML report (reporter is set to `html` in the config). Not covered by `.gitignore` yet, so add it before committing
- `artifacts/test-results/` — per-test artifacts such as screenshots and view tree on failure

## Configuration

Runner settings are centralised in `mobilewright.config.ts`:

```typescript
export default defineConfig({
  platform: 'android',
  bundleId: app.packageName,
  testDir: './tests',
  outputDir: './artifacts/test-results',
  timeout: 60_000,          // per-test timeout
  retries: 1,               // retry a failed test once
  workers: 1,               // tests run one after another on one device
  reporter: 'html',         // switch to 'list' for console output
  viewTree: 'on-failure',   // attach the accessibility tree when a test fails

  use: {
    actionTimeout: 5_000,       // tap / fill timeout
    appLaunchTimeout: 20_000,   // wait for the app to reach foreground
    installTimeout: 120_000,    // APK install timeout
    animations: 'off',          // disable device animations for stability
  },
  expect: { timeout: 5_000 },   // assertion timeout
});
```

Path aliases are declared in `tsconfig.json`:

| Alias | Maps to |
|---|---|
| `@core/*` | `src/core/*` |
| `@screens/*` | `src/screens/*` |
| `@components/*` | `src/components/*` |
| `@flows/*` | `src/flows/*` |
| `@fixtures` | `src/fixtures/index.ts` |
| `@data/*` | `src/data/*` |
| `@config/*` | `config/*` |

## Writing a New Test

1. **Add a screen** in `src/screens/<area>/<name>.screen.ts`, extend `BaseScreen`, and implement `waitUntilLoaded()`:

   ```typescript
   import { BaseScreen } from '@core/base.screen';
   import { expect } from '@mobilewright/test';

   export class CartScreen extends BaseScreen {
     // use the resource id of any element unique to this screen
     private title = () => this.screen.getByTestId('com.saucelabs.mydemoapp.android:id/<element-id>');

     async waitUntilLoaded() {
       await expect(this.title()).toBeVisible();
     }
   }
   ```

2. **Register it as a fixture** in `src/fixtures/screen.fixture.ts`:

   ```typescript
   cartScreen: async ({ screen }, use) => use(new CartScreen(screen)),
   ```

3. **Write the test** in `tests/smoke/` or `tests/regression/<area>/`:

   ```typescript
   import { test } from '@fixtures';

   test('cart opens', async ({ cartScreen }) => {
     await cartScreen.waitUntilLoaded();
   });
   ```

Need a logged-in starting point? Use the `loggedInHome` fixture instead of repeating the login steps.

## Troubleshooting

### `Missing env var: TEST_USER_EMAIL`

`config/env.ts` throws at import time when credentials are empty, and every test imports it through the fixtures. Copy `.env.sample` to `.env` and fill in `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`.

### No device found / wrong device selected

- Run `npm run devices` to see what Mobilewright can reach
- Make sure the emulator is fully booted before running tests
- For real devices, confirm USB Debugging is enabled and the device is trusted
- Use `DEVICE_NAME` (a regex) in `.env` to choose between several devices

### App does not launch

- Check `APP_PACKAGE` matches the installed package (`com.saucelabs.mydemoapp.android`)
- If the app is not installed, set `APK_PATH` to the APK in `apps/`
- Increase `appLaunchTimeout` in `mobilewright.config.ts` on slow devices

### Element not found / timeout

- Run `npx mobilewright inspect` to open the Mobilewright Inspector and verify locators against the current app version
- Check the view tree attached to the failed test in the HTML report
- Raise `actionTimeout` / `expect.timeout` only after confirming the locator is correct

### Slow test execution

Device setup and app relaunch happen for every test. Use `DEBUG=mw:*` to see where time goes, and start the emulator before the run so allocation does not include a cold boot.

### Path alias not resolving

Aliases such as `@screens/*` are defined in `tsconfig.json`. Run `npm run typecheck` to confirm the editor and compiler agree.

---

## Quick Links

- **Mobilewright**: [https://mobilewright.dev](https://mobilewright.dev)
- **Mobilewright on GitHub**: [https://github.com/mobile-next/mobilewright](https://github.com/mobile-next/mobilewright)
- **Sauce Labs Demo App Releases**: [https://github.com/saucelabs/my-demo-app-android/releases](https://github.com/saucelabs/my-demo-app-android/releases)
- **robot-appium (Robot Framework counterpart)**: [https://github.com/fahmi-wiradika/robot-appium](https://github.com/fahmi-wiradika/robot-appium)
- **Project Documentation**: [https://fahmi-wiradika.github.io](https://fahmi-wiradika.github.io)