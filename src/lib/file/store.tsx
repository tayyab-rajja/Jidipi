import {FileType} from "./action";
import {AnyAction, createStore} from "redux";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import {fileReducer} from "./reducer";


// create a makeStore function
export const fileStore = () => createStore(fileReducer);

// export an assembled wrapper
export const fileWrapper = createWrapper(fileStore, {debug: true});