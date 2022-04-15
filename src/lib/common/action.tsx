import {Action} from "redux";

export interface ErrorAction extends Action {
    type: string
    payload?: Error
}