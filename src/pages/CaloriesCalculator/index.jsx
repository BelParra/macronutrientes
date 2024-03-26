import styles from './styles.module.scss';
import '../../styles/index.scss';
import { motion } from 'framer-motion';
import AnimatedBorder from '../../components/AnimatedBorder';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const CaloriesCalculator = () => {
    const [flipped, setFlipped] = useState(false);


    const proteinGED = localStorage.getItem('proteinGED');
    const proteinGEB = localStorage.getItem('proteinGEB');
    const fatGED = localStorage.getItem('fatGED');
    const fatGEB = localStorage.getItem('fatGEB');
    const carboGED = localStorage.getItem('carboGED');
    const carboGEB = localStorage.getItem('carboGEB');

    const GEB = localStorage.getItem('GEB');
    const GED = localStorage.getItem('GED');

    const gramsProteinGED = (proteinGED/4).toFixed(0);
    const gramsFatGED = (fatGED/9).toFixed(0);
    const gramsCarboGED = (carboGED/4).toFixed(0);

    return (
        <AnimatedBorder>
            <motion.div
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                exit={{ x: -window.innerWidth }}

                className={`${styles.card} ${flipped ? styles.flipped : ''}`}>
                <div className={styles.cardInner}>
                    <div className={styles.cardFront}>
                        <form className={styles.formMacros}>
                            <h3>Seus macros diários:</h3>
                            <span>Proteína: {gramsProteinGED}g</span>
                            <span>Gordura: {gramsFatGED}g</span>
                            <span>Carboidrato: {gramsCarboGED}g</span>
                            <span>-</span>
                            <span>-</span>
                            <span>-</span>
                            <span>EM CONSTRUÇÃO</span>
                        </form>
                    </div>
                    <div className={styles.cardBack}>
                        <span>Oi atrás</span>
                    </div>
                </div>
                <div className={styles.bothSidesButtons}>
                    <Link to='/macros'>
                        <button>Voltar</button>
                    </Link>
                    <Link to=''>
                        <button className={styles.btnNext} onClick={(e) => { e.preventDefault(); calculate(e); }}>Próximo</button>
                    </Link>
                </div>
            </motion.div>
        </AnimatedBorder>
    );
};
