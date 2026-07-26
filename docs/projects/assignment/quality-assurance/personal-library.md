# Personal Library Project

This repository is part of the **freeCodeCamp Quality Assurance Certification Program** and implements the **Personal Library Project** with a RESTful API, MongoDB persistence, functional testing, and an improved frontend experience.

## Project Overview

The goal of this repository is to complete the **freeCodeCamp Personal Library Project** by building a small but complete book management application that follows the required API behavior and user stories.

The project demonstrates:

* Building a RESTful API for managing books
* Storing and retrieving books from MongoDB
* Adding comments to individual books
* Supporting delete operations for single books and the full collection
* Passing all freeCodeCamp functional tests
* Improving the frontend into a more usable dashboard-style interface
* Deploying the live application on Vercel

## Learning Objectives

This project demonstrates proficiency in:

1. **Back-End API Development**

    * Express.js server implementation
    * RESTful API design and development
    * HTTP method handling (`GET`, `POST`, `DELETE`)
    * Route parameter handling and request validation

2. **Database Management**

    * MongoDB integration with Mongoose ODM
    * Book data model design
    * CRUD operations implementation
    * Data persistence and lookup by ID

3. **Quality Assurance & Testing**

    * Functional testing with Mocha and Chai
    * API response validation
    * Error handling and edge case coverage
    * Test-driven development practices

4. **Frontend Improvement**

    * Dashboard-style UI structure
    * Better user interaction flow
    * Loading, empty, success, and error states
    * Responsive layout for desktop and mobile

5. **Software Engineering Practices**

    * Modular code architecture
    * Separation of concerns
    * Documentation and maintainability
    * Deployment readiness

## Application Architecture

* GitHub Repository

    [Book Tracker](https://github.com/fahmi-wiradika/book-tracker.git)

* Live Application

    [Fahmi's Personal Library](https://fahmi-personal-library.vercel.app/)
  

* API Endpoints

    * `GET /api/books` - Retrieve all books
    * `POST /api/books` - Create a new book
    * `DELETE /api/books` - Delete all books
    * `GET /api/books/:id` - Retrieve one book by ID
    * `POST /api/books/:id` - Add a comment to a book
    * `DELETE /api/books/:id` - Delete one book by ID

* Data Model

    * **Book Model**: title and comments
    * **Comments**: stored as an array inside each book document

## Project Structure

```
book-tracker/
├── controllers/
│   └── Library.js          # Business logic for book operations
├── models/
│   └── books.js            # Mongoose book schema
├── routes/
│   └── api.js              # API route definitions
├── public/
│   ├── client.js           # Frontend behavior
│   └── style.css           # Frontend styling
├── views/
│   └── index.html          # Main application interface
├── tests/
│   └── 2_functional-tests.js # freeCodeCamp functional tests
├── server.js               # Express server configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Setup Instructions

* Prerequisites

    * Node.js
    * npm package manager
    * MongoDB
    * Git for version control

* Installation Steps

    1. Clone the repository
    2. Install dependencies: `npm install`
    3. Configure environment variables for MongoDB
    4. Start the development server: `npm start`
    5. Run tests: `npm test`
    6. Open the local app in your browser

## Testing Implementation

### Functional Tests (`2_functional-tests.js`)

The functional tests validate the API endpoints and complete request-response cycles required by freeCodeCamp.

* Test Output Summary

```bash
Functional Tests
  ✔ #example Test GET /api/books
  Routing tests
    POST /api/books with title => create book object/expect book object
      ✔ Test POST /api/books with title
      ✔ Test POST /api/books with no title given
    GET /api/books => array of books
      ✔ Test GET /api/books (115ms)
    GET /api/books/[id] => book object with [id]
      ✔ Test GET /api/books/[id] with id not in db
      ✔ Test GET /api/books/[id] with valid id in db
    POST /api/books/[id] => add comment/expect book object with id
      ✔ Test POST /api/books/[id] with comment
      ✔ Test POST /api/books/[id] without comment field
      ✔ Test POST /api/books/[id] with comment, id not in db
    DELETE /api/books/[id] => delete book object id
      ✔ Test DELETE /api/books/[id] with valid id in db
      ✔ Test DELETE /api/books/[id] with  id not in db

11 passing (276ms)
```

* What the tests confirm

    * Books can be created correctly
    * Missing title is handled properly
    * All books can be returned as an array
    * A single book can be fetched by ID
    * Comments can be added to a book
    * Invalid and missing data cases are handled
    * Books can be deleted by ID

## Frontend Improvement

The original FCC sample interface was functional, but minimal.
In the latest stage, the frontend has been improved to feel more like a real product.

### Main UI Improvements

* **Dashboard layout** with a clearer information hierarchy
* **Book cards** instead of a plain list-only experience
* **Book detail panel** for comments and actions
* **Modal-based forms** for adding books and comments
* **Search and sorting UI** for better browsing
* **Loading, empty, success, and error states**
* **Responsive layout** for desktop and mobile screens
* **Cleaner call-to-action placement** for easier use

### UX Focus

The frontend now aims to be:

* easier to scan
* easier to navigate
* more polished visually
* more consistent with a modern dashboard pattern
* aligned with the API behavior behind the app

## Deployment

This project is deployed on Vercel.

* **Deployment Platform**: Vercel
* **Live App**: [https://fahmi-personal-library.vercel.app/](https://fahmi-personal-library.vercel.app/)

## Technical Implementation Details

### Application Entry Point

The server configuration demonstrates a standard Express.js application setup with static file hosting, route mounting, and MongoDB connection handling.

### Data Model

* **Book Model (****`books.js`****)**

```javascript
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  comments: [String],
});

module.exports = mongoose.model("Book", bookSchema);
```

!!! abstract "Book Model Features"
    - **Title Field**: Stores the book title
    - **Comments Array**: Stores comments inside the book document
    - **Mongoose Integration**: Provides database operations
    - **Simple Schema**: Matches the FCC Personal Library requirements

### API Routes

* **Route Configuration (****`api.js`****)**

```javascript
const express = require("express");
const router = express.Router();
const library = require("../controllers/Library");

router.route("/books")
  .get(library.getBooks)
  .post(library.addBook)
  .delete(library.deleteAllBooks);

router.route("/books/:id")
  .get(library.getBookById)
  .post(library.addComment)
  .delete(library.deleteBookById);

module.exports = router;
```

!!! abstract "Route Structure Analysis"
    === "**GET /api/books**"
        - Retrieve all books
        - Return an array of book objects
        - Used for the main book list
    === "**POST /api/books**"
        - Create a new book
        - Accept a `title` field
        - Return the created book object
    === "**GET /api/books/:id**"
        - Retrieve one book by ID
        - Return the selected book object
        - Handle invalid or missing IDs
    === "**POST /api/books/:id**"
        - Add a new comment
        - Return the updated book object
        - Handle missing comment input
    === "**DELETE /api/books/:id**"
        - Delete one book by ID
        - Return success response
        - Handle invalid or missing IDs
    === "**DELETE /api/books**"
        - Delete all books
        - Used for collection cleanup
        - Helpful for testing and reset flows


### Controller Logic

The controller implements the main book operations used by the API.

* **Core responsibilities**

  * Create book records
  * Read book lists and single book records
  * Add comments to a book
  * Delete one book or all books
  * Return responses in the format required by freeCodeCamp

### API Specification

Request/Response Examples

* **Create Book**

=== "Create Book Request"
    ```http
    POST /api/books
    Content-Type: application/x-www-form-urlencoded
    title=The Hobbit
    ```
=== "Create Book Response"
    ```json
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Hobbit",
      "comments": []
    }
    ```

* **Get All Books**

=== "Get All Books Response"
    ```json     
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Hobbit",
      "comments": []
    }
    ```

* **Add Comment**

=== "Add Comment Request"
    ```http
    POST /api/books/507f1f77bcf86cd799439011
    Content-Type: application/x-www-form-urlencoded

    comment=Great read
    ```
=== "Add Comment Response"
    ```json
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Hobbit",
      "comments": ["Great read"]
    }
    ```

## Key Features Implementation

* **Book Management**

    * Add a new book by title
    * List all stored books
    * View one book by ID
    * Delete one book by ID
    * Delete all books

* **Comment Handling**

    * Add comments to a specific book
    * Store comments in an array
    * Return updated book data after each comment

* **Validation and Error Handling**

    * Reject missing book titles
    * Reject missing comment fields
    * Handle invalid book IDs
    * Return responses expected by the FCC tests

* **Frontend Behavior**

    * Show books in a cleaner layout
    * Display selected book details
    * Provide clear form feedback
    * Support responsive viewing on smaller screens

## Database Schema Design

* Book Collection

  ```javascript
  {
    _id: ObjectId,
    title: String,
    comments: [String],
    __v: Number
  }
  ```

* Relationships

    * **One document per book**
    * **Comments stored inside the same book document**
    * **Simple structure for fast lookup and testing**

## Skills Demonstrated

* Back-End Development

    * Express.js server setup
    * RESTful API design
    * Route and controller separation
    * Data persistence with MongoDB

* Quality Assurance

    * Functional API testing
    * Validation of success and failure cases
    * Matching project specifications exactly
    * Debugging test-driven behavior

* Frontend Development

    * UI restructuring
    * User flow improvement
    * Responsive design
    * State feedback for better usability

* Software Engineering

    * Modular project organization
    * Documentation-first structure
    * Deployment readiness
    * Maintainable implementation

## Project Requirements Validation

**freeCodeCamp Personal Library Compliance**

* Book Management

    * Create a book using `title`
    * Get all books
    * Get a book by ID
    * Delete a book by ID
    * Delete all books

* Comment Management

    * Add a comment to a book
    * Return updated book data
    * Support comment arrays
    * Handle missing comment input

* Testing Requirements

    * All required functional tests pass
    * API endpoints behave as expected
    * Missing and invalid input cases are covered
    * Output shape matches the FCC spec

## Project Outcomes

* Certification Achievement

    * Successful completion of the freeCodeCamp Personal Library Project
    * Demonstrated API and QA skills
    * Ready for portfolio and documentation use

* Technical Competencies Acquired

    * Express.js API development
    * MongoDB integration
    * Functional test validation
    * Frontend improvement on top of an API project

* Deployment Outcome

    * Live app available on Vercel
    * Public demo ready for review and sharing
    * Repository can be used as a reference implementation

## Resources and References

* **freeCodeCamp Project**: [Personal Library Project](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/personal-library)
* **GitHub Repository**: [book-tracker](https://github.com/fahmi-wiradika/book-tracker.git)
* **Live App**: [https://fahmi-personal-library.vercel.app/](https://fahmi-personal-library.vercel.app/)
* **Vercel**: [Deployment Platform](https://vercel.com/)

## Course Context

This project represents a practical implementation of the **freeCodeCamp Quality Assurance Personal Library Project**. It shows how to build an API-driven application, validate it with functional tests, improve the frontend experience, and deploy the result publicly.

The project demonstrates essential skills for quality assurance and full-stack development roles, including:

* API design and implementation
* MongoDB persistence
* Test-driven validation
* UI improvement
* Production deployment
