// src/components/common/Pagination/Pagination.jsx
import React from 'react';
import './Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  loading = false,
  maxVisiblePages = 5 
}) => {
  // ページ番号ボタンの生成
  const generatePageNumbers = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // 開始ページの調整
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    // 最初のページと省略記号
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    // メインのページ番号
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // 最後のページと省略記号
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  // ページ変更処理
  const handlePageChange = (newPage) => {
    if (newPage === currentPage || loading || newPage < 1 || newPage > totalPages) {
      return;
    }
    onPageChange(newPage);
  };

  // 前のページ
  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  // 次のページ
  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  // ページが1ページのみの場合は表示しない
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers();

  return (
    <nav className="pagination" aria-label="ページネーション">
      <div className="pagination__container">
        {/* 前のページボタン */}
        <button
          className={`pagination__button pagination__button--prev ${
            currentPage === 1 || loading ? 'pagination__button--disabled' : ''
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1 || loading}
          aria-label="前のページ"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="pagination__button-text">前へ</span>
        </button>

        {/* ページ番号ボタン群 */}
        <div className="pagination__numbers">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={`${page}-${index}`}>
              {page === '...' ? (
                <span className="pagination__ellipsis">...</span>
              ) : (
                <button
                  className={`pagination__number ${
                    page === currentPage ? 'pagination__number--active' : ''
                  } ${loading ? 'pagination__number--loading' : ''}`}
                  onClick={() => handlePageChange(page)}
                  disabled={loading}
                  aria-label={`ページ ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 次のページボタン */}
        <button
          className={`pagination__button pagination__button--next ${
            currentPage === totalPages || loading ? 'pagination__button--disabled' : ''
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages || loading}
          aria-label="次のページ"
        >
          <span className="pagination__button-text">次へ</span>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ページ情報表示 */}
      <div className="pagination__info">
        ページ {currentPage} / {totalPages}
      </div>
    </nav>
  );
};

export default Pagination;