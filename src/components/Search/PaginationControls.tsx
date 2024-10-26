// src/components/Search/PaginationControls.tsx

import React from 'react';

export const PaginationControls: React.FC<{
  page: number;
  setPage: (page: number) => void;
}> = ({ page, setPage }) => (
  <div className="pagination-controls">
    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
      Previous
    </button>
    <span>Page {page}</span>
    <button onClick={() => setPage(page + 1)}>Next</button>
  </div>
);
