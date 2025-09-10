// src/components/pages/LostItemsList/LostItemsList.jsx
import React, { useState, useEffect } from 'react';
import { mockLostItems } from '../../../../utils/mockData.js';
import Header from '../../../common/Header/Header.jsx';
import SearchBox from '../../../common/SearchBox/SearchBox.jsx';
import './LostItemsList.css';

// 簡単な検索・フィルタ関数
const filterMockData = (items = mockLostItems, params = {}) => {
  let filteredItems = [...items];

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredItems = filteredItems.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.タグ名.some(tag => tag.toLowerCase().includes(searchLower)) ||
      item.投稿者.toLowerCase().includes(searchLower)
    );
  }

  if (params.category) {
    filteredItems = filteredItems.filter(item =>
      item.タグ名.some(tag => tag.includes(params.category))
    );
  }

  filteredItems.sort((a, b) => new Date(b.発見日時) - new Date(a.発見日時));
  return filteredItems;
};

const LostItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // よく使われるタグをカテゴリとして定義
  const categories = [
    { value: '', label: 'すべてのカテゴリ' },
    { value: '財布', label: '財布・お金関連' },
    { value: 'iPhone', label: 'スマートフォン' },
    { value: '衣類', label: '衣類・服飾品' },
    { value: '学生証', label: '身分証明書・カード' },
    { value: '傘', label: '傘・雨具' },
    { value: '眼鏡', label: '眼鏡・メガネ' },
    { value: '鍵', label: '鍵・キーホルダー' },
    { value: 'バッグ', label: 'バッグ・かばん' },
    { value: '時計', label: '時計・アクセサリー' },
    { value: '文房具', label: '文房具・手帳' },
    { value: 'オーディオ', label: 'オーディオ機器' }
  ];

  // データ取得をシミュレート
  const fetchItems = async (params = {}) => {
    setLoading(true);
    try {
      // ローディングをシミュレート
      await new Promise(resolve => setTimeout(resolve, 800));
      const filteredData = filterMockData(mockLostItems, params);
      setItems(filteredData);
      console.log('取得したアイテム数:', filteredData.length);
    } catch (err) {
      console.error('データ取得エラー:', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // 初期データ読み込み
  useEffect(() => {
    fetchItems();
  }, []);

  // 日付フォーマット
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 検索処理
  const handleSearch = () => {
    fetchItems({ 
      search: searchQuery,
      category: selectedCategory || undefined 
    });
  };

  // アイテムクリック処理
  const handleItemClick = (item) => {
    console.log('アイテムクリック:', item);
    alert(`${item.title} の詳細表示（詳細ポップアップは後で実装予定）`);
  };

  // リセット処理
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    fetchItems({});
  };

  return (
    <div className="lost-items-list">
      {/* ヘッダー */}
      <Header role='admin'/>

      {/* メインコンテンツ */}
      <div className="container">
        {/* ページヘッダー */}
        <div className="lost-items-list__header">
          <h1 className="lost-items-list__title">落し物一覧</h1>
          <p className="lost-items-list__description">
            見つかった落し物の情報を確認できます（仮データで表示中）
          </p>
        </div>

        {/* 検索ボックス */}
        <SearchBox
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchQueryChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onSearch={handleSearch}
          onReset={handleReset}
          loading={loading}
        />

        {/* デバッグ情報 */}
        {import.meta.env.DEV && (
          <div className="lost-items-list__debug">
            <strong>デバッグ情報:</strong> 
            検索クエリ「{searchQuery || 'なし'}」 | 
            カテゴリ「{selectedCategory || 'すべて'}」 | 
            読み込み状態: {loading ? 'true' : 'false'}
          </div>
        )}

        {/* コンテンツエリア */}
        <div className="lost-items-list__content">
          {loading && (
            <div className="lost-items-list__loading">
              <div className="lost-items-list__spinner"></div>
              <p className="lost-items-list__loading-message">読み込み中...</p>
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="lost-items-list__empty">
              <div className="lost-items-list__empty-icon">📭</div>
              <h3 className="lost-items-list__empty-title">
                落し物が見つかりませんでした
              </h3>
              <p className="lost-items-list__empty-description">
                検索条件を変更して再度お試しください
              </p>
            </div>
          )}

          {!loading && items.length > 0 && (
            <>
              {/* 検索結果件数 */}
              <div className="lost-items-list__results-count">
                {items.length} 件の落し物が見つかりました
              </div>

              {/* アイテム一覧 */}
              <div className="lost-items-list__cards">
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="lost-items-list__card"
                    onClick={() => handleItemClick(item)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleItemClick(item);
                      }
                    }}
                  >
                    {/* 画像エリア */}
                    <div className="lost-items-list__card-image">
                      {item.imgurl ? (
                        <img 
                          src={item.imgurl} 
                          alt={item.title}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="lost-items-list__card-image-placeholder"
                        style={{ 
                          display: item.imgurl ? 'none' : 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%'
                        }}
                      >
                        📷
                      </div>
                    </div>

                    <div className="lost-items-list__card-content">
                      {/* タイトル */}
                      <h3 className="lost-items-list__card-title">
                        {item.title}
                      </h3>

                      {/* 発見日時 */}
                      <div className="lost-items-list__card-date">
                        <span className="lost-items-list__card-date-icon">🕐</span>
                        <span>発見日時: {formatDate(item.発見日時)}</span>
                      </div>

                      {/* アイテムID */}
                      <div className="lost-items-list__card-id">
                        #{item.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* フローティングアクションボタン */}
        <button
          className="lost-items-list__floating-btn"
          onClick={() => alert('落し物登録機能は後で実装予定')}
          title="新しい落し物を登録"
          aria-label="新しい落し物を登録"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LostItemsList;