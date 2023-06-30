import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from './Login.module.scss';
import Button from '~/components/Button/Button';
import * as staffServices from '~/services/staffServices';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const cx = classNames.bind(style);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      handleSubmit()
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const login = sessionStorage.getItem("VNVD_Login")
    const session = JSON.parse(login)
    if (session) {
      navigate("/")
    }
  }, [])


  const handleSubmit = () => {

    const login = async () => {
      const res = await staffServices.login(username, password)
      console.log(res)
      if (
        res?.status
      ) {
        const data = JSON.stringify(res.staff)
        sessionStorage.setItem("VNVD_Login", data)
        navigate("/")
      }
    }
    login()


  }


  return (
    <div>
      <div>
        <h2>Đăng nhập</h2>
      </div>
      <div className={cx('formGroup')}>
        <label className={cx("formTitle")} htmlFor="name">Tên đăng nhập:</label>
        <input
          className={cx("formInput")}
          placeholder="Nhập tên đăng nhập..."
          maxLength={30}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className={cx("formGroup")}>
        <label className={cx("formTitle")} htmlFor="password">Mật khẩu:</label>
        <input
          className={cx("formInput")}
          placeholder="Nhập mật khẩu..."
          maxLength={30}
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className={cx("formGroup")}>
        <Button onClick={handleSubmit} primary small>Đăng nhập</Button>
      </div>
    </div>
  )
}
