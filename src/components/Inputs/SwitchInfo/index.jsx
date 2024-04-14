import styles from './styles.module.scss';

const SwitchNutricional = ({ isChecked, handleChange }) => {
    return (
        <div className={styles.switchNutricional}>
            <input type="checkbox" role="switch" checked={isChecked} onChange={handleChange} />
        </div>
    );
};

export default SwitchNutricional;
