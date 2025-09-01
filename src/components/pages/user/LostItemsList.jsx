// components/pages/user/LostItemsList.jsx - インラインスタイル版
import React, { useState, useEffect } from 'react';
import { mockLostItems } from '../../../utils/mockData.js';

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
  const handleSearch = (e) => {
    e.preventDefault();
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem 2rem 1rem' }}>
      {/* ページヘッダー */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#111827',
          marginBottom: '0.5rem',
          margin: '0 0 0.5rem 0'
        }}>
          落し物一覧
        </h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          見つかった落し物の情報を確認できます（仮データで表示中）
        </p>
      </div>

      {/* 検索・フィルター */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <form onSubmit={handleSearch}>
          <div style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: '1fr',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              {/* 検索キーワード */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.25rem'
                }}>
                  キーワード検索
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="アイテム名、タグ、投稿者で検索..."
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* カテゴリ選択 */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.25rem'
                }}>
                  カテゴリ（タグ検索）
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ボタン */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.background = '#2563eb'}
              >
                検索
              </button>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#e5e7eb',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#d1d5db'}
                onMouseOut={(e) => e.target.style.background = '#e5e7eb'}
              >
                リセット
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* デバッグ情報 */}
      <div style={{
        marginBottom: '1rem',
        padding: '0.75rem',
        background: '#fefce8',
        border: '1px solid #fde047',
        borderRadius: '8px'
      }}>
        <p style={{ fontSize: '0.75rem', color: '#a16207', margin: 0 }}>
          <strong>デバッグ情報:</strong> 
          検索クエリ「{searchQuery || 'なし'}」 | 
          カテゴリ「{selectedCategory || 'すべて'}」 | 
          読み込み状態: {loading ? 'true' : 'false'}
        </p>
      </div>

      {/* コンテンツエリア */}
      <div>
        {loading && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '4rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #dbeafe',
              borderTop: '4px solid #2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }}></div>
            <p style={{ color: '#6b7280' }}>読み込み中...</p>
          </div>
        )}

        {!loading && items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '500', 
              color: '#111827',
              margin: '0 0 0.5rem 0' 
            }}>
              落し物が見つかりませんでした
            </h3>
            <p style={{ color: '#6b7280', margin: 0 }}>
              検索条件を変更して再度お試しください
            </p>
          </div>
        )}

        {!loading && items.length > 0 && (
          <>
            {/* 検索結果件数 */}
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                {items.length} 件の落し物が見つかりました
              </p>
            </div>

            {/* アイテム一覧 */}
            <div style={{
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
            }}>
              {items.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  {/* 画像エリア */}
                  <div style={{ width: '100%', height: '200px', overflow: 'hidden', background: '#f3f4f6' }}>
                    {item.imgurl ? (
                      <img 
                        src={item.imgurl} 
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      display: item.imgurl ? 'none' : 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      color: '#9ca3af'
                    }}>
                      📷
                    </div>
                  </div>

                  <div style={{ padding: '1rem' }}>
                    {/* タイトル */}
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#111827',
                      margin: '0 0 0.75rem 0',
                      minHeight: '3.5rem',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {item.title}
                    </h3>

                    {/* 発見日時 */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '0.75rem'
                    }}>
                      <span style={{ marginRight: '0.5rem' }}>🕐</span>
                      <span>発見日時: {formatDate(item.発見日時)}</span>
                    </div>

                    {/* アイテムID */}
                    <div style={{ textAlign: 'right', marginTop: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                        #{item.id}
                      </span>
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
        onClick={() => alert('落し物登録機能は後で実装予定')}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: '#2563eb',
          color: 'white',
          padding: '1rem',
          borderRadius: '50%',
          border: 'none',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          width: '4rem',
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#1d4ed8';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = '#2563eb';
          e.target.style.transform = 'scale(1)';
        }}
        title="新しい落し物を登録"
      >
        <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* スピンアニメーション用CSS */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LostItemsList;