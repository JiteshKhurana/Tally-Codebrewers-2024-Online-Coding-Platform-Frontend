import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./ui/button.tsx";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import SyncLoader from "react-spinners/SyncLoader";
import { useState, CSSProperties } from "react";
import { isLoggedIn } from "./lib/helper.ts";
import { GOOGLE_API_LOGIN } from "./lib/constants.ts";
import { useNavigate } from "react-router-dom";

const HomeNav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [color] = useState("#FF0000");
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const cookies = new Cookies(null, { path: "/" });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      const userInfo = await axios.get(GOOGLE_API_LOGIN, {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      axios
        .post(
          "https://worldwide-coders-production.up.railway.app/" + "create",
          {
            email: userInfo.data.email,
            name: userInfo.data.name,
            image: userInfo.data.picture,
            token: tokenResponse.access_token,
          }
        )
        .then((resp) => {
          const decoded = jwtDecode(resp.data.token);
          cookies.set("token", resp.data.token, {
            expires: decoded.exp ? new Date(decoded.exp * 1000) : undefined,
          });
          localStorage.setItem("name", resp.data.user.name);
          localStorage.setItem("email", resp.data.user.email);
          localStorage.setItem("image", resp.data.user.image);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onError: (errorResponse) => console.log(errorResponse.error),
  });
  const navigate = useNavigate();
  if (isLoading)
    return (
      <SyncLoader
        className="text-center"
        color={color}
        cssOverride={override}
        loading={isLoading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  const loggedIn = isLoggedIn();

  return (
    <div className="absolute right-0 sm:relative  flex gap-3 items-center">
      {loggedIn ? (
        <div className="space-x-5">
          <Button
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </Button>
          <Button
            onClick={() => {
              cookies.remove("token");
              localStorage.clear();
              window.location.reload();
            }}
          >
            Log out
          </Button>
        </div>
      ) : (
        <Button onClick={() => googleLogin()}>Sign in</Button>
      )}
    </div>
  );
};

export default HomeNav;
