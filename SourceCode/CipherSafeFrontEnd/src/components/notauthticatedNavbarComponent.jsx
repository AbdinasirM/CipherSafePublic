import React from 'react';

function NotAuthenticatedNavbarComponent() {
    return (
        <nav className="navbar navbar-dark navbar-expand-sm mb-2">
            <div className="container">
                <a href="/" className="navbar-brand d-flex align-items-center">
                    <img src="/Imgs/pmkLogo2.png" alt="Logo" width="60" height="60" className="d-inline-block align-top me-2" />
                    <span className="ms-2 brandName">CipherSafe</span>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="/generate" className="nav-link rounded genbtn">Generate Password</a>
                        </li>
                        <li className="nav-item">
                            <a href="/signup" className="nav-link rounded spbtn">Sign up</a>
                        </li>
                        <li className="nav-item">
                            <a href="/signin" className="nav-link rounded snbtn">Sign in</a>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NotAuthenticatedNavbarComponent;
