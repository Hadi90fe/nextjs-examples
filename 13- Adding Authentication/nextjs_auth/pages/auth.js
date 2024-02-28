import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    }
    checkSession();
  }, [router]);

if (isLoading) {
  return <p>Loading...</p>
}
  return <AuthForm />;
}

export default AuthPage;
