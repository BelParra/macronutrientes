import React from 'react';
import styles from './styles.module.scss';
import checkedIcon from '../../../assets/checked.png';
import uncheckedIcon from '../../../assets/unchecked.svg';

const RadioNutritional = ({ id, name, value, checked, onChange, label }) => {
    return (
        <div className={styles.radioNutritional}>
            <input type='radio' id={id} name={name} value={value} checked={checked} onChange={onChange} />
            <label htmlFor={id} className={checked ? (label === 'Feminino' ? styles.red : styles.blue) : ''}>
                {label}
                <img src={checked ? checkedIcon : uncheckedIcon} alt='radio-icon' />
            </label>
        </div>
    );
};


export default RadioNutritional;
