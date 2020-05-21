import * as actionTypes from './actions'

const initialStore = {
    isLoggedIn : false,
    token: null,
}


const reducer = (state = initialStore, action) => {
    switch(action.type){
        case actionTypes.LOG_USER_IN: 
            return {
                ...state, 
                isLoggedIn: true, 
                token: action.token
            }
    }
    return state
}


export default reducer