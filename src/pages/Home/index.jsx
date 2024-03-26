import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import '../../styles/index.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Home = () => {
    const [selectedMacro, setSelectedMacro] = useState('');

    const macros = {
        'Proteínas': 'Essenciais para o crescimento e reparação dos tecidos e produção de enzimas e hormônios.',
        'Carboidratos': 'Principal fonte de energia do corpo e necessários para o funcionamento do cérebro e do sistema nervoso.',
        'Gorduras': 'Fornecem energia concentrada, auxiliam na absorção de vitaminas e na produção de hormônios.'
    };

    return (
        <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            exit={{ x: -window.innerWidth }}
            className={styles.home}>
            <div className={styles.head}>
                <h3>Entendendo os Macronutrientes</h3>
            </div>
            <div className={styles.info}>
                <p>Sabia que os Macronutrientes são importantes para o funcionamento adequado do nosso corpo?
                </p>
                <p>Eles são as principais fontes de energia do corpo e desempenham várias funções.
                </p>
            </div>
            <div className={styles.macros}>
                {Object.keys(macros).map((macro) => (
                    <div className={styles.buttonContainer} key={macro}>
                        <button onClick={() => setSelectedMacro(macro === selectedMacro ? '' : macro)}>
                            {macro}
                        </button>
                        {selectedMacro === macro && <div className={styles.infoBox}><p>{macros[macro]}</p></div>}
                    </div>
                ))}
            </div>
            <div className={styles.buttonHome}>
                <p>Agora que sabe para que serve cada um, vamos <strong>calcular suas metas diárias?</strong></p>
                <Link to='/calculadora'>
                    <button>Vamos lá!</button>
                </Link>

            </div>
        </motion.div>
    );
};
