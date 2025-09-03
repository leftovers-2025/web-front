import { FaGoogle } from "react-icons/fa";

export default function Setbutton({ className}) {
 
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
        "scope=openid%20https%3A//www.googleapis.com/auth/userinfo.profile%20https%3A//www.googleapis.com/auth/userinfo.email&" +
        "access_type=offline&" +
        "include_granted_scopes=true&" +
        "response_type=code&" +
        "redirect_uri=http%3A//localhost:8630/oauth/google/redirect&" +
        "client_id=532447272997-9dfmmst462j9okkg893nmidhhi6v94mn.apps.googleusercontent.com";

    const handleGoogleLogin = () => {
        window.location.href = googleAuthUrl; // Googleログイン画面にリダイレクト
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