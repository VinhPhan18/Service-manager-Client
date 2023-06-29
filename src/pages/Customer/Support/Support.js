import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './Support.module.scss';


export default function Support() {
  const cx = classNames.bind(style);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    </div>
  )
}
