import Link from "next/link";

import classes from "./main-header.module.css";
import DarkModeIcon from "../icons/dark-mode-icon";
import LightModeIcon from "../icons/light-mode-icon";
import { useContext } from "react";
import ThemeModeContext from "../../store/thememode-context";

function MainHeader() {
  const themeModeCtx = useContext(ThemeModeContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
        </ul>
        <div className={classes.modeIcon} onClick={themeModeCtx.setDarkMode}>
          {themeModeCtx.isDarkMode ? (
            <LightModeIcon width="30" color="#74dacc" />
          ) : (
            <DarkModeIcon width="35" color="#74dacc" />
          )}
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;
