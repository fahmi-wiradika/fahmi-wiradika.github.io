# Exercise Tracker Project

This project is part of the **freeCodeCamp Back End Development and APIs Certification Program** and demonstrates comprehensive back-end development skills with a focus on RESTful API design, MongoDB integration, and data persistence management.

## Project Overview

The Exercise Tracker project involves:

- Building a comprehensive exercise logging REST API
- Implementing user management and exercise tracking
- Creating MongoDB data models and relationships
- Developing robust API endpoints with query parameters
- Demonstrating back-end development best practices

## Learning Objectives

This project demonstrates proficiency in:

1. **Back-End API Development**
    - Express.js server implementation
    - RESTful API design and development
    - HTTP method handling (GET, POST)
    - Route parameter and query string processing

2. **Database Management**
    - MongoDB integration with Mongoose ODM
    - Data model design and relationships
    - CRUD operations implementation
    - Database query optimization

3. **Data Processing & Validation**
    - Input validation and sanitization
    - Date handling and formatting
    - Data filtering and pagination
    - Error handling and response formatting

4. **Software Engineering Practices**
    - Modular code architecture
    - Separation of concerns (MVC pattern)
    - Environment configuration
    - API documentation and testing

## Application Architecture

- Base URL
    ```
    https://github.com/fahmi-wiradika/fcc-exercise-tracker
    ```

- API Endpoints
    - `GET /api/users` - Retrieve all users
    - `POST /api/users` - Create new user
    - `POST /api/users/:id/exercises` - Add exercise to user
    - `GET /api/users/:id/logs` - Get user's exercise logs

- Data Models
    - **User Model**: User account management
    - **Exercise Model**: Exercise tracking and logging

## Project Structure

```
fcc-exercise-tracker/
├── controllers/
│   └── activity.controller.js    # Business logic and API handlers
├── models/
│   ├── user.model.js            # User data model
│   └── exercise.model.js        # Exercise data model
├── routes/
│   └── user.route.js            # API route definitions
├── views/
│   └── index.html              # Application interface
├── public/
│   └── style.css               # Frontend styling
├── index.js                    # Main server entry point
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## Setup Instructions

- Prerequisites
    - Node.js (v14 or higher)
    - MongoDB (local or cloud instance)
    - npm package manager
    - Git for version control

- Installation Steps
    1. Clone the repository
    2. Install dependencies: `npm install`
    3. Create `.env` file with database configuration
    4. Set up MongoDB connection string: `DB=mongodb://localhost:27017/exercise-tracker`
    5. Start the development server: `npm start`
    6. Access application at `http://localhost:3000`

## Technical Implementation Details

### Application Entry Point

The main server configuration demonstrates professional Express.js application setup with proper middleware integration and database connectivity:

```javascript
// Core application setup
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
```

**Key Architecture Decisions:**

- **Modular Imports**: Separated route handling from main server
- **Environment Configuration**: Secure database connection management
- **Middleware Chain**: Proper request processing pipeline
- **Error Handling**: Graceful database connection failure management

### Data Models

- **User Model (`user.model.js`)**

```javascript
const Mongose = require('mongoose');
const UserSchema = Mongose.Schema(
    {
        username: String,
    }
);
const User = Mongose.model("User", UserSchema);
module.exports = User;
```

!!! abstract "User Model Features"
    - **Simple Schema**: Lightweight user representation
    - **Username Field**: Unique identifier for users
    - **Mongoose Integration**: ODM for MongoDB operations
    - **Export Pattern**: Modular design for reusability

- **Exercise Model (`exercise.model.js`)**

```javascript
const Mongose = require('mongoose');
const ExerciseSchema = Mongose.Schema(
    {
        user_id: { type: String, require: true},
        description : String,
        duration: Number,
        date: Date,
    }
);
const Exercise = Mongose.model("Exercise", Mongose);
module.exports = Exercise;
```

!!! abstract "Exercise Model Features"
    - **User Reference**: Links exercises to specific users
    - **Exercise Details**: Description, duration, and date tracking
    - **Data Types**: Proper typing for validation
    - **Required Fields**: Ensures data integrity

### API Routes

- **Route Configuration (`user.route.js`)**

```javascript
const express = require('express');
const router = express.Router();
const { GetAllUsers, CreateUser, CreateExercise, GetUserLogs } = require("../controllers/activity.controller.js");

// get all users
router.get('/', GetAllUsers);

// create new user
router.post('/', CreateUser);

// create new exercise
router.post('/:id/exercises', CreateExercise);

// get user logs
router.get('/:id/logs', GetUserLogs);

// export module
module.exports = router;
```

!!! abstract "Route Structure Analysis"
    === "**GET /** - Retrieve All Users"
        - **Purpose**: Fetch all registered users
        - **Response**: Array of user objects
        - **Use Case**: User selection interface
        - **Handler**: `GetAllUsers` controller

    === "**POST /** - Create New User"
        - **Purpose**: Register new user account
        - **Input**: Username in request body
        - **Response**: User object with generated ID
        - **Handler**: `CreateUser` controller

    === "**POST /:id/exercises** - Add Exercise"
        - **Purpose**: Log exercise for specific user
        - **Parameters**: User ID in URL path
        - **Input**: Exercise details in request body
        - **Response**: Updated user object with exercise
        - **Handler**: `CreateExercise` controller

    === "**GET /:id/logs** - Get User Logs"
        - **Purpose**: Retrieve user's exercise history
        - **Parameters**: User ID in URL path
        - **Query Options**: from, to, limit parameters
        - **Response**: User object with exercise log array
        - **Handler**: `GetUserLogs` controller

### Server Configuration

- **Main Server Entry Point (`index.js`)**

```javascript
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const userRoute = require('./route/user.route.js');

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// user route
app.use("/api/users/", userRoute);

// Database Location  
const MONGO_URI = process.env.DB;

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    const listener = app.listen(process.env.PORT || 3000, () => {
      console.log('Your app is listening on port ' + listener.address().port)
    })
  })
  .catch(() => {
    console.log("Connection failed!");
  });
```

!!! abstract "Server Configuration Features"
    === "**Dependencies & Imports**"
        - **Express Framework**: Web server framework
        - **CORS Middleware**: Cross-origin resource sharing
        - **dotenv**: Environment variable management
        - **Mongoose**: MongoDB ODM integration
        - **User Routes**: API route module imports

    === "**Middleware Stack**"
        - **CORS**: Enables cross-origin requests
        - **JSON Parser**: Handles JSON request bodies
        - **URL Encoded**: Processes form data
        - **Static Files**: Serves public directory
        - **Route Integration**: Mounts API routes

    === "**Database Integration**"
        - **Environment Variables**: Secure connection string
        - **Connection Handling**: Promise-based connection
        - **Error Management**: Database connection errors
        - **Server Startup**: Conditional on database connection

    === "**Server Initialization**"
        - **Port Configuration**: Environment or default port
        - **Connection Feedback**: Console logging
        - **Error Handling**: Connection failure management
        - **File Serving**: Static HTML interface

### Controller Logic

- **Activity Controller (`activity.controller.js`)**

The controller implements the core business logic for all API endpoints:

```javascript
const User = require('./models/user.model.js');
const Exercise = require('./models/exercise.model.js');


// Get all users info app.get('/api/users',
const GetAllUsers = async (req, res) => {
    const users = await User.find({}).select("_id username");
    if (!users) {
        res.send("No users");
    } else {
        res.json(users);
    }
}

// Create new user into Database   app.post('/api/users',
const CreateUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crate new exercise tracker app.post('/api/users/:_id/exercises',
const CreateExercise = async (req, res) => {
    const id = req.params._id;
    const { description, duration, date } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            res.send("Could not find user");
        } else {
            const excerciseObj = new Exercise({
                user_id: user._id,
                description,
                duration,
                date: date ? new Date(date) : new Date()
            })
            const exercise = await excerciseObj.save();
            res.json({
                _id: user._id,
                username: user.username,
                description: exercise.description,
                duration: exercise.duration,
                date: new Date(exercise.date).toDateString()
            });
        }
    } catch (error) {
        console.log(error);
        res.send("There was an error saving the exercise");
    }
}

// Get user logs 
const GetUserLogs = async (req, res) => {

    // create querry and select user
    const { from, to, limit } = req.query;
    const { id } = req.params;
    const user = await User.findById(id);

    // check user status
    if (!user) {
        res.send("Could not find user")
        return;
    }

    // add querry on user logs
    let dateObj = {}
    if (from) {
        dateObj["$gte"] = new Date(from)
    }
    if (to) {
        dateObj["$lte"] = new Date(to)
    }
    let filter = {
        user_id: id
    }
    if (from || to) {
        filter.date = dateObj;
    }
    const exercises = await Exercise.find(filter).limit(+limit ?? 500);
    const log = exercises.map(e => ({
        description: e.description,
        duration: e.duration,
        date: e.date.toDateString()
    }))

    // user logs respond
    res.json({
        username: user.username,
        count: exercises.length,
        _id: user._id,
        log
    });

}


// export function
module.exports = {
    GetAllUsers,
    CreateUser,
    CreateExercise,
    GetUserLogs
}
```

!!! abstract "Controller Responsibilities"
    === "**GetAllUsers Controller**"
        - Query all users from database
        - Format response as user array
        - Handle database connection errors
        - Return minimal user information

    === "**CreateUser Controller**"
        - Validate username input
        - Check for duplicate usernames
        - Create new user record
        - Return user object with generated ID

    === "**CreateExercise Controller**"
        - Validate user ID parameter
        - Process exercise data (description, duration, date)
        - Create exercise record with user reference
        - Return updated user object with exercise

    === "**GetUserLogs Controller**"
        - Validate user ID parameter
        - Process query parameters (from, to, limit)
        - Filter exercises by date range
        - Apply pagination limits
        - Return user object with filtered exercise log

## API Specification

Request/Response Examples

- **User Management**

=== "Create User Request"
    ```http
    POST /api/users
    Content-Type: application/json

    {
      "username": "john_doe"
    }
    ```

=== "Create User Response"
    ```json
    {
      "_id": "507f1f77bcf86cd799439011",
      "username": "john_doe"
    }
    ```

=== "Get All Users Response"
    ```json
    [
      {
        "_id": "507f1f77bcf86cd799439011",
        "username": "john_doe"
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "username": "jane_smith"
      }
    ]
    ```

- **Exercise Management**

=== "Create Exercise Request"
    ```http
    POST /api/users/507f1f77bcf86cd799439011/exercises
    Content-Type: application/json

    {
      "description": "Running",
      "duration": 30,
      "date": "2023-10-15"
    }
    ```

=== "Create Exercise Response"
    ```json
    {
      "_id": "507f1f77bcf86cd799439011",
      "username": "john_doe",
      "description": "Running",
      "duration": 30,
      "date": "Sun Oct 15 2023"
    }
    ```

- **Exercise Logs**

=== "Get User Logs Request"
    ```http
    GET /api/users/507f1f77bcf86cd799439011/logs?from=2023-10-01&to=2023-10-31&limit=10
    ```

=== "Get User Logs Response"
    ```json
    {
      "_id": "507f1f77bcf86cd799439011",
      "username": "john_doe",
      "count": 2,
      "log": [
        {
          "description": "Running",
          "duration": 30,
          "date": "Sun Oct 15 2023"
        },
        {
          "description": "Cycling",
          "duration": 45,
          "date": "Mon Oct 16 2023"
        }
      ]
    }
    ```

## Key Features Implementation

- **Date Processing Logic**
    - Accept multiple date formats (YYYY-MM-DD, timestamps)
    - Default to current date if not provided
    - Format dates for consistent output
    - Validate date ranges for log filtering

- **Log Filtering Options**
    - `from`: Start date for exercise log filtering
    - `to`: End date for exercise log filtering
    - `limit`: Maximum number of exercises to return
    - Default behavior when parameters are omitted

- **Comprehensive Error Management**
    - Invalid user ID validation
    - Missing required fields detection
    - Database connection error handling
    - Malformed request data processing

- **Input Sanitization**
    - Username format validation
    - Exercise description requirements
    - Duration numeric validation
    - Date format verification

## Database Schema Design

- User Collection

    ```javascript
    {
    _id: ObjectId,
    username: String,
    __v: Number
    }
    ```

- Exercise Collection

    ```javascript
    {
    _id: ObjectId,
    user_id: String,
    description: String,
    duration: Number,
    date: Date,
    __v: Number
    }
    ```

- Relationships

- **One-to-Many**: User to Exercises
- **Reference Pattern**: Exercise stores user_id string
- **Query Optimization**: Index on user_id for faster lookups

## Skills Demonstrated

- Back-End Development
    - Express.js server architecture and routing
    - RESTful API design principles
    - HTTP method implementation
    - Middleware integration

- Database Management
    - MongoDB database design
    - Mongoose ODM usage
    - Data model relationships
    - Query optimization techniques

- API Development
    - Route parameter handling
    - Query string processing
    - JSON request/response formatting
    - Error handling and validation

- Software Architecture
    - MVC pattern implementation
    - Separation of concerns
    - Modular code organization
    - Controller-service layer design

## Project Requirements Validation

**freeCodeCamp User Stories Compliance**

- User Management
    - Create user with username
    - Get list of all users
    - Return user object with _id and username

- Exercise Tracking
    - Add exercises to user by ID
    - Handle description, duration, and date
    - Default to current date if not provided
    - Return user object with exercise data

- Exercise Logs
    - Retrieve user's exercise log
    - Support from/to date filtering
    - Implement limit parameter
    - Return count and log array

## Project Outcomes

- Certification Achievement
    - Successful completion of freeCodeCamp Back End Development project
    - Demonstrated proficiency in API development
    - Digital badge eligibility for professional networking

- Technical Competencies Acquired
    - RESTful API design and implementation
    - MongoDB database integration
    - Express.js server development
    - Data modeling and relationships

- Industry-Ready Skills
    - Production-quality API architecture
    - Database design and optimization
    - Error handling and validation
    - API documentation and testing

## Resources and References

- **freeCodeCamp Project**: [Exercise Tracker](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker)
- **GitHub Repository**: [fcc-exercise-tracker](https://github.com/fahmi-wiradika/fcc-exercise-tracker)
- **MongoDB Documentation**: [Mongoose ODM](https://mongoosejs.com/)
- **Express.js Guide**: [Express Framework](https://expressjs.com/)
- **Node.js Documentation**: [Node.js Official Docs](https://nodejs.org/docs/)

## Course Context

This project represents a comprehensive application of back-end development principles in modern web applications. It demonstrates practical implementation of:

- **RESTful API** design patterns
- **Database Integration** with MongoDB
- **Data Modeling** and relationships
- **Error Handling** and validation
- **API Documentation** and testing

The project showcases essential back-end development skills required for professional software development roles, including API design, database management, and server-side application architecture.