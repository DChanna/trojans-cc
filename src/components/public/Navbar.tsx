'use client';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(10, 10, 10, 0.85)' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
              <SportsCricketIcon sx={{ color: 'primary.main', fontSize: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #C9A84C, #DFC06E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.05em' }}>
                TROJAN CRICKET
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button key={item.label} component={Link} href={item.href} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, fontSize: '0.95rem' }}>
                  {item.label}
                </Button>
              ))}
              <Button component={Link} href="/dashboard" variant="contained" color="primary" sx={{ ml: 2 }}>
                Dashboard
              </Button>
            </Box>
            <IconButton sx={{ display: { md: 'none' }, color: 'primary.main' }} onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ sx: { width: 280, pt: 2 } }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} component={Link} href={item.href} onClick={() => setMobileOpen(false)} sx={{ '&:hover': { backgroundColor: 'rgba(201, 168, 76, 0.08)' } }}>
              <ListItemText primary={item.label} primaryTypographyProps={{ sx: { color: 'text.primary' } }} />
            </ListItem>
          ))}
          <ListItem sx={{ mt: 2, px: 2 }}>
            <Button component={Link} href="/dashboard" variant="contained" color="primary" fullWidth onClick={() => setMobileOpen(false)}>
              Dashboard
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <Toolbar />
    </>
  );
}
