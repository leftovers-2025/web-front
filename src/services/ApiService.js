// src/services/apiService.js
// 自動トークン管理対応版

import { API_BASE_URL } from '../utils/constants.js';
import TokenManager from './TokenManager.js';

class ApiService {
  constructor() {
    this.apiBaseURL = API_BASE_URL;
    this.serverBaseURL = 'http://localhost:8630';
  }

  // ====================
  // 基本リクエスト処理（自動トークン管理対応）
  // ====================

  async request(url, options = {}) {
    try {
      const response = await fetch(url, options);

      // 401エラーの場合は自動でトークン更新
      if (response.status === 401) {
        const newToken = await TokenManager.refreshAccessToken();
        
        if (newToken) {
          // 新しいトークンでリトライ
          const updatedOptions = {
            ...options,
            headers: {
              ...options.headers,
              ...TokenManager.getAuthHeaders()
            }
          };
          
          const retryResponse = await fetch(url, updatedOptions);
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP ${retryResponse.status}: ${retryResponse.statusText}`);
          }
          
          return await retryResponse.json();
        }
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
      
    } catch (error) {
      console.error('API Request Failed:', error.message);
      throw error;
    }
  }

  // ====================
  // HTTPメソッド（自動認証対応）
  // ====================

  async get(endpoint, params = {}) {
    const queryString = Object.keys(params).length > 0 
      ? '?' + new URLSearchParams(params).toString() 
      : '';
    
    const url = `${this.apiBaseURL}${endpoint}${queryString}`;
    
    return this.request(url, {
      method: 'GET',
      headers: TokenManager.getAuthHeaders()
    });
  }

  async post(endpoint, data = {}) {
    const url = `${this.apiBaseURL}${endpoint}`;
    
    return this.request(url, {
      method: 'POST',
      headers: TokenManager.getAuthHeaders(),
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data = {}) {
    const url = `${this.apiBaseURL}${endpoint}`;
    
    return this.request(url, {
      method: 'PUT',
      headers: TokenManager.getAuthHeaders(),
      body: JSON.stringify(data)
    });
  }

  async patch(endpoint, data = {}) {
    const url = `${this.apiBaseURL}${endpoint}`;
    
    return this.request(url, {
      method: 'PATCH',
      headers: TokenManager.getAuthHeaders(),
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    const url = `${this.apiBaseURL}${endpoint}`;
    
    return this.request(url, {
      method: 'DELETE',
      headers: TokenManager.getAuthHeaders()
    });
  }

  // ====================
  // OAuth認証専用メソッド（認証トークンなし）
  // ====================

  async getOAuth(endpoint, params = {}) {
    const queryString = Object.keys(params).length > 0 
      ? '?' + new URLSearchParams(params).toString() 
      : '';
    
    const url = `${this.serverBaseURL}${endpoint}${queryString}`;
    
    return this.request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // ====================
  // ユーティリティメソッド
  // ====================

  saveAuthToken(token) {
    TokenManager.saveTokens({ accessToken: token });
  }

  clearAuthToken() {
    TokenManager.clearAllTokens();
  }

  isAuthenticated() {
    return TokenManager.isAuthenticated();
  }

  // ====================
  // APIエンドポイント
  // ====================

  // ユーザー関連
  async getUserInfo() {
    return this.get('/users/@me');
  }

  // 投稿関連
  async getPosts(params = {}) {
    return this.get('/posts', params);
  }

  async createPost(postData) {
    return this.post('/posts', postData);
  }

  // タグ・ロケーション
  async getTags() {
    return this.get('/tags');
  }

  async getLocations() {
    return this.get('/locations');
  }

  // OAuth認証
  async authenticateWithGoogle(code) {
    return this.getOAuth('/oauth/google/redirect', { code });
  }

  // 落し物・忘れ物
  async getLostItems(params = {}) {
    return this.get('/lost-items', params);
  }

  async getFoundItems(params = {}) {
    return this.get('/found-items', params);
  }

  async createLostItem(itemData) {
    return this.post('/lost-items', itemData);
  }

  async createFoundItem(itemData) {
    return this.post('/found-items', itemData);
  }
}

export default new ApiService();
