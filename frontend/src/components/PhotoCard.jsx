function PhotoCard({ photo }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <img src={photo.download_url} alt={photo.author} />
      <div className="p-2 flex justify-between">
        <p>{photo.author}</p>
        <button>❤️</button>
      </div>
    </div>
  );
}

export default PhotoCard;