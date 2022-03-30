export function setStorage(key,value,time){
    let data = { value: value, expirse: new Date(time).getTime() };
    localStorage.setItem(key, JSON.stringify(data));
}
export function getStorage(key) {
    let data = JSON.parse(localStorage.getItem(key));
    if (data !== null) {
        if (data.expirse != null && data.expirse < new Date().getTime()) {
            localStorage.removeItem(key);
        } else {
            return data.value;
        }
    }
    return null;
}
export function removeStorage(key){
    let data = JSON.parse(localStorage.getItem(key));
    if(data!=null){
        localStorage.removeItem(key);
    }
}

export function formatDateTime(timestamp,formats='Y/m/d H:i:s'){
    if (typeof (timestamp) == 'undefined') {
        return ''
    } else {

        let zero = function (value) {
            if (value < 10) {
                return '0' + value;
            }
            return value;
        };

        let myDate = timestamp ? new Date(timestamp) : new Date();

        let year = myDate.getFullYear();
        let month = zero(myDate.getMonth() + 1);
        let day = zero(myDate.getDate());

        let hour = zero(myDate.getHours());
        let minite = zero(myDate.getMinutes());
        let second = zero(myDate.getSeconds());

        return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
            return ({
                Y: year,
                m: month,
                d: day,
                H: hour,
                i: minite,
                s: second
            })[matches];
        });
    }
}
/**
 *  获取url参数
 */
export  function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) {
        return decodeURIComponent(r[2]);
    } else {
        return null;
    }
}