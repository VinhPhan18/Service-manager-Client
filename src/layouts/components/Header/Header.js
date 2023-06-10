import React from 'react';
import classNames from "classnames/bind";
import logo from "../../../image/logo.png";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export default function Header() {
  const cx = classNames.bind(style);
  const [open, setOpen] = React.useState(false);
  const [openStaff, setOpenStaff] = React.useState(false);
  const anchorRef = React.useRef(null);
  const anchorRefStaff = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleToggleStaff = () => {
    setOpenStaff((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleCloseStaff = (event) => {
    if (
      anchorRefStaff.current &&
      anchorRefStaff.current.contains(event.target)
    ) {
      return;
    }

    setOpenStaff(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  function handleListKeyDownStaff(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenStaff(false);
    } else if (event.key === 'Escape') {
      setOpenStaff(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const prevOpenStaff = React.useRef(openStaff);
  React.useEffect(() => {
    if (prevOpenStaff.current === true && openStaff === false) {
      anchorRefStaff.current.focus();
    }

    prevOpenStaff.current = openStaff;
  }, [openStaff]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <Link to="/" className={cx("menu-link")}>
          <img src={logo} alt="Logo" className={cx("logo-image")} />
        </Link>
      </div>
      <div className={cx("menu")}>
        <ul className={cx("menu-list")}>
          <li className={cx("menu-item")}>
            <Link to="/Transaction" className={cx("menu-link")}>
              Giao dịch
            </Link>
          </li>
          <li className={cx("menu-item")}>
            <Link
              ref={anchorRefStaff}
              id="staff-button"
              aria-controls={openStaff ? 'staff-menu' : undefined}
              aria-expanded={openStaff ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggleStaff}
              to=""
              className={cx("menu-link")}
            >
              Nhân viên
            </Link>
            <Popper
              open={openStaff}
              anchorEl={anchorRefStaff.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseStaff}>
                      <MenuList
                        autoFocusItem={openStaff}
                        id="staff-menu"
                        aria-labelledby="staff-button"
                        onKeyDown={handleListKeyDownStaff}
                        style={{color:'black', backgroundColor:'#2e3f50'}}
                      >
{/* 
<MenuItem onClick={handleCloseStaff}>
                          <Link to="/Staff" className={cx('menu-link')}>
                            Nhân Viên
                          </Link>
                        </MenuItem> */}
                        <MenuItem onClick={handleCloseStaff}>
                          <Link to="/stafftype" className={cx('menu-link')}>
                            Chức Vụ
                          </Link>
                        </MenuItem>
                  
                      
                        {/* Thêm loại nhân viên khác ở đây */}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </li>
          <li className={cx("menu-item")}>
            <Link to="/Customer" className={cx("menu-link")}>
              Khách hàng
            </Link>
          </li>
          <li className={cx("menu-item")}>
            <Link to="/Order" className={cx("menu-link")}>
              Đơn hàng
            </Link>
          </li>
          <li className={cx("menu-item")}>
            <Link to="/Contract" className={cx("menu-link")}>
              Hợp đồng
            </Link>
          </li>
          <li className={cx("menu-item")}>
            <Link to="/Commodities" className={cx("menu-link")}>
              Hàng hóa
            </Link>
          </li>
          <li className={cx("menu-item")}>
            <Link to="/Contact" className={cx("menu-link")}>
              Hỗ trợ
            </Link>
          </li>
        </ul>
      </div>

      <Stack direction="row" spacing={2}>
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="primary"
            size="large"
            sx={{
              fontSize: '12px', // Thay đổi kích thước font
              marginTop: '8px',
              color: 'white',
              marginLeft: '80px',
            }}
          >
            Tài khoản
          </Button>

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
                      <MenuItem onClick={handleClose}>Cài đặt</MenuItem>
                      <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    </div>
  );
}
