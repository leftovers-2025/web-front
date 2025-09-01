
// utils/constants.js
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  LOST_ITEMS: '/lost-items',
  FOUND_ITEMS: '/found-items',
  AUTH: '/auth'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const UI_MESSAGES = {
  LOADING: '読み込み中...',
  NO_ITEMS: '落し物情報がありません',
  ERROR_FETCH: 'データの取得に失敗しました',
  ERROR_NETWORK: 'ネットワークエラーが発生しました'
};