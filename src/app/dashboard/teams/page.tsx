'use client';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleIcon from '@mui/icons-material/People';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import StarIcon from '@mui/icons-material/Star';

interface Player {
  name: string;
  role?: string;
  paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
  bothTeams?: boolean;
}

const t1Players: Player[] = [
  { name: 'Dhruv Channa', role: 'Captain / All-Rounder', paymentStatus: 'Paid', bothTeams: true },
  { name: 'Karan Sidhu', role: 'Batsman', paymentStatus: 'Paid' },
  { name: 'Vasu Gupta', role: 'Batsman', paymentStatus: 'Paid' },
  { name: 'Ratik Sachdeva', role: 'All-Rounder', paymentStatus: 'Unpaid' },
  { name: 'Tej Sidhu', role: 'Bowler', paymentStatus: 'Paid' },
  { name: 'Akshit Mehta', role: 'Batsman', paymentStatus: 'Paid' },
  { name: 'Sachin Paka', role: 'Bowler', paymentStatus: 'Partial' },
  { name: 'Sriram Subramanian', role: 'All-Rounder', paymentStatus: 'Paid' },
  { name: 'Krithin Arukala', role: 'Batsman', paymentStatus: 'Paid' },
  { name: 'Parth Gupta', role: 'Wicketkeeper', paymentStatus: 'Unpaid' },
  { name: 'Ashrit Kasu', role: 'Bowler', paymentStatus: 'Paid' },
  { name: 'Pranav Dadi', role: 'All-Rounder', paymentStatus: 'Paid' },
  { name: 'Rahul Cariappa', role: 'Batsman', paymentStatus: 'Paid' },
  { name: 'Nikhil Gangrade', role: 'Bowler', paymentStatus: 'Unpaid' },
  { name: 'Sameer Thorat', role: 'Batsman', paymentStatus: 'Paid' },
  { name: 'Kavish Purohit', role: 'All-Rounder', paymentStatus: 'Paid' },
  { name: 'Prem Dhoot', role: 'Bowler', paymentStatus: 'Paid' },
  { name: 'Rishab Jay', paymentStatus: 'Unpaid' },
  { name: 'Sidhant Kabra', paymentStatus: 'Partial' },
];

const t2Players: Player[] = [
  { name: 'Dhruv Channa', role: 'Captain / All-Rounder', paymentStatus: 'Paid', bothTeams: true },
  { name: 'Rohit Bhamidipati', role: 'Batsman', paymentStatus: 'Paid' },
  { name: 'Abhinandhan Narayanan', role: 'All-Rounder', paymentStatus: 'Paid' },
  { name: 'Surendra TS', role: 'Bowler', paymentStatus: 'Unpaid' },
  { name: 'Ajay MS', role: 'Batsman', paymentStatus: 'Paid' },
  { name: 'Manideep Nandina', role: 'All-Rounder', paymentStatus: 'Paid' },
  { name: 'Raman Kumar', role: 'Bowler', paymentStatus: 'Partial' },
  { name: 'Chirag Gupta', role: 'Wicketkeeper', paymentStatus: 'Paid' },
  { name: 'Harsh Patel', role: 'Batsman', paymentStatus: 'Paid' },
  { name: 'Rohan Gulhar', role: 'All-Rounder', paymentStatus: 'Unpaid' },
  { name: 'Mufaddal Daginawala', role: 'Bowler', paymentStatus: 'Paid' },
  { name: 'Sai Saran', role: 'Batsman', paymentStatus: 'Paid' },
  { name: 'Romil Karia', paymentStatus: 'Paid' },
  { name: 'Vivek Krishnagiri', paymentStatus: 'Unpaid' },
];

const paymentChipProps: Record<string, { color: 'success' | 'error' | 'warning'; label: string }> = {
  Paid: { color: 'success', label: 'Paid' },
  Unpaid: { color: 'error', label: 'Unpaid' },
  Partial: { color: 'warning', label: 'Partial' },
};

const stats = [
  { label: 'Total Players', value: '32', color: '#C9A84C', icon: <PeopleIcon /> },
  { label: 'T1 — Pacific', value: '19', color: '#29B6F6', icon: <GroupsIcon /> },
  { label: 'T2 — United', value: '14', color: '#66BB6A', icon: <GroupsIcon /> },
  { label: 'On Both Teams', value: '1', color: '#FF7043', icon: <StarIcon /> },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function TeamCard({ title, tag, players, accentColor }: { title: string; tag: string; players: Player[]; accentColor: string }) {
  return (
    <Card
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'rgba(201, 168, 76, 0.12)',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Box
        sx={{
          height: 4,
          borderRadius: '4px 4px 0 0',
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip
              label={tag}
              size="small"
              sx={{
                backgroundColor: `${accentColor}20`,
                color: accentColor,
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#C9A84C' }}>
              {title}
            </Typography>
          </Box>
          <Chip
            label={`${players.length} players`}
            size="small"
            variant="outlined"
            sx={{ borderColor: 'rgba(255,255,255,0.12)', color: 'text.secondary', fontSize: '0.75rem' }}
          />
        </Box>

        <Divider sx={{ mb: 2, borderColor: 'rgba(201, 168, 76, 0.08)' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {players.map((player, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 1,
                px: 1.5,
                borderRadius: 1.5,
                transition: 'background-color 0.15s',
                '&:hover': { backgroundColor: 'rgba(201, 168, 76, 0.04)' },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  backgroundColor: player.bothTeams ? 'rgba(201, 168, 76, 0.2)' : 'rgba(255,255,255,0.06)',
                  color: player.bothTeams ? '#C9A84C' : 'text.secondary',
                  border: player.bothTeams ? '1px solid rgba(201, 168, 76, 0.4)' : 'none',
                }}
              >
                {getInitials(player.name)}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {player.name}
                  </Typography>
                  {player.bothTeams && (
                    <StarIcon sx={{ fontSize: 14, color: '#C9A84C' }} />
                  )}
                </Box>
                {player.role && (
                  <Typography variant="caption" color="text.secondary">
                    {player.role}
                  </Typography>
                )}
              </Box>
              <Chip
                label={paymentChipProps[player.paymentStatus].label}
                color={paymentChipProps[player.paymentStatus].color}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.68rem', height: 22, fontWeight: 600 }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function TeamsPage() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <SportsCricketIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Teams
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Squad rosters for the Summer 2026 season
        </Typography>
      </Box>

      {/* Summary Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={6} sm={3} key={stat.label}>
            <Card sx={{ border: '1px solid rgba(201, 168, 76, 0.08)' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Box sx={{ color: stat.color, opacity: 0.6 }}>{stat.icon}</Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <StarIcon sx={{ fontSize: 14, color: '#C9A84C' }} />
          Dhruv Channa (P01) is rostered on both teams
        </Typography>
      </Box>

      {/* Team Cards */}
      <Grid container spacing={3}>
        <Grid>
          <TeamCard title="Trojans Pacific" tag="T1" players={t1Players} accentColor="#29B6F6" />
        </Grid>
        <Grid>
          <TeamCard title="Trojans United" tag="T2" players={t2Players} accentColor="#66BB6A" />
        </Grid>
      </Grid>
    </Box>
  );
}
