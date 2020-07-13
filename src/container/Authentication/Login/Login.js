import React, {Component} from 'react'
import * as actionTypes from '../../../Store/actions'
import gql from 'graphql-tag'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Modal from '../../../components/UI/Modal/Modal'
import Input from '../../../components/UI/InputTypes/Input/Input'
import {setInLocalStorage} from '../../../Util/localStorage'
import {flowRight as compose} from 'lodash'
import {withApollo, graphql} from 'react-apollo'
import mutations from '../../../Query_Mutation/mutation'
import './Login.css'
import { connect } from 'react-redux'


const query = gql`
query Login($email: String!, $password: String!){
    login(email:$email, password: $password){
      token
    }
  }
`

const FORM_INPUTS=  {
    email: {
        elemType: "input",
        config: {
            type: 'text', 
            placeholder: "Email"
        },
        value:"",
        validation: function(){
            let valid = false;
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(emailRegex.test(this.value)){
                valid = true
            }
            return valid
        },
        isValid: false,
        errorMessage: "Please input a valid email address",
        touched: false, 
        iconName: "mail"
    },
    password: {
        elemType: "input", 
        config: {
            type: 'password', 
            placeholder: "Password"
        },
        value:"",
        validation: function(){
            let valid = false;
            if(this.value.trim() !== '' && this.value.length >=5 && this.value.length <=30){
                valid = true;
            }
            return valid
        },
        isValid: false,
        errorMessage: "Add a strong passkey whose length is not less than 5",
        touched: false,
        iconName: "key"
    }
}
class Login extends Component{
    constructor(props){
        super(props)
        this.state= {
            isFormValid: false,
            loading: false,
            isSubmited: false,
            errors: [],
            invalidFormErrorMessage:"Please, fill the forms accurately before you submit",
            formInputs:{...FORM_INPUTS}
        }
    }
    formElementChangeHandler = async (event, elemName)=> {
        let formInputs = {...this.state.formInputs}
        let element = formInputs[elemName]
        element.value= event.target.value;
        element.isValid = element.validation()
        element.touched = true;
        await this.setState({formInputs: formInputs})
        await this.checkValidity()
    }
    checkValidity = async()=>{
        let  theFormIsValid = true;
        for(let elemName in this.state.formInputs){
            if(this.state.formInputs[elemName].isValid === false){
                theFormIsValid = false;
                break;
            }
        }
        await this.setState({isFormValid: theFormIsValid})
    }
    onSubmitHandler = async (event)=>{
        let data  = {}
        event.preventDefault();
        await this.setState({isSubmited: true});
        if(this.state.isSubmited && this.state.isFormValid){
            for(let key in this.state.formInputs){
                const deKey= key;
                data[deKey]= this.state.formInputs[deKey].value
            }
            await this.setState({loading: true})
            this.props.client.query({
                query, 
                variables: {
                    email: data.email, 
                    password: data.password
                }
            }).then(res => {
                this.setState({loading: false})
                const {token} = res.data.login
                const cart = JSON.parse(localStorage.getItem('cart'))
                if( cart && cart.cartIds.length > 0){
                    this.props.mutate({
                        variables: {
                            books: cart.cartIds
                        }
                    }).then(res => {
                        this.props.updateCart(res.data.logIn)
                    })
                    .catch(err=> {
                        console.log(err)
                    })
                }
                setInLocalStorage("token", token, 3600000);
                localStorage.removeItem('cart')
                this.props.login(token)
                this.setState({formInputs: FORM_INPUTS});
                this.props.cancel()

            }).catch(err=> {
                this.setState({loading: false})
                if(err.graphQLErrors){
                    const errors = err.graphQLErrors.map(error => error.message);
                    this.setState({errors});
                }
            })
        }
    }
    render(){
        let formElements = [];
        for(let elementName in this.state.formInputs){
            formElements.push({
                id: elementName, 
                config: this.state.formInputs[elementName]
            })
        }
        let subMitErrorClass = ["ErrorMessage"]
        if(this.state.isSubmited && !this.state.isFormValid || this.state.serverError){
            subMitErrorClass.push("Show__Error")
        }else{
            subMitErrorClass.push("Hide__Error")
        }
        let toDisplay =  (
            <button disabled={!this.state.isFormValid}>Submit</button>
        )
        if(this.state.loading){
            toDisplay = <Spinner />
        }
        let displayError = null
        if(this.state.errors.length > 0){
            displayError = this.state.errors.map((err, index) => {
                return (
                    <p 
                    key={index}
                    className="ErrorMessage"> {err} </p>
                )
            })
        }
        return(
            <Modal
            title="Please Login"
            button1Name="cancel"
            button2Name="Login"
            show={this.props.show}
            cancel={this.props.cancel}
            onClickButton1={this.props.cancel}
            onClickButton2={this.onSubmitHandler}
            loading2={this.state.loading}
            auth="signIn"
            signIn= {this.props.toSignin}
            >
                <p className={subMitErrorClass.join(" ")}>{this.state.invalidFormErrorMessage} </p>
                {displayError}
                <form onSubmit={this.formSubmitHandler}>
                    {formElements.map(element => (
                        <Input
                        key={element.id}
                        elemType={element.config.elemType}
                        config={element.config.config}
                        value={element.config.value}
                        iconName={element.config.iconName}
                        errorMessage={element.config.errorMessage}
                        changed={(event)=>this.formElementChangeHandler(event, element.id)}
                        valid={element.config.isValid}
                        touched={element.config.touched}
                        />)
                    )}
                </form>
            </Modal>
        )
    }
}
const stateMappedToProps = state => {
    return{
        cart : state.cart
    }
}

const actionsMappedToProps = (dispatch) => {
    return {
        login: (token) => dispatch(actionTypes.login(token)),
        updateCart: (cart) => dispatch(actionTypes.getCartOnLogin(cart))
    }
}

export default  compose(
    withApollo,
    graphql(mutations.makeCart),
    connect(stateMappedToProps, actionsMappedToProps)
    ) (Login)