import {createContext, useReducer, useContext, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import {Cookies} from "react-cookie";
import {loadUserFromLocalStorage, User} from "../lib/user/action";
import {useDispatch} from "react-redux";

const cookies = new Cookies();
export const GlobalUser: any = {};

const setDefaultAuthHeaders = (token: string) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    GlobalUser.token = token;
    console.log('setDefaultAuthHeaders', token);
};

const setInterceptor = (cb: VoidFunction) => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                cb();
                cookies.remove("token");
                return error;
            }
            return error;
        }
    );
};


// Context provider
export const UserProvider: React.FC = ({children}) => {
    const dispatch = useDispatch();
    // const [user,SetUser] = useState<User|undefined>(undefined);
    const token =   cookies.get('token');
    const user =   cookies.get('user');

    const u = token?{user,token,roles:[]}:{user:undefined,token:undefined,roles:[]}
    return (
        <UserContext.Provider value={u}>
            {children}
        </UserContext.Provider>
    );
};
//User IUserFromToken
export const UserContext =  createContext<User | undefined>(undefined);