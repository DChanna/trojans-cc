'use client';
import { Box, Container, Typography, Button, Grid, Card, CardContent, Stack } from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Link from 'next/link';

const features = [
  { icon: <GroupsIcon sx={{ fontSize: 40 }} />, title: '32+ Players', description: 'Two competitive squads competing in the Bay Area Cricket Association.' },
  { icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />, title: '2 Teams', description: 'Trojans Pacific & Trojans United — fielding the best talent in the Bay.' },
  { icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />, title: '20 Matches', description: 'Full season of competitive cricket across multiple formats.' },
];

export default function HomePage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Gradient Background */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(139, 26, 26, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(201, 168, 76, 0.1) 0%, transparent 60%)', zIndex: 0 }} />
        {/* Subtle grid pattern */}
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 0 }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600 }}>
                  Bay Area Cricket Association
                </Typography>
              </Box>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' }, fontWeight: 900, lineHeight: 1.1, mb: 3 }}>
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #F5F5F5 0%, #A0A0A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Built Different.
                </Box>
                <br />
                <Box component="span" sx={{ background: 'linear-gradient(135deg, #C9A84C 0%, #DFC06E 50%, #C9A84C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Play Different.
                </Box>
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 5, maxWidth: 500, fontWeight: 400, lineHeight: 1.6 }}>
                Home of Trojans Pacific & Trojans United. Competing, growing, and dominating Bay Area cricket — one match at a time.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={Link} href="/contact" variant="contained" color="primary" size="large" sx={{ px: 5, py: 1.5, fontSize: '1rem' }}>
                  Join the Squad
                </Button>
                <Button component={Link} href="/about" variant="outlined" size="large" sx={{ px: 5, py: 1.5, fontSize: '1rem', borderColor: 'rgba(201, 168, 76, 0.3)', color: 'text.primary', '&:hover': { borderColor: 'primary.main', backgroundColor: 'rgba(201, 168, 76, 0.05)' } }}>
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ position: 'relative', width: 300, height: 300 }}>
                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201, 168, 76, 0.15) 0%, transparent 70%)', animation: 'pulse 4s ease-in-out infinite', '@keyframes pulse': { '0%, 100%': { transform: 'scale(1)', opacity: 0.5 }, '50%': { transform: 'scale(1.1)', opacity: 1 } } }} />
                <Box sx={{ position: 'absolute', inset: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '2px solid rgba(201, 168, 76, 0.2)' }}>
                  <SportsCricketIcon sx={{ fontSize: 120, color: 'primary.main', opacity: 0.8 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, position: 'relative' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 2 }}>
            <Box component="span" sx={{ color: 'primary.main' }}>Summer 2026</Box> Season
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: 500, mx: 'auto' }}>
            Two squads. Twenty matches. One mission.
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', borderColor: 'rgba(201, 168, 76, 0.2)' } }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h5" sx={{ mb: 1.5 }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{feature.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Teams Section */}
      <Box sx={{ py: 12, background: 'linear-gradient(180deg, transparent 0%, rgba(139, 26, 26, 0.05) 50%, transparent 100%)' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 8 }}>
            Our <Box component="span" sx={{ color: 'primary.main' }}>Squads</Box>
          </Typography>
          <Grid container spacing={4}>
            {[
              { name: 'Trojans Pacific', tag: 'T1', desc: 'The flagship squad. Experienced, battle-tested, and hungry for titles.' },
              { name: 'Trojans United', tag: 'T2', desc: 'The rising force. Young talent meets fierce determination.' },
            ].map((team) => (
              <Grid item xs={12} md={6} key={team.tag}>
                <Card sx={{ p: 4, textAlign: 'center', background: 'linear-gradient(135deg, rgba(20,20,20,1) 0%, rgba(30,30,30,1) 100%)', '&:hover': { borderColor: 'rgba(201, 168, 76, 0.3)' }, transition: 'all 0.3s ease' }}>
                  <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.2em' }}>{team.tag}</Typography>
                  <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>{team.name}</Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{team.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Ready to <Box component="span" sx={{ color: 'primary.main' }}>Play</Box>?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 5, lineHeight: 1.7 }}>
            Whether you&apos;re a seasoned cricketer or just getting started, there&apos;s a spot on the squad for you.
          </Typography>
          <Button component={Link} href="/contact" variant="contained" color="primary" size="large" sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}>
            Get in Touch
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
