const initialState = {
    siderList:[],//当前权限下的菜单
    allMenus:[],//所有菜单不涉及权限
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
        case "SET_ALL_MENUS":
        {
            const {
                allMenus
            } = action.payload;

            return {
                ...state,
                allMenus
            };
        }
        default:
            return state;
    }
}
export default menu;
