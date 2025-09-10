// src/components/pages/user/RedirectTest/RedirectTest.jsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { oauth, API_ENDPOINTS } from '../../../../utils/constants.js';
import ApiService from '../../../../services/ApiService.js'; 
import TokenManager from '../../../../services/TokenManager.js'; // AuthServiceから変更

export default function OAuthCallback() {
  const [status, setStatus] = useState('処理中...');
  const navigate = useNavigate();
  
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const handleOAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code')?.trim();
        const state = urlParams.get('state')?.trim();
        const error = urlParams.get('error');

        if (error) {
          throw new Error(`Google認証エラー: ${error}`);
        }

        if (!code || !state) {
          throw new Error('認証パラメータが不足しています');
        }

        const savedState = sessionStorage.getItem('oauth_state')?.trim();
        
        if (!savedState) {
          throw new Error('セッション情報が見つかりません。最初からやり直してください。');
        }
        
        if (state !== savedState) {
          throw new Error('不正なリクエストです（state不一致）');
        }

        sessionStorage.removeItem('oauth_state');
        
        setStatus('認証コードをサーバーに送信中...');

        const authResponse = await ApiService.authenticateWithGoogle(code);
        
        // TokenManagerで直接トークンを保存
        const { accessToken, refreshToken, id, name, email } = authResponse;
        const loginSuccess = TokenManager.saveTokens({
          accessToken,
          refreshToken,
          userInfo: { id, name, email }
        });
        
        if (loginSuccess) {
          setStatus('認証完了！ ホームページに移動します...');
          
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          throw new Error('ログイン処理に失敗しました');
        }

      } catch (error) {
        console.error('OAuth認証エラー:', error);
        setStatus(`認証エラー: ${error.message}`);
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  const resetAuth = () => {
    sessionStorage.removeItem('oauth_state');
    TokenManager.clearAllTokens(); // AuthService.logout()から変更
    TokenManager.redirectToLogin();
    
    hasStarted.current = false;
    setStatus('リセット完了');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Google認証処理</h2>
      
      <div style={{ 
        padding: '15px', 
        marginBottom: '20px',
        backgroundColor: status.includes('エラー') ? '#f8d7da' : 
                         status.includes('完了') ? '#d4edda' : '#fff3cd',
        border: '1px solid',
        borderColor: status.includes('エラー') ? '#f5c6cb' : 
                     status.includes('完了') ? '#c3e6cb' : '#ffeaa7',
        borderRadius: '8px',
        fontSize: '16px'
      }}>
        {status}
      </div>

      {status.includes('エラー') && (
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => navigate('/login')}
            style={{ 
              padding: '12px 24px', 
              marginRight: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ログインページに戻る
          </button>
          <button 
            onClick={resetAuth}
            style={{ 
              padding: '12px 24px',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            認証リセット
          </button>
        </div>
      )}

      {status.includes('完了') && (
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e7f3ff',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <p>Google認証が正常に完了しました！</p>
          <p>ホームページに自動で移動します...</p>
        </div>
      )}
    </div>
  );
}
