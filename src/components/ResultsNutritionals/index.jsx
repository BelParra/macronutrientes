import React, { useState } from 'react';
import styles from './styles.module.scss';

export const ResultsNutritionals = ({ BMI, resultBMI, gastoEnergeticoBasal, gastoEnergeticoDiario, formulaUsed, resultFFM, FFM, isSwitchChecked }) => {
    const feedbacks = {
        'Desnutrição Grau III': 'Você está com desnutrição grave. É uma situação crítica! A desnutrição severa pode levar a problemas de saúde graves, como falência de órgãos e comprometimento do sistema imunológico. É essencial buscar ajuda médica imediatamente',
        'Desnutrição Grau II': 'Você está com desnutrição moderada. Atenção, sua saúde está em perigo! A desnutrição moderada pode causar fadiga, perda de massa muscular e um sistema imunológico debilitado. Consulte um profissional de saúde.',
        'Desnutrição Grau I': 'Você está com desnutrição leve. Seu corpo merece nutrição adequada. Consulte um profissional de saúde para evitar carências e riscos de saúde associados, como problemas imunológicos e fragilidade óssea.',
        'Peso Normal': 'Seu peso está normal. Parabéns pelo equilíbrio! Manter-se nessa faixa reduz o risco de doenças crônicas, proporcionando uma vida mais saudável e ativa.',
        'Sobrepeso': 'Você está com sobrepeso. Vamos cuidar do seu coração! Adote hábitos saudáveis para reduzir os riscos de diabetes tipo 2, hipertensão e doenças cardíacas.',
        'Obesidade Grau I': 'Você está com obesidade leve. Hora de uma mudança positiva! Reduza os riscos de doenças cardiovasculares e respiratórias implementando uma dieta equilibrada e atividade física regular.',
        'Obesidade Grau II': 'Você está com obesidade moderada. Seu bem-estar é crucial! Busque orientação médica para reduzir riscos de diabetes tipo 2 e apneia do sono. Pequenas mudanças têm grandes impactos.',
        'Obesidade Grau III': 'Você está com obesidade grave. Priorize sua saúde agora! Consulte um profissional para enfrentar riscos extremos, como problemas cardíacos e respiratórios, e inicie mudanças sustentáveis para uma vida mais saudável.'
    };

    const feedbackBMI = feedbacks[resultBMI];

    const feedbacksFFM = {
        'perigosamente baixo': 'Seu percentual de gordura está perigosamente baixo. Isso pode levar a problemas de saúde graves, como disfunção hormonal e perda de massa óssea. É essencial buscar ajuda médica imediatamente.',
        'mínimo': 'Seu percentual de gordura está no mínimo. Embora isso possa ser comum para atletas de elite, é importante garantir que você esteja recebendo nutrição adequada. Consulte um profissional de saúde para orientação.',
        'excelente': 'Excelente! Seu percentual de gordura está na faixa ideal para saúde e fitness. Continue mantendo um estilo de vida saudável!',
        'bom': 'Bom trabalho! Seu percentual de gordura está bom. Continue com seus hábitos saudáveis para manter esse nível.',
        'acima da média': 'Seu percentual de gordura está acima da média. Não se preocupe, pequenas mudanças no estilo de vida podem ajudar a melhorar isso.',
        'médio': 'Seu percentual de gordura está na média. Embora isso seja normal, adotar hábitos saudáveis pode ajudar a melhorar sua saúde geral.',
        'abaixo da média': 'Seu percentual de gordura está abaixo da média. Considere incorporar mais atividades físicas e uma dieta equilibrada em sua rotina.',
        'alto': 'Seu percentual de gordura está alto. É importante trabalhar para reduzi-lo para melhorar sua saúde. Consulte um profissional de saúde para obter orientação.',
        'muito alto': 'Seu percentual de gordura está muito alto. Isso pode aumentar o risco de doenças crônicas. É altamente recomendável buscar a orientação de um profissional de saúde.'
    };

    const feedbackFFM = feedbacksFFM[resultFFM];

    const feedbackGEB = `O GEB é a quantidade mínima de energia necessária para manter os processos vitais do corpo em funcionamento. Consumir menos calorias do que o seu GEB pode levar a deficiências nutricionais e outros problemas de saúde. ${formulaUsed}`;

    const feedbackGED = 'O GED é a soma do GEB com o fator de atividade. O GED é crucial para compreender as necessidades calóricas individuais, especialmente em contextos como nutrição e controle de peso.';


    const Tooltip = ({ content }) => {
        const [showTooltip, setShowTooltip] = useState(false);

        return (
            <div className={styles.Tooltip}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <button>i</button>
                {showTooltip && (
                    <div>
                        {content}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {isSwitchChecked ? (
                <div className={styles.resultFFM}>
                    <p>Sua massa livre de gordura (MLG):</p>
                    <h3>{FFM} kg</h3>
                    <span>{feedbackFFM}</span>
                </div>
            ) : (
                <div className={styles.resultBMI}>
                    <p>Seu índice de massa corporal (IMC):</p>
                    <h3>{BMI} kg/m²</h3>
                    <span>{feedbackBMI}</span>
                </div>
            )}

            <div className={styles.resultGEB}>
                <p>Seu gasto energético basal (GEB) é:</p>
                <h3>{gastoEnergeticoBasal} kcal</h3>
                <span><Tooltip content={feedbackGEB} /></span>
            </div>
            <div className={styles.resultGED}>
                <p>Seu gasto energético diário (GED) é:</p>
                <h3>{gastoEnergeticoDiario} kcal</h3>
                <span><Tooltip content={feedbackGED} /></span>
            </div>
        </>
    );

};

export default ResultsNutritionals;