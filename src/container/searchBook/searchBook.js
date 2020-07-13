import React,  {Component  } from "react";
import {flowRight as compose} from 'lodash'
import * as actions from '../../Store/actions'
import querys from '../../Query_Mutation/query'
import SearchInput from '../../components/UI/InputTypes/Search/Search'
import Aux from "../../HOC/Aux";
import { connect } from "react-redux";
import {withApollo } from "react-apollo";
import FoundProducts from "./foundProducts/foundProducts";
import { withRouter } from "react-router-dom";





class SearchBook extends Component{
    state = {
        founds : [],
        isFormValid: false,
        loading: false,
        isSubmited: false,
        errors: [],
        invalidFormErrorMessage:"Please, input the name of the book you want to search",
        FORM_INPUTS:  {
            searchName: {
                elemType: "input",
                config: {
                    type: 'text', 
                    placeholder: "Search Book"
                },
                value:"",
                validation: function(){
                    let valid = false;
                    if(this.value.trim() !== '' && this.value.length >=1 && this.value.length <=30){
                        valid = true;
                    }
                    return valid
                },
                isValid: false, 
                touched: false,
                iconName:"person"
            },
        }
    }
    formElementChangeHandler = async (event, elemName)=> {
        let formInputs = {...this.state.FORM_INPUTS}
        let element = formInputs[elemName]
        element.value = event.target.value;
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
    submitHandler = async (event)=> {
        
        event.preventDefault();
        
        await this.setState({isSubmited: true});
        if(!this.state.isFormValid){
            this.props.showNotification({
                status:"error",
                content: "Please enter the name of the book"
            })
        }
        if(this.state.isSubmited && this.state.isFormValid){
            this.props.client.query({
                query: querys.searchBook, 
                variables: {
                    bookName: this.state.FORM_INPUTS.searchName.value
                }
            })
            .then(data => {
                this.setState({founds: data.data.searchBook})
                this.props.showFoundBooks()
            }).catch(err => {
                if(err.graphQLErrors){
                    const errors = err.graphQLErrors.map(error => error.message)
                    this.props.showNotification({
                        status:"error",
                        content: errors
                    })
                }
            })
        }
    }
    render(){
        return (
            <Aux>
                <FoundProducts 
                founds={this.state.founds}
                />
                <SearchInput
                elemType={this.state.FORM_INPUTS.searchName.elemType}
                config={this.state.FORM_INPUTS.searchName.config}
                value={this.state.FORM_INPUTS.searchName.value}
                iconName={this.state.FORM_INPUTS.searchName.iconName}
                changed={(event)=>this.formElementChangeHandler(event, "searchName")}
                valid={this.state.FORM_INPUTS.searchName.isValid}
                touched={this.state.FORM_INPUTS.searchName.touched}
                submit={(event)=> this.submitHandler(event)}
                />
            </Aux>
        )
            
    }
}

const actionMappedToProps = dispatch => {
    return{
        showFoundBooks : ()=> dispatch(actions.showFoundProducts()),
        showNotification : (payload)=> dispatch(actions.showNotification(payload))
    }
}


export default  compose(
    withRouter,
    withApollo,
    connect(null, actionMappedToProps),
) (SearchBook)