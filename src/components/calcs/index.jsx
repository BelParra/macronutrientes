export const calculateBMI = (height, weight) => {
    const heightMetros = height / 100;
    return (weight / (heightMetros * heightMetros)).toFixed(2);
};
export const calculateResultBMI = (BMI) => {
    if (BMI < 16.0) {
        return 'Desnutrição Grau III';
    } else if (BMI < 16.9) {
        return 'Desnutrição Grau II';
    } else if (BMI < 18.5) {
        return 'Desnutrição Grau I';
    } else if (BMI < 24.9) {
        return 'Peso Normal';
    } else if (BMI < 29.9) {
        return 'Sobrepeso';
    } else if (BMI < 34.9) {
        return 'Obesidade Grau I';
    } else if (BMI < 39.9) {
        return 'Obesidade Grau II';
    } else {
        return 'Obesidade Grau III';
    }
};
export const calculateFFM = (fat, weight) => {
    const fatPercent = fat / 100;
    return ((1 - fatPercent) * weight).toFixed(2);
};
export const calculateResultFFM = (age, sex, fat) => {
    const resultCategories = {
        'female': {
            '18-25': {
                '0-9': 'perigosamente baixo',
                '10-12': 'mínimo',
                '13-16': 'excelente',
                '17-19': 'bom',
                '20-22': 'acima da média',
                '23-25': 'médio',
                '26-28': 'abaixo da média',
                '29-31': 'alto',
                '32-': 'muito alto'
            },
            '26-35': {
                '0-9': 'perigosamente baixo',
                '10-13': 'mínimo',
                '14-16': 'excelente',
                '17-20': 'bom',
                '21-23': 'acima da média',
                '24-25': 'médio',
                '26-29': 'abaixo da média',
                '30-33': 'alto',
                '34-': 'muito alto'
            },
            '36-45': {
                '0-9': 'perigosamente baixo',
                '10-15': 'mínimo',
                '16-19': 'excelente',
                '20-23': 'bom',
                '24-26': 'acima da média',
                '27-29': 'médio',
                '30-32': 'abaixo da média',
                '33-36': 'alto',
                '37-': 'muito alto'
            },
            '46-55': {
                '0-9': 'perigosamente baixo',
                '10-16': 'mínimo',
                '17-22': 'excelente',
                '23-25': 'bom',
                '26-28': 'acima da média',
                '29-31': 'médio',
                '32-34': 'abaixo da média',
                '35-38': 'alto',
                '39-': 'muito alto'
            },
            '56-65': {
                '0-9': 'perigosamente baixo',
                '10-17': 'mínimo',
                '18-22': 'excelente',
                '24-26': 'bom',
                '27-29': 'acima da média',
                '30-32': 'médio',
                '33-35': 'abaixo da média',
                '36-38': 'alto',
                '39-': 'muito alto'
            },
        },
        'male': {
            '18-25': {
                '0-2': 'perigosamente baixo',
                '2-4': 'mínimo',
                '5-7': 'excelente',
                '8-11': 'bom',
                '12-13': 'acima da média',
                '14-16': 'médio',
                '17-19': 'abaixo da média',
                '20-25': 'alto',
                '26-': 'muito alto'
            },
            '26-35': {
                '0-2': 'perigosamente baixo',
                '2-7': 'mínimo',
                '8-11': 'excelente',
                '12-15': 'bom',
                '16-17': 'acima da média',
                '18-20': 'médio',
                '21-24': 'abaixo da média',
                '25-27': 'alto',
                '28-': 'muito alto'
            },
            '36-45': {
                '0-2': 'perigosamente baixo',
                '2-9': 'mínimo',
                '10-15': 'excelente',
                '16-18': 'bom',
                '19-20': 'acima da média',
                '21-23': 'médio',
                '24-26': 'abaixo da média',
                '27-29': 'alto',
                '30-': 'muito alto'
            },
            '46-55': {
                '0-2': 'perigosamente baixo',
                '2-11': 'mínimo',
                '12-17': 'excelente',
                '18-20': 'bom',
                '21-23': 'acima da média',
                '24-25': 'médio',
                '26-27': 'abaixo da média',
                '28-31': 'alto',
                '32-': 'muito alto'
            },
            '56-65': {
                '0-2': 'perigosamente baixo',
                '2-12': 'mínimo',
                '13-19': 'excelente',
                '20-21': 'bom',
                '22-23': 'acima da média',
                '24-25': 'médio',
                '26-27': 'abaixo da média',
                '28-31': 'alto',
                '32-': 'muito alto'
            },
        },
    };

    const ageCategory =
        age >= 18 && age <= 25 ? '18-25' :
            age >= 26 && age <= 35 ? '26-35' :
                age >= 36 && age <= 45 ? '36-45' :
                    age >= 46 && age <= 55 ? '46-55' :
                        age >= 56 && age <= 65 ? '56-65' :
                            null;

    const category = resultCategories[sex]?.[ageCategory];

    for (const range in category) {
        const [min, max] = range.split('-').map(Number);
        if (fat >= min && (max ? fat <= max : (!max && fat >= min))) {
            return category[range];
        }
    }

};
export const calculateGastoEnergeticoBasal = (sex, weight, height, age, BMI, setFormulaUsed, FFM, fat) => {
    const formulas = {
        'female': {
            'Mifflin-St Jeor': ((10 * weight) + (6.25 * height) - (5 * age) - 161).toFixed(2),
            'Harris Benedict': (655.09 + (9.563 * weight) + (1.85 * height) - (4.676 * age)).toFixed(2),
            'Katch-McArdle': (370 + (21.6 * FFM)).toFixed(2),
            'Cunningham': (500 + (22 * FFM)).toFixed(2)
        },
        'male': {
            'Mifflin-St Jeor': ((10 * weight) + (6.25 * height) + (5 * age) + 5).toFixed(2),
            'Harris Benedict': (66.47 + (13.75 * weight) + (5.003 * height) - (6.775 * age)).toFixed(2),
            'Katch-McArdle': (370 + (21.6 * FFM)).toFixed(2),
            'Cunningham': (500 + (22 * FFM)).toFixed(2)
        }
    };

    let formulaUsed;
    if (fat !== 0) {
        if ((sex === 'female' && parseFloat(fat) < 30) || (sex === 'male' && parseFloat(fat) < 20)) {
            formulaUsed = 'Cunningham';
        } else {
            formulaUsed = 'Katch-McArdle';
        }
    } else {
        formulaUsed = BMI < 29.9 ? 'Harris Benedict' : 'Mifflin-St Jeor';
    }


    const gastoEnergeticoBasal = formulas[sex][formulaUsed];

    setFormulaUsed(`Fórmula usada de ${formulaUsed}.`);
    return (gastoEnergeticoBasal * 1).toFixed(0);
};
export const calculateGastoEnergeticoDiario = (gastoEnergeticoBasal, Activity) => {
    const activityFactors = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'intense': 1.725,
        'extreme': 1.9
    };

    const activityFactor = activityFactors[Activity] || 0;
    return (gastoEnergeticoBasal * activityFactor).toFixed(0);
};
export const calculateProteinValues = (activity) => {
    const proteinFactors = {
        'sedentary': { percentMin: 10, percentMax: 25 },
        'light': { percentMin: 10, percentMax: 25 },
        'moderate': { percentMin: 10, percentMax: 25 },
        'intense': { percentMin: 15, percentMax: 35 },
        'extreme': { percentMin: 15, percentMax: 35 }
    };

    const factor = proteinFactors[activity] || { percentMin: 0, percentMax: 0 };
    const totalCaloriesGEB = localStorage.getItem('GEB');
    const totalCaloriesGED = localStorage.getItem('GED');

    const minProteinPercentGEB = ((totalCaloriesGEB * factor.percentMin) / 100).toFixed(0);
    const maxProteinPercentGEB = ((totalCaloriesGEB * factor.percentMax) / 100).toFixed(0);
    const minProteinPercentGED = ((totalCaloriesGED * factor.percentMin) / 100).toFixed(0);
    const maxProteinPercentGED = ((totalCaloriesGED * factor.percentMax) / 100).toFixed(0);

    return {
        minProteinPercentGEB,
        maxProteinPercentGEB,
        minProteinPercentGED,
        maxProteinPercentGED
    };
};
export const calculateFatValues = () => {
    const totalCaloriesGEB = localStorage.getItem('GEB');
    const totalCaloriesGED = localStorage.getItem('GED');
    const minFatPercentGEB = ((totalCaloriesGEB * 25) / 100).toFixed(0);
    const maxFatPercentGEB = ((totalCaloriesGEB * 30) / 100).toFixed(0);
    const minFatPercentGED = ((totalCaloriesGED * 25) / 100).toFixed(0);
    const maxFatPercentGED = ((totalCaloriesGED * 30) / 100).toFixed(0);

    return {
        minFatPercentGEB,
        maxFatPercentGEB,
        minFatPercentGED,
        maxFatPercentGED
    };
};
export const calculateCarbohydratesValues = (proteinValueGED, fatValueGED, proteinValueGEB, fatValueGEB) => {
    const totalCaloriesGEB = parseInt(localStorage.getItem('GEB'));
    const totalCaloriesGED = parseInt(localStorage.getItem('GED'));
    const carboGED = totalCaloriesGED - (parseInt(proteinValueGED) + parseInt(fatValueGED));
    const carboGEB = totalCaloriesGEB - (parseInt(proteinValueGEB) + parseInt(fatValueGEB));
    return {
        carboGED,
        carboGEB,
    };
};