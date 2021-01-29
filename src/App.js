import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import RouteIndex from "./route";
import {Provider} from 'react-redux'
import store from './redux/store'
import {ConfigProvider } from 'antd'; // 引入ConfigProvider全局化配置
import zhCN from 'antd/es/locale/zh_CN';
function App() {
  return (
      <ConfigProvider locale={zhCN}>
      <Provider store={store} >
      <Router>
        <div>
          <RouteIndex />
        </div>
      </Router>
      </Provider>
      </ConfigProvider>
  );
}

export default App;
