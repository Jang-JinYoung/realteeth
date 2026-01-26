import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import WeatherPage from "./pages/WeatherPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/weather/:locationName" element={<WeatherPage />} />
        </Routes>
    );
}

export default App;
