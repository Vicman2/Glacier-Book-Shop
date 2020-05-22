import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Aux from './HOC/Aux'
import './App.css';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Home from './container/Home/Home';
import SignIn from './container/Authentication/SignIn/SignIn';
import Login from './container/Authentication/Login/Login';
import * as actionCreators from './Store/actions'
import { getInLocalStorage } from './Util/localStorage';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      clickedSignIn: false, 
      clickedLogin:false,
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
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        <Footer mode="dark"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login : (token) => dispatch(actionCreators.login(token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (App);
