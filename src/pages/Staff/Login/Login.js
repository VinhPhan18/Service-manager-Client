import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Login.module.scss';
import Button from '~/components/Button/Button';
import * as staffServices from '~/services/staffServices';


export default function Login() {
  const cx = classNames.bind(style);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = () => {
      
      const login = async () => {
        const res = await staffServices.login(username, password)
        console.log(res)
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
