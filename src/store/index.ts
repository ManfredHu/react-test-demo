import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/counter/store/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
