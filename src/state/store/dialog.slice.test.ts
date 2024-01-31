import store from './_store';
import { dialogOpen, dialogClose } from './dialog.slice';

describe('Dialog state tests', () => {
  it('Should be initialized with state', () => {
    // Arrange
    const state = store.getState().dialog;

    // Assert
    expect(state).toBeNull();
  });

  it('Should be return dialog data', () => {
    // Arrange
    const payload = {
      key: '123',
      data: 'foo',
    };
    const result = {
      type: 'dialog/dialogOpen',
      payload: { key: '123', data: 'foo' },
    };

    // Act
    const testResult = store.dispatch(dialogOpen(payload));

    // Assert
    expect(testResult).toEqual(result);
  });

  it('Should return state if payload === state', () => {
    // Arrange
    const payload = { key: '123', data: 'foo' };
    const result = {
      type: 'dialog/dialogOpen',
      payload: store.getState().dialog,
    };

    // Act
    const testResult = store.dispatch(dialogOpen(payload));

    // Assert
    expect(testResult).toEqual(result);
  });

  it('Should return null on dialogClose call', () => {
    // Arrange
    const payload = null;
    const result = {
      type: 'dialog/dialogClose',
      payload: null,
    };

    // Act
    const testResult = store.dispatch(dialogClose(payload));

    // Assert
    expect(testResult).toEqual(result);
  });
});

