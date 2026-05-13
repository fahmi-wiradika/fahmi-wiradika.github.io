# Non-Intrusive Household Load Identification Using FFT Harmonic Analysis and Backpropagation Neural Network on STM32F407

## Overview
Electricity consumption in residential environments continues to rise, driven by the growing dependency on household appliances and the widespread adoption of secondary electronics. Yet most consumers only discover their actual usage when the billing period ends or their prepaid token runs out — by which point the waste has already occurred.
This research proposes a Smart Energy Meter capable of not only measuring electrical parameters but also identifying which household appliances are actively connected to the power line — without requiring any modification to existing wiring or appliances. This approach is known as Non-Intrusive Load Monitoring (NILM).

### What the Research is About
The core challenge this research addresses is: can a single-point measurement device tell you which appliances are running, based solely on how they distort the electrical signal?
Different household appliances draw current in different patterns. Resistive loads like incandescent lamps draw nearly pure sinusoidal current, while switching-mode power supplies in devices like LED TVs and energy-efficient lamps introduce harmonic distortions — measurable deviations from the fundamental 50 Hz frequency. These harmonic "fingerprints" are unique enough to distinguish one appliance from another, even when multiple loads are connected simultaneously.
The system was designed and tested against three representative household load types:

- Air Conditioner (inductive load)
- LED Television (non-linear switching load)
- Energy-Efficient Lamp (non-linear switching load)


### Theory and Technical Foundation
The system is built on three interconnected theoretical pillars:

1. Electrical Power Analysis

The meter captures both voltage and current signals from the 220V AC PLN single-phase supply. From these signals, key power quality parameters are derived — RMS voltage, RMS current, active power (P), reactive power (Q), apparent power (S), and Total Harmonic Distortion (THD) for both voltage and current.

2. Fast Fourier Transform (FFT)

Raw time-domain samples from the ADC are transformed into the frequency domain using the FFT Radix-2 algorithm, implemented via the ARM CMSIS-DSP library on the STM32F407. This produces a harmonic spectrum from which the magnitudes of the fundamental (50 Hz), 3rd, 5th, 7th, 9th, and 11th harmonics are extracted as characteristic features of each load.

3. Backpropagation Neural Network (BPNN)

The extracted harmonic features are fed into a trained Artificial Neural Network to classify which load — or combination of loads — is currently connected. The network was trained in MATLAB using 101 data samples per load combination across 8 possible states (no load, each individual load, and all multi-load combinations). The trained weights and biases are then hard-coded into the microcontroller firmware for real-time inference.

### Methodology
The system follows an end-to-end pipeline from signal acquisition to user display:

    AC Signal (220V PLN)
    → AMC1300 Sensor (Voltage & Current isolation + conditioning)
    → STM32F407 ADC (3200 samples/sec)
    → FFT (CMSIS Radix-2, 64-point)
    → Harmonic Feature Extraction (H1, H3, H5, H7, H9)
    → Backpropagation Neural Network (6 inputs → 8 hidden neurons → 1 output)
    → Load Identification (8 possible states)
    → LCD TFT ILI9341 Display + Bluetooth HC-05

Hardware was designed in EAGLE 9.1.1, covering the power supply circuit, microcontroller circuit, current and voltage sensor circuits, signal conditioning using OPA376 op-amps, and a Zero Crossing Detector for phase reference. The neural network training was conducted offline in MATLAB and the resulting weight and bias matrices were deployed directly onto the microcontroller.

### Expected Results
The research aims to demonstrate that:

- The system can accurately measure power quality parameters (RMS voltage, RMS current, active power, THDv, THDi) from a 220V AC source
- The FFT-derived harmonic spectrum is sufficiently distinct between load types to serve as a reliable classification feature
- The Backpropagation Neural Network, trained to a regression value approaching 1.0 across Training, Validation, and Test sets, can correctly identify single and combined load states in real-time
- All results are presented live on the LCD TFT touchscreen across three display modes: General Information, Harmonic Analysis, and Load Monitoring


## Chapter 1 - Introduction

### Background of the Study

The need for electricity has become one of the main needs in society. It is influenced by the economic conditions, climate change, and technological development. The high consumption of electricity now is due to the fact that almost all household appliances require electric power, such as refrigerators, dispensers, washers, water pumps, rice cookers, and other secondary necessities like Wi-Fi, air conditioner, and microwave.

In addition to the high electricity needs in society, the bad habits of consumers often become the main factor in electricity wastage. For example, leaving chargers plugged in when not used, turning on TVs without anyone watching, and leaving lights on during daytime can all cause an increase in electricity consumption. Such habits lead to increased electricity consumption and result in new discovered energy waste when bills arrive after the bill payment period or when tokens expire unexpectedly.

Based on the above explanation, the author proposes a solution for reducing electricity use by educating the public through Smart Energy Meters that identify household electronic appliances being used in a house and provide information to consumers about power usage and electricity bills. Consumers can obtain this information from the LCD screen of the Smart Energy Meter.

### Objective

- General Objective: To meet the graduation requirements of Electronic Engineering Polytechnique Institute of Surabaya (EEPIS) for obtaining a Bachelor of Science in Applied Sciences (S.ST).

- Specific Objective: The purpose of this final project is to create an electricity meter that can identify connected loads and power usage of household appliances, and to provide feedback to users through the LCD display.

### Methodology

For this final project to achieve the best results, a suitable method is needed. Therefore, the following steps have been planned to maximize the execution of this project:

The methodology for the final project has been designed as follows:

1. Literature Study
Literature study on the concepts of power supply, converters, microcontrollers, and other supporting equipment.

2. Literature Study on Project Support Theories
Learning about FFT applications, current sensor, voltage sensor, and ARM STM32F407VGTX through both theoretical and practical means.

3. System Design
Performing a general system design for the final project, starting from STM32F407VGTX, current sensors, voltage sensors. The creation and planning of additional components in the system include:

	**A. STM32F407VGTX**

	In this project, STM32F407VGTx is used to perform FFT calculations and analog-to-digital converter conversion from the voltage and current sensor data.
	
	**B. Current Sensor**

	The current sensor in this project is used as a detector for any connected loads on the electricity meter, and the sensed voltage data is sent to the STM32F407VGTX microcontroller.
	
	**C. Voltage Sensor**

	The voltage sensor in this project is used to detect any voltage present on the electricity meter, and the sensed voltage data is sent to the STM32F407VGTX microcontroller.

4. Integration and Testing of the System
In this phase, the system is integrated from its individual components. System integration is followed by testing, and adjustments are made if necessary.

5. Experiments and System Analysis
After performing several tests and improvements on the system, a functioning system with the desired performance characteristics is obtained. Therefore, the Smart Energy Meter for identifying household loads can work effectively.

6. Writing the Final Project Report
Summarizing the planning, construction, and refinement of the system based on test results and compiling a final report.

7. Presenting the Final Project
This is the last phase of the project and involves presenting the achievements made during the project to stakeholders.

### Problem Formulation and Scope of the Study

Based on the background problems and referring to general literature, it can be formulated how to design and create such a system. The primary problem statement can be explained as follows:

1. How to measure voltage and current signals?
2. What is the process of windowing voltage and current signals?
3. How to calculate harmonic spectrum for voltage and current?
4. How to design a monitoring system to identify types of household loads?
5. How to design a system that provides feedback to users about electricity consumption in households?

In this final project, there are the following limitations:

1. The input sensor measures only voltage and current.
2. The output displayed is the total active power consumed by all loads and billing charges.
3. The source of electricity is from 220V AC distribution lines from PLN.
4. Three types of loads will be identified.
5. The microcontroller used is STM32F407.
6. The sampling rate is set to 3200 samples per second.
7. The current sensor uses AMC1300.
8. The voltage sensor also uses AMC1300.
9. The plan only monitors the system.

These limitations need to be considered and addressed while designing the Smart Energy Meter for identifying household loads.

### Outline of the Study

The structure of the final project's presentation is as follows:

**Chapter I: Introduction**

This chapter covers background, objectives, methodology, problems, scope of the study, outline of the project, and literature review.

**Chapter II: Supporting Theories**

This chapter discusses theories that support and are related to the solution of the project, including algorithms such as FFT, electrical power, and neural networks.

**Chapter III: Hardware Planning and Construction**

This chapter covers the planning process and fabrication of the hardware for the final project.

**Chapter IV: Testing and Analysis**

This chapter discusses the system in its entirety and performs testing on each hardware device. It integrates the entire system and analyzes data from each trial device. Based on the test results, it evaluates the overall system.

**Chapter V: Conclusion**

This chapter summarizes the findings of the study, planning, testing, and analysis based on test results. To improve the final outcome, suggestions are provided for the creation of the project.


### Literature Review

There have been several previous studies that have already been conducted as references for this final project, including:

1. A journal article titled "A Smart Power Meter to Monitor Energy Flow in Smart Grids: The Role of Advanced Sensing and IoT in the Electric Grid of the Future" by Rosario Morello from University Mediterranea of Reggio Calabria published in 2017. It discusses how quality power parameters can be calculated using FFT methods on a microgrid.

2. A paper titled "Design of Smart Meter to Monitor and Identify Household Energy Consumption Using Backpropagation Neural Network" by Koko Hutoro from the Institute of Technology of Tokyo University published in 2012. It explains how to identify household loads based on the characteristic values of effective current for each load plotted into a neural network.

3. A journal article titled "Application of the Time-Frequency Analysis using Wavelet Transform to Harmonic analysis in the Power Conversion System" by Hiroki Nagano from Kobe City College of Technology published in 2017. It discusses how to analyze power conversion systems in detail using wavelet transforms, as compared to Fourier transforms. Fourier transforms are generally used for harmonic analysis.


## Chapter II: Supporting Theories

### Electrical Power

Electrical power is generally considered to be the product of the current flowing through a circuit multiplied by the voltage across that circuit. In alternating current (AC), there are two components to the power: active power (P) and reactive power (Q). The resultant of P and Q is called apparent power (S), which is the power felt by the electricity company as the source of power.

Reactive power (Q) can occur due to inductance or capacitance. Inductance is caused by components like transformers on appliances such as electric motors or step-down adaptors. Capacitance is caused by capacitors. The properties of inductance and capacitance are opposite; in a voltage phase diagram, the inductive component points downward while the capacitive component points upward.

Active power (P) is the power required by the load. However, the power that needs to be supplied by the electricity company is apparent power (S). To minimize the power that needs to be supplied by the electricity company, as much reactive power (Q) as possible should be eliminated. If the load is inductive, then a capacitor should be added to make the reactive power (Q) approach zero. Since most appliances in residential environments are inductive, adding capacitors is the correct way to save energy.

Active power is work done, such as mechanical work, heat generation, light production, and so on.
This power is needed for machines to perform real operations according to their capacity.
Active power is stated in watt (W). The formula is:

$$
P = V \times I \times \cos(\varphi)
$$

| Symbol | Description |
|--------|-------------|
| $P$ | Active Power (Watt) |
| $V$ | Voltage (Volt) |
| $I$ | Current (Ampere) |
| $\varphi$ | Phase Angle (degrees) |

Reactive power (Q) is the power needed by electrical appliances that work with an electromagnetic
system. This power is required by machines to maintain magnetic fields in order for them to operate
efficiently. Reactive power is stated in volt-ampere reactive (VAR). The formula is:

$$
Q = V \times I \times \sin(\varphi)
$$

| Symbol | Description |
|--------|-------------|
| $Q$ | Reactive Power (VAR) |
| $V$ | Voltage (Volt) |
| $I$ | Current (Ampere) |
| $\varphi$ | Phase Angle (degrees) |

Apparent power (S) is the sum of the active and reactive powers. It is stated in volt-amperes (VA).
The formula is:

$$
S = \sqrt{P^2 + Q^2}
$$

Apparent power can also be stated as the product of voltage and current:

$$
S = V \times I
$$

| Symbol | Description |
|--------|-------------|
| $S$ | Apparent Power (VA) |
| $P$ | Active Power (Watt) |
| $Q$ | Reactive Power (VAR) |
| $V$ | Voltage (Volt) |
| $I$ | Current (Ampere) |

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.1.%20Power%20Triangle.jpg){ width="250" }
<figcaption>Figure 2.1. Power Triangle</figcaption>
</figure>

Chapter II: Supporting Theories

### FFT (Fast Fourier Transform)

A crucial step in digital signal processing is to analyze an input or output signal to determine the characteristics of a physical system from the signal. Analysis and synthesis in the time domain require a lengthy analysis that involves derivatives of functions, which can lead to inaccuracies in the analysis. Signal analysis will be easier performed in the frequency domain because what determines a signal most is its frequency.

Therefore, for working in the frequency domain, an appropriate formula is needed so that signal manipulation according to reality can be achieved. One technique for analyzing signals is to transform (change form) the analog signal into a discrete time-domain representation and then convert it to the frequency domain.

Although DFT plays a significant role as a mathematical procedure for determining the frequency content of a sequence in the time domain, it is not efficient. The number of points in DFT increases to hundreds or thousands, making the amounts calculated uncountable. In 1965, an article was published by Cooley and Tukey describing an extremely efficient algorithm for applying DFT. Cooley and Tukey's algorithm, now known as Fast Fourier Transform (FFT). Before FFT, a thousand DFT points required a lot of time to calculate, which at the time was still limited to low-specification computers. The idea of Cooley and Tukey and the development of the semiconductor industry made it possible for N points of DFT, such as 1024 points, to be calculated in a few seconds on low-specification computers.

Although many FFT algorithms have been developed, the FFT radix-2 algorithm is an efficient process for performing DFTs with constraints on the number of points being raised to the power of two. FFT radix-2 removes redundancy and reduces the number of arithmetic operations required. A 8-point DFT must perform N^2 or 64 complex multiplications. However, FFT performs (N/2)log2N, which provides a significant reduction in the N^2 complex multiplications. When N = 512, the DFT requires 200 times fewer complex multiplications than FFT does.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.2%20Comparison%20of%20Complex%20Multiplication.jpg){ width="500" }
<figcaption>Figure 2.2 Comparison of Complex Multiplication</figcaption>
</figure>

In the decomposition process, there are logarithmic steps of N/2. For example, a signal with 16 points (24) requires 4 steps, a signal with 512 points (29) needs 9 steps, and a signal with 4096 points (212) requires 12 steps. In Figure 2.3, the 16-point signal is decomposed into four separate steps. The first step separates the 16-point signal into two signals, each consisting of 8 points. The second step further breaks down the data into four signals, each consisting of 4 points. This pattern continues until the N-point signal consists of one point. Decomposition is performed whenever a signal is divided into two parts, i.e., the signal is separated into even and odd samples.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.3%20Example%20of%20Time%20Domain%20Signal%20Decomposition.jpg){ width="500" }
<figcaption>Figure 2.3 Example of Time Domain Signal Decomposition</figcaption>
</figure>


Equation 5 can be split into even and odd halves as follows:

$$
X(m) = \sum_{n=0}^{\frac{N}{2}-1} x(2n) \cdot e^{-j2\pi(2nm)/N}
+ e^{-j2\pi m/N} \sum_{n=0}^{\frac{N}{2}-1} x(2n+1) \cdot e^{-j2\pi(2nm)/N}
$$

Where:

| Symbol | Description |
|--------|-------------|
| $N$ | Number of input samples |
| $X(m)$ | The $m$-th component of the output DFT: $X(0), X(1), \ldots, X(N-1)$ |
| $m$ | Index of output DFT in the frequency domain: $0, 1, \ldots, N-1$ |
| $x(2n)$ | The $n$-th even input sample: $x(0), x(2), \ldots, x(N-2)$ |
| $x(2n+1)$ | The $n$-th odd input sample: $x(1), x(3), \ldots, x(N-1)$ |
| $n$ | Index of input sample in the time domain: $0, 1, \ldots, N-1$ |
| $j$ | Imaginary unit $\left(\sqrt{-1}\right)$ |
| $\pi$ | 180° in radians |
| $e$ | Natural logarithm base $(\approx 2.718281828)$ |

Since the formula is long, it uses standard notation to simplify it.
It is defined as $W_N = e^{-j2\pi/N}$ to represent the $N$-th root of unity.

Equation 5 can be written as:

$$
X(m) = \sum_{n=0}^{\frac{N}{2}-1} x[2n] \cdot W_N^{2mn}
+ W_N^{m} \sum_{n=0}^{\frac{N}{2}-1} x[2n+1] \cdot W_N^{2mn}
$$

Since:

$$
W_N^2 = e^{-j2\pi \cdot 2/N} = e^{-j2\pi / (N/2)} = W_{N/2}
$$

Substituting $W_N^2 = W_{N/2}$, the equation becomes:

$$
X(m) = \sum_{n=0}^{\frac{N}{2}-1} x[2n] \cdot W_{N/2}^{mn}
+ W_N^{m} \sum_{n=0}^{\frac{N}{2}-1} x[2n+1] \cdot W_{N/2}^{mn}
$$

Frequency domain synthesis requires three loops. The outer loop runs through logarithmic steps of N/2 (starting from the bottom and moving upwards). The middle loop moves through each individual frequency spectrum under processing (each box at each level). In digital signal processing, it is known as a butterfly. Butterfly is used to describe decimation. Since its appearance alternates, it is called a butterfly. Butterfly is the basic computational element of FFT, changing two complex points into another two complex points. There are two types of decimation: time-based decimation (decimation in time - DIT) and frequency-based decimation (decimation in frequency - DIF). The butterfly diagram for both types of decimation can be seen in Figures 2.5 and 2.6.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.4%20Basic%20Butterfly%20Diagram%20for%20Time-Based%20Decimation.jpg){ width="500" }
<figcaption>Figure 2.4 Basic Butterfly Diagram for Time-Based Decimation</figcaption>
</figure>

	    
<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.5%20Basic%20Butterfly%20Diagram%20for%20Frequency-Based%20Decimation%20.jpg){ width="500" }
<figcaption>Figure 2.5 Basic Butterfly Diagram for Frequency-Based Decimation</figcaption>
</figure>
  

The innermost loop uses butterflies to calculate points in each frequency spectrum (looping through samples in each box). Figure 2.6 shows the implementation of FFT from four two-point spectra and two four-point spectra. Figure 2.6 is formed by repeating the basic pattern in Figure 2.4.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.6%20Butterfly%20Diagram%20for%20Frequency%20Domain%20Synthesis.jpg){ width="550" }
<figcaption>Figure 2.6 Butterfly Diagram for Frequency Domain Synthesis</figcaption>
</figure>

### AMC 1300

In this project, the voltage sensor and current sensor are used through the AMC 1300 medium. AMC 1300 is a special amplifier developed by Texas Instruments that functions as a rectifier of alternating current voltages to DC voltages so that they become input signals that can be processed on the Analog-to-Digital Converter (ADC) chip STM32F407VGTX and can also be applied as voltage sensors in the voltage divider circuit and current sensor in the current divider circuit. Here is the pinout of AMC 1300:

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.7%20Pinout%20of%20the%20AMC%201300%20Sensor.jpg){ width="250" }
<figcaption>Figure 2.7 Pinout of the AMC 1300 Sensor</figcaption>
</figure>

Each pinout of AMC 1300 has a function when connected to the system, as follows are the functions for each pinout of AMC 1300:

Table 2.1 AMC 1300 Pinout Description

|Pin Name	|No.|	I/O	 | 	Description|
|-----------|---|--------|-------------|
|GND 1	|1		|-	|High-side analog ground
|GND 2	|2		|-	|Low-side analog ground
|VDD 1	|3		|-	|High-side power supply, 3.0 V to 5.5 V.
|VDD 2	|4		|-	|Low-side power supply, 3.0 V to 5.5 V.
|Vinn	|5		|I	|Inverting analog input
|Vinp	|6		|I	|Noninverting analog input
|Voutn	|7		|O	|Inverting analog output
|Voutp	|8		|O	|Noninverting analog output

The AMC 1300 sensor has certification specifications, including:

- Reinforced Isolation per DIN V VDE V 0884-10 (VDE V 0884-10): 2006-12
- Isolation for 1 minute at 5000 VRMS per UL1577
- CAN/CSA No. 5A-Component Acceptance Service Notice, IEC 60950-1, and IEC 60065 End Equipment Standards

On the AMC 1300 sensor datasheet, it is generally intended for several uses, including:
- Shunt-Resistor-Based Current Sensing In:
- Motor Drives
- Frequency Inverters
- Uninterruptible Power Supplies
- Isolated Voltage Sensing

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.8%20Schematic%20of%20the%20Sensor%20AMC%201300.jpg){ width="500" }
<figcaption>Figure 2.8 Schematic of the Sensor AMC 1300</figcaption>
</figure>

Using the AMC 1300 as a voltage and current measurement tool in the system does not require DC-DC isolation for microcontroller components, because internal isolation exists within the sensor up to a voltage of 7000 kV. However, due to the use of a single DC power source to supply all components, including low-side and high-side sides of the AMC, to prevent damage to working DC components caused by AC signals entering those components, RFM-0505S as a DC-DC isolated component is used.

### Voltage Sensor

A typical voltage sensor can also be referred to as a voltage divider circuit with a schematic like Figure 2.9. Input to a voltage divider circuit is the Vin voltage. Vin generates current I flowing through both resistors. Since both resistors are connected in series, the same current flows through each resistor.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.9%20Voltaga%20Sensor%20Circuit.jpg){ width="300" }
<figcaption>Figure 2.9 Voltaga Sensor Circuit</figcaption>
</figure>

According to Ohm's Law, the current flowing is:

$$
I = \frac{V_{in}}{R_1 + R_2}
$$

The voltage across $R_2$ becomes:

$$
V_{out} = I \times R_2
$$

Substituting $I$ with the equation above gives:

$$
V_{out} = \frac{V_{in} \times R_2}{R_1 + R_2}
$$

| Symbol | Description |
|--------|-------------|
| $V_{in}$ | Input voltage of the voltage sensor (V) |
| $V_{out}$ | Output voltage of the voltage sensor (V) |
| $I$ | Input current of the voltage sensor (A) |
| $R_1$ | Voltage divider resistor 1 (Ω) |
| $R_2$ | Voltage divider resistor 2 (Ω) |

This equation is the equation to calculate the output voltage produced by a voltage divider circuit. By selecting two resistors with appropriate resistance values, we can obtain any output voltage within the range of 0 V to Vin.

### Current Sensor

A typical current sensor can also be referred to as a current divider circuit with a schematic like Figure 2.10. Input to a current divider circuit is Iin current. Iin flows and divides into I1 and I2 currents flowing through both resistors. Since both resistors are connected in parallel, the same voltage across each resistor.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.10%20Current%20Sensor%20Circuit.jpg){ width="300" }
<figcaption>Figure 2.10 Current Sensor Circuit</figcaption>
</figure>

According to Kirchhoff's Current Law, the current flowing is:

$$
I_{in} = I_1 + I_2
$$

The voltage across $R$ becomes:

$$
V_S = V_{R_1} = V_{R_2}
$$

Substituting $I$ with the equation above gives:

$$
I_1 = \frac{I_{in} \times R_2}{R_1 + R_2}
$$

| Symbol | Description |
|--------|-------------|
| $V_S$ | Input voltage of the current sensor (V) |
| $I_{in}$ | Total input current of the current sensor (A) |
| $I_1$ | Current 1 input of the current sensor (A) |
| $I_2$ | Current 2 input of the current sensor (A) |
| $R_1$ | Current divider resistor 1 (Ω) |
| $R_2$ | Current divider resistor 2 (Ω) |

This equation is the equation to calculate the output current produced by a current divider circuit. By selecting two resistors with appropriate resistance values, we can obtain any output current within the range of 0 A to Iin.


###	Microcontroller STM32F407VGTX
The STM32F407VGTX is a microcontroller based on Digital Signal Processing (DSP) that includes hardware Floating Point Unit (FPU), allowing for faster clock or numerical calculations compared to microcontrollers without FPU. The STM32F407VGTX comes with hardware support for Measurement & Instrumentation applications, such as 3-channel ADC and 15-channel Timer.

Typically sold in the form of a chip as shown in Figure 2.11.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.11.%20Microcontroller%20STM32F407VGTX.jpg){ width="250" }
<figcaption>Figure 2.11. Microcontroller STM32F407VGTX</figcaption>
</figure>



The capabilities of STSTM32F407VGT7 are supported by an ARM-Cortex-M processor with up to 168 MHz capability. The ARM-Cortex M4 processor, which is the type installed in the STM32F407VG microcontroller, features a single-layer programming structure consisting of Cortex Microcontroller Software Interface Standard (CMSIS).

The features provided by STM32F407VGTX include:

- Core: ARM®32-bit Cortex®-M4 CPU with FPU, Adaptive real-time accelerator (ART Accelerator™) allowing 0-wait state execution from Flash memory, frequency up to 168 MHz, memory protection unit, 210 DMIPS/1.25 DMIPS/MHz (Dhrystone 2.1), and DSP instructions
- Memories
    - Up to 1 Mbyte of Flash memory
    - Up to 192+4 Kbytes of SRAM including 64-Kbyte of CCM (core coupled memory) data RAM
    - Flexible static memory controller supporting Compact Flash, SRAM, PSRAM, NOR and NAND memories
- LCD parallel interface, 8080/6800 modes
- Clock, reset and supply management
    - 1.8 V to 3.6 V application supply and I/Os
    - POR, PDR, PVD and BOR
    - 4-to-26 MHz crystal oscillator
    - Internal 16 MHz factory-trimmed RC (1% accuracy)
    - 32 kHz oscillator for RTC with calibration
    - Internal 32 kHz RC with calibration
    - Sleep, Stop and Standby modes
    - VBAT supply for RTC, 20×32 bit backup registers + optional 4 KB backup SRAM
- 3×12-bit, 2.4 MSPS A/D converters: up to 24 channels and 7.2 MSPS in triple interleaved mode
- 2×12-bit D/A converters
- General-purpose DMA: 16-stream DMA controller with FIFOs and burst support
- Up to 17 timers: up to twelve 16-bit and two 32-bit timers up to 168 MHz, each with up to 4 IC/OC/PWM or pulse counter and quadrature (incremental) encoder input
- Debug mode
    - Serial wire debug (SWD) & JTAG interfaces
    - Cortex-M4 Embedded Trace Macrocell™
- Up to 140 I/O ports with interrupt capability
    - Up to 136 fast I/Os up to 84 MHz
    - Up to 138 5 V-tolerant I/Os
- Up to 15 communication interfaces
    - Up to 3 × I2C interfaces (SMBus/PMBus)
    - Up to 4 USARTs/2 UARTs (10.5 Mbit/s, ISO 7816 interface, LIN, IrDA, modem control)
    - Up to 3 SPIs (42 Mbits/s), 2 with muxed full-duplex I2S to achieve audio class accuracy via internal audio PLL or external clock
    - 2 × CAN interfaces (2.0B Active)
    - SDIO interface
- Advanced connectivity
    - USB 2.0 full-speed device/host/OTG controller with on-chip PHY
    - USB 2.0 high-speed/full-speed device/host/OTG controller with dedicated DMA, on-chip full-speed PHY and ULPI
    - 10/100 Ethernet MAC with dedicated DMA: supports IEEE 1588v2 hardware, MII/RMII
- 8- to 14-bit parallel camera interface up to 54 Mbytes/s
- True random number generator
- CRC calculation unit
- 96-bit unique ID
- RTC: subsecond accuracy, hardware calendar

### Signal Sampling

The cited data samples are used to obtain optimal data values, which will then be processed in the microcontroller. Signal sampling (cubing) is one of the important processes in digital signal processing. Cubing involves obtaining digital data through sampling an analog signal, meaning that analog signals are sampled discretely with period Ts or frequency Fs.
To sample information signals, we must pay attention to the use of the sampling frequency.
This theorem is known as Shannon's Sampling Theorem and states that if a continuous time function f(t) is limited by its highest frequency component less than ω, then the function f(t) can be rewritten from its cubing values if the sampling frequency is equal to or greater than 2ω. Mathematically, Shannon's Sampling Theorem can be expressed as follows:

$$
F_s \geq 2F
$$

| Symbol | Description |
|--------|-------------|
| $F_s$ | Sampling frequency |
| $F$ | Analog / information signal frequency |

Taking periodic data with a certain frequency is done to avoid errors that are often referred to as aliasing. With aliasing, the sampling process becomes poor, resulting in inaccurate or even very high error readings from sampled data.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.12.%20Voltage%20of%201V%20at%201Hz,%20using%20a%20sampling%20rate%20of%2010%20Hz.jpg){ width="750" }
<figcaption>Figure 2.12. Voltage of 1V at 1Hz, using a sampling rate of 10 Hz</figcaption>
</figure>


Reconstruction of a 10-Hz Sampled Sine Wave on Figure 2.18 where the sine wave is cubed with a frequency cubing of ten times the information signal frequency, resulting in an accurate reconstruction of the signal.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.13.%20Voltage%20of%201V%20at%201Hz,%20using%20a%20sampling%20rate%20of%204%20of%203%20Hz.jpg){ width="750" }
<figcaption>Figure 2.13. Voltage of 1V at 1Hz, using a sampling rate of 4/3 Hz</figcaption>
</figure>


Reconstruction of a 4/3-Hz Sampled Sine Wave If a signal is not sampled according to the conditions above, then the reconstruction of the data obtained from cubing will have high error levels as shown in Figure 2.19. Information errors due to aliasing can affect analysis, as incorrect interpretation of the processed data may result from cubing data.

### Neural Network

The human brain has a very complex structure and possesses extraordinary capabilities. The brain consists of neurons and synapses. Neurons work based on the impulses/signals provided to them. They pass them on to other neurons. It is estimated that humans have about 1012 neurons and 6.1018 synapses.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.14.%20Diagram%20of%20Neurons%20in%20the%20Human%20Brain.jpg){ width="250" }
<figcaption>Figure 2.14. Diagram of Neurons in the Human Brain</figcaption>
</figure>

Neurons have three essential components: dendrites, soma, and axon. Dendrites receive signals from other neurons. These signals are electric impulses that are transmitted through synaptic clefts via a chemical process. These signals are modified (strengthened/ weakened) in the synaptic cleft. Next, the soma adds up all the incoming signals. If the sum is strong enough and exceeds the threshold (threshold), then the signal continues to the next cell via the axon. The frequency of signal transmission varies between different cells.

Biological neurons are considered a "fault-tolerant" system in two ways:
First, humans can recognize input signals that are slightly different from those they have previously received. For example, humans often recognize someone whose face has been seen before or someone whose face is similar to the one they saw long ago.
Second, the human brain can still function even if some neurons are not functioning well. If a neuron fails, other neurons sometimes train to take over the function of the failing neuron.

A simple artificial neural network (ANN) was first introduced by McCulloch and Pitts in 1943. McCulloch and Pitts concluded that combining several simple neurons can improve the computational power of a system. The weights proposed by McCulloch and Pitts are adjusted to perform simple logical functions. The activation function used is the threshold function.

ANN (Artificial Neural Network) was developed as a generalization of the mathematical model of biological neural networks, with the assumption that:

- Processing information occurs in many simple elements (neurons).
- Signals are transmitted between neurons through connections.
- The connection between neurons has weights that can strengthen or weaken signals.
- To determine the output, each neuron uses an activation function (usually not a linear function) that is applied to the sum of the received inputs. The size of this output is then compared with a threshold value.

ANN (Artificial Neural Network) is determined by three things:

- The architecture of the neural network (also known as the connection pattern)
- The method for determining connection weights (known as training/learning/algorithms)
- Activation function, where the activation function determines the previous calculation result before passing to the next neuron or output.
For example, see Figure 2.15 below:

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.15.%20Simple%20Artificial%20Neural%20Network%20Architecture.jpg){ width="250" }
<figcaption>Figure 2.15. Simple Artificial Neural Network Architecture</figcaption>
</figure>

Y receives input from neurons x1, x2, and x3 with connection weights of w1, w2, and w3, respectively. The net sum of the three neuron impulses is net = x1w1 + x2w2 + x3w3. The amount of signal received by Y follows the activation function y = f(net). If the value of the activation function is strong enough, then the signal will continue. The output value (model network output) can also be used as a basis for changing weights.
In the use of neural network methods, a function activation is needed to determine whether the result
from each neuron should be passed on to the next process or not. This function activation can also be
used to determine whether a neuron is being used or not. In general, three common activation functions
used in artificial neural networks are:

**Threshold function**

$$
f(x) = \begin{cases} 0 & \text{if } x < a \\ 1 & \text{if } x \geq a \end{cases}
$$

**Sigmoid function**

$$
f(x) = \frac{1}{1 + e^{-x}}
$$

The sigmoid function is often used because its values lie between 0 and 1, and it can be easily
differentiated.

**Identity function**

$$
f(x) = x
$$

The identity function is often used when we want the network output to be any real number
(not just within the range $[0, 1]$ or $[-1, 1]$).


## Chapter III: Hardware Planning and Construction

### Overview of the System

The overview of the system that was created for this final project is shown in Figure 3.1.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.1.%20Block%20Diagram%20of%20the%20System.jpg){ width="500" }
<figcaption>Figure 3.1. Block Diagram of the System</figcaption>
</figure>

Source: Personal Document of the Author
In Figure 3.1, there is a STM32F407VGTX microcontroller that performs domain time-to-frequency conversion on sensor voltage and current data using the FFT algorithm implemented in the CMSIS function. After obtaining output data in the frequency domain, from harmonics 0 to 64, calculations are made for power parameters such as RMS voltage, RMS current, THDv, THDi, and Active Power that are consumed by the load. In addition, load identification is performed using a neural network algorithm, which has undergone learning processes where characteristic harmonics of each load and each combination of loads with parameters including third, fifth, seventh, ninth, and eleventh harmonics have been obtained through FFT computation. Therefore, Smart Energy Meter can identify connected types of loads and analyze the quality conditions of power consumption on connected loads via display devices and mobile phones used by users.

Next, Smart Energy Meter compares energy usage in a specified time interval as information and reminder to users about the electrical usage conditions of the house being monitored through device displays and user's mobile phone.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.2.%20Flowchart%20of%20Smart%20Energy%20Meter%20System%20Operation.jpg){ width="500" }
<figcaption>Figure 3.2. Flowchart of Smart Energy Meter System Operation</figcaption>
</figure>

### System Hardware Planning

Part of the hardware components in the final project are as follows:

#### Power Supply Circuitry

The power supply is an essential component that provides power to various hardware components such as microcontrollers, sensors, displays, high-voltage side supply for AMC1300, sensor references, signal conditioning circuits, and simple indicators like LEDs. Below is the schematic design of the power supply circuit in EAGLE 9.1.1:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.3.%20Schematic%20of%20Power%20Supply%20Circuitry.jpg){ width="500" }
<figcaption>Figure 3.3. Schematic of Power Supply Circuitry</figcaption>
</figure>


In the final project, the hardware components are powered by a 220V AC line which is then converted to 5V DC using the MPM-10-5 non-isolated AC/DC single rectifier. Due to the lack of isolation, a 1A fuse is placed on the output rectifier for protection. After this step, the 5V DC power supply is used as the Bluetooth communication medium, TPSM842 as the microcontroller's power supply, ROE-0505S as an isolated DC-DC converter for the AMC1301 high side and REF2033 as sensor reference and signal conditioning references.

#### Microcontroller Circuit
A microcontroller is an electronic device that functions as a data processing unit requiring supporting circuits such as the crystal, power supply, ADC reference voltage, indicator circuitry, and downloader communication interface to operate according to the needs and requirements specifically suited for the architecture and specifications of the microcontroller being used. Below is the schematic design of the microcontroller and its supporting circuits in Eagle 9.1.1 format:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.4.%20Schematic%20of%20STM32F407VGT6%20Circuit.jpg){ width="500" }
<figcaption>Figure 3.4. Schematic of STM32F407VGT6 Circuit</figcaption>
</figure>

In this final project, an STM32F407VGT6 microcontroller is used to perform analog-to-digital conversion, data domain time to frequency transformation, frequency-domain power calculation, load identification through a neural network algorithm based on the harmonic characteristic of the load, and interact with users through an LCD touchscreen. The following are the specifications of STM32F407VGT6 features used in processing, display, and interaction within Smart Energy Meter.

Table 3.1: List of Microcontroller I/O Pin Specifications for STM32F407VGT7

|No.      |  Pin Address |       Function |        Device|
|---------|--------------|----------------|--------------|
|1.       |PC0           |ADC1_IN10       |  Voltage Sensor|
|2.       |PC1           |ADC2_IN11       |  Current Sensor|
|3.       |PC2           |ADC3_IN12       |  Reference Sensor|
|4.       |PE0           |GPIO_EXTI0      |   Overvoltage Detector (ZCD) for Voltage|
|5.       |PE1           |GPIO_EXTI1      |   Overcurrent Detector (ZCD) for Current|
|6.       |PA13          |SWCLK           |  ST-LINK V2|
|7.       |PA14          |SWDIO           |ST-LINK V2||
|8.       |PA5           |SPI1_SCK        | LCD TFT 2.6" ILI9341 Resistive Touch|
|9.       |PA6           |SPI1_MISO       | LCD TFT 2.6" ILI9341 Resistive Touch|
|10.      |PA7           |SPI1_MOSI       | LCD TFT 2.6" ILI9341 Resistive Touch|
|11.      |PE10          |GPIO_Output     |   LCD TFT 2.6" ILI9341 Resistive Touch|
|12.      |PE11          |GPIO_Output     |   LCD TFT 2.6" ILI9341 Resistive Touch|
|13.      |PE12          |GPIO_Output     |  LCD TFT 2.6" ILI9341 Resistive Touch|
|14.      |PB13          |SPI2_SCK        |  LCD TFT 2.6" ILI9341 Resistive Touch|
|15.      |PB14          |SPI2_MISO       | LCD TFT 2.6" ILI9341 Resistive Touch|
|16.      |PB15          |SPI2_MOSI       | LCD TFT 2.6" ILI9341 Resistive Touch|
|17.      |PD8           |GPIO_Output     |  LCD TFT 2.6" ILI9341 Resistive Touch|
|18.      |PD2           |SDIO_CMD        | SD Card Storage|
|19.      |PC8           |SDIO_D0          | SD Card Storage|
|23.      |PC12          |SDIO_CK        | SD Card Storage|
|24.      |PB10          |USART3_TX       | Bluetooth HC-05|
|25.      |PB11          |USART3_RX| Bluetooth HC-05|


#### Current Sensor Design

The current sensor is an instrument that functions as a value detection device for electrical current. In the final project, the writer has designed and made a current sensor to measure the current on bidirectional current. Then, the output of the current sensor in reading electrical current, which will later be inserted into the ADC microcontroller, so the data can be processed, analyzed, stored, and displayed. The core components in this current sensor are Shunt Resistors that function as an amperage divider so that AMC1300 can operate as a current sensor. For explanations of the sections of AMC1300 have been explained on theoretical basis. Here is the design of the current sensor applied to AMC1300 in the form of schematic design on EAGLE 9.1.1.
        
<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.5%20Current%20Sensor%20Schematic%20Design.jpg){ width="400" }
<figcaption>Figure 3.5 Current Sensor Schematic Design</figcaption>
</figure>


In designing the AMC1300 as a current sensor, it must look at the maximum allowable voltage that can
enter AMC1300 on pins 2 and 3, which is 250 mVpp. Therefore, a resistor is needed to maintain that
voltage entering AMC1300 does not exceed 250 mVpp.

The system parameters are defined as follows:

| Parameter | Value |
|-----------|-------|
| $I_{max_{system}}$ | 10 A |
| $V_{in_{AMC_{max}}}$ | 250 mVpp |
| $V_{nom_{system}}$ | 220 $V_{RMS}$ = 311 Vpp (PLN 1 Phase) |

The minimum power requirement for the shunt resistor is:

$$
P_{shunt} = I_{max_{system}}^2 \times R_{shunt}
$$

Thus, the shunt resistor required on AMC1300 is:

$$
R_{shunt} = \frac{V_{in_{AMC_{max}}}}{I_{max_{system}}} = \frac{0.250 \text{ Vpp}}{14.14 \text{ Ipp}} = 17.6 \text{ m}\Omega
$$

With the minimum power requirement for the shunt resistor being:

$$
P_{shunt} = 250 \text{ mV} \times 10 \text{ A} = 2.5 \text{ Watt}
$$

However, to avoid damage to AMC1300 when a large current surge may occur, and considering the
availability of resistor components in the market, the writer uses a shunt resistor with
specifications of $15 \text{ m}\Omega$ / 6 Watt, so the maximum detectable current becomes:

$$
I_{pp} = \frac{V}{R} = \frac{0.250}{0.015} = 16.66 \text{ A}
$$

As an extra safety measure to prevent the current sensor circuit from exceeding the maximum designed
current, a fuse of 15 A is used, so the maximum system current allowed in the final project is
**15 Ampere**.

#### Voltage Sensor Design

The voltage sensor is an instrument that detects the value of electrical potential. In this final project, the writer designed and built a voltage sensor to measure the current voltage on a bidirectional current. The output from the voltage sensor during voltage measurement, which will later be input into the ADC microcontroller for processing, analysis, storage, and display. The core components of this voltage sensor are resistors that serve as voltage dividers with an upper limit of 250mV input voltage from the AMC1300, so the AMC1300 can perform AC signal clamping into DC without changing the characteristics of the signal so that it can be operated as a voltage sensor. For explanations of the parts of AMC1300, see the basic theory. Here is the design of the current sensor applied to AMC1300 in the form of schematic design in EAGLE 9.1.1:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.6%20Voltage%20Sensor%20Design.jpg){ width="400" }
<figcaption>Figure 3.6 Voltage Sensor Design</figcaption>
</figure>


The difference between planning and building a voltage sensor and a current sensor lies in:

1. Connection topology with the system
2.  Design and value of resistances on the load resistor

The connection method for using this voltage sensor is parallel to the load or source voltage that
will be measured, so the resistance used for the voltage sensor is very large but with relatively
small resistance power, while the resistance used for the current sensor is very small but has a
large power. The calculation to determine the value of the resistor $R$ for the AMC1300 is as
follows:

**Voltage Divider Resistor**

The target output voltage at AMC1300 input is:

$$
V_{R_2} = V_{in_{AMC}} = 250 \text{ mVpp}
$$

Applying the voltage divider formula:

$$
V_{R_2} = \frac{R_2}{R_1} \times V_{in_{max_{system}}}
$$

Substituting the known values, where $R_1 = 1{,}680{,}000\ \Omega$ and
$V_{in_{max_{system}}} = 353.55 \text{ V}$ (250 $V_{RMS}$):

$$
0.250 = \frac{R_2}{1{,}680{,}000} \times 353.55
$$

$$
R_2 = \frac{0.250}{311} \times 1{,}680{,}000 = 1{,}187\ \Omega \approx 1\ \text{K}\Omega
$$

Due to the lack of a $1{,}187\ \text{K}\Omega$ resistor in the market, a $1\ \text{K}\Omega$
resistor is used instead. The resulting voltage at the AMC1300 sensor input when the nominal
AC voltage is 220 $V_{RMS}$ (311 Vpp) is:

$$
V_{R_2} = \frac{R_2}{R_1} \times V_{in_{system}}
$$

$$
V_{R_2} = \frac{1{,}000}{1{,}680{,}000} \times 311 = 0.185 \text{ Vpp}
$$

Therefore, based on the planning above, when the nominal voltage is measured, there is a margin
between the measured voltage and the maximum reading of the sensor ($250 \text{ mVpp}$). This is
intentional — if a sudden voltage surge occurs, the sensor and microcontroller remain protected
from overvoltage damage.

#### Signal Conditioning Circuit

It is important to note that the AMC1300 has two outputs: Vout Positive and Vout Negative. Both outputs can be represented as follows:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.7%20Output%20signal%20from%20AMC1300%20on%20a%20sinusoidal%20signal.jpg){ width="500" }
<figcaption>Figure 3.7 Output signal from AMC1300 on a sinusoidal signal</figcaption>
</figure>


To improve data reading, maximize the use of the AMC1300 for voltage sensors and current sensors, and to minimize the risk of overvoltage or excessive voltages entering the ADC microcontroller, we also planned a signal conditioning circuit before the signal from the sensor is input into the pin of the ADC microcontroller. The active components used in the signal conditioning circuit are an operational amplifier and a Zener diode. The operational amplifier used is OPA376, which is a Texas Instruments recommended Op-Amp suitable for optimizing AMC1300 performance. In this signal conditioning process for the final task, the OPA376 operates as the summation (summing) circuit of VoutP and VoutN from AMC1300. To avoid zero value, an inverting process is applied to VoutN so that it can be added with VoutP. The output voltage of the OPA376 from summing VoutP and VoutN of the AMC1300 is clamped by a Schottky Diode, which functions to protect the OPA376 output voltage from exceeding 3.3V, thus protecting the channel ADC STM32F407VGT6, similar to a Zener diode but requiring a reference voltage.

Here are the signal conditioning circuits for both current and voltage sensors:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.8%20Signal%20Conditioning%20Circuit%20Output%20AMC1300.jpg){ width="500" }
<figcaption>Figure 3.8 Signal Conditioning Circuit Output AMC1300</figcaption>
</figure>


The output gain of the AMC1300 is 8.2 times the sensor input voltage, as shown below:

| Parameter | Value |
|-----------|-------|
| $V_{in}$ | 250 mVpp |
| $V_{out_P}$ | 1.025 Vpp |
| $V_{out_N}$ | -1.025 Vpp |
| $V_{out_{Diff}}$ | 2.05 Vpp |

In the signal conditioning circuit creation, we followed the sensor AMC1300's procedure
recommendations, as shown below:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.9%20OPA376%20Recommended%20Network.jpg){ width="500" }
<figcaption>Figure 3.9 OPA376 Recommended Network</figcaption>
</figure>

The equation for the OPA376 Op-Amp is as follows:

$$
V_{out} = \left( V_{out_P} \times \frac{R_4}{R_3} \right) + \left( V_{out_N} \times \frac{R_1}{R_2} \right) + V_{CM}
$$

$$
V_{out} = \left( V_{out_P} - V_{out_N} \right) + V_{CM} 
$$

Before the signal from the conditioning circuit is input into the ADC microcontroller, a Zener diode SS351 with reference voltage is inserted to protect against overvoltage on the AMC1300 input.

#### Zero Crossing Detector Circuit
The Zero Crossing Detector circuit, also known as a ZCD, serves to detect zero-crossing points from periodic signals, primarily sine waves on alternating current (AC) currents. The main component in this project's final design is the comparator, which compares the output voltage of the signal conditioner with the reference voltage. This reference voltage comes from IC REF2033, which has an output of 1.65 volts. For the comparator used, IC LM2903D is utilized, which includes two comparators within a single IC LM2903D, so only one IC LM2903D is required to detect zero-crossing points on the current sensor and voltage sensor.

Here are the wiring diagrams for the Zero Crossing Detector circuit:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.10%20Zero%20Crossing%20Detector%20Circuit%20for%20Voltage.jpg){ width="500" }
<figcaption>Figure 3.10 Zero Crossing Detector Circuit for Voltage</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.11%20Zero%20Crossing%20Detector%20Circuit%20for%20Current.jpg){ width="500" }
<figcaption>Figure 3.11: Zero Crossing Detector Circuit for Current</figcaption>
</figure>


All the design drawings were created using EAGLE 9.1.1 software, which was then implemented on a board consisting of the Power Supply circuit, an SMT32F407VGT6 microcontroller circuit, current sensor circuit, voltage sensor circuit, signal conditioner circuit, and other supporting circuits that are already integrated in EAGLE 9.1.1.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.12%20Overall%20Design%20Board%20for%20Smart%20Energy%20Meter.jpg){ width="500" }
<figcaption>Figure 3.12 Overall Design Board for Smart Energy Meter</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.13%20Top%20View%20of%20Smart%20Energy%20Meter%20Board.jpg){ width="500" }
<figcaption>Figure 3.13 Top View of Smart Energy Meter Board</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.14%20Bottom%20View%20of%20Smart%20Energy%20Meter%20Board.jpg){ width="500" }
<figcaption>Figure 3.14 Bottom View of Smart Energy Meter Board</figcaption>
</figure>

#### Casing & Wiring Design Smart Energy Meter

For the final project, casing and wiring are required for a Smart Energy Meter that represents a simple residential network where loads can be connected to power sources and monitored by the Smart Energy Meter. This casing and wiring consist of input and output channels like those found in conventional meters, with inputs comprising phase wires carrying voltage and neutral wires. These then pass through an impedance sensing circuit from the Smart Energy Meter before being transmitted to a load via a MCB with a 6A rating as protection.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.15%20Design%20of%20the%20Casing%20for%20the%20Smart%20Energy%20Meter.jpg){ width="300" }
<figcaption>Figure 3.15 Design of the Casing for the Smart Energy Meter</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.16%20Design%20of%20wiring%20for%20the%20Smart%20Energy%20Meter.jpg){ width="500" }
<figcaption>Figure 3.16 Design of wiring for the Smart Energy Meter</figcaption>
</figure>


Based on the design of the Smart Energy Meter wiring, both the voltage sensors start working only when the MCB at 6A is in a closed condition, while current sensors begin operating when the MCB is in a closed state and there is a connected load in the provided contact box. The following are the designs of the casing and wiring for the Smart Energy Meter as realized.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.17%20Realization%20of%20Casing%20and%20Wiring%20Design%20for%20the%20Smart%20Energy%20Meter.jpg){ width="500" }
<figcaption>Figure 3.17 Realization of Casing and Wiring Design for the Smart Energy Meter</figcaption>
</figure>

### Firmware and Computation Design

The software components of the system in this project are as follows:

#### Calculation Algorithm for Power Parameters
A crucial step in digital signal processing is to analyze both input and output signals to determine the characteristics of a specific physical system from these signals. Time-domain analysis requires extensive analysis involving derivatives of functions, which can introduce inaccuracies in the analysis results. Frequency-domain analysis is simpler as the main characteristic of a signal is its frequency. To work in the frequency domain, an appropriate formula is required so that the signal manipulation process reflects reality accurately. Here is the flowchart for calculating power parameters using the frequency domain.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.18%20Flowchart%20Programming%20Calculation%20of%20Power%20Parameters.jpg){ width="200" }
<figcaption>Figure 3.18 Flowchart Programming Calculation of Power Parameters</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.19%20Flowchart%20Calculating%20Power%20Parameters%20Using%20FFT%20Algorithm.jpg){ width="500" }
<figcaption>Figure 3.19 Flowchart Calculating Power Parameters Using FFT Algorithm</figcaption>
</figure>


When using the frequency domain for calculating power parameters, a proper calibration process is needed, whether it involves calibrating harmonic components or calibrating the sought electric quantity. Therefore, an instrument with high precision is required.

#### Display Algorithm for LCD TFT ILI9341

The display program, which includes the LCD TFT as the only interface between the tool and the user due to cost and pin limitations on the STM32F407VGT7, uses an LCD ILI9341 with resistive touch capabilities that require two SPI peripherals: one for the display and one for the touchscreen.

Additionally, creating the LCD TFT display program aims to simplify the entire algorithm when all programs are integrated and make it easier for users to use this tool during their final project. Here is the flowchart for the display program in the progress of the final project:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.20%20Flowchart%20Program%20Displaying%20LCD%20TFT.jpg){ width="500" }
<figcaption>Figure 3.20 Flowchart Program Displaying LCD TFT</figcaption>
</figure>

To better understand the information provided, three different displays are shown on the LCD TFT ILI9341. These displays will be explained as follows:
- General Information: Contains general information about the connected loads on the Smart Energy Meter, including voltage, current, energy usage, and harmonic currents and voltages.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.21%20General%20Information%20Display.jpg){ width="250" }
<figcaption>Figure 3.21 General Information Display</figcaption>
</figure>

- Harmonic Analysis: Provides specific information about the analysis of current harmonics of the currently used load, including RMS value of the load current, THDR value, maximum and minimum values of the Spectrum Harmonics, and the level of Spectrum Harmonics from fundamental to the 13th harmonic.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.22%20Harmonic%20Analysis%20Display.jpg){ width="250" }
<figcaption>Figure 3.22 Harmonic Analysis Display</figcaption>
</figure>

- Load Monitoring: Contains specific information about energy usage, power absorbed by the load, conditions of the connected load in the Smart Energy Meter, as well as denormalized parameters that represent the performance of the Neural Network algorithm.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.23%20Load%20Monitoring%20Display.jpg){ width="250" }
<figcaption>Figure 3.23 Load Monitoring Display</figcaption>
</figure>


#### Neural Network Algorithm

The neural network (NN) algorithm for identifying loads is an important component in this project, so there needs to be a well-planned method for it. Load identification during the final project involves recognizing the harmonic components of connected loads on the Smart Energy Meter. The NN algorithm is used to identify loads through harmonic components, thus being able to distinguish loads even if they have the same current consumption value. Manual learning or training can also be performed using MATLAB software.

The input for the NN algorithm consists of the RMS value of the current and harmonics at fundamental frequency (50 Hz), third-order harmonics (150 Hz), fifth-order harmonics (250 Hz), seventh-order harmonics (350 Hz), and ninth-order harmonics (450 Hz). The load specifications used are as follows:

1. Air Conditioner
2. LED TV
3. Energy-Efficient Lamp

To make the output of the NN algorithm more precise, we can increase the number of learning data in the training process, for this reason, 101 learning data are taken for each combination to be trained in MATLAB software so that later on, the best values of weights and biases will be obtained for the calculation of output from load identification. Here are some combinations that will be trained using the NN algorithm.
Table 3.2: Variations in Learning Load Combinations

| NO	| Load Conmbination	| n-th Data	| rms	| h1	| h3	| h5	| h7	| h9	| TARGET |
|-------|-------------------|-----------|-------|-------|-------|-------|-------|-------|--------|
|1	|No Load	|1|	0|	0|	0|	0|	0|	0|	1
|   |    |2|	0|	0|	0|	0|	0|	0|	1
|   |    |3|	0|	0|	0|	0|	0|	0|	1
|   |    |4|	0|	0|	0|	0|	0|	0|	1
|   |    |…|	….|	….|	….|	….|	….|	….|	1
|   |    |101|	0|	0|	0|	0|	0|	0|	1
| NO	| Load Conmbination	| n-th Data	| rms	| h1	| h3	| h5	| h7	| h9	| TARGET |
|2	|Air Conditioner	|1	|0,1763|	0,1601|	0|	0|	0|	0|	2|
|   |     |2|	0,1773|	0,1698	|0|	0|	0|	0|	2|
|   |     |3|	0,1776|	0,178|	0|	0|	0|	0|	2|
|   |     |4|	0,179|	0,1729|	0|	0|	0|	0|	2|
|   |     |…|	….|	….|	….|	….|	….|	….	|2|
|   |     |101|	0,1718|	0,17|	0|	0|	0|	0|	2|
| NO	| Load Conmbination	| n-th Data	| rms	| h1	| h3	| h5	| h7	| h9	| TARGET |
|3	|TV LED|	1|	0,2071|	0,0983|	0,0992|	0,0707|	0,0473|	0,017|	3|
|   |     |2	|0,2202	|0,1093|	0,0987|	0,0791|	0,0491|	0,0217|	3|
|   |     |3	|0,1821	|0,102|	0,1021|	0,0879|	0,0511|	0,0145|	3|
|   |     |4	|0,2165	|0,0885|	0,0821|	0,0626|	0,0352|	0,0079|	3|
|   |     |...	|….|	….|	…|	…|	…|	…	|3||
|   |     |101	|0,2204|	0,1253|	0,0886|	0,0742|	0,0539|	0,0304|	3|
| NO	| Load Conmbination	| n-th Data	| rms	| h1	| h3	| h5	| h7	| h9	| TARGET |
|4	|Energy-Efficient Lamp|	1|	0,2677|	0,1769|	0,1261|	0,0764|	0,0588|	0,0343|	4|
|   |     |2	|0,2778|	0,1749|	0,1162|	0,0669|	0,051|	0,0454|	4|
|   |     |3	|0,2635|	0,1838|	0,1249|	0,0767|	0,0472|	0,038|	4|
|   |     |4	|0,2734|	0,1747|	0,1156|	0,0644|	0,0508|	0,0475|	4|
|   |     |...|	….|	….|	…|	…|	…|	…|	4|
|   |     |101|	0,2906|	0,188|	0,1217|	0,074|	0,0514|	0,0471|	4|
| NO	| Load Conmbination	| n-th Data	| rms	| h1	| h3	| h5	| h7	| h9	| TARGET |
|5	|TV LED & Air Conditioner|	1|	0,3686|	0,2934|	0,0871|	0,0632|	0,0439|	0,0208|	5|
|   |     |2|	0,3468|	0,2963|	0,0945|	0,0705|	0,0436|	0,0246|	5|
|   |     |3	|0,3465|	0,301|	0,0989|	0,0743|	0,0496|	0,0302|	5|
|   |     |4|	0,3376|	0,2786|	0,0974|	0,0753|	0,032|	0,0356|	5|
|   |     |...	|….|	….|	…	|…	|…|	…|	5|
|   |     |101|	0,3536|	0,2925|	0,0792|	0,0443|	0,0357|	0,0048|	5|
| NO	| Load Conmbination	| n-th Data	| rms	| h1	| h3	| h5	| h7	| h9	| TARGET |
|6	|TV LED & Energy-Efficient Lamp|	1|	0,3695|	0,2844|	0,1942|	0,0683|	0|	0,0239|	6|
|   |     |2|	0,3935|	0,284|	0,185|	0,0636|	0,0047|	0,0045|	6|
|   |     |3|	0,3823|	0,283|	0,1888|	0,0577|	0|	0,0173	|6|
|   |     |4|	0,385|	0,2797|	0,176|	0,0833|	0|	0,0291|	6|
|   |     |...|	….|	….|	…|	…	|…|	…|	6|
|   |     |101|	0,392	|0,2775|	0,1904|	0,0548|	0,003|	0,0332	|6|
| NO	| Load Conmbination	| n-th Data	| rms	| h1	| h3	| h5	| h7	| h9	| TARGET |
|7	|Air Conditioner & Energy-Efficient Lamp|	1|	0,4059|	0,326|	0,0913|	0,0376|	0,0226|	0,022|	7|
|   |     |2|	0,4019|	0,3584|	0,1204|	0,0779|	0,055|	0,0352	|7|
|   |     |3|	0,4136|	0,3618|	0,1189|	0,0666|	0,0441|	0,0425	|7|
|   |     |4|	0,4|	0,3482|	0,1186|	0,0594|	0,0534|	0,0436	|7|
|   |     |...|	….|	….|	…	|…|	…|	…	|7|
|   |     |101|	0,4078|	0,3454|	0,1161|	0,0577|	0,0559|	0,0318	|7|
| NO	| Load Conmbination	| n-th Data	| rms	| h1	| h3	| h5	| h7	| h9	| TARGET |
|8	|TV LED, Energy-Efficient Lamp & Air Conditioner|	1|	0,5499|	0,4939|	0,1699|	0,0756|	0,0187|	0,0523|	8|
|   |     |2	|0,5416|	0,477|	0,1744|	0,0393|	0,0087|	0,0513	|8|
|   |     |3|	0,5585|	0,4729|	0,1994|	0,0575	|0,0166|	0,0427	|8|
|   |    | 4|	0,5311|	0,483|	0,1713|	0,0685|	0,0182|	0,0295	|8|
|   |     |...|	….|	….|	…|	…|	…|	…|	8|
|   |     |101|	0,5386|	0,4622|	0,1561|	0,0317|	0,0272|	0,0639	|8|


Next, we perform the design of the NN algorithm in MATLAB software by creating a workspace consisting of learning data and target data with an explanation that there are 6x808 input data and 1x808 target data. Additionally, it is necessary to design the JST architecture that will be used, using which we can obtain precise output values by processing 6 input data into 8 neurons in the Hidden Layer with the LOGSIG activation function, and then entering the Output Layer with the TANSIG activation function and subsequently performing denormalization so that the output is a number from 1 to 8 representing the condition of the load.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.24%20Architecture%20of%20JST%20Detection%20Algorithm.jpg){ width="500" }
<figcaption>Figure 3.24: Architecture of JST Detection Algorithm</figcaption>
</figure>


Figure 3.24 shows an illustration of the designed JST architecture. The next step is the training process of JST, this process is performed repeatedly until the best values of weights and biases are obtained for the calculation output with the smallest possible error, so that the regression result of Training, Validation & Test reaches 1. After performing multiple training processes, the best result is found at iteration 534.

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.25%20Process%20from%20JST%20Training%20Algorithm.jpg){ width="500" }
<figcaption>Figure 3.25 Process from JST Training Algorithm</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.26%20Best%20Regression%20Plot%20of%20JST%20Algorithm.jpg){ width="500" }
<figcaption>Figure 3.26 Best Training Performance of JST Algorithm</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.27%20Best%20Regression%20Plot%20of%20JST%20Algorithm.jpg){ width="500" }
<figcaption>Figure 3.27 Best Regression Plot of JST Algorithm</figcaption>
</figure>


After the training process is complete, the results of the training can be seen in Figure 3.28., After completing the training process, the parameters of the NN algorithm, which include weight (W) and bias (B) for each hidden layer and output layer of the designed algorithm.

Table 3.3: Weight (W) and Bias Parameters on Layer 1

| Neuron | Weight 1 | Weight 2 | Weight 3 | Weight 4 | Weight 5 | Weight 6 | Bias     |
|--------|----------|----------|----------|----------|----------|----------|----------|
| 1      | 14.2109  | 31.9712  | -67.1798 | -65.9171 | -28.83   | 4.019    | -50.3135 |
| 2      | -37.62   | -57.1581 | 42.6421  | -12.6324 | -14.7227 | 8.937    | 6.3582   |
| 3      | -1.3751  | 4.7549   | 44.2802  | -13.708  | -19.3646 | -2.744   | -19.6014 |
| 4      | -20.8764 | -2.9745  | -1.0278  | -1.5516  | -9.7267  | -0.43725 | 9.2935   |
| 5      | 244.7532 | 201.8466 | -30.4454 | 11.7708  | 3.9845   | -1.9483  | -126.4218|
| 6      | -4.3426  | 138.101  | -24.2581 | -52.2111 | -57.3235 | -19.2858 | -83.9288 |
| 7      | 11.3929  | -33.22   | 25.6788  | 5.1466   | 3.6771   | 6.4989   | -22.2309 |
| 8      | -62.7838 | -38.655  | -78.1346 | 19.2386  | 12.0053  | -15.6732 | -41.3666 |


Table 3.4: Weight (W) and Bias Parameters on Layer 2

| Neuron | Weight 1 | Weight 2 | Weight 3  | Weight 4    | Weight 5 | Weight 6 | Weight 7   | Weight 8 | Bias   |
|--------|----------|----------|-----------|-------------|----------|----------|------------|----------|--------|
| 1      | -8.9663  | -0.28768 | 0.60199   | 1.0254E-07  | 0.75204  | 8.5285   | -1.9187E-08| -0.3143  | 0.14384|

Based on Table 3.3 and Table 3.4., they are data parameters of the NN algorithm, which include weight and bias obtained from training results and will be used in mathematical calculations for load identification to be applied to microcontrollers.
The process of calculating the NN algorithm for identifying loads is as follows:

1. Normalization

``` C++
// ===== Raw signals =====
double rms_current;              // RMS value of the current from Frequency Domain Analysis
double harmonic_current[10];     // harmonic spectrum (index = harmonic order)

// ===== NN input =====
double input_raw[6];
double input_max[6] = {
    0.5781, // RMS
    0.5096, // H1
    0.2095, // H3
    0.0889, // H5
    0.0775, // H7
    0.0639  // H9
};
double input_normalized[6];

// ===== Assign inputs =====
input_raw[0] = rms_current;
input_raw[1] = harmonic_current[1];  // H1
input_raw[2] = harmonic_current[3];  // H3
input_raw[3] = harmonic_current[5];  // H5
input_raw[4] = harmonic_current[7];  // H7
input_raw[5] = harmonic_current[9];  // H9

// ===== Normalization =====
for (int i = 0; i < 6; i++) {
    input_normalized[i] = (2 * input_raw[i] / input_max[i]) - 1;
}
```

Normalization is one of the most important parts of the NN algorithm that requires a maximum and minimum value so that the data entering the Hidden Layer ranges from -1 to 1.

2. Layer 1 / hidden layer

``` C++
// ===== Layer 1 parameters =====
double weights_layer1[8][6] = {
    {14.2109, 31.9712, -67.1798, -65.9171, -28.83,   4.019},
    {-37.62,  -57.1581, 42.6421, -12.6324, -14.7227, 8.937},
    {-1.3751, 4.7549,  44.2802, -13.708,  -19.3646, -2.744},
    {-20.8764,-2.9745, -1.0278, -1.5516,  -9.7267,  -0.43725},
    {244.7532,201.8466,-30.4454,11.7708,  3.9845,   -1.9483},
    {-4.3426, 138.101, -24.2581,-52.2111, -57.3235, -19.2858},
    {11.3929, -33.22,  25.6788, 5.1466,   3.6771,    6.4989},
    {-62.7838,-38.655, -78.1346,19.2386,  12.0053,  -15.6732}
};

double bias_layer1[8] = {
    -50.3135, 6.3582, -19.6014, 9.2935,
    -126.4218, -83.9288, -22.2309, -41.3666
};

// ===== Layer 1 computation =====
double layer1_output[8];

for (int neuron = 0; neuron < 8; neuron++) {
    layer1_output[neuron] = 0;

    for (int i = 0; i < 6; i++) {
        layer1_output[neuron] += input_normalized[i] * weights_layer1[neuron][i];
    }

    layer1_output[neuron] += bias_layer1[neuron];
}
```

This step involves multiplying the normalized data with weights, and each neuron has different weights for each input and different biases for each neuron, meaning that for each neuron, there are 6 inputs multiplied by 6 different weights where at the end of the operation, it is added with bias, this applies to all neurons. Thus, there are 48 multiplication and addition operations in the Hidden Layer with 8 neurons and 6 inputs.

3. Activation layer 1

``` C++
// ===== Layer 1 Activation Function =====
double layer1_activated[8];

for (int i = 0; i < 8; i++) {
    layer1_activated[i] = 1.0 / (1.0 + exp(-layer1_output[i]));
}
```

In this step, mathematical operations are performed using an activation function. Since the original design of the NN algorithm for identification uses the LOGSIG activation function, the original mathematical equation can be seen as shown above in the source code.

4. Layer 2 / output layer

``` C++
// ===== Layer 2 (Output Layer) =====
double weights_layer2[8] = {
    -8.9663, -0.28768, 0.60199, 0.00000010254,
    0.75204, 8.5285, -0.000000019187, -0.3143
};

double bias_layer2 = 0.14384;

double layer2_output = 0;

// Weighted sum
for (int i = 0; i < 8; i++) {
    layer2_output += layer1_activated[i] * weights_layer2[i];
}

// Add bias
layer2_output += bias_layer2;
```

The mathematical operation on the Output Layer is identical to that of the Hidden Layer where the result of the activation function becomes input for the Output Layer, which will then be multiplied by weights from Layer 2 for each input and finally added by bias for the Output Layer. Since there are 8 neurons in the Hidden Layer, there are 8 multiplication and addition operations.

5. Activation layer 2

``` C++
// ===== Layer 2 Activation (tanh / tansig) =====
double layer2_activated = (2.0 / (1.0 + exp(-2.0 * layer2_output))) - 1.0;
```

In this step, mathematical operations are performed using the activation function according to the architecture of the NN algorithm that has been trained before. Since it uses the TANSIG activation function, the original mathematical equation can be seen as shown above in the source code.

6. Denormalization

``` C++
// ===== Output Denormalization =====
const double target_min = 10.0;
const double target_max = 80.0;
const double scale_divisor = 10.0;

// Denormalize from [-1, 1] → [target_min, target_max], then scale
double denormalized_output =
    ((layer2_activated + 1.0) * (target_max - target_min) / 2.0 + target_min)
    / scale_divisor;
```

In this step, a suitable mathematical formula is needed to obtain so that the output of the NN algorithm detection load matches the target that was entered during training. Therefore, based on the mathematical equation in the source code above. When there is no load condition, TANSIG[0] has a value of -1, therefore the output of the NN algorithm will be 1. On the other hand, for other conditions, the output will be according to the target's high precision level.

The NN algorithm described in this section is the entire planning process including training and mathematical calculation so that it obtains the output data as per simulation in MATLAB software and calculations on microcontrollers also as desired by the target.

## Chapter IV: Test and Analysis

In this chapter, we will discuss the testing and analysis of some parts of the system that have been designed and built in the previous chapter. The testing and analysis are carried out to ensure that the system works as intended and to evaluate the performance of the system. The testing will be conducted on several components, including signal sampling, FFT algorithm, current sensor, and voltage sensor. Each component will be tested separately to identify any issues or errors that may arise during the operation of the system. The results of the testing will be analyzed to determine the accuracy and reliability of the system in measuring electrical parameters such as voltage, current, and power.

### Signal Sampling Testing

#### Purpose of Testing
The use of Fast Fourier Transform (FFT) with radix-2 requires an appropriate windowing process depending on the type of FFT used.
In this final project, we use FFT radix-2 with 64 time-domain signal points that are converted to frequency domain.

#### Instruments Used for Testing

The following instruments were used in the testing procedure:

1. Voltage Variac
2. Smart Energy Meter Board
3. Digital Multimeter
4. Ammeter
5. Linear Load
6. Non-linear Load

#### Testing Scheme

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.1%20Illustration%20of%20Signal%20Sampling%20Process.jpg){ width="600" }
<figcaption>Figure 4.1 Illustration of Signal Sampling Process</figcaption>
</figure>

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.2%20Testing%20Scheme%20for%20Signal%20Sampling.jpg){ width="250" }
<figcaption>Figure 4.2 Testing Scheme for Signal Sampling</figcaption>
</figure>

#### Procedure of Testing

The procedure for conducting testing as follows:

- Prepare the testing equipment
- Arrange the testing equipment as shown in the schema above
- Gradually increase the output voltage of the Voltage Variac from 0 to 220V
- Connect with the Load
- Record sensor data using Debug ST-LINK V2
- Perform Analysis and Conclusion

#### Testing Data

Here is the testing result for signal capture:

=== "Table 4.1. Test Data of Signal Capture Power Voltage Load"

    | Data n-th | Data Value |
    |-----------|------------|
    | 0  | -600 |  
    | 1  | -835 |  
    | 2  | -972 |  
    | 3  | -1057|  
    | 4  | -1135|  
    | 5  | -1241|  
    | 6  | -1297|  
    | 7  | -1328|  
    | 8  | -1371|  
    | 9  | -1374|  
    | 10 | -1392|  
    | 11 | -1404|  
    | 12 | -1398|  
    | 13 | -1402|  
    | 14 | -1392|  
    | 15 | -1331|  
    | 16 | -1291|
    | 17 | -1166|
    | 18 | -1082|
    | 19 | -953 |
    | 20 | -843 |
    | 21 | -713 |
    | 22 | -579 |
    | 23 | -476 |
    | 24 | -337 |
    | 25 | -216 |
    | 26 | -93  |
    | 27 | 51   |
    | 28 | 174  |
    | 29 | 320  |
    | 30 | 466  |
    | 31 | 606  |
    | 32 | 724  |
    | 33 | 848  |
    | 34 | 960  |
    | 35 | 1052 |
    | 36 | 1140 |
    | 37 | 1232 |
    | 38 | 1297 |
    | 39 | 1293 |
    | 40 | 1340 |
    | 41 | 1369 |
    | 42 | 1386 |
    | 43 | 1396 |
    | 44 | 1407 |
    | 45 | 1402 |
    | 46 | 1414 |
    | 47 | 1392 |
    | 48 | 1340 |
    | 49 | 1278 |
    | 50 | 1173 |
    | 51 | 1067 |
    | 52 | 960  |
    | 53 | 829  |
    | 54 | 714  |
    | 55 | 584  |
    | 56 | 459  |
    | 57 | 330  |
    | 58 | 225  |
    | 59 | 103  |
    | 60 | -49  |
    | 61 | -193 |
    | 62 | -330 |
    | 63 | -464 |

=== "Table 4.2 Test Data of Signal Capture Current Load"

    | Data n-th | Data Value |
    |-----------|------------|
    | 0  | -202|  
    | 1  | -84 |  
    | 2  | -79 |  
    | 3  | -66 |  
    | 4  | -56 |  
    | 5  | -83 |  
    | 6  | -73 |  
    | 7  | -58 |  
    | 8  | -48 |  
    | 9  | -58 |  
    | 10 | -65 |  
    | 11 | -24 |  
    | 12 | -37 |  
    | 13 | -16 |  
    | 14 | -4  |  
    | 15 | 5   |  
    | 16 | -11 |
    | 17 | 22  |
    | 18 | 3   |
    | 19 | 28  |
    | 20 | 28  |
    | 21 | 26  |
    | 22 | 30  |
    | 23 | 27  |
    | 24 | 47  |
    | 25 | 68  |
    | 26 | 78  |
    | 27 | 61  |
    | 28 | 69  |
    | 29 | 83  |
    | 30 | 129 |
    | 31 | 220 |
    | 32 | 202 |
    | 33 | 155 |
    | 34 | 78  |
    | 35 | 90  |
    | 36 | 108 |
    | 37 | 79  |
    | 38 | 67  |
    | 39 | 60  |
    | 40 | 72  |
    | 41 | 58  |
    | 42 | 60  |
    | 43 | 50  |
    | 44 | 36  |
    | 45 | 35  |
    | 46 | 11  |
    | 47 | 20  |
    | 48 | 20  |
    | 49 | -11 |
    | 50 | -16 |
    | 51 | -14 |
    | 52 | -22 |
    | 53 | -45 |
    | 54 | -23 |
    | 55 | -55 |
    | 56 | -35 |
    | 57 | -41 |
    | 58 | -70 |
    | 59 | -60 |
    | 60 | -78 |
    | 61 | -62 |
    | 62 | -80 |
    | 63 | -232|

#### Analysis of Data

From the signal capture testing, the following data were obtained: as shown in the table above.

In this thesis, the FFT Radix-2 algorithm was used to increase the accuracy of calculations. Therefore, it is necessary to perform time-domain signal sampling a multiple of 2 for each signal period. To process within the FFT Radix-2 algorithm, there must be data in the time domain that is a multiple of the number 2, in this case, we chose to use a sampling frequency of 3200 Hz which will result in 64 points of data being transformed into the frequency domain as it was considered sufficient for calculating electrical power parameters. 

Moreover, determining the number of data samples taken is achieved by setting the signal capture period on the STM32F407VGT6. In this capture process, we used Timer 2 which is plotted in APB 1 and used to set the signal capture period. Here is the equation for implementing time-domain data acquisition:

    F_Sampling = F_Core / ((1 + APB) * (1 + Counter))

Where: 

    FSampling      = Sampling frequency (Hz)
    FCore          = Maximum core frequency of STM32F407VGTx (168MHz)
    APB            = Mapping Timer used for signal capture
    Counter        = Nominal Counter period of signal capture

    3200 Hz = 168 MHz / ((2) * (1 + Counter)) 
                                
    Counter = 26250 – 1
        
Therefore, in the Timer 2 program, the counter period instruction is written as follows:

    htim2.Init.Period = 26250-1;

Note that in this testing, there were two loads taken for signal capture: voltage and current. Load 1 was a combination of a Resistor Switcher as linear load and an Air Conditioner as non-linear load with an inductive nature. Here are the results from Load 1's signal capture data

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.3%20Result%20of%20Load%20Voltage%20Signal%20Capture.jpg){ width="250" }
<figcaption>Figure 4.3 Result of Load Voltage Signal Capture</figcaption>
</figure>

On the other hand, Load 2 was a combination of Laptop Charger as non-linear load with a switching nature and Air Conditioner as a non-linear load with an inductive nature. Here are the results from Load 2's signal capture data

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.4%20Result%20of%20Load%20Current%20Signal%20Capture.jpg){ width="250" }
<figcaption>Figure 4.4 Result of Load Current Signal Capture</figcaption>
</figure>

### Algorithm FFT Testing
#### Objectives of Testing

The purpose of this testing is to correct the shift of time-domain signals to frequency domain so that it becomes easier for physical analysis and signal synthesis if performed in the time domain because it involves derivatives of the time function which can reduce precision.

#### Test Equipment

In the execution of the Testing, the following tools were used:

1.        Variac
2.        Smart Energy Meter Board
3.        Digital Multimeter

#### Testing Scheme

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.5%20Schematic%20Diagram%20for%20ONLINE%20FFT%20Algorithm%20Testing%20on%20Voltage%20Sensor.jpg){ width="250" }
<figcaption>Figure 4.5 Schematic Diagram for ONLINE FFT Algorithm Testing on Voltage Sensor</figcaption>
</figure>

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.6%20Schematic%20Diagram%20for%20OFFLINE%20FFT%20Algorithm%20Testing.jpg){ width="500" }
<figcaption>Figure 4.6 Schematic Diagram for OFFLINE FFT Algorithm Testing</figcaption>
</figure>

#### Testing Procedures

A. Setting up Offline Test Equipment

1.        Assemble the test equipment as shown in the schematic above
2.        Record computational data of FFT with Debug ST-LINK V2
3.        Compare with theoretical calculations
4.        Perform Analysis and Conclusions

B. Setting up ONLINE Test Equipment

1.        Assemble the test equipment as shown in the schematic above
2.        Gradually increase the output voltage of the Variac from 0V to 220V
3.        Record computational data of FFT with Debug ST-LINK V2
4.        Perform Analysis and Conclusions

#### Testing Data

=== "Table 4.3 Comparison of OFFLINE Testing with Theory FFT Radix-2 with 8-N points"

    |No      | x(t)        |X(m) theory      |  X(m) program|        %Error |
    |--------|-------------|-----------------|--------------|---------------|
    |0       |0.6464       | 0               | 5.00E-05     |   0.00E+00|
    |1       |1.0607       | 2               | 2.000256381  |  1.00E+02|
    |2       |0.3535       | 1               | 1.000341675  |  1.00E+02|
    |3       |-1.0607      |  0              |  0.002102189 |  0.00E+00|
    |4       |-1.3535      |  0              |  5.00E-05    |  0.00E+00|
    |5       |-0.3535      |  0              |  0.00193019  |  0.00E+00|
    |6       |0.3535       | 1               | 0.999076704  |  9.99E+01|
    |7       |0.3535       | 2               | 1.998989101  |  9.99E+01|

=== "Table 4.4 OFFLINE Calculation Testing of FFT Radix-2 with 16-N points"

    | No | x(t) | X(m) | No | x(t) | X(m) |
    |---|---|---|---|---|---|
    | 0 | 0.4239 | 4.13E-06 | 8 | -1.4239 | 4.16E-06 |
    | 1 | 0.6464 | 2.00005412 | 9 | -1.3536 | 7.89E-06 |
    | 2 | 0.9239 | 1.00003481 | 10 | -0.9239 | 4.41E-05 |
    | 3 | 1.0607 | 3.43E-05 | 11 | -0.3536 | 2.70E-05 |
    | 4 | 0.8827 | 4.14E-06 | 12 | 0.1173166 | 4.14E-06 |
    | 5 | 0.3536 | 2.70E-05 | 13 | 0.3536 | 3.43E-05 |
    | 6 | -0.3827 | 4.41E-05 | 14 | 0.3827 | 1.0000348 |
    | 7 | -1.0607 | 7.85E-06 | 15 | 0.3536 | 2.0000541 |

=== "Table 4.5 OFFLINE Calculation Testing of FFT Radix-2 with 32-N points"

    | No | x(t) | X(m) | No | x(t) | X(m) |
    |---|---|---|---|---|---|
    | 0 | 0.3536 | 1.25E-05 | 8 | 0.6464 | 1.25E-05 |
    | 1 | 0.3864 | 1.99999523 | 9 | 0.7894 | 2.88E-06 |
    | 2 | 0.3827 | 1.00001633 | 10 | 0.9239 | 3.00E-05 |
    | 3 | 0.3642 | 2.05E-05 | 11 | 1.0228 | 7.57E-06 |
    | 4 | 0.3536 | 1.25E-05 | 12 | 1.0607 | 1.25E-05 |
    | 5 | 0.3695 | 2.12E-05 | 13 | 1.0175 | 2.30E-05 |
    | 6 | 0.4239 | 2.46E-05 | 14 | 0.8827 | 2.66E-05 |
    | 7 | 0.5188 | 4.43E-06 | 15 | 0.657 | 6.17E-05 |

=== "Table 4.6 OFFLINE Calculation Testing of FFT Radix-2 with 64-N points"

    | No | x(t) | X(m) | No | x(t) | X(m) |
    |---|---|---|---|---|---|
    | 0 | 0.3536 | 1.12E-08 | 8 | 0.3536 | 4.79E-06 |
    | 1 | 0.3758 | 1.9999913 | 9 | 0.3573 | 1.29E-06 |
    | 2 | 0.3864 | 1.000011 | 10 | 0.3695 | 8.89E-06 |
    | 3 | 0.3878 | 1.34E-05 | 11 | 0.3915 | 7.09E-06 |
    | 4 | 0.3827 | 1.22E-05 | 12 | 0.4239 | 1.04E-05 |
    | 5 | 0.3739 | 2.58E-05 | 13 | 0.4665 | 5.59E-06 |
    | 6 | 0.3642 | 1.65E-05 | 14 | 0.5188 | 3.07E-05 |
    | 7 | 0.3566 | 5.70E-06 | 15 | 0.5794 | 3.23E-05 |

=== "Table 4.7 ONLINE Calculation Testing of FFT Radix-2 with 64-N points"

    | No | x(t) | X(m) | No | x(t) | X(m) |
    |---|---|---|---|---|---|
    | 0 | 1101 | 10.06 | 8 | 1280 | 7.15E-01 |
    | 1 | 1211 | 201.73 | 9 | 1251 | 1.66E+00 |
    | 2 | 1233 | 6.86 | 10 | 1198 | 4.41E-01 |
    | 3 | 1270 | 2.33 | 11 | 1125 | 1.02E+00 |
    | 4 | 1285 | 2.08 | 12 | 1030 | 3.60E-02 |
    | 5 | 1289 | 2.71 | 13 | 917 | 2.37E-01 |
    | 6 | 1315 | 1.10 | 14 | 814 | 8.60E-01 |
    | 7 | 1294 | 2.51 | 15 | 698 | 5.65E-01 |

#### Analysis of Data

In this final project, accurate calculation of the FFT algorithm is needed to ensure that sensor calibration and power parameter calculations have high precision. To support the proper operation of the Radix-2 FFT with 64-N point sampling data, we previously created an OFF-LINE FFT Radix-2 program using time-domain signal capture data from the textbook “Understanding Digital Signal Processing, Third Edition” by Richard G. Lyons. The functions and composition of the signals to be analyzed in the frequency domain are as follows.
 
<figure markdown="span">
![Screenshot](img/Chapter-IV//Figure%204.7%20Example%20Functions%20and%20Compositions%20of%20Periodic%20Signals.jpg){ width="700" }
<figcaption>Figure 4.7 Example Functions and Compositions of Periodic Signals</figcaption>
</figure>



    xin(t) = sin(2π1000t)+ 1/2 sin(2π2000t+ 3π/4 )

Based on the function above, this periodic signal has a fundamental frequency of 1000Hz. Therefore, based on the Shannon’s theorem, the minimum sampling frequency should be greater than 2000Hz. Since for the Radix-2 FFT operation, we need data with a multiple of the square of the number 2, so the selected sampling frequency is 8000Hz or equivalent to 8000 samples/second, which results in 8 sampling points that will then be processed with the FFT Butterfly as shown in Chapter II. Then, we compare the calculation result with the program's calculation result and get the results as seen in Table 4.5.
        
After performing the Radix-2 FFT algorithm calculation with 8 data samples, we proceed by adding more sampling points by changing the sampling frequency since the Radix-2 FFT has a limitation on the number of sampling. The maximum sampling frequency that can be applied to signal capture is 16kHz, 32kHz and 64kHz. Since using OFF-LINE data, it suffices to change the time variable (t) in the function xin(t) to get varying sampling frequency data.
        
In this final project, we use the Microcontroller used as STM32F407VGx with an ARM-Cortex M4 processor, where inside it already has a single-layer Cortex Microcontroller Software Interface Standard (CMSIS) layer and has DSP (Digital Signal Processing) features. To make the Microcontroller's performance more efficient and precise, we use the FFT algorithm functions available in the CMSIS-DSP Software Library with the following programming format.

``` C++
// ===== FFT Configuration =====
arm_cfft_radix2_instance_f32 fft_instance;

const uint16_t fft_size = 64;
const uint8_t ifft_flag = 0;
const uint8_t bit_reverse = 1;
```

The above instructions are used to activate the FFT algorithm and specify which type of FFT structure is being used; here, we use Radix-2 FFT.

``` C++
// ===== Initialize FFT =====
arm_cfft_radix2_init_f32(&fft_instance, fft_size, ifft_flag, bit_reverse);
```

The above instructions are used to select the specific details of the FFT structure that will be used, ranging from the type of FFT structure (Radix2 / Radix4), the number of data points that will be transformed from the time domain to the frequency domain (16 – 2048), the selection of transformation types (forward=0 / inverse=1), and the use of bit reversal (reverse input=1 / reverse output=0).

``` C++
// ===== FFT Buffers =====
float fft_input_complex[FFT_SIZE * 2];   // interleaved real + imag
float fft_magnitude[FFT_SIZE];           // magnitude spectrum

// ===== Execute FFT =====
arm_cfft_radix2_f32(&fft_instance, fft_input_complex);
```

The above instructions are used to perform the calculations for the FFT that will be done, consisting of the type of FFT structure that will be used and the variable data that will be transformed from the time domain to the frequency domain.

``` C++
// ===== Compute Magnitude =====
arm_cmplx_mag_f32(fft_input_complex, fft_magnitude, FFT_SIZE);
``` 

The above instructions are used to find the magnitude value of each point in the frequency domain, consisting of real and imaginary variables that will be operated on, a variable for storing the calculation result of real and imaginary numbers, and the number of dimensions of the frequency domain being used.

After performing the OFF-LINE calculation, it can be seen that 64-N points produce data at index frequencies 1 and 2 according to the calculations in the book, so we perform ONLINE FFT Radix-2 testing with sensor voltage data. In this test, the voltage transformed to the frequency domain has an RMS value of 202 V AC, and the composition of the frequency components of the captured voltage signal is shown in Table 4.7.

### Current Sensor Testing

#### Purpose of Testing
The current sensor is one of the vital parts in this final project, because from the current sensor data will be transformed into the frequency domain and then computed to obtain electrical parameter values. Therefore, testing is required to ensure that the project's tasks are performed accurately.

#### Test Equipment

In the execution of the Testing, the following tools were used:

1. Variac
2. Smart Energy Meter Board
3. Digital Multimeter
4. Ammeter
4. Resistor Switcher

#### Testing Scheme

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.8%20Schematic%20Diagram%20for%20Current%20Sensor%20Testing.jpg){ width="250" }
<figcaption>Figure 4.8 Schematic Diagram for Current Sensor Testing</figcaption>
</figure>


#### Procedure of Testing

The procedure for executing the testing is as follows:

- Set up test equipment
- Assemble the test equipment as shown in the schematic above
- Connect with Load
- Gradually increase the VOutput from Variac until it reaches a value that varies within the range of 0.5 A to 3.5 A, with a constant current step of 0.25A 
- Record current sensor data with Debug ST-LINK V2
- Perform Analysis and Conclusions

#### Test Data
Table 4.10. Results of Current Sensor Testing

|IINRMS(Ampere)   |     VIN AMC MAX (Volt max)  |      BitRMS|
|----------------|-----------------------------|----------------|
|0,5              |       0.008909545           |   135.663223|
|0,75             |       0.014000714           |   195.268768|
|1                |       0.017536248           |   262.465668|
|1,25                 |0.021637468                   | 323.50296|
|1,5                  |0.02602153                    | 388.067657|
|1.75                 |0.03026417                    | 451.38382|
|2                    |0.034648232                   | 513.72998|
|2.25                 |0.039739401                   | 576.256836|
|2.5                  |0.043274935                   | 641.234314|
|2.75                 |0.049638896                   | 705.053589|
|3                    |0.054588644                   | 778.178162|
|3.25                 |0.0562857                     | 830.106018|
|3.5                  |0.05939697                    | 894.220337|

Table 4.11. Current Sensor Calibration Results

|No     |   Amperemeter (A) Reading | BitRMS ADC Current Reading  | Calibration Result|
|-------|-------------------|------------------------------------|-------------------|
|1      |  0.5              |135.663223    |    0.515374362|
|2      |  0.75             |195.268768    |    0.750232041|
|3      |  1                |262.465668    |    1.01500106|
|4      |  1.25             |323.50296     |    1.25550008|
|5      |  1.5              |388.067657    |    1.50989783|
|6      |  1.75             |451.38382     |    1.75937605|
|7      |  2                |513.72998     |    2.0050323|
|8      |  2.25             |576.256836    |    2.25140047|
|9      |  2.5              |641.234314    |    2.50742459|
|10     |   2.75            |705.053589    |    2.75888515|
|11     |   3               |778.178162    |    3.04701042|
|12     |   3.25            |830.106018    |    3.25161648|
|13     |   3.5             |894.220337    |    3.50423956|

Table 4.12. Current Sensor Accuracy Results

|No      |  Amperemeter (A) Reading  |   RMS Current Calculation    |      % Error|
|-------|-------------------|------------------------------------|-------------------|
|1       | 0.5                |             0.515374362             |       3.07|
|2       | 0.75               |             0.750232041             |       0.03|
|3       | 1                  |             1.01500106              |       0.50|
|4       | 1.25               |             1.25550008              |       0.44|
|5       | 1.5                |             1.50989783              |       0.66|
|6       | 1.75               |             1.75937605              |       0.54|
|7       |2                   |             2.0050323               |       0.25|
|8       |2.25                |             2.25140047              |       0.06|
|9       |2.5                 |             2.50742459              |       0.30|
|10      | 2.75               |             2.75888515              |       0.32|
|11      | 3                  |             3.04701042              |       1.57|
|12      | 3.25               |             3.25161648              |       0.05|
|13      | 3.5                |             3.50423956              |       0.12|

#### Data Analysis
The process of obtaining RMS values from this project comes from the operation of data in the frequency domain obtained from the previously discussed Radix-2 FFT algorithm. Here is the equation to obtain RMS value

$$
I_{RMS}^2 = \sum_{k=1}^{\frac{N}{2}-1} \left( I_{REAL}^2(K) + I_{IMAJINER}^2 \right)
$$

From the above equation, the process of translation is carried out into C++ program so that it can be written as follows:

``` C++
#define FFT_SIZE    64
#define FFT_HALF    (FFT_SIZE / 2)       // 32 unique frequency bins
#define FFT_SCALE   (FFT_SIZE / 8.0f)    // empirical normalization: 8.0

/**
 * Computes RMS current from frequency-domain FFT output.
 *
 * Formula:
 *   I_RMS = sqrt( Σ(k=1 to N/2-1) [Re²(k) + Im²(k)] / (N/2) ) / (N/8)
 *
 * ARM CMSIS rfft interleaved output layout:
 *   fftCurrentOutput[2k]     = Re(k)  — real part of bin k  (even index)
 *   fftCurrentOutput[2k + 1] = Im(k)  — imaginary part of bin k (odd index)
 *
 * Note: bin k=0 (DC component) is skipped per the formula.
 *
 * @param fftCurrentOutput  CMSIS rfft output array for current (interleaved, size = FFT_SIZE)
 * @return                  RMS current computed from frequency domain
 */
float computeCurrentRMS(const float* fftCurrentOutput) {
    float sumOfSquares = 0.0f;

    for (int k = 1; k < FFT_HALF; k++) {
        float real = fftCurrentOutput[2 * k];        // Re(k)
        float imag = fftCurrentOutput[2 * k + 1];    // Im(k)
        sumOfSquares += (real * real) + (imag * imag);
    }

    return sqrtf(sumOfSquares / FFT_HALF) / FFT_SCALE;
}
```

In the above program, fftCurrentOutput variable saves the real and imaginary components of the FFT Radix-2 calculation process in a format with odd data as real elements and even data as imaginary elements. Therefore, calculations begin from k=2 because fftCurrentOutput[0] and fftCurrentOutput[1] are the real and imaginary components for index frequency 0. Different from the calculation on theory, to obtain accurate measurement results, Equation (above) requires several calibration processes since the first data entered in the FFT algorithm is still available in bit form, so the output of FFT Radix-2 also appears in bit form. Here are the calibration equations used in this project's current sensor.

``` C++
float calibrateCurrentRMS(float rawCurrentRMS) {
    const float zeroOffset   = 22.4122943f;
    const float scaleFactor  = 256.08221153f;
    return (rawCurrentRMS - zeroOffset) / scaleFactor;
}
```

After performing current sensor testing, several data were obtained, including IIN RMS or RMS current passing through the Shunt Resistor, BitRMS
From the test data calibration table for the current sensor, a linear linearity graph of the ADC from the current sensor can be seen as follows:

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.9%20Linear%20Linearity%20Graph%20of%20Current%20Sensor%20ADC.jpg){ width="500" }
<figcaption>Figure 4.9 Linear Linearity Graph of Current Sensor ADC</figcaption>
</figure>

In addition, during this testing, computation results are observed in the program to obtain measurement values for the magnitude of electric current, i.e., RMS current on a system measured by the current sensor. The method used in this test is comparing the processing results from the current sensor program with the direct reading from the ammeter. Current sensor testing shows that the largest error occurs when the current sensor detects a small current or around 0.5 ampere, but after the current sensor measures an amplitude greater than 0.5 ampere, it tends to have a constant error rate within a range of 4% for a long time. This can be caused by the wave error in AMC1300 when the voltage measured by the current sensor is relatively small compared to the maximum voltage that can be measured by the AMC1300. There are several ways to handle errors during calculation with measurements, such as adding data results through the appropriate frequency sampling change formula.

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.10%20Current%20Sensor%20Test%20Graph.jpg){ width="500" }
<figcaption>Figure 4.10 Current Sensor Test Graph</figcaption>
</figure>

### Sensor Voltage Testing

#### Purpose of the Test
The voltage sensor is one of the vital parts of this final project because from the current sensor data, we get a frequency domain which is then transformed into digital form to obtain electrical parameter.
Therefore, testing is required to ensure that the work performed in this final project operates as intended accurately.

#### Testing Tools
In the execution of this test, we used the following tools:

- Variac
- Smart Energy Meter Board
- Digital Multimeter
- ST-LINK V2
- Test Probe

#### Testing Schema

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.11%20Voltage%20Sensor%20Testing%20Schematic.jpg){ width="250" }
<figcaption>Figure 4.11 Voltage Sensor Testing Schematic</figcaption>
</figure>


#### Testing Procedure
The procedure for conducting the test is as follows:

- Prepare the testing tools
- Arrange the tools as per the schematic above
- Gradually increase the VOutput of the Variac from 0 to 220V
- Record the sensor voltage data using the Debug ST-LINK V2
- Conduct Analysis and Conclusions

#### Test Data

Table 4.13. Voltage Sensor Testing Data

|No | Vsupply (Volt) | VRMS (Volt) | Vtheory (mV) | Bit RMS|
|--|----------------|-------------|--------------|---------|
|1 | 10 | 10.34 | 8.70 | 47.5833626|
|2 | 20 | 20.14 | 16.95 | 92.2303772|
|3 | 30 | 30.15 | 25.38 | 138.055206|
|4 | 40 | 40.78 | 34.33 | 186.601563|
|5 | 50 | 50.5 | 42.51 | 231.068497|
|6 | 60 | 60.8 | 51.18 | 277.96817|
|7 | 70 | 70.8 | 59.60 | 323.612305|
|8 | 80 | 80.9 | 68.10 | 370.318634|
|9 | 90 | 90.4 | 76.10 | 413.977386|
|10 | 100 | 100.6 | 84.68 | 460.062653|
|11 | 110 | 110.4 | 92.93 | 504.864319|
|12 | 120 | 120.3 | 101.27 | 550.69104|
|13 | 130 | 130.6 | 109.94 | 596.857239|
|14 | 140 | 140.3 | 118.10 | 642.646912|
|15 | 150 | 150.9 | 127.03 | 689.911865|
|16 | 160 | 160.7 | 135.28 | 734.550781|
|17 | 170 | 170.5 | 143.53 | 779.724365|
|18 | 180 | 180.8 | 152.20 | 826.566406|
|19 | 190 | 190.6 | 160.45 | 871.735291|
|20 | 200 | 200.6 | 168.86 | 917.609436|
|21 | 210 | 210.6 | 177.28 | 963.409851|
|22 | 220 | 220.8 | 185.87 | 1009.9845|

Table 4.14. Voltage Sensor Calibration Testing Data

|No | Vsupply (Volt) | VRMS (Volt) | Bit RMS | Calibration Result|
|--|----------------|-------------|--------------|---------|
|1 | 10 | 10.34 | 47.5833626 | 10.381184|
|2 | 20 | 20.14 | 92.2303772 | 20.142446|
|3 | 30 | 30.15 | 138.055206 | 30.161209|
|4 | 40 | 40.78 | 186.601563 | 40.774986|
|5 | 50 | 50.5 | 231.068497 | 50.593406|
|6 | 60 | 60.8 | 277.96817 | 60.7506332|
|7 | 70 | 70.8 | 323.612305 | 70.7298965|
|8 | 80 | 80.9 | 370.318634 | 80.9413834|
|9 | 90 | 90.4 | 413.977386 | 90.4865723|
|10 | 100 | 100.6 | 460.062653 | 100.562279|
|11 | 110 | 110.4 | 504.864319 | 110.357346|
|12 | 120 | 120.3 | 550.69104 | 120.376526|
|13 | 130 | 130.6 | 596.857239 | 130.469925|
|14 | 140 | 140.3 | 642.646912 | 140.481003|
|15 | 150 | 150.9 | 689.911865 | 150.814621|
|16 | 160 | 160.7 | 734.550781 | 160.574112|
|17 | 170 | 170.5 | 779.724365 | 170.450485|
|18 | 180 | 180.8 | 826.566406 | 180.69165|
|19 | 190 | 190.6 | 871.735291 | 190.567001|
|20 | 200 | 200.6 | 917.609436 | 200.596558|
|21 | 210 | 210.6 | 963.409851 | 210.60997|
|22 | 220 | 220.8 | 1009.9845 | 220.792679|

Table 4.15. Voltage Sensor Accuracy Data

|No | VRMS (Volt) | (Multitester SANWA) Calibration Result | % Error of the Voltage Sensor|
|--|----------------|-------------|--------------|
|1 | 10.34 | 10.381184 | 0.398297872|
|2 | 20.14 | 20.142446 | 0.012144985|
|3 | 30.15 | 30.161209 | 0.037177446|
|4 | 40.78 | 40.774986 | 0.012295243|
|5 | 50.5 | 50.593406 | 0.184962376|
|6 | 60.8 | 60.7506332 | 0.081195395|
|7 | 70.8 | 70.7298965 | 0.099016243|
|8 | 80.9 | 80.9413834 | 0.05115377|
|9 | 90.4 | 90.4865723 | 0.095765819|
|10 | 100.6 | 100.562279 | 0.037496024|
|11 | 110.4 | 110.357346 | 0.03863587|
|12 | 120.3 | 120.376526 | 0.063612635|
|13 | 130.6 | 130.469925 | 0.099598009|
|14 | 140.3 | 140.481003 | 0.129011404|
|15 | 150.9 | 150.814621 | 0.056579854|
|16 | 160.7 | 160.574112 | 0.078337274|
|17 | 170.5 | 170.450485 | 0.029041056|
|18 | 180.8 | 180.69165 | 0.059928097|
|19 | 190.6 | 190.567001 | 0.017313221|
|20 | 200.6 | 200.596558 | 0.001715852|
|21 | 210.6 | 210.60997 | 0.004734093|
|22 | 220.8 | 220.792679 | 0.00331567|

#### Analysis of Data
The process of obtaining the RMS voltage value for this project originates from the operation of data on the frequency domain which is obtained from the previously discussed FFT radix-2 algorithm processing. Here is the equation to obtain the RMS current value:

$$
V_{RMS}^2 = \sum_{k=1}^{\frac{N}{2}-1} \left( V_{REAL}^2(K) + V_{IMAJINER}^2 \right)
$$

From the above equation, we perform the translation into C++ code so it can be written as follows:

``` C++
/**
 * Computes RMS voltage from frequency-domain FFT output.
 *
 * Formula:
 *   V_RMS = sqrt( Σ(k=1 to N/2-1) [Re²(k) + Im²(k)] / (N/2) ) / (N/8)
 *
 * ARM CMSIS rfft interleaved output layout:
 *   fftVoltageOutput[2k]     = Re(k)  — real part of bin k  (even index)
 *   fftVoltageOutput[2k + 1] = Im(k)  — imaginary part of bin k (odd index)
 *
 * Note: bin k=0 (DC component) is skipped per the formula.
 *
 * @param fftVoltageOutput  CMSIS rfft output array for voltage (interleaved, size = FFT_SIZE)
 * @return                  RMS voltage computed from frequency domain
 */
float computeVoltageRMS(const float* fftVoltageOutput) {
    float sumOfSquares = 0.0f;

    for (int k = 1; k < FFT_HALF; k++) {
        float real = fftVoltageOutput[2 * k];        // Re(k)
        float imag = fftVoltageOutput[2 * k + 1];    // Im(k)
        sumOfSquares += (real * real) + (imag * imag);
    }

    return sqrtf(sumOfSquares / FFT_HALF) / FFT_SCALE;
}
```

In the above program, fftVoltageOutput stores the real and imaginary components of the FFT Radix-2 calculation in a format where odd data elements are stored as real data and even data elements are stored as imaginary data. Therefore, the calculation starts from k=2 because fftVoltageOutput[0] and fftVoltageOutput[1] represent the real and imaginary components for the frequency index 0, different from the theory, to obtain accurate measurement results, several calibration processes are required since the first data input into the FFT algorithm is still in bit form, so the output of the FFT Radix-2 is also in bit form. Here is the equation used for voltage sensor calibration in this final project.

``` C++
float calibrateVoltageRMS(float rawVoltageRMS) {
    const float zeroOffset  = /* your measured offset */;
    const float scaleFactor = /* your measured scale  */;
    return (rawVoltageRMS - zeroOffset) / scaleFactor;
}
```

From the above calibration equation, we get a graph that represents the relationship between the input voltage of the sensor and the output voltage from the ADC voltage sensor. Here is the calibration graph for the voltage sensor:

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.12%20Linear%20Relationship%20Graph%20of%20Voltage%20Sensor.jpg){ width="500" }
<figcaption>Figure 4.12 Linear Relationship Graph of Voltage Sensor</figcaption>
</figure>

Additionally, during this test, observation was made on the results of computation in the program to obtain the measurement value of the electrical power supplied by a system measured by the voltage sensor. The method used in this test is comparing the results of processing from the voltage sensor program with the direct result from the multimeter. And from this voltage sensor test, it is seen that the largest error occurs when the voltage sensor detects small voltages or around 10V AC, but as the voltage increases above 10V, the percentage error tends to become smaller approaching 0%.

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.13%20Voltage%20Sensor%20Test%20Graph.jpg){ width="500" }
<figcaption>Figure 4.13 Voltage Sensor Test Graph</figcaption>
</figure>

### Harmonic Testing

#### Test Objectives  

The objective of this test is to obtain harmonic components that will later be used as characteristic parameters for the type of load being identified using a mimic neural network algorithm. In addition, these data also serve as an indicator of power quality on a specific load.

#### Testing Equipment
During this testing, the following equipment are used:

- Variac  
- Smart Energy Meter Board
- Test Pen
- Load

#### Testing Scheme

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.14%20Harmonic%20Testing%20Scheme.jpg){ width="250" }
<figcaption>Figure 4.14 Harmonic Testing Scheme</figcaption>
</figure>
Figure 4.14 Harmonic Testing Scheme

#### Test Procedure
The procedure for conducting this test is as follows: 

1. Prepare the testing equipment
2. assemble them according to the scheme above
3. gradually increase the VOutput of the Variac, 
4. connect it with the Load,
    - Load 1: Variable Resistor  
    - Load 2: Variable Resistor + Fan  
    - Load 3: Fan & Laptop Charger
5. Record harmonic data using ST-LINK V2
6. Conduct Analysis and Conclusion.

#### Test Data

Table 4.16. Harmonic Test Data for Load 1  

|Orde| V(m)	    |I(m)   	|Orde|	V(m)	|I(m)|
|---|-----------|-----------|---|-----------|-------|
|0	|215	    |527	    |8	|124.81139	|140.666|
|1	|21219.787	|28847.4	|9	|171.5193   |85.454033|
|2	|175.2146	|499.01444	|10	|102.84702	|265.17175|
|3	|207.55821	|433.91785	|11	|15.60149	|138.77361|
|4	|166.16728	|405.51932	|12	|125.77748	|286.76944|
|5	|242.47136	|306.35617	|13	|118.07394	|218.5795|
|6	|191.69894	|245.23137	|14	|101.34453	|301.82465|
|7	|112.73367	|299.22806	|15	|97.558792	|209.18788|

Table 4.17. Harmonic Test Data for Load 2  

|Orde|	I(m) 	|I(m) HIOKI	|Orde|	I(m)|	I(m) HIOKI|
|---|-----------|-------|---|-----------|------|
|1	|0.113102	|0.112	|9	|0.082244	|0.079|
|2	|0.009005	|0.005	|10	|0.014045	|0.004|
|3	|0.110327	|0.107	|11	|0.075464	|0.066|
|4	|0.013875	|0.005	|12	|0.013857	|0.004|
|5	|0.104316	|0.1	|13	|0.058707	|0.053|
|6	|0.01499	|0.004	|14	|0.013876	|0.003|
|7	|0.09341	|0.09	|15	|0.056523	|0.042|
|8	|0.01271	|0.004	|16	|0.01096	|0.003|

Table 4.18. Harmonic Test Data for Load 3 

|Orde|	I(m)	|I(m) HIOKI	|Orde|	I(m)|	I(m) HIOKI|
|---|-----------|-------|---|-----------|------|
|1	|0.350067	|0.349	|9	|0.082244	|0.089|
|2	|0.011917	|0.005	|10	|0.01147	|0.005|
|3	|0.128949	|0.126	|11	|0.071242	|0.074|
|4	|0.016152	|0.004	|12	|0.015555	|0.005|
|5	|0.11331	|0.113	|13	|0.066646	|0.06|
|6	|0.0072	    |0.004	|14	|0.008624	|0.005|
|7	|0.112029	|0.104	|15	|0.043724	|0.048|
|8	|0.00845	|0.004	|16	|0.021449	|0.005|

Table 4.19. THDv and THDi Data for Load 

| No | Voltage | Current | THDv | THDi | Load |
|---|----------|------------|-----------|-----------|---|
| 1 | 50.306572 | 1.1440711 | 12.163322 | 4.7579055 | 1 |
| 2 | 216.84709 | 0.2199871 | 3.9855971 | 47.779949 | 3 |
| 3 | 222.70918 | 3.7686863 | 4.2047586 | 4.3894253 | 2 |

#### Analysis of Data

This testing focused on the harmonic orders obtained from the time-domain to frequency-domain conversion using a radix-2 FFT algorithm with a 64-N point, whose results were tested in accordance with what was stated in "Understanding Digital Signal Processing" by Richard G. Lyons. However, during practical application of the radix-2 FFT algorithm in real-time, precise calibration is required. Below are the graphs for Load 1, consisting of a variable resistor, tested under Condition A with a voltage of 50V and an uncalibrated current of 1.14A.

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.15%20Voltage%20Spectrum%20of%20Load%201%20under%20Condition%20A.jpg){ width="500" }
<figcaption>Figure 4.15 Voltage Spectrum of Load 1 under Condition A</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.16%20Current%20Spectrum%20of%20Load%201%20under%20Condition%20A.jpg){ width="500" }
<figcaption>Figure 4.16 Current Spectrum of Load 1 under Condition A</figcaption>
</figure>


After testing Load 1 under Condition A, calibration was performed using a HIOKI CM3286-01 AC Clamp
Power Meter, which can perform harmonic analysis and display the spectrum harmonics from order one
to order thirty. Here are the notations for the calibrations conducted in C++ program:

``` C++
/**
 * Calibrates and normalizes the FFT magnitude spectrum for current harmonic display.
 *
 * Calibration constants derived from HIOKI CM3286-01 AC Clamp Power Meter reference measurement.
 * Converts raw CMSIS radix-2 FFT output into calibrated per-bin RMS harmonic magnitudes.
 *
 * Normalization step:
 *   - Dividing by sqrt(2) converts peak magnitude to RMS per bin
 *   - Dividing by (FFT_SIZE / 2) accounts for CMSIS radix-2 FFT scaling
 *
 * @param fftCurrentOutput    Raw CMSIS radix-2 FFT output array (size = FFT_SIZE)
 * @param calibratedSpectrum  Output array of calibrated harmonic magnitudes (size = FFT_SIZE)
 */
void calibrateCurrentSpectrum(const float* fftCurrentOutput, float* calibratedSpectrum) {
    const float normFactor  = sqrtf(2.0f) * (FFT_SIZE / 2.0f);  // peak-to-RMS + FFT scaling
    const float zeroOffset  = 1.39776462244555f;                  // HIOKI calibration offset
    const float scaleFactor = 254.609739589478f;                  // HIOKI calibration scale

    for (int b = 0; b < FFT_SIZE; b++) {
        float normalized        = fftCurrentOutput[b] / normFactor;
        calibratedSpectrum[b]   = (normalized + zeroOffset) / scaleFactor;
    }
}
```

From this function, `fftCurrentOutput[b]` represents the magnitude of each harmonic bin computed
by the CMSIS radix-2 FFT with 64-point N, which is then normalized and calibrated into physical
units. Additionally, testing was performed on the harmonic calibration values using Load 2
consisting of a Laptop Charger and Load 3 consisting of a combination of a Laptop Charger and a
Fan. Here are the spectra harmonics for Load 2.

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.17%20Current%20Spectrum%20of%20Load%202.jpg){ width="500" }
<figcaption>Figure 4.17 Current Spectrum of Load 2</figcaption>
</figure>


From these graphs, it can be seen that the manual calculation of harmonic orders using CMSIS radix-2 FFT with a 64-N point has an accuracy close to the HIOKI CM3286-01 meter for odd-order calculations. However, as the harmonic order increases, the error in calculations also increases. This is due to three main reasons:

1. The power consumption of the Laptop Charger is relatively small, below 0.2 Amperes, which results in a significant proportion of errors in signal sampling compared to higher current-consuming loads.
2. In this experiment, signal sampling frequency was set at 3200 Hz, resulting in sixty-four samples per cycle for both the voltage and current waveforms with a frequency of 50 Hz. 
3. The accuracy of harmonic order calculations is affected by calibration errors.

To address the inaccuracies in harmonic order calculations, this can be mitigated by increasing the sampling frequency, which will add structure to the radix-2 FFT algorithm. However, when analyzing loads with higher current consumption, it can also result in improved precision for higher-order harmonics. Here are the spectra harmonics for Load 3.

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.18%20Current%20Spectrum%20of%20Load%203.jpg){ width="500" }
<figcaption>Figure 4.18 Current Spectrum of Load 3</figcaption>
</figure>


Based on the data from Load 3, the harmonic spectrum for nonlinear operating loads has a distortion characteristic similar to that of calibrated measurement meters. Here is the accuracy data for Load 3's harmonic current calibration.

Table 4.20. Harmonic Current Accuracy for Load 3

|No	|Orde Harmonic	|SEM	|HIOKI	|Error %|
|---|-----------|-------|-------|-------|
|1	|1	|0.350067	|0.349	|0.3057307|
|2	|3	|0.1289487	|0.126	|2.3402381|
|3	|5	|0.11331	|0.113	|0.2743363|
|4	|7	|0.112029	|0.104	|7.7201923|
|5	|9	|0.082244	|0.089	|7.5910112|
|6	|11	|0.071242	|0.074	|3.7270811|
|7	|13	|0.066646	|0.06	|11.076667|
|8	|15	|0.0437238	|0.048	|8.90875|
|9	|17	|0.0397828	|0.038	|4.6914474|
|10	|19	|0.0351957	|0.031	|13.534452|
|11	|21	|0.0310703	|0.027	|15.075141|
|12	|23	|0.0269435	|0.023	|17.145652|

After harmonic testing, the calculation of Total Harmonic Distortion (THD) was performed, which is the percentage ratio between the total harmonic components and their fundamental component. A higher THD value indicates a greater risk of equipment damage due to harmonics in both current and voltage.

Based on IEEE Standard 519-1992 Voltage Harmonic Limits, for voltages below 69kV, the maximum THD is 5.0%. Here are the equations to calculate THD:

Total Harmonic Distortion for voltage ($THD_v$) and current ($THD_i$) are defined as the ratio
of harmonic components to the fundamental component:

$$
THD_v = \frac{\sqrt{V_2^2 + V_3^2 + V_4^2 + \cdots + V_{\frac{N}{2}-1}^2}}
             {\sqrt{V_1^2 + V_2^2 + V_3^2 + V_4^2 + \cdots + V_{\frac{N}{2}-1}^2}}
$$

$$
THD_i = \frac{\sqrt{I_2^2 + I_3^2 + I_4^2 + \cdots + I_{\frac{N}{2}-1}^2}}
             {\sqrt{I_1^2 + I_2^2 + I_3^2 + I_4^2 + \cdots + I_{\frac{N}{2}-1}^2}}
$$

| Symbol | Description |
|--------|-------------|
| $V_1$, $I_1$ | Fundamental component (50 Hz) of voltage and current |
| $V_k$, $I_k$ | $k$-th harmonic component of voltage and current |
| $\frac{N}{2}-1$ | Highest harmonic bin from FFT output ($N$ = FFT size) |

The equations above were translated into C++ program instructions, which can be written as follows:

``` C++
/**
 * Computes Total Harmonic Distortion (THD) for both voltage and current.
 *
 * Formula:
 *   THD = 100 × sqrt( Σ(k=2 to N/2-1) X_k² / ( Σ(k=2 to N/2-1) X_k² + X_1² ) )
 *
 * Where:
 *   X_1   = fundamental component magnitude (50 Hz, bin index 1)
 *   X_k   = k-th harmonic magnitude
 *
 * @param fftVoltageOutput  Calibrated FFT magnitude array for voltage (size = FFT_SIZE)
 * @param fftCurrentOutput  Calibrated FFT magnitude array for current (size = FFT_SIZE)
 * @param thdVoltage        Output THD voltage in percentage (%)
 * @param thdCurrent        Output THD current in percentage (%)
 */
void computeTHD(const float* fftVoltageOutput,
                const float* fftCurrentOutput,
                float* thdVoltage,
                float* thdCurrent) {

    float sumHarmonicSquaresV = 0.0f;
    float sumHarmonicSquaresI = 0.0f;

    // Accumulate harmonic power from bin k=2 (excludes DC at k=0 and fundamental at k=1)
    for (int k = 2; k < FFT_SIZE / 2; k++) {
        sumHarmonicSquaresV += fftVoltageOutput[k] * fftVoltageOutput[k];
        sumHarmonicSquaresI += fftCurrentOutput[k] * fftCurrentOutput[k];
    }

    float fundamentalSquaredV = fftVoltageOutput[1] * fftVoltageOutput[1];
    float fundamentalSquaredI = fftCurrentOutput[1] * fftCurrentOutput[1];

    *thdVoltage = 100.0f * sqrtf(sumHarmonicSquaresV / (sumHarmonicSquaresV + fundamentalSquaredV));
    *thdCurrent = 100.0f * sqrtf(sumHarmonicSquaresI / (sumHarmonicSquaresI + fundamentalSquaredI));
}
```

Since the THD equation is a ratio between the fundamental component and all harmonic components, this test does not require calibration. As shown in Table 4.20., normally, as the voltage value increases, the THD value decreases, accompanied by an increase in the fundamental component compared to harmonic components. For Load 3 consisting of a fan and Laptop Charger, which has very high current THD due to being composed of nonlinear inductive loads and nonlinear switching-type loads.

### Household Load Identification Testing

#### Test Objectives

This test is conducted as a part of the integration between hardware and software in Smart Energy Meter capable of identifying and distinguishing household loads based on harmonic components of the load using a Genetic Neural Network algorithm. The structure of the Genetic Neural Network architecture can be seen in Chapter III.

#### Test Equipment
For this test, the following equipment is used:

1. Power Supply from PLN Distribution System
2. Smart Energy Meter
3. Household Load
    - LED TV
    - Energy-Efficient Lamp
    - Ceiling Fan

#### Test Scheme

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.19%20Households%20Load%20Identification%20Testing%20Scheme.jpg){ width="250" }
<figcaption>Figure 4.19 Households Load Identification Testing Scheme</figcaption>
</figure>


#### Test Procedure

The steps for conducting this test are as follows:

1. Prepare the testing equipment.
2. Arrange the equipment according to the scheme above.
3. Switch the master switch on the Smart Energy Meter to ON.
4. Switch the MCB (Miniature Circuit Breaker) to ON.
5. Connect the 3 loads in combination as follows:
    - Combination 1: Without Load
    - Combination 2: Ceiling Fan only
    - Combination 3: LED TV only
    - Combination 4: Energy-Efficient Lamp only
    - Combination 5: Ceiling Fan and LED TV combined
    - Combination 6: Ceiling Fan and Energy-Efficient Lamp combined
    - Combination 7: LED TV and Energy-Efficient Lamp combined
    - Combination 8: Ceiling Fan, Energy-Efficient Lamp, and LED TV combined.
6. Observe the display response and denormalization on the LCD of the Smart Energy Meter.
7. Analyze the responses and displays shown by the Smart Energy Meter from its integration.

#### Test Data

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.20%20System%20Response%20to%20Combination%201.jpg){ width="500" }
<figcaption>Figure 4.20 System Response to Combination 1</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.21%20System%20Response%20to%20Combination%202.jpg){ width="500" }
<figcaption>Figure 4.21 System Response to Combination 2</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.22%20System%20Response%20to%20Combination%203.jpg){ width="500" }
<figcaption>Figure 4.22 System Response to Combination 3</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.23%20System%20Response%20to%20Combination%204.jpg){ width="500" }
<figcaption>Figure 4.23 System Response to Combination 4</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.24%20System%20Response%20to%20Combination%205.jpg){ width="500" }
<figcaption>Figure 4.24 System Response to Combination 5</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.25%20System%20Response%20to%20Combination%206.jpg){ width="500" }
<figcaption>Figure 4.25 System Response to Combination 6</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.26%20System%20Response%20to%20Combination%207.jpg){ width="500" }
<figcaption>Figure 4.26 System Response to Combination 7</figcaption>
</figure>


<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.27%20System%20Response%20to%20Combination%208.jpg){ width="500" }
<figcaption>Figure 4.27 System Response to Combination 8</figcaption>
</figure>


#### Data Analysis
This test focuses on the accuracy and precision of the output from the Genetic Neural Network (JST) algorithm previously trained with 8 combinations of 3 loads. The training process involved non-linear harmonic-producing loads such as Energy-Efficient Lamps and LED TVs, and a linear load such as a Ceiling Fan.
To increase the accuracy of the JST algorithm's training, six inputs were introduced in the architecture design: RMS values of current from the frequency domain, fundamental frequency spectrum values, and four odd-frequency spectrum values (150Hz, 250Hz, 350Hz, and 450Hz). In addition to increasing input, data was also collected for training purposes a total of 101 variations per combination, resulting in regression weights with the best one having an R² value close to 1. Here are comparisons between outputs from MATLAB software, Microsoft Excel, and the Smart Energy Meter. Following this is validation of the output results from the trained process.

Table 4.21. Validation for Household Load Identification Testing

| No | Target | MATLAB | Excel | SEM | Error SEM |
|----|--------|--------|-------|-----|-----------|
| 1 | 1 | 1 | 1.000000046 | 1 | 0 |
| 2 | 2 | 2 | 1.999897336 | 1.9999 | 0.005 |
| 3 | 3 | 3 | 3.000015624 | 3 | 0 |
| 4 | 4 | 4 | 4.000003897 | 4 | 0 |
| 5 | 5 | 5 | 4.999995409 | 5 | 0 |
| 6 | 6 | 6 | 6.000013539 | 6.0006 | 0.01 |
| 7 | 7 | 7 | 7.000004461 | 7 | 0 |
| 8 | 8 | 8 | 7.999999986 | 8 | 0 |

From Table 4.21, it can be analyzed that the correct number of input combinations, neuron count, and training data will produce highly precise outputs with a maximum percentage error against target values being as low as 0.01%.

## Chapter V: Conclusion and Future Work

### Conclusions
After undergoing several planning, manufacturing, testing equipment, and data collection processes from this Final Project's test, the following conclusions can be drawn:

1. For the FFT Radix-2 algorithm with a 64-N point, the computational process in the program aligns well with theoretical computations as described in "Understanding Digital Signal Processing" with an error percentage below 0.001%.
2. Sampling signal voltage and current at a frequency of 3200Hz can accurately represent spectral load signals with an average error rate of 4.78%.
3. The use of AMC1301 as a clamping device for the voltage sensor has an error rate of 0.048%.
4. Using AMC1301 as a clamping device for the current sensor results in an error rate of 0.873%.
5. Applying the Genetic Neural Network algorithm to the Smart Energy Meter with a structure of 6 inputs, 2 layers, 8 neurons and training data totaling 808 samples produces maximum error rates not exceeding 0.01%.

### Improvements and Future Work

During the execution and completion of this Final Project, there have undoubtedly been various shortcomings and errors, both in system design or during equipment manufacturing processes. To rectify these shortcomings and enhance system optimality, the following measures are needed:

1. Increasing frequency sampling can improve analysis accuracy in the frequency domain, but calculations will take longer if the sampling frequencies are too high. Therefore, a suitable frequency must be selected.
2. Ensure that FFT algorithm outputs match data available in "Understanding Digital Signal Processing" to ensure harmonic component analysis aligns with the composition of analyzed signals.
3. Verify root mean square (RMS) calculations for both voltage and current against calibrated measuring instruments to achieve precise linear relationships.
4. Conduct frequency harmonic spectrum comparisons with calibrated measuring devices to obtain accurate distortion calculation results.
5. Add remote communication equipment to facilitate flexible monitoring of energy usage.
