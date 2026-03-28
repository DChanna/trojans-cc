'use client';
import { Box, Typography, Grid, Card, CardContent, Chip, LinearProgress, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const stats = [
  { title: 'Total Players', value: '32', icon: <PeopleIcon />, color: '#C9A84C', subtitle: 'Active roster' },
  { title: 'Teams', value: '2', icon: <GroupsIcon />, color: '#66BB6A', subtitle: 'Pacific & United' },
  { title: 'Matches', value: '20', icon: <CalendarMonthIcon />, color: '#29B6F6', subtitle: 'This season' },
  { title: 'Dues Collected', value: '$0', icon: <AttachMoneyIcon />, color: '#FF7043', subtitle: 'Season start' },
];

const recentActivity = [
  { text: 'Summer 2026 season initialized', time: 'Just now', type: 'info' },
  { text: '32 players imported to roster', time: 'Just now', type: 'success' },
  { text: '20 matches scheduled (10 per team)', time: 'Just now', type: 'info' },
  { text: 'Availability tracking ready', time: 'Just now', type: 'warning' },
];

export default function DashboardPage() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Summer 2026 Season Overview
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1, borderRadius: 2, backgroundColor: `${stat.color}15`, color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {stat.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Team Performance */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>Team Performance</Typography>
              <Grid container spacing={3}>
                {[
                  { name: 'Trojans Pacific', tag: 'T1', played: 0, won: 0, lost: 0, drawn: 0 },
                  { name: 'Trojans United', tag: 'T2', played: 0, won: 0, lost: 0, drawn: 0 },
                ].map((team) => (
                  <Grid item xs={12} sm={6} key={team.tag}>
                    <Box sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Chip label={team.tag} size="small" sx={{ backgroundColor: 'rgba(201, 168, 76, 0.15)', color: 'primary.main', fontWeight: 600 }} />
                        <Typography variant="subtitle1" fontWeight={600}>{team.name}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                        <Box><Typography variant="caption" color="text.secondary">P</Typography><Typography variant="h6">{team.played}</Typography></Box>
                        <Box><Typography variant="caption" color="text.secondary">W</Typography><Typography variant="h6" sx={{ color: 'success.main' }}>{team.won}</Typography></Box>
                        <Box><Typography variant="caption" color="text.secondary">L</Typography><Typography variant="h6" sx={{ color: 'error.main' }}>{team.lost}</Typography></Box>
                        <Box><Typography variant="caption" color="text.secondary">D</Typography><Typography variant="h6" sx={{ color: 'info.main' }}>{team.drawn}</Typography></Box>
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">Win Rate</Typography>
                          <Typography variant="caption" color="text.secondary">0%</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={0} sx={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(201, 168, 76, 0.1)', '& .MuiLinearProgress-bar': { backgroundColor: 'primary.main', borderRadius: 3 } }} />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>Recent Activity</Typography>
              <Stack spacing={2}>
                {recentActivity.map((activity, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', mt: 0.8, flexShrink: 0, backgroundColor: activity.type === 'success' ? 'success.main' : activity.type === 'warning' ? 'warning.main' : 'info.main' }} />
                    <Box>
                      <Typography variant="body2">{activity.text}</Typography>
                      <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
