# Task Manager Backend

This is the backend for the Task Manager application, built using Node.js, Express, and MongoDB. It provides a RESTful API for managing tasks and users.

## Table of Contents

## API Endpoints

User Routes

POST /users/register - Register a new user
POST /users/login - Log in a user
GET /users/profile - Get the profile of the logged-in user
POST /users/logout - Log out the user

Task Routes

POST /tasks - Create a new task
GET /tasks - Get all tasks
GET /tasks/:id - Get a task by ID
PATCH /tasks/:id - Update a task by ID
DELETE /tasks/:id - Delete a task by ID

## Environment Variables

MONGO_URL_LOCAL - Local MongoDB connection string
MONGO_URL_REMOTE - Remote MongoDB connection string
PORT - Port on which the application runs
JWT_SECRET - Secret key for JWT

## Scripts

npm start - Start the application
npm run dev - Start the application in development mode with nodemon
npm run start-pm2 - Start the application with PM2 in production mode
npm run restart-pm2 - Restart the application with PM2

## Dependencies

bcryptjs
cors
dotenv
express
jsonwebtoken
mongodb
mongoose
nodemon
pm2
Dev Dependencies
cross-env

## Run The Application

# Start the application in development mode:

npm run dev

# Start the application in production mode:

npm run start-pm2

# Restart the application with PM2:

npm run restart-pm2

## Installation

1. Clone the repository:

```sh
git clone git@github.com:Shyamthagle/task-manager-backend.git

```

## Project Vedio Link

https://drive.google.com/file/d/1akIMinSITycCJL3CM6RlR50zqXlc2kRG/view?usp=drive_link
