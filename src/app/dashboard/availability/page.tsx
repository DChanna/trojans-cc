'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Select, MenuItem, Card, CardContent, Grid,
  Chip, SelectChangeEvent, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Stack, IconButton, Tooltip, Snackbar, Alert as MuiAlert,
  Avatar, LinearProgress,
} from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PollIcon from '@mui/icons-material/Poll';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';
import PendingIcon from '@mui/icons-material/Pending';

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

// ── Poll Types ────────────────────────────────────────────────────────────────
interface PollData {
  id: string;
  token: string;
  title: string;
  description: string | null;
  matchLabel: string | null;
  deadline: string | null;
  isOpen: boolean;
  createdAt: string;
  team: { name: string; shortName: string };
  responses: { id: string; status: string; player: { fullName: string } }[];
  _count: { responses: number };
}

const TEAM_IDS: Record<string, string> = {
  T1: 'team-1',
  T2: 'team-2',
};

// ── Component ──────────────────────────────────────────────────────────────────
export default function AvailabilityPage() {
  const [tab, setTab] = useState(0);
  const [t1Avail, setT1Avail] = useState<TeamAvailability>(() => initAvailability(TEAM1_PLAYERS));
  const [t2Avail, setT2Avail] = useState<TeamAvailability>(() => initAvailability(TEAM2_PLAYERS));

  // Poll state
  const [polls, setPolls] = useState<PollData[]>([]);
  const [pollsLoading, setPollsLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newPoll, setNewPoll] = useState({ title: '', description: '', matchLabel: '', teamShortName: 'T1', deadline: '' });
  const [creating, setCreating] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>({ open: false, message: '', severity: 'info' });

  const fetchPolls = useCallback(async () => {
    try {
      const res = await fetch('/api/polls');
      if (res.ok) {
        const data = await res.json();
        setPolls(data);
      }
    } catch { /* ignore */ } finally {
      setPollsLoading(false);
    }
  }, []);

  useEffect(() => { fetchPolls(); }, [fetchPolls]);

  const handleCreatePoll = async () => {
    if (!newPoll.title.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPoll.title,
          description: newPoll.description || null,
          matchLabel: newPoll.matchLabel || null,
          teamId: TEAM_IDS[newPoll.teamShortName] || 'team-1',
          deadline: newPoll.deadline || null,
        }),
      });
      if (res.ok) {
        setCreateDialogOpen(false);
        setNewPoll({ title: '', description: '', matchLabel: '', teamShortName: 'T1', deadline: '' });
        fetchPolls();
        setSnackbar({ open: true, message: 'Poll created! Share the link with your team.', severity: 'success' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Failed to create poll', severity: 'error' });
    } finally {
      setCreating(false);
    }
  };

  const togglePollStatus = async (poll: PollData) => {
    try {
      await fetch(`/api/polls/${poll.token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isOpen: !poll.isOpen }),
      });
      fetchPolls();
      setSnackbar({ open: true, message: `Poll ${poll.isOpen ? 'closed' : 'reopened'}.`, severity: 'info' });
    } catch { /* ignore */ }
  };

  const getPollUrl = (token: string) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/poll/${token}`;
    }
    return `/poll/${token}`;
  };

  const getWhatsAppLink = (poll: PollData) => {
    const url = getPollUrl(poll.token);
    const message = `${poll.title}${poll.matchLabel ? `\n${poll.matchLabel}` : ''}\n\nPlease respond to the availability poll:\n${url}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: 'Link copied to clipboard!', severity: 'info' });
  };

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

      {/* ── Polls Section ──────────────────────────────────────────────────── */}
      <Card sx={{ mb: 4, border: '1px solid rgba(201, 168, 76, 0.12)' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PollIcon sx={{ color: '#C9A84C' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Availability Polls</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setCreateDialogOpen(true)}
              size="small"
            >
              Create Poll
            </Button>
          </Box>

          {pollsLoading ? (
            <LinearProgress sx={{ borderRadius: 1, backgroundColor: 'rgba(201, 168, 76, 0.1)', '& .MuiLinearProgress-bar': { backgroundColor: '#C9A84C' } }} />
          ) : polls.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <PollIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1, opacity: 0.3 }} />
              <Typography color="text.secondary">No polls yet. Create one and share it via WhatsApp!</Typography>
            </Box>
          ) : (
            <Stack spacing={1.5}>
              {polls.map((poll) => {
                const totalPlayers = poll.responses ? poll.responses.length : (poll._count?.responses || 0);
                const available = poll.responses?.filter(r => r.status === 'available').length || 0;
                const notAvail = poll.responses?.filter(r => r.status === 'not_available').length || 0;
                const maybe = poll.responses?.filter(r => r.status === 'maybe').length || 0;

                return (
                  <Box
                    key={poll.id}
                    sx={{
                      p: 2, borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.06)',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      '&:hover': { borderColor: 'rgba(201, 168, 76, 0.15)' },
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{poll.title}</Typography>
                          <Chip
                            label={poll.isOpen ? 'Open' : 'Closed'}
                            size="small"
                            sx={{
                              height: 20, fontSize: '0.7rem', fontWeight: 600,
                              backgroundColor: poll.isOpen ? 'rgba(102, 187, 106, 0.15)' : 'rgba(239, 83, 80, 0.15)',
                              color: poll.isOpen ? '#66BB6A' : '#EF5350',
                            }}
                          />
                          <Chip label={poll.team.shortName} size="small" sx={{ height: 20, fontSize: '0.7rem', backgroundColor: 'rgba(201, 168, 76, 0.1)', color: '#C9A84C' }} />
                        </Box>
                        {poll.matchLabel && <Typography variant="caption" color="text.secondary">{poll.matchLabel}</Typography>}
                      </Box>
                      <Stack direction="row" spacing={0.5}>
                        <Tooltip title="Share on WhatsApp">
                          <IconButton size="small" href={getWhatsAppLink(poll)} target="_blank" sx={{ color: '#25D366', '&:hover': { backgroundColor: 'rgba(37, 211, 102, 0.1)' } }}>
                            <WhatsAppIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Copy link">
                          <IconButton size="small" onClick={() => copyToClipboard(getPollUrl(poll.token))} sx={{ color: 'text.secondary', '&:hover': { color: '#C9A84C' } }}>
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={poll.isOpen ? 'Close poll' : 'Reopen poll'}>
                          <IconButton size="small" onClick={() => togglePollStatus(poll)} sx={{ color: 'text.secondary', '&:hover': { color: poll.isOpen ? '#EF5350' : '#66BB6A' } }}>
                            {poll.isOpen ? <LockIcon fontSize="small" /> : <LockOpenIcon fontSize="small" />}
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Box>

                    {/* Response badges */}
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CheckCircleIcon sx={{ fontSize: 16, color: '#66BB6A' }} />
                        <Typography variant="caption" sx={{ color: '#66BB6A', fontWeight: 600 }}>{available}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CancelIcon sx={{ fontSize: 16, color: '#EF5350' }} />
                        <Typography variant="caption" sx={{ color: '#EF5350', fontWeight: 600 }}>{notAvail}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <HelpIcon sx={{ fontSize: 16, color: '#FFA726' }} />
                        <Typography variant="caption" sx={{ color: '#FFA726', fontWeight: 600 }}>{maybe}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">{totalPlayers} responses</Typography>
                      </Box>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* ── Create Poll Dialog ──────────────────────────────────────────────── */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { backgroundColor: '#1a1a1a', border: '1px solid rgba(201, 168, 76, 0.15)' } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Create Availability Poll</DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Poll Title"
              placeholder="e.g. Game 5 Availability"
              value={newPoll.title}
              onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Match Info"
              placeholder="e.g. Game 5 vs Bay XI - Apr 12, 10am @ Baylands Park"
              value={newPoll.matchLabel}
              onChange={(e) => setNewPoll({ ...newPoll, matchLabel: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description (optional)"
              placeholder="Any additional details..."
              value={newPoll.description}
              onChange={(e) => setNewPoll({ ...newPoll, description: e.target.value })}
              multiline
              rows={2}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                select
                label="Team"
                value={newPoll.teamShortName}
                onChange={(e) => setNewPoll({ ...newPoll, teamShortName: e.target.value })}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="T1">Trojans Pacific (T1)</MenuItem>
                <MenuItem value="T2">Trojans United (T2)</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Deadline (optional)"
                type="datetime-local"
                value={newPoll.deadline}
                onChange={(e) => setNewPoll({ ...newPoll, deadline: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setCreateDialogOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePoll}
            disabled={!newPoll.title.trim() || creating}
            startIcon={<WhatsAppIcon />}
          >
            {creating ? 'Creating...' : 'Create & Share'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

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
