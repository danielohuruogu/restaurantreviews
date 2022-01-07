
// thiefed this straight from Bench project

import { SELECT_PD, CLEAR_SELECTION } from "./SearchResultTypes";

export const initialState = {
    pd: [],
    selection: null,
};

export function SearchResultReducer(state, action) {
    // action gets passed through on modal click
    switch (action.type) {
        case SELECT_PD: // specific modal selection
            return { ...state, selection: action.payload };
        case CLEAR_SELECTION: // clear selection
            return { ...state, selection: null };
        default:
            return state;
    }
}