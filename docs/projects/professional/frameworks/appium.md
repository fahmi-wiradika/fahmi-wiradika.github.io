# Robot Framework – Mobile Automation with Appium

A mobile test automation project built with **Robot Framework** and **Appium** targeting **Android** (emulator & real device), using the [Sauce Labs My Demo App](https://github.com/saucelabs/my-demo-app-android/releases/tag/2.2.0) as the application under test.

## 🚀 Features

- **Mobile UI Automation**: Robot Framework + AppiumLibrary for Android app testing
- **Emulator & Real Device Support**: configurable device targets via capabilities
- **Page Object–style Structure**: locators, keywords, and variables separated by concern
- **Suite-level Setup/Teardown**: single app launch per suite for faster execution
- **Behavior-driven Test Organization**: tests structured under `tests/behavior/`

## 📈 Framework Metrics

- **Language**: Python (Robot Framework DSL)
- **Test Runner**: Robot Framework
- **Mobile Driver**: Appium 2 + UiAutomator2
- **Device Target**: Android Emulator (`emulator-5554`) / Real Device (USB)
- **App Under Test**: Sauce Labs My Demo App Android v2.2.0

## 📁 Project Structure

```
robot-appium/
├── sauce-labs-mobile/
│   ├── resources/
│   │   ├── config/
│   │   │   └── capabilities.robot          # Device & server capabilities
│   │   ├── keywords/
│   │   │   ├── common_keywords.robot       # App open/close keywords
│   │   │   └── sauce_keywords.robot        # Feature-specific action keywords
│   │   ├── locators/
│   │   │   └── sauce_locators.robot        # Element locators (resource-id / xpath)
│   │   └── variables/
│   │       └── varibles.robot              # Test data (credentials, etc.)
│   └── tests/
│       └── behavior/
│           └── sauce_login.robot           # Login & logout test cases
├── results/                                # Test output (gitignored)
├── requirement.txt                         # Python dependencies
└── README.md
```

## 🗂️ Directory Overview

| Directory / File | Purpose |
|---|---|
| `resources/config/capabilities.robot` | Appium desired capabilities (platform, device, app, server) |
| `resources/keywords/common_keywords.robot` | Reusable open/close app keywords |
| `resources/keywords/sauce_keywords.robot` | UI interaction keywords (login, logout, navigation) |
| `resources/locators/sauce_locators.robot` | Element locators — resource-id and XPath |
| `resources/variables/varibles.robot` | Test data variables (username, password) |
| `tests/behavior/sauce_login.robot` | Login and logout test suite |
| `results/` | Robot Framework output (XML, HTML log, report) — gitignored |

## 🛠️ Technologies & Dependencies

| Package | Purpose |
|---|---|
| `robotframework` | Core test framework and runner |
| `robotframework-appiumlibrary` | Appium keywords for Robot Framework |
| `Appium-Python-Client` | Python client for Appium server communication |

## ✅ Test Cases

| ID | Test Case | Description |
|---|---|---|
| TC_01 | Login with Valid Credentials | Navigate to login, input valid credentials, submit |
| TC_02 | Cancel Logout | Open nav menu, tap logout, cancel the confirmation dialog |
| TC_03 | Confirm Logout | Open nav menu, tap logout, confirm to log out |

## 🚦 Getting Started

### Prerequisites

- Python 3.8+
- Java JDK (for Android SDK)
- Node.js (for Appium server)
- Appium 2 installed globally
- UiAutomator2 driver installed
- Android Studio + Android SDK (for emulator) or a physical device connected via USB
- ADB available in your PATH

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

#### **Emulator** 
Download Android Command Line Tools and SDK Platform Tools. Extract them to a directory

```bash
export ANDROID_HOME=$HOME/android-sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

Setup Android Platform using sdkmanager command

```bash
# Accept all licenses first
sdkmanager --list
sdkmanager --licenses

# Install essential packages
sdkmanager "platform-tools"
sdkmanager "emulator"
sdkmanager "platforms;android-34"
sdkmanager "build-tools;34.0.0"
sdkmanager "system-images;android-34;google_apis;x86_64"

# verify installed package
sdkmanager --list_installed
```

Create emulator via AVD Manager

```bash
# Create AVD
avdmanager create avd  
    --name "Pixel_API34"  
    --package "system-images;android-34;google_apis;x86_64"  
    --device "pixel_6"

# List available AVDs
avdmanager list avd
```

Launch your AVD from Android Studio AVD Manager

```bash
# Start the emulator (headless = no window, useful for CI)
emulator -avd Pixel_API34 -no-snapshot-load

# Or with window UI
emulator -avd Pixel_API34
```

Finally, verify device visible

```bash
adb devices
# Should show: emulator-5554   device
```

#### **Real Device** 
Enable Developer Options + USB Debugging on your device, connect via USB, then verify with `adb devices`.

## ▶️ Running Tests

```bash
# Run the full login suite
robot -d results sauce-labs-mobile/tests/behavior/sauce_login.robot

# Run a single test case by name
robot -d results -t "TC_01 - Login with Valid Credentials" sauce-labs-mobile/tests/behavior/sauce_login.robot
```

Reports are generated under `results/`:
- `results/log.html` — detailed step-by-step log
- `results/report.html` — summary report

## ⚙️ Configuration

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

## 🐛 Troubleshooting

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

## 🔗 Quick Links

- **Appium Docs**: [Appium Server](https://appium.io/docs/en/latest/)
- **AppiumLibrary (Robot Framework)**: [Robot Appium](https://serhatbolsu.github.io/robotframework-appiumlibrary/AppiumLibrary.html)
- **Sauce Labs Demo App Releases**: [Sauce Labs Android Apps](https://github.com/saucelabs/my-demo-app-android/releases)
- **Project Documentation**: [Appium Project](../frameworks/appium.md)
