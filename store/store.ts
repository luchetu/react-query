import { configureStore } from '@reduxjs/toolkit';
import docReducer from '../features/docs/docSlice'
import caseReducer from '../features/docs/docSlice'


export const store = configureStore({
    reducer: {
        docs: docReducer,
        cases: caseReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
