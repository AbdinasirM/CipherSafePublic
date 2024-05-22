import React, { useState } from "react";
import NotAuthenticatedNavbarComponent from "./notauthticatedNavbarComponent";

function SignupComponent() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  async function registerUser() {
    try {
      // Check if any of the input fields is empty
      if (email.trim() === "" || name.trim() === "" || password.trim() === "") {
        setError("Please fill in all fields");
        // Clear error message after 5 seconds
        setTimeout(() => {
          setError("");
        }, 5000);
        return; // Exit function early if fields are empty
      }
  
      // Retrieve access token from local storage
      const accessToken = localStorage.getItem("accessToken");
  
      if (accessToken) {
        // If access token is found, redirect to sign-in page
        window.location.href = "/home";
        return;
      }
  
      const response = await fetch("http://CHANGE_THIS_TO_THE_IP_ADDRESS_OF_THE_MACHINE_THAT_IS_RUNNING_THE_API/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        }),
      });
  
      if (!response.ok) {
        // If the response is not OK, throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // If the response is OK, parse it as JSON
      const responseData = await response.json();
      console.log("User Logged in successfully!", responseData);
  
      // Save access token to local storage
      localStorage.setItem("accessToken", responseData.access_token);

      // Redirect to another page if needed
      window.location.href = "/home";
    } catch (error) {
      console.error("There was a problem with the registration:", error.message);
      if (error.message === "HTTP error! Status: 400") {
        setError("User already registered");
      } else {
        setError(error.message);
      }
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
    // Handle form submission logic here
    // console.log("Form submitted:", { email, password });
  };



 
  

  return (
    <>
        <NotAuthenticatedNavbarComponent/>
        <div className="container mt-5 py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              {error && (
                  <div className="container">
                    <div className=" mt-2 alert alert-danger" role="alert">
                      {error}
                    </div>
                  </div>
                )}
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="InputEmail" className="form-label fs-5">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="InputName"
                    aria-describedby="emailHelp"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  
                </div>
                <div className="mb-3">
                  <label htmlFor="InputEmail" className="form-label fs-5">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="InputEmail"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                 
                </div>
                <div className="mb-3">
                  <label htmlFor="InputPassword" className="form-label fs-5">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="InputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="container text-center">
                  <button type="submit" className="btn btn-primary btn-block" >
                    Sign up
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p className="mb-0">Already a member? <a href="/signin">Sign In</a></p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  
  );
}


export default SignupComponent;
