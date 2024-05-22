import { useState } from "react";

function ShortGeneratePasswordComponent() {
  const [passwordLength, setPasswordLength] = useState(8); // Initial password length
  const [includeCapital, setIncludeCapital] = useState(true);
  const [includeSmall, setIncludeSmall] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // Function to handle changes in password length
  const handlePasswordLengthChange = (e) => {
    const length = parseInt(e.target.value);
    setPasswordLength(length);
    generatePassword(length); // Update generated password when length changes
  };

  // Function to generate a random password
  // Function to generate a random password
  const generatePassword = (length) => {
    let charset = "";
    let password = "";

    // Check if at least one checkbox is selected
    if (includeCapital || includeSmall || includeNumbers || includeSymbols) {
      // Include characters based on selected criteria
      if (includeCapital) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (includeSmall) charset += "abcdefghijklmnopqrstuvwxyz";
      if (includeNumbers) charset += "0123456789";
      if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    } else {
      // If none of the checkboxes are selected, set charset to "none"
      setGeneratedPassword("select atleast one of the checkboxes and then use the slider to generate a new password");
      return;
    }

    // Generate random characters for the password
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    setGeneratedPassword(password); // Update generated password state
  };
  // Function to copy generated password to clipboard
// Function to copy generated password to clipboard
// Function to copy generated password to clipboard
const copyPasswordToClipboard = () => {
  // Check if the generated password is empty
  if (generatedPassword.trim() === "") {
    alert("No password generated to copy.");
    return;
  }

  // Get the generated password
  const passwordToCopy = generatedPassword;

  // Attempt to use the modern clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(passwordToCopy)
      .then(() => {
        // Show success message
        alert("Password copied to clipboard");
      })
      .catch((error) => {
        
        // If modern clipboard API fails, fall back to the traditional method
        fallbackCopyTextToClipboard(passwordToCopy);
      });
  } else {
    // If modern clipboard API is not available, fall back to the traditional method
    fallbackCopyTextToClipboard(passwordToCopy);
  }
};

// Fallback function for copying text to clipboard using traditional method
const fallbackCopyTextToClipboard = (text) => {
  // Create a temporary input element
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  document.body.appendChild(tempInput);

  // Select the text field
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  document.execCommand("copy");

  // Remove the temporary input element
  document.body.removeChild(tempInput);

  // Show success message
  alert("Password copied to clipboard");
};



  return (
    <>

    
 
    
    
      <div className="container">
      
        <div className="row align-items-center">
          
          <div className="col position-relative">
            <div
              className="card-text border border-dark rounded p-3 position-relative mw-100 d-flex align-items-center"
              style={{ fontSize: "1.25rem" }}
            >
              {/* <span className="flex-grow-1">{generatedPassword}</span> */}
              <span
                className="flex-grow-1"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {generatedPassword}
              </span>

              <button
                className="btn btn-outline-primary"
                onClick={copyPasswordToClipboard}
              >
                <i className="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <div className="container mt-3">
            <input
              type="range"
              
              className="form-range"
              min="8"
              max="100"
              step="1"
              value={passwordLength}
              onChange={handlePasswordLengthChange}
              id="passwordLengthRange"
            />
            <label htmlFor="passwordLengthRange" className="form-label">
              Password Length: {passwordLength}
            </label>

            {/* Checkboxes for password criteria */}
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="capitalLetters"
                checked={includeCapital}
                onChange={() => setIncludeCapital(!includeCapital)}
              />
              <label className="form-check-label" htmlFor="capitalLetters">
                Include Capital Letters
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="smallLetters"
                checked={includeSmall}
                onChange={() => setIncludeSmall(!includeSmall)}
              />
              <label className="form-check-label" htmlFor="smallLetters">
                Include Small Letters
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="numbers"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              <label className="form-check-label" htmlFor="numbers">
                Include Numbers
              </label>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="symbols"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
              />
              <label className="form-check-label" htmlFor="symbols">
                Include Symbols
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortGeneratePasswordComponent;
