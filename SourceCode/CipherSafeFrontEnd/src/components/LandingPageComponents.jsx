import { useState, useEffect } from "react";

import GeneratePasswordComponent from "./GeneratePasswordComponent";
import NotAuthenticatedNavbarComponent from "./notauthticatedNavbarComponent";




function LandingPageComponent() {

 
  return (
    <>
<NotAuthenticatedNavbarComponent/>
      <section className=" container jumbotron border border-bottom-0 border-dark rounded-top text-center mt-4  ">
        <div className="container">
          <h1 className="display-4 firstheader">
            Secure Your Online Identity with Confidence
          </h1>
          <p className="lead subtitle">
            Protect your accounts and sensitive information from cyber threats
            with our advanced security solutions.
          </p>
          <div className=" mt-3  mb-3 border-dark">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card ">
                  {/* <img src="/Imgs/1.png" className="card-img-top img-fluid" alt="..." /> */}
                  <div className="card-body">
                    <h5 className="card-title text-center ">
                      Military-Grade Encryption
                    </h5>
                    <p className="card-text text-center subtitle">
                      Ensure top-level security with our encryption technology.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card ">
                  {/* <img src="/Imgs/2.png" className="card-img-top img-fluid" alt="..." /> */}
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      Generate Passwords
                    </h5>
                    <p className="card-text text-center subtitle">
                      Create strong and unique passwords effortlessly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card ">
                  {/* <img src="/Imgs/3.png" className="card-img-top img-fluid" alt="..." /> */}
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      Secure Account Storage
                    </h5>
                    <p className="card-text text-center subtitle">
                      Safely store your accounts with advanced security
                      measures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex  justify-content-center gap-3">
            <a className="btn btn-primary btn-lg trybtn " href="/signup" role="button">
            Try <span className="brandName">CipherSafe</span> <i className="fa-solid fa-fingerprint "></i>
            </a>
            <a
              className="btn btn-outline-dark btn-lg learnbtn"
              href="/generate"
              role="button"
            >
              Generate Password <i className="fa-solid fa-key"></i>
            </a>
          </div>
        </div>
      </section>


      

      <section className="mt-3 mb-3">
        <div className="container mt-5 mb-3   border  border-dark ">
          <h2 className="text-center  mb-4 firstheader">Trusted by</h2>
          <p className="text-center subtitle">
            Join the ranks of leading organizations who rely on our expertise
            and solutions. Our trusted partners represent a diverse range of
            industries, all united by their confidence in our commitment to
            excellence, security, and innovation.
          </p>
          <div className="row justify-content-center">
            <div className="col-auto">
              <a href="https://abdinasirmumin.netlify.app/" target="_blank" rel="noopener noreferrer">
              <img
                src="/Imgs/AbdinasirMuminbadge1.png"
                className="img-fluid"
                width="100"
                alt="Company 1"
              />
              </a>
            </div>
            <div className="col-auto">
              <a href="https://ccc-imageproccessing.netlify.app/" target="_blank" rel="noopener noreferrer">
              <img
                src="/Imgs/imgprocessingprojectIcon.png"
                className="img-fluid"
                width="100"
                alt="Company 2"
              />
              </a>
            </div>
            <div className="col-auto">
              <a href="https://lifelogg.netlify.app/" target="_blank" rel="noopener noreferrer">
              <img
                src="/Imgs/lifelogIcon.png"
                className="img-fluid"
                width="100"
                alt="Company 3"
              />
              </a>
            </div>
            <div className="col-auto">
             <a href="https://www.youtube.com/@pukatech" target="_blank" rel="noopener noreferrer">
             <img
                src="/Imgs/pukatech.jpg"
                className="img-fluid"
                width="100"
                alt="Company 4"
              />
             </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 ">
        <div className="container border border-top-0 border-dark rounded-bottom p-3">
        <h2 className="text-center mb-4  firstheader">Client Testimonials</h2>

          <div
            id="testimonialCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="card">
                  <div className="card-header">CipherSafe Reviews</div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>
                        "CipherSafe has transformed the way I manage my
                        passwords. As someone who struggled to remember multiple
                        passwords for different accounts, CipherSafe has made my
                        life so much easier. It's simple to use, secure, and has
                        become an essential tool in my digital life."
                      </p>
                      <footer className="blockquote-footer">Emily Smith</footer>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card">
                  <div className="card-header">CipherSafe Reviews</div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>
                        "I've been using CipherSafe for a while now, and I can't
                        imagine life without it. Not only does it securely store
                        all my passwords, but its password generator feature has
                        helped me create strong and unique passwords for all my
                        accounts. Thanks to CipherSafe, I feel more confident
                        about my online security."
                      </p>
                      <footer className="blockquote-footer">
                        John Anderson
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card">
                  <div className="card-header">CipherSafe Reviews</div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>
                        "CipherSafe has been a game-changer for me. With its
                        intuitive interface and seamless integration across
                        devices, managing my passwords has never been easier.
                        Plus, knowing that my sensitive information is encrypted
                        and protected gives me peace of mind."
                      </p>
                      <footer className="blockquote-footer">Sarah Patel</footer>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card">
                  <div className="card-header">CipherSafe Reviews</div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>
                        "I was skeptical about password managers at first, but
                        CipherSafe has exceeded all my expectations. It's
                        incredibly user-friendly, and the customer support team
                        has been fantastic whenever I've had questions. Thanks
                        to CipherSafe, I no longer have to worry about
                        forgetting passwords or falling victim to cyber
                        threats."
                      </p>
                      <footer className="blockquote-footer">
                        David Carter
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPageComponent;
