// src/components/pages/admin/UserManagement/UserTable.jsx
import React from 'react';
import UserTableRow from './UserTableRow.jsx';
import userService from '../../../../services/userService.js';

const UserTable = ({ 
  users = [], 
  currentUser, 
  onRoleChange, 
  onRootTransfer, 
  loading = false 
}) => {

  /**
   * ユーザーを並び替える（rootユーザーを最初に、その後は名前順）
   */
  const sortUsers = (userList) => {
    return [...userList].sort((a, b) => {
      // rootユーザーを最初に表示
      if (a.role === 'root' && b.role !== 'root') return -1;
      if (a.role !== 'root' && b.role === 'root') return 1;
      
      // それ以外は名前順
      return a.name.localeCompare(b.name, 'ja-JP');
    });
  };

  const sortedUsers = sortUsers(users);

  return (
    <div className="user-table">
      <div className="user-table__wrapper">
        <table className="user-table__table" role="table">
          <thead className="user-table__header">
            <tr>
              <th className="user-table__th user-table__th--name">
                ユーザー名
              </th>
              <th className="user-table__th user-table__th--email">
                メールアドレス
              </th>
              <th className="user-table__th user-table__th--role">
                役割
              </th>
              <th className="user-table__th user-table__th--actions">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="user-table__body">
            {sortedUsers.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                currentUser={currentUser}
                onRoleChange={onRoleChange}
                onRootTransfer={onRootTransfer}
                loading={loading}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* テーブル下部の説明 */}
      <div className="user-table__footer">
        <div className="user-table__legend">
          <h4 className="user-table__legend-title">権限について</h4>
          <ul className="user-table__legend-list">
            <li className="user-table__legend-item">
              <span className="user-table__role-badge user-table__role-badge--root">管理者</span>
              : 全ての機能にアクセス可能。ユーザー管理権限あり
            </li>
            <li className="user-table__legend-item">
              <span className="user-table__role-badge user-table__role-badge--teacher">教師</span>
              : 投稿作成・編集が可能
            </li>
            <li className="user-table__legend-item">
              <span className="user-table__role-badge user-table__role-badge--user">生徒</span>
              : 閲覧のみ可能
            </li>
          </ul>
        </div>
        
        <div className="user-table__notes">
          <h4 className="user-table__notes-title">注意事項</h4>
          <ul className="user-table__notes-list">
            <li>権限変更は「生徒」⇔「教師」間でのみ可能です</li>
            <li>管理者権限の移譲は不可逆的な操作です</li>
            <li>自分自身の権限は変更できません</li>
            <li>管理者権限は常に1名のみ保持されます</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserTable;