import { createContext, useState } from "react";

const ThemeModeContext = createContext({
    isDarkMode: null,
    setDarkMode: () => { },
});

export function ThemeModeContextProvider(props) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    function setIsDarkModeHandler() {
        setIsDarkMode((prev) => !prev);
    }

    const context = {
        isDarkMode: isDarkMode,
        setDarkMode: setIsDarkModeHandler,
    };

    return (
        <ThemeModeContext.Provider value={context}>
            {props.children}
        </ThemeModeContext.Provider>
    );
}

export default ThemeModeContext;
