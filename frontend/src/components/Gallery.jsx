import useFetchPhotos from "../hooks/useFetchPhotos";






import { useState, useMemo, useReducer, useEffect, useCallback } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouriteReducer } from "../reducer/favouriteReducer";
import SearchBar from "./SearchBar";
import PhotoCard from "./PhotoCard";

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");
  const [favourites, dispatch] = useReducer(favouriteReducer, [], () => {
    const favs = localStorage.getItem("favourites");
    return favs ? JSON.parse(favs) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <SearchBar search={search} setSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavourite={!!favourites.find((fav) => fav.id === photo.id)}
            onToggle={(photo) => dispatch({ type: "TOGGLE", payload: photo })}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;