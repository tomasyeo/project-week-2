import React from 'react';

const OptionItems = ({items}) => {
    if (items) {
        return Object.entries(items).map(([k, v]) => {
            return <option value={k} key={k}>{v}</option>
        })
    }
};

const SelectCurrency = ({ data, id, selected, selectOnChange }) => {

    return (
        <select id={id} className="form-select" aria-label="Default select example" value={selected} onChange={(e) => selectOnChange(e.target.id, e.target.value) }>
            <OptionItems items={data} />
        </select>
    );
}


export default SelectCurrency;