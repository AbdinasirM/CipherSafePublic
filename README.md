# CipherSafe Project

## Overview

CipherSafe is a password management service designed to help users securely store and manage their online identities. The project consists of a backend API built with FastAPI and a frontend application that provides an intuitive user interface for interacting with the service.

## Project Structure

### Backend
The backend of the project is responsible for handling user authentication, account management, and encryption/decryption of passwords. It is built with FastAPI and uses PostgreSQL for data storage. The key files and dependencies are:

- **Api.py**: The main FastAPI application file containing all the API endpoints and business logic.
- **.env**: A configuration file that stores environment variables such as database credentials and the JWT secret key.
- **requirements.txt**: A file listing all the Python dependencies required to run the backend application.

### Frontend
The frontend of the project provides a user-friendly interface for interacting with the CipherSafe service. It is built using modern web technologies and frameworks. To run the frontend application, navigate inside the frontend folder and execute the following commands:

1. `npm install`: Install all the required dependencies.
2. `npm run dev -- --host`: Start the development server.

## Running the Project

### Backend Setup
1. **Set Up Environment Variables**: Create a `.env` file in the backend directory with the following content:
    ```env
    DB_USER=your_database_username
    DB_PASSWORD=your_database_password
    DB_HOST=your_database_host
    DB_PORT=your_database_port
    DB_NAME=your_database_name
    J_SECRET=your_jwt_secret_key
    BY_SECRET=your_base64_encoded_fernet_key
    ```

2. **Install Dependencies**: Run the following command to install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

3. **Run the Backend Server**: Start the FastAPI server by running:
    ```sh
    uvicorn Api:app --reload --host 0.0.0.0
    ```

### Frontend Setup
1. **Navigate to the Frontend Directory**: Open a terminal and navigate to the frontend directory.

2. **Install Dependencies**: Install all the required Node.js packages by running:
    ```sh
    npm install
    ```

3. **Run the Development Server**: Start the frontend development server with:
    ```sh
    npm run dev -- --host
    ```

## Backend API Endpoints

### User Authentication
- **Register User**: `POST /register`
- **Login User**: `POST /login`

### Account Management
- **Save Account**: `POST /saveaccount`
- **Get Accounts**: `GET /get_accounts?email=user_email`
- **Update Account**: `PUT /update_account/{account_id}`
- **Delete Account**: `DELETE /delete_account/{account_id}`

### Encryption/Decryption
- **Decrypt Password**: `POST /decrypt`

### Token Validation
- **Validate Token**: `POST /validateToken`

## Environment Variables

The `.env` file should contain the following environment variables:

- `DB_USER`: Your PostgreSQL database username.
- `DB_PASSWORD`: Your PostgreSQL database password.
- `DB_HOST`: The host address of your PostgreSQL database.
- `DB_PORT`: The port number of your PostgreSQL database.
- `DB_NAME`: The name of your PostgreSQL database.
- `J_SECRET`: The secret key used for signing JWT tokens.
- `BY_SECRET`: The base64 encoded key used for encryption and decryption of passwords.

## Conclusion

CipherSafe provides a secure and user-friendly way to manage your online accounts and passwords. By following the steps outlined above, you can set up and run both the backend and frontend parts of the application, providing a seamless password management experience.
