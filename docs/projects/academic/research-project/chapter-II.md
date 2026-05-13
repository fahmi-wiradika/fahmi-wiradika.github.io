# Chapter II: Supporting Theories

## Electrical Power

Electrical power is generally considered to be the product of the current flowing through a circuit multiplied by the voltage across that circuit. In alternating current (AC), there are two components to the power: active power (P) and reactive power (Q). The resultant of P and Q is called apparent power (S), which is the power felt by the electricity company as the source of power.

Reactive power (Q) can occur due to inductance or capacitance. Inductance is caused by components like transformers on appliances such as electric motors or step-down adaptors. Capacitance is caused by capacitors. The properties of inductance and capacitance are opposite; in a voltage phase diagram, the inductive component points downward while the capacitive component points upward.

Active power (P) is the power required by the load. However, the power that needs to be supplied by the electricity company is apparent power (S). To minimize the power that needs to be supplied by the electricity company, as much reactive power (Q) as possible should be eliminated. If the load is inductive, then a capacitor should be added to make the reactive power (Q) approach zero. Since most appliances in residential environments are inductive, adding capacitors is the correct way to save energy.

Active power is work done, such as mechanical work, heat generation, light production, and so on. This power is needed for machines to perform real operations according to their capacity. Active power is stated in watt (W). The formula is:

    P = V × I × cos(φ)   
    Where:
        P = Active Power (Watt)
        V = Voltage (Volt)
        I = Current (Ampere)
        φ = Phase Angle (degrees)

Reactive power (Q) is the power needed by electrical appliances that work with an electromagnetic system. This power is required by machines to maintain magnetic fields in order for them to operate efficiently. Reactive power is stated in volt-ampere reactive (VAR). The formula is:

    Q = V × I × sin(φ)   
    Where:
        Q = Reactive Power (VAR)
        V = Voltage (Volt)
        I = Current (Ampere)
        φ = Phase Angle (degrees)

Apparent power (S) is the sum of the active and reactive powers. It is stated in volt-amperes (VA). The formula is:

    S = √(P^2 + Q^2)   

Apparent power can also be stated as the product of voltage and current.

    S = V × I   
    Where:
        P = Active Power (Watt)
        Q = Reactive Power (VAR)
        V = Voltage (Volt)
        I = Current (Ampere)

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.1.%20Power%20Triangle.jpg){ width="250" }
<figcaption>Figure 2.1. Power Triangle</figcaption>
</figure>

Chapter II: Supporting Theories

## FFT (Fast Fourier Transform)

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

    X(m) = ∑_(n=0)^((N/2)-1)▒〖x(2n).e^(-j2π(2nm)/N)〗 + e^(-j2πm/N) ∑_(n=0)^((N/2)-1)▒〖x(2n+1).e^(-j2π(2nm)/N)〗
    Where:
        N = number of input samples
        X(m) = the mth component of the output DFT (X(0), X(1), ..., X(N-1))
        m = index of output DFT in the frequency domain (0, 1, ..., N-1)
        x(2n) = the nth even input sample (x(0), x(2), ..., x(N-2))
        x(2n+1) = the nth odd input sample (x(1), x(3), ..., x(N-1))
        n = index of input sample in the time domain (0, 1, ..., N-1)
        j = imaginary unit (√(-1))
        π = degree (180o)
        e = natural logarithm base (2.718281828359)

Since the formula is long, it uses standard notation to simplify it. It is defined as WN = e^(-j2π/N) to represent the nth root of unity.

Equation 5 can be written as:

    X(m) = ∑_(n=0)^((N/2)-1)▒〖x[2n].W_N^{2mn}〗 + W_N^k ∑_(n=0)^((N/2)-1)▒〖x[2n+1].W_N^{2mn}〗
Since 

    W_N^2 = e^(-j2π2/N)= e^(-j2π(N/2)), 
    
then substitute 
    
    W_N^2 = W_(N/2).

So it becomes:

    X(m) = ∑_(n=0)^((N/2)-1)▒〖x[2n].W_(N/2)^{mn}〗 + W_N^k ∑_(n=0)^((N/2)-1)▒〖x[2n+1].W_(N/2)^{mn}〗

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

## AMC 1300

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

## Voltage Sensor

A typical voltage sensor can also be referred to as a voltage divider circuit with a schematic like Figure 2.9. Input to a voltage divider circuit is the Vin voltage. Vin generates current I flowing through both resistors. Since both resistors are connected in series, the same current flows through each resistor.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.9%20Voltaga%20Sensor%20Circuit.jpg){ width="300" }
<figcaption>Figure 2.9 Voltaga Sensor Circuit</figcaption>
</figure>

According to Ohm's Law, the current flowing is:

    I = Vin / (R1 + R2)   

The voltage across R2 becomes:

    Vout = IxR2   

Substituting I with equation 1 gives:

    Vout = VinxR2 / (R1 + R2)  
    Notes:
        Vin = Input voltage of the voltage sensor (V)
        Vout = Output voltage of the voltage sensor (V)
        I = Input current of the voltage sensor (A)
        R1 = Voltage divider resistor 1 (ohm)
        R2 = Voltage divider resistor 2 (ohm)

This equation is the equation to calculate the output voltage produced by a voltage divider circuit. By selecting two resistors with appropriate resistance values, we can obtain any output voltage within the range of 0 V to Vin.

## Current Sensor

A typical current sensor can also be referred to as a current divider circuit with a schematic like Figure 2.10. Input to a current divider circuit is Iin current. Iin flows and divides into I1 and I2 currents flowing through both resistors. Since both resistors are connected in parallel, the same voltage across each resistor.

<figure markdown="span">
![Screenshot](img/Chapter-II/Figure%202.10%20Current%20Sensor%20Circuit.jpg){ width="300" }
<figcaption>Figure 2.10 Current Sensor Circuit</figcaption>
</figure>

According to Kirchhoff's Current Law, the current flowing is:

    Iin = I1 + I2   

The voltage across R becomes:
    
    VS = VR1 = VR2   

Substituting I with equation 1 gives:

    I1 = IinxR2 / (R1 + R2)   
    Notes:
        Vs = Input voltage of the current sensor (V)
        Iin = Total input current of the current sensor (A)
        I1 = Current 1 input of the current sensor (A)
        I2 = Current 2 input of the current sensor (A)
        R1 = Current divider resistor 1 (ohm)
        R2 = Current divider resistor 2 (ohm)

This equation is the equation to calculate the output current produced by a current divider circuit. By selecting two resistors with appropriate resistance values, we can obtain any output current within the range of 0 A to Iin.


##	Microcontroller STM32F407VGTX
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

## Signal Sampling

The cited data samples are used to obtain optimal data values, which will then be processed in the microcontroller. Signal sampling (cubing) is one of the important processes in digital signal processing. Cubing involves obtaining digital data through sampling an analog signal, meaning that analog signals are sampled discretely with period Ts or frequency Fs.
To sample information signals, we must pay attention to the use of the sampling frequency.
This theorem is known as Shannon's Sampling Theorem and states that if a continuous time function f(t) is limited by its highest frequency component less than ω, then the function f(t) can be rewritten from its cubing values if the sampling frequency is equal to or greater than 2ω. Mathematically, Shannon's Sampling Theorem can be expressed as follows:

    F_s ≥ 2F    
    Where:
        Fs = sampling frequency
        Fs = analog/information signal frequency

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

## Neural Network

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
In the use of neural network methods, a function activation is needed to determine whether the result from each neuron should be passed on to the next process or not. This function activation can also be used to determine whether a neuron is being used or not. In general, three common activation functions used in artificial neural networks are:

Threshold function (threshold)

    f(x) = { 0 if x < a }^(1 if x ≥ a)  

Sigmoid function

    f(x) = 1 / (1 + e^(-x))

The sigmoid function is often used because its values lie between 0 and 1, and it can be easily differentiated.
Identity function

    f(x) = x

The identity function is often used when we want the network output to be any real number (not just within the range [0, 1] or [-1, 1]).