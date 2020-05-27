import * as actionTypes from './actions'

const initialStore = {
    isLoggedIn : false,
    token: null,
    bookImageEndpoint: 'http://localhost:5000/api/books/', 
    cart: [],
    showAuth: false
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
        case actionTypes.SHOW_AUTH: 
            return{
                ...state, 
                showAuth: true
            }
        case actionTypes.CANCEL_AUTH: 
            return{
                ...state, 
                showAuth: false
            }
    }
    return state
}


export default reducer