import "./App.css";
import WeatherPage from "./pages/WeatherPage";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<WeatherPage />} />

            {/* 즐겨찾기 상세 페이지 */}
            <Route path="/weather/:lat/:lon" element={<WeatherPage />} />
        </Routes>
    );
}

export default App;
