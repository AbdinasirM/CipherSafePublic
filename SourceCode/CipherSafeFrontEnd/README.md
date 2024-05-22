# CipherSafe Project

## Overview

CipherSafe is a password management service designed to securely store and manage online identities. The project includes a backend API developed with FastAPI and a frontend application offering an intuitive user interface for interacting with the service.

## Project Structure

### Backend
The backend manages user authentication, account operations, and password encryption/decryption. It's built with FastAPI and relies on PostgreSQL for data storage. Key files and dependencies include:

- **Api.py**: Main FastAPI application file containing API endpoints and business logic.
- **.env**: Configuration file storing environment variables like database credentials and JWT secret key.
- **requirements.txt**: File listing Python dependencies required for the backend.

### Frontend
The frontend provides a user-friendly interface. It's built using modern web technologies and frameworks. To run the frontend:

1. Install dependencies with `npm install`.
2. Update IP address in `homeComponent.jsx`, `SigninComponent.jsx`, `SignupComponent.js`.
3. Start the development server with `npm run dev -- --host`.

## Running the Project

### Backend Setup
1. **Set Up Environment Variables**: Create a `.env` file in the backend directory with:
    ```env
    DB_USER=your_database_username
    DB_PASSWORD=your_database_password
    DB_HOST=your_database_host
    DB_PORT=your_database_port
    DB_NAME=your_database_name
    J_SECRET=your_jwt_secret_key
    BY_SECRET=your_base64_encoded_fernet_key
    ```

2. **Install Dependencies**: Run `pip install -r requirements.txt`.

3. **Run the Backend Server**: Start the FastAPI server with:
    ```sh
    uvicorn Api:app --reload --host 0.0.0.0
    ```

### Frontend Setup
1. **Navigate to the Frontend Directory**.

2. **Install Dependencies**: Run `npm install`.

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

The `.env` file should contain:
- `DB_USER`: PostgreSQL database username.
- `DB_PASSWORD`: PostgreSQL database password.
- `DB_HOST`: PostgreSQL database host address.
- `DB_PORT`: PostgreSQL database port number.
- `DB_NAME`: PostgreSQL database name.
- `J_SECRET`: Secret key for signing JWT tokens.
- `BY_SECRET`: Base64 encoded key for encryption/decryption of passwords.

## Conclusion

CipherSafe offers a secure and user-friendly solution for managing online accounts and passwords. Follow the outlined steps to set up and run both backend and frontend components, ensuring a seamless password management experience.
