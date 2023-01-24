import {
  IconBlockquote,
  IconCalendarTime,
  IconFile,
  IconLogout,
  IconPhoto,
  IconSettings,
  IconUserExclamation,
  IconUsers,
} from '@tabler/icons';

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
    title: 'Participants',
    url: '/participants',
  },
  {
    title: 'Abstracts',
    url: '/abstracts',
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
    title: 'Participants',
    url: '/admin/participants',
    icon: <IconUsers />,
  },
  {
    title: 'Abstracts',
    url: '/admin/abstracts',
    icon: <IconBlockquote />,
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
