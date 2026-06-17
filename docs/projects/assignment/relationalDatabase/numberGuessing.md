# Number Guessing Game Database Project

This project is part of the **FreeCodeCamp Relational Database Certification** course. It demonstrates the creation and manipulation of a PostgreSQL database for a number guessing game that tracks user statistics and game history.

## Project Overview

The Number Guessing Game Database project involves:

- Creating a PostgreSQL database to store user data and game statistics
- Implementing a bash script for an interactive number guessing game
- Managing user authentication and game history tracking
- Writing SQL queries to retrieve user statistics and performance data

## Database Schema

The database consists of two main tables with a one-to-many relationship:

!!! abstract "Database Schema"
    === "Users Table"
        ```sql
        CREATE TABLE public.users (
            user_id integer NOT NULL,
            username character varying(22) NOT NULL
        );
        ```

        - **user_id**: Primary key, auto-incrementing integer
        - **username**: Unique username (max 22 characters)

    === "Games Table"
        ```sql
        CREATE TABLE public.games (
            game_id integer NOT NULL,
            number_guesses integer NOT NULL,
            user_id integer
        );
        ```

        - **game_id**: Primary key, auto-incrementing integer
        - **number_guesses**: Number of guesses taken to complete the game
        - **user_id**: Foreign key referencing users.user_id

Relationships

- `games.user_id` → `users.user_id` (One-to-Many: One user can have multiple games)

Constraints

- **Primary Keys**: Both tables have auto-incrementing primary keys
- **Foreign Key**: Games table references users table
- **Unique Constraint**: Username must be unique
- **Not Null**: All essential fields are required

## Project Structure

```
fcc-rdb-numberguessdb/
├── number_guess.sh     # Main game script
├── number_guess.sql    # Database schema file
└── README.md           # Project documentation
```

## Setup Instructions

- Prerequisites
    - PostgreSQL installed and running
    - Bash shell environment
    - FreeCodeCamp user with database privileges

- Database Setup
    1. Create the database:
    ```bash
    createdb number_guessdb
    ```

    2. Import the schema:
    ```bash
    psql -d number_guessdb -f number_guess.sql
    ```

- Running the Game
    Execute the game script:
    ```bash
    ./number_guess.sh
    ```

## Game Mechanics

- Core Gameplay
    - **Objective**: Guess a randomly generated number between 1 and 1000
    - **Feedback System**: Receives "higher" or "lower" hints after each guess
    - **Win Condition**: Game ends when the correct number is guessed
    - **Tracking**: All games are recorded with guess count and user association

- User Experience Flow
    1. **Username Input**: Player enters their username
    2. **User Recognition**: 
        - New users receive a welcome message
        - Returning users see their game statistics
    3. **Game Start**: Random number (1-1000) is generated
    4. **Guessing Loop**: Player makes guesses with directional feedback
    5. **Game End**: Victory message with guess count
    6. **Data Recording**: Game statistics saved to database

## Script Analysis

number_guess.sh Features

!!! abstract ""
    === "Database Connection"
        ```bash
        PSQL="psql --username=freecodecamp --dbname=number_guessdb --no-align --tuples-only -c"
        ```

        - Establishes connection parameters for PostgreSQL
        - Uses tuples-only mode for clean data retrieval

    === "User Management System"
        ```bash
        USER_CHECK=$($PSQL "SELECT username FROM users WHERE username='$USERNAME'")
        if [[ -z $USER_CHECK ]]
        then
            REG_USER=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME')")
            echo "Welcome, $USERNAME! It looks like this is your first time here."
        else
            GAME_PLAYED=$($PSQL "SELECT COUNT(*) FROM users INNER JOIN games USING(user_id) WHERE username='$USERNAME'")
            BEST_GAME=$($PSQL "SELECT MIN(number_guesses) FROM users INNER JOIN games USING(user_id) WHERE username='$USERNAME'")
            echo "Welcome back, $USERNAME! You have played $GAME_PLAYED games, and your best game took $BEST_GAME guesses."
        fi
        ```

        - **Key Logic:**

        - Checks if username exists in database
        - Creates new user if not found
        - Retrieves game statistics for returning users
        - Displays personalized welcome messages

    === "Random Number Generation"
        ```bash
        RANUM=$(( 1 + $RANDOM % 1000))
        ```

        - Generates random number between 1 and 1000
        - Uses bash's built-in `$RANDOM` variable

    === "Input Validation and Game Loop"
        ```bash
        while read NUM
        do
            if [[ ! $NUM =~ ^[0-9]+$ ]]
            then
                echo -e "That is not an integer, guess again:"
            else
                if [[ $NUM -eq $RANUM ]]
                then
                    break;
                elif [[ $NUM -gt $RANUM ]]
                then
                    echo -e "It's lower than that, guess again:"
                else
                    echo -e "It's higher than that, guess again:"
                fi
            fi
            GUESS=$(($GUESS + 1))
        done
        ```

        - **Validation Features:**

        - Regular expression validation for integer input
        - Comparative logic for directional hints
        - Guess counter increment
        - Loop termination on correct guess

    === "Game Recording"
        ```bash
        USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAME'")
        INSERT_GAME=$($PSQL "INSERT INTO games(number_guesses, user_id) VALUES($GUESS, $USER_ID)")
        ```

        - Retrieves user ID for foreign key relationship
        - Records game result in games table

## Database Queries and Statistics

- User Statistics Queries

=== "Games Played Count"
    ```sql
    SELECT COUNT(*) FROM users 
    INNER JOIN games USING(user_id) 
    WHERE username='$USERNAME';
    ```

=== "Best Game Performance"
    ```sql
    SELECT MIN(number_guesses) FROM users 
    INNER JOIN games USING(user_id) 
    WHERE username='$USERNAME';
    ```

=== "All User Games History"
    ```sql
    SELECT game_id, number_guesses FROM users 
    INNER JOIN games USING(user_id) 
    WHERE username='$USERNAME' 
    ORDER BY game_id;
    ```

- Administrative Queries

=== "Top Performers"
    ```sql
    SELECT username, MIN(number_guesses) as best_score 
    FROM users 
    INNER JOIN games USING(user_id) 
    GROUP BY username 
    ORDER BY best_score LIMIT 10;
    ```

=== "Game Statistics"
    ```sql
    SELECT 
        COUNT(*) as total_games,
        AVG(number_guesses) as avg_guesses,
        MIN(number_guesses) as best_game,
        MAX(number_guesses) as worst_game
    FROM games;
    ```

## Sample Data Analysis

Based on the provided database dump, the system contains:

- **Users**: 9 registered players
- **Games**: 29 completed games
- **Performance Range**: 7-1002 guesses per game
- **User Patterns**: Mix of automated test users and real players

Notable Statistics

- **Best Performance**: 7 guesses (user_id: 6)
- **Most Active**: Users with multiple game sessions
- **Efficiency Range**: Demonstrates wide variation in guessing strategies

## Learning Objectives

This project demonstrates proficiency in:

1. Database Design
    - Creating normalized table structures
    - Implementing one-to-many relationships
    - Setting up auto-incrementing primary keys
    - Managing foreign key constraints

2. Bash Scripting
    - Interactive user input handling
    - Regular expression validation
    - Conditional logic and loops
    - Random number generation
    - String manipulation and formatting

3. SQL Operations
    - User authentication queries
    - Statistical aggregate functions (COUNT, MIN)
    - JOIN operations for related data
    - INSERT operations for data recording
    - Parameterized queries for security

4. Game Development Concepts
    - User session management
    - Game state tracking
    - Performance metrics
    - Data persistence

## Key Technical Concepts

- Database Integration
    - **PSQL Command Line**: Direct database interaction from bash
    - **Query Result Processing**: Handling database responses in shell variables
    - **Transaction Management**: Ensuring data consistency

- Input Validation
    - **Type Checking**: Numeric input validation using regex
    - **Error Handling**: Graceful handling of invalid inputs
    - **User Experience**: Clear feedback for incorrect inputs

- Game Logic
    - **State Management**: Tracking game progress and statistics
    - **Algorithmic Thinking**: Efficient number guessing feedback system
    - **Performance Tracking**: Recording and analyzing game metrics

## Potential Extensions

Future enhancements could include:

- **Difficulty Levels**: Different number ranges or limited guesses
- **Multiplayer Features**: Competitive modes or leaderboards  
- **Enhanced Statistics**: Win streaks, average performance trends
- **Game Modes**: Timed challenges or pattern-based games
- **User Profiles**: Extended user information and preferences
- **Data Export**: CSV or JSON export of game statistics
- **Web Interface**: Browser-based version of the game

## Technical Improvements

- Code Optimizations
    - **Error Handling**: More robust database connection error management
    - **Security**: Input sanitization for SQL injection prevention
    - **Performance**: Query optimization for large datasets
    - **Logging**: Game session logging for debugging

- Feature Additions
    - **Game Categories**: Different types of number games
    - **Hints System**: Optional hint system for beginners
    - **Achievement System**: Badges for various accomplishments
    - **Social Features**: Friend systems and challenges

## Course Context

This project is part of the **FreeCodeCamp Relational Database Certification**, specifically the "Build a Number Guessing Game" project. It serves as a practical application of:

- Database Skills
    - PostgreSQL database creation and management
    - Table relationships and foreign keys
    - SQL query writing and optimization
    - Data integrity and constraints

- Programming Skills
    - Bash scripting and automation
    - User interface design in command line
    - Game logic implementation
    - Error handling and validation

- System Integration
    - Database-application integration
    - Command-line tool development
    - Data persistence and retrieval
    - User experience design

The project demonstrates real-world skills applicable to game development, user management systems, and database-driven applications.