// import { apiUrl } from "../config.json";
import JwtDecode from "jwt-decode";
import { toast } from "react-toastify";

//const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";
const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.oFHBG72UhlhMkuZ7mrcAVazGoajttB9k06OHWC9sXFg";

export async function login(email, password) {
  const invalid = "Invalid";
  //const { data: consumer } = await http.post(apiEndpoint, { email, password });
  if (!(email === "admin@gmail.com" && password === "admin")) throw invalid;
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  toast("logged out sucessfully !");
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return JwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
};
