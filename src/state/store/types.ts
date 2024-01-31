import { Action, PayloadAction } from '@reduxjs/toolkit';

export type EqualityChecker<T> = (a: T, b: T) => boolean;

export enum DialogKey {
  CREDITS = 'credits',
}

type BaseDialogState<K extends DialogKey, D = unknown> = { key: K; data: D };

// This could be modified to be a union type for stricter type validation.
export type DialogState = null | BaseDialogState<DialogKey.CREDITS>;

export type DialogAction =
  | Action<'dialog/close'>
  | PayloadAction<Exclude<DialogState, null>, 'dialog/open'>;

export interface ThemeState {
  mode: 'light' | 'dark';
}

export type ThemeAction =
  | Action<'theme/mode/toggle'>
  | Action<'theme/mode/reset'>
  | PayloadAction<ThemeState['mode'], 'theme/mode/set'>;

export type AppState = {
  persistedReducers: {
    theme: ThemeState;
  }
  dialog: DialogState;
};

export type AppAction = ThemeAction | DialogAction;
