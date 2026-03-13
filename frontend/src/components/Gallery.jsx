import useFetchPhotos from "../hooks/useFetchPhotos";

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.download_url} />
          <p>{photo.author}</p>
        </div>
      ))}
    </div>
  )
}

export default Gallery
