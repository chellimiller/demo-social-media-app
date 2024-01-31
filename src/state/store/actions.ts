// Actions are bound to the store to avoid Redux-specific concerns outside the module.
import store from './_store';
import { DialogKey, DialogState, ThemeState } from './types';
import { setThemeMode, resetThemeMode, toggleThemeMode } from './theme.slice';
import { dialogOpen, dialogClose } from './dialog.slice';

export function closeDialogAction(): void {
  // @ts-ignore
  store.dispatch(dialogClose());
}

export function openDialogAction(payload: Exclude<DialogState, null>): void {
  store.dispatch(dialogOpen(payload));
}

export function openCreditsDialog(): void {
  store.dispatch(dialogOpen({ key: DialogKey.CREDITS, data: {} }));
}

export function toggleThemeModeAction(): void {
  store.dispatch(toggleThemeMode());
}

export function resetThemeModeAction(): void {
  store.dispatch(resetThemeMode());
}

export function setThemeModeAction(mode: ThemeState['mode']): void {
  store.dispatch(setThemeMode(mode));
}
