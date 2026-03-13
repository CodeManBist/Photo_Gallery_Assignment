export default SearchBar;
function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by author..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 w-full mb-4"
      aria-label="Search photos by author"
    />
  );
}

