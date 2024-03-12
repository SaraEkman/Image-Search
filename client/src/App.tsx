import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useEffect } from "react";

export const App = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  console.log(isAuthenticated, user, isLoading);

  useEffect(() => {
    const search = async () => {
      const res = await fetch(
        "https://www.googleapis.com/customsearch/v1?key=AIzaSyAi5H0AVPmBxEKbHsnhyYoLPk9WJDgnzWM&cx=41d558085ddf341b5&num=10&searchType=image&q=lion"
      );
      // const res = await fetch("https://www.googleapis.com/customsearch/v1?key=AIzaSyAi5H0AVPmBxEKbHsnhyYoLPk9WJDgnzWM&cx=41d558085ddf341b5&num=10&q");
      const data = await res.json();
      console.log(data);
    };
    search();
  }, []);

  return (
    <div>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};
