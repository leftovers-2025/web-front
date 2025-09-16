// src/components/pages/admin/UserManagement/RoleChangeModal.jsx
import React from 'react';
import userService from '../../../../services/userService.js';

const RoleChangeModal = ({ 
  isOpen, 
  user, 
  newRole, 
  onConfirm, 
  onCancel, 
  loading = false 
}) => {

  if (!isOpen || !user || !newRole) {
    return null;
  }

  const currentRoleDisplay = userService.getRoleDisplayName(user.role);
  const newRoleDisplay = userService.getRoleDisplayName(newRole);

  /**
   * キーボードイベントハンドラ
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && !loading) {
      onCancel();
    }
    if (e.key === 'Enter' && !loading) {
      onConfirm();
    }
  };

  /**
   * モーダル背景クリック
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onCancel();
    }
  };

  return (
    <div 
      className="role-change-modal"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className="role-change-modal__backdrop"
        onClick={handleBackdropClick}
      >
        <div className="role-change-modal__container">
          <div className="role-change-modal__content">
            {/* ヘッダー */}
            <div className="role-change-modal__header">
              <h3 className="role-change-modal__title">
                権限変更の確認
              </h3>
              {!loading && (
                <button
                  className="role-change-modal__close-btn"
                  onClick={onCancel}
                  aria-label="モーダルを閉じる"
                >
                  ✕
                </button>
              )}
            </div>

            {/* ボディ */}
            <div className="role-change-modal__body">
              <div className="role-change-modal__user-info">
                <div className="role-change-modal__user-name">
                  {user.name}
                </div>
                <div className="role-change-modal__user-email">
                  {user.email}
                </div>
              </div>

              <div className="role-change-modal__change-info">
                <div className="role-change-modal__change-arrow">
                  <span className="role-change-modal__current-role">
                    {currentRoleDisplay}
                  </span>
                  <span className="role-change-modal__arrow">→</span>
                  <span className="role-change-modal__new-role">
                    {newRoleDisplay}
                  </span>
                </div>
              </div>

              <div className="role-change-modal__description">
                <p>
                  このユーザーの権限を「<strong>{currentRoleDisplay}</strong>」から
                  「<strong>{newRoleDisplay}</strong>」に変更します。
                </p>
                
                {newRole === 'teacher' && (
                  <div className="role-change-modal__permission-note">
                    <h4>教師権限で可能になること：</h4>
                    <ul>
                      <li>落し物情報の新規作成</li>
                      <li>投稿の編集・削除</li>
                      <li>高度な検索機能の利用</li>
                    </ul>
                  </div>
                )}

                {newRole === 'user' && (
                  <div className="role-change-modal__permission-note">
                    <h4>生徒権限の制限：</h4>
                    <ul>
                      <li>落し物情報の閲覧のみ</li>
                      <li>投稿の作成・編集不可</li>
                      <li>基本的な検索機能のみ</li>
                    </ul>
                  </div>
                )}

                <div className="role-change-modal__warning">
                  この操作は即座に反映され、元に戻すには再度変更が必要です。
                </div>
              </div>
            </div>

            {/* フッター */}
            <div className="role-change-modal__footer">
              <button
                className="role-change-modal__btn role-change-modal__btn--cancel"
                onClick={onCancel}
                disabled={loading}
              >
                キャンセル
              </button>
              <button
                className="role-change-modal__btn role-change-modal__btn--confirm"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="role-change-modal__loading-spinner"></span>
                    変更中...
                  </>
                ) : (
                  '権限を変更'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleChangeModal;