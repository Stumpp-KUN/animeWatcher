import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import NewsComponent from './mainPage.jsx';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import AnimePage from './animePage';

import './styles.css';

function YourComponent() {
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const [accessToken, setAccessToken] = useState('');

  const login = () => {
    axios
      .post('http://localhost:8080/api/v1/auth/authenticate', {
        email,
        password
      })
      .then(response => {
        const accessToken = response.data.accessToken;
        // Сохранение токена accessToken
        setAccessToken(accessToken);
        // Переход на другую страницу
        history.push('/');
        closeModal()
      })
      .catch(error => {
        setError('Incorrect Email Or Password');
        console.error('Authorization error:', error);
        setEmail('');
        setPassword('');
      });
  };

  useEffect(() => {
    let timeoutId;

    const hideError = () => {
      setError('');
    };

    if (error) {
      timeoutId = setTimeout(hideError, 10000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

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
                  <input
                    placeholder="Email"
                    className="log-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />

                  <div className="password-container">
                    <div className="custom-input">
                      <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        className="pas-input"
                        id="password-input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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
                <button className="button-59" role="button" onClick={login}>
                  Log in
                </button>
                {error && (
                  <div className="error-message">{error}</div>
                )}
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