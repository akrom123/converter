import React, { useCallback, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import styles from './Rates.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setBase, selectRatesState, getRates } from './ratesSlice';
import { fetchSymbols, selectConverterState } from '../converter/converterSlice';
import { List, ListItem, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export function Rates() {
  const { base, rates } = useAppSelector(selectRatesState)
  const { symbols } = useAppSelector(selectConverterState)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSymbols())
  }, [dispatch])
  useEffect(() => {
    getRates(base);
    const intervalID = setInterval(() => {
      dispatch(getRates(base));
    }, 15000)
    return () => clearInterval(intervalID)
  }, [base, dispatch])
  const handleChange = useCallback((e: SelectChangeEvent<string>) => {
    dispatch(setBase(e.target.value));
  }, [dispatch])

  return (
    <div className="exchange">
      <Paper sx={{ p: 2 }} className={styles.container}>
        <Select
          onChange={handleChange}
          value={base}
          label="Базовая валюта"
          variant="outlined"
        >
          {Object.keys(symbols).map(key => <MenuItem value={key} key={key}>
            {key}</MenuItem>)}
        </Select>
        <strong>
          <List>
            {Object.keys(rates).map(key => <ListItem disablePadding key={key}>
              <ListItemText primary={`${key} -> ${rates[key]} ${base}`} />
            </ListItem>)}
          </List>
        </strong>
      </Paper>

    </div>
  );
}
