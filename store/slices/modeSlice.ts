import { StateCreator } from "zustand";
import { ModeStore } from "../../types"

export const createModeSlice: StateCreator<ModeStore> = (set, get) => ({
    mode: "Light",
    toggleMode: () => set((state) => ({ mode: state.mode === "Light" ? "Dark" : "Light" }))
})

