import React from 'react';
import styles from './styles.module.scss';
const SelectInfo = ({ label, id, value, options, onChange }) => {
    return (
        <div className={styles.selectInfo}>
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInfo;
