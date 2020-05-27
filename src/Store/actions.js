export const LOG_USER_IN = "LOG_USER_IN"
export const ADD_TO_CART = "ADD_TO_CART"


export const login = (token) => {
    return {type: LOG_USER_IN, token: token}
}
export const addToCart = (id) => {
    return {type: ADD_TO_CART, id : id}
}