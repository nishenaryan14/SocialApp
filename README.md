# GoSocial

GoSocial is a social media application built using the MERN stack, featuring Material UI for the UI components and Mongoose for MongoDB object modeling. This README aims to guide you through setting up and running the application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

Node.js and npm
MongoDB

## Getting Started

### 1.Clone the repository to your local machine:

    git clone https://github.com/your-username/GoSocial.git

### 2.Navigate to the project directory:

    cd GoSocial

### 3.Install dependencies for both backend and frontend:

    cd api
    npm install
    cd ../client
    npm install

## Setting Up the Backend

### 1.In the api directory, create a .env file and specify the following environment variables:

    PORT=8800
    MONGODB_URI=your_mongodb_uri

### 2.Start the backend server:

    npm start

    This will run the backend server on http://localhost:8800.

## Setting Up the Frontend

### 1.In the client directory, create a .env file and specify the following environment variable:

    REACT_APP_API_URL=http://localhost:8800/api

### 2.Start the frontend server:

    npm start

    This will run the frontend server on http://localhost:3000.

## Accessing GoSocial

Once both the backend and frontend servers are running, you can access the GoSocial application by navigating to http://localhost:3000 in your web browser.

## Additional Information

The backend API routes are prefixed with /api. For example, the endpoint for user registration would be http://localhost:8800/api/auth/register.
Feel free to explore the codebase and customize the application to suit your needs.
