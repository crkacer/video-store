import { Action } from "@ngrx/store";

export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";

const initialState = {
    authorized: false
};

export function authReducer(state: object = initialState, action: Action) {
    switch (action.type) {
        case LOGGED_IN:
            return { ...state, authorized: true };
        case LOGGED_OUT:
            return { ...state, authorized: false };
        default:
            return state;
    }
}