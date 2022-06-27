import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConvertPayload, CurrencySymbols } from '../../../types';
import { convert, getSymbols } from '../../api';
import { RootState } from '../../../app/store';

export interface ConverterState {
  symbols: CurrencySymbols
  amount: string
  result?: number
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ConverterState = {
  symbols: {},
  amount: '',
  result: undefined,
  status: 'idle',
};

export const fetchSymbols = createAsyncThunk(
  'converter/fetchSymbols',
  async () => {
    const data = await getSymbols();
    return data as CurrencySymbols;
  }
);

export const convertValue = createAsyncThunk(
  'converter/convertValue',
  async (payload: ConvertPayload) => {
    const data = await convert(payload);
    return data;
  }
);

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSymbols.fulfilled, (state, action) => {
        state.symbols = action.payload;
      })
      .addCase(convertValue.pending, (state) => {
        state.status = 'loading';
        state.result = undefined;
      })
      .addCase(convertValue.fulfilled, (state, action) => {
        state.status = 'idle';
        state.result = action.payload!;
      })
      .addCase(convertValue.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setAmount } = converterSlice.actions;

export const selectConverterState = (state: RootState) => state.converter;

export const selectSymbols = (state: RootState) => state.converter.symbols;


export default converterSlice.reducer;
