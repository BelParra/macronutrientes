import styles from './styles.module.scss';


const AnimatedBorder = ({ children }) => {
    return (
        <div className={styles.animatedBorder}>
            <div className={styles.blank}>
                {children}
            </div>
        </div>
    );
};

export default AnimatedBorder;