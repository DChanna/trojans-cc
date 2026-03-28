'use client';
import { Box, Container, Typography, IconButton, Grid } from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 6, mt: 'auto', borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <SportsCricketIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: '0.05em' }}>
                TROJAN CRICKET
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Bay Area Cricket Association
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <IconButton href="https://www.instagram.com/trojan_bats/" target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <InstagramIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} Trojan Cricket Club. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
