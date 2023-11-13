const Search = ({ filter }) => {
  return (
    <div>
      <p>
        Filter by name: <input onChange={filter} />
      </p>
    </div>
  );
};

export default Search;
