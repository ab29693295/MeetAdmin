import  menus  from '@/config/menu.config'

export const addTags = playload => (dispatch, getState) =>{
    const currentTagList = getState().tags.tagList
    if (currentTagList.filter(ele=>ele.path ===playload).length) return

    // 如果当前taglist数量>=10,先删除第一个tag，再添加，taglist最多只有10个成员
    if (currentTagList.length >= 10) {
        dispatch(cutTag(currentTagList[0].path))
    }

    function handleDispatch(obj){
        dispatch({
            type: 'ADD_TAGS',
            playload: obj
        })
    }
    menus.forEach(ele=>{
        if(ele.path===playload) {
            handleDispatch(ele)
        }else if(ele.children){
            ele.children.forEach(ele2=>{
                if(ele2.path===playload){
                    handleDispatch(ele2)
                }
            })
        }
    })
}
export const cutTag = playload => ({
    type: "CUT_TAG",
    playload
})
