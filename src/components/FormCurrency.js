import React, { useEffect, useState } from "react";
import SelectCurrency from './SelectCurrency';

const FormCurrency = ({ data, exchange }) => {
    
    const [baseCurrency, setBase] = useState([]);
    const [targetCurrency, setTarget] = useState([]);


    useEffect(() => {
        (async() => {
            //let d = await dinero({ amount: 100}).convert('SGD');
        //setBase([exchange.amount, exchange.base]);
        //setTarget([exchange.rates, exchange.target]);
            const ex = await exchange('USD', 'SGD', 1);
            setBase([ex.amount, ex.base]);
        setTarget([ex.rates, ex.target]);

        })();
        //console.log(exchange);
        // Init
        


        //console.log('FormCurrency (useEffect[])', dinero);
    }, []);


    useEffect(() => {
        //console.log('baseCurrency', baseCurrency);
        //console.log('FormCurrency (useEffect[baseCurrency])', dinero.getAmount(), dinero.getCurrency());
    }, [baseCurrency]);


    useEffect(() => {
        //console.log('targetCurrency', targetCurrency);

    }, [targetCurrency]);


    function filterInt(value) {
        return (/^[-+]?(\d+|Infinity)$/.test(value)) ? Number(value) : 0;
    }


    function selectOnChange(id, value) {
        console.log(id, value);
        switch(id) {
            case 'selBase':
                if (value === targetCurrency[1]) {
                    // swapping currency.
                    setBase([baseCurrency[0], targetCurrency[1]]);
                    setTarget([targetCurrency[0], baseCurrency[1]]);
                } else {
                    setBase([baseCurrency[0], value]);
                }
                break;
            case 'selTarget':
                if (value === baseCurrency[1]) {
                    // swapping currency.
                    setTarget([targetCurrency[0], baseCurrency[1]]);
                    setBase([baseCurrency[0], targetCurrency[1]]);
                } else {
                    setTarget([targetCurrency[0], value]);
                }
                break;
            default:
                break;
        }
    }

    function txtOnKeyUp(id, value) {
        console.log(id, value);
        switch(id) {
            case 'txtBase':
                setBase([value, baseCurrency[1]]);
                break;
            case 'txtTarget':
                setTarget([value, targetCurrency[1]]);
                break;
            default:
                break;                
        }
    }
    //value={baseCurrency[0]}
    //value={targetCurrency[0]}
    return (
        <form id="frmCurrency" className="row g-3 m-3">
            <div className="col-sm-4"><input id="txtBase" type="number" className="form-control" placeholder="$$$" aria-label="$$$" 
                 value={baseCurrency[0]} onChange={(e) => txtOnKeyUp(e.target.id, e.target.value, e)} /></div>
            <div className="col-sm-8"><SelectCurrency id={'selBase'} data={data} selected={baseCurrency[1]} selectOnChange={selectOnChange} /></div>

            <div className="col-sm-4"><input id="txtTarget" type="number" className="form-control" placeholder="$$$" aria-label="$$$" 
                 value={targetCurrency[0]} onChange={(e) => txtOnKeyUp(e.target.id, e.target.value)} /></div>
            <div className="col-sm-8"><SelectCurrency id={'selTarget'} data={data} selected={targetCurrency[1]} selectOnChange={selectOnChange} /></div>
            <span>{JSON.stringify(exchange)}</span>
        </form>
        
    );
}

export default FormCurrency;