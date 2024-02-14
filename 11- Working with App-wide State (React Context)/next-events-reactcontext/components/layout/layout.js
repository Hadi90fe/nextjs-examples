import { useContext } from "react";
import Notification from "../ui/notification";
import MainHeader from "./main-header";
import NotificationContext from "../../store/notification-context";
import ThemeModeContext from "../../store/thememode-context";
import classes from './layout.module.css';

function Layout(props) {
  const notficationCtx = useContext(NotificationContext);
  const themeModeCtx = useContext(ThemeModeContext);
  const activeNotification = notficationCtx.notification;

  return (
    <div data-theme={themeModeCtx.isDarkMode ? 'dark' : null}>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </div>
  );
}

export default Layout;
