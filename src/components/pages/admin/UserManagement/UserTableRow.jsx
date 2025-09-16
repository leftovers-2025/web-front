// src/components/pages/admin/UserManagement/UserTableRow.jsx
import React from 'react';
import userService from '../../../../services/userService.js';

const UserTableRow = ({ 
  user, 
  currentUser, 
  onRoleChange, 
  onRootTransfer, 
  loading = false 
}) => {

  const isCurrentUser = user.id === currentUser?.id;
  const canChangeRole = userService.canChangeRole(user, currentUser);
  const canTransferRoot = userService.canTransferRoot(user, currentUser);

  /**
   * Role変更ボタンクリック
   */
  const handleRoleChangeClick = (newRole) => {
    if (loading || !canChangeRole) return;
    
    onRoleChange(user, newRole);
  };

  /**
   * Root権限移譲ボタンクリック
   */
  const handleRootTransferClick = () => {
    if (loading || !canTransferRoot) return;
    
    onRootTransfer(user);
  };

  /**
   * Role別のスタイルクラス取得
   */
  const getRoleBadgeClass = (role) => {
    const baseClass = 'user-table__role-badge';
    switch (role) {
      case 'root':
        return `${baseClass} ${baseClass}--root`;
      case 'teacher':
        return `${baseClass} ${baseClass}--teacher`;
      case 'user':
      case 'student':
        return `${baseClass} ${baseClass}--user`;
      default:
        return baseClass;
    }
  };

  return (
    <tr 
      className={`user-table__row ${isCurrentUser ? 'user-table__row--current' : ''}`}
      role="row"
    >
      {/* ユーザー名列 */}
      <td className="user-table__td user-table__td--name">
        <div className="user-table__user-info">
          <div className="user-table__user-name">
            {user.name}
            {isCurrentUser && (
              <span className="user-table__current-user-badge">
                (あなた)
              </span>
            )}
          </div>
          <div className="user-table__user-id">
            ID: {user.id}
          </div>
        </div>
      </td>

      {/* メールアドレス列 */}
      <td className="user-table__td user-table__td--email">
        <div className="user-table__email">
          {user.email}
        </div>
      </td>

      {/* 役割列 */}
      <td className="user-table__td user-table__td--role">
        <span className={getRoleBadgeClass(user.role)}>
          {user.roleDisplay || userService.getRoleDisplayName(user.role)}
        </span>
      </td>

      {/* アクション列 */}
      <td className="user-table__td user-table__td--actions">
        <div className="user-table__actions">
          {/* 自分自身の場合 */}
          {isCurrentUser && (
            <span className="user-table__action-disabled">
              自分自身のため操作不可
            </span>
          )}

          {/* 他のユーザーで、現在のユーザーがrootの場合 */}
          {!isCurrentUser && userService.isRootUser(currentUser) && (
            <>
              {/* Role変更ボタン - 生徒・教師間の変更 */}
              {canChangeRole && (
                <div className="user-table__role-actions">
                  {/* 生徒の場合：教師に変更ボタンを表示 */}
                  {user.roleDisplay === '生徒' && (
                    <button
                      className="user-table__action-btn user-table__action-btn--promote"
                      onClick={() => handleRoleChangeClick('teacher')}
                      disabled={loading}
                      title="教師に昇格"
                    >
                      教師に変更
                    </button>
                  )}
                  {/* 教師の場合：生徒に変更ボタンを表示 */}
                  {user.roleDisplay === '教師' && (
                    <button
                      className="user-table__action-btn user-table__action-btn--demote"
                      onClick={() => handleRoleChangeClick('user')}
                      disabled={loading}
                      title="生徒に降格"
                    >
                      生徒に変更
                    </button>
                  )}
                </div>
              )}

              {/* Root権限移譲ボタン */}
              {canTransferRoot && (
                <button
                  className="user-table__action-btn user-table__action-btn--transfer-root"
                  onClick={handleRootTransferClick}
                  disabled={loading}
                  title="Root権限を移譲"
                >
                  ルート付与
                </button>
              )}

              {/* root権限ユーザーの場合 */}
              {user.roleDisplay === '管理者' && (
                <span className="user-table__action-disabled">
                  管理者のため変更不可
                </span>
              )}
            </>
          )}

          {/* 権限がない場合 */}
          {!isCurrentUser && !userService.isRootUser(currentUser) && (
            <span className="user-table__action-disabled">
              権限がありません
            </span>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;