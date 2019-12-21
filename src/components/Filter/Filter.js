import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ filterId, onChange, filter }) => {
  return (
    <label htmlFor={filterId}>
      filter contacts by name
      <input
        className={styles.input}
        id={filterId}
        value={filter}
        name="filter"
        type="text"
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  filterId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Filter;
