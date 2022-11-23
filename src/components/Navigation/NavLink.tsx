import React from 'react';
import Link from 'next/link';
import { createStyles } from '@mantine/core';
import { useRouter } from 'next/router';

const useStyles = createStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

type NavLinkProps = {
  onClick: () => void;
  title: string;
  url: string;
  className?: string;
};

const NavLink = ({ onClick, title, url, className = '' }: NavLinkProps) => {
  const { classes } = useStyles();
  const { pathname } = useRouter();

  return (
    <Link href={url}>
      <a
        className={`${classes.link} ${className} ${
          pathname === url ? 'activeLink' : ''
        }`}
        onClick={onClick}
        role="link"
      >
        {title}
      </a>
    </Link>
  );
};

export default NavLink;
