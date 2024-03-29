/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ROUTES from '@src/constants/route';
import { Icon } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import YardIcon from '@mui/icons-material/Yard';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ReportIcon from '@mui/icons-material/Report';
import AcUnitIcon from '@mui/icons-material/AcUnit';

export const sidebarMenu = [
  {
    key: 'Employee',
    heading: 'Quản lý nhân sự',
    icon: (
      <Icon>
        {' '}
        <MenuBookIcon />
      </Icon>
    ),
    role: ['user'],
    route: ROUTES.HOME,
    isShow: (isAdmin) => isAdmin,
    subMenu: [
      {
        key: 'Employee',
        heading: 'Danh sách nhân viên',
        route: ROUTES.HOME,
        role: ['user'],
      },
      {
        key: 'Deparment',
        heading: 'Danh sách phòng ban',
        route: ROUTES.DEPARMENT,
        role: ['user'],
      },
      {
        key: 'Position',
        heading: 'Danh sách chức vụ',
        route: ROUTES.POSITION,
        role: ['user'],
      },
      {
        key: 'typeleave',
        heading: 'Loại đơn xin nghỉ',
        route: ROUTES.TYPELEAVE,
        role: ['user'],
      },
    ],
  },
  {
    key: 'Shift',
    heading: 'Chấm công',
    icon: (
      <Icon>
        <WorkHistoryIcon />
      </Icon>
    ),
    role: ['user'],
    route: ROUTES.SHIFT,
    isShow: (isAdmin) => !isAdmin,
    subMenu: [
      {
        key: 'Syn',
        heading: 'Chi tiết công',
        route: ROUTES.PUBLICDETAIL,
      },
      {
        key: 'detail',
        heading: 'Tăng ca',
        route: ROUTES.OVERTIME,
        role: ['user'],
      },
      {
        key: 'work',
        heading: 'Tổng hợp công',
        role: ['user'],
        route: ROUTES.GENERAL,
      },
    ],
  },
  {
    key: 'Salary',
    heading: 'Quản lý lương',
    icon: (
      <Icon>
        <YardIcon />
      </Icon>
    ),
    role: ['user'],
    route: ROUTES.SALARY,
    isShow: (isAdmin) => !isAdmin,
    subMenu: [
      {
        key: 'salaryadvance',
        heading: 'Tạm ứng lương',
        route: ROUTES.SALARYADVANCE,
      },
      {
        key: 'rewardandpunishment',
        heading: 'Thưởng và phạt',
        route: ROUTES.ORTHERMONEY,
        role: ['user'],
      },
      {
        key: 'salaryprocess',
        heading: 'Quá trình lương',
        role: ['user'],
        route: ROUTES.SALARYPROCESS,
      },
      {
        key: 'salarymonth',
        heading: 'Lương tháng',
        role: ['user'],
        route: ROUTES.SALARY,
      },
      {
        key: 'salarythirteen',
        heading: 'Lương tháng 13',
        role: ['user'],
        route: ROUTES.SALARYOFMONTH13,
      },
    ],
  },

  {
    key: 'Leave',
    heading: 'Đơn xin nghỉ',
    icon: (
      <Icon>
        <CardGiftcardIcon />
      </Icon>
    ),
    role: ['user'],
    route: ROUTES.LEAVE,
    isShow: (isAdmin) => !isAdmin,
    subMenu: [
      {
        key: 'Aplication',
        heading: 'Tạo đơn nghỉ',
        route: ROUTES.CREATEREQUEST,
        role: ['user'],
      },
      {
        key: 'lateearly',
        heading: 'Tổng hợp nghỉ phép',
        route: ROUTES.TOTALLEAVE,
        role: ['user'],
      },
    ],
  },
];
