const tokenKey = import.meta.env.VITE_APP_TOKEN_KEY;

export function getToken() {
  return localStorage.getItem(tokenKey);
}

export function setToken(token) {
  return localStorage.setItem(tokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(tokenKey);
}
