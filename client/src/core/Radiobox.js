import React, { useState, useEffect } from 'react';

const Radiobox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value)
    setValue(event.target.value)
  }

  return prices.map((price, index) => (
    <li key={index} className='list-unstyled'>
      <input
        type='radio'
        onChange={handleChange}
        name={price}
        value={`${price._id}`}
        className='form-check-input'
      />
      <label className='form-check-label'>{price.name}</label>
    </li>
  ));
};

export default Radiobox;
