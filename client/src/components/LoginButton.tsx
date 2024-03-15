import { useAuth0 } from "@auth0/auth0-react";
import Cookie from "js-cookie";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => {
        Cookie.remove("userImages");
        loginWithRedirect();
      }}
    >
      Log In
    </button>
  );
};

export default LoginButton;
