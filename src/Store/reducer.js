import * as actionTypes from './actions'

const initialStore = {
    isLoggedIn : false,
    token: null,
    bookImageEndpoint: 'https://glacier-api.herokuapp.com/api/books/', 
    cart: [],
    showAuth: false, 
    showNotification: false,
    showOrderDetails: false,
    idOfOrderToShow: null, 
    showFoundProducts:false,
    notification: {
        content: "",
        status: "primary"
    },
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
        case actionTypes.SHOW_NOTIFICATION: 
            return{
                ...state, 
                showNotification: true,
                notification: {
                    ...state.notification,
                    content: action.payload.content,
                    status: action.payload.status
                }
            }
        case actionTypes.CANCEL_NOTIFICATION: 
            return{
                ...state,
                showNotification: false
            }
        case actionTypes.SHOW_ORDER_DETAILS: 
            return{
                ...state, 
                showOrderDetails: true,
                idOfOrderToShow: action.orderId
            }
        case actionTypes.CANCEL_ORDER_DETAILS:
            return{
                ...state, 
                showOrderDetails: false
            }
        case actionTypes.LOG_USER_OUT: 
            return {
                ...state, 
                isLoggedIn: false, 
                token: null
            }
        case actionTypes.SHOW_FOUND_PRODUCTS:
            return {
                ...state, 
                showFoundProducts: !state.showFoundProducts
            }
    }
    return state
}


export default reducer