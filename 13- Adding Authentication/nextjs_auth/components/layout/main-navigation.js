import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { data: session, status } = useSession();
  const isAuthentificated = status === "authenticated";
  // const isLoading = status === "loading";

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!isAuthentificated && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {isAuthentificated && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
