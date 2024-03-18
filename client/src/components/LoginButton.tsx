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
      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 m-4"
    >
      Log In
    </button>
  );
};

export default LoginButton;
