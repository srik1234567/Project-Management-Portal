# Project-Management-Portal

## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/srik1234567/Project-Management-Portal.git
cd Project
```

### 2. Install Dependencies

```bash
npm install
npm init -y
npm install express
npm install mongoose express
npm install cors
npm install bcrypt
npm install jsonwebtoken
```

### 3. Start the Server

```bash
npm start
node server.js
```

Server will run on:

```text
http://localhost:5000
```

### 4. Open Frontend

Open the HTML files in your browser:

```text
login.html
signup.html
dashboard.html
```

### 5. Database Setup

Ensure MongoDB is running locally:

```text
mongodb compass
mongodb://127.0.0.1:27017/todoDB
```

---

## Assumptions

* MongoDB compass is installed and running locally.
* Node.js and npm are installed.
* JWT is used for authentication.
* Each user can only access their own tasks.
* Task description must contain at least 20 characters.
* Tasks are sorted by creation date (newest first).
* Users must log in before accessing the dashboard.
* Frontend is implemented using HTML, CSS, and JavaScript.

---

## API Documentation

### Signup

**POST** `/signup`

Request:

```json
{
  "email": "pentelasrikanth52@gmail.com",
  "password": "Pen@1234"
}
```

Response:

```text
Signup success
```

---

### Login

**POST** `/login`

Request:

```json
{
  "email": "pentelasrikanth52@gmail.com",
  "password": "Pen@1234"
}
```

Response:

```json
{
  "token": "jwt_token"
}
```

---

### Add Task

**POST** `/addTask`

Headers:

```text
Authorization: <jwt_token>
```

Request:

```json
{
  "title": "Complete Assignment",
  "description": "Finish the full stack assignment before the deadline.",
  "deadline": "2026-06-25T18:00"
}
```

Response:

```json
{
  "_id": "...",
  "title": "...",
  "description": "...",
  "deadline": "...",
  "completed": false
}
```

---

### Get Tasks

**GET** `/tasks`

Headers:

```text
Authorization: <jwt_token>
```

Response:

```json
[
  {
    "_id": "...",
    "title": "Assignment",
    "description": "Complete the project documentation.",
    "completed": false,
    "createdAt": "2026-06-20T10:00:00Z"
  }
]
```

---

### Complete Task

**PUT** `/complete/:id`

Headers:

```text
Authorization: <jwt_token>
```

Response:

```text
Completed
```

---

### Delete Task

**DELETE** `/delete/:id`

Headers:

```text
Authorization: <jwt_token>
```

Response:

```text
Deleted
```

---

## Project Structure

```text
project-folder/
│
├── server.js
│
├── login.html
├── signup.html
├── dashboard.html
│
└── README.md
```

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

## Features

* User Registration
* User Login
* JWT Authentication
* Add Tasks
* Search Tasks
* Complete Tasks
* Delete Tasks
* Created Date Tracking
* Status Management
* Dark Mode Toggle
* Responsive Design
* Mobile Friendly Dashboard
* Loading Indicator
* Empty State Handling

