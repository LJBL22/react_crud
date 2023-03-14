import { checkPermission, login, register } from 'api/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

//1. createContext
const AuthContext = createContext(defaultAuthContext);
//將 useContext 包裝在函式中 i.e. 在 useAuth 內部使用 useContext hook。useAuth 是一個自定義 hook
export const useAuth = () => useContext(AuthContext);
//2. 在父層設定 context.Provider; 設定傳遞的 value，包含多個屬性的物件，每個屬性都代表了 AuthContext 中所需的狀態或方法
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();
  useEffect(() => {
    const checkTokenIsValid = async () => {
      //確認憑證是否存在
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      //如果存在，確認憑證是否有效（可能不一致、也可能過期）
      const result = await checkPermission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
    //相依
  }, [pathname]);
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
          //將經過 jwtWebToken 解析的 payload，儲存進 state
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
