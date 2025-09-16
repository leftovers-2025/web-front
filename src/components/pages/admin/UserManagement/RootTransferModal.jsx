// src/components/pages/admin/UserManagement/RootTransferModal.jsx
import React, { useState } from 'react';

const RootTransferModal = ({ 
  isOpen, 
  user, 
  currentUser, 
  onConfirm, 
  onCancel, 
  loading = false 
}) => {

  const [confirmationText, setConfirmationText] = useState('');
  const [hasReadWarning, setHasReadWarning] = useState(false);

  const expectedText = `${user?.name}にroot権限を移譲する`;
  const isConfirmationValid = confirmationText === expectedText;

  if (!isOpen || !user || !currentUser) {
    return null;
  }

  /**
   * モーダルが閉じられた時の初期化
   */
  const handleCancel = () => {
    setConfirmationText('');
    setHasReadWarning(false);
    onCancel();
  };

  /**
   * 確認実行
   */
  const handleConfirm = () => {
    if (!isConfirmationValid || !hasReadWarning || loading) {
      return;
    }
    onConfirm();
  };

  /**
   * キーボードイベントハンドラ
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && !loading) {
      handleCancel();
    }
  };

  /**
   * モーダル背景クリック
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      handleCancel();
    }
  };

  return (
    <div 
      className="root-transfer-modal"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className="root-transfer-modal__backdrop"
        onClick={handleBackdropClick}
      >
        <div className="root-transfer-modal__container">
          <div className="root-transfer-modal__content">
            {/* ヘッダー */}
            <div className="root-transfer-modal__header">
              <h3 className="root-transfer-modal__title">
                🚨 Root権限移譲の確認
              </h3>
              {!loading && (
                <button
                  className="root-transfer-modal__close-btn"
                  onClick={handleCancel}
                  aria-label="モーダルを閉じる"
                >
                  ✕
                </button>
              )}
            </div>

            {/* ボディ */}
            <div className="root-transfer-modal__body">
              {/* 移譲先ユーザー情報 */}
              <div className="root-transfer-modal__user-info">
                <h4>移譲先ユーザー</h4>
                <div className="root-transfer-modal__user-details">
                  <div className="root-transfer-modal__user-name">
                    {user.name}
                  </div>
                  <div className="root-transfer-modal__user-email">
                    {user.email}
                  </div>
                  <div className="root-transfer-modal__user-current-role">
                    現在の権限: {user.roleDisplay}
                  </div>
                </div>
              </div>

              {/* 重要な警告 */}
              <div className="root-transfer-modal__warning-section">
                <div className="root-transfer-modal__warning-header">
                  <span className="root-transfer-modal__warning-icon">⚠️</span>
                  <h4>重要な注意事項</h4>
                </div>
                
                <div className="root-transfer-modal__warning-content">
                  <ul className="root-transfer-modal__warning-list">
                    <li>
                      <strong>この操作は不可逆的です</strong>
                      <p>一度移譲すると、あなたのroot権限は完全に失われます</p>
                    </li>
                    <li>
                      <strong>システムの完全な制御権が移譲されます</strong>
                      <p>移譲先ユーザーはすべてのユーザー管理権限を獲得します</p>
                    </li>
                    <li>
                      <strong>あなたのアクセス権限が変更されます</strong>
                      <p>移譲後は一般ユーザーとしてシステムにアクセスすることになります</p>
                    </li>
                    <li>
                      <strong>取り消しには移譲先ユーザーの協力が必要です</strong>
                      <p>権限を戻すには、移譲先ユーザーが逆方向の移譲を行う必要があります</p>
                    </li>
                  </ul>
                </div>

                <div className="root-transfer-modal__warning-checkbox">
                  <label className="root-transfer-modal__checkbox-label">
                    <input
                      type="checkbox"
                      checked={hasReadWarning}
                      onChange={(e) => setHasReadWarning(e.target.checked)}
                      disabled={loading}
                    />
                    上記の注意事項を理解し、承諾します
                  </label>
                </div>
              </div>

              {/* 確認入力 */}
              {hasReadWarning && (
                <div className="root-transfer-modal__confirmation">
                  <h4>確認のため、以下のテキストを正確に入力してください：</h4>
                  <div className="root-transfer-modal__expected-text">
                    {expectedText}
                  </div>
                  <input
                    type="text"
                    className={`root-transfer-modal__confirmation-input ${
                      confirmationText && !isConfirmationValid 
                        ? 'root-transfer-modal__confirmation-input--error' 
                        : ''
                    }`}
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
                    placeholder="上記のテキストを入力してください"
                    disabled={loading}
                  />
                  {confirmationText && !isConfirmationValid && (
                    <div className="root-transfer-modal__error-message">
                      入力されたテキストが一致しません
                    </div>
                  )}
                </div>
              )}

              {/* 最終確認メッセージ */}
              {isConfirmationValid && hasReadWarning && (
                <div className="root-transfer-modal__final-warning">
                  <p>
                    <strong>{user.name}</strong>さんにroot権限を移譲し、
                    あなた（<strong>{currentUser.name}</strong>）の権限を失効させます。
                  </p>
                  <p>この操作を実行しますか？</p>
                </div>
              )}
            </div>

            {/* フッター */}
            <div className="root-transfer-modal__footer">
              <button
                className="root-transfer-modal__btn root-transfer-modal__btn--cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                キャンセル
              </button>
              <button
                className="root-transfer-modal__btn root-transfer-modal__btn--danger"
                onClick={handleConfirm}
                disabled={!isConfirmationValid || !hasReadWarning || loading}
              >
                {loading ? (
                  <>
                    <span className="root-transfer-modal__loading-spinner"></span>
                    移譲中...
                  </>
                ) : (
                  'Root権限を移譲'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootTransferModal;