import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RatesPayload, Rates } from '../../../types';
import { getLatest } from '../../api';
import { RootState } from '../../store';

export interface RatesState {
  base: string
  rates: Rates
  status: 'idle' | 'loading' | 'failed';
}

const initialState: RatesState = {
  base: 'RUB',
  rates: {},
  status: 'idle',
};

export const getRates = createAsyncThunk(
  'rates/convertValue',
  async (payload: RatesPayload) => {
    const data = await getLatest(payload);
    return data;
  }
);

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setBase: (state, action: PayloadAction<string>) => {
      state.base = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRates.fulfilled, (state, action) => {
        state.status = 'idle';
        state.rates = action.payload!;
      })
      .addCase(getRates.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setBase } = ratesSlice.actions;

export const selectRatesState = (state: RootState) => state.rates;


export default ratesSlice.reducer;
