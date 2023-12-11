import { useState, useCallback } from "react";

const Search = () => {
  const [filter, setFilter] = useState("");

  const search = useCallback(() => {}, []);
  const links = [];

  return (
    <div>
      <div>
        Search
        <input type="text" onChange={(e) => setFilter(e.target.value)} />
        <button onClick={search}>search</button>
      </div>
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
};

export default Search;
