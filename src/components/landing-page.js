import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from './login-form';
import logo from '../images/buvienamelogo.png';

const StyledLandingPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-template-areas: 
    "info side-login";
  height: 100vh;

  .info-area {
    grid-area: info;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: 
      "first"
      "second"
      "third";
    color: #fff;
    text-align: center;
    background-image: linear-gradient(to bottom right,
    rgba(39, 39, 39, 0.8),
    rgba(29, 29, 29, 0.8)),
    url(https://kylegrant76.files.wordpress.com/2015/12/top-10-movies-people-in-movie-theater-with-3d-glasses.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }

  .info-message {
    grid-area: second;
    align-self: center;
  }

  .side-login {
    grid-area: side-login;
    display: grid;
    grid-template-rows: 0.5fr 1fr 0.3fr;
    grid-template-areas: 
      "logo"
      "loginform"
      "signup-btn";
    color: #8b8b99;
    background-color: #212032;
    text-align: center;
    font-size: 1.6rem;
  }

  .buvie-landing-logo {
    grid-area: logo;
    color: #fff;
    align-self: center;
    justify-self: center;
    width: 20rem;
  }

  .landing-login-form {
    grid-area: loginform;
    font-size: 2rem;
    align-self: center;
  }

  .signup-button {
    grid-area: signup-btn;
    font-size: 1rem;
    align-self: flex-start;
  }

  .landing-login-form input {
    border: none;
    background-color: #212032;
    border-bottom: 0.1rem solid #8b8b99;
    width: 20rem;
    margin: 2rem;
    font-size: 1.6rem;
  }

  .landing-login-btn {
    background-color: #a33944;
    color: #000;
    width: 20rem;
    height: 3rem;
    border: none;
  }

  .form-error {
    font-size: 1rem;
  }
`;

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <StyledLandingPage className="landing-page-main-grid">
      <div className="info-area">
        <h1 className="info-message">Buvie, find friends to watch your <br />favorite movies with!</h1>
      </div>
      <div className="side-login">
        <img src={logo} alt="Buvie logo" className="buvie-landing-logo" />
        <LoginForm />
        <span className="signup-button">Not a member?<Link to="/register">Register</Link></span>
      </div>
    </StyledLandingPage>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
