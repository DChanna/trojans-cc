'use client';
import { Box, Container, Typography, TextField, Button, Grid, Card, CardContent, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ContactPage() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.2em' }}>Contact</Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 6 }}>
          Get in <Box component="span" sx={{ color: 'primary.main' }}>Touch</Box>
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Send us a message</Typography>
                <Stack spacing={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="First Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Last Name" variant="outlined" />
                    </Grid>
                  </Grid>
                  <TextField fullWidth label="Email" type="email" variant="outlined" />
                  <TextField fullWidth label="Phone" variant="outlined" />
                  <TextField fullWidth label="Message" multiline rows={4} variant="outlined" placeholder="Tell us about your cricket experience, what teams you've played for, and your availability..." />
                  <Button variant="contained" color="primary" size="large" sx={{ alignSelf: 'flex-start', px: 5 }}>
                    Submit
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              {[
                { icon: <InstagramIcon />, title: 'Instagram', value: '@trojan_bats', href: 'https://www.instagram.com/trojan_bats/' },
                { icon: <EmailIcon />, title: 'Email', value: 'trojancc@gmail.com', href: 'mailto:trojancc@gmail.com' },
                { icon: <LocationOnIcon />, title: 'Location', value: 'Bay Area, California', href: null },
              ].map((item) => (
                <Card key={item.title} sx={{ transition: 'all 0.3s ease', '&:hover': { borderColor: 'rgba(201, 168, 76, 0.2)' } }}>
                  <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">{item.title}</Typography>
                      {item.href ? (
                        <Typography component="a" href={item.href} target="_blank" sx={{ color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                          {item.value}
                        </Typography>
                      ) : (
                        <Typography>{item.value}</Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
