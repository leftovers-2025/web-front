// hooks/useLostItems.js
import { useState, useEffect } from 'react';
import { mockLostItems, filterMockData } from '../utils/mockData.js';
import { UI_MESSAGES } from '../utils/constants.js';

export const useLostItems = (initialParams = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  // 仮データを使った取得関数（API通信をシミュレート）
  const fetchItems = async (searchParams = params) => {
    setLoading(true);
    setError(null);
    
    try {
      // API通信をシミュレート（ローディング時間を設ける）
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 仮データをフィルタリング
      const filteredData = filterMockData(mockLostItems, searchParams);
      setItems(filteredData);
      
      console.log('取得したアイテム数:', filteredData.length);
      console.log('検索パラメータ:', searchParams);
    } catch (err) {
      setError(err.message || UI_MESSAGES.ERROR_FETCH);
      setItems([]);
      console.error('データ取得エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  // リフレッシュ関数
  const refresh = () => {
    console.log('データを再読み込み中...');
    fetchItems(params);
  };

  // 検索パラメータ更新
  const updateParams = (newParams) => {
    console.log('検索パラメータ更新:', newParams);
    setParams(prev => ({ ...prev, ...newParams }));
  };

  // 初期データ読み込み
  useEffect(() => {
    fetchItems();
  }, [params]);

  return {
    items,
    loading,
    error,
    refresh,
    updateParams,
    fetchItems
  };
};

// 個別アイテム取得用hook（仮データ対応）
export const useLostItem = (itemId) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItem = async (id) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // API通信をシミュレート
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 仮データから該当アイテムを検索
      const foundItem = mockLostItems.find(item => item.id === id);
      
      if (foundItem) {
        setItem(foundItem);
        console.log('アイテム詳細を取得:', foundItem);
      } else {
        throw new Error('アイテムが見つかりません');
      }
    } catch (err) {
      setError(err.message || UI_MESSAGES.ERROR_FETCH);
      setItem(null);
      console.error('アイテム取得エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem(itemId);
  }, [itemId]);

  return {
    item,
    loading,
    error,
    refetch: () => fetchItem(itemId)
  };
};