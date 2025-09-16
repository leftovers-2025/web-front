// src/services/userService.js
// ユーザー管理関連のAPI通信サービス

import apiService from './ApiService.js';

class UserService {
  
  // ====================
  // ユーザー情報取得
  // ====================

  /**
   * 現在のユーザー情報を取得
   * @returns {Promise<Object>} ユーザー情報
   */
  async getCurrentUser() {
    try {
      // 既存のApiServiceのgetUserInfo()メソッドを使用
      const response = await apiService.getUserInfo();
      console.log('✅ 現在ユーザー情報取得成功:', response);
      return response;
    } catch (error) {
      console.error('❌ 現在のユーザー情報取得エラー:', error);
      throw new Error(`ユーザー情報の取得に失敗しました: ${error.message}`);
    }
  }

  /**
   * ユーザー一覧を取得
   * @param {Object} params - 取得パラメータ
   * @param {number} params.limit - 取得件数（必須）
   * @param {number} params.page - ページ番号（必須）
   * @returns {Promise<Array>} ユーザー一覧
   */
  async getUsers(params = {}) {
    try {
      // 必須パラメータのデフォルト値設定
      const apiParams = {
        limit: params.limit || 50,
        page: params.page || 1,
        ...params
      };

      console.log('ユーザー一覧取得パラメータ:', apiParams);

      const response = await apiService.get('/users', apiParams);
      
      console.log('ユーザー一覧API レスポンス:', response);

      // レスポンスの形式を確認して配列を返す
      if (Array.isArray(response)) {
        return response;
      } else if (response && Array.isArray(response.data)) {
        return response.data;
      } else if (response && Array.isArray(response.users)) {
        return response.users;
      } else {
        console.warn('予期しないレスポンス形式:', response);
        return [];
      }

    } catch (error) {
      console.error('ユーザー一覧取得エラー:', error);
      throw new Error(`ユーザー一覧の取得に失敗しました: ${error.message}`);
    }
  }

  // ====================
  // ユーザー権限管理
  // ====================

  /**
   * フロントエンド用role値をバックエンド用に変換
   * @param {string} frontendRole - フロントエンド用role値
   * @returns {string} バックエンド用role値
   */
  mapFrontendRoleToBackend(frontendRole) {
    // 実際のAPI仕様に基づいてマッピングを調整
    const roleMapping = {
      'user': 'student',      // 予想: userではなくstudentが正しい
      'teacher': 'teacher',   // そのまま
      'root': 'root'          // そのまま
    };
    
    const mappedRole = roleMapping[frontendRole];
    if (!mappedRole) {
      throw new Error(`未知のrole値です: ${frontendRole}`);
    }
    
    console.log(`Role変換: ${frontendRole} → ${mappedRole}`);
    return mappedRole;
  }

  /**
   * ユーザーのroleを変更
   * @param {string} userId - 対象ユーザーID
   * @param {string} newRole - 新しいrole（"user" | "teacher" | "root"）
   * @returns {Promise<Object>} 処理結果
   */
  async changeUserRole(userId, newRole) {
    try {
      // role値の検証
      const validRoles = ['user', 'teacher', 'root'];
      if (!validRoles.includes(newRole)) {
        throw new Error(`無効なrole値です: ${newRole}. 有効な値: ${validRoles.join(', ')}`);
      }

      console.log(`ユーザー ${userId} のroleを ${newRole} に変更中...`);

      // フロントエンド用role値をバックエンド用に変換
      const backendRole = this.mapFrontendRoleToBackend(newRole);

      // リクエスト詳細をログ出力
      const endpoint = `/users/${userId}/roles`;
      const requestBody = { role: backendRole };
      
      console.log('API Request Details:', {
        endpoint,
        method: 'PATCH',
        body: requestBody,
        userId,
        frontendRole: newRole,
        backendRole
      });

      const response = await apiService.patch(endpoint, requestBody);

      console.log('Role変更レスポンス:', response);

      // 204 No Contentの場合は成功扱い
      return {
        success: true,
        message: `ユーザーのroleを「${this.getRoleDisplayName(newRole)}」に変更しました`,
        userId,
        newRole
      };

    } catch (error) {
      console.error('Role変更エラー詳細:', {
        userId,
        newRole,
        error: error.message,
        stack: error.stack
      });
      throw new Error(`ユーザーのrole変更に失敗しました: ${error.message}`);
    }
  }

  /**
   * Root権限を他のユーザーに移譲
   * @param {string} userId - 移譲先ユーザーID
   * @returns {Promise<Object>} 処理結果
   */
  async transferRootPermission(userId) {
    try {
      console.log(`ユーザー ${userId} にroot権限を移譲中...`);

      const response = await apiService.post(`/users/${userId}/root`);

      console.log('Root権限移譲レスポンス:', response);

      // APIService.post が成功した場合（エラーがスローされなかった場合）は成功扱い
      return {
        success: true,
        message: `ユーザー ${userId} にroot権限を移譲しました`,
        userId
      };

    } catch (error) {
      console.error('Root権限移譲エラー:', error);

      // JSONパースエラーは204 No Contentの場合に発生する可能性が高いため、成功として扱う
      if (error.message.includes('Unexpected end of JSON input') || 
          error.message.includes('Failed to execute \'json\' on \'Response\'')) {
        console.log('204 No Contentレスポンス（成功）として処理します');
        return {
          success: true,
          message: `ユーザー ${userId} にroot権限を移譲しました`,
          userId
        };
      }

      throw new Error(`Root権限の移譲に失敗しました: ${error.message}`);
    }
  }

  // ====================
  // ユーティリティメソッド
  // ====================

  /**
   * APIレスポンス → 表示用データに変換
   * @param {Object} apiUser - APIから取得したユーザーデータ
   * @returns {Object} 表示用ユーザーデータ
   */
  transformUserData(apiUser) {
    if (!apiUser) return null;

    return {
      id: apiUser.id,
      name: apiUser.name || '不明',
      email: apiUser.email || '不明',
      role: apiUser.role || 'user',
      roleDisplay: this.getRoleDisplayName(apiUser.role),
      createdAt: apiUser.createdAt,
      updatedAt: apiUser.updatedAt,
      formattedCreatedAt: this.formatDate(apiUser.createdAt),
      formattedUpdatedAt: this.formatDate(apiUser.updatedAt),
      // 元データも保持
      rawData: apiUser
    };
  }

  /**
   * role値を日本語表示名に変換
   * @param {string} role - role値
   * @returns {string} 日本語表示名
   */
  getRoleDisplayName(role) {
    const roleMap = {
      'root': '管理者',
      'teacher': '教師', 
      'user': '生徒',
      'student': '生徒'  // バックエンドのrole値もサポート
    };
    return roleMap[role] || role;
  }

  /**
   * 日付を日本語形式でフォーマット
   * @param {string} dateString - 日付文字列
   * @returns {string} フォーマット済み日付
   */
  formatDate(dateString) {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.warn('日付フォーマットエラー:', error);
      return dateString;
    }
  }

  /**
   * 現在のユーザーがroot権限を持っているかチェック
   * @param {Object} currentUser - 現在のユーザー情報
   * @returns {boolean} root権限の有無
   */
  isRootUser(currentUser) {
    return currentUser && currentUser.role === 'root';
  }

  /**
   * 指定したユーザーに対してrole変更可能かチェック
   * @param {Object} targetUser - 対象ユーザー
   * @param {Object} currentUser - 現在のユーザー
   * @returns {boolean} 変更可能かどうか
   */
  canChangeRole(targetUser, currentUser) {
    // 現在のユーザーがrootでない場合は不可
    if (!this.isRootUser(currentUser)) {
      return false;
    }
    
    // 自分自身のroleは変更不可
    if (targetUser.id === currentUser.id) {
      return false;
    }
    
    // 対象ユーザーがrootの場合は変更不可（権限移譲のみ）
    if (targetUser.role === 'root') {
      return false;
    }
    
    return true;
  }

  /**
   * 指定したユーザーにroot権限移譲可能かチェック
   * @param {Object} targetUser - 対象ユーザー
   * @param {Object} currentUser - 現在のユーザー
   * @returns {boolean} 移譲可能かどうか
   */
  canTransferRoot(targetUser, currentUser) {
    // 現在のユーザーがrootでない場合は不可
    if (!this.isRootUser(currentUser)) {
      return false;
    }
    
    // 自分自身には移譲不可
    if (targetUser.id === currentUser.id) {
      return false;
    }
    
    // 対象ユーザーが既にrootの場合は不可
    if (targetUser.role === 'root') {
      return false;
    }
    
    return true;
  }
}

export default new UserService();