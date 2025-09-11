// src/components/pages/teacher/CreatePost/ImageUploader.jsx
import React, { useState, useRef } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ images, onImageChange }) => {
  const [previews, setPreviews] = useState([null, null, null]);
  const fileInputRefs = [useRef(null), useRef(null), useRef(null)];
  const cameraInputRefs = [useRef(null), useRef(null), useRef(null)];

  // プレビュー更新
  const updatePreview = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => {
          const newPreviews = [...prev];
          newPreviews[index] = e.target.result;
          return newPreviews;
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPreviews(prev => {
        const newPreviews = [...prev];
        newPreviews[index] = null;
        return newPreviews;
      });
    }
  };

  // ファイル選択処理
  const handleFileSelect = (index, file) => {
    if (file) {
      // ファイルタイプチェック
      if (!file.type.startsWith('image/')) {
        alert('画像ファイルを選択してください');
        return;
      }

      // ファイルサイズチェック（10MB制限、後で調整可能）
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('ファイルサイズが大きすぎます（10MB以下にしてください）');
        return;
      }

      onImageChange(index, file);
      updatePreview(index, file);
    }
  };

  // ファイル選択（ギャラリーから）
  const handleGallerySelect = (index) => {
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current.click();
    }
  };

  // カメラ撮影
  const handleCameraCapture = (index) => {
    if (cameraInputRefs[index].current) {
      cameraInputRefs[index].current.click();
    }
  };

  // ファイル入力変更
  const handleInputChange = (index, event) => {
    const file = event.target.files[0];
    handleFileSelect(index, file);
    
    // input要素をリセット（同じファイルを再選択できるように）
    event.target.value = '';
  };

  // 画像削除
  const handleRemoveImage = (index) => {
    onImageChange(index, null);
    updatePreview(index, null);
    
    // input要素をリセット
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current.value = '';
    }
    if (cameraInputRefs[index].current) {
      cameraInputRefs[index].current.value = '';
    }
  };

  // ドラッグ&ドロップ処理
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(index, files[0]);
    }
  };

  return (
    <div className="image-uploader">
      <div className="image-uploader__slots">
        {images.map((image, index) => (
          <div key={index} className="image-uploader__slot">
            {previews[index] ? (
              // 画像プレビュー表示
              <div className="image-uploader__preview">
                <img 
                  src={previews[index]} 
                  alt={`プレビュー ${index + 1}`}
                  className="image-uploader__preview-image"
                />
                <div className="image-uploader__preview-overlay">
                  <button
                    type="button"
                    className="image-uploader__remove-button"
                    onClick={() => handleRemoveImage(index)}
                    aria-label={`画像 ${index + 1} を削除`}
                  >
                    <span className="image-uploader__remove-icon">🗑️</span>
                  </button>
                </div>
                <div className="image-uploader__slot-number">
                  {index + 1}
                </div>
              </div>
            ) : (
              // アップロード領域
              <div 
                className="image-uploader__upload-area"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(index, e)}
              >
                <div className="image-uploader__upload-content">
                  <div className="image-uploader__upload-icon">📷</div>
                  <p className="image-uploader__upload-text">
                    画像を追加
                  </p>
                  <div className="image-uploader__upload-buttons">
                    <button
                      type="button"
                      className="image-uploader__upload-button image-uploader__upload-button--gallery"
                      onClick={() => handleGallerySelect(index)}
                    >
                      <span className="image-uploader__button-icon">🖼️</span>
                      ギャラリー
                    </button>
                    <button
                      type="button"
                      className="image-uploader__upload-button image-uploader__upload-button--camera"
                      onClick={() => handleCameraCapture(index)}
                    >
                      <span className="image-uploader__button-icon">📸</span>
                      カメラ
                    </button>
                  </div>
                  <p className="image-uploader__hint">
                    ファイルをドラッグ&ドロップすることもできます
                  </p>
                </div>
                <div className="image-uploader__slot-number">
                  {index + 1}
                </div>
              </div>
            )}

            {/* 隠れたファイル入力要素（ギャラリー用） */}
            <input
              ref={fileInputRefs[index]}
              type="file"
              accept="image/*"
              onChange={(e) => handleInputChange(index, e)}
              className="image-uploader__hidden-input"
              aria-hidden="true"
            />

            {/* 隠れたファイル入力要素（カメラ用） */}
            <input
              ref={cameraInputRefs[index]}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => handleInputChange(index, e)}
              className="image-uploader__hidden-input"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      <div className="image-uploader__info">
        <div className="image-uploader__tips">
          <h4 className="image-uploader__tips-title">📋 撮影のコツ</h4>
          <ul className="image-uploader__tips-list">
            <li>物全体が写るように撮影してください</li>
            <li>明るい場所で撮影すると見やすくなります</li>
            <li>特徴的な部分（ブランド名、模様など）も撮影してください</li>
          </ul>
        </div>
        
        <div className="image-uploader__constraints">
          <p className="image-uploader__constraint-item">
            • 対応形式: JPEG, PNG, GIF, WebP
          </p>
          <p className="image-uploader__constraint-item">
            • 最大ファイルサイズ: 10MB
          </p>
          <p className="image-uploader__constraint-item">
            • 最大3枚まで投稿可能
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;