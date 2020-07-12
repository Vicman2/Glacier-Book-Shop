export const LOG_USER_IN = "LOG_USER_IN"
export const ADD_TO_CART = "ADD_TO_CART"
export const SHOW_AUTH = "SHOW_AUTH"
export const CANCEL_AUTH = "CANCEL_AUTH"
export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION"
export const CANCEL_NOTIFICATION = "CANCEL_NOTIFICATION"
export const GET_CART_ON_LOGIN = "GET_CART_CART_ON_LOGIN"
export const UPDATE_CART= "UPDATECART"
export const SHOW_ORDER_DETAILS = "SHOW_ORDER_DETAILS"
export const CANCEL_ORDER_DETAILS = "CANCEL_ORDER_DETAILS"
export const LOG_USER_OUT = "LOG_USER_OUT"
export const SHOW_FOUND_PRODUCTS = "SHOW_FOUND_PRODUCTS"


export const login = (token) => {
    return {type: LOG_USER_IN, token: token}
}
export const addToCart = (id) => {
    return {type: ADD_TO_CART, id : id}
}
export const showAuth = () => {
    return {type: SHOW_AUTH}
}
export const cancelAuth = () => {
    return {type: CANCEL_AUTH}
}
export const showNotification = (payload) => {
    return {type: SHOW_NOTIFICATION, payload}
}
export const cancelNotificaton = () => {
    return {type: CANCEL_NOTIFICATION}
}
export const getCartOnLogin = (cart) => {
    return {type: GET_CART_ON_LOGIN, cart}
}
export const updateCart = (payload) => {
    return {type: UPDATE_CART, payload}
}
export const showOrderDetails = (orderId) => {
    return {type: SHOW_ORDER_DETAILS, orderId }
}
export const cancelOrderDetails = () => {
    return {type: CANCEL_ORDER_DETAILS}
}
export const logUserOut = ()=> {
    return {type : LOG_USER_OUT}
}
export const showFoundProducts = () => {
    return { type : SHOW_FOUND_PRODUCTS}
}
