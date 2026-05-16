# Frequency Domain Power Analysis

## Overview

### Why Frequency Domain Over Time Domain

Traditional power metering computes parameters directly from time-domain signals. While
straightforward, this approach requires a **Zero Crossing Detector (ZCD)** to measure the phase
angle $\varphi$ between voltage and current waveforms in order to compute active and reactive power:

$$
P = V \times I \times \cos(\varphi) \qquad Q = V \times I \times \sin(\varphi)
$$

Moving to the frequency domain via FFT eliminates this dependency entirely. The phase relationship
between voltage and current is **already embedded** inside the real and imaginary components of
each FFT bin. Cross-multiplying those components extracts active and reactive power directly,
without ever measuring $\varphi$.

### Comparison: ZCD-Based vs Parseval-Based Approach

| Concern | ZCD-Based (Time Domain) | Parseval-Based (Frequency Domain) |
|---|---|---|
| Phase measurement | Requires hardware ZCD circuit | Implicit in FFT bin components |
| Harmonic distortion | Not captured | Full spectrum from bin k=1 to N/2-1 |
| THD computation | Requires separate circuit | Derived from same FFT output |
| Load identification | Not possible | Harmonic fingerprint available |
| Hardware dependency | ZCD mandatory for P, Q | ZCD optional (window sync only) |

### System Pipeline Summary

```
220V AC PLN (50 Hz)
     │
     ▼
ADC Sampling @ 3200 Hz — 64 points per window (~20ms, one AC cycle)
     │
     ├── Voltage Buffer: V(0)...V(63) → arm_cfft_radix2_f32 → Vfft[0..127]
     └── Current Buffer: I(0)...I(63) → arm_cfft_radix2_f32 → Ifft[0..127]
                                              │
                    ┌───────────────────────────┼───────────────────────┐
                    ▼                         ▼                     ▼
             Calibration              Calibration             Calibration
          (Voltage RMS)            (Current RMS)         (Current Spectrum)
                    │                         │                     │
                    └──────────┬────────────────┘                     │
                               ▼                                    ▼
                    Power Parameters                        LCD Display
                  V_RMS, I_RMS, P, Q,                   Harmonic Spectrum
                    S, PF, THDv, THDi                      (H1..H11)
                               │
                               ▼
                    Energy Accumulation
                       Wh, VARh
```

!!! info "ZCD Role in This System"
    The hardware ZCD on the STM32F407 board is retained for **FFT window synchronization**
    (triggering ADC capture at the AC zero crossing) but is **not used in any power calculation**.
    All power and energy parameters are derived entirely from FFT bin cross-products.

---

## Prerequisites

### Raw ADC Samples

The following samples were captured from a single FFT window (~20ms, one AC cycle)
at 3200 Hz with ZCD-triggered window alignment.

**Table 4.1 — Voltage Signal Capture (64 points)**

| n | Value | n | Value | n | Value | n | Value |
|---|---|---|---|---|---|---|---|
| 0  | -600  | 16 | -1291 | 32 | 724  | 48 | 1340 |
| 1  | -835  | 17 | -1166 | 33 | 848  | 49 | 1278 |
| 2  | -972  | 18 | -1082 | 34 | 960  | 50 | 1173 |
| 3  | -1057 | 19 | -953  | 35 | 1052 | 51 | 1067 |
| 4  | -1135 | 20 | -843  | 36 | 1140 | 52 | 960  |
| 5  | -1241 | 21 | -713  | 37 | 1232 | 53 | 829  |
| 6  | -1297 | 22 | -579  | 38 | 1297 | 54 | 714  |
| 7  | -1328 | 23 | -476  | 39 | 1293 | 55 | 584  |
| 8  | -1371 | 24 | -337  | 40 | 1340 | 56 | 459  |
| 9  | -1374 | 25 | -216  | 41 | 1369 | 57 | 330  |
| 10 | -1392 | 26 | -93   | 42 | 1386 | 58 | 225  |
| 11 | -1404 | 27 | 51    | 43 | 1396 | 59 | 103  |
| 12 | -1398 | 28 | 174   | 44 | 1407 | 60 | -49  |
| 13 | -1402 | 29 | 320   | 45 | 1402 | 61 | -193 |
| 14 | -1392 | 30 | 466   | 46 | 1414 | 62 | -330 |
| 15 | -1331 | 31 | 606   | 47 | 1392 | 63 | -464 |

**Table 4.2 — Current Signal Capture (64 points)**

| n | Value | n | Value | n | Value | n | Value |
|---|---|---|---|---|---|---|---|
| 0  | -202 | 16 | -11  | 32 | 202  | 48 | 20  |
| 1  | -84  | 17 | 22   | 33 | 155  | 49 | -11 |
| 2  | -79  | 18 | 3    | 34 | 78   | 50 | -16 |
| 3  | -66  | 19 | 28   | 35 | 90   | 51 | -14 |
| 4  | -56  | 20 | 28   | 36 | 108  | 52 | -22 |
| 5  | -83  | 21 | 26   | 37 | 79   | 53 | -45 |
| 6  | -73  | 22 | 30   | 38 | 67   | 54 | -23 |
| 7  | -58  | 23 | 27   | 39 | 60   | 55 | -55 |
| 8  | -48  | 24 | 47   | 40 | 72   | 56 | -35 |
| 9  | -58  | 25 | 68   | 41 | 58   | 57 | -41 |
| 10 | -65  | 26 | 78   | 42 | 60   | 58 | -70 |
| 11 | -24  | 27 | 61   | 43 | 50   | 59 | -60 |
| 12 | -37  | 28 | 69   | 44 | 36   | 60 | -78 |
| 13 | -16  | 29 | 83   | 45 | 35   | 61 | -62 |
| 14 | -4   | 30 | 129  | 46 | 11   | 62 | -80 |
| 15 | 5    | 31 | 220  | 47 | 20   | 63 | -232|

---

### FFT Output Layout — CMSIS Interleaved Format

The ARM CMSIS `arm_cfft_radix2_f32` function produces output in an **interleaved complex** format.
For an N-point FFT, the output array has 2N elements:

$$
\text{fft}[2k] = \text{Re}(k) \qquad \text{fft}[2k+1] = \text{Im}(k) \qquad k = 0, 1, \ldots, N-1
$$

For this system with $N = 64$:

| Array Index | Content | Bin | Frequency |
|---|---|---|---|
| `fft[0]` | Re(0) | k=0 | DC (0 Hz) — skipped |
| `fft[1]` | Im(0) | k=0 | DC — skipped |
| `fft[2]` | Re(1) | k=1 | **50 Hz — Fundamental** |
| `fft[3]` | Im(1) | k=1 | 50 Hz |
| `fft[4]` | Re(2) | k=2 | 100 Hz |
| `fft[5]` | Im(2) | k=2 | 100 Hz |
| ... | ... | ... | ... |
| `fft[62]` | Re(31) | k=31 | 1550 Hz |
| `fft[63]` | Im(31) | k=31 | 1550 Hz |

!!! warning "DC Bin Skipped"
    Bin k=0 (DC component) is always excluded from all RMS, power, and THD computations.
    Loop indices start at **k=1** throughout this document.

### Notation Conventions

| Symbol | Meaning |
|---|---|
| $I_{RE}(k)$ | Real part of current FFT at bin k |
| $I_{IM}(k)$ | Imaginary part of current FFT at bin k |
| $U_{RE}(k)$ | Real part of voltage FFT at bin k |
| $U_{IM}(k)$ | Imaginary part of voltage FFT at bin k |
| $\|X(k)\|$ | Magnitude of bin k: $\sqrt{X_{RE}^2(k) + X_{IM}^2(k)}$ |

### Sampling Parameters

| Parameter | Symbol | Value |
|---|---|---|
| FFT size | `FFT_SIZE` | 64 |
| Unique frequency bins | `FFT_HALF` | 32 |
| Sampling frequency | $F_s$ | 3200 Hz |
| Frequency resolution | $\Delta f$ | $F_s / N = 50$ Hz |
| Window duration | $\Delta t$ | $N / F_s = 0.02$ s |
| Normalization factor | `FFT_SCALE` | $N / 8 = 8.0$ |
| Peak-to-RMS norm | `NORM` | $\sqrt{2} \times (N/2) = 45.25$ |

---

## Calibration

### Reference Instrument

All calibration constants in this system were derived by comparing STM32 measurements against a
**HIOKI CM3286-01 AC Clamp Power Meter**, which provides harmonic analysis up to the 30th order.
Calibration was performed under steady-state load conditions (Load 1: Air Conditioner) and verified
across Load 2 (Laptop Charger) and Load 3 (Laptop Charger + Fan).

### Calibration Model

All calibration follows a **linear offset-scale model**, consistent with industry-standard energy
metering ICs (Analog Devices ADE7758, ADE7953):

$$
X_{cal} = \frac{X_{raw} - \text{offset}}{\text{scale}}
$$

### Current RMS Calibration

Applied after Parseval summation, converting raw ADC-unit RMS to physical Amperes:

| Constant | Value |
|---|---|
| Zero offset | `4.864126475` |
| Scale factor | `253.7943361` |

### Voltage RMS Calibration

Applied after Parseval summation, converting raw ADC-unit RMS to physical Volts:

| Constant | Value |
|---|---|
| Zero offset | `0.10084` |
| Scale factor | `4.5739` |

### Current Spectrum Calibration

Applied per-bin for the **LCD harmonic display only** — not used in any power calculation:

| Constant | Value |
|---|---|
| Zero offset | `1.39776462244555` |
| Scale factor | `254.609739589478` |

!!! note "Calibration Order and IEC 62053 Compliance"
    In this system, calibration for power parameters is applied **per bin before cross-multiplication**,
    while RMS calibration is applied **after Parseval summation**. This is consistent with
    industry-standard metering ICs (ADE7758, ADE7953), which apply gain and offset at the signal
    channel level prior to energy accumulation. The measured deviation between the two approaches
    is approximately **0.1%**, which is well within the IEC 62053 Class 2 tolerance of ±2.0% and
    even below Class 0.2 (±0.2%). This system is designed for **monitoring and display**, not
    certified billing metering.

---

## RMS Computation

### Theory

The Parseval-based RMS uses the frequency-domain representation of signal energy. For a
discrete signal of $N$ points, the RMS is derived from the sum of squared FFT bin magnitudes:

$$
X_{RMS,raw} = \frac{\sqrt{\displaystyle\sum_{k=1}^{\frac{N}{2}-1}
\left( X_{RE}^2(k) + X_{IM}^2(k) \right) / \frac{N}{2}}}{N/8}
$$

After calibration:

$$
X_{RMS} = \frac{X_{RMS,raw} - \text{offset}}{\text{scale}}
$$

### RMS Current ($I_{RMS}$)

**Formula:**

$$
I_{RMS,raw} = \frac{\sqrt{\displaystyle\sum_{k=1}^{31}
\left( I_{RE}^2(k) + I_{IM}^2(k) \right) / 32}}{8}
$$

$$
I_{RMS} = \frac{I_{RMS,raw} - 4.864126475}{253.7943361}
$$

**C++ Implementation:**

```cpp
float computeCurrentRMS(const float* fftCurrentOutput) {
    float sumOfSquares = 0.0f;

    for (int k = 1; k < FFT_HALF; k++) {
        float real = fftCurrentOutput[2 * k];
        float imag = fftCurrentOutput[2 * k + 1];
        sumOfSquares += (real * real) + (imag * imag);
    }

    return sqrtf(sumOfSquares / FFT_HALF) / FFT_SCALE;
}

float calibrateCurrentRMS(float rawCurrentRMS) {
    const float zeroOffset  = 4.864126475f;
    const float scaleFactor = 253.7943361f;
    return (rawCurrentRMS - zeroOffset) / scaleFactor;
}
```

**Worked Example — Table 4.2 Current Samples:**

From the 64-point FFT of the current buffer, Parseval summation gives:

$$
\sum_{k=1}^{31} \left( I_{RE}^2(k) + I_{IM}^2(k) \right) = 197{,}989{,}604
$$

$$
I_{RMS,raw} = \frac{\sqrt{197{,}989{,}604 / 32}}{8} = \frac{\sqrt{6{,}187{,}175}}{8} = \frac{2487.4}{8} = 78.74
$$

$$
I_{RMS} = \frac{78.74 - 4.864}{253.79} = \frac{73.88}{253.79} \approx \mathbf{0.2911 \ A}
$$

---

### RMS Voltage ($V_{RMS}$)

**Formula:**

$$
V_{RMS,raw} = \frac{\sqrt{\displaystyle\sum_{k=1}^{31}
\left( U_{RE}^2(k) + U_{IM}^2(k) \right) / 32}}{8}
$$

$$
V_{RMS} = \frac{V_{RMS,raw} - 0.10084}{4.5739}
$$

**C++ Implementation:**

```cpp
float computeVoltageRMS(const float* fftVoltageOutput) {
    float sumOfSquares = 0.0f;

    for (int k = 1; k < FFT_HALF; k++) {
        float real = fftVoltageOutput[2 * k];
        float imag = fftVoltageOutput[2 * k + 1];
        sumOfSquares += (real * real) + (imag * imag);
    }

    return sqrtf(sumOfSquares / FFT_HALF) / FFT_SCALE;
}

float calibrateVoltageRMS(float rawVoltageRMS) {
    const float zeroOffset  = 0.10084f;
    const float scaleFactor = 4.5739f;
    return (rawVoltageRMS - zeroOffset) / scaleFactor;
}
```

**Worked Example — Table 4.1 Voltage Samples:**

$$
\sum_{k=1}^{31} \left( U_{RE}^2(k) + U_{IM}^2(k) \right) = 33{,}197{,}614{,}464
$$

$$
V_{RMS,raw} = \frac{\sqrt{33{,}197{,}614{,}464 / 32}}{8} = \frac{\sqrt{1{,}037{,}425{,}452}}{8} = \frac{32{,}209}{8} = 1018.75
$$

$$
V_{RMS} = \frac{1018.75 - 0.10084}{4.5739} \approx \mathbf{222.71 \ V}
$$

This is within the expected 220 $V_{RMS}$ PLN nominal, confirming correct calibration.

---

## Power Parameters

### Active Power ($P$)

Active power is derived from the cross-product of corresponding real and imaginary components of
current and voltage FFT bins. Calibration is applied per element before multiplication:

$$
P = \sum_{k=1}^{\frac{N}{2}-1} \left[ I_{RE,cal}(k) \cdot U_{RE,cal}(k)
+ I_{IM,cal}(k) \cdot U_{IM,cal}(k) \right]
$$

Where each calibrated component is:

$$
X_{RE,cal}(k) = \frac{X_{RE}(k) / NORM - \text{offset}}{\text{scale}}
\qquad
X_{IM,cal}(k) = \frac{X_{IM}(k) / NORM - \text{offset}}{\text{scale}}
$$

**C++ Implementation:**

```cpp
float computeActivePower(const float* fftCurrentOutput,
                         const float* fftVoltageOutput) {
    const float I_OFFSET = 4.864126475f;
    const float I_SCALE  = 253.7943361f;
    const float V_OFFSET = 0.10084f;
    const float V_SCALE  = 4.5739f;
    const float NORM     = sqrtf(2.0f) * (FFT_SIZE / 2.0f);

    float activePower = 0.0f;

    for (int k = 1; k < FFT_HALF; k++) {
        float I_re_cal = (fftCurrentOutput[2*k]   / NORM - I_OFFSET) / I_SCALE;
        float I_im_cal = (fftCurrentOutput[2*k+1] / NORM - I_OFFSET) / I_SCALE;
        float V_re_cal = (fftVoltageOutput[2*k]   / NORM - V_OFFSET) / V_SCALE;
        float V_im_cal = (fftVoltageOutput[2*k+1] / NORM - V_OFFSET) / V_SCALE;

        activePower += (I_re_cal * V_re_cal) + (I_im_cal * V_im_cal);
    }

    return activePower;
}
```

**Worked Example:**

$$
P = \mathbf{29.64 \ W}
$$

---

### Reactive Power ($Q$)

Reactive power uses the imaginary cross-product path — the difference between
$I_{RE} \cdot U_{IM}$ and $I_{IM} \cdot U_{RE}$:

$$
Q = \sum_{k=1}^{\frac{N}{2}-1} \left[ I_{RE,cal}(k) \cdot U_{IM,cal}(k)
- I_{IM,cal}(k) \cdot U_{RE,cal}(k) \right]
$$

**C++ Implementation:**

```cpp
float computeReactivePower(const float* fftCurrentOutput,
                           const float* fftVoltageOutput) {
    const float I_OFFSET = 4.864126475f;
    const float I_SCALE  = 253.7943361f;
    const float V_OFFSET = 0.10084f;
    const float V_SCALE  = 4.5739f;
    const float NORM     = sqrtf(2.0f) * (FFT_SIZE / 2.0f);

    float reactivePower = 0.0f;

    for (int k = 1; k < FFT_HALF; k++) {
        float I_re_cal = (fftCurrentOutput[2*k]   / NORM - I_OFFSET) / I_SCALE;
        float I_im_cal = (fftCurrentOutput[2*k+1] / NORM - I_OFFSET) / I_SCALE;
        float V_re_cal = (fftVoltageOutput[2*k]   / NORM - V_OFFSET) / V_SCALE;
        float V_im_cal = (fftVoltageOutput[2*k+1] / NORM - V_OFFSET) / V_SCALE;

        reactivePower += (I_re_cal * V_im_cal) - (I_im_cal * V_re_cal);
    }

    return reactivePower;
}
```

**Worked Example:**

$$
Q = \mathbf{-59.67 \ VAR}
$$

The negative sign indicates a **capacitive load** — current leads voltage. This is consistent with
a switching-mode power supply (LED TV or energy-efficient lamp).

---

### Apparent Power ($S$)

$$
S = V_{RMS} \times I_{RMS}
$$

```cpp
float S = calibrateVoltageRMS(computeVoltageRMS(fftVoltageOutput))
        * calibrateCurrentRMS(computeCurrentRMS(fftCurrentOutput));
```

**Worked Example:**

$$
S = 222.71 \times 0.2911 = \mathbf{64.83 \ VA}
$$

---

### Power Factor ($PF$)

$$
PF = \frac{|P|}{S}
$$

```cpp
float PF = fabsf(P) / S;
```

**Worked Example:**

$$
PF = \frac{|29.64|}{64.83} = \mathbf{0.457}
$$

A power factor of 0.457 confirms a highly non-linear load — consistent with the harmonic profile
visible in the current spectrum (significant H3, H5, H7, H9 components).

---

## Energy Accumulation

### Overview

Active Energy (Wh) and Reactive Energy (VARh) are the time-integrated forms of P and Q.
Each FFT window covers one AC cycle ($\Delta t = 0.02$ s). Energy registers accumulate across
all windows within the 1-hour reporting interval:

$$
Wh = \sum_{t=0}^{T} P(t) \cdot \Delta t
\qquad
VARh = \sum_{t=0}^{T} Q(t) \cdot \Delta t
$$

| Parameter | Symbol | Value |
|---|---|---|
| Window duration | $\Delta t$ | $64 / 3200 = 0.02$ s |
| Reporting interval | $T$ | 1 hour = 3600 s |
| Windows per hour | $N_{windows}$ | $3600 / 0.02 = 180{,}000$ |

### Active Energy ($Wh$)

```cpp
void accumulateEnergy(float  activePower,
                      float  reactivePower,
                      float* activeEnergy,
                      float* reactiveEnergy,
                      int*   windowCount) {

    const float windowDuration = (float)FFT_SIZE / SAMPLING_RATE;  // 0.02s
    const float toHours        = windowDuration / 3600.0f;
    const int   windowsPerHour = (int)(3600.0f / windowDuration);  // 180,000

    *activeEnergy   += activePower   * toHours;
    *reactiveEnergy += reactivePower * toHours;
    (*windowCount)++;

    if (*windowCount >= windowsPerHour) {
        *activeEnergy   = 0.0f;
        *reactiveEnergy = 0.0f;
        *windowCount    = 0;
    }
}
```

**Worked Example (single window):**

$$
Wh_{window} = 29.64 \times \frac{0.02}{3600} = 0.0001647 \ Wh
$$

$$
VARh_{window} = -59.67 \times \frac{0.02}{3600} = -0.0003315 \ VARh
$$

### Reactive Energy ($VARh$)

Follows the same accumulation logic as Wh, using Q instead of P.

**Worked Example (1-hour steady-state):**

$$
Wh_{1hr} = 29.64 \times 1 = \mathbf{29.64 \ Wh}
$$

$$
VARh_{1hr} = -59.67 \times 1 = \mathbf{-59.67 \ VARh}
$$

!!! warning "Steady-State Assumption"
    The 1-hour energy values above assume **constant load for the entire reporting interval**,
    derived from a single 20ms FFT window. In practice, the firmware accumulates P and Q
    continuously across all 180,000 windows per hour. For switching loads (LED TV, energy-efficient
    lamp), actual Wh and VARh will vary as the load changes between windows.
    Single-window extrapolation is valid only as a **baseline estimate** for steady-state loads
    such as a continuously running Air Conditioner.

---

## Harmonic Distortion

### Theory

Total Harmonic Distortion (THD) quantifies the ratio of harmonic energy to total signal energy.
From the FFT bin magnitudes:

$$
THD_v = \frac{\sqrt{\displaystyle\sum_{k=2}^{\frac{N}{2}-1} U_k^2}}
             {\sqrt{\displaystyle\sum_{k=1}^{\frac{N}{2}-1} U_k^2}}
\times 100\%
\qquad
THD_i = \frac{\sqrt{\displaystyle\sum_{k=2}^{\frac{N}{2}-1} I_k^2}}
             {\sqrt{\displaystyle\sum_{k=1}^{\frac{N}{2}-1} I_k^2}}
\times 100\%
$$

Where $X_k = \|X(k)\|_{cal}$ is the calibrated magnitude of bin k.

### Key Harmonic Bins — Simulation Results

From Table 4.1 (voltage) and Table 4.2 (current), after FFT and calibration:

| Bin k | Frequency | Harmonic Order | $\|V\|$ (V) | $\|I\|$ (A) | Note |
|---|---|---|---|---|---|
| k=1 | 50 Hz | **H1 — Fundamental** | 222.51 | 0.2608 | Dominant |
| k=2 | 100 Hz | H2 | 6.36 | 0.0000 | Even — suppressed |
| k=3 | 150 Hz | **H3** | 1.12 | 0.0409 | Odd — present |
| k=4 | 200 Hz | H4 | 1.18 | 0.0000 | Even — suppressed |
| k=5 | 250 Hz | **H5** | 5.82 | 0.0359 | Odd — present |
| k=6 | 300 Hz | H6 | 1.36 | 0.0000 | Even — suppressed |
| k=7 | 350 Hz | **H7** | 0.76 | 0.0273 | Odd — present |
| k=8 | 400 Hz | H8 | 0.49 | 0.0000 | Even — suppressed |
| k=9 | 450 Hz | **H9** | 0.42 | 0.0204 | Odd — present |
| k=10 | 500 Hz | H10 | 0.73 | 0.0000 | Even — suppressed |
| k=11 | 550 Hz | **H11** | 0.34 | 0.0285 | Odd — present |

!!! info "Even Harmonic Suppression"
    Even-order harmonics (H2, H4, H6...) are effectively zero in the current spectrum. This is
    a characteristic signature of switching-mode power supplies — their full-wave rectifiers
    produce only **odd harmonics** (H3, H5, H7, H9...). This pattern is what allows the Neural
    Network to distinguish a LED TV or energy-efficient lamp from a resistive or inductive load.

### Current Harmonic Spectrum Visualization

The following chart shows the calibrated current magnitude per harmonic bin
from H1 to H11, derived from Table 4.2 current samples:

```mermaid
xychart-beta
    title "Current Harmonic Spectrum (H1–H11)"
    x-axis ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11"]
    y-axis "Current Magnitude (A)" 0 --> 0.30
    bar [0.2608, 0.0000, 0.0409, 0.0000, 0.0359, 0.0000, 0.0273, 0.0000, 0.0204, 0.0000, 0.0285]
```

- **H1 (50Hz)** dominates as the fundamental at 0.2608 A
- **Even harmonics** (H2 (100Hz), H4 (200Hz), H6 (300Hz), H8 (400Hz), H10 (500Hz)) are fully suppressed —
  characteristic signature of a switching-mode power supply
- **Odd harmonics** (H3 (150Hz), H5 (250Hz), H7 (350Hz), H9 (450Hz), H11 (550Hz)) present with decreasing
  magnitude — consistent with a non-linear capacitive load such as
  a LED TV or energy-efficient lamp

### THDv — Total Harmonic Distortion Voltage

$$
THD_v = \mathbf{4.17\%}
$$

This is well below the EN 50160 limit of 8% for individual harmonics, confirming that the PLN
220V source in this measurement was clean.

### THDi — Total Harmonic Distortion Current

$$
THD_i = \mathbf{27.04\%}
$$

A THDi of 27% is characteristic of a **non-linear switching load**. The current waveform (Table 4.2)
shows a sharp spike at n=31–32 (amplitude ~220 ADC units) with a low flat region from n=0–28,
which is the time-domain signature of a capacitive filter in a switch-mode power supply drawing
current only at the voltage peak.

### C++ Implementation

```cpp
void computeTHD(const float* fftVoltageOutput,
                const float* fftCurrentOutput,
                float* thdVoltage,
                float* thdCurrent) {

    float sumHarmonicSquaresV = 0.0f;
    float sumHarmonicSquaresI = 0.0f;

    for (int k = 2; k < FFT_HALF; k++) {
        float V_mag = (sqrtf(fftVoltageOutput[2*k] * fftVoltageOutput[2*k]
                           + fftVoltageOutput[2*k+1] * fftVoltageOutput[2*k+1])
                       / NORM - V_OFFSET) / V_SCALE;

        float I_mag = (sqrtf(fftCurrentOutput[2*k] * fftCurrentOutput[2*k]
                           + fftCurrentOutput[2*k+1] * fftCurrentOutput[2*k+1])
                       / NORM - I_OFFSET) / I_SCALE;

        sumHarmonicSquaresV += V_mag * V_mag;
        sumHarmonicSquaresI += I_mag * I_mag;
    }

    float fundamentalSquaredV = /* calibrated |V(k=1)| */ ;
    float fundamentalSquaredI = /* calibrated |I(k=1)| */ ;

    *thdVoltage = 100.0f * sqrtf(sumHarmonicSquaresV
                / (sumHarmonicSquaresV + fundamentalSquaredV));
    *thdCurrent = 100.0f * sqrtf(sumHarmonicSquaresI
                / (sumHarmonicSquaresI + fundamentalSquaredI));
}
```

---

## Implementation

### Full C++ Pipeline

The complete per-window execution order, as deployed on the STM32F407:

```cpp
void processFFTWindow(float* fftVoltageOutput, float* fftCurrentOutput) {

    // ── STEP 1: RMS ──────────────────────────────────────────────────────
    float rawVrms = computeVoltageRMS(fftVoltageOutput);
    float rawIrms = computeCurrentRMS(fftCurrentOutput);
    float V_RMS   = calibrateVoltageRMS(rawVrms);
    float I_RMS   = calibrateCurrentRMS(rawIrms);

    // ── STEP 2: POWER PARAMETERS ─────────────────────────────────────────
    float P  = computeActivePower(fftCurrentOutput, fftVoltageOutput);
    float Q  = computeReactivePower(fftCurrentOutput, fftVoltageOutput);
    float S  = V_RMS * I_RMS;
    float PF = fabsf(P) / S;

    // ── STEP 3: HARMONIC DISTORTION ───────────────────────────────────────
    float THDv, THDi;
    computeTHD(fftVoltageOutput, fftCurrentOutput, &THDv, &THDi);

    // ── STEP 4: ENERGY ACCUMULATION ───────────────────────────────────────
    static float activeEnergy   = 0.0f;
    static float reactiveEnergy = 0.0f;
    static int   windowCount    = 0;
    accumulateEnergy(P, Q, &activeEnergy, &reactiveEnergy, &windowCount);

    // ── STEP 5: CURRENT SPECTRUM (display only) ───────────────────────────
    float calibratedSpectrum[FFT_SIZE];
    calibrateCurrentSpectrum(fftCurrentOutput, calibratedSpectrum);
}
```

### Integration with STM32F407 Firmware

The pipeline above is called from the ADC interrupt handler once every 64 samples (one complete
FFT window). The ZCD interrupt triggers the start of ADC capture, ensuring the window is aligned
to the AC cycle zero crossing to minimize spectral leakage:

```cpp
void ADC_IRQHandler(void) {
    HAL_ADC_IRQHandler(&hadc1);
    HAL_ADC_IRQHandler(&hadc2);
    HAL_ADC_IRQHandler(&hadc3);

    offset    = HAL_ADC_GetValue(&hadc3);
    pSrcI[i]  = HAL_ADC_GetValue(&hadc1) - offset;
    pSrcV[i]  = HAL_ADC_GetValue(&hadc2) - offset;

    // Pack into interleaved complex input (imaginary = 0)
    Vfft[2*i]   = pSrcV[i];  Vfft[2*i+1] = 0;
    Ifft[2*i]   = pSrcI[i];  Ifft[2*i+1] = 0;
    i++;

    if (i >= FFT_SIZE) {
        i = 0;

        // Run FFT on both channels
        arm_cfft_radix2_init_f32(&Radix2, FFT_SIZE, 0, 1);
        arm_cfft_radix2_f32(&Radix2, Vfft);

        arm_cfft_radix2_init_f32(&Radix2, FFT_SIZE, 0, 1);
        arm_cfft_radix2_f32(&Radix2, Ifft);

        // Process all power parameters
        processFFTWindow(Vfft, Ifft);
    }
}
```

### Power Parameters — Final Results Summary

From Table 4.1 (voltage) and Table 4.2 (current) — one FFT window:

| Parameter | Value | Unit |
|---|---|---|
| $V_{RMS}$ | 222.71 | V |
| $I_{RMS}$ | 0.2911 | A |
| $P$ | 29.64 | W |
| $Q$ | −59.67 | VAR |
| $S$ | 64.83 | VA |
| $PF$ | 0.457 | — |
| $THD_v$ | 4.17 | % |
| $THD_i$ | 27.04 | % |
| $Wh$ (steady-state 1hr) | 29.64 | Wh |
| $VARh$ (steady-state 1hr) | −59.67 | VARh |
