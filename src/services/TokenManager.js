// src/services/TokenManager.js
// トークンの管理に特化したクラス

class TokenManager {
  // ====================
  // トークンの取得
  // ====================
  
  getAccessToken() {
    return sessionStorage.getItem('auth_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  getUserInfo() {
    const userInfo = sessionStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  // ====================
  // トークンの保存
  // ====================
  
  saveTokens({ accessToken, refreshToken, userInfo }) {
    try {
      if (accessToken) {
        sessionStorage.setItem('auth_token', accessToken);
      }

      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }

      if (userInfo) {
        sessionStorage.setItem('user_info', JSON.stringify(userInfo));
      }

      return true;
    } catch (error) {
      console.error('Token save failed:', error);
      return false;
    }
  }

  // ====================
  // トークンの削除
  // ====================
  
  clearAllTokens() {
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token_expires_at');
    sessionStorage.removeItem('user_info');
    localStorage.removeItem('auth_response_debug');
  }

  // ====================
  // 認証状態の確認
  // ====================
  
  isAuthenticated() {
    return !!this.getAccessToken();
  }

  hasRefreshToken() {
    return !!this.getRefreshToken();
  }

  // ====================
  // 認証ヘッダーの生成
  // ====================
  
  getAuthHeaders() {
    const token = this.getAccessToken();
    const headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // ====================
  // トークン更新処理
  // ====================
  
  async refreshAccessToken() {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        this.redirectToLogin();
        return null;
      }

      const response = await fetch('http://localhost:8630/refreshToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.accessToken) {
        sessionStorage.setItem('auth_token', data.accessToken);
        
        if (data.expiresIn) {
          const expiresAt = new Date(Date.now() + parseInt(data.expiresIn) * 1000).toISOString();
          sessionStorage.setItem('auth_token_expires_at', expiresAt);
        }
        
        return data.accessToken;
      } else {
        throw new Error('レスポンスにaccessTokenが含まれていません');
      }

    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAllTokens();
      this.redirectToLogin();
      return null;
    }
  }

  // ====================
  // ユーティリティメソッド
  // ====================
  
  redirectToLogin() {
    const currentDomain = window.location.origin;
    const loginUrl = `${currentDomain}/login`;
    window.location.href = loginUrl;
  }
}

export default new TokenManager();
