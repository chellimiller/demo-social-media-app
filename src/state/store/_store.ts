import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AppState } from './types';

import { default as themeReducer } from './theme.slice'
import { default as dialogReducer } from './dialog.slice'

const SetTransform = createTransform(
  /**
   * transform state on its way to being serialized and persisted.
   */
  (inboundState: AppState, key) => {
    return { ...inboundState };
  },

  /** 
   * transform state being rehydrated. 
   */
  (outboundState: AppState, key) => {
    return { ...outboundState };
  },

  /** 
   * define which reducers this transform gets called for.
   */
  { whitelist: ['theme'] }
);

const themeSliceConfig = {
  key: 'theme',
  storage,
  transforms: [SetTransform],
};

/**
 * Any reducers added to this object will be saved to local or session storage.
 * as defined in the slice config file.
 */
const persistedReducers = combineReducers({
  theme: persistReducer(themeSliceConfig, themeReducer),
});

const store = configureStore({
  reducer: {
    persistedReducers,
    dialog: dialogReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export default store;
