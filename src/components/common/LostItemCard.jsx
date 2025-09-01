// components/common/LostItemCard.jsx
import React from 'react';

const LostItemCard = ({ item, onClick, className = '' }) => {
  const {
    id,
    title,
    imgurl,
    発見日時
  } = item;

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

  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {/* 画像エリア */}
      <div className="w-full h-48 overflow-hidden bg-gray-100">
        {imgurl ? (
          <img 
            src={imgurl} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // 画像読み込み失敗時のプレースホルダー
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        {/* プレースホルダー */}
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl" style={{display: imgurl ? 'none' : 'flex'}}>
          📷
        </div>
      </div>

      <div className="p-4">
        {/* タイトル */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>

        {/* 発見日時 */}
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">🕐</span>
          <span>発見日時: {formatDate(発見日時)}</span>
        </div>

        {/* アイテムID（右下に小さく表示） */}
        <div className="mt-3 text-right">
          <span className="text-xs text-gray-400">
            #{id}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LostItemCard;