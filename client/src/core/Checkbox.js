import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (category) => () => {
    const currentCategoryId = checked.indexOf(category);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId)
  };

  return categories.map((category, index) => (
    <li key={index} className='list-unstyled'>
      <input
        type='checkbox'
        onChange={handleToggle(category._id)}
        value={checked.indexOf(category._id === -1)}
        className='form-check-input'
      />
      <label className='form-check-label'>{category.name}</label>
    </li>
  ));
};

export default Checkbox;
