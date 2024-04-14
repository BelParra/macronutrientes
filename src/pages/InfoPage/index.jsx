import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import InputInfo from '../../components/Inputs/InputInfo/index.jsx';
import SelectInfo from '../../components/Inputs/SelectInfo/index.jsx';
import { calculateGastoEnergeticoBasal, calculateBMI, calculateGastoEnergeticoDiario, calculateResultBMI, calculateFFM, calculateResultFFM } from '../../components/calcs/index.jsx';
import RadioInfo from '../../components/Inputs/RadioInfo/index.jsx';
import ResultsNutritionals from '../../components/results/index.jsx';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/index.scss';
import SwitchNutricional from '../../components/Inputs/SwitchInfo/index.jsx';
import Header from '../../components/header/index.jsx';

export const InfoPage = () => {
    const [age, setAge] = useState('');
    const [sex, setSex] = useState(null);
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState('selecione');
    const [resultBMI, setResultBMI] = useState('');
    const [BMI, setBMI] = useState('');
    const [gastoEnergeticoBasal, setGastoEnergeticoBasal] = useState('');
    const [gastoEnergeticoDiario, setgastoEnergeticoDiario] = useState('');
    const [FFM, setFFM] = useState('');
    const [resultFFM, setResultFFM] = useState('');
    const [fat, setFat] = useState(0);
    const [formulaUsed, setFormulaUsed] = useState('');
    const [flipped, setFlipped] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);

    function calculate(e) {
        e.preventDefault();
        if (!e.target.form.reportValidity()) {
            return;
        }

        const BMI = calculateBMI(height, weight);
        setBMI(BMI);

        const resultBMI = calculateResultBMI(BMI);
        setResultBMI(resultBMI);

        const FFM = calculateFFM(fat, weight);
        setFFM(FFM);

        const resultFFM = calculateResultFFM(age, sex, fat);
        setResultFFM(resultFFM);

        const gastoEnergeticoBasal = calculateGastoEnergeticoBasal(sex, weight, height, age, BMI, setFormulaUsed, FFM, fat);
        setGastoEnergeticoBasal(gastoEnergeticoBasal);
        localStorage.setItem('GEB', gastoEnergeticoBasal);

        const gastoEnergeticoDiario = calculateGastoEnergeticoDiario(gastoEnergeticoBasal, activity);
        setgastoEnergeticoDiario(gastoEnergeticoDiario);
        localStorage.setItem('GED', gastoEnergeticoDiario);

        localStorage.setItem('Activity', activity);
    };

    function handleSwitchChange() {
        setIsSwitchChecked((prevState) => {
            if (!prevState) {
                setFat('');
            } else {
                setFat(0);
            }
            return !prevState;
        });
    }


    return (
        <>
            <Header>
                <h1>Coletando informações</h1>
            </Header>
            <motion.div
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                exit={{ x: -window.innerWidth }}

                className={`${styles.card} ${flipped ? styles.flipped : ''}`}>
                <div className={styles.cardInner}>
                    <div className={styles.cardFront}>
                        <form className={styles.formCalc}>
                            <div className={styles.radios}>
                                <h3>Qual é o seu sexo?</h3>
                                <div className={styles.row}>
                                    <RadioInfo
                                        id='sex-female'
                                        name='sex'
                                        value='female'
                                        label='Feminino'
                                        checked={sex === 'female'}
                                        onChange={() => setSex('female')}
                                    />
                                    <RadioInfo
                                        id='sex-male'
                                        name='sex'
                                        value='male'
                                        label='Masculino'
                                        checked={sex === 'male'}
                                        onChange={() => setSex('male')}
                                    />
                                </div>
                            </div>
                            <div className={styles.checkbox}>
                                <div className={styles.column}>
                                    <h3>Sabe seu percentual de gordura?</h3>
                                </div>
                                <div className={styles.row}>
                                    <SwitchNutricional
                                        isChecked={isSwitchChecked}
                                        handleChange={handleSwitchChange} />
                                    {isSwitchChecked && (
                                        <div className={styles.slidein}>
                                            <InputInfo
                                                label='Gordura'
                                                id='fat'
                                                placeholder='%'
                                                type='number'
                                                value={fat}
                                                onChange={e => setFat(e.target.value)}
                                                maxLength={2}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.inputs}>
                                <div className={styles.row}>
                                    <InputInfo
                                        label='Idade'
                                        id='age'
                                        placeholder='anos'
                                        type='number'
                                        value={age}
                                        onChange={e => setAge(e.target.value)}
                                        required
                                        maxLength={3}
                                    />
                                    <InputInfo
                                        label='Altura'
                                        id='height'
                                        placeholder='cm'
                                        type='number'
                                        value={height}
                                        onChange={e => setHeight(e.target.value)}
                                        required
                                        maxLength={3}
                                    />
                                    <InputInfo
                                        label='Peso'
                                        id='weight'
                                        placeholder='kg'
                                        type='text'
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        required
                                        maxLength={4}
                                        isWeight
                                    />
                                </div>
                            </div>
                            <div className={styles.selects}>
                                <SelectInfo
                                    id='activity'
                                    value={activity}
                                    options={[
                                        { label: 'Selecione o seu nível de atividade', value: 'selecione' },
                                        { label: 'Pouco ou nenhum exercício', value: 'sedentary' },
                                        { label: 'Esportes 1 à 3 dias na semana', value: 'light' },
                                        { label: 'Esportes 3 à 5 dias na semana', value: 'moderate' },
                                        { label: 'Esportes 6 à 7 dias na semana', value: 'intense' },
                                        { label: 'Trabalho brasal / Treina 2x no dia', value: 'extreme' },
                                    ]} onChange={e => setActivity(e.target.value)} />
                            </div>
                            <div className={styles.frontButtons}>
                                <button onClick={(e) => { e.preventDefault(); calculate(e); setFlipped(!flipped); }} disabled={!sex || activity === 'selecione' || !age || !height || !weight}>Calcular</button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.cardBack}>
                        <div className={styles.result} id='result'>
                            {BMI && resultBMI && gastoEnergeticoBasal && gastoEnergeticoDiario && FFM && resultFFM && (
                                <ResultsNutritionals
                                    BMI={BMI}
                                    resultBMI={resultBMI}
                                    gastoEnergeticoBasal={gastoEnergeticoBasal}
                                    gastoEnergeticoDiario={gastoEnergeticoDiario}
                                    formulaUsed={formulaUsed}
                                    fat={fat}
                                    FFM={FFM}
                                    resultFFM={resultFFM}
                                    isSwitchChecked={isSwitchChecked}
                                />
                            )}

                            <div className={styles.backButtons}>
                                <button onClick={() => setFlipped(!flipped)}>Voltar</button>
                                <Link to='/macros'>
                                    <button>Próximo</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};