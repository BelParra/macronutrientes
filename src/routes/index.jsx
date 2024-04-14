import { Route, Routes } from "react-router-dom";
import { HomePage, InfoPage, CaloriesPage, MacroPage } from "../pages";

export default () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/info" element={<InfoPage />}></Route>
            <Route path="/calories" element={<CaloriesPage />}></Route>
            <Route path="/macronutrients" element={<MacroPage />}></Route>
        </Routes>
    );
};