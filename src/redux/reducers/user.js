import {setStorage} from "../../common/js/tools";

const initialState = {
    token:'',
    info:{}
};
const user=(state=initialState,action)=>{
    switch (action.type){
        case "SET_TOKEN":
        {
            const {
                token
            } = action.payload;
            // setStorage('token',token);
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
        case "SET_USER_INFO":
        {
            const {
                info
            } = action.payload;
            return {
                ...state,
                info
            };
        }
        default:
            return state;
    }
}
export default user;