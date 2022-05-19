import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '@/page/Counter/store/counterSlice';
import postsReducer from '@/page/Posts/store/postSlice';
import usersReducer from '@/page/Users/store';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
