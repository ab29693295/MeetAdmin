import {setStorage} from "../../common/js/tools";

const initialState = {
    token:''
};
const user=(state=initialState,action)=>{
    switch (action.type){
        case "SET_TOKEN":
        {
            const {
                token
            } = action.payload;
            setStorage('token',token);
            return {
                ...state,
                token
            };
        }
        case "CLEAR_TOKEN":
        {
            return {
                ...state,
                token:''
            };
        }
        default:
            return state;
    }
}
export default user;