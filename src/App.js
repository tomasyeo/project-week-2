
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import * as Forex from "./components/forex";
//import Dinero from "dinero.js";
import FormCurrency from './components/FormCurrency';

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [latestRates, setLatestRates] = useState([]);
    const [exchange, setExchange] = useState({});

    // Calls only 1 time at init.
    useEffect(() => {
        (async () => {
            setCurrencies(await Forex.getSupportedCurrencies(true));
            setLatestRates(await Forex.getLatestRates({from:'USD'}, true));
            //setExchange(await Forex.convert('USD', 'SGD', 1));
            setExchange(Forex.convert);
            //console.log("App (useEffect[]", objDinero.getAmount(), objDinero.getCurrency());
            //console.log('App (useEffect[])');
        })();
    }, []);


    // Monitor latestRates for changes.
    useEffect(() => {
        // Will set global exchange rate API parameters for all Dinero objects.
        (async () => {
            /*       Dinero.globalExchangeRatesApi = {
                    endpoint: new Promise(resolve => resolve(latestRates)),
                    propertyPath: 'rates.{{to}}'
                  } */
            // Initialize an objDinero to populate components.
            //setDinero(Dinero({ amount: 1}));
            //setDinero(await Dinero({ amount: 100}).convert('SGD', {endpoint: new Promise(resolve => resolve(latestRates))}));
            //objDinero = await Dinero({ amount: 100 }).convert('SGD', { endpoint: new Promise(resolve => resolve(latestRates)) });

            //console.log("App (useEffect[latestRates]", objDinero.getAmount(), objDinero.getCurrency());
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

                <h1>Curreny Converter</h1>

                <FormCurrency data={currencies} exchange={exchange} />

                <p className="lead"></p>
                <p className="lead"></p>
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


