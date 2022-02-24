import {combineReducers} from 'redux'
import menu from './menu'
import tags from './tags'
import user from './user'
import set from './set'
export default combineReducers({
    menu,
    tags,
    user,
    set
})
