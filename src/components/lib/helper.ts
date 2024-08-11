import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export const isLoggedIn = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  if (token != null) {
    const decoded = jwtDecode<JwtPayload>(token);
    const expirationDate = decoded.exp
      ? new Date(decoded.exp * 1000)
      : new Date();
    // Check if token is expired
    if (expirationDate > new Date()) {
      return true;
    }
  } else return false;
};

interface JwtPayload extends DefaultJwtPayload {
  User_type?: string;
  Email?: string;
  Name?: string;
  Uid?: string;
  exp?: number;
}

export const getRole = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  if (token != null) {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.User_type;
  }
  return null;
};

export const isUser = () => {
  const role = getRole();
  return role === "user";
};

export const isSuperAdmin = () => {
  const role = getRole();
  return role === "superadmin";
};
