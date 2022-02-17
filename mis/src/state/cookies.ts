export interface Cookie {
  key: string;
  value: string;
}

export const setCookie = (cookie: Cookie) => {
  const cookieString = `${cookie.key}=${cookie.value}`;
  document.cookie = cookieString;
};

export const getCookie = (cookie: string): Cookie[] => {
  return parseCookie(cookie);
};

const parseCookie = (cookie: string): Cookie[] => {
  return cookie
    .split(';')
    .map<string[]>((kv) => kv.split('='))
    .reduce<Array<Cookie>>((acc, kv) => {
      const cookie = <Cookie>{
        key: decodeURIComponent(kv[0]),
        value: decodeURIComponent(kv[1]),
      };
      acc.push(cookie);
      return acc;
    }, Array<Cookie>());
};
