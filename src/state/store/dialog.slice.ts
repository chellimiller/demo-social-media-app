import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { DialogState } from './types';

const initialState: DialogState = null;

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: initialState,
  /** @todo These reducers don't alter state currently - not sure what the plan is here */
  reducers: {
    // @ts-ignore
    dialogOpen: (state, action: PayloadAction<Exclude<DialogState, null>>) => {
      if (isEqual(state, action.payload)) return state;
      return action.payload;
    },
    dialogClose: (state) => {
      return null;
    },
  },
});

export const { dialogOpen, dialogClose } = dialogSlice.actions;

export default dialogSlice.reducer;
