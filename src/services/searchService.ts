// src/services/searchService.ts

import { FilterOptions, SearchResult } from '../types/searchTypes';
import { apiHelper } from '../utils/apiHelper';

export const fetchSearchResults = async (
  query: string,
  filters: FilterOptions,
  page: number
): Promise<SearchResult[]> => {
  const response = await apiHelper.post('/search', { query, filters, page });
  return response.data.results;
};
