# Robot Framework – Mobile Automation with Appium

A mobile test automation project built with **Robot Framework** and **Appium** targeting **Android** (emulator & real device), using the [Sauce Labs My Demo App](https://github.com/saucelabs/my-demo-app-android/releases/tag/2.2.0) as the application under test.

## Features

- **Mobile UI Automation**: Robot Framework + AppiumLibrary for Android app testing
- **Emulator & Real Device Support**: configurable device targets via capabilities
- **Page Object–style Structure**: locators, keywords, and variables separated by concern
- **Suite-level Setup/Teardown**: single app launch per suite for faster execution
- **Behavior-driven Test Organization**: tests structured under `tests/behavior/`
- **Visual Testing (Cloud)**: Applitools Eyes integration via `eyes-robotframework`
- **Visual Testing (Local)**: RobotEyes integration via ImageMagick pixel diffing — no cloud required

## Framework Metrics

- **Language**: Python (Robot Framework DSL)
- **Test Runner**: Robot Framework
- **Mobile Driver**: Appium 2 + UiAutomator2
- **Device Target**: Android Emulator (`emulator-5554`) / Real Device (USB)
- **App Under Test**: Sauce Labs My Demo App Android v2.2.0

## Project Structure

```
robot-appium/
├── sauce-labs-mobile/
│   ├── resources/
│   │   ├── config/
│   │   │   └── capabilities.robot              # Device & server capabilities
│   │   ├── keywords/
│   │   │   ├── common_keywords.robot           # App open/close keywords
│   │   │   └── sauce_keywords.robot            # Feature-specific action keywords
│   │   ├── locators/
│   │   │   └── sauce_locators.robot            # Element locators (resource-id / xpath)
│   │   └── variables/
│   │       └── varibles.robot                  # Test data (credentials, etc.)
│   └── tests/
│       ├── behavior/
│       │   ├── sauce_login.robot               # Standard login & logout test cases
│       │   └── sauce_login_eyes.robot          # Same suite + Applitools Eyes checkpoints
│       └── component/
│           ├── sauce_login_eyes.robot          # Applitools Eyes (component scope)
│           └── sauce_login_robot_eyes.robot    # RobotEyes visual regression (local/free)
├── visual_images/
│   └── baseline/                               # RobotEyes baseline screenshots (committed)
├── applitools.yaml                             # Applitools SDK configuration
├── results/                                    # Test output (gitignored)
├── requirement.txt                             # Python dependencies
└── README.md
```

## Directory Overview

| Directory / File | Purpose |
|---|---|
| `resources/config/capabilities.robot` | Appium desired capabilities (platform, device, app, server) |
| `resources/keywords/common_keywords.robot` | Reusable open/close app keywords |
| `resources/keywords/sauce_keywords.robot` | UI interaction keywords (login, logout, navigation) |
| `resources/locators/sauce_locators.robot` | Element locators — resource-id and XPath |
| `resources/variables/varibles.robot` | Test data variables (username, password) |
| `tests/behavior/sauce_login.robot` | Login and logout test suite (no visual testing) |
| `tests/behavior/sauce_login_eyes.robot` | Login suite with Applitools Eyes checkpoints |
| `tests/component/sauce_login_eyes.robot` | Applitools Eyes component-level tests |
| `tests/component/sauce_login_robot_eyes.robot` | RobotEyes pixel-diff visual regression tests |
| `visual_images/baseline/` | RobotEyes baseline images — commit these to version control |
| `applitools.yaml` | Applitools SDK config (api key, app name, batch, runner type) |
| `results/` | Robot Framework output (XML, HTML log, report) — gitignored |

## Technologies & Dependencies

| Package | Purpose |
|---|---|
| `robotframework` | Core test framework and runner |
| `robotframework-appiumlibrary` | Appium keywords for Robot Framework |
| `Appium-Python-Client` | Python client for Appium server communication |
| `eyes-robotframework` | Applitools Eyes visual testing SDK |
| `robotframework-eyes` | RobotEyes local visual regression via ImageMagick |

## Test Cases

| ID | Test Case | Description |
|---|---|---|
| TC_01 | Login with Valid Credentials | Navigate to login, input valid credentials, submit |
| TC_02 | Cancel Logout | Open nav menu, tap logout, cancel the confirmation dialog |
| TC_03 | Confirm Logout | Open nav menu, tap logout, confirm to log out |

Each suite variant (standard / Applitools / RobotEyes) runs the same three cases with different visual checkpoint strategies.

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js (for Appium server)
- Appium 2 installed globally
- UiAutomator2 driver installed
- Android Studio + Android SDK (for emulator) or a physical device connected via USB
- ADB available in your PATH
- **For RobotEyes**: [ImageMagick](https://imagemagick.org/script/download.php) installed and available in your PATH

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd robot-appium

# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirement.txt
```

### Appium Setup

```bash
# Install Appium globally (if not already)
npm install -g appium

# Install UiAutomator2 driver
appium driver install uiautomator2

# Start Appium server
appium
```

### Device Setup

**Emulator**: Launch your AVD from Android Studio AVD Manager, then verify it's visible:

```bash
adb devices
# Should show: emulator-5554   device
```

**Real Device**: Enable Developer Options + USB Debugging on your device, connect via USB, then verify with `adb devices`.

---

## Running Tests

### Standard Tests (no visual testing)

```bash
# Run the full login suite
robot -d results sauce-labs-mobile/tests/behavior/sauce_login.robot

# Run a single test case by name
robot -d results -t "TC_01 - Login with Valid Credentials" sauce-labs-mobile/tests/behavior/sauce_login.robot
```

Reports are generated under `results/`:
- `results/log.html` — detailed step-by-step log
- `results/report.html` — summary report

---

## Visual Testing — Applitools Eyes

Applitools Eyes is used for cloud-based AI-powered visual testing. Checkpoints are compared against a baseline stored on the Applitools dashboard.

### Setup

1. Sign up for a free account at [applitools.com](https://applitools.com)
2. Copy your API key from the Applitools dashboard
3. Open `applitools.yaml` and replace the placeholder with your key:

```yaml
# applitools.yaml
api_key: YOUR_APPLITOOLS_API_KEY

app_name: Sauce Labs Demo App

batch:
  name: Robot Appium - Login Suite

mobile_native:
  save_new_tests: true
```

> The `save_new_tests: true` flag automatically accepts the first run as the baseline. Set it to `false` once your baseline is established.

### Running Applitools Tests

```bash
# behavior scope
robot -d results sauce-labs-mobile/tests/behavior/sauce_login_eyes.robot

# component scope
robot -d results sauce-labs-mobile/tests/component/sauce_login_eyes.robot
```

Results are visible on the **Applitools Dashboard** at [eyes.applitools.com](https://eyes.applitools.com). Each run creates a batch under the name configured in `applitools.yaml`.

### How It Works

The suite uses `EyesLibrary` with `runner=mobile_native`. Visual checkpoints are added with `Eyes Check Window` at key app states (e.g. Login Screen, Post Login, Logout Dialog). On the first run, these become the baseline. Subsequent runs diff against that baseline and flag any visual deviations.

---

## Visual Testing — RobotEyes (Free / Local)

RobotEyes is a free, open-source alternative to cloud visual testing. It uses **ImageMagick** for pixel-level diff comparison with no external service required. Baseline images are stored locally in `visual_images/baseline/` and committed to the repository.

### Prerequisites

Install ImageMagick and ensure `magick` (or `convert` on Linux/macOS) is accessible from your terminal:

```bash
# Verify ImageMagick is installed
magick --version
# or
convert --version
```

### Baseline Directory Structure

```
visual_images/
├── baseline/        ← commit these; source of truth for comparisons
├── actual/          ← gitignored; screenshots from the current run
└── diff/            ← gitignored; diff images generated on mismatch
```

### First Run — Generate Baseline

On the first run, pass `visual_images/baseline` as the `images_dir` variable. RobotEyes will save screenshots here as the baseline (no comparison is done yet):

```bash
robot -d results \
  -v images_dir:visual_images/baseline \
  sauce-labs-mobile/tests/component/sauce_login_robot_eyes.robot
```

After this run, **commit the baseline images** to version control:

```bash
git add visual_images/baseline/
git commit -m "chore: add RobotEyes baseline screenshots"
```

### Subsequent Runs — Compare Against Baseline

Re-run with the same `images_dir` pointing at the baseline. RobotEyes will capture new screenshots to `visual_images/actual/`, diff them against `visual_images/baseline/`, and write any differences to `visual_images/diff/`:

```bash
robot -d results \
  -v images_dir:visual_images/baseline \
  sauce-labs-mobile/tests/component/sauce_login_robot_eyes.robot
```

The test fails if the pixel difference exceeds the configured tolerance.

### Updating the Baseline

When UI changes are intentional, delete the relevant baseline images and re-run to regenerate them:

```bash
# Delete specific baseline images
rm visual_images/baseline/login_screen.png

# Or clear all baselines and regenerate
rm -rf visual_images/baseline/*
robot -d results \
  -v images_dir:visual_images/baseline \
  sauce-labs-mobile/tests/component/sauce_login_robot_eyes.robot

git add visual_images/baseline/
git commit -m "chore: update RobotEyes baseline after UI change"
```

### How It Works

Each test case calls:
1. `Open Eyes    AppiumLibrary    <tolerance>` — initialise RobotEyes with a pixel diff tolerance (e.g. `5`)
2. `Capture Full Screen    name=<checkpoint_name>` — take a screenshot at a key state
3. `Compare Images` — diff all captured images against baseline and fail on mismatch

---

## Configuration

Device and server settings are centralized in `sauce-labs-mobile/resources/config/capabilities.robot`:

```robot
${PLATFORM_NAME}        Android
${PLATFORM_VERSION}     15
${DEVICE_NAME}          emulator-5554
${APP_PACKAGE}          com.saucelabs.mydemoapp.android
${APP_ACTIVITY}         com.saucelabs.mydemoapp.android.view.activities.SplashActivity
${APPIUM_URL}           http://localhost:4723
${AUTOMATION_NAME}      UiAutomator2
```

To switch to a real device, replace `${DEVICE_NAME}` with your device UDID from `adb devices`.

---

## Troubleshooting

### `SecurityException: Permission Denial` on app launch

This happens on Android 12+ when `appActivity` points to a non-exported activity. Run the following to find the correct launcher activity:

```powershell
adb -s emulator-5554 shell dumpsys package com.saucelabs.mydemoapp.android | Select-String "Activity"
```

Use the activity shown in the resolver table (e.g. `SplashActivity`) as your `${APP_ACTIVITY}`.

### `adb devices` shows no device

- Ensure the emulator is fully booted before running tests
- For real devices, confirm USB Debugging is enabled and the device is trusted

### Element not found / timeout

- Open **Appium Inspector**, connect to your session, and verify locators match the current app version
- Increase `newCommandTimeout` in `common_keywords.robot` if the device is slow to respond

### Applitools — `Eyes not opened` or API key errors

- Confirm `api_key` is set correctly in `applitools.yaml` (not the placeholder value)
- Verify the YAML path passed to `EyesLibrary` matches the actual file location: `config=${CURDIR}/../../../applitools.yaml`
- Ensure `runner=mobile_native` is set; this is required for Appium native app sessions

### RobotEyes — `ImageMagick not found` or comparison errors

- Confirm ImageMagick is installed and `magick`/`convert` is in your `PATH`
- On Windows, the installer must add ImageMagick to PATH — verify with `magick --version` in a new terminal
- If baseline images are missing, run with `images_dir:visual_images/baseline` first to generate them

---

## Quick Links

- **Appium Docs**: [Appium Server](https://appium.io/docs/en/latest/)
- **AppiumLibrary (Robot Framework)**: [Robot Appium](https://serhatbolsu.github.io/robotframework-appiumlibrary/AppiumLibrary.html)
- **Applitools Eyes Robot Framework SDK**:[Applitools Visual Test](https://pypi.org/project/eyes-robotframework/)
- **RobotEyes (jessezach)**: [Robot Eyes Repository](https://github.com/jessezach/RobotEyes)
- **Sauce Labs Demo App Releases**: [Sauce Labs Android Apps](https://github.com/saucelabs/my-demo-app-android/releases)
- **Project Documentation**: [Appium Project](../frameworks/appium.md)
