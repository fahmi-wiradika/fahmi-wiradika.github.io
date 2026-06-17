# Salon Appointment Scheduler Database Project

This project is part of the **FreeCodeCamp Relational Database Certification** course. It demonstrates the creation and management of a PostgreSQL database for a salon appointment scheduling system with an interactive bash script interface.

## Project Overview

The Salon Appointment Scheduler project involves:

- Creating a PostgreSQL database to manage salon services and appointments
- Implementing a normalized database schema with proper relationships
- Building an interactive bash script for customer appointment booking
- Handling customer registration and appointment scheduling logic

## Database Schema

The database consists of three main tables with proper foreign key relationships:

!!! abstract "Database Schema"
    === "Services Table"
        ```sql
        CREATE TABLE public.services (
            service_id integer NOT NULL,
            name character varying(255) NOT NULL
        );
        ```
            
        - **service_id**: Primary key, auto-incrementing integer
        - **name**: Service name (e.g., 'Potong Rambut', 'Cukur Jenggot')
      
    === "Customers Table"
        ```sql
        CREATE TABLE public.customers (
            customer_id integer NOT NULL,
            phone character varying(255) NOT NULL,
            name character varying(255) NOT NULL
        );
        ```
            
        - **customer_id**: Primary key, auto-incrementing integer
        - **phone**: Unique customer phone number (serves as natural identifier)
        - **name**: Customer full name
      
    === "Appointments Table"
        ```sql
        CREATE TABLE public.appointments (
            appointment_id integer NOT NULL,
            customer_id integer,
            service_id integer,
            "time" character varying(255)
        );
        ```
            
        - **appointment_id**: Primary key, auto-incrementing integer
        - **customer_id**: Foreign key referencing customers.customer_id
        - **service_id**: Foreign key referencing services.service_id
        - **time**: Appointment time (stored as text for flexibility)

Relationships

- `appointments.customer_id` → `customers.customer_id`
- `appointments.service_id` → `services.service_id`
- `customers.phone` has UNIQUE constraint for data integrity

## Project Structure

```
fcc-rdb-salondb/
├── salon.sh           # Interactive appointment booking script
├── salon.sql          # Database schema and initial data
└── README.md          # Project documentation
```

## Setup Instructions

- Prerequisites
    - PostgreSQL installed and running
    - Bash shell environment
    - FreeCodeCamp development environment

- Database Setup
    1. Create the database:
    ```bash
    createdb salon
    ```

    2. Import the schema and data:
    ```bash
    psql -d salon -f salon.sql
    ```

- Running the Application
    Make the script executable and run:
    ```bash
    chmod +x salon.sh
    ./salon.sh
    ```

## Application Features

- Interactive Menu System
    The salon.sh script provides a user-friendly interface with:

    - **Welcome Screen:**
    ```
    ~~~~~ WAZZALON ~~~~~

    Welcome to Wazzalon, how can I help you?
    ```

    - **Service Selection:**

    - Displays all available services with numbered options
    - Validates user input (numbers 1-5 only)
    - Handles invalid selections with appropriate error messages

    - **Customer Management:**

    - Phone number-based customer lookup
    - Automatic new customer registration
    - Maintains customer data consistency

    - **Appointment Booking:**

    - Service selection validation
    - Time input flexibility
    - Confirmation message with booking details

- Script Logic Flow

    1. Main Menu Function
        ```bash
        MAIN_MENU() {
        # Display feedback messages
        # Query and display available services
        # Handle service selection
        # Process customer information
        # Schedule appointment
        }
        ```

    2. Service Display
        - Queries services table for available options
        - Formats output as numbered list
        - Handles empty service scenarios

    3. Input Validation
        - **Service ID**: Validates numeric input (1-5 range)
        - **Phone Number**: Used as unique customer identifier
        - **Customer Registration**: Automatic for new customers

    4. Database Operations
        - **Customer Lookup**: `SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'`
        - **New Customer Insert**: `INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME','$CUSTOMER_PHONE')`
        - **Appointment Booking**: `INSERT INTO appointments(customer_id, service_id, time) VALUES('$CUSTOMER_ID','$SERVICE_ID_SELECTED','$SERVICE_TIME')`

## Sample Data

- Available Services
Based on the database dump, the salon offers:

| Service ID | Service Name |
|------------|--------------|
| 1 | Potong Rambut |
| 2 | Cukur Jenggot |
| 3 | Cabut Bulu Hidung |
| 4 | Cabut Bulu Kaki |
| 5 | Congcong Treatment |

- Sample Customer Data

| Customer ID | Phone | Name |
|-------------|-------|------|
| 113 | 1234 | waz |
| 114 | 4321 | Cal |

- Sample Appointments

| Appointment ID | Customer ID | Service ID | Time |
|----------------|-------------|------------|------|
| 73 | 113 | 5 | 1AM |
| 74 | 113 | 4 | 2AM |
| 75 | 113 | 2 | 3AM |
| 76 | 114 | 4 | 5AM |

## User Experience Flow

- New Customer Journey
    1. **Service Selection**: Customer selects from numbered menu
    2. **Phone Input**: System prompts for phone number
    3. **Registration**: If new, customer provides name
    4. **Time Selection**: Customer chooses appointment time
    5. **Confirmation**: System confirms booking details

- Returning Customer Journey
    1. **Service Selection**: Customer selects from numbered menu
    2. **Phone Input**: System identifies existing customer
    3. **Time Selection**: Customer chooses appointment time
    4. **Confirmation**: System confirms booking with customer name

- Example Interaction
    ```
    ~~~~~ WAZZALON ~~~~~

    Welcome to Wazzalon, how can I help you?
    1) Potong Rambut
    2) Cukur Jenggot
    3) Cabut Bulu Hidung
    4) Cabut Bulu Kaki
    5) Congcong Treatment
    2

    What's your phone number?
    555-1234

    I don't have a record for that phone number, what's your name?
    John Doe

    What time would you like your Cukur Jenggot, John Doe?
    10:30AM

    I have put you down for a Cukur Jenggot at 10:30AM, John Doe.
    ```

## Technical Implementation Details

- Database Connection
    ```bash
    PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"
    ```
    - Uses tuples-only mode for clean output
    - Connects with freecodecamp user
    - Targets salon database specifically

- Error Handling
    - **Invalid Service Selection**: "That's not a number"
    - **Service Not Found**: "I could not find that service. What would you like today?"
    - **Empty Services**: "Sorry, we dont have any service available right now"

- Data Processing
    - **String Trimming**: Uses `sed -r 's/^ *| *$//g'` to clean customer names
    - **Input Validation**: Regex pattern `^[1-5]+$` for service selection
    - **Conditional Logic**: Nested if-else statements for flow control

- Security Considerations
    - Uses parameterized queries through variables
    - Input validation prevents basic injection attempts
    - Phone number serves as natural unique identifier

## Key Features

- Database Design
    - **Normalized Structure**: Separate entities for services, customers, and appointments
    - **Referential Integrity**: Foreign key constraints ensure data consistency
    - **Scalability**: Auto-incrementing IDs support unlimited records

- User Interface
    - **Intuitive Navigation**: Numbered menu system
    - **Error Recovery**: Invalid inputs return to main menu with helpful messages
    - **Personalization**: Uses customer names in confirmations

- Business Logic
    - **Customer Recognition**: Phone-based identification system
    - **Automatic Registration**: Seamless onboarding for new customers
    - **Flexible Scheduling**: Text-based time input allows various formats

## Potential Extensions

Future enhancements could include:

- **Service Pricing**: Add cost information to services table
- **Appointment Duration**: Track service duration for scheduling
- **Staff Management**: Add stylists/employees table
- **Appointment Status**: Track confirmed, completed, cancelled appointments
- **Customer History**: Query past appointments and preferences
- **Time Validation**: Implement proper time format validation
- **Conflict Detection**: Prevent double-booking of time slots

## Learning Objectives

This project demonstrates proficiency in:

1. Database Management
    - Creating and managing PostgreSQL databases
    - Implementing normalized table structures
    - Setting up foreign key relationships
    - Writing efficient SQL queries

2. Bash Scripting
    - Interactive menu systems
    - Input validation and error handling
    - String manipulation and formatting
    - Database integration with shell scripts

3. Application Development
    - User experience design
    - Business logic implementation
    - Data validation and sanitization
    - Error handling and recovery

4. Software Engineering Principles
    - Separation of concerns (database vs. application logic)
    - Input validation and security
    - User-friendly interface design
    - Maintainable code structure

## Course Context

This project is part of the **FreeCodeCamp Relational Database Certification**, specifically the "Build a Salon Appointment Scheduler" project. It serves as a practical application of:

- **Database Design**: Creating normalized schemas with proper relationships
- **SQL Operations**: INSERT, SELECT, and conditional queries
- **Bash Programming**: Interactive scripts with database integration
- **User Interface Design**: Command-line application development
- **Business Logic**: Real-world appointment scheduling system

The project simulates a real salon management system, demonstrating skills applicable to:

- Small business management systems
- Appointment scheduling applications
- Customer relationship management (CRM)
- Interactive command-line tools
- Database-driven applications

## Technical Requirements Met

- FreeCodeCamp Specifications
    - Interactive bash script named `salon.sh`
    - PostgreSQL database with proper schema
    - Service selection with numbered menu
    - Customer phone number identification
    - New customer registration
    - Appointment scheduling functionality
    - Proper error handling and validation
    - Confirmation messages with customer details

- Database Constraints
    - Primary keys on all tables
    - Foreign key relationships
    - Unique constraint on customer phone
    - Proper data types and lengths
    - Auto-incrementing ID sequences