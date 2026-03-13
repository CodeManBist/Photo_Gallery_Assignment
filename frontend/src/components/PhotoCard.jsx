
function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-2 flex justify-between items-center">
        <p>{photo.author}</p>
        <button
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          onClick={() => onToggle(photo)}
          className="text-xl"
        >
          {isFavourite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;