import React, { useState, useEffect } from 'react';
import AnimatedBorder from "../../components/AnimatedBorder";
import { motion } from 'framer-motion';
import styles from './styles.module.scss';
import { RangeNutritional } from "../../components/Ranges/RangeNutritional";
import { calculateCarbohydratesValues, calculateFatValues, calculateProteinValues } from '../../components/NutritionalsCalculations';
import Graphic from '../../components/Chartjs';
import { Link, useNavigate } from 'react-router-dom';

export const MacroCalculator = () => {
  const gastoEnergeticoDiario = localStorage.getItem('GED');
  const gastoEnergeticoBasal = localStorage.getItem('GEB');
  const activity = localStorage.getItem('Activity');
  const [proteinValueGED, setProteinValueGED] = useState(0);
  const [fatValueGED, setFatValueGED] = useState(0);
  const [proteinValueGEB, setProteinValueGEB] = useState(0);
  const [fatValueGEB, setFatValueGEB] = useState(0);
  const [proteinValues, setProteinValues] = useState({});
  const [fatValues, setFatValues] = useState({});
  const [flipped, setFlipped] = useState(false);
  const [carboValueGED, setCarboValueGED] = useState(0);
  const [carboValueGEB, setCarboValueGEB] = useState(0);

  useEffect(() => {
    const proteinValuesData = calculateProteinValues(activity);
    const fatValuesData = calculateFatValues();

    setProteinValues(proteinValuesData);
    setFatValues(fatValuesData);

    setProteinValueGED(proteinValuesData.minProteinPercentGED);
    setFatValueGED(fatValuesData.minFatPercentGED);
    
    setProteinValueGEB(proteinValuesData.minProteinPercentGEB);
    setFatValueGEB(fatValuesData.minFatPercentGEB);

    const initialCarbValuesGED = calculateCarbohydratesValues(
      proteinValuesData.minProteinPercentGED,
      fatValuesData.minFatPercentGED
    );
    
    const initialCarbValuesGEB = calculateCarbohydratesValues(
      proteinValuesData.minProteinPercentGEB,
      fatValuesData.minFatPercentGEB
    );

    setCarboValueGED(initialCarbValuesGED.carboGED);
    setCarboValueGEB(initialCarbValuesGEB.carboGEB);
  }, [activity]);

  useEffect(() => {
    const carbValuesGED = calculateCarbohydratesValues(proteinValueGED, fatValueGED, proteinValueGEB, fatValueGEB);
    setCarboValueGED(carbValuesGED.carboGED);
  }, [proteinValueGED, fatValueGED, proteinValueGEB, fatValueGEB]);

  useEffect(() => {
    const carbValuesGEB = calculateCarbohydratesValues(proteinValueGED, fatValueGED, proteinValueGEB, fatValueGEB);
    setCarboValueGEB(carbValuesGEB.carboGEB);
  }, [proteinValueGED, fatValueGED, proteinValueGEB, fatValueGEB]);

  const navigate = useNavigate();

  function calculate(e) {
    e.preventDefault();
    navigate('/alimentacao');

    localStorage.setItem('proteinGED', proteinValueGED);
    localStorage.setItem('proteinGEB', proteinValueGEB);
    localStorage.setItem('fatGED', fatValueGED);
    localStorage.setItem('fatGEB', fatValueGEB);
    localStorage.setItem('carboGED', carboValueGED);
    localStorage.setItem('carboGEB', carboValueGEB);
  }

  return (
    <AnimatedBorder>
      <motion.div
        initial={{ x: 1000 }}
        animate={{ x: 0 }}
        exit={{ x: -window.innerWidth }}
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}>
        <h3>Distribuição dos Macronutrientes</h3>
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <form className={styles.formGED}>
              <p>Seu GED: {gastoEnergeticoDiario}</p>
              <Graphic data={[proteinValueGED, fatValueGED, carboValueGED]} />
              <span className={styles.recomended}>Valores mínimos recomendados.<br></br>
                Altere caso sinta necessidade:</span><div>
                <RangeNutritional
                  label='Proteinas'
                  min={proteinValues.minProteinPercentGED}
                  max={proteinValues.maxProteinPercentGED}
                  value={proteinValueGED}
                  type={gastoEnergeticoDiario}
                  onChange={(value) => { setProteinValueGED(value); }}
                  backgroundColor='#36A2EB'
                />
                <RangeNutritional
                  label='Gorduras'
                  min={fatValues.minFatPercentGED}
                  max={fatValues.maxFatPercentGED}
                  value={fatValueGED}
                  type={gastoEnergeticoDiario}
                  onChange={(value) => { setFatValueGED(value); }}
                  backgroundColor='#f76054'
                />
              </div>
              <div className={styles.frontButtons}>
                <button className={styles.btnFlip} onClick={(e) => { e.preventDefault(); setFlipped(!flipped); }}>GEB</button>
              </div>
            </form>
          </div>
          <div className={styles.cardBack}>
            <form>
              <p>Seu GEB: {gastoEnergeticoBasal}</p>
              <Graphic className={styles.chartJS} data={[proteinValueGEB, fatValueGEB, carboValueGEB]} />
              <span className={styles.recomended}>Valores mínimos recomendados.<br></br>
                Altere caso sinta necessidade:</span>
              <div>
                <RangeNutritional
                  label='Proteinas'
                  min={proteinValues.minProteinPercentGEB}
                  max={proteinValues.maxProteinPercentGEB}
                  value={proteinValueGEB}
                  type={gastoEnergeticoDiario}
                  onChange={(value) => { setProteinValueGEB(value); }}
                  backgroundColor='#36A2EB'
                />
                <RangeNutritional
                  label='Gorduras'
                  min={fatValues.minFatPercentGEB}
                  max={fatValues.maxFatPercentGEB}
                  value={fatValueGEB}
                  type={gastoEnergeticoDiario}
                  onChange={(value) => { setFatValueGEB(value); }}
                  backgroundColor='#f76054'
                />
              </div>
              <div className={styles.backButtons}>
                <button className={styles.btnFlip} onClick={(e) => { e.preventDefault(); setFlipped(!flipped); }}>GED</button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.bothSidesButtons}>
          <Link to='/calculadora'>
            <button>Voltar</button>
          </Link>
          <button onClick={(e) => { e.preventDefault(); calculate(e); }}>Próximo</button>
        </div>
      </motion.div>
    </AnimatedBorder>
  );
};