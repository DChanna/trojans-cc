'use client';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';

export default function AboutPage() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: '0.2em' }}>About Us</Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 4 }}>
          The <Box component="span" sx={{ color: 'primary.main' }}>Trojan</Box> Story
        </Typography>
        <Grid container spacing={6}>
          <Grid>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
              Trojan Cricket Club was founded with a simple mission: bring together passionate cricketers in the Bay Area and compete at the highest level. What started as a group of friends has grown into a 32-player operation fielding two competitive teams in the Bay Area Cricket Association (BACA).
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
              <strong style={{ color: '#C9A84C' }}>Trojans Pacific (T1)</strong> — our flagship squad, packed with experience and a winning mentality. <strong style={{ color: '#C9A84C' }}>Trojans United (T2)</strong> — the rising force, blending young talent with fierce competition.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Beyond the pitch, we&apos;re building a brand. Trojan Bats represents our vision for cricket culture — premium gear, strong identity, and a community that plays the game the right way.
            </Typography>
          </Grid>
          <Grid>
            <Card sx={{ background: 'linear-gradient(135deg, rgba(139, 26, 26, 0.1) 0%, rgba(201, 168, 76, 0.05) 100%)' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 3 }}>Quick Facts</Typography>
                {[
                  ['Founded', 'Bay Area, CA'],
                  ['League', 'BACA'],
                  ['Teams', '2 (Pacific & United)'],
                  ['Roster', '32 Players'],
                  ['Season', 'Summer 2026'],
                  ['Formats', 'T20, Limited Overs'],
                ].map(([label, value]) => (
                  <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid rgba(201, 168, 76, 0.08)' }}>
                    <Typography variant="body2" color="text.secondary">{label}</Typography>
                    <Typography variant="body2" fontWeight={600}>{value}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
