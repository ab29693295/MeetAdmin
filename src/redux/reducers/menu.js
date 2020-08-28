const initialState = {
    siderList:[]
};
const menu=(state=initialState,action)=>{
    switch (action.type){
        case "SET_SIDER_MENU":
        {
            const {
                siderList
            } = action.payload;

            return {
                ...state,
                siderList
            };
        }
        default:
            return state;
    }
}
export default menu;
