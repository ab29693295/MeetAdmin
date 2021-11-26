import {combineReducers} from 'redux'
import menu from './menu'
import tags from './tags'
import user from './user'
export default combineReducers({
    menu,
    tags,
    user
})
