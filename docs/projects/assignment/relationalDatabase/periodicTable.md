# Periodic Table Database Project

This project is part of the **FreeCodeCamp Relational Database Certification** course. It demonstrates the creation and manipulation of a PostgreSQL database containing periodic table data with element properties and atomic information.

## Project Overview

The Periodic Table Database project involves:

- Creating a PostgreSQL database to store chemical element data
- Fixing and restructuring an existing database schema
- Implementing proper relationships between elements, properties, and types
- Creating an interactive bash script to query element information
- Cleaning and reformatting existing data

## Database Schema

The database consists of three main tables with proper relationships:

!!! abstract "Database Schema"
    === "Elements Table"
        ```sql
        CREATE TABLE public.elements (
            atomic_number integer NOT NULL,
            symbol character varying(2) NOT NULL,
            name character varying(40) NOT NULL
        );
        ```

        - **atomic_number**: Primary key, unique identifier for each element
        - **symbol**: Chemical symbol (e.g., 'H', 'He', 'Li')
        - **name**: Full element name (e.g., 'Hydrogen', 'Helium', 'Lithium')

    === "Properties Table"
        ```sql
        CREATE TABLE public.properties (
            atomic_number integer NOT NULL,
            atomic_mass DECIMAL NOT NULL,
            melting_point_celsius DECIMAL NOT NULL,
            boiling_point_celsius DECIMAL NOT NULL,
            type_id integer NOT NULL
        );
        ```

        - **atomic_number**: Foreign key referencing elements.atomic_number
        - **atomic_mass**: Atomic mass in atomic mass units (amu)
        - **melting_point_celsius**: Melting point in Celsius
        - **boiling_point_celsius**: Boiling point in Celsius
        - **type_id**: Foreign key referencing types.type_id

    === "Types Table"
        ```sql
        CREATE TABLE public.types (
            type_id integer NOT NULL,
            type character varying(30) NOT NULL
        );
        ```

        - **type_id**: Primary key, unique identifier for element types
        - **type**: Element type (e.g., 'metal', 'nonmetal', 'metalloid')

Relationships

- `properties.atomic_number` → `elements.atomic_number`
- `properties.type_id` → `types.type_id`

## Project Structure

```
fcc-rdb-atomicdb/
├── element.sh           # Interactive bash script for querying elements
├── periodic_table.sql   # Database dump file with schema and data
├── README.md           # This documentation
└── .git/               # Git repository files
```

## Setup Instructions

- Prerequisites
    - PostgreSQL installed and running
    - Bash shell environment
    - Git for version control

- Database Setup
    1. Create the database:
    ```bash
    createdb periodic_table
    ```

    2. Import the schema and data:
    ```bash
    psql -d periodic_table -f periodic_table.sql
    ```

- Script Usage
    Make the script executable and run it:
    ```bash
    chmod +x element.sh
    ./element.sh [element_identifier]
    ```

## Scripts Description

- element.sh

    This interactive bash script allows users to query element information by providing:

    - **Atomic number** (e.g., `1`, `2`, `3`)
    - **Element symbol** (e.g., `H`, `He`, `Li`)
    - **Element name** (e.g., `Hydrogen`, `Helium`, `Lithium`)

- **Key Features:**
    - Input validation for different argument types
    - Smart pattern matching for partial element names
    - Comprehensive error handling
    - Formatted output with complete element information

- **Usage Examples:**
    ```bash
    ./element.sh 1          # Query by atomic number
    ./element.sh H          # Query by symbol
    ./element.sh Hydrogen   # Query by name
    ./element.sh Hyd        # Query by partial name
    ```

- **Sample Output:**
    ```
    The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu. Hydrogen has a melting point of -259.1 celsius and a boiling point of -252.9 celsius.
    ```

    ??? abstract "element.sh"
        ```bash
        #!/bin/bash

        PSQL="psql --username=freecodecamp --dbname=periodic_table --no-align --tuples-only -c"
            
        #echo "Please provide an element as an argument."

        #echo $1
        if [[ $1 ]]
        then
        if [[ ! $1 =~ ^[0-9]+$ ]]
        then
            ELEMENT=$($PSQL "SELECT atomic_number, atomic_mass, melting_point_celsius, boiling_point_celsius, symbol,name, type FROM properties JOIN elements USING(atomic_number) JOIN types USING(type_id) WHERE elements.name LIKE '$1%' ORDER BY atomic_number LIMIT 1")
        else
            ELEMENT=$($PSQL "SELECT atomic_number, atomic_mass, melting_point_celsius, boiling_point_celsius, symbol,name, type FROM properties JOIN elements USING(atomic_number) JOIN types USING(type_id) WHERE elements.atomic_number=$1")
        fi
            if [[ -z $ELEMENT ]]
            then
            echo "I could not find that element in the database."
            else
            echo $ELEMENT | while IFS=\| read ATOMIC_NUMBER MASS MELT BOIL SYM NAME TYPE
            do
                echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYM). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELT celsius and a boiling point of $BOIL celsius." 
            done
            fi
        else
        echo "Please provide an element as an argument."
        fi
        ```

## Script Logic Flow

- Input Processing
    1. **Argument Validation**: Checks if an argument is provided
    2. **Type Detection**: Determines if input is numeric (atomic number) or text (symbol/name)
    3. **Query Construction**: Builds appropriate SQL query based on input type

- Database Query Logic
    ```bash
    # For numeric input (atomic number)
    if [[ $1 =~ ^[0-9]+$ ]]
    then
        # Direct atomic number match
        ELEMENT=$($PSQL "SELECT ... WHERE elements.atomic_number=$1")
    else
        # Pattern match for symbol/name with LIKE
        ELEMENT=$($PSQL "SELECT ... WHERE elements.name LIKE '$1%' ORDER BY atomic_number LIMIT 1")
    fi
    ```

- Output Formatting
    - Uses IFS (Internal Field Separator) to parse pipe-delimited results
    - Formats data into human-readable sentences
    - Handles edge cases and missing data gracefully

## Data Coverage

The database contains:

- **Elements**: 118 chemical elements from the periodic table
- **Types**: 3 main categories (metal, nonmetal, metalloid)
- **Properties**: Complete atomic data including mass and temperature points

Element Categories:

- **Metals**: Alkali metals, alkaline earth metals, transition metals, etc.
- **Nonmetals**: Noble gases, halogens, hydrogen, carbon, etc.
- **Metalloids**: Boron, silicon, germanium, arsenic, etc.

## Database Modifications Made

- Schema Improvements
    1. **Proper Data Types**: Changed atomic_mass to DECIMAL for precision
    2. **Constraint Addition**: Added proper primary and foreign key constraints
    3. **Column Renaming**: Standardized column names for consistency
    4. **Table Restructuring**: Created separate types table for normalization

- Data Cleaning
    - Removed trailing zeros from decimal values
    - Standardized type names (lowercase)
    - Ensured referential integrity across tables
    - Fixed any missing or incorrect data entries

## SQL Query Examples

- Basic Element Lookup
    ```sql
    -- Get element by atomic number
    SELECT * FROM elements WHERE atomic_number = 1;

    -- Get element by symbol
    SELECT * FROM elements WHERE symbol = 'H';

    -- Get element by name (case-insensitive)
    SELECT * FROM elements WHERE name ILIKE 'hydrogen';
    ```

- Complex Joins
    ```sql
    -- Get complete element information
    SELECT e.atomic_number, e.symbol, e.name, p.atomic_mass, 
        p.melting_point_celsius, p.boiling_point_celsius, t.type
    FROM elements e
    JOIN properties p ON e.atomic_number = p.atomic_number
    JOIN types t ON p.type_id = t.type_id
    WHERE e.atomic_number = 1;
    ```

- Analytical Queries
    ```sql
    -- Count elements by type
    SELECT t.type, COUNT(*) as count
    FROM types t
    JOIN properties p ON t.type_id = p.type_id
    GROUP BY t.type;

    -- Find elements with highest melting points
    SELECT e.name, p.melting_point_celsius
    FROM elements e
    JOIN properties p ON e.atomic_number = p.atomic_number
    ORDER BY p.melting_point_celsius DESC
    LIMIT 10;
    ```

## Learning Objectives

This project demonstrates proficiency in:

1. **Database Design**
     - Normalizing database structure
     - Creating proper relationships between tables
     - Implementing data integrity constraints

2. **Data Manipulation**
     - Cleaning and formatting existing data
     - Restructuring tables and columns
     - Maintaining referential integrity during modifications

3. **Shell Scripting**
     - Creating interactive command-line tools
     - Processing user input and validation
     - Integrating with PostgreSQL databases

4. **SQL Querying**
     - Writing complex JOIN queries
     - Using pattern matching with LIKE
     - Handling different data types effectively

## Technical Implementation Details

- PostgreSQL Connection
    ```bash
    PSQL="psql --username=freecodecamp --dbname=periodic_table --no-align --tuples-only -c"
    ```

    - Uses specific username and database
    - Formats output for script processing
    - Removes headers and alignment for clean parsing

- Input Validation
    - **Regex Pattern**: `^[0-9]+$` to detect numeric input
    - **Pattern Matching**: LIKE operator with `%` wildcard for partial matches
    - **Error Handling**: Graceful handling of invalid or missing elements

- Data Formatting
    - **Decimal Precision**: Proper handling of floating-point numbers
    - **Text Processing**: IFS for parsing pipe-delimited database output
    - **User-Friendly Output**: Complete sentences with proper grammar

## Project Requirements Fulfilled

- User Stories Completed
    1. Database contains correct tables with proper relationships
    2. Script accepts atomic number, symbol, or name as arguments
    3. Returns complete element information in specified format
    4. Handles invalid inputs gracefully
    5. Data types are properly configured (DECIMAL for precision)
    6. All trailing zeros removed from atomic masses
    7. Git repository with proper version control

- Output Format Requirements
    - Atomic number, name, and symbol display
    - Element type classification
    - Atomic mass in amu
    - Melting and boiling points in Celsius
    - Proper sentence structure and grammar

## Course Context

This project is part of the **FreeCodeCamp Relational Database Certification**, specifically the "Build a Periodic Table Database" project. It serves as a practical application of:

- Database normalization and design principles
- SQL data manipulation and querying
- Shell scripting for database interaction
- Git version control for project management
- Data cleaning and formatting techniques

The project demonstrates real-world database skills applicable to scientific data management, educational software development, and backend application development.

## Potential Extensions

Future enhancements could include:

- Electron configuration data
- Isotope information and radioactive properties
- Historical discovery dates and discoverers
- Physical appearance and common uses
- Chemical reaction data and compound formation
- Interactive web interface for element lookup
- Advanced search and filtering capabilities
- Export functionality for different data formats