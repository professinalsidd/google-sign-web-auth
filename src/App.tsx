import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface User {
  access_token: string;
}

interface Profile {
  name: string;
  email: string;
  picture: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get<Profile>(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => setProfile(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div className="app-container">
      <h2>React Google Login</h2>
      <div className="content">
        {profile ? (
          <div className="profile">
            <img src={profile.picture} alt="User" className="profile-picture" />
            <h3>User Logged In</h3>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email Address:</strong> {profile.email}
            </p>
            <button onClick={logOut} className="logout-button">
              Log Out
            </button>
          </div>
        ) : (
          <button onClick={() => login()} className="login-button">
            Sign in with Google 🚀
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
