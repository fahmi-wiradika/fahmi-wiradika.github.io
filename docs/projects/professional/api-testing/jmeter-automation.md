# Performance Testing with Apache JMeter

A comprehensive performance testing suite for the [ Simple CRUD Apps - Full-Stack Product Management System](https://simple-crud-apps.vercel.app/) API using Apache JMeter. This project includes automated CI/CD pipelines, custom test runners, and detailed performance reporting.

## 🎯 Overview

This repository contains JMeter test plans and automation scripts for load testing and performance monitoring of the Product Management API. The tests simulate real-world CRUD operations and provide detailed metrics on application performance under various load conditions.

## 📁 Project Structure

```
performance-test/
├── .github/
│   └── workflows/
│       ├── jmeter-ci.yml                    # CI pipeline configuration
│       └── jmeter-report-deployment.yml     # Report deployment workflow
├── jmeter-test-plan/
│   └── simple-crud.jmx                      # Main JMeter test plan
├── reports/
│   ├── HTML/                                # Generated HTML reports
│   ├── report.jtl                           # Test results data
│   └── jmeter.log                           # JMeter execution logs
├── jmeter-runner.bat                        # Simple test runner script
├── jmeter-custom-runner.bat                 # Interactive test runner
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Features

- **Automated CRUD Testing**: Complete Create, Read, Update, Delete operation tests
- **Parameterized Test Execution**: Flexible configuration for threads, ramp-up time, duration, and loops
- **CI/CD Integration**: GitHub Actions workflows for automated testing
- **HTML Reporting**: Beautiful, interactive performance reports
- **Custom Test Runners**: Windows batch scripts for easy local execution
- **GitHub Pages Deployment**: Automated report publishing
- **Performance Test Repository**: [JMeter Automation](https://github.com/fahmi-wiradika/performance-test)
- **Performance Test Live Report**: [Performance Test](https://fahmi-wiradika.github.io/performance-test/)


## 📊 Test Configuration

### Default Test Parameters

The test plan supports the following configurable parameters:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `threads` | 3 | Number of concurrent users |
| `rampup` | 1 | Ramp-up period in seconds |
| `loop` | 1 | Number of iterations per thread (-1 for infinite) |
| `duration` | 60 | Test duration in seconds |
| `startup_delay` | 5 | Delay before starting tests |

### Test Scenarios

1. **Create Product**: POST request with product details
2. **Read Product**: GET request to retrieve created product
3. **Update Product**: PUT request to modify product data
4. **Delete Product**: DELETE request to remove product

## 🛠️ Local Setup

### Prerequisites

- [Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi) 5.5 or higher
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) 17 or higher
- Windows OS (for batch scripts) or modify scripts for your OS

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/fahmiwazu/performance-test.git
cd performance-test
```

2. **Install Apache JMeter**
    - Download JMeter from the official website
    - Extract to your preferred location
    - Add JMeter's `bin` directory to your system PATH

3. **Verify Installation**
```bash
jmeter -v
```

## 🏃‍♂️ Running Tests

### Option 1: Simple Test Runner

Use the basic runner for quick tests with default parameters:

```bash
jmeter-runner.bat
```

This executes the test with default settings and generates HTML reports in the `reports/HTML` directory.

### Option 2: Custom Test Runner

Use the interactive custom runner for parameterized testing:

```bash
jmeter-custom-runner.bat
```

The script will prompt you for:
- Number of threads (users)
- Ramp-up period (seconds)
- Loop count (0 for infinite)
- Duration (seconds, 0 to ignore)
- Startup delay (seconds)

### Option 3: Command Line

Run tests directly with JMeter CLI:

```bash
jmeter -n -t jmeter-test-plan/simple-crud.jmx \
  -l reports/report.jtl \
  -e -o reports/HTML \
  -j reports/jmeter.log \
  -Jthreads=5 -Jrampup=10 -Jloop=5 -Jduration=60 -Jstartup_delay=5
```

## 🔄 CI/CD Integration

### GitHub Actions Workflows

#### 1. JMeter CI Pipeline

**File**: `.github/workflows/jmeter-ci.yml`

**Triggers**:
- Push to `master` branch
- Daily at 02:00 AM UTC+7 (19:00 UTC)

**Features**:
- Automated test execution with predefined parameters
- Artifact upload (JTL reports and logs)
- 3-day artifact retention

**Configuration**:
```yaml
# Test runs with: 5 users, 5 iterations, 10s ramp-up
-Jusers=5 -Jiterations=5 -Jrampup=10
```

#### 2. Report Deployment Pipeline

**File**: `.github/workflows/jmeter-report-deployment.yml`

**Triggers**:
- Push to `master` branch

**Features**:
- Automated HTML report generation
- GitHub Pages deployment
- Public accessibility of test results

**Live Reports**: The latest test reports are automatically deployed to GitHub Pages.

## 📈 Understanding Reports

### Key Metrics

The HTML reports include comprehensive performance metrics:

- **Response Time**: Average, median, 90th, 95th, 99th percentiles
- **Throughput**: Requests per second
- **Error Rate**: Percentage of failed requests
- **Network Traffic**: Sent and received bytes
- **APDEX Score**: Application Performance Index

### Report Sections

1. **Dashboard**: Overview of test execution and key statistics
2. **Statistics**: Detailed metrics for each request type
3. **Over Time Charts**: Response time and throughput trends
4. **Throughput**: Requests and data transfer rates
5. **Response Times**: Distribution and percentile analysis
6. **Errors**: Error counts and types

## 🔧 Test Plan Configuration

### User Defined Variables

```xml
BASE_URL: simple-crud-apps.vercel.app
PRODUCT_NAME: Pecak Bandeng
PRODUCT_PRICE: 48000
PRODUCT_QTY: 4
UPD_NAME: Bandeng Presto
UPD_PRICE: 45000
UPD_QTY: 5
```

### Thread Group Settings

The thread group is configured with property placeholders for dynamic configuration:

```xml
Threads: ${__P(threads,3)}
Ramp-up: ${__P(rampup,1)}
Duration: ${__P(duration,60)}
Startup Delay: ${__P(startup_delay,5)}
Loop Count: ${__P(loop,1)}
```

## 🎯 Performance Benchmarks

### Recommended Load Profiles

**Light Load Testing**:
```bash
-Jthreads=5 -Jrampup=5 -Jloop=10 -Jduration=60
```

**Medium Load Testing**:
```bash
-Jthreads=25 -Jrampup=30 -Jloop=20 -Jduration=300
```

**Heavy Load Testing**:
```bash
-Jthreads=100 -Jrampup=60 -Jloop=50 -Jduration=600
```

**Stress Testing**:
```bash
-Jthreads=500 -Jrampup=120 -Jloop=100 -Jduration=1800
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: JMeter not found
```bash
# Solution: Add JMeter to PATH or update batch script with full path
set JMETER_PATH=C:\path\to\apache-jmeter-5.5\bin\jmeter.bat
```

**Issue**: No JTL file generated
```bash
# Check JMeter log file for errors
type reports\jmeter.log
```

**Issue**: Empty HTML report
```bash
# Ensure test executed successfully and JTL file contains data
# Verify API endpoint is accessible
```

**Issue**: Connection timeouts
```bash
# Verify target API is running
# Check network connectivity
# Adjust timeout settings in test plan
```

## 📊 Best Practices

### Load Testing Guidelines

1. **Start Small**: Begin with light load and gradually increase
2. **Monitor Resources**: Watch server CPU, memory, and network usage
3. **Baseline Testing**: Establish performance baselines before optimization
4. **Incremental Testing**: Test after each optimization
5. **Real-world Scenarios**: Simulate actual user behavior patterns

### Test Execution Tips

- Run tests during off-peak hours for production environments
- Use consistent test data for reproducible results
- Document test configurations and results
- Archive historical reports for trend analysis
- Validate API responses in test assertions

## 🔗 Related Resources

- **Target API**: [Simple CRUD Apps](https://simple-crud-apps.vercel.app)
- **API Repository**: [GitHub - simple-crud-apps](https://github.com/fahmiwazu/simple-crud-apps)
- **API Testing Suite**: [Newman Automation](https://github.com/fahmiwazu/newman-automation)
- **JMeter Documentation**: [Apache JMeter User Manual](https://jmeter.apache.org/usermanual/index.html)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Apache JMeter team for the excellent testing tool
- Simple CRUD Apps project for providing the API to test
- GitHub Actions for CI/CD automation

---

**Happy Performance Testing! 🚀**
