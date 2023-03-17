const initialState = [];

export const reducer = (state = initialState, action) => {
    if (action.type === 'add') {
        return action.payload
    }
    else if (action.type === "login") {
        return action.payload
    } else if (action.type === "signup") {
        return action.payload
    }
    return state
}