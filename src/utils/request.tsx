import axios from 'axios';
import { sleep } from '.';

let baseURL = 'http://localhost:3004/';


const api = axios.create({
  baseURL,
});

export const getTransactions = async (page: number, limit: number = 10, cashflow: null | 'inflow' | 'outflow') => {
  // Simulate network latency with a delay to demonstrate loading states
  await sleep(500);

  const url = `/transactions?_page=${page}&_per_page=${limit}&_sort=-transactiondate${cashflow !== null ? `&cashflow=${cashflow}` : ''}`;
  const response = await api.get(url);
  const totalCount = response.data.items;
  return { transactions: response.data.data, hasMore: page * limit < totalCount };
};

/**
 * TODO: Implement request interceptor to handle:
 * 1. Request deduplication - prevent multiple identical API calls
 * 2. Global error handling and standardized error responses
 * 3. Request cancellation on filter changes (when page=1)
 * 
 * TODO: Implement response interceptor to:
 * 1. Clean up and remove completed requests from pending request tracking
 */
