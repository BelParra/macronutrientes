import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import '../../styles/index.scss';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../../components/header';

const HomePage = () => {
    const [selectedMacro, setSelectedMacro] = useState('');

    const macros = {
        'Proteínas': 'Essenciais para o crescimento e reparação dos tecidos e produção de enzimas e hormônios.',
        'Carboidratos': 'Principal fonte de energia do corpo e necessários para o funcionamento do cérebro e do sistema nervoso.',
        'Gorduras': 'Fornecem energia concentrada, auxiliam na absorção de vitaminas e na produção de hormônios.'
    };

    return (
        <>
            <Header>
                <h1>Conhecendo os Macros</h1>
            </Header>
            <motion.main
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                exit={{ x: -window.innerWidth }}>
                <section className={styles.info}>
                    <h2>São importantes para o funcionamento adequado do nosso corpo.
                    </h2>
                    <h2>São as principais fontes de energia do corpo e desempenham várias funções.
                    </h2>
                </section>
                <section className={styles.macros}>
                    {Object.keys(macros).map((macro) => (
                        <div className={styles.buttonContainer} key={macro}>
                            <button onClick={() => setSelectedMacro(macro === selectedMacro ? '' : macro)}>
                                {macro}
                            </button>
                            {selectedMacro === macro && <div className={styles.infoBox}><p>{macros[macro]}</p></div>}
                        </div>
                    ))}
                </section>
                <section className={styles.buttonHome}>
                    <span>Agora que sabe para que serve cada um, vamos <strong>calcular suas metas diárias?</strong></span>
                    <Link to='/info'>
                        <button>Vamos lá!</button>
                    </Link>
                </section>
            </motion.main>
        </>
    );
};

export default HomePage;