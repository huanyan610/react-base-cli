import Cookies from 'js-cookie';
//localStorage存值
export function localSetItem(str: string, obj: any) {
  localStorage.setItem(str, JSON.stringify(obj));
}
//localStorage取值
export function localGetItem(str: string) {
  return localStorage.getItem(str) ? JSON.parse(localStorage.getItem(str) as string) : undefined;
}
//localStorage删除指定键对应的值
export function localRemoveItem(str: string) {
  localStorage.removeItem(str);
}
//sessionStorage存值
export function sessionSetItem(str: string, obj: any) {
  sessionStorage.setItem(str, JSON.stringify(obj));
}
//sessionStorage取值
export function sessionGetItem(str: string) {
  return sessionStorage.getItem(str)
    ? JSON.parse(sessionStorage.getItem(str) as string)
    : undefined;
}
//sessionStorage删除指定键对应的值
export function sessionRemoveItem(str: string) {
  sessionStorage.removeItem(str);
}

export function cookiesGetItem(str: string) {
  return Cookies.get(str) !== 'undefined' && Cookies.get(str)
    ? JSON.parse(Cookies.get(str) as string)
    : undefined;
}

export function cookiesSetItem(str: string, obj: any) {
  return Cookies.set(str, JSON.stringify(obj));
}

export function cookiesRemoveItem(str: string) {
  return Cookies.remove(str);
}
