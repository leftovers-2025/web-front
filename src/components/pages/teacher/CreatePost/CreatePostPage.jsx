// src/components/pages/teacher/CreatePost/CreatePostPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../../services/ApiService.js';
import Header from '../../../common/Header/Header.jsx';
import TagSelector from './TagSelector.jsx';
import LocationSelector from './LocationSelector.jsx';
import ImageUploader from './ImageUploader.jsx';
import './CreatePostPage.css';

const CreatePostPage = () => {
  const navigate = useNavigate();
  
  // フォーム状態
  const [formData, setFormData] = useState({
    description: '',
    locationId: '',
    tagIds: [],
    images: [null, null, null] // 最大3枚
  });
  
  // UI状態
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isTagSelectorOpen, setIsTagSelectorOpen] = useState(false);
  
  // データ状態
  const [locations, setLocations] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  // 権限チェック
  useEffect(() => {
    const checkUserPermission = async () => {
      try {
        const userInfo = await apiService.getUserInfo();
        
        // teacher、root以外はリダイレクト
        if (!['teacher', 'root'].includes(userInfo.role)) {
          console.log('権限不足によりリダイレクト:', userInfo.role);
          navigate('/');
          return;
        }
        
      } catch (error) {
        console.error('ユーザー情報取得エラー:', error);
        // 認証エラーの場合もリダイレクト
        navigate('/');
      }
    };
    
    checkUserPermission();
  }, [navigate]);
  
  // 初期データ読み込み
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [locationsData, tagsData] = await Promise.all([
          apiService.getLocations(),
          apiService.getTags()
        ]);
        
        setLocations(locationsData || []);
        setTags(tagsData || []);
      } catch (error) {
        console.error('初期データ取得エラー:', error);
        setErrors({ general: 'データの読み込みに失敗しました' });
      }
    };
    
    fetchInitialData();
  }, []);
  
  // バリデーション
  const validateForm = () => {
    const newErrors = {};
    
    // 説明文チェック
    if (!formData.description.trim()) {
      newErrors.description = '説明文は必須です';
    } else if (formData.description.length > 200) {
      newErrors.description = '説明文は200文字以内で入力してください';
    }
    
    // 場所チェック
    if (!formData.locationId) {
      newErrors.locationId = '場所の選択は必須です';
    }
    
    // タグチェック
    if (formData.tagIds.length === 0) {
      newErrors.tagIds = '最低1つのタグを選択してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // フォーム送信
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // 投稿データの準備
      const postData = {
        description: formData.description.trim(),
        locationId: formData.locationId,
        tagIds: formData.tagIds.join(','), // カンマ区切り文字列
        image1: formData.images[0],
        image2: formData.images[1],
        image3: formData.images[2]
      };
      
      // API呼び出し
      await apiService.createPostWithFiles(postData);
      
      // 成功時はルートページにリダイレクト
      navigate('/');
      
    } catch (error) {
      console.error('投稿エラー:', error);
      setErrors({ general: '投稿に失敗しました。もう一度お試しください。' });
    } finally {
      setLoading(false);
    }
  };
  
  // 説明文変更
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, description: value }));
    
    // リアルタイムバリデーション
    if (errors.description) {
      const newErrors = { ...errors };
      if (value.trim() && value.length <= 200) {
        delete newErrors.description;
        setErrors(newErrors);
      }
    }
  };
  
  // 場所選択
  const handleLocationSelect = (locationId) => {
    setFormData(prev => ({ ...prev, locationId }));
    
    // エラークリア
    if (errors.locationId) {
      const newErrors = { ...errors };
      delete newErrors.locationId;
      setErrors(newErrors);
    }
  };
  
  // タグ選択完了
  const handleTagsSelect = (selectedTagIds) => {
    setFormData(prev => ({ ...prev, tagIds: selectedTagIds }));
    setSelectedTags(tags.filter(tag => selectedTagIds.includes(tag.id)));
    setIsTagSelectorOpen(false);
    
    // エラークリア
    if (errors.tagIds) {
      const newErrors = { ...errors };
      delete newErrors.tagIds;
      setErrors(newErrors);
    }
  };
  
  // 画像変更
  const handleImageChange = (index, file) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages[index] = file;
      return { ...prev, images: newImages };
    });
  };
  
  // エラークリア
  const clearGeneralError = () => {
    if (errors.general) {
      const newErrors = { ...errors };
      delete newErrors.general;
      setErrors(newErrors);
    }
  };

  return (
    <div className="create-post-page">
      <Header />
      
      <div className="container">
        <div className="create-post-page__header">
          <h1 className="create-post-page__title">新しい投稿を作成</h1>
          <p className="create-post-page__description">
            見つけた忘れ物の情報を投稿してください
          </p>
        </div>
        
        {/* 全般エラー */}
        {errors.general && (
          <div className="create-post-page__error-banner">
            <span className="create-post-page__error-icon">⚠️</span>
            <span>{errors.general}</span>
            <button 
              type="button"
              className="create-post-page__error-close"
              onClick={clearGeneralError}
            >
              ✕
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="create-post-page__form">
          {/* 説明文 */}
          <div className="create-post-page__field">
            <label htmlFor="description" className="create-post-page__label">
              説明文 <span className="create-post-page__required">*</span>
            </label>
            <div className="create-post-page__textarea-wrapper">
              <textarea
                id="description"
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="見つけた忘れ物について詳しく説明してください..."
                className={`create-post-page__textarea ${errors.description ? 'create-post-page__textarea--error' : ''}`}
                rows={4}
                maxLength={200}
              />
              <div className="create-post-page__char-count">
                {formData.description.length}/200
              </div>
            </div>
            {errors.description && (
              <div className="create-post-page__error-message">
                {errors.description}
              </div>
            )}
          </div>
          
          {/* 場所選択 */}
          <div className="create-post-page__field">
            <label className="create-post-page__label">
              発見場所 <span className="create-post-page__required">*</span>
            </label>
            <LocationSelector
              locations={locations}
              selectedLocationId={formData.locationId}
              onLocationSelect={handleLocationSelect}
              error={errors.locationId}
            />
            {errors.locationId && (
              <div className="create-post-page__error-message">
                {errors.locationId}
              </div>
            )}
          </div>
          
          {/* タグ選択 */}
          <div className="create-post-page__field">
            <label className="create-post-page__label">
              タグ <span className="create-post-page__required">*</span>
            </label>
            <div className="create-post-page__tag-section">
              <button
                type="button"
                className={`create-post-page__tag-button ${errors.tagIds ? 'create-post-page__tag-button--error' : ''}`}
                onClick={() => setIsTagSelectorOpen(true)}
              >
                {selectedTags.length > 0 ? (
                  <span>
                    {selectedTags.length}個のタグを選択中
                  </span>
                ) : (
                  <span>タグを選択してください</span>
                )}
                <span className="create-post-page__tag-button-icon">▼</span>
              </button>
              
              {/* 選択済みタグ表示 */}
              {selectedTags.length > 0 && (
                <div className="create-post-page__selected-tags">
                  {selectedTags.map(tag => (
                    <span key={tag.id} className="create-post-page__selected-tag">
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {errors.tagIds && (
              <div className="create-post-page__error-message">
                {errors.tagIds}
              </div>
            )}
          </div>
          
          {/* 画像アップロード */}
          <div className="create-post-page__field">
            <label className="create-post-page__label">
              画像（最大3枚）
            </label>
            <ImageUploader
              images={formData.images}
              onImageChange={handleImageChange}
            />
          </div>
          
          {/* 送信ボタン */}
          <div className="create-post-page__actions">
            <button
              type="button"
              className="create-post-page__cancel-button"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="create-post-page__submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="create-post-page__spinner"></span>
                  投稿中...
                </>
              ) : (
                '投稿する'
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* タグ選択ポップアップ */}
      {isTagSelectorOpen && (
        <TagSelector
          tags={tags}
          selectedTagIds={formData.tagIds}
          onClose={() => setIsTagSelectorOpen(false)}
          onTagsSelect={handleTagsSelect}
        />
      )}
    </div>
  );
};

export default CreatePostPage;