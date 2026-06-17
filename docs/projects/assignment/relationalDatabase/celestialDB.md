# Celestial Bodies Database Project

This project is part of the **FreeCodeCamp Relational Database Certification** course. It demonstrates the creation and management of a PostgreSQL database containing information about celestial objects including galaxies, stars, planets, and moons.

## Project Overview

The Celestial Bodies Database project involves:

- Creating a comprehensive PostgreSQL database for astronomical data
- Implementing normalized database schema with proper relationships
- Storing information about galaxies, stars, planets, and moons
- Demonstrating advanced SQL concepts and database design principles

## Database Schema

The database consists of five main tables with hierarchical relationships:

!!! abstract "Database Schema"
    === "Galaxy Table"
        ```sql
        CREATE TABLE galaxy (
            galaxy_id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            galaxy_type VARCHAR(100),
            description TEXT,
            estimated_mass NUMERIC(15,2),
            has_supermassive_black_hole BOOLEAN NOT NULL,
            age_in_millions_of_years INT,
            distance_from_earth_in_light_years INT
        );
        ```

        - **galaxy_id**: Primary key, auto-incrementing integer
        - **name**: Unique galaxy name (e.g., 'Milky Way', 'Andromeda')
        - **galaxy_type**: Classification type (Spiral, Elliptical, etc.)
        - **description**: Detailed text description
        - **estimated_mass**: Mass in solar masses with precision
        - **has_supermassive_black_hole**: Boolean flag for central black hole
        - **age_in_millions_of_years**: Galaxy age estimation
        - **distance_from_earth_in_light_years**: Distance measurement

    === "Star Table"
        ```sql
        CREATE TABLE star (
            star_id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            galaxy_id INT NOT NULL REFERENCES galaxy(galaxy_id),
            mass_in_solar_masses NUMERIC(10,3),
            temperature_in_kelvin INT,
            luminosity_in_solar_units NUMERIC(8,3),
            radius_in_solar_radii NUMERIC(6,3),
            is_main_sequence BOOLEAN NOT NULL,
            has_planets BOOLEAN
        );
        ```

        - **star_id**: Primary key, auto-incrementing integer
        - **galaxy_id**: Foreign key referencing galaxy.galaxy_id
        - **mass_in_solar_masses**: Stellar mass relative to our Sun
        - **temperature_in_kelvin**: Surface temperature
        - **luminosity_in_solar_units**: Brightness relative to our Sun
        - **radius_in_solar_radii**: Size relative to our Sun
        - **is_main_sequence**: Boolean for stellar classification
        - **has_planets**: Boolean indicating planetary system

    === "Planet Table"
        ```sql
        CREATE TABLE planet (
            planet_id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            star_id INT NOT NULL REFERENCES star(star_id),
            mass_in_earth_masses NUMERIC(10,6),
            radius_in_earth_radii NUMERIC(8,6),
            orbital_period_in_days NUMERIC(12,3),
            distance_from_star_in_au NUMERIC(8,6),
            has_atmosphere BOOLEAN NOT NULL,
            is_dwarf_planet BOOLEAN NOT NULL,
            number_of_moons INT
        );
        ```

        - **planet_id**: Primary key, auto-incrementing integer
        - **star_id**: Foreign key referencing star.star_id
        - **mass_in_earth_masses**: Planetary mass relative to Earth
        - **radius_in_earth_radii**: Size relative to Earth
        - **orbital_period_in_days**: Time to orbit parent star
        - **distance_from_star_in_au**: Distance in Astronomical Units
        - **has_atmosphere**: Boolean for atmospheric presence
        - **is_dwarf_planet**: Boolean for classification
        - **number_of_moons**: Count of natural satellites

    === "Moon Table"
        ```sql
        CREATE TABLE moon (
            moon_id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            planet_id INT NOT NULL REFERENCES planet(planet_id),
            mass_in_earth_moon_masses NUMERIC(8,6),
            radius_in_kilometers NUMERIC(8,3),
            orbital_period_in_days NUMERIC(10,6),
            distance_from_planet_in_km INT,
            is_tidally_locked BOOLEAN NOT NULL,
            has_water_ice BOOLEAN
        );
        ```

        - **moon_id**: Primary key, auto-incrementing integer
        - **planet_id**: Foreign key referencing planet.planet_id
        - **mass_in_earth_moon_masses**: Mass relative to Earth's Moon
        - **radius_in_kilometers**: Physical radius
        - **orbital_period_in_days**: Time to orbit parent planet
        - **distance_from_planet_in_km**: Orbital distance
        - **is_tidally_locked**: Boolean for tidal locking status
        - **has_water_ice**: Boolean for water ice presence

    === "Galaxy Type Table"
        ```sql
        CREATE TABLE galaxy_type (
            galaxy_type_id SERIAL PRIMARY KEY,
            type_name VARCHAR(50) UNIQUE NOT NULL,
            description TEXT,
            typical_characteristics TEXT
        );
        ```

        - **galaxy_type_id**: Primary key, auto-incrementing integer
        - **type_name**: Galaxy classification name
        - **description**: Detailed description of type
        - **typical_characteristics**: Common features

Relationships

- `star.galaxy_id` → `galaxy.galaxy_id`
- `planet.star_id` → `star.star_id`
- `moon.planet_id` → `planet.planet_id`

## Project Structure

```
fcc-rdb-celestialdb/
├── universe.sql        # Database dump file
├── populate_data.sql   # Data insertion scripts
├── schema.md          # Database schema documentation
├── queries.md         # Example queries and usage
└── README.md          # Project documentation
```

## Setup Instructions

- Prerequisites
    - PostgreSQL installed and running
    - Command line access to PostgreSQL utilities
    - FreeCodeCamp development environment

- Database Setup

    === "**Start PostgreSQL Service**"
        ```bash
        sudo service postgresql start
        ```
    
    === "**Create and Connect to Database**"
        ```bash
        psql --username=freecodecamp --dbname=postgres
        ```
    
    === "**Create Universe Database**"
        ```sql
        CREATE DATABASE universe;
        \c universe
        ```
    
    === "**Load Database from SQL File**"
        ```bash
        psql --username=freecodecamp --dbname=universe < universe.sql
        ```

## Key Features and Requirements

1. Database Structure Requirements

     - **Database Creation**: Database named `universe`  
     - **Table Creation**: Tables named `galaxy`, `star`, `planet`, and `moon`  
     - **Primary Keys**: Auto-incrementing primary keys in all tables  
     - **Naming Convention**: Primary keys follow `table_name_id` format  
     - **Foreign Keys**: Proper foreign key relationships established  

2. Data Type Requirements

     - **VARCHAR Columns**: Name columns in all tables  
     - **INT Data Type**: Used for age, temperature, and distance fields  
     - **NUMERIC Data Type**: Used for mass, radius, and orbital data  
     - **TEXT Data Type**: Used for descriptions and characteristics  
     - **BOOLEAN Data Type**: Used for classification flags  

3. Relationship Requirements

     - **Star-Galaxy**: Each star references a galaxy  
     - **Planet-Star**: Each planet references a star  
     - **Moon-Planet**: Each moon references a planet  

4. Data Requirements

     - **Table Count**: Five tables total (including galaxy_type)  
     - **Column Count**: Minimum three columns per table  
     - **Galaxy/Star Columns**: Five+ columns each  
     - **Planet/Moon Columns**: Five+ columns each  
     - **Row Requirements**:
          
      - Galaxy table: 6+ rows
      - Star table: 6+ rows  
      - Planet table: 12+ rows
      - Moon table: 20+ rows

5. Constraint Requirements

     - **NOT NULL**: Multiple NOT NULL constraints per table  
     - **UNIQUE**: Unique constraints on name columns  

## Usage Examples and Queries

- Basic Data Retrieval

    === "View All Galaxies"
        ```sql
        SELECT * FROM galaxy ORDER BY name;
        ```
    
    === "Count Objects by Type"
        ```sql
        SELECT 
            'Galaxies' as object_type, COUNT(*) as count FROM galaxy
        UNION ALL
        SELECT 'Stars', COUNT(*) FROM star
        UNION ALL  
        SELECT 'Planets', COUNT(*) FROM planet
        UNION ALL
        SELECT 'Moons', COUNT(*) FROM moon;
        ```

- Advanced Relationship Queries

    === "Stars in Specific Galaxy"
        ```sql
        SELECT s.name, s.mass_in_solar_masses, s.temperature_in_kelvin
        FROM star s
        JOIN galaxy g ON s.galaxy_id = g.galaxy_id
        WHERE g.name = 'Milky Way'
        ORDER BY s.mass_in_solar_masses DESC;
        ```
    
    === "Planets with Moons Count"
        ```sql
        SELECT 
            p.name AS planet_name,
            s.name AS star_name,
            COUNT(m.moon_id) AS moon_count
        FROM planet p
        JOIN star s ON p.star_id = s.star_id
        LEFT JOIN moon m ON p.planet_id = m.planet_id
        GROUP BY p.planet_id, p.name, s.name
        ORDER BY moon_count DESC;
        ```
    
    === "Potentially Habitable Worlds"
        ```sql
        SELECT 
            p.name AS planet_name,
            s.name AS star_name,
            g.name AS galaxy_name
        FROM planet p
        JOIN star s ON p.star_id = s.star_id
        JOIN galaxy g ON s.galaxy_id = g.galaxy_id
        WHERE p.has_atmosphere = true 
        AND p.distance_from_star_in_au BETWEEN 0.5 AND 2.0
        AND s.is_main_sequence = true;
        ```
    
    === "Moons with Water Ice"
        ```sql
        SELECT 
            m.name AS moon_name,
            p.name AS planet_name,
            s.name AS star_name
        FROM moon m
        JOIN planet p ON m.planet_id = p.planet_id
        JOIN star s ON p.star_id = s.star_id
        WHERE m.has_water_ice = true
        ORDER BY m.radius_in_kilometers DESC;
        ```

- Statistical Analysis Queries

    === "Average Planet Size by Star Type"
        ```sql
        SELECT 
            CASE 
                WHEN s.is_main_sequence THEN 'Main Sequence'
                ELSE 'Other'
            END AS star_type,
            AVG(p.radius_in_earth_radii) AS avg_planet_radius,
            COUNT(p.planet_id) AS planet_count
        FROM planet p
        JOIN star s ON p.star_id = s.star_id
        GROUP BY s.is_main_sequence;
        ```
    
    === "Galaxy Mass Distribution"
        ```sql
        SELECT 
            galaxy_type,
            AVG(estimated_mass) AS avg_mass,
            COUNT(*) AS galaxy_count
        FROM galaxy
        WHERE estimated_mass IS NOT NULL
        GROUP BY galaxy_type
        ORDER BY avg_mass DESC;
        ```

## Learning Objectives

This project demonstrates proficiency in:

1. **Database Design**
     - Creating normalized relational schemas
     - Implementing hierarchical relationships
     - Using appropriate data types for astronomical data
     - Setting up proper constraints and keys

2. **PostgreSQL Features**
     - SERIAL primary keys with auto-increment
     - NUMERIC data types for precision measurements
     - BOOLEAN flags for classification
     - TEXT fields for detailed descriptions
     - Foreign key relationships

3. **SQL Querying**
     - Complex multi-table JOINs
     - Aggregate functions and GROUP BY
     - Conditional logic with CASE statements
     - Subqueries and data filtering
     - Statistical analysis queries

4. **Data Modeling**
     - Astronomical object relationships
     - Scientific data representation
     - Hierarchical data structures
     - Constraint implementation

## Key Technical Concepts

- **Normalization**: Separating different celestial object types into related tables
- **Foreign Keys**: Maintaining referential integrity across the hierarchy
- **Data Types**: Using appropriate PostgreSQL types for scientific measurements
- **Constraints**: Implementing NOT NULL and UNIQUE constraints
- **Relationships**: One-to-many relationships throughout the hierarchy

## Data Coverage

The database contains:

- **Galaxies**: 6+ major galaxies including Milky Way, Andromeda
- **Stars**: 6+ stars including our Sun and notable stellar objects
- **Planets**: 12+ planets from our solar system and exoplanets
- **Moons**: 20+ natural satellites from various planetary systems
- **Galaxy Types**: Classification system for different galaxy morphologies


## Testing and Validation

- FreeCodeCamp Test Verification
    ```sql
    -- Check table structure
    \dt
    
    -- Verify row counts
    SELECT 
        'galaxy' as table_name, COUNT(*) as row_count FROM galaxy
    UNION ALL
    SELECT 'star', COUNT(*) FROM star
    UNION ALL
    SELECT 'planet', COUNT(*) FROM planet
    UNION ALL
    SELECT 'moon', COUNT(*) FROM moon
    UNION ALL
    SELECT 'galaxy_type', COUNT(*) FROM galaxy_type;
    
    -- Test relationships
    SELECT DISTINCT g.name
    FROM galaxy g
    JOIN star s ON g.galaxy_id = s.galaxy_id;
    
    SELECT DISTINCT s.name  
    FROM star s
    JOIN planet p ON s.star_id = p.star_id;
    
    SELECT DISTINCT p.name
    FROM planet p  
    JOIN moon m ON p.planet_id = m.planet_id;
    ```

- Data Export
    ```bash
    pg_dump -cC --inserts -U freecodecamp universe > universe.sql
    ```

## Potential Extensions

Future enhancements could include:

- Stellar evolution and lifecycle data
- Exoplanet discovery information
- Deep space object catalogs
- Asteroid and comet tracking
- Space mission and observation data
- Constellation and star pattern mapping

## Course Context

This project is part of the **FreeCodeCamp Relational Database Certification**, specifically the "Build a Celestial Bodies Database" project. It serves as a comprehensive application of database concepts including:

- Advanced database schema design
- Scientific data modeling
- Complex relationship implementation
- PostgreSQL-specific features
- Data integrity and validation
- Astronomical data representation

The project demonstrates real-world database skills applicable to scientific data management, research databases, and specialized domain modeling.