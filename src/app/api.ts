import { ConvertPayload, ConvertResponse, RatesPayload, RatesResponse, SymbolResponse } from "../types";

var myHeaders = new Headers();
myHeaders.append("apikey", "9Dd1RwO1N2I9by752dhzS8FOwVm7XoR1");

var requestOptions = {
  method: 'GET',
  headers: myHeaders
};

function api<T>(url: string): Promise<T> {
  return fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
}

export const convert = ({ to, from, amount }: ConvertPayload) => api<ConvertResponse>(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`)
  .then(response => response.result)
  .catch(error => console.log('error', error));

export const getSymbols = () => api<SymbolResponse>("https://api.apilayer.com/exchangerates_data/symbols")
  .then(response => response.symbols)
  .catch(error => console.log('error', error));

export const getLatest = (base: RatesPayload) => api<RatesResponse>(`https://api.apilayer.com/exchangerates_data/latest?base=${base}`)
  .then(response => response.rates)
  .catch(error => console.log('error', error));