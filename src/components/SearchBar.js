export const SearchBar = ({ filters, updateFilter }) => {
  return (
    <div>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        value={filters}
        onChange={evt => updateFilter(evt.target.value)}
      />
    </div>
  );
};
