import React from "react";
import classNames from "classnames/bind";
import logo from "../../../image/logo.png";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuItem,
  MenuList,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  const cx = classNames.bind(style);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content-left")}>
        <div className={cx("logo")}>
          <Link to="/" className={cx("menu-link")}>
            <img src={logo} alt="Logo" className={cx("logo-image")} />
          </Link>
        </div>
        <div className={cx("menu-left")}>
          <ul className={cx("menu-list", "navbar", "navbar-nav")}>
            <li className={cx("menu-item", "nav-item")}>
              <Link to="/Transaction" className={cx("menu-link", "nav-link")}>
                Giao dịch
              </Link>
            </li>
            <li className={cx("menu-item", "nav-item")}>
              <Link to="/stafftype" className={cx("menu-link", "nav-link")}>
                Nhân viên
              </Link>
            </li>
            <li className={cx("menu-item", "nav-item")}>
              <Link to="/Customer" className={cx("menu-link", "nav-link")}>
                Khách hàng
              </Link>
            </li>
            <li className={cx("menu-item", "nav-item")}>
              <Link to="/Order" className={cx("menu-link", "nav-link")}>
                Đơn hàng
              </Link>
            </li>
            <li className={cx("menu-item", "nav-item")}>
              <Link to="/Contract" className={cx("menu-link", "nav-link")}>
                Hợp đồng
              </Link>
            </li>
            <li className={cx("menu-item", "nav-item")}>
              <Link to="/Commodities" className={cx("menu-link", "nav-link")}>
                Hàng hóa
              </Link>
            </li>
            <li className={cx("menu-item", "nav-item")}>
              <Link to="/Contact" className={cx("menu-link", "nav-link")}>
                Hỗ trợ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={cx("content-right")}>
        <div className={cx("button-right")}>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            variant="primary"
            size="sm"
            className={cx("account-button", "text-uppercase")} // Thêm lớp account-button
          >
            <AccountCircleIcon className={cx("nav-icon")} />
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
                    placement === "bottom-start" ? "left top" : "left bottom",
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
                      <MenuItem onClick={handleClose}>
                        <AccountCircleIcon className={cx("menu-icon")} />
                        Thông tin cá nhân
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <SettingsIcon className={cx("menu-icon")} />
                        Cài đặt
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ExitToAppIcon className={cx("menu-icon")} />
                        Đăng xuất
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    </div>
  );
}
