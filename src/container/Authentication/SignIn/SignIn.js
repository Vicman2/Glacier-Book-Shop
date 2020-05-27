import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/InputTypes/Input/Input'
import * as actionTypes from '../../../Store/actions'
import './SignIn.css'
import Modal from '../../../components/UI/Modal/Modal'
import gql from 'graphql-tag'
import { setInLocalStorage } from '../../../Util/localStorage'
import { connect } from 'react-redux'

const FORM_INPUTS=  {
    name: {
        elemType: "input",
        config: {
            type: 'text', 
            placeholder: "Your name"
        },
        value:"",
        validation: function(){
            let valid = false;
            if(this.value.trim() !== '' && this.value.length >=3 && this.value.length <=30){
                valid = true;
            }
            return valid
        },
        isValid: false, 
        errorMessage: "Name must be up to 3 letters",
        touched: false,
        iconName:"person"
    },
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
    phone: {
        elemType: "input",
        config: {
            type: 'text', 
            placeholder: "Phone"
        },
        value:"",
        validation: function(){
            let valid = false;
            const phoneRegex = /^[0]\d{10}$/
            if(phoneRegex.test(this.value)){
                valid = true
            }
            return valid
        },
        isValid: false,
        errorMessage: "Please input a valid phone number",
        touched: false, 
        iconName: "mail"
    },
    password: {
        elemType: "input", 
        config: {
            type: 'password', 
            placeholder: "password"
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


class SignIn extends Component{
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
            this.props.mutate({
                variables: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone, 
                    password: data.password
                }
            })
            .then(res => {
                this.setState({loading: false})
                setInLocalStorage("token", res.data.signUp.token, 3600000)
                this.props.login(res.data.signUp.token)
                this.setState({formInputs: FORM_INPUTS})
                this.props.cancel()
            })
            .catch(err=> {
                this.setState({loading: false})
                const errors = err.graphQLErrors.map(error => error.message);
                this.setState({errors})
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
            displayError = this.state.errors.map(err => {
                return (
                    <p className="ErrorMessage"> {err} </p>
                )
            })
        }
        return(
            <Modal
            title="Please sign up"
            button1Name="cancel"
            button2Name="Sign Up"
            show={this.props.show}
            clicked={this.props.cancel}
            onClickButton1={this.props.cancel}
            onClickButton2={this.onSubmitHandler}
            loading2={this.state.loading}
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
const mutation= gql`
mutation SignUp($name : String!, $email:String!, $phone: String!, $password: String!){
  signUp(name:$name, phone: $phone, email: $email, password: $password){
    token
  }
}
`

const actionsMappedToProps = (dispatch) => {
    return {
        login: (token) => dispatch(actionTypes.login(token))
    }
}
export default graphql(mutation) (connect(null, actionsMappedToProps) (SignIn))