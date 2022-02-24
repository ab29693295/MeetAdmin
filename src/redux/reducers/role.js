const initialState = {
    allRoles:[]//所有角色不涉及权限
};
const role=(state=initialState,action)=>{
    switch (action.type){

        case "SET_ALL_ROLES":
        {
            const {
                allRoles
            } = action.payload;

            return {
                ...state,
                allRoles
            };
        }
        default:
            return state;
    }
}
export default role;
