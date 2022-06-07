
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import * as Forex from "./components/forex";
//import Dinero from "dinero.js";
import FormCurrency from './components/FormCurrency';

function App() {
    const [currencies, setCurrencies] = useState([]);
    //const [latestRates, setLatestRates] = useState([]);
    const [exchange, setExchange] = useState({ from: 'USD', to: 'SGD', amount: 1 });
    const [result, setResult] = useState({ base: 'USD', amount: 0, rates: 0, target: 'SGD' });


    // Calls only 1 time at init.
    useEffect(() => {
        (async () => {
            setCurrencies(await Forex.getSupportedCurrencies(true));
            setExchange({ from: 'USD', to: 'SGD', amount: 1 });
            setResult(await Forex.convert('USD', 'SGD', 1));
            //setLatestRates(await Forex.getLatestRates({ from: 'USD' }, true));
            //console.log('App (useEffect[])');
        })();
    }, []);

    function handleUpdate(base, target, amount) {
        setExchange({ from: base, to: target, amount: amount });
        (async () => {
            setResult(await Forex.convert(base, target, amount));
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
            <p className="lead">Proin dignissim, iaculis imperdiet proin tellus duis per porttitor. Magnis ridiculus maecenas mus euismod gravida iaculis dolor odio habitant. Urna primis habitasse enim ad risus ipsum dictumst phasellus. Sem augue turpis ante, vel libero cras litora vulputate. Conubia fames, ultrices commodo sit blandit proin. Tempor a euismod torquent justo, habitant lacinia et. Consequat vehicula pretium orci blandit lacinia morbi enim facilisis vulputate urna imperdiet. Malesuada ullamcorper rutrum sociis ultricies placerat, aliquet enim.</p>
                {/* <h1>Curreny Converter</h1> */}
                <FormCurrency currencies={currencies} exchange={exchange} result={result} func={handleUpdate} />
                
                <p className="lead">Justo fusce dictum vestibulum nibh nisi mollis pretium etiam venenatis est sollicitudin. Phasellus mus ultricies dapibus? Pretium tempus, nam dictum hendrerit pharetra consectetur imperdiet congue? Tempus magna auctor tincidunt. Imperdiet hac nisi convallis condimentum mattis porta varius consectetur penatibus. Sociosqu proin eget nam laoreet porta, tristique venenatis suspendisse orci. Proin imperdiet maecenas vivamus a metus himenaeos facilisi velit ante consequat. Quis habitant velit est platea auctor eleifend consectetur consectetur nullam pellentesque lacinia. Ad mus rutrum nunc vivamus turpis malesuada consectetur pellentesque habitant rhoncus fringilla. Lacus condimentum adipiscing luctus urna? Lacinia nibh placerat nec congue sem pharetra accumsan dapibus lacinia nostra nunc urna? Consectetur fringilla ultrices sem non auctor tempus dignissim sodales vehicula sem nullam? Venenatis nascetur.</p>
            </main>

            <footer className="mt-auto text-white-50">
                <p>This app uses the <a className="text-white" href='https://www.frankfurter.app/' target='_blank' rel="noreferrer">Frankfurter API</a>. It tracks foreign exchange references rates published by the <a className="text-white" href='https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html' target='_blank' rel="noreferrer">European Central Bank</a>. The data refreshes around 16:00 CET every working day. </p>
            </footer>
        </>
    )

}

export default App;


