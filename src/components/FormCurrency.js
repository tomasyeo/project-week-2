import React from "react";
import SelectCurrency from './SelectCurrency';

const FormCurrency = ({ currencies, exchange, result, func }) => {

    function filterInt(value) {
        return (/^[-+]?(\d+|Infinity)$/.test(value)) ? Number(value) : 0;
    }

    function selectOnChange(id, value) {
        console.log(id, value);
        switch (id) {
            case 'selBase':
                if (value === exchange.to) {
                    // swapping currency.
                    func(exchange.to, exchange.from, exchange.amount);
                    //setBase([baseCurrency[1], baseCurrency[0], baseCurrency[2]]);
                } else {
                    func(value, exchange.to, exchange.amount);
                    //setBase([value, baseCurrency[1], baseCurrency[2]]);
                }
                break;
            case 'selTarget':
                if (value === exchange.from) {
                    // swapping currency.
                    func(exchange.to, value, exchange.amount);
                    //setBase([baseCurrency[1], baseCurrency[0], baseCurrency[2]]);
                } else {
                    func(exchange.from, value, exchange.amount);
                    //setBase([baseCurrency[0], value, baseCurrency[2]]);
                }
                break;
            default:
                break;
        }
        console.log(exchange);
    }

    function txtOnKeyUp(id, value) {
        //handler here.
        func(exchange.from, exchange.to, filterInt(value));
        console.log(exchange);
    }

    //value={baseCurrency[0]}
    //value={targetCurrency[0]}
    return (
        <>
            <form id="frmCurrency" className="row g-2 m-2">
                <div className="col-sm-4">
                    <label htmlFor="txtAmount" className="form-label">Amount</label>
                    <input id="txtAmount" type="number" className="form-control" placeholder="$$$" aria-label="$$$"
                        value={exchange.amount} onChange={(e) => txtOnKeyUp(e.target.id, e.target.value, e)} /></div>
                <div className="col-sm-4">
                    <label htmlFor="selBase" className="form-label">Base Currency</label>
                    <SelectCurrency id={'selBase'} currencies={currencies} selected={exchange.from} selectOnChange={selectOnChange} />
                </div>
                <div className="col-sm-4">
                    <label htmlFor="selTarget" className="form-label">Target Currency</label>
                    <SelectCurrency id={'selTarget'} currencies={currencies} selected={exchange.to} selectOnChange={selectOnChange} />
                </div>
            </form>
            <div className="row g-2 m-3">
                <div className="card bg-secondary">
                    <div className="card-body">
                        <p className="card-text">{result.amount} {result.base} is equivalent to {result.rates} {result.target}.</p>
                    </div>
                    <div className="card-footer small">
                        Conversions are based on exchange rates published on {result.date}.
                    </div>
                </div>
            </div>

        </>
    );
}

export default FormCurrency;