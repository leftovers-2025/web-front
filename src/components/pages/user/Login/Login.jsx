import React from 'react';
import './Login.css';
import './Googlebutton.css'
import logo from '../../../../assets/KDsearch_logo.svg';
import Setbutton from '../../../common/Googlebutton';


const GoogleLogin = () =>{
  return(
      <div className="Google-Login">
        <img src={logo} className="KDS-logo" alt="logo" />
          <p>
            googleアカウントでログインする
          </p>
          <Setbutton className="Googlebutton"/>
      </div>
  )
}
export default GoogleLogin;