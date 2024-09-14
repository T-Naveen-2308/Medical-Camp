// App.js
import React, { useState } from "react";
import MedicalForm from "./components/MedicalForm.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem("theme") || "light"
    );

    React.useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const getToastStyle = () => {
        if (theme === "dark") {
            return { backgroundColor: "#1d232a", color: "#a6adbb" };
        } else {
            return { backgroundColor: "#ffffff", color: "#1f2937" };
        }
    };

    return (
        <div className="min-h-screen">
            <ToastContainer
                toastStyle={getToastStyle()}
                position="top-center"
            />
            <MedicalForm setTheme={setTheme} />
        </div>
    );
}

export default App;
