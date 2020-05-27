import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import './App.css';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Home from './container/Home/Home';
import SignIn from './container/Authentication/SignIn/SignIn';
import Login from './container/Authentication/Login/Login';
import * as actionCreators from './Store/actions'
import { getInLocalStorage } from './Util/localStorage';
import Preview from './container/Preview/Preview';
import CheckoutSingleBook from './container/Checkout/CheckoutSingleBook/CheckoutSingleBook';
import CheckAuth from './components/CheckAuth/CheckAuth';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      clickedSignIn: false, 
      clickedLogin:false,
      checkAuth: false
    }
  }
  componentDidMount(){
    const token = getInLocalStorage("token")
    if(token) this.props.login(token);
  }
  
  signInHandler =()=>{
    this.setState(state => {
      return {clickedSignIn: !state.clickedSignIn};
    })
  }
  logInHandler =() => {
    this.setState(state => {
      return {clickedLogin: !state.clickedLogin}
    })
  }
  render(){
    console.log(this.state.clickedLogin)
    return(
      <div className="App">
        <NavBar 
        mode="dark"
        clickedSignIn={this.signInHandler}
        clickedLogin={this.logInHandler}
        />
        <SignIn 
        show={this.state.clickedSignIn}
        cancel={this.signInHandler}
         />
         <Login
         show={this.state.clickedLogin}
         cancel={this.logInHandler}
         />
         <CheckAuth
          show ={this.props.showAuth}
          cancel={this.props.cancelAuth}
          clickedSignIn= {this.signInHandler}
          clickedLogIn={this.logInHandler}
          />
          <Switch>
            <Route path="/product/:id" component={Preview} />
            <Route path="/checkout" component={CheckoutSingleBook} />
            <Route path="/" exact component={Home} />
          </Switch>
        <Footer mode="dark"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    cart: state.cart,
    showAuth: state.showAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login : (token) => dispatch(actionCreators.login(token)),
    cancelAuth: () => dispatch(actionCreators.cancelAuth())
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (App);
