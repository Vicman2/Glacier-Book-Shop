export const LOG_USER_IN = "LOG_USER_IN"


export const login = (token) => {
    return {type: LOG_USER_IN, token: token}
}