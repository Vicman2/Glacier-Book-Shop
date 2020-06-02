import React, {Component} from 'react'
import Input from '../../../components/UI/InputTypes/Input/Input'
import './CartItem.css'
import { connect } from 'react-redux'

const options = []

for(let i = 1 ; i <= 10; i++ ){
    options.push({
        value: i, 
        displayValue: i.toString()
    })
}

class CartItem extends Component{
    constructor(props){
        super(props)
        this.state = {
           selectQuantity: {
               elemType:"select",
               value: "",
               elementConfig: {
                    options
               }
           }
        }
    }
    render(){
        return(
            <div className="CartItem">
                <div className="CartItem_First_Part">
                    <div className="CartItem_ImageContainer">
                        <img src={this.props.bookImageEndpoint + this.props.imageUrl} alt={this.props.title}/>
                    </div>
                    <div className="CartItem_Text">
                        <p className="CartItem_Title">{this.props.title} </p>
                        <p className="CartItem_Author"> {this.props.author} </p>
                    </div>
                </div>
                <div className="CartItem_Second_Part">
                    <Input
                        elemType={this.state.selectQuantity.elemType}
                        value={this.state.selectQuantity.value}
                        elementConfig={this.state.selectQuantity.elementConfig}
                    />
                    <p>${this.props.price} </p>
                    <div className="CartItem_Delete_Container">
                        <ion-icon name="trash"></ion-icon>
                    </div>
                </div>
            </div>
        )
    }
}

const stateMappedToProps = (state) => {
    return{
        bookImageEndpoint: state.bookImageEndpoint
    }
}

export default connect(stateMappedToProps) (CartItem)