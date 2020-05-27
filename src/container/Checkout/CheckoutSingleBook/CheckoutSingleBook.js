import React, {Component} from 'react'
import {usePaystackPayment, PaystackButton, PaystackConsumer} from 'react-paystack'
import Aux from '../../../HOC/Aux'

const config = {
    reference : (new Date()).getTime(), 
    email: 'Vicmanthebest@gmail.com',
    amount: 20000, 
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY
}

const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
        <div>
            <button onClick={() => {
                initializePayment()
            }}>Paystack Hooks Implementation</button>
        </div>
    );
};

class CheckoutSingleBook extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const componentProps = {
            ...config,
            text: 'Paystack Button Implementation',
            onSuccess: () => this.props.history.push('/'),
            onClose: () => null
        };
        return (
            <Aux>
                <PaystackHookExample />
                <PaystackButton {...componentProps} />
                <PaystackConsumer {...componentProps} >
                    {({initializePayment}) => <button onClick={() => initializePayment()}>Paystack Consumer Implementation</button>}
                </PaystackConsumer>
            </Aux>
        )
    }
}

export default CheckoutSingleBook