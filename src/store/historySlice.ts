
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Position {
  x: number;
  y: number;
}

interface HistoryAction {
  id: string;
  type: 'color' | 'fontSize' | 'position';
  prevValue: string | number | Position;
  newValue: string | number | Position;
}

interface HistoryState {
  past: HistoryAction[];
  future: HistoryAction[];
}

const initialState: HistoryState = {
  past: [],
  future: []
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToPast: (state, action: PayloadAction<HistoryAction>) => {
      state.past.push(action.payload);
      state.future = [];
    },
    undo: (state) => {
      const previous = state.past[state.past.length - 1];
      if (previous) {
        state.past = state.past.slice(0, -1);
        state.future.unshift(previous);
      }
    },
    redo: (state) => {
      const next = state.future[0];
      if (next) {
        state.future = state.future.slice(1);
        state.past.push(next);
      }
    }
  }
});

export const { addToPast, undo, redo } = historySlice.actions;

export default historySlice.reducer;
