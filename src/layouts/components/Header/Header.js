import React from "react";
import classNames from "classnames/bind";
import logo from "../../../image/logo.png";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HelpIcon from "@mui/icons-material/Help";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PaidIcon from '@mui/icons-material/Paid';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuItem,
  MenuList,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

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
      <div className={cx("content")}>
        <div className={cx("content-left")}>
          <div className={cx("logo")}>
            <Link to="/" className={cx("menu-link")}>
              <img src={logo} alt="Logo" className={cx("logo-image")} />
            </Link>
          </div>
          <div className={cx("menu-left")}>
            <ul className={cx("menu-list", "navbar", "navbar-nav")}>
              <li className={cx("menu-item", "nav-item")}>
                <Link to="/transactions">
                  <PaidIcon className={cx("nav-icon")} /> Giao dịch
                </Link>
              </li>
              {/* Thẻ Nhân viên */}
              <li className={cx("menu-item", "nav-item")}>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-nhanvien"
                    className={cx("menu-link", "nav-link")}
                  >
                    <PeopleIcon className={cx("nav-icon")} /> Nhân viên
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item key={1}>
                      <Link to={"/staffs"}>
                        <PeopleIcon className={cx("menu-icon")} /> Nhân viên
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item key={2}>
                      <Link to="/staffaccounts">
                        < PeopleIcon className={cx("menu-icon")} /> Tài khoản
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li className={cx("menu-item", "nav-item")}>

                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-nhanvien"
                    className={cx("menu-link", "nav-link")}
                  >
                    <PeopleIcon className={cx("nav-icon")} /> Khách hàng
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item key={1}>
                      <Link to={"/customers"}>
                        <PeopleIcon className={cx("menu-icon")} /> Khách hàng
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item key={2}>
                      <Link to="/contacts">
                        < PeopleIcon className={cx("menu-icon")} /> Người liên hệ
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </li>
              <li className={cx("menu-item", "nav-item")}>
                <Link to="/orders" className={cx("menu-link", "nav-link")}>
                  <LocalMallIcon className={cx("nav-icon")} /> Đơn hàng
                </Link>
              </li>
              <li className={cx("menu-item", "nav-item")}>
                <Link to={"/contracts"}>
                  <AssignmentIcon className={cx("nav-icon")} /> Hợp đồng
                </Link>
              </li>
              <li className={cx("menu-item", "nav-item")}>
                <Link to="/commodities" className={cx("menu-link", "nav-link")}>
                  <ShoppingCartIcon className={cx("nav-icon")} /> Hàng hóa
                </Link>
              </li>
              <li className={cx("menu-item", "nav-item")}>
                <Link to="/contacts" className={cx("menu-link", "nav-link")}>
                  <HelpIcon className={cx("nav-icon")} /> Hỗ trợ
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
                          <Link to="Profile/" className={cx("menu-link", "nav-link")}>
                            Thông tin cá nhân
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <ExitToAppIcon className={cx("menu-icon")} />
                          <Link to="#/" className={cx("menu-link", "nav-link")}>
                            Đăng xuất
                          </Link>
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
    </div>
  );
}
