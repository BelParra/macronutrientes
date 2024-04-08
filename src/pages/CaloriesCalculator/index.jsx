import styles from './styles.module.scss';
import '../../styles/index.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const CaloriesCalculator = () => {
    const [flipped, setFlipped] = useState(false);
    const [selectedMacro, setSelectedMacro] = useState('');

    const proteinGED = localStorage.getItem('proteinGED');
    const proteinGEB = localStorage.getItem('proteinGEB');
    const fatGED = localStorage.getItem('fatGED');
    const fatGEB = localStorage.getItem('fatGEB');
    const carboGED = localStorage.getItem('carboGED');
    const carboGEB = localStorage.getItem('carboGEB');

    const GEB = localStorage.getItem('GEB');
    const GED = localStorage.getItem('GED');

    const gramsProteinGED = (proteinGED / 4).toFixed(0);
    const gramsFatGED = (fatGED / 9).toFixed(0);
    const gramsCarboGED = (carboGED / 4).toFixed(0);
    const gramsSaturedFat = ((GED * 0.10) / 9).toFixed(0);
    const gramsPolyFat = ((GED * 0.10) / 9).toFixed(0);
    const gramsMonoFat = ((GED * 0.20) / 9).toFixed(0);

    const macros = {
        'Proteínas': 'Proteínas de alto valor biológico, são de origem animal e contêm todos os aminoácidos essenciais. Proteínas de baixo valor biológico, são de origem vegetale contém menos aminoácidos essenciais. Vegetarianos devem variar as fontes de proteínas para obter todos os aminoácidos necessários.',
        'Carboidratos': 'Carboidratos simples são rapidamente absorvidos, fornecendo energia rápida, o que pode ser útil para atletas no pré/pós treino. Já os carboidratos complexos são absorvidos mais lentamente, fornecendo energia duradoura, o que é benéfico para a maioria das pessoas no dia a dia.',
        'Gorduras': `As gorduras trans devem ser limitadas a 2g por dia, enquanto as gorduras saturadas não podem ultrapassar ${gramsSaturedFat}g por dia, as poli-insaturadas apesar de fazer parte das gorduras "boas" não deve ultrapassar de ${gramsPolyFat}g por dia. As gorduras monoinsaturadas são saudáveis, mas não devem ultrapassar de ${gramsMonoFat}g por dia`
    };
    return (
        <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            exit={{ x: -window.innerWidth }}

            className={`${styles.card} ${flipped ? styles.flipped : ''}`}>
            <div className={styles.cardInner}>
                <section className={styles.cardFront}>
                    <div className={styles.macros}>
                        <h3>Seus macros diários:</h3>
                        <p>Proteínas: <strong>{gramsProteinGED}g</strong></p>
                        <p>Gorduras: <strong>{gramsFatGED}g</strong></p>
                        <p>Carboidratos: <strong>{gramsCarboGED}g</strong></p>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); setFlipped(!flipped); }}>Saiba mais</button>
                </section>
                <section className={styles.cardBack}>
                    <section className={styles.info}>
                        <p>Sabia que as proteinas, carboidratos e gorduras são divididas em tipos diferentes?
                        </p>
                        <p>Entender quais são os tipos vão te ajudar a escolher uma alimentação mais saudável.</p>
                    </section>
                    <section className={styles.formMacros}>
                        {Object.keys(macros).map((macro) => (
                            <div className={styles.buttonContainer} key={macro}>
                                <button onClick={() => setSelectedMacro(macro === selectedMacro ? '' : macro)}>
                                    {macro}
                                </button>
                                {selectedMacro === macro && <div className={styles.infoBox}><p>{macros[macro]}</p></div>}
                            </div>
                        ))}
                    </section>
                </section>
            </div>
            <div className={styles.bothSidesButtons}>
                <Link to={flipped ? '#' : '/macros'}>
                    <button onClick={(e) => {
                        if (flipped) {
                            e.preventDefault();
                            setFlipped(false);
                        }
                    }}>Voltar</button>
                </Link>
                <Link to='/calculadora'>
                    <button className={styles.btnAgain} >De novo</button>
                </Link>
            </div>
        </motion.div>
    );
};
