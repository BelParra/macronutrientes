import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from '../pages/home';
import { NutritionalCalculator } from '../pages/NutritionalCalculator';
import { MacroCalculator } from '../pages/MacroCalculator';


export default () => {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Home />} />
                <Route path='/calculadora' element={<NutritionalCalculator />} />
                <Route path='/macros' element={<MacroCalculator />} />
            </Routes>
        </AnimatePresence>
    );
};
