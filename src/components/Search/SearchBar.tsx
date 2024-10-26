// src/components/Search/SearchBar.tsx

import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

export const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedSearch = useDebounce((val) => onSearch(val), 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="search-bar mb-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search across supply chains, reports, metrics..."
      />
    </div>
  );
};
