import store from './_store';
import {
  closeDialogAction,
  openDialogAction,
  openCreditsDialog,
  resetThemeModeAction,
  setThemeModeAction,
  toggleThemeModeAction,
} from './actions';
import { DialogKey } from './types';

jest.mock('./_store.ts', () => ({
  __esModule: true,
  default: {
    dispatch: jest.fn(),
  },
}));

describe('data/store/actions', () => {
  afterEach(jest.resetAllMocks);

  describe('closeDialog', () => {
    it('should dispatch action to close dialog', () => {
      // Act
      closeDialogAction();

      // Assert
      expect(store.dispatch).toHaveBeenCalled();
    });
  });

  describe('openDialog', () => {
    it('should dispatch action to open dialog', () => {
      // Arrange
      const dialog = { key: 'foo' as DialogKey, data: { foo: 'test', bar: 123 } };

      // Act
      openDialogAction(dialog);

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'dialog/dialogOpen',
        payload: dialog,
      });
    });
  });

  describe('openCreditsDialog', () => {
    it('should dispatch action to open credits dialog', () => {
      // Arrange
      const dialog = {
        key: DialogKey.CREDITS,
        data: {},
      };

      // Act
      openCreditsDialog();

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'dialog/dialogOpen',
        payload: dialog,
      });
    });
  });

  describe('toggleThemeMode', () => {
    it('should dispatch action to toggle light/dark mode', () => {
      // Act
      toggleThemeModeAction();

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'theme/toggleThemeMode',
        payload: undefined,
      });
    });
  });

  describe('resetThemeMode', () => {
    it('should dispatch action to reset light/dark mode to user preference', () => {
      // Act
      resetThemeModeAction();

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'theme/resetThemeMode',
        payload: undefined,
      });
    });
  });

  describe('setThemeMode', () => {
    it('should dispatch action to set light/dark mode to provided value', () => {
      // Act
      setThemeModeAction('light');

      // Assert
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'theme/setThemeMode',
        payload: 'light',
      });
    });
  });
});
