import { useState, useEffect } from "react";
import GeneratePasswordComponent from "./GeneratePasswordComponent";
import ShortGeneratePasswordComponent from "./shortGeneratePasswordform";
function HomeComponent() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [accountname, setAccountName] = useState("");
  const [accountpassword, setAccountPassword] = useState("");

  const [updatemail, setupdateEmail] = useState("");
  const [updateaccountname, setupdateAccountName] = useState("");
  const [updateaccountpassword, setupdateAccountPassword] = useState("");

  const [accounts, setAccounts] = useState([]);
  const [ownerEmail, setownerEmail] = useState([]);
  const [showPasswords, setShowPasswords] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [decryptedPasswords, setDecryptedPasswords] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false); // State variable for modal visibility
  const [error, setError] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const loadData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        window.location.href = "/";
        return;
      }

      const isTokenExpired = async () => {
        const response = await fetch("http://CHANGE_THIS_TO_THE_IP_ADDRESS_OF_THE_MACHINE_THAT_IS_RUNNING_THE_API/validateToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenToDecode: accessToken }),
        });

        const decodedResponse = await response.json();
        //  Check if the response indicates that the token has expired
        if (response.ok) {
          console.log("Token is still valid.");
          setownerEmail(decodedResponse.sub);
          setUsername(decodedResponse.username);
          fetchUserAccounts(decodedResponse.sub); // Pass userEmail to fetchUserAccounts
          return false;
        } else {
          console.log("Token has expired.");
          return true;
          
        }
       
      };
      const fetchUserAccounts = async (owneremail) => {
        try {
          const response = await fetch(
            `http://CHANGE_THIS_TO_THE_IP_ADDRESS_OF_THE_MACHINE_THAT_IS_RUNNING_THE_API/get_accounts?email=${owneremail}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch accounts. Status: ${response.status}`
            );
          }

          const data = await response.json();
          setAccounts(data);
          setShowPasswords(Array(data.length).fill(false));
        } catch (error) {
          console.error("Error fetching accounts:", error);
          setError("Error fetching accounts. Please try again.");
        }
      };

      if (await isTokenExpired()) {
        localStorage.removeItem("accessToken");
        // localStorage.removeItem("userEmail");
        // localStorage.removeItem("username");
        window.location.href = "/";
        return;
      }
    };

    loadData();
  }, []); // Add an empty dependency array to execute once on component mount

  const fetchAccounts = async () => {
    try {
      const response = await fetch(
        `http://CHANGE_THIS_TO_THE_IP_ADDRESS_OF_THE_MACHINE_THAT_IS_RUNNING_THE_API/get_accounts?email=${ownerEmail}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch accounts. Status: ${response.status}`);
      }

      const data = await response.json();
      setAccounts(data);
      setShowPasswords(Array(data.length).fill(false));
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setError("Error fetching accounts. Please try again.");
    }
  };

  const saveAccount = async () => {
    try {
      const response = await fetch("http://CHANGE_THIS_TO_THE_IP_ADDRESS_OF_THE_MACHINE_THAT_IS_RUNNING_THE_API/saveaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          owner: ownerEmail,
          accountname: accountname,
          email: email,
          password: accountpassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save account. Status: ${response.status}`);
      }

      fetchAccounts();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error saving account:", error);
      setError("Failed to save account.");
    }
  };

  const deleteAccount = async (accountId) => {
    try {
      const response = await fetch(
        `http://CHANGE_THIS_TO_THE_IP_ADDRESS_OF_THE_MACHINE_THAT_IS_RUNNING_THE_API/delete_account/${accountId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete  account. Status: ${response.status}`
        );
      }
      // Refresh account list
      fetchAccounts();
    } catch (error) {
      console.error("Error updating account:", error);
      setError("Failed to delete  account.");
    }
  };
  const decryptAccountPassword = async (password, index) => {
    try {
      const response = await fetch("http://CHANGE_THIS_TO_THE_IP_ADDRESS_OF_THE_MACHINE_THAT_IS_RUNNING_THE_API/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }), // Send the password as an object
      });

      if (!response.ok) {
        throw new Error("Failed to decrypt password");
      }

      const data = await response.json();
      const decryptedPassword = data.decrypted_message;

      setDecryptedPasswords((prevState) => {
        const newState = [...prevState];
        newState[index] = decryptedPassword;
        return newState;
      });
    } catch (error) {
      console.error("Error decrypting account:", error);
      setError("Error decrypting account password");
    }
  };

  const handleShowPassword = async (password, index) => {
    // console.log("Before state update:", showPasswords);

    try {
      setShowPasswords((prevState) => {
        const newState = [...prevState];
        newState[index] = !prevState[index];
        return newState;
      });

      // console.log("After state update:", showPasswords);

      // Call decrypt function when showing password
      if (!showPasswords[index]) {
        await decryptAccountPassword(password, index);
      }
    } catch (error) {
      console.error("Failed to decrypt the password and show it to you", error);
      setError("Failed to decrypt the password and show it to you");
    }
  };

  const getDecryptedPassword = async (encryptedPassword) => {
    try {
      const response = await fetch("http://CHANGE_THIS_TO_THE_IP_ADDRESS_OF_THE_MACHINE_THAT_IS_RUNNING_THE_API/decrypt", {
        method: "POST", // Use POST method for sending data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: encryptedPassword }), // Pass the encrypted password to decrypt
      });

      if (!response.ok) {
        throw new Error("Failed to decrypt password");
      }

      const data = await response.json();
      return data.decrypted_message; // Return the decrypted password
    } catch (error) {
      console.error("Error decrypting password:", error);

      return ""; // Return empty string if decryption fails
    }
  };
  const saveUpdateAccount = async (
    accountId,
    accountName,
    accountPassword,
    accountEmail
    // Pass the decrypted password as a parameter
  ) => {
    try {
      let requestBody = {
        owner: ownerEmail,
        accountname:
          accountName !== "" ? accountName : selectedAccount.accountname,
        email: accountEmail !== "" ? accountEmail : selectedAccount.email,
        password:
          accountPassword !== ""
            ? accountPassword
            : await getDecryptedPassword(selectedAccount.password), // Await the decryption here
      };

      const response = await fetch(
        `http://CHANGE_THIS_TO_THE_IP_ADDRESS_OF_THE_MACHINE_THAT_IS_RUNNING_THE_API/update_account/${accountId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update account. Status: ${response.status}`);
      }

      // Refresh account list
      fetchAccounts();
      // Close the modal
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const updateAccount = async (accountId) => {
    try {
      const selected = accounts.find((acc) => acc.id === accountId);

      if (selected) {
        setSelectedAccount(selected);
        setShowUpdateModal(true);
      }

      // Refresh account list
      fetchAccounts();
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const signOutBtn = () => {
    // Remove the token from the local storage
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("userEmail");
    // localStorage.removeItem("username");

    // Navigate to the home page or any desired page
    window.location.href = "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any of the input fields is empty
    if (
      email.trim() === "" ||
      accountname.trim() === "" ||
      accountpassword.trim() === ""
    ) {
      setError("Please fill in all fields");
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      await saveAccount();
      await fetchAccounts();
      // Reset input states
      setEmail("");
      setAccountName("");
      setAccountPassword("");
      // Close the modal
      setShowAddModal(false); // Set modal visibility to false
    } catch (error) {
      console.error("Error handling submit:", error);
      setError("Failed to save account");
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-sm   mb-2">
        <div className="container">
          <a href="/home" className="navbar-brand d-flex align-items-center">
            <img
              src="/Imgs/pmkLogo2.png"
              alt="Logo"
              width="60"
              height="60"
              className="d-inline-block align-top me-2"
            />
            <span className="ms-2 brandName">CipherSafe</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link  rounded snbtn" onClick={signOutBtn}>
                  Signout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <!-- greeting div   --> */}

      <div className="container d-flex justify-content-center align-items-center">
        <h2>Welcome {username}</h2>
      </div>

      {/* <!-- Add password container that opens  the modal    --> */}
      <div className="mt-3 container  d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn btn-outline-primary"
          data-bs-toggle="collapse"
          data-bs-target="#addContainer"
        >
          <i className="fas fa-plus me-1 "></i> Add password
        </button>
      </div>

      {/* <!-- error alert in the page--> */}
      {error && (
        <div className="container">
          <div className=" mt-2 alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}

      {/* <!-- Add password  modal that opens when the add password button is pressed   --> */}
      <div className="container-fluid px-4  mt-3 collapse" id="addContainer">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="border rounded p-4 border-dark">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={accountname}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="form-control"
                    id="InputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter the account name (Example): Gmail"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="InputUsername"
                    placeholder="Enter Email or Username for the account"
                  />
                </div>
                <div className="mb-3 row align-items-center">
                  <div className="col">
                    <input
                      value={accountpassword}
                      onChange={(e) => setAccountPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="InputPassword1"
                      placeholder="Enter password or Generate one"
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#generateModal"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-toggle="collapse"
                    data-bs-target="#addContainer"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- the modal that opens when user clicks on the update   --> */}

      {showUpdateModal && selectedAccount && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          id="updateModal"
          tabIndex="-1"
          aria-labelledby="updateModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateModalLabel">
                  Update your {`'${selectedAccount.accountname}'`} account
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowUpdateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="updatedAccountName" className="form-label">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={updateaccountname}
                    onChange={(e) => setupdateAccountName(e.target.value)}
                    className="form-control"
                    id="updatedAccountName"
                    placeholder="Update the account name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="updatedEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    value={updatemail}
                    onChange={(e) => setupdateEmail(e.target.value)}
                    className="form-control"
                    id="updatedEmail"
                    placeholder="Update the email address or username"
                  />
                </div>
                <div className="mb-3 row align-items-center">
                  <div className="col">
                    <label htmlFor="updatedEmail" className="form-label">
                      Password
                    </label>

                    <input
                      value={updateaccountpassword}
                      onChange={(e) => setupdateAccountPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="updatedPassword"
                      placeholder="Update the password"
                    />
                  </div>
                </div>
                <label htmlFor="updatedEmail" className="form-label">
                  Generate Password
                </label>

                <ShortGeneratePasswordComponent />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    saveUpdateAccount(
                      selectedAccount.id,
                      updateaccountname,
                      updateaccountpassword,
                      updatemail
                    )
                  }
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <!-- password generator  --> */}
      <div
        className="modal fade"
        id="generateModal"
        tabIndex="-1"
        aria-labelledby="generateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="generateModalLabel">
                Generate a password{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ShortGeneratePasswordComponent />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The below code is for fetching user accounts saved and showing them. */}
      <div className="container mt-3 ">
        <div className="row">
          {accounts.map((account, index) => (
            <div className="col-md-6  p-4" key={index}>
              <div className="row align-items-center border border-dark rounded">
                <div className="col-md-4  mx-auto text-center ">
                  {[
                    "amazon",
                    "apple",
                    "apple-tv",
                    "disney",
                    "facebook",
                    "fedex",
                    "github",
                    "gmail",
                    "hulu",
                    "instagram",
                    "linkedin",
                    "mcdonalds",
                    "netflix",
                    "nike",
                    "office",
                    "outlook",
                    "snapchat",
                    "spotify",
                    "teams",
                    "tiktok",
                    "twitch",
                    "uber",
                    "x",
                    "youtube",
                  ].includes(
                    account.accountname.replace(/\s+/g, "").toLowerCase()
                  ) ? (
                    <img
                      src={`/Imgs/accountlogos/${account.accountname
                        .replace(/\s+/g, "")
                        .toLowerCase()}.svg`}
                      className="mt-3"
                      width={150}
                      height={140}
                      alt="..."
                    />
                  ) : (
                    <h2 className="mt-3 accountname fw-bold">
                      {account.accountname}
                    </h2>
                  )}
                </div>
                <div className="col border border-start  border-end-0 border-top-0 border-bottom-0 border-dark">
                  <div className="card border-0">
                    <div className="card-body">
                      <p className="card-text border rounded border-dark p-2 mb-3">
                        {account.email}
                      </p>
                      <p className="card-text border rounded border-dark p-2 mb-3">
                        {showPasswords[index] && decryptedPasswords[index]
                          ? decryptedPasswords[index]
                          : "***********"}
                      </p>
                      <div className="container d-flex justify-content-between">
                        <button
                          className="btn btn-outline-success p-1 "
                          onClick={() => updateAccount(account.id)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            handleShowPassword(account.password, index)
                          }
                        >
                          {showPasswords[index]
                            ? "Hide Password"
                            : "Show Password"}
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteAccount(account.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
