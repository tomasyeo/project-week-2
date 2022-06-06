import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import * as Forex from "./components/forex";
import Dinero from "dinero.js";
import SelectCurrency from './components/SelectCurrency';
import FormCurrency from './components/FormCurrency';


function App() {
  const [currencies, setCurrencies] = useState([]);
  const [latestRates, setLatestRates] = useState([]);
  const [objDinero, setDinero] = useState(Dinero({'amount': 0}));


  // Calls only 1 time at init.
  useEffect(() => {
    (async () => {
      setCurrencies(await Forex.getSupportedCurrencies(true));
      setLatestRates(await Forex.getLatestRates('EUR', true));
      console.log('useEffect[]');
    })();
  }, []);


  // Monitor latestRates for changes.
  useEffect(() => {
    // Will set global exchange rate API parameters for all Dinero objects.
    (async () => {
      Dinero.globalExchangeRatesApi = {
        endpoint: new Promise(resolve => resolve(latestRates)),
        propertyPath: 'rates.{{to}}'
      }
      // Initialize an objDinero to populate components.
      setDinero(await Dinero({ amount: 1}).convert('SGD'));
      //let d = await Dinero({ amount: 100}).convert('SGD');
      //console.log(d.getAmount());
      //console.log(JSON.stringify(mock_rates.rates));
    })();

    //console.log(Dinero.globalExchangeRatesApi)

  }, [latestRates]);


  return (
    <>
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">Cover</h3>
        </div>
      </header>

      <main className="px-3">

        <h1>Cover your page.</h1>

        <FormCurrency data={currencies} dinero={objDinero} />

        <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
        <p className="lead">
          <a href="#" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
        </p>
      </main>

      <footer className="mt-auto text-white-50">
        <p>Cover template for <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" className="text-white">@mdo</a>.</p>
      </footer>


    </>
  )

}
/* <div>{JSON.stringify(currencies)}</div>
<div>{JSON.stringify(latestRates)}</div> */

export default App;


