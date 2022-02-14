
export const setToken = token =>({
    type: "SET_TOKEN",
    payload : { token }
})
export const clearToken = () => ({
    type: "CLEAR_TOKEN"
})
export const setUserInfo =(info) => ({
    type: "SET_USER_INFO",
    payload : { info }
})