import { ILoginSuccess } from "types/loginTypes";

export type ActionAddSession = {
  type: "ADD_SESSION";
  payload: ILoginSuccess;
};
export type ActionRemoveSession = {
  type: "REMOVE_SESSION";
};
export type ActionLoadingSession = {
  type: "LOADING";
};

export type SessionAction =
  | ActionAddSession
  | ActionRemoveSession
  | ActionLoadingSession;
export type SessionDispatch = (action: SessionAction) => void;
export type SessionState = {
  user: ILoginSuccess["user"] | null;
  token: ILoginSuccess["token"] | null;
  status: "authenticated" | "loading" | "unauthenticated";
};
export type SessionCache = {
  state: SessionState | null;
};
