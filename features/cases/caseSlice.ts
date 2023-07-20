import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaseState } from "../../types/index";


const initialState: CaseState = {
    cases: [],
    isLoading: false,
    case: null,
}


const caseSlice = createSlice({
    name: 'case',
    initialState: initialState,
    reducers: {
        addCase: (state, action: PayloadAction) => {
            state.cases = action.payload
        }
    }
})

export const addCase = caseSlice.actions;
export default caseSlice.reducer;