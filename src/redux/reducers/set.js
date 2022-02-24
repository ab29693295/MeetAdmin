const initialState = {
    allRoles:[],//所有角色不涉及权限
    allProjects:[]//所有机构不涉及权限
};
const set=(state=initialState, action)=>{
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
        case "SET_ALL_PROJECTS":
        {
            const {
                allProjects
            } = action.payload;

            return {
                ...state,
                allProjects
            };
        }
        default:
            return state;
    }
}
export default set;
