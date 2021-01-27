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

export function formatDateTime(date){
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
}
