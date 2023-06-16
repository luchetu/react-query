import { StateCreator } from "zustand";
import { tokenStore } from "../../types";

export const createTokenSlice: StateCreator<tokenStore> = (set, get) => ({
    token: "",
    setToken: (tokenStr: string) => set((state) => ({ token: tokenStr })),
    clearToken: () => set((state) => ({ token: "" })),
})
