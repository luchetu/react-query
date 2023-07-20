import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Docs, DocsState } from "../../types/docs.types";

const initialState: DocsState = {
    docs: [],
    isLoading: false,
    doc: null,
}

const docSlice = createSlice({
    name: 'doc',
    initialState: initialState,
    reducers: {
        addCase: (state, action: PayloadAction) => {
            state.docs = action.payload
        }
    }
})

export const addDoc = docSlice.actions;
export default docSlice.reducer;