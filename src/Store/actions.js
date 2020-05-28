export const LOG_USER_IN = "LOG_USER_IN"
export const ADD_TO_CART = "ADD_TO_CART"
export const SHOW_AUTH = "SHOW_AUTH"
export const CANCEL_AUTH = "CANCEL_AUTH"
export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION"
export const CANCEL_NOTIFICATION = "CANCEL_NOTIFICATION"


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