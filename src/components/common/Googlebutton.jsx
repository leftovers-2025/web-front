import { FaGoogle } from "react-icons/fa";
import { oauth } from '../../utils/constants.js';

export default function Setbutton({ className}) {

  const buildGoogleAuthUrl = () => {
    const state = crypto.randomUUID();
    sessionStorage.setItem('oauth_state', state);

    const params = new URLSearchParams({ //oauthログイン画面に渡すパラメータ定義
      client_id: `${oauth.client_id}`,
      redirect_uri: `${oauth.redirect_uri}`,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      include_granted_scopes: 'true',
      state: state
    });
    
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

    const handleGoogleLogin = () => {
        window.location.href = buildGoogleAuthUrl(); // Googleログイン画面にリダイレクト
    };

    return(
        <>
            <button type="button" onClick={handleGoogleLogin}  className={className} >
                <FaGoogle className="FaGoogle"/>
                Sign in with google
            </button>
        </>        
    );
}
