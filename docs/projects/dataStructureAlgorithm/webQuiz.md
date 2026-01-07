# 1to50 Puzzle Automation Project

## Project Overview
The 1to50 Puzzle Automation Project is designed to automate the process of solving the 1to50 puzzle game using Selenium with Python. This project demonstrates how to use web automation techniques to interact with and solve a web-based puzzle game by replicating human actions in an efficient and accurate manner.

Try the puzzle for yourself on [1to50 puzzle](https://zzzscore.com/1to50/en/). Let's see if you can keep up :smile:

## Installation Guide

### Prerequisites
- Python 3.x: Ensure that Python 3.x is installed on your system.
- Chrome Browser: The Chrome browser is required for running the automation script.
- ChromeDriver: The WebDriver that interacts with Chrome.

### Setup Instructions
1. Install Python: Download and install Python from [python.org](https://www.python.org).
2. Set Up a Virtual Environment (Optional but recommended):
    
    ``` bash title="Bash"
    python -m venv venv
    ```

    Activate the virtual environment:
    
    - On Windows:
    ``` powershell title="PowerShell"
    venv\Scripts\activate
    ```

    - On macOS/Linux:
    ``` unixconfig title="Unix"
    source venv/bin/activate
    ```

3. Install Dependencies:

    Create a requirement.txt file with the following content:
    ``` text title="text"
    selenium
    ```
    Install dependencies:
    ``` bash title="bash"
    pip install -r requirement.txt
    ```

4. Download and Configure ChromeDriver:
    - Download ChromeDriver from [chromedriver.chromium.org](https://sites.google.com/chromium.org/driver/home?authuser=0).
    - Ensure that the version of ChromeDriver matches your Chrome browser version.
    - Place chromedriver in a directory included in your system's PATH or specify the path in the `1to50.py` file.

## Usage Instructions
### Running the Automation Script

1. Open a Terminal or Command Prompt.
2. Navigate to the Project Directory:
    ``` bash title="bash"
    cd path/to/project
    ```
3. Run the Script:
    ``` bash title="bash"
    python 1to50.py
    ```
    The script will open Chrome, interact with the 1to50 puzzle game, and attempt to solve it.

### Example Output
- The browser will automatically open, and you will see the puzzle being solved in real-time.
- The final result will be displayed in the terminal or saved to a log file, depending on the script configuration.

## Code Structure

### Directory Layout
- `1to50.py`: The main script that initializes the WebDriver, interacts with the puzzle game, and solves the puzzle.
- `app.log`: The logging module or an external script for capturing output.
- `requirement.txt`: Lists the Python dependencies required for the project.

### Code Logic
- Algorithm Flowchart 
``` mermaid
flowchart TB
    Start((Start))
    End((End))
    subgraph Selenium Webdriver

    Step1["Open Chrome <br>Browser"]
    Step2["navigate URL <br>to 1to50 Puzzle"]
    Step3a["Inspect Web Element"]
    Step8["Close Browser"]
    end
    
    subgraph Puzzle Solver
    Step3["Get Number 1 Element <br>address using Xpath"]
    Step4["Put element locator<br> into while loop"]
    Step5["Get final <br>timestamp result"]
    end

    subgraph Data log
    Step7["create log file"]
    Step6["Export Log file"]
    end

    Start-->Step1
    Start-->Step7
    Step1-->Step2
    Step2-->Step3a
    Step3a-->Step3
    Step3-->Step4
    Step4-->Step5
    Step5-->Step6
    Step7--record all activity-->Step6
    Step5-->Step8
    Step8-->End
```

### Code Documentation

=== "Dependencies"
    ``` py linenums="1"
    import time
    import logging
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.chrome.service import Service
    ```
=== "Log file"
    ``` py linenums="7"
    # Configure logging
    logging.basicConfig(filename='app.log', level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s')

    # Example usage
    logging.info('This is an info message.')
    logging.error('This is an error message.')
    ```
=== "Variables"
    ``` py linenums="15"
    # ChromeDriver directory
    serv_obj = Service("PATH\\chromedriver.exe")

    # Opening Chrome Browser
    driver = webdriver.Chrome(service=serv_obj)
    ```
=== "Main Method"
    ``` py linenums="21"
    def Main():

        NavitageURL();
        Solver();
        GetRecord();

        # Closing Browser
        driver.close()

    ```
=== "Navigate URL Method"
    ``` py linenums="30"
    def NavitageURL():

        # Maximize Windows
        driver.maximize_window()

        # Insert Puzzle URI
        driver.get("https://zzzscore.com/1to50/en/")
    ```
=== "Solver Method"
    ``` py linenums="38" hl_lines="4-9"
    def Solver():
        # Automation Algorithm
        obj_count=1
        while(obj_count!=51):
            driver.find_element(By.XPATH, "//div[normalize-space()='"+str(obj_count)+"']//span[@class='box']").click()
            print("number "+str(obj_count)+" are clicked")
            if(obj_count%51==0):
                time.sleep(1)
            obj_count=obj_count+1

        # Complete Puzzle
        print("Quiz are completed")
    ```
=== "GetRecord Method"
    ``` py linenums="51"
    def GetRecord():
        # Retrieve Time Record
        time_record = driver.find_element(By.XPATH, "(//div[@id='time'])[1]")
        record = time_record.text

        # Display time Record
        print("Congratulation! your record are "+ record+ " seconds")
        time.sleep(10)
    ```


### Output of Process

=== "Console Output"
    ??? tip "Python Console "    
            number 1 are clicked
            number 2 are clicked
            number 3 are clicked
            number 4 are clicked
            number 5 are clicked
            number 6 are clicked
            number 7 are clicked
            number 8 are clicked
            number 9 are clicked
            number 10 are clicked
            number 11 are clicked
            number 12 are clicked
            number 13 are clicked
            number 14 are clicked
            number 15 are clicked
            number 16 are clicked
            number 17 are clicked
            number 18 are clicked
            number 19 are clicked
            number 20 are clicked
            number 21 are clicked
            number 22 are clicked
            number 23 are clicked
            number 24 are clicked
            number 25 are clicked
            number 26 are clicked
            number 27 are clicked
            number 28 are clicked
            number 29 are clicked
            number 30 are clicked
            number 31 are clicked
            number 32 are clicked
            number 33 are clicked
            number 34 are clicked
            number 35 are clicked
            number 36 are clicked
            number 37 are clicked
            number 38 are clicked
            number 39 are clicked
            number 40 are clicked
            number 41 are clicked
            number 42 are clicked
            number 43 are clicked
            number 44 are clicked
            number 45 are clicked
            number 46 are clicked
            number 47 are clicked
            number 48 are clicked
            number 49 are clicked
            number 50 are clicked
            Quiz are completed
            Congratulation! your record are 1.652 seconds

=== "Logfile output"
    The output are quite long to show in here, you can take a look on [App.log](https://github.com/fahmi-wiradika/1to50/blob/master/app.log)


### Repository
How to clone the Project

1. Go to [the Project Repository](https://github.com/fahmi-wiradika/1to50) on GitHub.
2. Clone the repository on your local machine:
    ``` bash title="bash"
    git init
    git clone https://github.com/fahmi-wiradika/1to50.git
    git add .
    git commit -m "Initial Commit"
    git remote add origin https://github.com/<username>/<repository>.git
    ```

3. Create new branch to safely explore your own project:
    ``` bash title="bash"
    git checkout -b feature-branch
    ```




## License
This project is licensed under the MIT License. See the LICENSE (1) for details.
{ .annotate }

1. Copyright (c) 2024 Fahmi Wahyu Wiradika <br><br> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: <br><br>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br><br>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## References and Resources

- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [Python Documentation](https://docs.python.org/3/)
- [ChromeDriver Documentation](https://developer.chrome.com/docs/chromedriver/downloads)

## Acknowledgements

- Special thanks to the Selenium community and contributors for their support and tools.

