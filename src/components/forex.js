// https://openexchangerates.org/api/latest.json?app_id=93f5f5f294904d13b8a78a70b10857ef

//mZNw7dFspw_L0Dtws7KGywEJuZexUfBm
import Dinero from "dinero.js";
//import React, { useEffect, useState } from "react";
import { currencies as mock_currencies, rates as mock_rates } from "../data"

const axios = require('axios');

const axFrankfurter = axios.create({
    baseURL: 'https://api.frankfurter.app'
});


async function getData(query = "") {
    try {
        const { status, data } = await axFrankfurter.get(query);
        //  ?date_time=2022-05-15T12%3A02%3A00

        if (status === 200) {
            return data;
        } else {
            console.log(status);
        }
    } catch (e) {
        console.log(e);
    }
}

async function convertDinero(baseCurrency, targetCurrency, amount) {
    // Convert baseCur amount to targetCur.
    //let d = dinero({ amount: targetCur, currency: baseCur })
    let d = await Dinero({ amount: amount, currency: baseCurrency, precision: 0 }).convert(targetCurrency,
        {
            endpoint: 'https://api.frankfurter.app/latest?from={{from}}',
            propertyPath: 'rates.{{to}}',
            roundingMode: 'HALF_EVEN'
        });
    console.log(d.getCurrency(), d.getAmount(), d.getPrecision());
    return {currency: d.getCurrency(), amount: d.getAmount()};
}

async function convert(baseCurrency, targetCurrency, amount) {
    let data = await getLatestRates({from:baseCurrency, to:targetCurrency, amount:amount});
    //console.log(data.rates[targetCurrency]);
    return {base: data.base, amount: data.amount, target:targetCurrency, rates:data.rates[targetCurrency], date:data.date};
}

function getSupportedCurrencies(mock = false) {
    return mock ? new Promise(resolve => resolve(mock_currencies)) : getData('/currencies');
}


//from:"USD", to:"SGD", amount:100
function getLatestRates(params = { from: 'USD' }, mock = false) {
    let query = '/latest?';
    for (const i in params) {
        query += `${i}=${params[i]}&`;
    }
    //console.log(query);
    return mock ? new Promise(resolve => resolve(mock_rates)) : getData(query);
}

/* async function convert2(amt, baseCur, targetCur) {
    if (baseCur !== latestRates.base && baseCur !== targetCur) {
        setLatestRates(await Forex.getLatestRates(baseCur, true));
    }

    let d = await Dinero({ amount: amt }).convert(targetCur, { endpoint: new Promise(resolve => resolve(latestRates)) });
    return { 'baseCurrency': baseCur, 'targetAmount': d.getAmount(), 'targetCurrency': targetCur };
}
 */

export { getSupportedCurrencies, getLatestRates, convert };

