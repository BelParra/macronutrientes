import React, { useState } from 'react';
import styles from './styles.module.scss';

const InputNutritional = ({ label, id, type, value, placeholder, onChange, required, maxLength, isWeight }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleKeyPress = (e) => {
        if (['.', ',', '+', '-'].includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        let inputValue = e.target.value;

        if (maxLength && inputValue.length > maxLength) {
            inputValue = inputValue.slice(0, maxLength);
        }

        if (isWeight) {
            inputValue = inputValue.replace(/[^\d]/g, '');
            if (inputValue.length > 2) {
                inputValue = `${inputValue.slice(0, 2)}.${inputValue.slice(2)}`;
            }
        } else {
            inputValue = inputValue.replace(/[^\d]/g, '');
        }

        onChange({ target: { value: inputValue } });
    };

    return (
        <div className={styles.inputNutritional}>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                required={required}
            />
            <span className={(isFocused || value) ? styles.active : ''}>{placeholder}</span>
        </div>
    );
};

export default InputNutritional;
