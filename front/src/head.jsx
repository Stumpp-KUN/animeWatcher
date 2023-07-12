import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import NewsComponent from './mainPage.jsx';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import AnimePage from './animePage';
import States from './states.jsx';

import './styles.css';

import TokenContext from './TokenContext';
import UserContext from './UserContext'; // Добавлен контекст пользователя

function YourComponent() {
  const history = useHistory();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');

  const userContext = useContext(UserContext); // Используем контекст пользователя

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const login = () => {
    axios
      .post('http://localhost:8080/api/v1/auth/authenticate', {
        email,
        password
      })
      .then(response => {
        const accessToken = response.data.access_token;
        // Сохранение токена accessToken
        setAccessToken(accessToken);
        // Переход на другую страницу
        history.push('/');
        setIsLoggedIn(true);
        setUserEmail(email);
        closeModal();
        setEmail('');
        setPassword('');

        axios
          .get('http://localhost:8080/api/v1/users/email', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            params: {
              email: userEmail
            }
          })
          .then(response => {
            setUserId(response.data.id);
            setNickname(response.data.nickname);
          })
          .catch(error => {
            console.error('Failed to fetch user information:', error);
          });
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

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken('');
    setIsLoggedIn(false);
    setNickname('');
    setUserId('');
  };

  useEffect(() => {
    const savedAccessToken = localStorage.getItem('accessToken');
    if (savedAccessToken) {
      setAccessToken(savedAccessToken);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <TokenContext.Provider value={accessToken}>
      <UserContext.Provider value={{ userId, nickname }}>
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
              {isLoggedIn ? (
                <div className="user-info">
                  <span className="nickname">{nickname}</span>
                  <button className="button-7" role="button" onClick={logout}>
                    Logout
                  </button>
                </div>
              ) : (
                <>
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
                        <button
                          className="button-59"
                          role="button"
                          onClick={login}
                        >
                          Log in
                        </button>
                        {error && <div className="error-message">{error}</div>}
                      </div>
                    </div>
                  )}

                  <button className="button-7" role="button">
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
          <Switch>
            <Route exact path="/" component={NewsComponent} />
            {/* Добавьте другие маршруты */}
          </Switch>
        </div>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}

export default YourComponent;
