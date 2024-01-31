import store from './_store';
import { setThemeMode, resetThemeMode, toggleThemeMode } from './theme.slice';

describe('Theme state tests', () => {

  it('Should be initialized with user`s preference', () => {
    // Act
    const state = store.getState().persistedReducers.theme;

    // Assert
    expect(state.mode).toEqual('dark');
  });

  it('Should change theme mode in state', () => {
    // Act
    store.dispatch(setThemeMode('light'));
    const state = store.getState().persistedReducers.theme;

    // Assert
    expect(state.mode).toEqual('light');
  });

  it('Should reset theme to window theme mode', () => {
    // Arrange
    store.dispatch(setThemeMode('light'));

    // Act
    store.dispatch(resetThemeMode());
    const state = store.getState().persistedReducers.theme;

    // Assert
    expect(state.mode).toEqual('dark');
  });

  it('Should toggle theme mode', () => {
    // Arrange
    store.dispatch(setThemeMode('light'));

    // Act
    store.dispatch(toggleThemeMode());
    const state = store.getState().persistedReducers.theme;

    // Assert
    expect(state.mode).toEqual('dark');
  })
})
