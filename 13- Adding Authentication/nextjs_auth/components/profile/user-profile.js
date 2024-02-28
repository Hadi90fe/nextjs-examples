import { useSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

async function updatePassword(passwordData,  session) {
  const response = await fetch("/api/user/user-credentials", {
    method: "PATCH",
    body: JSON.stringify({...passwordData, session: session}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  // if (!response.ok) {
  //   throw new Error(data.message || "Something went wrong!");
  // }

  return data;
}

function UserProfile() {
  const {data: session, status} = useSession();

  async function changePassword(passwordData) {
    const response = await updatePassword(passwordData, session);
    console.log(response);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePassword} />
    </section>
  );
}

export default UserProfile;
