import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import converterReducer from './components/converter/converterSlice';
import ratesReducer from './components/rates/ratesSlice';

export const store = configureStore({
  reducer: {
    converter: converterReducer,
    rates: ratesReducer,
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
