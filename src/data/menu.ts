// src/data/menu.ts
import { MenuItem } from '@/types/models/Menu';
import {
  Home,
  Users,
  FileText,
  Calendar,
  BarChart,
  Settings,
  HelpCircle,
  LogOut,
  ChartAreaIcon,
  LockKeyhole,
} from 'lucide-react';

export const mainMenu: MenuItem[] = [
  {
    icon: Home,
    label: 'Home',
    href: '/',
  },
  {
    icon: ChartAreaIcon,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: Users,
    label: 'Audience',
    submenu: [
      { label: 'Users', href: '/audience/users' },
      { label: 'Subscribers', href: '/audience/subscribers' },
    ],
  },
  {
    icon: FileText,
    label: 'Posts',
    href: '/posts',
  },
  {
    icon: Calendar,
    label: 'Schedules',
    href: '/schedules',
  },
  {
    icon: BarChart,
    label: 'Income',
    submenu: [
      { label: 'Earnings', href: '/income/earnings' },
      { label: 'Funds', href: '/income/funds' },
      { label: 'Declines', href: '/income/declines' },
      { label: 'Payouts', href: '/income/payouts' },
    ],
  },
  {
    icon: LockKeyhole,
    label: 'Admin',
    submenu: [
      { label: 'Register User', href: '/register' },
      { label: 'Manger Users', href: '/manager-users' },
    ],
  },
];

export const footerMenu = [
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings',
    color: 'text-gray-700 hover:bg-gray-100',
  },
  {
    icon: HelpCircle,
    label: 'Help',
    href: '/help',
    color: 'text-gray-700 hover:bg-gray-100',
  },
  {
    icon: LogOut,
    label: 'Logout',
    href: '/logout',
    color: 'text-red-600 hover:bg-red-50',
  },
];
