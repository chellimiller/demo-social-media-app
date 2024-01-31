import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState } from './types';

const isDarkMode = () => {
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const initialThemeState: ThemeState = {
  mode: isDarkMode() ? 'dark' : 'light',
};

/**
 * function to create an initial state and the asscociated reducers
 */
export const themeSlice = createSlice({
  name: 'theme',
  initialState: { ...initialThemeState },
  reducers: {
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
    },
    resetThemeMode: (state) => {
      state.mode = initialThemeState.mode;
    },
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    }
  },
});

export const { setThemeMode, resetThemeMode, toggleThemeMode } = themeSlice.actions;

export default themeSlice.reducer;