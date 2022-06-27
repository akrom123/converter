import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Paper } from '@mui/material';
import styles from './Converter.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { convertValue, fetchSymbols, selectConverterState, setAmount } from './converterSlice';

export function Converter() {
  const { amount, result, symbols, status } = useAppSelector(selectConverterState)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSymbols())
  }, [dispatch])
  const [hasError, setHasError] = useState<boolean>(false)
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    dispatch(setAmount(amount));
    if (!/^\d*\.?\d+ \w+ in \w+$/.test(amount)) {
      setHasError(true);
      return;
    }
    const [value, to, _in, from] = amount.split(' ')
    if (symbols[from.toUpperCase()] && symbols[to.toUpperCase()]) {
      setHasError(false);
      dispatch(convertValue({ from, to, amount: value }))
      return;
    }
    setHasError(true);
  }, [ symbols, dispatch])

  return (
    <div className="exchange">
      <Paper sx={{ p: 2 }} className={styles.container}>
        <TextField error={hasError} onChange={handleChange} value={amount} label="Введите значение" variant="outlined"
          helperText="Пример: 1 usd in rub" />
        <strong>
          {status === 'loading' ? 'Loading...' : result}
        </strong>
      </Paper>

    </div>
  );
}
