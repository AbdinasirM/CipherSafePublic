import uvicorn
from fastapi import FastAPI, HTTPException, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
import bcrypt
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session as SessionType
import logging
import base64
import jwt
from datetime import datetime, timedelta
import uuid
from cryptography.fernet import Fernet
from jwt.exceptions import ExpiredSignatureError

# Initialize logging
logging.basicConfig(level=logging.DEBUG)

# Load environment variables from .env file
load_dotenv()

# Define the declarative base
Base = declarative_base()

# Define the User model
class User(Base):
    __tablename__ = '520Users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)

# Define the Account model
class Account(Base):
    __tablename__ = '520accounts'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner = Column(String)
    accountname = Column(String)
    email = Column(String)
    password = Column(String)

# Establish a connection to the database
DATABASE_URL = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
engine = create_engine(DATABASE_URL)

# Create the tables
Base.metadata.create_all(engine)

# Create a session maker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
origins = [
    "*",  # Update with your client app origin like the ip address of the machine that you are hosting at
]

# Add CORS middleware to allow specified origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# Pydantic models
class UserSchema(BaseModel):
    name: str
    email: str
    password: str

class AccountSchema(BaseModel):
    owner: str
    accountname: str
    email: str
    password: str

class PasswordInput(BaseModel):
    password: str

class DecryptedData(BaseModel):
    decrypted_message: str

class Token(BaseModel):
    access_token: str
    token_type: str

# JWT settings
SECRET_KEY = os.getenv("J_SECRET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Function to create JWT token
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Function to generate an encryption key
def generate_key():
    return Fernet.generate_key()

# Access the environment variable for the encryption key 
encoded_key = os.getenv("BY_SECRET")
if encoded_key:
    theKey = base64.urlsafe_b64decode(encoded_key)

# Encrypt function
def encrypt(password: str):
    f = Fernet(theKey)
    encrypted_data = f.encrypt(password.encode())
    return encrypted_data

# Decrypt function
def decrypt(password: str):
    try:
        f = Fernet(theKey)
        decrypted_data = f.decrypt(password.encode())
        return decrypted_data.decode()
    except Exception as e:
        logging.error("An error occurred during decryption:", exc_info=True)
        raise HTTPException(status_code=500, detail="Decryption failed")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint for user registration
@app.post("/register")
async def register_user(user: UserSchema, response: Response, db: SessionType = Depends(get_db)):
    hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt())
    existing_user = db.query(User).filter_by(email=user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    db_user = User(name=user.name, email=user.email, password=base64.b64encode(hashed_password).decode())
    db.add(db_user)
    db.commit()
    token = create_access_token({"sub": user.email, "username": user.name})
    response.set_cookie(key="access_token", value=token, httponly=True, secure=True)
    # response.set_cookie(key="user_name", value=user.name, httponly=True, secure=True)
    return { "access_token": token}

    

# Endpoint for user login
@app.post("/login")
async def login(login_data: dict, response: Response, db: SessionType = Depends(get_db)):
    email = login_data.get("email")
    password = login_data.get("password")
    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    user = db.query(User).filter_by(email=email).first()
    if user:
        hashed_password = base64.b64decode(user.password)
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
            token = create_access_token({"sub": user.email, "username": user.name})
            response.set_cookie(key="access_token", value=token, httponly=True, secure=True)
            return { "access_token": token}
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password")
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")

# Endpoint to save account data to the accounts table
@app.post('/saveaccount')
async def save_account(account: AccountSchema, db: SessionType = Depends(get_db)):
    encrypted_password = encrypt(account.password)
    new_account = Account(
        owner=account.owner,
        accountname=account.accountname,
        email=account.email,
        password=encrypted_password.decode()
    )
    db.add(new_account)
    db.commit()
    return {
        "owner": account.owner,
        "accountname": account.accountname,
        "email": account.email,
    }

# Endpoint to get all accounts owned by a user (based on email)
@app.get('/get_accounts')
async def get_accounts(email: str, db: SessionType = Depends(get_db)):
    accounts = db.query(Account).filter_by(owner=email).all()
    if not accounts:
        return []
    return [{"id": str(account.id), "accountname": account.accountname, "email": account.email, "password": account.password} for account in accounts]

# Endpoint to update an account based on its ID
@app.put('/update_account/{account_id}')
async def update_account(account_id: uuid.UUID, updated_account: AccountSchema, db: SessionType = Depends(get_db)):
    account = db.query(Account).filter_by(id=account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    encrypted_updated_password = encrypt(updated_account.password)
    account.owner = updated_account.owner
    account.accountname = updated_account.accountname
    account.email = updated_account.email
    account.password = encrypted_updated_password.decode()
    db.commit()
    return {
        "id": str(account.id),
        "owner": account.owner,
        "accountname": account.accountname,
        "email": account.email,
        "password": account.password
    }

# Endpoint to delete an account based on its ID
@app.delete('/delete_account/{account_id}')
async def delete_account(account_id: uuid.UUID, db: SessionType = Depends(get_db)):
    account = db.query(Account).filter_by(id=account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    db.delete(account)
    db.commit()
    return {"message": "Account deleted successfully"}

# Endpoint to decrypt an encrypted password
@app.post('/decrypt', response_model=DecryptedData)
async def decrypt_password(password_input: PasswordInput):
    decrypted_password = decrypt(password_input.password)
    return {"decrypted_message": decrypted_password}

# Retrieve the secret key from the environment variable

# Define a Pydantic model for the request body
class TokenRequest(BaseModel):
    tokenToDecode: str

@app.post('/validateToken')
async def decode_token(request: TokenRequest):
    tokenToDecode = request.tokenToDecode
    
    # Ensure the SECRET_KEY is a string
    if not isinstance(SECRET_KEY, str):
        raise TypeError("Expected a string value for the secret key")
    
    try:
        decoded_token = jwt.decode(tokenToDecode, SECRET_KEY, algorithms=["HS256"])
        return decoded_token
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Error: The token has expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=400, detail=f"Error: Invalid token - {e}")


# Run the FastAPI app
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
