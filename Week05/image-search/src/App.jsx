/*
  For the default search I used useEffect with an empty
  dependency array [] because I only want it to run when
  the app first loads, rather than after every render.

  I also used useRef to stop the initial search from
  running twice in development.

  If I put images in the dependency array, the effect
  would run whenever the images state changed. Since
  the search itself updates images, this could cause
  repeated API requests and potentially create a loop.

  I kept the search results in App because both the
  search function and ImageList need access to them.
*/
import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import ImageList from "./components/ImageList";
import { searchImages } from "./api";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const initialSearchStarted = useRef(false);

  const handleSubmit = async (term) => {
    setSearchTerm(term);
    setIsLoading(true);
    setError(null);
    setSearched(true);

    try {
      // console.log(`Searching for: ${term}`)
      // since our imageSearch function is async and we need to await the results,
      // we need to await when calling searchImages()
      // which means, you need to flag this function async
      const results = await searchImages(term);
      setImages(results);
    } catch (err) {
      console.error(err);
      setError("The search did not work. Check the console.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only start the default search once when the app opens.
    if (initialSearchStarted.current) return;

    initialSearchStarted.current = true;
    handleSubmit("cats");
  }, []);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} /> <br />
      {isLoading && <p className="p-4 text-gray-500">Searching ...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}
      {!isLoading && !error && searched && images.length === 0 && (
        <p className="p-4 text-gray-500">
          No photos for that one. Try another word!
        </p>
      )}
      {searched && (
        <h2 className="text-2xl font-bold px-4 mb-4">
          Results for: {searchTerm}
        </h2>
      )}
      <ImageList images={images} />
    </div>
  );
};

export default App;
