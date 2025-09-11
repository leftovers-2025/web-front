// src/components/pages/teacher/CreatePost/LocationSelector.jsx
import React, { useState, useEffect, useRef } from 'react';
import './LocationSelector.css';

const LocationSelector = ({ locations, selectedLocationId, onLocationSelect, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // 選択された場所の名前を取得
  const selectedLocation = locations.find(loc => loc.id === selectedLocationId);
  const displayText = selectedLocation ? selectedLocation.name : '';

  // 検索フィルタリング
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchQuery, locations]);

  // ドロップダウンが開いたときにフォーカス設定
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // 外部クリックでクローズ
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // ESCキーでクローズ
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // セレクトボックスのトグル
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery('');
    }
  };

  // 場所選択
  const handleLocationClick = (location) => {
    onLocationSelect(location.id);
    setIsOpen(false);
    setSearchQuery('');
  };

  // 検索入力変更
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 検索クリア
  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="location-selector" ref={containerRef}>
      <div 
        className={`location-selector__trigger ${
          error ? 'location-selector__trigger--error' : ''
        } ${isOpen ? 'location-selector__trigger--open' : ''}`}
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        <span className={`location-selector__display-text ${
          !displayText ? 'location-selector__display-text--placeholder' : ''
        }`}>
          {displayText || '場所を選択してください'}
        </span>
        <span className={`location-selector__arrow ${
          isOpen ? 'location-selector__arrow--open' : ''
        }`}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="location-selector__dropdown">
          <div className="location-selector__search-box">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="場所を検索..."
              className="location-selector__search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="location-selector__search-clear"
                onClick={clearSearch}
                aria-label="検索をクリア"
              >
                ✕
              </button>
            )}
          </div>

          <div className="location-selector__options" role="listbox">
            {filteredLocations.length === 0 ? (
              <div className="location-selector__empty">
                <div className="location-selector__empty-icon">🔍</div>
                <p className="location-selector__empty-message">
                  {searchQuery ? 
                    `「${searchQuery}」に一致する場所が見つかりませんでした` : 
                    '場所がありません'
                  }
                </p>
              </div>
            ) : (
              filteredLocations.map(location => (
                <div
                  key={location.id}
                  className={`location-selector__option ${
                    location.id === selectedLocationId ? 'location-selector__option--selected' : ''
                  }`}
                  onClick={() => handleLocationClick(location)}
                  role="option"
                  aria-selected={location.id === selectedLocationId}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLocationClick(location);
                    }
                  }}
                >
                  <span className="location-selector__option-text">
                    {location.name}
                  </span>
                  {location.id === selectedLocationId && (
                    <span className="location-selector__checkmark">
                      ✓
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          {filteredLocations.length > 0 && (
            <div className="location-selector__footer">
              <span className="location-selector__count">
                {filteredLocations.length} 件の場所が見つかりました
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;