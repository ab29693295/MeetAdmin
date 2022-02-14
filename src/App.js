import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import RouteIndex from "./route";
import {Provider} from 'react-redux'
import store from './redux/store'
import {persistor} from './redux/store'
import {PersistGate} from 'redux-persist/lib/integration/react';
import {ConfigProvider } from 'antd'; // 引入ConfigProvider全局化配置
import zhCN from 'antd/es/locale/zh_CN';
function App() {
    return (
        <ConfigProvider locale={zhCN} >
            <Provider store={store} >
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <div>
                            <RouteIndex />
                        </div>
                    </Router>
                </PersistGate>
            </Provider>
        </ConfigProvider>
    );
}

export default App;
