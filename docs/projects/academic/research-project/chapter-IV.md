# Chapter IV: Test and Analysis

In this chapter, we will discuss the testing and analysis of some parts of the system that have been designed and built in the previous chapter. The testing and analysis are carried out to ensure that the system works as intended and to evaluate the performance of the system. The testing will be conducted on several components, including signal sampling, FFT algorithm, current sensor, and voltage sensor. Each component will be tested separately to identify any issues or errors that may arise during the operation of the system. The results of the testing will be analyzed to determine the accuracy and reliability of the system in measuring electrical parameters such as voltage, current, and power.

## Signal Sampling Testing

### Purpose of Testing
The use of Fast Fourier Transform (FFT) with radix-2 requires an appropriate windowing process depending on the type of FFT used.
In this final project, we use FFT radix-2 with 64 time-domain signal points that are converted to frequency domain.

### Instruments Used for Testing

The following instruments were used in the testing procedure:

1. Voltage Variac
2. Smart Energy Meter Board
3. Digital Multimeter
4. Ammeter
5. Linear Load
6. Non-linear Load

### Testing Scheme

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.1%20Illustration%20of%20Signal%20Sampling%20Process.jpg){ width="600" }
<figcaption>Figure 4.1 Illustration of Signal Sampling Process</figcaption>
</figure>

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.2%20Testing%20Scheme%20for%20Signal%20Sampling.jpg){ width="500" }
<figcaption>Figure 4.2 Testing Scheme for Signal Sampling</figcaption>
</figure>

### Procedure of Testing

The procedure for conducting testing as follows:

- Prepare the testing equipment
- Arrange the testing equipment as shown in the schema above
- Gradually increase the output voltage of the Voltage Variac from 0 to 220V
- Connect with the Load
- Record sensor data using Debug ST-LINK V2
- Perform Analysis and Conclusion

### Testing Data

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

### Analysis of Data

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

## Algorithm FFT Testing
### Objectives of Testing

The purpose of this testing is to correct the shift of time-domain signals to frequency domain so that it becomes easier for physical analysis and signal synthesis if performed in the time domain because it involves derivatives of the time function which can reduce precision.

### Test Equipment

In the execution of the Testing, the following tools were used:

1.        Variac
2.        Smart Energy Meter Board
3.        Digital Multimeter

### Testing Scheme

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.5%20Schematic%20Diagram%20for%20ONLINE%20FFT%20Algorithm%20Testing%20on%20Voltage%20Sensor.jpg){ width="450" }
<figcaption>Figure 4.5 Schematic Diagram for ONLINE FFT Algorithm Testing on Voltage Sensor</figcaption>
</figure>

<figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.6%20Schematic%20Diagram%20for%20OFFLINE%20FFT%20Algorithm%20Testing.jpg){ width="500" }
<figcaption>Figure 4.6 Schematic Diagram for OFFLINE FFT Algorithm Testing</figcaption>
</figure>

### Testing Procedures

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

### Testing Data

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

### Analysis of Data

In this final project, accurate calculation of the FFT algorithm is needed to ensure that sensor calibration and power parameter calculations have high precision. To support the proper operation of the Radix-2 FFT with 64-N point sampling data, we previously created an OFF-LINE FFT Radix-2 program using time-domain signal capture data from the textbook “Understanding Digital Signal Processing, Third Edition” by Richard G. Lyons. The functions and composition of the signals to be analyzed in the frequency domain are as follows.
 
 <figure markdown="span">
![Screenshot](img/Chapter-IV/Figure%204.7%20Example%20Functions%20and%20Compositions%20of%20Periodic%20Signals.jpg){ width="700" }
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

## Current Sensor Testing
### Purpose of Testing
The current sensor is one of the vital parts in this final project, because from the current sensor data will be transformed into the frequency domain and then computed to obtain electrical parameter values. Therefore, testing is required to ensure that the project's tasks are performed accurately.
### Test Equipment

In the execution of the Testing, the following tools were used:

1. Variac
2. Smart Energy Meter Board
3. Digital Multimeter
4. Ammeter
4. Resistor Switcher

### Testing Scheme

<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 4.9. Schematic Diagram for Current Sensor Testing

### Procedure of Testing

The procedure for executing the testing is as follows:

- Set up test equipment
- Assemble the test equipment as shown in the schematic above
- Connect with Load
- Gradually increase the VOutput from Variac until it reaches a value that varies within the range of 0.5 A to 3.5 A, with a constant current step of 0.25A 
- Record current sensor data with Debug ST-LINK V2
- Perform Analysis and Conclusions

### Test Data
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

### Data Analysis
The process of obtaining RMS values from this project comes from the operation of data in the frequency domain obtained from the previously discussed Radix-2 FFT algorithm. Here is the equation to obtain RMS value

        IRMS2 = ∑_(k=1)^(N/2-1)▒〖(I_REAL^(          2) (K)+I_IMAJINER^(                     2) (K))〗................................(28)

From the above equation, the process of translation is carried out into C++ program so that it can be written as follows:

In the above program, Input2 variable saves the real and imaginary components of the FFT Radix-2 calculation process in a format with odd data as real elements and even data as imaginary elements. Therefore, calculations begin from k=2 because Input2[0] and Input2[1] are the real and imaginary components for index frequency 0. Different from the calculation on theory, to obtain accurate measurement results, Equation (above) requires several calibration processes since the first data entered in the FFT algorithm is still available in bit form, so the output of FFT Radix-2 also appears in bit form. Here are the calibration equations used in this project's current sensor.
After performing current sensor testing, several data were obtained, including IIN RMS or RMS current passing through the Shunt Resistor, BitRMS
From the test data calibration table for the current sensor, a linear linearity graph of the ADC from the current sensor can be seen as follows:

<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 4.10. Linear Linearity Graph of Current Sensor ADC

In addition, during this testing, computation results are observed in the program to obtain measurement values for the magnitude of electric current, i.e., RMS current on a system measured by the current sensor. The method used in this test is comparing the processing results from the current sensor program with the direct reading from the ammeter. Current sensor testing shows that the largest error occurs when the current sensor detects a small current or around 0.5 ampere, but after the current sensor measures an amplitude greater than 0.5 ampere, it tends to have a constant error rate within a range of 4% for a long time. This can be caused by the wave error in AMC1300 when the voltage measured by the current sensor is relatively small compared to the maximum voltage that can be measured by the AMC1300. There are several ways to handle errors during calculation with measurements, such as adding data results through the appropriate frequency sampling change formula.

<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 4.11. Current Sensor Test Graph


## Sensor Voltage Testing
### Purpose of the Test
The voltage sensor is one of the vital parts of this final project because from the current sensor data, we get a frequency domain which is then transformed into digital form to obtain electrical parameter.
Therefore, testing is required to ensure that the work performed in this final project operates as intended accurately.

### Testing Tools
In the execution of this test, we used the following tools:

- Variac
- Smart Energy Meter Board
- Digital Multimeter
- ST-LINK V2
- Test Probe

### Testing Schema

<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 4.12. Voltage Sensor Testing Schematic

### Testing Procedure
The procedure for conducting the test is as follows:

- Prepare the testing tools
- Arrange the tools as per the schematic above
- Gradually increase the VOutput of the Variac from 0 to 220V
- Record the sensor voltage data using the Debug ST-LINK V2
- Conduct Analysis and Conclusions

### Test Data

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

### Analysis of Data
The process of obtaining the RMS voltage value for this project originates from the operation of data on the frequency domain which is obtained from the previously discussed FFT radix-2 algorithm processing. Here is the equation to obtain the RMS current value:

        VRMS² = ∑_(k=1)^(N/2-1)▒〖(I_REAL^(2) (K)+I_IMAJINER^(2) (K))〗..(29)

From the above equation, we perform the translation into C++ code so it can be written as follows:
In the above program, Input2 stores the real and imaginary components of the FFT Radix-2 calculation in a format where odd data elements are stored as real data and even data elements are stored as imaginary data. Therefore, the calculation starts from k=2 because Input2[0] and Input2[1] represent the real and imaginary components for the frequency index 0, different from the theory, to obtain accurate measurement results, several calibration processes are required since the first data input into the FFT algorithm is still in bit form, so the output of the FFT Radix-2 is also in bit form. Here is the equation used for voltage sensor calibration in this final project.
From the above calibration equation, we get a graph that represents the relationship between the input voltage of the sensor and the output voltage from the ADC voltage sensor. Here is the calibration graph for the voltage sensor:

<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 4.13. Linear Relationship Graph of Voltage Sensor

Additionally, during this test, observation was made on the results of computation in the program to obtain the measurement value of the electrical power supplied by a system measured by the voltage sensor. The method used in this test is comparing the results of processing from the voltage sensor program with the direct result from the multimeter. And from this voltage sensor test, it is seen that the largest error occurs when the voltage sensor detects small voltages or around 10V AC, but as the voltage increases above 10V, the percentage error tends to become smaller approaching 0%.

<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 4.14. Voltage Sensor Test Graph

## Zero Crossing Detector Circuit

The Zero Crossing Detector circuit or often abbreviated as ZCD is a circuit that is useful for detecting the zero point of a periodic signal, particularly sine wave signals in alternating current, so it can find the phase difference between voltage and current on an alternating current voltage.

The main circuit of the ZCD in this final project is the comparator, which compares the output voltage from the signal conditioning with the reference voltage. The reference voltage here comes from the IC REF2033, which has an output voltage of 1.65 volts. For the IC comparator used, the LM2903D is a dual comparator in one IC, so only one LM2903D is needed to detect the zero point of the current sensor and the voltage sensor.

Here is the wiring diagram for the Zero Crossing Detector circuit that has been made:
<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 3.10. ZCD Circuit for Voltage

<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 3.11. ZCD Circuit for Current


All design circuits were created in the EAGLE 9.1.1 software, which was then implemented on a board consisting of power supply circuit, microcontroller SMT32F407VGT6 circuit, current sensor circuit, voltage sensor circuit, signal conditioning circuit, and other supporting circuits that have already been integrated into EAGLE 9.1.1.

<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 3.12. Overall Smart Energy Meter Design Board

<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 3.13. Smart Energy Meter Board Top View

<figure markdown="span">
![Screenshot](img/Chapter-IV){ width="500" }
<figcaption></figcaption>
</figure>
Figure 3.14. Smart Energy Meter Board Bottom View