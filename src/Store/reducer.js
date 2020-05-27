import * as actionTypes from './actions'

const initialStore = {
    isLoggedIn : false,
    token: null,
    bookImageEndpoint: 'http://localhost:5000/api/books/', 
    cart: []
}


const reducer = (state = initialStore, action) => {
    switch(action.type){
        case actionTypes.LOG_USER_IN: 
            return {
                ...state, 
                isLoggedIn: true, 
                token: action.token
            }
        case actionTypes.ADD_TO_CART: 
            const cart = [...state.cart]
            cart.push(action.id)
            return{
                ...state, 
                cart: cart
            }
    }
    return state
}


export default reducer