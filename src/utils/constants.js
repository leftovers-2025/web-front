// utils/constants.js

// 環境変数の読み込み
const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const VITE_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

// 必須環境変数のチェック
if (import.meta.env.DEV && !VITE_API_URL) {
  throw new Error('VITE_API_URL environment variable is required');
}

// API Base URL
export const API_BASE_URL = VITE_API_URL;

// APIエンドポイントの定義
export const API_ENDPOINTS = {
  LOST_ITEMS: '/lost-items',
  FOUND_ITEMS: '/found-items',
  AUTH: '/auth',
  OAUTH: {
    GOOGLE_REDIRECT: '/oauth/google/redirect',
    GOOGLE_CALLBACK: '/oauth/google/callback',
    LOGOUT: '/oauth/logout'
  },
  HEALTH: '/health'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const UI_MESSAGES = {
  LOADING: '読み込み中...',
  NO_ITEMS: '落し物情報がありません',
  ERROR_FETCH: 'データの取得に失敗しました',
  ERROR_NETWORK: 'ネットワークエラーが発生しました',
  ERROR_TIMEOUT: 'タイムアウトしました',
  ERROR_SERVER: 'サーバーエラーが発生しました'
};

// OAuth設定
export const oauth = {
  client_id: VITE_GOOGLE_CLIENT_ID || "768142652597-qgjlmlhvrohghl0ic9l0rsng5r6ki23b.apps.googleusercontent.com",
  redirect_uri: VITE_REDIRECT_URI || "http://localhost:5173/redirect_test",
  scope: "openid email profile"
};

// 開発環境用の設定
export const DEV_CONFIG = {
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'debug',
  TIMEOUT: parseInt(import.meta.env.VITE_TIMEOUT) || 10000,
  RETRY_COUNT: parseInt(import.meta.env.VITE_RETRY_COUNT) || 3
};
