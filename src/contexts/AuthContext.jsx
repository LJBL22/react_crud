import { login, register } from 'api/auth';
import { createContext, useState } from 'react';
import * as jwt from 'jsonwebtoken';

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

//1. createContext
const AuthContext = createContext(defaultAuthContext);

//2. 在父層設定 context.Provider; 設定傳遞的 value，包含多個屬性的物件，每個屬性都代表了 AuthContext 中所需的狀態或方法
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        //避免 payload 為 null 的初始狀態
        //設置解析成功後會出現的值
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        //直接從 signUp page 取
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.username,
            password: data.password,
            email: data.email,
          });
          //將經過 jwtwebtoken 解析的 payload，儲存進 state
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};