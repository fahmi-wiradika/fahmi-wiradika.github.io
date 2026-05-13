# Chapter III: Hardware Planning and Construction

## Overview of the System

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

## System Hardware Planning

Part of the hardware components in the final project are as follows:

### Power Supply Circuitry

The power supply is an essential component that provides power to various hardware components such as microcontrollers, sensors, displays, high-voltage side supply for AMC1300, sensor references, signal conditioning circuits, and simple indicators like LEDs. Below is the schematic design of the power supply circuit in EAGLE 9.1.1:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.3.%20Schematic%20of%20Power%20Supply%20Circuitry.jpg){ width="500" }
<figcaption>Figure 3.3. Schematic of Power Supply Circuitry</figcaption>
</figure>


In the final project, the hardware components are powered by a 220V AC line which is then converted to 5V DC using the MPM-10-5 non-isolated AC/DC single rectifier. Due to the lack of isolation, a 1A fuse is placed on the output rectifier for protection. After this step, the 5V DC power supply is used as the Bluetooth communication medium, TPSM842 as the microcontroller's power supply, ROE-0505S as an isolated DC-DC converter for the AMC1301 high side and REF2033 as sensor reference and signal conditioning references.

### Microcontroller Circuit
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


### Current Sensor Design

The current sensor is an instrument that functions as a value detection device for electrical current. In the final project, the writer has designed and made a current sensor to measure the current on bidirectional current. Then, the output of the current sensor in reading electrical current, which will later be inserted into the ADC microcontroller, so the data can be processed, analyzed, stored, and displayed. The core components in this current sensor are Shunt Resistors that function as an amperage divider so that AMC1300 can operate as a current sensor. For explanations of the sections of AMC1300 have been explained on theoretical basis. Here is the design of the current sensor applied to AMC1300 in the form of schematic design on EAGLE 9.1.1.
        
<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.5%20Current%20Sensor%20Schematic%20Design.jpg){ width="400" }
<figcaption>Figure 3.5 Current Sensor Schematic Design</figcaption>
</figure>


In designing the AMC1300 as a current sensor, it must look at the maximum allowable voltage that can enter AMC1300 on pins 2 and 3, which is 250 mVpp. Therefore, a resistor is needed to maintain that voltage entering AMC1300 does not exceed 250 Vpp.

    Imaxsystem = 10 A
    VinAMCmax = 250mVpp
    Pshunt resistor = Imaxsistem^2 x Shunt Resistor
    Vnomsistem = PLN 1 Phase = 220 Vrms = 311 Vpp

Thus, the Shunt Resistor required on AMC1300 is:

    R= VinAMCmax/Imaxsistem = (0,250 Vpp)/(14.14 Ipp) = 17.6 mΩ

With the minimum power requirement for the Shunt Resistor being as large as:

    Pshunt resistor = 250mV x 10 A = 2.5 Watt

However, to avoid damage to AMC1300 when a large current surge may occur, and considering the availability of resistor components in the market, the writer uses a Shunt Resistor with specifications of 15mΩ/6Watt, so the current that can be detected by this current sensor is:

    Ipp= V/R = 0,250/0.015 = 16.66 Ampere

As an extra safety measure to prevent the current sensor circuit from exceeding the maximum designed current, the writer uses a fuse of 15 A, so the maximum system current that can be allowed in the final project is 15 Ampere.

### Voltage Sensor Design

The voltage sensor is an instrument that detects the value of electrical potential. In this final project, the writer designed and built a voltage sensor to measure the current voltage on a bidirectional current. The output from the voltage sensor during voltage measurement, which will later be input into the ADC microcontroller for processing, analysis, storage, and display. The core components of this voltage sensor are resistors that serve as voltage dividers with an upper limit of 250mV input voltage from the AMC1300, so the AMC1300 can perform AC signal clamping into DC without changing the characteristics of the signal so that it can be operated as a voltage sensor. For explanations of the parts of AMC1300, see the basic theory. Here is the design of the current sensor applied to AMC1300 in the form of schematic design in EAGLE 9.1.1:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.6%20Voltage%20Sensor%20Design.jpg){ width="400" }
<figcaption>Figure 3.6 Voltage Sensor Design</figcaption>
</figure>


The difference between planning and building a voltage sensor and a current sensor lies in:

1. Connection topology with the system
2.  Design and value of resistances on the load resistor

The connection method for using this voltage sensor is parallel to the load or source voltage that will be measured, so the resistance used for the voltage sensor is very large but with relatively small resistance power, while the resistance used for the current sensor is very small but has a large power. The calculation to determine the value of the resistor or R for the AMC1300 as follows:

Voltage Divider Resistor
    
    VR2 = Vin AMC = 250 mVpp
    VR2 = R2/R1 × Vin max system (21)
    0,250 Vpp = R2/1.680.000 × 353.55 Volt (250VRMS) 
    R2 = 0,250/311 × 1.680.000 = 1,187 Ω ≈ 1 K

Due to the lack of a 1,187 K ohm resistor in the market, we use a 1 K ohm resistor, so the voltage on the AMC1300 sensor when the nominal AC voltage is 220 Volt RMS or 311 Vpp is as follows:
   
    VR2 = R2/R1 × Vinsystem (22)
    VR2 = 1000/1.680.000 × 311
    VR2 = 0,185 Vpp

Therefore, based on the planning above, when the nominal voltage is measured, there is a distance between the measured voltage and the maximum reading of the sensor. This is in line with the planning because if there is an error on the side of the measured voltage, such as a sudden increase in voltage, it will not damage the sensor or even the microcontroller.

### Signal Conditioning Circuit

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

    Vin = 250mVpp
    VoutP = 1,025 Vpp
    VoutN = -1,025 Vpp
    VoutDiff = 2,05 Vpp

In the signal conditioning circuit creation, we followed the sensor AMC1300's procedure recommendations, as shown below:

<figure markdown="span">
![Screenshot](img/Chapter-III/Figure%203.9%20OPA376%20Recommended%20Network.jpg){ width="500" }
<figcaption>Figure 3.9 OPA376 Recommended Network</figcaption>
</figure>


The equation for the OPA376 Op-Amp is as follows:

    Vout = (Voutp × R4/R3) + (VoutN × R1/R2) + VCM (23)
    Vout = (Voutp - VoutN) + VCM (24)

Before the signal from the conditioning circuit is input into the ADC microcontroller, a Zener diode SS351 with reference voltage is inserted to protect against overvoltage on the AMC1300 input.

### Zero Crossing Detector Circuit
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

### Casing & Wiring Design Smart Energy Meter

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



## Firmware and Computation Design

The software components of the system in this project are as follows:

### Calculation Algorithm for Power Parameters
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

### Display Algorithm for LCD TFT ILI9341

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


### Neural Network Algorithm

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

