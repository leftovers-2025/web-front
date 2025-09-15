// src/components/pages/LostItemsList/LostItemsList.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../../../../services/ApiService.js';
import Header from '../../../common/Header/Header.jsx';
import SearchBox from '../../../common/SearchBox/SearchBox.jsx';
import LostItemDetailModal from './LostItemDetailModal.jsx';
import Pagination from '../../../common/Pagination/Pagination.jsx';
import './LostItemsList.css';

const LostItemsList = () => {
  // ステート管理
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // ページネーション関連
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(12); // 1ページあたりの表示件数

  // データ変換関数：APIレスポンス → 表示用データ
  const transformApiData = (apiItem) => {
    return {
      id: apiItem.id,
      title: apiItem.description || '詳細なし',
      imgurl: apiItem.images && apiItem.images.length > 0 ? apiItem.images[0] : null,
      発見日時: apiItem.createdAt,
      タグ名: apiItem.tags ? apiItem.tags.map(tag => tag.name) : [],
      投稿者: apiItem.userId || '不明',
      場所: apiItem.location ? apiItem.location.name : '不明',
      // 詳細表示用の追加情報
      allImages: apiItem.images || [],
      locationId: apiItem.location ? apiItem.location.id : null,
      updatedAt: apiItem.updatedAt,
      rawData: apiItem // 元データも保持
    };
  };

  // API からデータを取得
  const fetchItems = async (params = {}) => {
    setLoading(true);
    try {
      // APIパラメータの構築
      const apiParams = {
        limit: itemsPerPage,
        page: currentPage,
        ...params
      };

      // 検索クエリがある場合
      if (params.search && params.search.trim()) {
        apiParams.query = params.search.trim();
      }

      console.log('APIリクエストパラメータ:', apiParams);

      // API呼び出し
      const response = await apiService.getPosts(apiParams);
      
      console.log('API レスポンス:', response);

      // レスポンスの構造を確認
      if (Array.isArray(response)) {
        // 単純な配列の場合
        const transformedItems = response.map(transformApiData);
        setItems(transformedItems);
        setTotalItems(response.length);
        setTotalPages(Math.ceil(response.length / itemsPerPage));
      } else if (response && Array.isArray(response.items)) {
        // ページネーション情報付きレスポンスの場合
        const transformedItems = response.items.map(transformApiData);
        setItems(transformedItems);
        setTotalItems(response.total || response.items.length);
        setTotalPages(response.totalPages || Math.ceil((response.total || response.items.length) / itemsPerPage));
      } else if (response && Array.isArray(response.data)) {
        // data プロパティに配列がある場合
        const transformedItems = response.data.map(transformApiData);
        setItems(transformedItems);
        setTotalItems(response.total || response.data.length);
        setTotalPages(response.totalPages || Math.ceil((response.total || response.data.length) / itemsPerPage));
      } else {
        console.warn('予期しないAPIレスポンス形式:', response);
        setItems([]);
        setTotalItems(0);
        setTotalPages(0);
      }

    } catch (error) {
      console.error('データ取得エラー:', error);
      setItems([]);
      setTotalItems(0);
      setTotalPages(0);
      
      // エラー通知（必要に応じてtoastライブラリなどを使用）
      alert(`データの取得に失敗しました: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 初期データ読み込み
  useEffect(() => {
    fetchItems();
  }, [currentPage]); // ページが変更されたら再取得

  // 日付フォーマット関数
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.warn('日付フォーマットエラー:', error);
      return dateString;
    }
  };

  // 検索処理
  const handleSearch = () => {
    setCurrentPage(1); // 検索時は1ページ目に戻る
    fetchItems({ 
      search: searchQuery
    });
  };

  // アイテムクリック処理（詳細ポップアップ表示）
  const handleItemClick = (item) => {
    console.log('アイテムクリック:', item);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // ポップアップを閉じる
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // 検索リセット処理
  const handleReset = () => {
    setSearchQuery('');
    setCurrentPage(1);
    fetchItems({});
  };

  // ページ変更処理
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // useEffectでcurrentPageの変更を監視して自動的にfetchItemsが呼ばれる
  };

  // 再読み込み処理
  const handleRefresh = () => {
    fetchItems({ search: searchQuery });
  };

  return (
    <div className="lost-items-list">
      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツ */}
      <div className="container">
        {/* ページヘッダー */}
        <div className="lost-items-list__header">
          <h1 className="lost-items-list__title">落し物一覧</h1>
          <p className="lost-items-list__description">
            見つかった落し物の情報を確認できます
          </p>
        </div>

        {/* 検索ボックス（カテゴリセレクトボックスを削除） */}
        <SearchBox
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleSearch}
          onReset={handleReset}
          loading={loading}
          placeholder="キーワードで検索..."
          showRefreshButton={true}
          onRefresh={handleRefresh}
        />

        {/* デバッグ情報 */}
        {import.meta.env.DEV && (
          <div className="lost-items-list__debug">
            <strong>デバッグ情報:</strong> 
            検索クエリ「{searchQuery || 'なし'}」 | 
            ページ {currentPage}/{totalPages} | 
            総件数 {totalItems} | 
            読み込み状態: {loading ? 'true' : 'false'}
          </div>
        )}

        {/* コンテンツエリア */}
        <div className="lost-items-list__content">
          {/* ローディング状態 */}
          {loading && (
            <div className="lost-items-list__loading">
              <div className="lost-items-list__spinner"></div>
              <p className="lost-items-list__loading-message">読み込み中...</p>
            </div>
          )}

          {/* 空状態 */}
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

          {/* アイテム一覧 */}
          {!loading && items.length > 0 && (
            <>
              {/* 検索結果件数とページ情報 */}
              <div className="lost-items-list__results-info">
                <div className="lost-items-list__results-count">
                  {totalItems} 件の落し物が見つかりました
                  {totalPages > 1 && (
                    <span className="lost-items-list__page-info">
                      （ページ {currentPage}/{totalPages}）
                    </span>
                  )}
                </div>
              </div>

              {/* アイテムカード一覧 */}
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
                        e.preventDefault();
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

                      {/* 場所情報 */}
                      {item.場所 && item.場所 !== '不明' && (
                        <div className="lost-items-list__card-location">
                          <span className="lost-items-list__card-location-icon">📍</span>
                          <span>{item.場所}</span>
                        </div>
                      )}

                      {/* タグ */}
                      {item.タグ名 && item.タグ名.length > 0 && (
                        <div className="lost-items-list__card-tags">
                          {item.タグ名.slice(0, 3).map((tag, index) => (
                            <span key={index} className="lost-items-list__card-tag">
                              {tag}
                            </span>
                          ))}
                          {item.タグ名.length > 3 && (
                            <span className="lost-items-list__card-tag-more">
                              +{item.タグ名.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* アイテムID */}
                      <div className="lost-items-list__card-id">
                        #{item.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="lost-items-list__pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    loading={loading}
                  />
                </div>
              )}
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

      {/* 詳細ポップアップモーダル */}
      {selectedItem && (
        <LostItemDetailModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default LostItemsList;