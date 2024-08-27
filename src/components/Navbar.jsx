"use client";
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import ThemeSwitcher from '@/app/ThemeSwitcher';
import Link from 'next/link';
import styles from '../styles/compiled/Navbar.module.css';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawer = (
    <div className={styles.drawerContent}>
      <div className={styles.drawerHeader}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={toggleDrawer(false)}
          className={styles.closeIcon}
        >
          <MdClose />
        </IconButton>
      </div>
      <List>
        <ListItem button component={Link} href="/home">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} href="/libros">
          <ListItemText primary="Libros" />
        </ListItem>
        <ListItem button component={Link} href="/autores">
          <ListItemText primary="Autores" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar>
        <div className={styles.logo}>
          <Link href="/home">Library Manager</Link>
        </div>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              className={styles.menuIcon}
            >
              <GiHamburgerMenu />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <div className={styles.navLinks}>
            <Link href="/home">Home</Link>
            <Link href="/libros">Libros</Link>
            <Link href="/autores">Autores</Link>
          </div>
        )}
        <div className={styles.switch}>
          <ThemeSwitcher />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
