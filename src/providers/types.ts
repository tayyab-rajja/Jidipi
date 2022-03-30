import { ILoginSuccess } from "types/loginTypes";

export type ActionAddSession = {
  type: "ADD_SESSION";
  payload: ILoginSuccess;
};
export type ActionRemoveSession = {
  type: "REMOVE_SESSION";
};

export type SessionAction = ActionAddSession | ActionRemoveSession;
export type SessionDispatch = (action: SessionAction) => void;
export type SessionState = {
  user: ILoginSuccess["user"] | null;
  token: ILoginSuccess["token"] | null;
};
export type SessionCache = {
  state: SessionState | null;
};
