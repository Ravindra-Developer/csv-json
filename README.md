# CSV-to-JSON Converter API

A simple and efficient API service that converts CSV files to JSON format and stores the data in a database.

## Features

- Convert CSV files to JSON format
- Store parsed data in database
- RESTful API endpoints
- Dockerized for easy deployment
- Age distribution analytics

## Prerequisites

- Docker Desktop installed and running
- Download from: https://www.docker.com/products/docker-desktop/

Verify Docker installation:
```bash
docker --version
```

## Getting Started

### 1. Setup and Installation

1. Clone this repository to your local machine
2. Navigate to the project root directory
3. Ensure Docker engine is running

### 2. Running the Application

Build and start the application using Docker Compose:

```bash
docker-compose up --build
```

You should see a log message: `Server running on http://localhost:3000`

### 3. Stopping the Application

To stop the application:

```bash
docker-compose down
```

Or press `Ctrl + C` in the terminal where the application is running.

## API Endpoints

The API provides three GET endpoints:

### 1. Health Check
- **URL:** `http://localhost:3000/`
- **Method:** GET
- **Response:** Returns "Hello from csv-to-json-api"

### 2. Get All Users
- **URL:** `http://localhost:3000/users`
- **Method:** GET
- **Response:** Returns a list of all users currently stored in the database

### 3. Parse CSV and Add to Database
- **URL:** `http://localhost:3000/users/parseCsvAndAddToDb`
- **Method:** GET
- **Description:** Main functionality - parses the CSV file and adds records to the database
- **Response:** Processes the CSV file and returns confirmation

## CSV File Requirements

### File Setup
1. Your CSV file must be named `input.csv`
2. Place the file in the `data/` folder
3. Replace the existing sample CSV with your own data

### Data Assumptions
- CSV file should not contain empty lines
- File must be properly formatted with consistent columns
- Headers should be present in the first row

## Important Notes

⚠️ **Data Persistence:** All records will be destroyed when the Docker container is stopped. This is a temporary storage solution.

📊 **Age Distribution:** The age distribution log displayed is based on the currently parsed CSV file, not all records in the database.

## Sample Usage

1. Start the application with `docker-compose up --build`
2. Verify the service is running: `GET http://localhost:3000/`
3. Add your CSV file to the `data/` folder as `input.csv`
4. Parse and store data: `GET http://localhost:3000/users/parseCsvAndAddToDb`
5. View stored users: `GET http://localhost:3000/users`

## Contact

For any questions or issues, please contact:
📧 ravindramaurya.developer@gmail.com
