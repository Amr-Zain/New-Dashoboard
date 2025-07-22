// AuthContext.js
import Cookies from 'js-cookie';
import { createContext, useState } from 'react';

const AuthContext = createContext<any>('');

const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('token') || null);

    const login = (token: any) => {
        localStorage.setItem('token', token);
        Cookies.set('token', token);
        setCurrentUser(token);
    };
    const user = (user: any) => {
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        Cookies.remove('token');
        setCurrentUser(null);
        localStorage.removeItem('permissions');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

// import { createContext, useEffect, useReducer } from "react";
// import AuthReducer from "./AuthReducer"

// const INITIAL_STATE = {
//   currentUser: localStorage.getItem("token") || null,
// };

// export const AuthContext = createContext(INITIAL_STATE);

// export const AuthContextProvider = ({ children }:any) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(state.currentUser));
//   }, [state.currentUser]);

//   return (
//     <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import Cookies from "js-cookie";
// import {

//   createContext,
//   useCallback,
//   useContext,
//   useMemo,
//   useState,
// } from "react";

// type User = {
//   [x: string]: any;
//   type: any;
//   // Define the type for the user object here.
//   // Modify it as per the actual structure of the user data.
//   // For example: id: string; name: string; email: string; etc.
// };

// // type AuthProviderProps = {
// //   children: ReactNode;
// // };

// type AuthContextType = {
//   user: User | null;
//   login: (data: User, token: string) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType>(
//   null as unknown as AuthContextType
// );

// export const AuthProvider = ({ children }: any) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = useCallback(async (data: User, token: string) => {
//     setUser(data);
//     Cookies.set("token", token);
//     window.localStorage.setItem("user", JSON.stringify(data));
//   }, []);

//   const logout = useCallback(async () => {
//     Cookies.remove("token");
//     window.localStorage.removeItem("user");
//     setUser(null);

//   }, []);

//   const value = useMemo(
//     () => ({
//       user,
//       login,
//       logout,
//     }),
//     [login, logout, user]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
