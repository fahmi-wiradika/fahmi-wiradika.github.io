# Chapter 1 - Introduction

## Background of the Study

The need for electricity has become one of the main needs in society. It is influenced by the economic conditions, climate change, and technological development. The high consumption of electricity now is due to the fact that almost all household appliances require electric power, such as refrigerators, dispensers, washers, water pumps, rice cookers, and other secondary necessities like Wi-Fi, air conditioner, and microwave.

In addition to the high electricity needs in society, the bad habits of consumers often become the main factor in electricity wastage. For example, leaving chargers plugged in when not used, turning on TVs without anyone watching, and leaving lights on during daytime can all cause an increase in electricity consumption. Such habits lead to increased electricity consumption and result in new discovered energy waste when bills arrive after the bill payment period or when tokens expire unexpectedly.

Based on the above explanation, the author proposes a solution for reducing electricity use by educating the public through Smart Energy Meters that identify household electronic appliances being used in a house and provide information to consumers about power usage and electricity bills. Consumers can obtain this information from the LCD screen of the Smart Energy Meter.

## Objective

- General Objective: To meet the graduation requirements of Electronic Engineering Polytechnique Institute of Surabaya (EEPIS) for obtaining a Bachelor of Science in Applied Sciences (S.ST).

- Specific Objective: The purpose of this final project is to create an electricity meter that can identify connected loads and power usage of household appliances, and to provide feedback to users through the LCD display.

## Methodology

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

## Problem Formulation and Scope of the Study

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

## Outline of the Study

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


## Literature Review

There have been several previous studies that have already been conducted as references for this final project, including:

1. A journal article titled "A Smart Power Meter to Monitor Energy Flow in Smart Grids: The Role of Advanced Sensing and IoT in the Electric Grid of the Future" by Rosario Morello from University Mediterranea of Reggio Calabria published in 2017. It discusses how quality power parameters can be calculated using FFT methods on a microgrid.

2. A paper titled "Design of Smart Meter to Monitor and Identify Household Energy Consumption Using Backpropagation Neural Network" by Koko Hutoro from the Institute of Technology of Tokyo University published in 2012. It explains how to identify household loads based on the characteristic values of effective current for each load plotted into a neural network.

3. A journal article titled "Application of the Time-Frequency Analysis using Wavelet Transform to Harmonic analysis in the Power Conversion System" by Hiroki Nagano from Kobe City College of Technology published in 2017. It discusses how to analyze power conversion systems in detail using wavelet transforms, as compared to Fourier transforms. Fourier transforms are generally used for harmonic analysis.



