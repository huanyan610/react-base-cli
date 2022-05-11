//localStorage存值
export function localSetItem(str, obj) {
  localStorage.setItem(str, JSON.stringify(obj));
}
//localStorage取值
export function localGetItem(str) {
  let localGetData = JSON.parse(localStorage.getItem(str));
  console.log(typeof localGetData);
  return localGetData;
}
//localStorage删除指定键对应的值
export function localRemoveItem(str) {
  localStorage.removeItem(str);
}
//sessionStorage存值
export function sessionSetItem(str, obj) {
  sessionStorage.setItem(str, JSON.stringify(obj));
}
//sessionStorage取值
export function sessionGetItem(str) {
  let sessionGetData = JSON.parse(sessionStorage.getItem(str));
  console.log(sessionGetData);
  return sessionGetData;
}
//sessionStorage删除指定键对应的值
export function sessionRemoveItem(str) {
  sessionStorage.removeItem(str);
}
