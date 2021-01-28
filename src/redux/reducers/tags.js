const initialState = {
    tagList:[]
};
const tags=(state=initialState,action)=>{
    switch (action.type){
        case "ADD_TAGS":
        {

            return {
                ...state,
                tagList:[...state.tagList,action.playload]
            };
        }
        case 'CUT_TAG':
            return {
                ...state,
                tagList: [...state.tagList.filter(ele=>ele.path!==action.playload)]
            }

        default:
            return state;
    }
}

export default tags;
