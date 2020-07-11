import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Home from "./container/Home/Home";
import SignIn from "./container/Authentication/SignIn/SignIn";
import Login from "./container/Authentication/Login/Login";
import * as actionCreators from "./Store/actions";
import { getInLocalStorage } from "./Util/localStorage";
import Preview from "./container/Preview/Preview";
import CheckAuth from "./components/CheckAuth/CheckAuth";
import Notification from "./components/UI/Notification/Notification";
import Checkout from "./container/Checkout/Checkout";
import HarmburgerMenu from "./components/NavBar/HamburgerMenu/HamburgerMenu";
import Orders from "./container/Orders/Orders";
import About from "./container/About/About";
import OrderDetails from "./container/OrderDetails/OrderDetails";
import Profile from "./container/Profile/Profile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedSignIn: false,
      clickedLogin: false,
      orderDetails: false,
      checkAuth: false,
      harmburgerMenu: false,
      showProfile: false,
    };
  }
  componentDidMount() {
    const token = getInLocalStorage("token");
    if (token) this.props.login(token);
  }

  signInHandler = () => {
    this.setState((state) => {
      return { clickedSignIn: !state.clickedSignIn, clickedLogin: false };
    });
  };
  logInHandler = () => {
    this.setState((state) => {
      return { clickedLogin: !state.clickedLogin , clickedSignIn: false};
    });
  };
  showHarmburger = () => {
    this.setState((state) => {
      return { harmburgerMenu: !state.harmburgerMenu };
    });
  };
  showProfileHandler = () => {
    this.setState((state) => {
      return { showProfile: !state.showProfile };
    });
  };
  onLogout = () => {};
  render() {
    return (
      <div className="App">
        <NavBar
          mode="dark"
          clickedSignIn={this.signInHandler}
          clickedLogin={this.logInHandler}
          clickedHarmburger={this.showHarmburger}
          showHamBurger={this.state.harmburgerMenu}
          showProfile={this.showProfileHandler}
          seeProfile={this.state.showProfile}
        />
        <Profile
          show={this.state.showProfile}
          cancel={this.showProfileHandler}
        />
        <HarmburgerMenu
          show={this.state.harmburgerMenu}
          clicked={this.showHarmburger}
        />
        <SignIn
          show={this.state.clickedSignIn}
          cancel={this.signInHandler}
          toLogin={this.logInHandler}
        />
        <Login
          show={this.state.clickedLogin}
          cancel={this.logInHandler}
          toSignin={this.signInHandler}
        />
        <OrderDetails
          show={this.props.showOrderDetails}
          cancel={this.props.cancelOrderDetails}
        />
        <CheckAuth
          show={this.props.showAuth}
          cancel={this.props.cancelAuth}
          clickedSignIn={this.signInHandler}
          clickedLogIn={this.logInHandler}
        />
        <Switch>
          <Route path="/product/:id" component={Preview} />
          <Route path="/cart" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/about" component={About} />
          <Route path="/" exact component={Home} />
        </Switch>
        <Notification
          show={this.props.showNotification}
          status={this.props.notification.status}
          content={this.props.notification.content}
        />
        <Footer mode="dark" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    cart: state.cart,
    showAuth: state.showAuth,
    showNotification: state.showNotification,
    notification: state.notification,
    showOrderDetails: state.showOrderDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token) => dispatch(actionCreators.login(token)),
    cancelAuth: () => dispatch(actionCreators.cancelAuth()),
    cancelOrderDetails: () => dispatch(actionCreators.cancelOrderDetails()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
