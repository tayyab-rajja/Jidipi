import { createContext, useReducer, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

import {
  SessionAction,
  SessionCache,
  SessionDispatch,
  SessionState,
} from "./types";
import { TOKEN } from "../../constant/login";
import { ILoginSuccess, IUserFromToken } from "types/loginTypes";

const setDefaultAuthHeaders = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const setInterceptor = (cb: VoidFunction) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        cb();
        Cookies.remove(TOKEN);
        return error;
      }
      return error;
    }
  );
};

const AuthContext = createContext<SessionState | undefined>(undefined);
const AuthDispatchContext = createContext<SessionDispatch | undefined>(
  undefined
);
const cache: SessionCache = {
  state: null,
};

const initialState: SessionState = {
  user: null,
  token: null,
  status: "unauthenticated",
};

// State reducer
const SessionReducer = (
  state: SessionState = initialState,
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case "ADD_SESSION": {
      return { ...action.payload, status: "authenticated" };
    }
    case "REMOVE_SESSION": {
      return { ...initialState };
    }
    case "LOADING": {
      return {
        ...state,
        status: "loading",
      };
    }
    default:
      return state;
  }
};
const getToken = async () => {
  const token = await Cookies.get(TOKEN);
  return token;
};

// Context provider
export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    SessionReducer,
    cache.state || initialState
  );
  cache.state = state;

  const getSessionOnInitLoad = async () => {
    setInterceptor(() => {
      dispatch({ type: "REMOVE_SESSION" });
    });
    const token = await getToken();

    if (!token) {
      return;
    }
    const decodedJwt: {
      exp: number;
      iat: number;
      user: IUserFromToken;
    } = jwtDecode(token);
    setDefaultAuthHeaders(token);

    dispatch({
      type: "ADD_SESSION",
      payload: { token, user: decodedJwt.user },
    });
  };

  useEffect(() => {
    getSessionOnInitLoad();
  }, []);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

// Context hooks
export const useAuth = () => {
  const state = useContext(AuthContext);
  const dispatch = useContext(AuthDispatchContext);

  if (state === undefined || dispatch === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  const setSession = (response: ILoginSuccess) => {
    Cookies.set(TOKEN, response.token);
    setDefaultAuthHeaders(response.token);
    dispatch({ type: "ADD_SESSION", payload: response });
  };

  const removeSession = () => {
    Cookies.remove("token");
    dispatch({ type: "REMOVE_SESSION" });
  };

  const setLoading = () => {
    dispatch({ type: "LOADING" });
  };
  return { session: state, setSession, removeSession, setLoading };
};
