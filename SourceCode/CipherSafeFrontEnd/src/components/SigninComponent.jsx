import React, { useState, useEffect } from "react";
import NotAuthenticatedNavbarComponent from "./notauthticatedNavbarComponent";

function SignInComponent() {
  useEffect(() => {
    // Check if the user is already signed in
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      window.location.href = "/home"; // Redirect to home page if signed in
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function signInUser() {
    try {
      const response = await fetch("http://CHANGE_THIS_TO_THE_IP_ADDRESS_OF_THE_MACHINE_THAT_IS_RUNNING_THE_API/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      // console.log("User Logged in successfully!", responseData);

      
      localStorage.setItem("accessToken", responseData.access_token);

      
      window.location.href = "/home"; // Redirect to another page if needed
    } catch (error) {
      console.error("There was a problem with the sign-in:", error.message);
      setError("Incorrect email or password. Please try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    signInUser();
  };

  return (
    <>
      <NotAuthenticatedNavbarComponent />
      <div className="container mt-5 py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Sign In</h2>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
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
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Sign In
                    </button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <div className="row">
                    <div className="col">
                      <p className="mb-0 fs-6">
                        Forgot Password? <a href="">Reset</a>
                      </p>
                      <a href="/forgot-password"></a>
                    </div>
                    <div className="col">
                      <p className="mb-0 ">
                        Don't have an account? <a href="/signup">Sign Up</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInComponent;
