import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewsComponent from './mainPage.jsx';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import AnimePage from './animePage';

import './styles.css';

function YourComponent() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
      <div>
        <div className="vidj">
          <div className="imagePlace">
            <p>
              <Link className="animeWatcher" to="/">
                AnimeWatcher
              </Link>
            </p>
          </div>
          <div className="vidjets">
            <Link to="/animes" className="vid">
              Anime
            </Link>
            <Link to="/states" className="vid">
              States
            </Link>
            <Link to="/users" className="vid">
              Users
            </Link>
            <Link to="/receives" className="vid">
              Receives
            </Link>
            <Link to="/contact" className="vid">
              Contacts
            </Link>
          </div>
          <div className="auth">
            <button className="button-7" role="button" onClick={openModal}>
              Sign in
            </button>

            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <h1 className="sign-in">Sign in</h1>
                  <div className="login-content">
                    <input placeholder="Login" className="log-input" />

                    <div className="password-container">
                      <div className="custom-input">
                        <input
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder="Password"
                          className="pas-input"
                          id="password-input"
                        />
                        <span
                          className="password-toggle"
                          onClick={togglePasswordVisibility}
                        >
                          <img
                            src={
                              isPasswordVisible
                                ? 'open-eye.png'
                                : 'close-eye.png'
                            }
                            style={{ width: '20px', height: '20px' }}
                            alt=""
                          />
                        </span>
                      </div>
                    </div>

                    <a href="#" className="forgetP">
                      Forget Password
                    </a>
                  </div>
                  <button className="button-59" role="button">
                    Log in
                  </button>
                </div>
              </div>
            )}

            <button className="button-7" role="button">
              Sign up
            </button>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={NewsComponent} />
        </Switch>
      </div>
  );
}

export default YourComponent;
