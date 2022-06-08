
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import * as Forex from "./components/forex";
//import Dinero from "dinero.js";
import FormCurrency from './components/FormCurrency';

function App() {
    const defaultValue = { from: 'USD', to: 'SGD', amount: 1 };

    const [currencies, setCurrencies] = useState([]);
    //const [latestRates, setLatestRates] = useState([]);
    const [exchange, setExchange] = useState(defaultValue);

    // Calls only 1 time at init.
    useEffect(() => {
        (async () => {
            setCurrencies(await Forex.getSupportedCurrencies(true));
            setExchange(await Forex.convert(defaultValue));
            //setLatestRates(await Forex.getLatestRates({ from: 'USD' }, true));
            //console.log('App (useEffect[])');
        })();
    }, []);

    function handleUpdate({from, to, amount}) {
        (async () => {
            setExchange(await Forex.convert({from, to, amount}));
        })();
        //console.log(exchange);
    }

    return (
        <>
            <header className="mb-auto">
                <div>
                    <h3 className="float-md-start mb-0">Curreny Converter</h3>
                </div>
            </header>

            <main className="px-3">
                {/* <h1>Curreny Converter</h1> */}
                <FormCurrency currencies={currencies} exchange={exchange} func={handleUpdate} />
            </main>

            <footer className="mt-auto text-white-50">
                <p>This app uses the <a className="text-white" href='https://www.frankfurter.app/' target='_blank' rel="noreferrer">Frankfurter API</a>. It tracks foreign exchange references rates published by the <a className="text-white" href='https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html' target='_blank' rel="noreferrer">European Central Bank</a>. The data refreshes around 16:00 CET every working day. </p>
            </footer>
        </>
    )
}

export default App;
