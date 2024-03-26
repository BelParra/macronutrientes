import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from '../pages/Home';
import { NutritionalCalculator } from '../pages/NutritionalCalculator';
import { MacroCalculator } from '../pages/MacroCalculator';
import { CaloriesCalculator } from '../pages/CaloriesCalculator';


export default () => {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Home />} />
                <Route path='/calculadora' element={<NutritionalCalculator />} />
                <Route path='/macros' element={<MacroCalculator />} />
                <Route path='/alimentacao' element={<CaloriesCalculator />} />
            </Routes>
        </AnimatePresence>
    );
};
