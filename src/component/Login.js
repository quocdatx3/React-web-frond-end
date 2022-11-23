import React from 'react'
import PropTypes from 'prop-types';

import "./Pages/css/login-style.css"

import SEVER_URL from '../setup';

async function loginUser(credentials) {
    return fetch(SEVER_URL + 'apis/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = React.useState();
    const [password, setPassword] = React.useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser(
            {
                tenDangNhap: username,
                matKhau: password
            }
        );
        setToken(token);

    }

    return (
        <div className='login-body'>
            <div>
                <div id="logo">
                    <img id="logoimg" src="/img/icons8_Doom_Logo_100px 1.png" alt='logo' />
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="loginframe">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group-login">
                                <img id="profile-img" src="/img/Ellipse-1.png" alt='preimg' />
                            </div>
                            <div className="form-group-login">
                                <label className="control-label"></label>
                                <input placeholder="Tên đăng nhập" 
                                    className="form-control-login" onChange={e => setUserName(e.target.value)} required />
                            </div>
                            <div className="form-group-login">
                                <label className="control-label"></label>
                                <input id="passwordinput" placeholder="Mật khẩu" type="password"
                                    className="form-control-login" onChange={e => setPassword(e.target.value)} required />
                                <span className="fa fa-unlock-alt field-icon-logo"></span>
                            </div>
                            <div className="form-group-login">
                                <button type="submit" className="btn btnlogin">Đăng nhập</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};