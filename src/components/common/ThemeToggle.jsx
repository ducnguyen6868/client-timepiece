import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import "../../styles/ThemeToggle.css";

function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <>
            <button
                className={`theme-btn ${theme === "dark" ? "dark" : ""}`}
                onClick={toggleTheme}
            >
                <span className="theme-btn-inner light-icon">
                    <Icon icon="noto:sun" width="12" height="12" />
                </span>
                <span className="theme-btn-inner dark-icon">
                    <Icon icon="noto:last-quarter-moon-face" width="12" height="12" />
                </span>
            </button>
        </>


    );
}

export default ThemeToggle;
