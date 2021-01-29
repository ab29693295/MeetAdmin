import dev from  './path/dev.js';
import test from  './path/test.js';
import rd from  './path/rd.js';
import pro from  './path/pro.js';
const api={
    "dev":dev,
    "test":test,
    "rd":rd,
    "pro":pro,
};

export default api[process.env.REACT_APP_SECRET_BUILD_TYPE]
