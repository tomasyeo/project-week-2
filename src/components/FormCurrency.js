import React from "react";
import SelectCurrency from './SelectCurrency';

const FormCurrency = ({ currencies, exchange, func }) => {

    function filterInt(value) {
        return (/^[-+]?(\d+|Infinity)$/.test(value)) ? Number(value) : 0;
    }

    function selectOnChange(id, value) {
        //console.log(id, value);
        switch (id) {
            case 'selBase':
                if (value === exchange.to) {
                    // swapping currency. 
                    func({ from: exchange.to, to: exchange.from, amount: exchange.amount });
                } else {
                    func({ from: value, to: exchange.to, amount: exchange.amount });
                }
                break;
            case 'selTarget':
                if (value === exchange.from) {
                    // swapping currency.
                    func({ from: exchange.to, to: value, amount: exchange.amount });
                } else {
                    func({ from: exchange.from, to: value, amount: exchange.amount });
                }
                break;
            default:
                break;
        }
    }

    function txtOnKeyUp(id, value) {
        //handler here.
        func({ from: exchange.from, to: exchange.to, amount: filterInt(value) });
        //console.log(exchange);
    }

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
                        <p className="card-text">{exchange.amount} {exchange.from} is equivalent to {exchange.rates} {exchange.to}.</p>
                    </div>
                    <div className="card-footer small">
                        Conversions are based on exchange rates published on {exchange.date}.
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormCurrency;
