import {
  IconCalendarTime,
  IconFile,
  IconLogout,
  IconPhoto,
  IconSettings,
  IconUserExclamation,
  IconUsers,
} from '@tabler/icons-react';

const links = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Registration',
    url: '/register',
  },
  {
    title: 'Participants & Abstracts',
    url: '/participants',
  },
  {
    title: 'Programme',
    url: '/programme',
  },
  {
    title: 'Travel',
    url: '/travel',
  },
  {
    title: 'Hiking excursion',
    url: '/trip',
  },
  {
    title: 'Gallery',
    url: '/gallery',
  },
];

export const adminLinks = [
  {
    title: 'General',
    url: '/admin',
    icon: <IconSettings />,
  },
  {
    title: 'Administrators',
    url: '/admin/administrators',
    icon: <IconUserExclamation />,
  },
  {
    title: 'Participants & Abstracts',
    url: '/admin/participants',
    icon: <IconUsers />,
  },
  {
    title: 'Programme',
    url: '/admin/programme',
    icon: <IconCalendarTime />,
  },
  {
    title: 'Pages',
    url: '/admin/pages',
    icon: <IconFile />,
  },
  {
    title: 'Gallery',
    url: '/admin/gallery',
    icon: <IconPhoto />,
  },
  {
    title: 'Log out',
    url: '/logout',
    icon: <IconLogout />,
  },
];

export default links;
