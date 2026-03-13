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

  // useCallback prevents unnecessary re-renders of SearchBar
  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  // useMemo efficiently computes filtered photos
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  // Show a Tailwind spinner while loading
  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  // Show a styled error message
  if (error)
    return (
      <div className="text-red-600 text-center font-semibold mt-8">
        {error}
      </div>
    );

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