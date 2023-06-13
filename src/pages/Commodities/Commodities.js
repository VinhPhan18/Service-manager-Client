import React from 'react';
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import style from './Commodities.module.scss';
import { Paper } from '@mui/material';


export default function Commodities() {
  const rows = [
    // Dữ liệu mẫu cho các hàng trong bảng
    // ...
  ];

  return (
    <Container>
      <h1 className={style.title}>Trang giao dịch</h1>
      <TableContainer
        component={Paper}
        style={{ width: '1200px', height: '320px', backgroundColor: 'white', boxShadow: '0px 50px 40px rgba(190, 16, 16, 0.1)' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Tên khách hàng</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Số điện thoại</TableCell>
              <TableCell align="left">Địa chỉ</TableCell>
              <TableCell align="left">Mã số thuế</TableCell>
              <TableCell align="left">Mô tả</TableCell>
              <TableCell align="left">Website</TableCell>
              <TableCell align="left">Ngày tạo KH</TableCell>
              <TableCell align="left">Thông tin khác</TableCell>
              <TableCell align="left">Số tài khoản</TableCell>
              <TableCell align="left">Người đại diện</TableCell>
              <TableCell align="left">Chức vụ NĐĐ</TableCell>
              <TableCell align="left">SDT NĐĐ</TableCell>
              <TableCell align="left">Loại khách hàng</TableCell>
              <TableCell align="left">Tỉnh</TableCell>
              <TableCell align="left">Phường</TableCell>
              <TableCell align="left">Xã</TableCell>
              <TableCell align="left">Nhân viên</TableCell>
              <TableCell align="left">Người liên hệ</TableCell>
              <TableCell align="left">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phoneNumber}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.taxCode}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.website}</TableCell>
                <TableCell align="left">{row.creationDate}</TableCell>
                <TableCell align="left">{row.additionalInfo}</TableCell>
                <TableCell align="left">{row.accountNumber}</TableCell>
                <TableCell align="left">{row.representative}</TableCell>
                <TableCell align="left">{row.position}</TableCell>
                <TableCell align="left">{row.contactPhoneNumber}</TableCell>
                <TableCell align="left">{row.customerType}</TableCell>
                <TableCell align="left">{row.province}</TableCell>
                <TableCell align="left">{row.district}</TableCell>
                <TableCell align="left">{row.commune}</TableCell>
                <TableCell align="left">{row.employee}</TableCell>
                <TableCell align="left">{row.contactPerson}</TableCell>
                <TableCell align="left" className="Details"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
