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
      }
      return error;
    }
  );
};

const SessionContext = createContext<SessionState | undefined>(undefined);
const SessionDispatchContext = createContext<SessionDispatch | undefined>(
  undefined
);
const cache: SessionCache = {
  state: null,
};

const initialState: SessionState = { user: null, token: null };

// State reducer
const SessionReducer = (
  state: SessionState = initialState,
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case "ADD_SESSION": {
      return { ...action.payload };
    }
    case "REMOVE_SESSION": {
      return initialState;
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
export const SessionProvider: React.FC = ({ children }) => {
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
    <SessionDispatchContext.Provider value={dispatch}>
      <SessionContext.Provider value={state}>
        {children}
      </SessionContext.Provider>
    </SessionDispatchContext.Provider>
  );
};

// Context hooks
export const useSession = () => {
  const state = useContext(SessionContext);
  const dispatch = useContext(SessionDispatchContext);

  if (state === undefined || dispatch === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
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

  return { session: state, setSession, removeSession };
};
