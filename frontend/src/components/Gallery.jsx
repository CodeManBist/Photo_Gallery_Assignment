import { useState, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.download_url} alt={photo.author} />
            <p>{photo.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;