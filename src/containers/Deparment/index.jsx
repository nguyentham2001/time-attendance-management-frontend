import React, { useEffect, useState } from 'react';
import StyledDeparment from './index.style';
import { useTranslation } from 'react-i18next';
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
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
import CreateDepartment from './CreateDeparment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Popup from 'src/components/Popup';
import { useSnackbar } from 'notistack';
import debounce from '@src/utils/debounce';

const columns = [
  { id: 'no', label: 'STT' },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 },
];

const Deparment = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const [departmentSelected, setDepartmentSelected] = useState(null);
  const [showConfirmDeleteDepartment, setShowConfirmDeleteDepartment] =
    useState(false);

  const handleOpenDialog = (item) => {
    setDepartmentSelected(item);
    setOpen(true);
  };

  const handleClose = () => {
    setDepartmentSelected();
    setOpen(false);
  };

  const {
    data,
    onParamsChange,
    onPageChange,
    currentPage,
    limit,
    total,
    handleCallApi: fetchListDeparments,
    searchParams,
  } = usePaginationWithState([], apis.deparment.getListDeparments);

  const handleReloadData = () => {
    fetchListDeparments(searchParams);
  };

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = +event.target.value;
    onParamsChange({ limit: newLimit, pageNum: 1 });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    debounce(onParamsChange)({ search: value.trim() });
  };

  const handleOpenDelete = (department) => {
    setDepartmentSelected(department);
    setShowConfirmDeleteDepartment(true);
  };

  const handleCloseConfirmDelete = () => {
    setDepartmentSelected();
    setShowConfirmDeleteDepartment(false);
  };

  const handleConfirmDeleteDepartment = async () => {
    try {
      const res = await apis.deparment.deleteDepartment(departmentSelected.id);

      if (!res) throw new Error('serverError');

      enqueueSnackbar({
        variant: 'success',
        message: t('delete-department-successfully'),
      });

      if (data.length <= 1 && currentPage !== 1) {
        onPageChange(currentPage - 1);
      } else {
        handleReloadData();
      }
    } catch (error) {
      enqueueSnackbar({
        variant: 'error',
        message: t(message),
      });
    }
  };

  const actions = [
    {
      icon: <EditIcon />,
      onClick: (item) => handleOpenDialog(item),
    },
    {
      icon: <DeleteIcon className="delete-icon" />,
      onClick: handleOpenDelete,
    },
  ];

  return (
    <StyledDeparment>
      <div className="deparment-home">
        <span className="title-deparment">{t('manage-department-lists')}</span>
        <div className="deparment-footer">
          <div className="search-deparment">
            <TextField
              id="search-employee"
              variant="outlined"
              placeholder={t('search-for-departments')}
              type="text"
              className="input-employee"
              onChange={handleSearchChange}
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
              onClick={() => handleOpenDialog()}
            >
              {t('add')}
            </Button>
          </div>
          <div className="icon-listmenu">
            <div className="icon-list">
              <MenuIcon />
            </div>
            <span className="title-list">{t('department-list')}</span>
          </div>
          <div className="table-deparment">
            <Paper sx={{ width: '100%' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('no')}</TableCell>
                      <TableCell>{t('department-name')}</TableCell>
                      <TableCell>{t('actions')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, index) => {
                      const item = data[index];

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            let value = row[column.id];
                            if (column.id === 'no') {
                              value = (currentPage - 1) * limit + index + 1;
                            }

                            if (column.id === 'actions') {
                              return (
                                <TableCell>
                                  {actions.map((action) => (
                                    <IconButton
                                      className="icon-button"
                                      onClick={() => action.onClick(item)}
                                      disabled={
                                        typeof action.disable === 'function'
                                          ? action.disable(item)
                                          : action.disable
                                      }
                                    >
                                      {typeof action.icon === 'function'
                                        ? action.icon(item)
                                        : action.icon}
                                    </IconButton>
                                  ))}
                                </TableCell>
                              );
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
      <CreateDepartment
        open={open}
        deparment={departmentSelected}
        handleClose={handleClose}
        handleReloadData={handleReloadData}
      />

      <Popup
        open={showConfirmDeleteDepartment}
        onOk={handleConfirmDeleteDepartment}
        onClose={handleCloseConfirmDelete}
        title={'Delete department'}
        okMessage={'Delete'}
        content={'Are you sure you want to delete this department'}
      />
    </StyledDeparment>
  );
};

export default Deparment;
