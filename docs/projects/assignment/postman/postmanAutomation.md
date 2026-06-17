# Postman API Automation Assignment Project

This project is part of the **Postman API Test Automation Certification Program** developed by Valentin Despa and available through platforms like freeCodeCamp. It demonstrates comprehensive API testing and automation skills using Postman's testing framework with the Valentino Artisan Coffee House API.

## Project Overview

The Postman API Automation Assignment project involves:

- Creating automated API tests using Postman's testing framework
- Implementing response validation and data extraction
- Managing collections and environment variables
- Integrating with CI/CD pipelines using GitHub Actions
- Demonstrating real-world API testing scenarios

## Learning Objectives

This project demonstrates proficiency in:

1. **API Testing Fundamentals**
      - HTTP status code validation
      - Response body parsing and validation
      - JSON schema validation
      - Data extraction and variable management

2. **Test Automation**
      - Writing JavaScript test scripts in Postman
      - Implementing assertions with pm.test() and pm.expect()
      - Creating reusable test patterns

3. **CI/CD Integration**
      - Setting up GitHub Actions workflows
      - Automated test execution with Postman CLI
      - Test reporting and monitoring

4. **Quality Assurance Best Practices**
      - Structured test organization
      - Comprehensive test coverage
      - Collaborative testing workflows

## API Structure

The project uses the **Valentino Artisan Coffee House API** with the following endpoints:

1. Base URL
```
https://valentinos-coffee.herokuapp.com
```

2. Key Endpoints
    - `GET /status` - API health check
    - `GET /products` - Retrieve all products
    - `GET /products/{id}` - Get single product details
    - `POST /clients` - Register new client
    - `POST /orders` - Create new order
    - `GET /orders` - Get all orders
    - `GET /orders/{id}` - Get specific order details

## Project Structure

```
postman-api-automation/
├── collections/
│   ├── Assignment #1/
│   ├── Assignment #2/
│   ├── Assignment #3/
│   ├── Assignment #4/
│   └── Assignment #5/
├── .github/
│   └── workflows/
│       └── postman.yml
├── environments/
│   └── coffee-house.json
└── README.md
```

## Setup Instructions

2. Prerequisites
    - Postman application installed
    - GitHub account for CI/CD integration
    - Postman API key for automation
    - Basic understanding of JavaScript and API testing

3. Environment Setup
    - Import the Valentino Artisan Coffee House API collection
    - Configure environment variables
    - Set up Postman workspace for collaboration
    - Generate Postman API key for CI/CD integration

## Assignment Tasks and Solutions

### Assignment #1: Basic API Testing and Data Extraction

1. Objectives
    - Implement basic status code validation
    - Parse JSON response bodies
    - Extract and store data in variables

2. Tasks Overview
    1. **Status Code Validation**: Verify API status endpoint returns 200
    2. **Response Parsing**: Extract product description from JSON response
    3. **Variable Management**: Store order ID for subsequent requests

    !!! abstract "Assignment"
        === "Task 1: API Status Validation"
            **Requirement**: Add a test to verify the API status endpoint returns 200
        
            **Solution**:
            ```javascript
            // Test Script for "Get API status"
            pm.test("Status code is 200", function () {
                pm.response.to.have.status(200);
            });
            ```
        
            **Key Concepts**:
        
            - Basic status code assertion
            - Using `pm.test()` for test creation
            - HTTP status validation patterns
        
        === "Task 2: JSON Response Parsing"
            **Requirement**: Parse JSON response and log product description to console
        
            **Solution**:
            ```javascript
            // Test Script for "Get single product"
            const response = pm.response.json();
            console.log(response);
            console.log(response.id);
            console.log(response['product-description']);
        
            pm.test("Status code test: 200", function () {
                pm.expect(pm.response.code).to.eql(200);
            });
            ```
        
            **Key Concepts**:
        
            - JSON response parsing with `pm.response.json()`
            - Console logging for debugging
            - Property access with dot notation and bracket notation
            - Alternative status code validation method
        
        === "Task 3: Variable Management"
            **Requirement**: Extract order ID from response and store in collection variable
        
            **Solution**:
            ```javascript
            // Test Script for "Create a new order"
            pm.test("Status code is 200", function () {
                pm.response.to.have.status(200);
            });
        
            const response = pm.response.json();
        
            pm.collectionVariables.set('orderID', response.id);
            ```
        
            **Key Concepts**:
            
            - Collection variable management
            - Data extraction for test chaining
            - Response data persistence

### Assignment #2: Comprehensive Status Code Testing

1. Objectives
    - Implement consistent status code validation across all endpoints
    - Standardize test patterns for maintainability

    !!! abstract "Assignment"
        === "Task: Universal Status Code Testing"
            **Requirement**: Apply `pm.expect()` status code tests to all collection requests

            **Solution**:
            ```javascript
            // Add to all endpoint Post-response scripts
            pm.test("Status code test: 200", function () {
                pm.expect(pm.response.code).to.eql(200);
            });
            ```

            **Key Concepts**:

            - Consistent test pattern implementation
            - Using `pm.expect()` for assertions
            - Test standardization across endpoints

### Assignment #3: Advanced Response Validation

1. Objectives
    - Validate JSON response format
    - Implement property existence checks
    - Test data types and patterns

2. Tasks Overview
    1. **JSON Format Validation**: Verify response is valid JSON
    2. **Property Validation**: Check ID property existence and format
    3. **Array Validation**: Verify products property is an array

    !!! abstract "Assignment"
        === "Task 1: JSON Format Validation"
            **Requirement**: Verify response is in JSON format

            **Solution**:
            ```javascript
            // Test Script for "Get an order by ID"
            let response;

            pm.test("Response body is JSON", function(){
                pm.response.to.be.json;
                response = pm.response.json();
            });
            ```

        === "Task 2: ID Property Validation"
            **Requirement**: Validate ID property existence and format using regex

            **Solution**:
            ```javascript
            // Test Script for "Get an order by ID"
            pm.test("Get Property ID on JSON", function(){
                pm.expect(response).to.have.property('id');
                pm.expect(response.id).to.match(/^[A-Z0-9]{9}$/);
            });
            ```

        === "Task 3: Array Property Validation"
            **Requirement**: Validate products property exists and is an array

            **Solution**:
            ```javascript
            // Test Script for "Get an order by ID"
            pm.test("Get Property products on JSON", function(){
                pm.expect(response).to.have.property('products');
                pm.expect(response.products).to.be.a('array');
            });
            ```

            **Key Concepts**:

            - Property existence validation
            - Regular expression pattern matching
            - Data type validation
            - Complex assertion chains

### Assignment #4: JSON Schema Validation

1. Objectives
    - Implement comprehensive JSON schema validation
    - Define strict data contracts
    - Ensure API response consistency

2. Tasks Overview
    1. **Basic Schema**: Define object-type schema
    2. **Required Properties**: Specify all required fields
    3. **Additional Properties**: Restrict unexpected fields

    !!! abstract "Assignment"
        === "Task 1: Basic Object Schema"
            **Requirement**: Create JSON schema expecting object response

            **Solution**:
            ```javascript
            // Test Script for "Get single product"
            let response;
            pm.test("Response body is JSON", function(){
                pm.response.to.be.json;
                response = pm.response.json();
                console.log(response['product-description']);
            });
            ```

        === "Task 2: Complete Schema with Required Properties"
            **Requirement**: Define schema with all required properties

            **Solution**:
            ```javascript
            // Test Script for "Get single product"
            pm.test("JSON Schema are valid", function(){
                const schema = {
                    'type': 'object',
                    'properties': {
                        'id': {
                            'type': 'integer'
                        },
                        'category': {
                            'type': 'string'
                        },
                        'name': {
                            'type': 'string'
                        },
                        'isAvailable': {
                            'type': 'boolean'
                        },
                        'product-description': {
                            'type': 'string'
                        },
                        'additionalText': {
                            'type': 'string'
                        }                      
                    },
                    'required': ['id','category','name','isAvailable','product-description','additionalText']
                };
                pm.response.to.have.jsonSchema(schema);
            });   
            ```

        === "Task 3: Strict Schema Validation"
            **Requirement**: Prevent additional properties in response

            **Solution**:
            ```javascript
            // Add to schema object
            'additionalProperties': false
            ```

            **Key Concepts**:

            - JSON Schema definition and validation
            - Data type specification
            - Required field enforcement
            - Additional property restrictions

### Assignment #5: CI/CD Integration with GitHub Actions

1. Objectives
    - Implement automated testing pipeline
    - Configure GitHub Actions workflow
    - Execute Postman collections programmatically

2. Tasks Overview
    1. **GitHub Setup**: Create public repository with Actions workflow
    2. **Automation**: Ensure successful collection execution

    !!! abstract "Assignment"
        === "Task 1: GitHub Actions Configuration"
            **Requirement**: Set up automated workflow for Postman collection execution

            **Solution**:
            ```yaml
            # .github/workflows/postman.yml
            name: Automated API tests using Postman CLI

            on: push

            jobs:
            automated-api-tests:
                runs-on: windows-latest
                steps:
                - uses: actions/checkout@v4
                - name: Install Postman CLI
                run: |
                    powershell.exe -NoProfile -InputFormat None -ExecutionPolicy AllSigned -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://dl-cli.pstmn.io/install/win64.ps1'))"
                - name: Login to Postman CLI
                run: postman login --with-api-key ${{ secrets.POSTMAN_API_KEY }}
                - name: Run API tests
                run: |
                    postman collection run "36196810-3064f937-caa2-4035-bcda-b75336216fc5"
            ```

        === "Task 2: Successful Test Execution"
            **Requirement**: Verify automated test execution works correctly

            **Solution Output**:
            ```
            Running your collection...
            postman

            Valentino Artisan Coffee House API

            □ status
            └ Get API status
            GET https://valentinos-coffee.herokuapp.com/status [200 OK, 783B, 329ms]
            √  Status code is 200
            √  Headers Test

            □ products
            └ Get all products
            GET https://valentinos-coffee.herokuapp.com/products?category=pastry [200 OK, 1.31kB, 77ms]
            √  Status code test: 200

            └ Get single product
            GET https://valentinos-coffee.herokuapp.com/products/1001 [200 OK, 954B, 75ms]
            √  Status code test: 200
            √  Response body is JSON
            √  JSON Schema are valid

            □ clients
            └ Register a new client
            POST https://valentinos-coffee.herokuapp.com/clients [200 OK, 809B, 78ms]
            √  Status code test: 200
            √  Response body is JSON

            □ orders
            └ Create a new order
            POST https://valentinos-coffee.herokuapp.com/orders [201 Created, 937B, 76ms]
            √  Status code test: 201
            √  Response body is JSON
            √  Customer name
            √  Schema is valid

            └ Get all orders
            GET https://valentinos-coffee.herokuapp.com/orders [200 OK, 847B, 74ms]
            √  Status code test: 200

            └ Get an order by ID
            GET https://valentinos-coffee.herokuapp.com/orders/AF_86H4A1R [200 OK, 932B, 74ms]
            √  Status code test: 200
            √  Response body is JSON
            √  Get Property ID on JSON
            √  Get Property products on JSON

            ┌───────────────────────────┬────────────────────┬───────────────────┐
            │                           │           executed │            failed │
            ├───────────────────────────┼────────────────────┼───────────────────┤
            │                iterations │                  1 │                 0 │
            ├───────────────────────────┼────────────────────┼───────────────────┤
            │                  requests │                  7 │                 0 │
            ├───────────────────────────┼────────────────────┼───────────────────┤
            │              test-scripts │                  7 │                 0 │
            ├───────────────────────────┼────────────────────┼───────────────────┤
            │        prerequest-scripts │                  3 │                 0 │
            ├───────────────────────────┼────────────────────┼───────────────────┤
            │                assertions │                 17 │                 0 │
            ├───────────────────────────┴────────────────────┴───────────────────┤
            │ total run duration: 1431ms                                         │
            ├────────────────────────────────────────────────────────────────────┤
            │ total data received: 1.28kB (approx)                               │
            ├────────────────────────────────────────────────────────────────────┤
            │ average response time: 111ms [min: 74ms, max: 329ms, s.d.: 88ms]   │
            └────────────────────────────────────────────────────────────────────┘
            ```

            **Key Concepts**:

            - GitHub Actions workflow configuration
            - Postman CLI integration
            - Automated test execution
            - CI/CD pipeline implementation

## Technical Implementation Details

1. Test Patterns and Best Practices

    !!! abstract ""
        === "Status Code Validation"
            ```javascript
            // Method 1: Direct status validation
            pm.test("Status code is 200", function () {
                pm.response.to.have.status(200);
            });

            // Method 2: Using pm.expect()
            pm.test("Status code test: 200", function () {
                pm.expect(pm.response.code).to.eql(200);
            });
            ```

        === "Response Body Parsing"
            ```javascript
            // Parse JSON response
            const response = pm.response.json();

            // Access properties
            console.log(response.id);
            console.log(response['product-description']);
            ```

        === "Variable Management"
            ```javascript
            // Set collection variable
            pm.collectionVariables.set('orderID', response.id);

            // Get collection variable
            const orderId = pm.collectionVariables.get('orderID');
            ```

        === "Property Validation"
            ```javascript
            // Check property existence
            pm.expect(response).to.have.property('id');

            // Validate data types
            pm.expect(response.products).to.be.a('array');
            pm.expect(response.id).to.be.a('number');
            ```

        === "Pattern Matching"
            ```javascript
            // Regular expression validation
            pm.expect(response.id).to.match(/^[A-Z0-9]{9}$/);
            ```

2. JSON Schema Validation Pattern

    ```javascript
    const schema = {
        'type': 'object',
        'properties': {
            'id': { 'type': 'integer' },
            'name': { 'type': 'string' },
            'isAvailable': { 'type': 'boolean' }
        },
        'required': ['id', 'name', 'isAvailable'],
        'additionalProperties': false
    };

    pm.response.to.have.jsonSchema(schema);
    ```

## Test Coverage Summary

1. Endpoints Tested
    - **7 API endpoints** across 4 resource categories
    - **17 assertions** covering various validation scenarios
    - **100% success rate** in automated execution

2. Test Categories
    - **Status Code Validation**: 7 tests
    - **Response Format Validation**: 4 tests  
    - **Property Existence**: 3 tests
    - **Data Type Validation**: 2 tests
    - **Pattern Matching**: 1 test

3. Performance Metrics
    - **Total execution time**: 1431ms
    - **Average response time**: 111ms
    - **Data transferred**: 1.28kB
    - **Fastest request**: 74ms
    - **Slowest request**: 329ms

## Skills Demonstrated

1. API Testing Expertise
    - HTTP status code validation
    - JSON response parsing and validation
    - Data extraction and variable management
    - Schema validation and data contracts

2. JavaScript Testing Framework
    - Postman test scripting with JavaScript
    - Assertion patterns with pm.test() and pm.expect()
    - Regular expression pattern matching
    - Console logging for debugging

3. Automation and CI/CD
    - GitHub Actions workflow configuration
    - Postman CLI integration
    - Automated test execution
    - Test reporting and monitoring

4. Quality Assurance Practices
    - Test organization and structure
    - Comprehensive validation coverage
    - Reusable test patterns
    - Collaborative testing workflows

## Assignment Progression

1. Assignment #1: Foundation
    - Basic API testing concepts
    - Status code validation
    - Response parsing
    - Variable management

2. Assignment #2: Standardization  
    - Consistent test patterns
    - Universal validation approaches
    - Code maintainability

3. Assignment #3: Advanced Validation
    - Property existence checks
    - Data type validation
    - Pattern matching
    - Complex assertions

4. Assignment #4: Schema Validation
    - JSON schema definition
    - Comprehensive data contracts
    - Strict validation rules
    - API contract enforcement

5. Assignment #5: Automation
    - CI/CD integration
    - Automated test execution
    - Production-ready workflows
    - Continuous validation

## Project Outcomes

1. Certification Achievement
    - Completion of Valentin Despa's API Test Automation program
    - Digital badge eligibility for professional networking
    - Demonstrated proficiency in API testing automation

2. Practical Skills Acquired
    - Professional API testing methodologies
    - Production-ready automation practices
    - CI/CD pipeline integration
    - Quality assurance best practices

3. Industry Readiness
    - Real-world API testing scenarios
    - Enterprise-level automation patterns
    - Collaborative development practices
    - Continuous integration expertise

## References and Resources

- **YouTube Tutorial**: [Postman API Test Automation for Beginners](https://www.youtube.com/watch?v=zp5Jh2FIpF0)
- **Course Notes**: [Postman Course Repository](https://github.com/vdespa/automation-with-postman-course)
- **Postman Workspace**: [API Test Automation Collection](https://www.postman.com/fahmi-wiradika/freecodecamp-api-test-automation-with-postman/overview)
- **GitHub Repository**: [Automation Implementation](https://github.com/fahmi-wiradika/Postman-API)
- **Instructor**: Valentin Despa - Postman Community Expert
- **Platform**: freeCodeCamp API Testing Certification

## Course Context

This project represents a complete journey through API test automation, from basic validation to production-ready CI/CD integration. It demonstrates the practical application of:

- **Quality Assurance Engineering** principles
- **Test Automation** best practices  
- **API Testing** methodologies
- **Continuous Integration** workflows
- **Professional Development** skills

The assignment structure progressively builds complexity, ensuring comprehensive understanding of API testing automation while preparing students for real-world QA engineering roles.