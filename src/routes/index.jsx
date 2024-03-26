import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from '../pages/home';


export default () => {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Home />} />
            </Routes>
        </AnimatePresence>
    );
};
