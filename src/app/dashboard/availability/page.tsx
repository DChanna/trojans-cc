'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Box, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Select, MenuItem, Card, CardContent, Grid,
  Chip, SelectChangeEvent,
} from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// ── Types ──────────────────────────────────────────────────────────────────────
type AvailStatus =
  | 'Not Available'
  | 'Available - Selected (Paid)'
  | 'Available - Selected (Unpaid)'
  | 'Available - Not Selected'
  | 'Available - Withdrew';

interface Player {
  id: string;
  name: string;
}

type PlayerAvailability = Record<string, AvailStatus | ''>;
type TeamAvailability = Record<string, PlayerAvailability>;

// ── Constants ──────────────────────────────────────────────────────────────────
const STATUS_OPTIONS: AvailStatus[] = [
  'Not Available',
  'Available - Selected (Paid)',
  'Available - Selected (Unpaid)',
  'Available - Not Selected',
  'Available - Withdrew',
];

const STATUS_SHORT: Record<AvailStatus, string> = {
  'Not Available': 'N/A',
  'Available - Selected (Paid)': 'Paid',
  'Available - Selected (Unpaid)': 'Unpaid',
  'Available - Not Selected': 'Not Sel.',
  'Available - Withdrew': 'Withdrew',
};

const STATUS_COLORS: Record<AvailStatus | '', { bg: string; text: string }> = {
  '': { bg: 'transparent', text: '#555' },
  'Not Available': { bg: '#1565C020', text: '#64B5F6' },
  'Available - Selected (Paid)': { bg: '#2E7D3220', text: '#81C784' },
  'Available - Selected (Unpaid)': { bg: '#E6553120', text: '#FF8A65' },
  'Available - Not Selected': { bg: '#F9A82520', text: '#FFD54F' },
  'Available - Withdrew': { bg: '#C6282820', text: '#EF5350' },
};

const TEAM1_PLAYERS: Player[] = [
  { id: 'P01', name: 'Dhruv Channa' },
  { id: 'P02', name: 'Karan Sidhu' },
  { id: 'P03', name: 'Vasu Gupta' },
  { id: 'P04', name: 'Ratik Sachdeva' },
  { id: 'P05', name: 'Tej Sidhu' },
  { id: 'P06', name: 'Akshit Mehta' },
  { id: 'P09', name: 'Sachin Paka' },
  { id: 'P10', name: 'Sriram Subramanian' },
  { id: 'P13', name: 'Krithin Arukala' },
  { id: 'P14', name: 'Parth Gupta' },
  { id: 'P16', name: 'Ashrit Kasu' },
  { id: 'P18', name: 'Pranav Dadi' },
  { id: 'P21', name: 'Rahul Cariappa' },
  { id: 'P23', name: 'Nikhil Gangrade' },
  { id: 'P25', name: 'Sameer Thorat' },
  { id: 'P27', name: 'Kavish Purohit' },
  { id: 'P29', name: 'Prem Dhoot' },
  { id: 'P30', name: 'Rishab Jay' },
  { id: 'P32', name: 'Sidhant Kabra' },
];

const TEAM2_PLAYERS: Player[] = [
  { id: 'P01', name: 'Dhruv Channa' },
  { id: 'P07', name: 'Rohit Bhamidipati' },
  { id: 'P08', name: 'Abhinandhan Narayanan' },
  { id: 'P11', name: 'Surendra TS' },
  { id: 'P12', name: 'Ajay MS' },
  { id: 'P15', name: 'Manideep Nandina' },
  { id: 'P17', name: 'Raman Kumar' },
  { id: 'P19', name: 'Chirag Gupta' },
  { id: 'P20', name: 'Harsh Patel' },
  { id: 'P22', name: 'Rohan Gulhar' },
  { id: 'P24', name: 'Mufaddal Daginawala' },
  { id: 'P26', name: 'Sai Saran' },
  { id: 'P28', name: 'Romil Karia' },
  { id: 'P31', name: 'Vivek Krishnagiri' },
];

const GAMES = Array.from({ length: 10 }, (_, i) => i + 1);

const initAvailability = (players: Player[]): TeamAvailability => {
  const data: TeamAvailability = {};
  players.forEach(p => {
    const key = `${p.id}`;
    data[key] = {};
    GAMES.forEach(g => { data[key][`g${g}`] = ''; });
  });
  return data;
};

// ── Component ──────────────────────────────────────────────────────────────────
export default function AvailabilityPage() {
  const [tab, setTab] = useState(0);
  const [t1Avail, setT1Avail] = useState<TeamAvailability>(() => initAvailability(TEAM1_PLAYERS));
  const [t2Avail, setT2Avail] = useState<TeamAvailability>(() => initAvailability(TEAM2_PLAYERS));

  const players = tab === 0 ? TEAM1_PLAYERS : TEAM2_PLAYERS;
  const avail = tab === 0 ? t1Avail : t2Avail;
  const setAvail = tab === 0 ? setT1Avail : setT2Avail;

  const handleChange = useCallback((playerId: string, game: string, value: AvailStatus | '') => {
    setAvail(prev => ({
      ...prev,
      [playerId]: { ...prev[playerId], [game]: value },
    }));
  }, [setAvail]);

  const getSummary = useCallback((playerId: string) => {
    const row = avail[playerId];
    if (!row) return { played: 0, available: 0, withdrew: 0, notSelected: 0, unpaid: 0 };
    let played = 0, available = 0, withdrew = 0, notSelected = 0, unpaid = 0;
    GAMES.forEach(g => {
      const v = row[`g${g}`];
      if (v === 'Available - Selected (Paid)') { played++; available++; }
      else if (v === 'Available - Selected (Unpaid)') { played++; available++; unpaid++; }
      else if (v === 'Available - Not Selected') { available++; notSelected++; }
      else if (v === 'Available - Withdrew') { available++; withdrew++; }
      // Not Available and '' don't add to available
    });
    return { played, available, withdrew, notSelected, unpaid };
  }, [avail]);

  // Static season stats
  const seasonStats = [
    { label: 'Games Played', value: 0, icon: <SportsCricketIcon />, color: '#C9A84C' },
    { label: 'Won', value: 0, icon: <EmojiEventsIcon />, color: '#4CAF50' },
    { label: 'Lost', value: 0, icon: <CloseIcon />, color: '#E53935' },
    { label: 'Drawn', value: 0, icon: <CalendarMonthIcon />, color: '#29B6F6' },
    { label: 'Win Rate', value: '0%', icon: <TrendingUpIcon />, color: '#FF9800' },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          Availability Grid
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Summer 2026 Season &middot; Track player availability per game
        </Typography>
      </Box>

      {/* Stats Banner */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {seasonStats.map(s => (
          <Grid item xs={6} sm={4} md={2.4} key={s.label}>
            <Card sx={{
              background: `linear-gradient(135deg, ${s.color}10 0%, ${s.color}05 100%)`,
              border: `1px solid ${s.color}25`,
            }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, textAlign: 'center' }}>
                <Box sx={{ color: s.color, mb: 0.5 }}>{s.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: s.color }}>{s.value}</Typography>
                <Typography variant="caption" color="text.secondary">{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Team Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3,
          '& .MuiTab-root': { fontWeight: 600, fontSize: '0.9rem' },
          '& .Mui-selected': { color: '#C9A84C !important' },
          '& .MuiTabs-indicator': { backgroundColor: '#C9A84C' },
          borderBottom: '1px solid rgba(201, 168, 76, 0.12)',
        }}
      >
        <Tab label="Trojans Pacific (T1)" />
        <Tab label="Trojans United (T2)" />
      </Tabs>

      {/* Legend */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {STATUS_OPTIONS.map(s => (
          <Chip
            key={s}
            label={s}
            size="small"
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
              backgroundColor: STATUS_COLORS[s].bg,
              color: STATUS_COLORS[s].text,
              border: `1px solid ${STATUS_COLORS[s].text}30`,
            }}
          />
        ))}
      </Box>

      {/* Grid Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          border: '1px solid rgba(201, 168, 76, 0.08)',
          maxHeight: 'calc(100vh - 380px)',
          overflowX: 'auto',
        }}
      >
        <Table stickyHeader size="small" sx={{ minWidth: 1400 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700, minWidth: 55, position: 'sticky', left: 0, zIndex: 4,
                  backgroundColor: '#141414',
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700, minWidth: 170, position: 'sticky', left: 55, zIndex: 4,
                  backgroundColor: '#141414',
                }}
              >
                Player Name
              </TableCell>
              {GAMES.map(g => (
                <TableCell key={g} sx={{ fontWeight: 700, textAlign: 'center', minWidth: 120 }}>
                  Game {g}
                </TableCell>
              ))}
              <TableCell sx={{
                fontWeight: 700, textAlign: 'center', minWidth: 65,
                backgroundColor: '#1a1a14', borderLeft: '2px solid rgba(201, 168, 76, 0.2)',
              }}>
                Played
              </TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'center', minWidth: 65, backgroundColor: '#1a1a14' }}>
                Avail.
              </TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'center', minWidth: 70, backgroundColor: '#1a1a14' }}>
                Withdrew
              </TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'center', minWidth: 70, backgroundColor: '#1a1a14' }}>
                Not Sel.
              </TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: 'center', minWidth: 65, backgroundColor: '#1a1a14' }}>
                Unpaid
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => {
              const summary = getSummary(player.id);
              return (
                <TableRow
                  key={player.id}
                  hover
                  sx={{ '&:hover': { backgroundColor: 'rgba(201, 168, 76, 0.03)' } }}
                >
                  <TableCell
                    sx={{
                      position: 'sticky', left: 0, zIndex: 2,
                      backgroundColor: '#141414',
                      fontWeight: 600, fontSize: '0.8rem', color: '#C9A84C',
                    }}
                  >
                    {player.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      position: 'sticky', left: 55, zIndex: 2,
                      backgroundColor: '#141414',
                      fontWeight: 500, fontSize: '0.85rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {player.name}
                  </TableCell>
                  {GAMES.map(g => {
                    const key = `g${g}`;
                    const val = avail[player.id]?.[key] || '';
                    const colors = STATUS_COLORS[val];
                    return (
                      <TableCell key={g} sx={{ p: 0.5, textAlign: 'center' }}>
                        <Select
                          size="small"
                          value={val}
                          displayEmpty
                          onChange={(e: SelectChangeEvent) =>
                            handleChange(player.id, key, e.target.value as AvailStatus | '')
                          }
                          renderValue={(selected) => {
                            if (!selected) return <Typography variant="caption" sx={{ color: '#555' }}>--</Typography>;
                            return (
                              <Typography variant="caption" sx={{ fontWeight: 600, color: STATUS_COLORS[selected as AvailStatus].text }}>
                                {STATUS_SHORT[selected as AvailStatus]}
                              </Typography>
                            );
                          }}
                          sx={{
                            minWidth: 100,
                            height: 32,
                            fontSize: '0.75rem',
                            backgroundColor: colors.bg,
                            borderRadius: 1,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: val ? `${colors.text}30` : 'rgba(255,255,255,0.08)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: val ? `${colors.text}60` : 'rgba(201, 168, 76, 0.3)',
                            },
                            '& .MuiSelect-icon': { color: '#666', fontSize: '1rem' },
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                backgroundColor: '#1E1E1E',
                                border: '1px solid rgba(201, 168, 76, 0.15)',
                                borderRadius: 2,
                                mt: 0.5,
                              },
                            },
                          }}
                        >
                          <MenuItem value="" sx={{ fontSize: '0.8rem', color: '#777' }}>
                            -- Clear --
                          </MenuItem>
                          {STATUS_OPTIONS.map(opt => (
                            <MenuItem
                              key={opt}
                              value={opt}
                              sx={{
                                fontSize: '0.8rem',
                                py: 1,
                                color: STATUS_COLORS[opt].text,
                                '&:hover': { backgroundColor: STATUS_COLORS[opt].bg },
                                '&.Mui-selected': {
                                  backgroundColor: `${STATUS_COLORS[opt].bg} !important`,
                                  '&:hover': { backgroundColor: STATUS_COLORS[opt].bg },
                                },
                              }}
                            >
                              {opt}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                    );
                  })}
                  {/* Summary columns */}
                  <TableCell sx={{
                    textAlign: 'center', fontWeight: 700, fontSize: '0.85rem',
                    backgroundColor: '#1a1a14', borderLeft: '2px solid rgba(201, 168, 76, 0.2)',
                    color: summary.played > 0 ? '#81C784' : '#555',
                  }}>
                    {summary.played}
                  </TableCell>
                  <TableCell sx={{
                    textAlign: 'center', fontWeight: 700, fontSize: '0.85rem',
                    backgroundColor: '#1a1a14',
                    color: summary.available > 0 ? '#C9A84C' : '#555',
                  }}>
                    {summary.available}
                  </TableCell>
                  <TableCell sx={{
                    textAlign: 'center', fontWeight: 700, fontSize: '0.85rem',
                    backgroundColor: '#1a1a14',
                    color: summary.withdrew > 0 ? '#EF5350' : '#555',
                  }}>
                    {summary.withdrew}
                  </TableCell>
                  <TableCell sx={{
                    textAlign: 'center', fontWeight: 700, fontSize: '0.85rem',
                    backgroundColor: '#1a1a14',
                    color: summary.notSelected > 0 ? '#FFD54F' : '#555',
                  }}>
                    {summary.notSelected}
                  </TableCell>
                  <TableCell sx={{
                    textAlign: 'center', fontWeight: 700, fontSize: '0.85rem',
                    backgroundColor: '#1a1a14',
                    color: summary.unpaid > 0 ? '#FF8A65' : '#555',
                  }}>
                    {summary.unpaid}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
