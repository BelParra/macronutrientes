import styles from './styles.module.scss';
import Logo from '../../assets/logo.png';
const Header = ({ children }) => {
    return (
        <header className={styles.header}>
            <img src={Logo} alt='Logo' />
            {children}
        </header>
    );
};


export default Header;