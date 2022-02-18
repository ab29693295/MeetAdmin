import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
// import storageSession from 'redux-persist/lib/storage/session'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducers from './reducers/index'
const loggerMiddleware = createLogger()


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist:['user','menu'],
    stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};
const myPersistReducer = persistReducer(persistConfig, reducers)

const store = createStore(
    myPersistReducer,
    applyMiddleware(thunk, loggerMiddleware)
)
export default store
export const persistor = persistStore(store)

