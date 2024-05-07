import { ChangeEvent } from "react";

interface SearchProps {
  search: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Search({ search, onChange }: SearchProps) {
  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder=" Search Planet"
        value={search}
        onChange={onChange}
      />
    </div>
  );
}

export default Search;
