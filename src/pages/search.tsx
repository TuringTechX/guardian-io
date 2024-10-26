// src/pages/search.tsx

import React, { useState } from 'react';
import { SearchBar } from '../components/Search/SearchBar';
import { SearchFilters } from '../components/Search/SearchFilters';
import { SearchResults } from '../components/Search/SearchResults';
import { PaginationControls } from '../components/Search/PaginationControls';
import { useSearch } from '../hooks/useSearch';
import '../styles/search.css';

const SearchPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { results, isLoading, search, filters, setFilters } = useSearch();

  return (
    <div className="search-page container mx-auto py-8">
      <SearchBar onSearch={search} />
      <SearchFilters filters={filters} setFilters={setFilters} />
      {isLoading ? <Spinner /> : <SearchResults results={results} />}
      <PaginationControls page={page} setPage={setPage} />
    </div>
  );
};

export default SearchPage;
