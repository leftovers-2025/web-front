import apiService from './apiService.js';
import { API_ENDPOINTS } from '../utils/constants.js';

export const lostItemsService = {
  // 落し物一覧取得
  async getLostItems(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = queryParams 
      ? `${API_ENDPOINTS.LOST_ITEMS}?${queryParams}`
      : API_ENDPOINTS.LOST_ITEMS;
    
    return apiService.get(endpoint);
  },

  // 特定の落し物取得
  async getLostItemById(id) {
    return apiService.get(`${API_ENDPOINTS.LOST_ITEMS}/${id}`);
  },

  // 落し物登録
  async createLostItem(itemData) {
    return apiService.post(API_ENDPOINTS.LOST_ITEMS, itemData);
  },

  // 落し物更新
  async updateLostItem(id, itemData) {
    return apiService.put(`${API_ENDPOINTS.LOST_ITEMS}/${id}`, itemData);
  },

  // 落し物削除
  async deleteLostItem(id) {
    return apiService.delete(`${API_ENDPOINTS.LOST_ITEMS}/${id}`);
  }
};