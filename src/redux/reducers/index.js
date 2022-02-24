import {combineReducers} from 'redux'
import menu from './menu'
import tags from './tags'
import user from './user'
import role from './role'
export default combineReducers({
    menu,
    tags,
    user,
    role
})
