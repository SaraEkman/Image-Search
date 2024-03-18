import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Cookie from 'js-cookie'

interface ISearchResults {
  items?: {
    title: string;
    image: {
      byteSize: number;
    };
    link: string;
  }[] | undefined;

  searchInformation?: {
    searchTime: number;
  }
  spelling?: {
    correctedQuery: string;
  }
}

interface IUserImages {
  user: string;
  id: number;
  favoriteImages: {
    id: number;
    title: string;
    byteSize: number;
    url: string;
  }[]
}


export const App = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  console.log(isAuthenticated, user, isLoading);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResults>({
    items: [],
    searchInformation: {
      searchTime: 0,
    },
  });

  const [userImages, setUserImages] = useState<IUserImages>({
    user: "",
    id: 0,
    favoriteImages: []
  });
  const [showImages, setShowImages] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const checkUser = async () => { 
      try {
        const res = await axios.post(import.meta.env.VITE_API_URL, JSON.stringify({ user: user?.nickname || user?.name }), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        Cookie.set('userImages', JSON.stringify({
          user: res.data.user,
          id: res.data.id,
          favoriteImages: res.data.favoriteImages
        }));
        setUserImages((prv) => { 
          return {
            ...prv,
            user: res.data.user,
            id: res.data.id,
            favoriteImages: res.data.favoriteImages
          };
        });
      }
      catch (error) {
        console.log(error, "error");
      }
    }
    if (isAuthenticated) {
      checkUser();
    }
  }, [isAuthenticated])
  
  console.log(userImages);

  const handleSearch = async () => {
    setShowImages(false);
    console.log(searchTerm);
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyAi5H0AVPmBxEKbHsnhyYoLPk9WJDgnzWM&cx=41d558085ddf341b5&num=10&searchType=image&q=${searchTerm}`
    );
    const data = await res.json();
    console.log(data);
    setSearchResults((prv) => {
      return {
        ...prv,
        items: data.items,
        searchInformation: data.searchInformation,
        spelling: data.spelling
      };
    });
  };

  const handleFavoriteImages = async () => {
      setShowImages(true);
  }
  
  // console.log(showImages, userImages, searchResults);

  const handleSave = async (url: string, byteSize: number, title: string) => {
    console.log(url, byteSize, title);
    try {
     const userImages = JSON.parse(Cookie.get('userImages') || '{}');
      const res = await axios.post(import.meta.env.VITE_API_URL + `/${userImages.id}`, JSON.stringify(
        { title, byteSize, url}),{
          headers: {
            'Content-Type': 'application/json'
        }
      })
      console.log(res.data);
      Cookie.set('userImages', JSON.stringify({
        user: res.data.user,
        id: res.data.id,
        favoriteImages: res.data.favoriteImages
      }));
      setUserImages((prv) => {
        return {
          ...prv,
          favoriteImages: res.data.favoriteImages
        }
      });
      
    } catch (error) {
      console.log(error, "error");
    }
  }

  return (
    <div>
      {isAuthenticated ? <>
        <LogoutButton />
        <input type="text" onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleFavoriteImages}>Show favorite images</button>

        {searchResults && !showImages && ((searchResults?.items?.length) ?? 0) > 0 ? (
          <div className="img-container">
            {searchResults?.spelling && (
              <div>
                <p>Search Results</p>
                <p>Did you mean:  <a onClick={() => {
                  setSearchTerm(searchResults.spelling?.correctedQuery ?? '');
                  handleSearch();
                }}>{searchResults.spelling?.correctedQuery}</a></p>
              </div>
            )}
            {searchResults?.searchInformation && (
              <div className="search-info-content">
                <p>Search Information</p>
                <p>search time {searchResults.searchInformation.searchTime} seconds</p>
              </div>
            )}
            {searchResults?.items?.map((result, index) => (
              <div className="img-content" key={index}>
                <p>{result.title}</p>
                <img src={result.link} alt="Search Result" className="img" />
                <p>{result.image.byteSize} bytes</p>
                <button onClick={() => {
                  handleSave(result.link, result.image.byteSize, result.title);
                }}>add to favorite list</button>
              </div>
            ))}
          </div>
        ) : !showImages && (
          <p>No results found</p>
        )}

        <div className="img-container">
          {showImages && (userImages.favoriteImages.length > 0) ? <>
            {userImages.favoriteImages.map((image, index) => (
              <div key={index} className="img-content">
                <img src={image.url} alt="Favorite Image" className="img" />
                <p>{image.byteSize} bytes</p>
              </div>
            ))}
          </> : !userImages && <>
            <p>No favorite images found</p>
          </>}
        </div>

      </> : <>
        <LoginButton />
        {
          isLoading && <p>Loading...</p>
        }
        <p>Loga in to see your favorite images</p>
      </>}
    </div>
  );
};