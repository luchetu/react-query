import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TokenStore, ModeStore } from '../types';
import { createTokenSlice } from './slices/tokenSlice';
import { createModeSlice } from './slices/modeSlice';

export const useStore = create<TokenStore & ModeStore>()(
  persist(
    (set, get) => ({
      ...createTokenSlice(set, get),
      ...createModeSlice(set, get),
    }),
    {
      name: 'token-and-mode-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);