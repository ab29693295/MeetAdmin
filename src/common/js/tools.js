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
