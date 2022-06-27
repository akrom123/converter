import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Converter } from './app/components/converter/Converter';
import { Rates } from './app/components/rates/Rates';
import { Layout } from './app/components/layout/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Converter />} />
            <Route path="/rates" element={<Rates />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
