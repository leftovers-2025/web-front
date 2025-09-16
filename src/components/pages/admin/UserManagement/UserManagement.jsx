// src/components/pages/admin/UserManagement/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../common/Header/Header.jsx';
import SearchBox from '../../../common/SearchBox/SearchBox.jsx';
import Pagination from '../../../common/Pagination/Pagination.jsx';
import UserTable from './UserTable.jsx';
import RoleChangeModal from './RoleChangeModal.jsx';
import RootTransferModal from './RootTransferModal.jsx';
import userService from '../../../../services/userService.js';
import './UserManagement.css';

const UserManagement = () => {
  const navigate = useNavigate();

  // ========== 状態管理 ==========
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // ページネーション関連
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage] = useState(20);
  
  // モーダル関連
  const [roleChangeModal, setRoleChangeModal] = useState({
    isOpen: false,
    user: null,
    newRole: null
  });
  const [rootTransferModal, setRootTransferModal] = useState({
    isOpen: false,
    user: null
  });

  // ========== 権限確認・初期化 ==========
  useEffect(() => {
    checkUserPermission();
  }, []);

  useEffect(() => {
    if (currentUser && userService.isRootUser(currentUser)) {
      fetchUsers();
    }
  }, [currentUser, currentPage]);

  // 検索クエリに基づくフィルタリング
  useEffect(() => {
    filterUsers();
  }, [users, searchQuery]);

  /**
   * 現在のユーザーのroot権限を確認
   */
  const checkUserPermission = async () => {
    try {
      setInitialLoading(true);
      
      const user = await userService.getCurrentUser();
      const transformedUser = userService.transformUserData(user);
      
      setCurrentUser(transformedUser);
      
      // root権限がない場合はホームにリダイレクト
      if (!userService.isRootUser(user)) {
        console.warn('Root権限がありません。ホームページにリダイレクトします。');
        navigate('/', { replace: true });
        return;
      }
      
      console.log('Root権限を確認しました:', transformedUser);
      
    } catch (error) {
      console.error('権限確認エラー:', error);
      alert(`権限の確認に失敗しました: ${error.message}`);
      navigate('/', { replace: true });
    } finally {
      setInitialLoading(false);
    }
  };

  /**
   * ユーザー一覧を取得
   */
  const fetchUsers = async (params = {}) => {
    if (!currentUser || !userService.isRootUser(currentUser)) {
      return;
    }

    setLoading(true);
    try {
      console.log('ユーザー一覧取得中...');
      
      const apiParams = {
        limit: usersPerPage,
        page: currentPage,
        ...params
      };

      const usersData = await userService.getUsers(apiParams);
      
      // データ変換
      const transformedUsers = usersData.map(user => 
        userService.transformUserData(user)
      );
      
      setUsers(transformedUsers);
      setTotalUsers(transformedUsers.length);
      
      console.log(`${transformedUsers.length}人のユーザーを取得しました`);
      
    } catch (error) {
      console.error('ユーザー一覧取得エラー:', error);
      alert(`ユーザー一覧の取得に失敗しました: ${error.message}`);
      setUsers([]);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 検索によるユーザーフィルタリング
   */
  const filterUsers = () => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }

    const query = searchQuery.trim().toLowerCase();
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.roleDisplay.toLowerCase().includes(query)
    );
    
    setFilteredUsers(filtered);
  };

  // ========== イベントハンドラ ==========

  /**
   * 検索実行
   */
  const handleSearch = () => {
    setCurrentPage(1);
    filterUsers();
  };

  /**
   * 検索リセット
   */
  const handleReset = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  /**
   * データ再読み込み
   */
  const handleRefresh = () => {
    fetchUsers();
  };

  /**
   * ページ変更
   */
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  /**
   * Role変更モーダルを開く
   */
  const handleOpenRoleModal = (user, newRole) => {
    setRoleChangeModal({
      isOpen: true,
      user,
      newRole
    });
  };

  /**
   * Root権限移譲モーダルを開く
   */
  const handleOpenRootTransferModal = (user) => {
    setRootTransferModal({
      isOpen: true,
      user
    });
  };

  /**
   * Role変更実行
   */
  const handleRoleChange = async () => {
    const { user, newRole } = roleChangeModal;
    
    if (!user || !newRole) return;

    try {
      setLoading(true);
      
      console.log(`権限変更実行: ${user.name} (${user.id}) → ${newRole}`);
      
      const result = await userService.changeUserRole(user.id, newRole);
      
      // 成功後は必ずユーザー一覧を再取得
      console.log('権限変更成功、ユーザー一覧を再取得中...');
      await fetchUsers();
      
      alert(`${user.name}さんの権限を「${userService.getRoleDisplayName(newRole)}」に変更しました`);
      
    } catch (error) {
      console.error('Role変更エラー:', error);
      
      // JSONパースエラーの場合は成功として扱う（実際には処理が完了している）
      if (error.message.includes('Unexpected end of JSON input') || 
          error.message.includes('Failed to execute \'json\' on \'Response\'')) {
        
        console.log('JSONパースエラーが発生しましたが、権限変更は成功している可能性があります。データを再取得します。');
        
        // データを再取得
        await fetchUsers();
        alert(`${user.name}さんの権限変更を実行しました。変更が反映されているか確認してください。`);
      } else {
        // 他のエラーの場合は通常のエラー処理
        alert(`権限の変更に失敗しました: ${error.message}`);
      }
    } finally {
      setLoading(false);
      setRoleChangeModal({ isOpen: false, user: null, newRole: null });
    }
  };

  /**
   * Root権限移譲実行
   */
  const handleRootTransfer = async () => {
    const { user } = rootTransferModal;
    
    if (!user) return;

    try {
      setLoading(true);
      
      await userService.transferRootPermission(user.id);
      
      alert(`${user.name}さんにroot権限を移譲しました。\nあなたの権限は自動的に失効されました。\nページを再読み込みします。`);
      
      // 権限移譲後は強制的にホームページに戻る
      window.location.href = '/';
      
    } catch (error) {
      console.error('Root権限移譲エラー:', error);
      alert(`Root権限の移譲に失敗しました: ${error.message}`);
      setLoading(false);
      setRootTransferModal({ isOpen: false, user: null });
    }
  };

  // ========== レンダリング ==========

  // 初期読み込み中
  if (initialLoading) {
    return (
      <div className="user-management">
        <Header />
        <div className="container">
          <div className="user-management__loading">
            <div className="user-management__spinner"></div>
            <p>権限を確認中...</p>
          </div>
        </div>
      </div>
    );
  }

  // root権限がない場合（通常はリダイレクトされるが念のため）
  if (!currentUser || !userService.isRootUser(currentUser)) {
    return (
      <div className="user-management">
        <Header />
        <div className="container">
          <div className="user-management__access-denied">
            <h2>アクセス権限がありません</h2>
            <p>この機能を利用するにはroot権限が必要です。</p>
          </div>
        </div>
      </div>
    );
  }

  const displayUsers = searchQuery.trim() ? filteredUsers : users;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="user-management">
      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツ */}
      <div className="container">
        {/* ページヘッダー */}
        <div className="user-management__header">
          <h1 className="user-management__title">ユーザー管理</h1>
          <p className="user-management__description">
            ユーザーの権限管理と削除を行う画面
          </p>
        </div>

        {/* 検索ボックス */}
        <SearchBox
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleSearch}
          onReset={handleReset}
          loading={loading}
          placeholder="ユーザーを検索..."
          showRefreshButton={true}
          onRefresh={handleRefresh}
        />

        {/* デバッグ情報 */}
        {import.meta.env.DEV && (
          <div className="user-management__debug">
            <strong>デバッグ情報:</strong> 
            現在のユーザー: {currentUser?.name} ({currentUser?.roleDisplay}) | 
            検索クエリ「{searchQuery || 'なし'}」 | 
            表示中: {displayUsers.length}/{totalUsers}人 | 
            ページ {currentPage}/{totalPages} | 
            読み込み状態: {loading ? 'true' : 'false'}
          </div>
        )}

        {/* コンテンツエリア */}
        <div className="user-management__content">
          {/* ローディング状態 */}
          {loading && (
            <div className="user-management__loading">
              <div className="user-management__spinner"></div>
              <p className="user-management__loading-message">読み込み中...</p>
            </div>
          )}

          {/* 空状態 */}
          {!loading && displayUsers.length === 0 && (
            <div className="user-management__empty">
              <div className="user-management__empty-icon">👥</div>
              <h3 className="user-management__empty-title">
                {searchQuery.trim() ? 'ユーザーが見つかりませんでした' : 'ユーザーがいません'}
              </h3>
              <p className="user-management__empty-description">
                {searchQuery.trim() 
                  ? '検索条件を変更して再度お試しください' 
                  : 'システムにユーザーが登録されていません'
                }
              </p>
            </div>
          )}

          {/* ユーザー一覧テーブル */}
          {!loading && displayUsers.length > 0 && (
            <>
              {/* 結果件数情報 */}
              <div className="user-management__results-info">
                <div className="user-management__results-count">
                  {searchQuery.trim() 
                    ? `${filteredUsers.length}人のユーザーが見つかりました（全${totalUsers}人中）`
                    : `${totalUsers}人のユーザーが登録されています`
                  }
                  {totalPages > 1 && (
                    <span className="user-management__page-info">
                      （ページ {currentPage}/{totalPages}）
                    </span>
                  )}
                </div>
              </div>

              {/* ユーザーテーブル */}
              <UserTable
                users={displayUsers}
                currentUser={currentUser}
                onRoleChange={handleOpenRoleModal}
                onRootTransfer={handleOpenRootTransferModal}
                loading={loading}
              />

              {/* ページネーション */}
              {totalPages > 1 && !searchQuery.trim() && (
                <div className="user-management__pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    loading={loading}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Role変更確認モーダル */}
      <RoleChangeModal
        isOpen={roleChangeModal.isOpen}
        user={roleChangeModal.user}
        newRole={roleChangeModal.newRole}
        onConfirm={handleRoleChange}
        onCancel={() => setRoleChangeModal({ isOpen: false, user: null, newRole: null })}
        loading={loading}
      />

      {/* Root権限移譲確認モーダル */}
      <RootTransferModal
        isOpen={rootTransferModal.isOpen}
        user={rootTransferModal.user}
        currentUser={currentUser}
        onConfirm={handleRootTransfer}
        onCancel={() => setRootTransferModal({ isOpen: false, user: null })}
        loading={loading}
      />
    </div>
  );
};

export default UserManagement;