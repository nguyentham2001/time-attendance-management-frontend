import React, { useState } from 'react';
import StyledPosition from './index.style';
import { useTranslation } from 'react-i18next';
import { Button, TextField, InputAdornment } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CreatePosition from './CreatePosition';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { usePaginationWithState } from 'src/hooks';
import apis from 'src/apis';
const columns = [
  { id: 'no', label: 'STT', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
  },
];

const Position = () => {
  const { t } = useTranslation();

  // const handleChangeRowsPerPage = (event) => {
  //   const newLimit = +event.target.value;
  //   onParamsChange({ limit: newLimit, pageNum: 1 });
  // };
  const {
    data,
    onParamsChange,
    onPageChange,
    currentPage,
    limit,
    total,
    handleCallApi: fetchListPosition,
    searchParams,
  } = usePaginationWithState([], apis.position.getListPositions);

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage + 1);
  };

  const handleReloadData = () => {
    fetchListPosition(searchParams);
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = +event.target.value;
    onParamsChange({ limit: newLimit, pageNum: 1 });
  };


  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledPosition>
      <div className="position-home">
        <span className="title-position">{t('Quản lý danh sách chức vụ')}</span>
        <div className="position-container">
          <div className="search-position">
            <TextField
              id="search-employee"
              variant="outlined"
              placeholder={t('Tìm kiếm chức vụ')}
              type="text"
              className="input-employee"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              id="employee-btt"
              variant="contained"
              className="employee-button"
              color="primary"
              startIcon={<ControlPointIcon />}
              onClick={handleOpenDialog}
            >
              {t('add')}
            </Button>
          </div>
          <div className="icon-listmenu">
            <div className="icon-list">
              <MenuIcon />
            </div>
            <span className="title-list">{t('Danh sách chức vụ')}</span>
          </div>
          <div className="table-position">
            <Paper sx={{ width: '100%' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Tên chức vụ</TableCell>
                      <TableCell>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row,index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              let value = row[column.id];
                              if (column.id == 'no'){
                                value = (currentPage - 1) * limit + index + 1;
                              }
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
                count={total}
                rowsPerPage={limit}
                page={currentPage - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
      <CreatePosition
        open={open}
        handleClose={handleClose}
        handleReloadData={handleReloadData}
      />
    </StyledPosition>
  );
};

export default Position;
