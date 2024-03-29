import React, { useEffect, useState } from 'react';
import StyledGeneral from './index.style';
import { useTranslation } from 'react-i18next';
import { Button, TextField, InputAdornment } from '@mui/material';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AdjustIcon from '@mui/icons-material/Adjust';
import BlockIcon from '@mui/icons-material/Block';
import CustomTable from 'src/components/CustomTable';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'no', label: 'STT' },
  { id: 'account', label: 'Account', minWidth: 100 },
  {
    id: 'employeeId',
    label: 'employeeId',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'deparment',
    label: 'deparment',
    minWidth: 170,
    align: 'right',
  },
  { id: 'position', label: 'position', minWidth: 170 },
  { id: 'total-work', label: 'total work', minWidth: 170 },
  { id: 'late', label: 'late', minWidth: 170 },
  { id: 'late-minute', label: 'late minute', minWidth: 170 },
  { id: 'early', label: 'early', minWidth: 170 },
  { id: 'early-minute', label: 'early minute', minWidth: 170 },
  { id: 'overtime-hours', label: 'overtime hours', minWidth: 170 },
  { id: 'unexcused-absence', label: 'Unexcused Absence', minWidth: 170 },
  {
    id: 'absence-with-permission',
    label: 'Absence with permission',
    minWidth: 170,
  },
  { id: 'leave-without-pay', label: 'leave without pay', minWidth: 170 },
  { id: 'holiday', label: 'holiday', minWidth: 170 },
];
function createData(name, code, population, size) {
  const density = population / size;
  return {
    name,
    code,
    population,
    size,
    density,
    name1: '1',
    name2: '1',
    name3: '1',
    name4: '1',
    name5: '1',
  };
}
const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const General = () => {
  const { t } = useTranslation();
  const yesterday = dayjs().subtract(1, 'day');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <StyledGeneral>
      <div className="general-header">
        <label className="title-general">{t('Tổng hợp công tháng')}</label>
      </div>
      <div className="general-container">
        <div className="calendar-general">
          <label>{t(' Điều kiện lọc')}</label>
        </div>
        <div className="general-month">
          <div className="calendar-month">
            <span className="title-month">{t('Tháng:')}</span>
            <span className="icon-month">*</span>
            <div className="date-calendar">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className="datecalendar"
              >
                <DemoItem>
                  <DatePicker
                    defaultValue={yesterday}
                    disablePast
                    views={['year', 'month']}
                  />
                </DemoItem>
              </LocalizationProvider>
            </div>
          </div>
          <div className="button-public">
            <Button
              variant="contained"
              className="search-button"
              id="btt-search"
              color="primary"
              startIcon={<AdjustIcon />}
            >
              {t('Tìm kiếm')}
            </Button>

            <Button
              variant="contained"
              className="new-button"
              id="btt-create"
              color="primary"
              startIcon={<BlockIcon />}
            >
              {t('Làm mới')}
            </Button>
          </div>
        </div>

        <div className="icon-listmenu">
          <div className="icon-list">
            <MenuIcon />
            <span className="title-list">
              {t('Bảng tổng công của từng nhân viên trong tháng')}
            </span>
          </div>

          <div className="export-file">
            <Button
              variant="outlined"
              className="export-button"
              id="btt-export"
              color="primary"
              startIcon={<ArrowDownwardIcon />}
            >
              {t('Xuất dữ liệu')}
            </Button>
          </div>
        </div>
        <div className="table-general">
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell rowSpan={2}>STT</TableCell>
                    <TableCell rowSpan={2}>Account</TableCell>
                    <TableCell rowSpan={2}>Mã NV</TableCell>
                    <TableCell rowSpan={2}>Tên</TableCell>
                    <TableCell rowSpan={2}>Phòng ban</TableCell>
                    <TableCell rowSpan={2}>Chức vụ</TableCell>
                    <TableCell rowSpan={2}>Tổng công/tháng</TableCell>
                    <TableCell colSpan={2} align="center">
                      Vào muộn
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                      Về sớm
                    </TableCell>

                    <TableCell rowSpan={2}>Giờ tăng ca</TableCell>
                    <TableCell rowSpan={2}>Vắng không phép</TableCell>
                    <TableCell rowSpan={2}>Vắng phép có lương</TableCell>
                    <TableCell rowSpan={2}>Vắng phép không lương</TableCell>
                    <TableCell rowSpan={2}>Nghỉ lễ</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ top: 57 }}>Lần</TableCell>
                    <TableCell style={{ top: 57 }}>Phút</TableCell>
                    <TableCell style={{ top: 57 }}>Lần</TableCell>
                    <TableCell style={{ top: 57 }}>Phút</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </StyledGeneral>
  );
};

export default General;
