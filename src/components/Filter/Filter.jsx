import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, onFilterChange }) => {
  const handleChange = e => {
    onFilterChange(e.currentTarget.value);
  };

  return <input type="text" value={filter} onChange={handleChange} />;
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
