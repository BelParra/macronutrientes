import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from '../pages/HomePage';
import { InfoPage } from '../pages/InfoPage';
import { CaloriesPage } from '../pages/CaloriesPage';
import { MacroPage } from '../pages/MacroPage';


export default () => {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<HomePage />} />
                <Route path='/calculadora' element={<InfoPage />} />
                <Route path='/macros' element={<CaloriesPage />} />
                <Route path='/alimentacao' element={<MacroPage />} />
            </Routes>
        </AnimatePresence>
    );
};
