'use client';
import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Grid,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import Groups2Icon from '@mui/icons-material/Groups2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { PAYMENT_STATUS_CONFIG } from '@/types';

interface Player {
  playerId: string;
  fullName: string;
  email: string;
  phone: string;
  usaCricketId: string;
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  paymentPlan: string;
  duesPaid: string;
  outstandingAmount: number;
  umpireAssignments: number;
  notes: string;
  teams: ('T1' | 'T2')[];
}

const PLAYERS: Player[] = [
  { playerId: 'P01', fullName: 'Dhruv Channa', email: 'channa.dhruv@gmail.com', phone: '', usaCricketId: '---', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm medium', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1', 'T2'] },
  { playerId: 'P02', fullName: 'Karan Sidhu', email: 'ksidhu@outlook.com', phone: '', usaCricketId: '390931', role: 'Batsman', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm medium', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P03', fullName: 'Vasu Gupta', email: 'vasu.gupta.p@gmail.com', phone: '', usaCricketId: '568153', role: 'Batsman', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm off-break', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P04', fullName: 'Ratik Sachdeva', email: 'ratik.sachdeva@gmail.com', phone: '', usaCricketId: '1723452', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm medium', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P05', fullName: 'Tej Sidhu', email: 'tejs@ymail.com', phone: '', usaCricketId: '6365956', role: 'Bowler', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm fast', paymentPlan: 'Season Dues', duesPaid: 'Unpaid', outstandingAmount: 150, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P06', fullName: 'Akshit Mehta', email: 'mehtaakshit7@gmail.com', phone: '', usaCricketId: '1968732', role: 'Batsman', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm off-break', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P07', fullName: 'Rohit Bhamidipati', email: 'rbhamidi2000@gmail.com', phone: '', usaCricketId: '1806558', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm medium', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P08', fullName: 'Abhinandhan Narayanan', email: 'abhinandhan8@gmail.com', phone: '', usaCricketId: '1940521', role: 'Bowler', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm fast-medium', paymentPlan: 'Season Dues', duesPaid: 'Unpaid', outstandingAmount: 150, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P09', fullName: 'Sachin Paka', email: 'escaflowne2711@gmail.com', phone: '', usaCricketId: '654922', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm medium', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P10', fullName: 'Sriram Subramanian', email: 'srirams1217@gmail.com', phone: '', usaCricketId: '6365728', role: 'Batsman', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm off-break', paymentPlan: 'Season Dues', duesPaid: 'Partial', outstandingAmount: 75, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P11', fullName: 'Surendra TS', email: 'surendrats1999@gmail.com', phone: '', usaCricketId: '5031395', role: 'Bowler', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm fast-medium', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P12', fullName: 'Ajay MS', email: 'ajayms.005@gmail.com', phone: '', usaCricketId: '413519', role: 'Wicketkeeper-Batsman', battingStyle: 'Right-hand', bowlingStyle: '', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P13', fullName: 'Krithin Arukala', email: 'krithinarukala@gmail.com', phone: '', usaCricketId: '6365944', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm medium', paymentPlan: 'Season Dues', duesPaid: 'Unpaid', outstandingAmount: 150, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P14', fullName: 'Parth Gupta', email: 'parth.gupta.v@gmail.com', phone: '', usaCricketId: '568152', role: 'Batsman', battingStyle: 'Left-hand', bowlingStyle: 'Left-arm orthodox', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P15', fullName: 'Manideep Nandina', email: 'Manideepn2022@gmail.com', phone: '', usaCricketId: '5169607', role: 'Bowler', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm fast', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P16', fullName: 'Ashrit Kasu', email: 'ashritk0809@gmail.com', phone: '', usaCricketId: '5044138', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm off-break', paymentPlan: 'Season Dues', duesPaid: 'Partial', outstandingAmount: 75, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P17', fullName: 'Raman Kumar', email: 'Moonraman123@gmail.com', phone: '', usaCricketId: '1199408', role: 'Batsman', battingStyle: 'Right-hand', bowlingStyle: '', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P18', fullName: 'Pranav Dadi', email: 'Dadipranav@gmail.com', phone: '', usaCricketId: '603129', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm medium', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P19', fullName: 'Chirag Gupta', email: 'Vasukansal634@gmail.com', phone: '', usaCricketId: '6366468', role: 'Bowler', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm leg-break', paymentPlan: 'Season Dues', duesPaid: 'Unpaid', outstandingAmount: 150, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P20', fullName: 'Harsh Patel', email: 'patelharsh.patel19@gmail.com', phone: '', usaCricketId: '4488213', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm medium', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P21', fullName: 'Rahul Cariappa', email: 'cp.rahul.cariappa@gmail.com', phone: '', usaCricketId: '4468145', role: 'Bowler', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm leg-break', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P22', fullName: 'Rohan Gulhar', email: 'rgulhar1@gmail.com', phone: '', usaCricketId: '6366617', role: 'Batsman', battingStyle: 'Right-hand', bowlingStyle: '', paymentPlan: 'Season Dues', duesPaid: 'Unpaid', outstandingAmount: 150, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P23', fullName: 'Nikhil Gangrade', email: 'nikhil12gangrade93@yahoo.com', phone: '', usaCricketId: '3079626', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm off-break', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P24', fullName: 'Mufaddal Daginawala', email: 'Muffi.daginawala@gmail.com', phone: '', usaCricketId: '2024136', role: 'Wicketkeeper-Batsman', battingStyle: 'Right-hand', bowlingStyle: '', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P25', fullName: 'Sameer Thorat', email: 'sameer931025@gmail.com', phone: '', usaCricketId: '4786826', role: 'Bowler', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm fast-medium', paymentPlan: 'Season Dues', duesPaid: 'Partial', outstandingAmount: 75, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P26', fullName: 'Sai Saran', email: '', phone: '', usaCricketId: '', role: 'Batsman', battingStyle: 'Right-hand', bowlingStyle: '', paymentPlan: 'Season Dues', duesPaid: 'Unpaid', outstandingAmount: 150, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P27', fullName: 'Kavish Purohit', email: '', phone: '', usaCricketId: '', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm medium', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P28', fullName: 'Romil Karia', email: '', phone: '', usaCricketId: '', role: 'Batsman', battingStyle: 'Right-hand', bowlingStyle: '', paymentPlan: 'Season Dues', duesPaid: 'Unpaid', outstandingAmount: 150, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P29', fullName: 'Prem Dhoot', email: '', phone: '', usaCricketId: '', role: 'Bowler', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm fast', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P30', fullName: 'Rishab Jay', email: '', phone: '', usaCricketId: '', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm medium', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
  { playerId: 'P31', fullName: 'Vivek Krishnagiri', email: '', phone: '', usaCricketId: '', role: 'Batsman', battingStyle: 'Left-hand', bowlingStyle: 'Left-arm orthodox', paymentPlan: 'Season Dues', duesPaid: 'Unpaid', outstandingAmount: 150, umpireAssignments: 0, notes: '', teams: ['T2'] },
  { playerId: 'P32', fullName: 'Sidhant Kabra', email: '', phone: '', usaCricketId: '2623431', role: 'All-rounder', battingStyle: 'Right-hand', bowlingStyle: 'Right-arm off-break', paymentPlan: 'Season Dues', duesPaid: 'Paid', outstandingAmount: 0, umpireAssignments: 0, notes: '', teams: ['T1'] },
];

const GOLD = '#C9A84C';
const GOLD_BG = 'rgba(201, 168, 76, 0.12)';

function getTeamLabel(teams: ('T1' | 'T2')[]) {
  if (teams.length === 2) return 'Both';
  return teams[0];
}

function getTeamChipSx(teams: ('T1' | 'T2')[]) {
  if (teams.length === 2) {
    return {
      backgroundColor: 'rgba(201, 168, 76, 0.15)',
      color: GOLD,
      fontWeight: 600,
      fontSize: '0.75rem',
    };
  }
  if (teams[0] === 'T1') {
    return {
      backgroundColor: 'rgba(41, 182, 246, 0.15)',
      color: '#29B6F6',
      fontWeight: 600,
      fontSize: '0.75rem',
    };
  }
  return {
    backgroundColor: 'rgba(171, 71, 188, 0.15)',
    color: '#AB47BC',
    fontWeight: 600,
    fontSize: '0.75rem',
  };
}

export default function PlayersPage() {
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState<string>('All');
  const [paymentFilter, setPaymentFilter] = useState<string>('All');

  const filteredPlayers = useMemo(() => {
    return PLAYERS.filter((player) => {
      const matchesSearch =
        search === '' ||
        player.fullName.toLowerCase().includes(search.toLowerCase()) ||
        player.playerId.toLowerCase().includes(search.toLowerCase()) ||
        player.email.toLowerCase().includes(search.toLowerCase());

      const matchesTeam =
        teamFilter === 'All' ||
        player.teams.includes(teamFilter as 'T1' | 'T2');

      const matchesPayment =
        paymentFilter === 'All' ||
        (paymentFilter === 'Paid' && player.duesPaid === 'Paid') ||
        (paymentFilter === 'Unpaid' && (player.duesPaid === 'Unpaid' || player.duesPaid === 'Partial'));

      return matchesSearch && matchesTeam && matchesPayment;
    });
  }, [search, teamFilter, paymentFilter]);

  const stats = useMemo(() => {
    const total = PLAYERS.length;
    const t1Count = PLAYERS.filter((p) => p.teams.includes('T1')).length;
    const t2Count = PLAYERS.filter((p) => p.teams.includes('T2')).length;
    const paidCount = PLAYERS.filter((p) => p.duesPaid === 'Paid').length;
    const duesPercent = Math.round((paidCount / total) * 100);
    return { total, t1Count, t2Count, duesPercent };
  }, []);

  const statCards = [
    {
      title: 'Total Players',
      value: stats.total,
      icon: <PeopleIcon />,
      color: GOLD,
      subtitle: 'Active roster',
    },
    {
      title: 'Trojans Pacific',
      value: stats.t1Count,
      icon: <Groups2Icon />,
      color: '#29B6F6',
      subtitle: 'T1 players',
    },
    {
      title: 'Trojans United',
      value: stats.t2Count,
      icon: <Groups2Icon />,
      color: '#AB47BC',
      subtitle: 'T2 players',
    },
    {
      title: 'Dues Collected',
      value: `${stats.duesPercent}%`,
      icon: <AttachMoneyIcon />,
      color: '#66BB6A',
      subtitle: `${PLAYERS.filter((p) => p.duesPaid === 'Paid').length} of ${stats.total} paid`,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Players
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your roster across both teams
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{
            backgroundColor: GOLD,
            color: '#0A0A0A',
            fontWeight: 600,
            px: 3,
            py: 1,
            '&:hover': {
              backgroundColor: '#B8973F',
            },
          }}
        >
          Add Player
        </Button>
      </Box>

      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3)`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: `${stat.color}15`,
                      color: stat.color,
                    }}
                  >
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

      {/* Filter Bar */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <TextField
              placeholder="Search by name, ID, or email..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                minWidth: 280,
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: GOLD },
                  '&.Mui-focused fieldset': { borderColor: GOLD },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Team</InputLabel>
              <Select
                value={teamFilter}
                label="Team"
                onChange={(e: SelectChangeEvent) => setTeamFilter(e.target.value)}
                sx={{
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: GOLD },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: GOLD },
                }}
              >
                <MenuItem value="All">All Teams</MenuItem>
                <MenuItem value="T1">T1 - Pacific</MenuItem>
                <MenuItem value="T2">T2 - United</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 170 }}>
              <InputLabel>Payment Status</InputLabel>
              <Select
                value={paymentFilter}
                label="Payment Status"
                onChange={(e: SelectChangeEvent) => setPaymentFilter(e.target.value)}
                sx={{
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: GOLD },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: GOLD },
                }}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Unpaid">Unpaid</MenuItem>
              </Select>
            </FormControl>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ml: 'auto', whiteSpace: 'nowrap' }}
            >
              Showing {filteredPlayers.length} of {PLAYERS.length} players
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {['ID', 'Name', 'Team', 'Email', 'USA Cricket ID', 'Payment', 'Actions'].map(
                  (header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: GOLD,
                        borderBottom: `1px solid rgba(201, 168, 76, 0.2)`,
                        py: 1.5,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPlayers.map((player) => {
                const paymentConfig = PAYMENT_STATUS_CONFIG[player.duesPaid] || PAYMENT_STATUS_CONFIG['Unpaid'];
                return (
                  <TableRow
                    key={player.playerId}
                    sx={{
                      transition: 'background-color 0.15s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(201, 168, 76, 0.04)',
                      },
                      '& td': {
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        py: 1.5,
                      },
                    }}
                  >
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                          fontWeight: 600,
                          color: 'text.secondary',
                          fontSize: '0.8rem',
                        }}
                      >
                        {player.playerId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: '#FFFFFF' }}
                      >
                        {player.fullName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getTeamLabel(player.teams)}
                        size="small"
                        sx={getTeamChipSx(player.teams)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: player.email ? 'text.secondary' : 'rgba(255,255,255,0.25)',
                          fontSize: '0.8rem',
                        }}
                      >
                        {player.email || '---'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.8rem',
                          color:
                            player.usaCricketId && player.usaCricketId !== '---'
                              ? 'text.secondary'
                              : 'rgba(255,255,255,0.25)',
                        }}
                      >
                        {player.usaCricketId || '---'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={player.duesPaid}
                        size="small"
                        sx={{
                          color: paymentConfig.color,
                          backgroundColor: paymentConfig.bgColor,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="View Details" arrow>
                          <IconButton
                            size="small"
                            sx={{
                              color: 'text.secondary',
                              '&:hover': {
                                color: GOLD,
                                backgroundColor: GOLD_BG,
                              },
                            }}
                          >
                            <VisibilityOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Player" arrow>
                          <IconButton
                            size="small"
                            sx={{
                              color: 'text.secondary',
                              '&:hover': {
                                color: GOLD,
                                backgroundColor: GOLD_BG,
                              },
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredPlayers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="body1" color="text.secondary">
                      No players match your filters
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
