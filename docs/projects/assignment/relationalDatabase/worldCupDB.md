# World Cup Database Project

This project is part of the **FreeCodeCamp Relational Database Certification** course. It demonstrates the creation and manipulation of a PostgreSQL database containing World Cup tournament data from 2014 and 2018.

## Project Overview

The World Cup Database project involves:

- Creating a PostgreSQL database to store World Cup tournament data
- Implementing database schema with proper relationships
- Importing data from CSV files using shell scripts
- Writing complex SQL queries to extract meaningful insights

## Database Schema

The database consists of two main tables:

!!! abstract "Database Schema"
    === "Teams Table"
        ```sql
        CREATE TABLE public.teams (
           team_id integer NOT NULL,
           name character varying(255) NOT NULL
        );
        ```
  
        - **team_id**: Primary key, auto-incrementing integer
        - **name**: Unique team name (e.g., 'France', 'Croatia')

    === "Games Table"
        ```sql
        CREATE TABLE public.games (
           game_id integer NOT NULL,
           winner_id integer NOT NULL,
           opponent_id integer NOT NULL,
           winner_goals integer NOT NULL,
           opponent_goals integer NOT NULL,
           year integer NOT NULL,
           round character varying(255) NOT NULL
        );
        ```
  
        - **game_id**: Primary key, auto-incrementing integer
        - **winner_id**: Foreign key referencing teams.team_id
        - **opponent_id**: Foreign key referencing teams.team_id
        - **winner_goals**: Number of goals scored by the winning team
        - **opponent_goals**: Number of goals scored by the opponent team
        - **year**: Tournament year (2014 or 2018)
        - **round**: Tournament round (Final, Semi-Final, Quarter-Final, etc.)
 
Relationships

- `games.winner_id` → `teams.team_id`
- `games.opponent_id` → `teams.team_id`

## Project Structure

```
fcc-rdb-worldcupdb/
├── insert_data.sh      # Script to populate the database
├── queries.sh          # Script with predefined queries
├── worldcup.sql        # Database dump file
├── games.csv           # Source data file
└── README.md           # This documentation
```

## Setup Instructions

- Prerequisites
   - PostgreSQL installed and running
   - Bash shell environment
   - CSV data file (games.csv)

- Database Setup

=== "Create the database"
      ```bash
      createdb worldcup
      ```

=== "Import the schema"
      ```bash
      psql -d worldcup -f worldcup.sql
      ```

- Data Import

=== "Run the data insertion script"
      ```bash
      ./insert_data.sh
      ```

      The script will:

      - Read data from `games.csv`
      - Insert unique team names into the teams table
      - Insert game records with proper foreign key relationships

## Scripts Description

- insert_data.sh

      This script processes the CSV file and populates the database:

      - **Key Features:**

      - Handles both test and production environments
      - Truncates existing data before insertion
      - Reads CSV line by line using IFS (Internal Field Separator)
      - Checks for existing teams before insertion
      - Maintains referential integrity

      - **Logic Flow:**

      1. Truncate both tables to start fresh
      2. For each CSV row:
         - Check if winner team exists, insert if not
         - Check if opponent team exists, insert if not
         - Insert game record with team IDs

    ??? abstract "insert_data.sh"
        ```bash
        #! /bin/bash
    
        if [[ $1 == "test" ]]
        then
        PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
        else
        PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
        fi
    
        # Do not change code above this line. Use the PSQL variable above to query your database.
    
        echo $($PSQL "TRUNCATE TABLE games, teams")
    
        cat games.csv | while IFS="," read YR RND WIN OPP W_GOAL O_GOAL 
        do
        # echo $YR, $RND, $WIN
    
        TEAMW=$($PSQL "SELECT team_id FROM teams WHERE name='$WIN'")
    
        if [[ $WIN != "winner" ]]
        then
           if [[ -z $TEAMW ]]
           then
              IN_W_ID=$($PSQL "INSERT INTO teams(name) VALUES('$WIN')")
              if [[ $IN_W_ID == "INSERT 0 1" ]]
              then
              echo Inserted into winner, $WIN
              fi
           fi
        fi
    
        TEAML=$($PSQL "SELECT team_id FROM teams WHERE name='$OPP'")
    
        if [[ $OPP != "opponent" ]]
        then
           if [[ -z $TEAML ]]
           then
              IN_O_ID=$($PSQL "INSERT INTO teams(name) VALUES('$OPP')")
              if [[ $IN_W_ID == "INSERT 0 1" ]]
              then
              echo Inserted into opponent, $OPP
              fi
           fi
        fi
    
        TEAM_ID_W=$($PSQL "SELECT team_id FROM teams WHERE name='$WIN'")
        TEAM_ID_L=$($PSQL "SELECT team_id FROM teams WHERE name='$OPP'")
    
        if [[ -n $EAM_ID_W || -n $TEAM_ID_L ]]
        then
           if [[ $YR != "year" ]]
           then
              IN_GAME=$($PSQL "INSERT INTO games(winner_id, opponent_id, winner_goals, opponent_goals, year, round) VALUES('$TEAM_ID_W','$TEAM_ID_L','$W_GOAL','$O_GOAL','$YR','$RND')")
              if [[ $IN_GAME == "INSERT 0 1" ]]
              then
              echo Insert game history, $YR
              fi
           fi
        fi
     
        done
        ```


- queries.sh

      Contains predefined queries demonstrating various SQL operations:

      - **Query Examples:**

      - Aggregate functions (SUM, AVG, COUNT, MAX)
      - JOIN operations between tables
      - Filtering with WHERE clauses
      - String pattern matching with LIKE
      - Data formatting and type casting



## queries.sh Tasks and SQL Execution

The `queries.sh` script contains 12 specific database queries required by the FreeCodeCamp assignment. Each query demonstrates different SQL concepts and returns specific tournament statistics.

- Execution Instructions
    Run the queries script:
    ```bash
    ./queries.sh
    ```

- Query Tasks and Expected Results

    !!! abstract ""
        === "1. Total Goals by Winning Teams"
            - **Task**: Calculate the sum of all goals scored by winning teams
            ```sql
            SELECT SUM(winner_goals) FROM games;
            ```
            - **Expected Output**: `68`
        
        === "2. Total Goals in All Games"
            - **Task**: Calculate the sum of all goals scored by both teams combined
            ```sql
            SELECT SUM(winner_goals + opponent_goals) FROM games;
            ```
            - **Expected Output**: `90`
        
        === "3. Average Goals by Winning Teams"
            - **Task**: Calculate the average number of goals scored by winning teams
            ```sql
            SELECT AVG(winner_goals) FROM games;
            ```
            - **Expected Output**: `2.1250000000000000`
        
        === "4. Average Goals by Winning Teams (Rounded)"
            - **Task**: Same as above but rounded to 2 decimal places
            ```sql
            SELECT AVG(winner_goals)::NUMERIC(10,2) FROM games;
            ```
            - **Expected Output**: `2.13`
        
        === "5. Average Goals in All Games"
            - **Task**: Calculate the average total goals per game from both teams
            ```sql
            SELECT AVG(winner_goals + opponent_goals) FROM games;
            ```
            - **Expected Output**: `2.8125000000000000`
        
        === "6. Highest Goals in Single Game"
            - **Task**: Find the maximum goals scored by one team in a single game
            ```sql
            SELECT MAX(winner_goals) FROM games;
            ```
            - **Expected Output**: `7`
        
        === "7. High-Scoring Games Count"
            - **Task**: Count games where the winning team scored more than 2 goals
            ```sql
            SELECT COUNT(*) FROM games WHERE winner_goals > 2;
            ```
            - **Expected Output**: `6`
        
        === "8. 2018 Tournament Winner"
            - **Task**: Get the name of the team that won the 2018 World Cup
            ```sql
            SELECT name FROM teams 
            INNER JOIN games ON teams.team_id = games.winner_id 
            WHERE round = 'Final' AND year = 2018;
            ```
            - **Expected Output**: `France`
        
        === "9. 2014 Eighth-Final Teams"
            - **Task**: List all teams that played in the 2014 Eighth-Final round
            ```sql
            SELECT name FROM teams 
            INNER JOIN games ON teams.team_id = games.winner_id 
               OR teams.team_id = games.opponent_id 
            WHERE round = 'Eighth-Final' AND year = 2014 
            ORDER BY name;
            ```
            - **Expected Output**: 
            ```
            Algeria
            Argentina
            Belgium
            Brazil
            Chile
            Colombia
            Costa Rica
            France
            Germany
            Greece
            Mexico
            Netherlands
            Nigeria
            Switzerland
            United States
            Uruguay
            ```
        
        === "10. All Winning Teams"
            - **Task**: List all unique team names that won at least one game
            ```sql
            SELECT DISTINCT(name) FROM teams 
            INNER JOIN games ON teams.team_id = games.winner_id 
            ORDER BY name;
            ```
            - **Expected Output**: All teams that appear as winners (16 teams)
        
        === "11. Tournament Champions"
            - **Task**: Show the year and team name of World Cup winners
            ```sql
            SELECT year, name FROM teams 
            INNER JOIN games ON teams.team_id = games.winner_id 
            WHERE round = 'Final' AND (year = 2018 OR year = 2014) 
            ORDER BY year;
            ```
            - **Expected Output**:
            ```
            2014|Germany
            2018|France
            ```
        
        === "12. Teams Starting with 'Co'"
            - **Task**: Find all teams whose names start with 'Co'
            ```sql
            SELECT name FROM teams WHERE name LIKE 'Co%';
            ```
            - **Expected Output**:
            ```
            Colombia
            Costa Rica
            ```

- SQL Concepts Demonstrated
      - Aggregate Functions
        - **SUM()**: Total calculations across multiple records
        - **AVG()**: Mean values with optional formatting
        - **COUNT()**: Record counting with conditions
        - **MAX()**: Finding maximum values

      - JOIN Operations
        - **INNER JOIN**: Combining related tables
        - **Multiple JOIN conditions**: Using OR for winner/opponent relationships
        - **Table aliases**: Simplifying complex queries

      - Data Filtering
        - **WHERE clauses**: Conditional filtering
        - **Comparison operators**: `>`, `=`, `OR`
        - **Pattern matching**: `LIKE` with wildcards

      - Data Formatting
        - **Type casting**: `::NUMERIC(10,2)` for decimal precision
        - **DISTINCT**: Removing duplicate results
        - **ORDER BY**: Sorting results alphabetically/numerically

      - Advanced Techniques
        - **Subqueries**: Implicit through JOIN operations
        - **Conditional logic**: Multiple WHERE conditions
        - **String operations**: Pattern matching with LIKE

- Testing Your Implementation

    To verify your queries work correctly:
    
    1. **Run the script**:
       ```bash
       ./queries.sh
       ```
    
       2. **Compare outputs**: Match your results with the expected outputs above
    
       3. **Debug common issues**:
          - Ensure database is properly populated
          - Check for typos in SQL syntax
          - Verify table relationships are correct

- Performance Notes

    - Queries use indexed columns (primary/foreign keys) for optimal performance
    - JOIN operations are efficient due to proper relationship design
    - DISTINCT operations may be slower on larger datasets

## Data Coverage

The database contains:

- **Years**: 2014 and 2018 World Cup tournaments
- **Teams**: 24 unique national teams
- **Games**: 32 tournament matches
- **Rounds**: Final, Third Place, Semi-Final, Quarter-Final, Eighth-Final

Teams Included

France, Croatia, Belgium, England, Russia, Sweden, Brazil, Uruguay, Colombia, Switzerland, Japan, Mexico, Denmark, Spain, Portugal, Argentina, Germany, Netherlands, Costa Rica, Chile, Nigeria, Algeria, Greece, United States

## Learning Objectives

This project demonstrates proficiency in:

1. **Database Design**
     - Creating normalized table structures
     - Implementing foreign key relationships
     - Setting up proper constraints

2. **Data Import/ETL**
     - Processing CSV files with shell scripts
     - Handling data validation and deduplication
     - Maintaining referential integrity during import

3. **SQL Querying**
     - Writing complex JOIN queries
     - Using aggregate functions
     - Implementing conditional logic
     - String manipulation and pattern matching

4. **Shell Scripting**
     - File processing and data manipulation
     - PostgreSQL integration
     - Environment-specific configurations

## Key Technical Concepts

- **Normalization**: Separating teams and games into related tables
- **Foreign Keys**: Ensuring data integrity across tables
- **PSQL Integration**: Using command-line PostgreSQL operations
- **CSV Processing**: Reading and parsing structured data files
- **Conditional Logic**: Implementing data validation in shell scripts

## Potential Extensions

Future enhancements could include:

- Additional tournament years
- Player statistics and lineups
- Match locations and venues
- Tournament bracket visualization
- Performance analytics and trends

## Course Context

This project is part of the **FreeCodeCamp Relational Database Certification**, specifically the "Build a World Cup Database" project. It serves as a practical application of database concepts including:

- Database creation and management
- Table relationships and foreign keys
- Data import and validation
- Complex SQL query writing
- Shell script automation

The project demonstrates real-world database skills applicable to sports analytics, data management, and backend development roles.