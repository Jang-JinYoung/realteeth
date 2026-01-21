import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { queryClient } from "./providers/queryClient";
import WeatherPage from "./pages/WeatherPage";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <WeatherPage />
        </QueryClientProvider>
    );
}

export default App;
