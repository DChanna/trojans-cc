'use client';
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { DRAWER_WIDTH } from './Sidebar';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(10, 10, 10, 0.85)',
      }}
    >
      <Toolbar>
        <IconButton edge="start" onClick={onMenuClick} sx={{ mr: 2, display: { md: 'none' }, color: 'primary.main' }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flex: 1 }} />
        <Button component={Link} href="/" startIcon={<HomeIcon />} sx={{ color: 'text.secondary', mr: 1, '&:hover': { color: 'primary.main' } }}>
          Site
        </Button>
        <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
