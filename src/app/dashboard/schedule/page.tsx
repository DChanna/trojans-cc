'use client';

import { useState, useMemo } from 'react';
import {
  Box, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Select, FormControl, InputLabel,
  Chip, IconButton, Card, CardContent, Grid, Stack, SelectChangeEvent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

type Result = 'Win' | 'Loss' | 'Draw' | 'Tied' | 'Abandoned' | 'No Result' | 'Pending';

interface Match {
  id: string;
  gameNumber: number;
  team: 'T1' | 'T2';
  date: string;
  day: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  format: string;
  ground: string;
  result: Result;
  score: string;
}

const FORMATS = ['T20', 'T25', 'T30', '35 Over', '40 Over', '50 Over'];
const RESULTS: Result[] = ['Win', 'Loss', 'Draw', 'Tied', 'Abandoned', 'No Result', 'Pending'];

const resultColor = (r: Result): string => {
  switch (r) {
    case 'Win': return '#4CAF50';
    case 'Loss': return '#E53935';
    case 'Draw': return '#29B6F6';
    case 'Tied': return '#FF9800';
    case 'Abandoned': return '#757575';
    case 'No Result': return '#757575';
    default: return '#555';
  }
};

const getDayFromDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
};

const createEmptyMatches = (): Match[] => {
  const matches: Match[] = [];
  for (let i = 1; i <= 10; i++) {
    matches.push({
      id: `t1-${i}`,
      gameNumber: i,
      team: 'T1',
      date: '',
      day: '',
      time: '',
      homeTeam: '',
      awayTeam: '',
      format: 'T20',
      ground: '',
      result: 'Pending',
      score: '',
    });
  }
  for (let i = 1; i <= 10; i++) {
    matches.push({
      id: `t2-${i}`,
      gameNumber: i,
      team: 'T2',
      date: '',
      day: '',
      time: '',
      homeTeam: '',
      awayTeam: '',
      format: 'T20',
      ground: '',
      result: 'Pending',
      score: '',
    });
  }
  return matches;
};

const emptyMatch: Omit<Match, 'id' | 'gameNumber' | 'team'> = {
  date: '', day: '', time: '', homeTeam: '', awayTeam: '',
  format: 'T20', ground: '', result: 'Pending', score: '',
};

export default function SchedulePage() {
  const [tab, setTab] = useState(0);
  const [matches, setMatches] = useState<Match[]>(createEmptyMatches);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    team: 'T1' as 'T1' | 'T2',
    date: '',
    time: '',
    homeTeam: '',
    awayTeam: '',
    format: 'T20',
    ground: '',
    result: 'Pending' as Result,
    score: '',
  });

  // Inline edit state
  const [inlineEditId, setInlineEditId] = useState<string | null>(null);
  const [inlineResult, setInlineResult] = useState<Result>('Pending');
  const [inlineScore, setInlineScore] = useState('');

  const filteredMatches = useMemo(() => {
    if (tab === 0) return matches;
    if (tab === 1) return matches.filter(m => m.team === 'T1');
    return matches.filter(m => m.team === 'T2');
  }, [matches, tab]);

  const getStats = (teamMatches: Match[]) => {
    const played = teamMatches.filter(m => m.result !== 'Pending' && m.result !== 'Abandoned' && m.result !== 'No Result');
    const won = teamMatches.filter(m => m.result === 'Win').length;
    const lost = teamMatches.filter(m => m.result === 'Loss').length;
    const drawn = teamMatches.filter(m => m.result === 'Draw' || m.result === 'Tied').length;
    const winRate = played.length > 0 ? ((won / played.length) * 100).toFixed(0) : '0';
    return { played: played.length, won, lost, drawn, winRate };
  };

  const currentStats = useMemo(() => {
    if (tab === 0) return getStats(matches);
    if (tab === 1) return getStats(matches.filter(m => m.team === 'T1'));
    return getStats(matches.filter(m => m.team === 'T2'));
  }, [matches, tab]);

  const openAddDialog = () => {
    setEditingId(null);
    setFormData({
      team: tab === 2 ? 'T2' : 'T1',
      date: '', time: '', homeTeam: '', awayTeam: '',
      format: 'T20', ground: '', result: 'Pending', score: '',
    });
    setDialogOpen(true);
  };

  const openEditDialog = (match: Match) => {
    setEditingId(match.id);
    setFormData({
      team: match.team,
      date: match.date,
      time: match.time,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      format: match.format,
      ground: match.ground,
      result: match.result,
      score: match.score,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setMatches(prev => prev.map(m => m.id === editingId ? {
        ...m,
        ...formData,
        day: getDayFromDate(formData.date),
      } : m));
    }
    setDialogOpen(false);
  };

  const startInlineEdit = (match: Match) => {
    setInlineEditId(match.id);
    setInlineResult(match.result);
    setInlineScore(match.score);
  };

  const saveInlineEdit = () => {
    if (!inlineEditId) return;
    setMatches(prev => prev.map(m => m.id === inlineEditId ? {
      ...m, result: inlineResult, score: inlineScore,
    } : m));
    setInlineEditId(null);
  };

  const statCards = [
    { label: 'Games Played', value: currentStats.played, icon: <SportsCricketIcon />, color: '#C9A84C' },
    { label: 'Won', value: currentStats.won, icon: <EmojiEventsIcon />, color: '#4CAF50' },
    { label: 'Lost', value: currentStats.lost, icon: <CloseIcon />, color: '#E53935' },
    { label: 'Drawn', value: currentStats.drawn, icon: <CalendarMonthIcon />, color: '#29B6F6' },
    { label: 'Win Rate', value: `${currentStats.winRate}%`, icon: <EmojiEventsIcon />, color: '#FF9800' },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Match Schedule
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Summer 2026 Season &middot; 20 Matches
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddDialog}
          disabled
          sx={{ visibility: 'hidden' }}
        >
          Add Match
        </Button>
      </Box>

      {/* Stats Banner */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statCards.map(s => (
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

      {/* Tabs */}
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
        <Tab label="All Matches" />
        <Tab label="Team 1 (Pacific)" />
        <Tab label="Team 2 (United)" />
      </Tabs>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          border: '1px solid rgba(201, 168, 76, 0.08)',
          maxHeight: '65vh',
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, minWidth: 50 }}>Game #</TableCell>
              {tab === 0 && <TableCell sx={{ fontWeight: 700, minWidth: 60 }}>Team</TableCell>}
              <TableCell sx={{ fontWeight: 700, minWidth: 100 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 50 }}>Day</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 70 }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 140 }}>Home Team</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 140 }}>Away Team</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 80 }}>Format</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 140 }}>Ground</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 110 }}>Result</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 160 }}>Score</TableCell>
              <TableCell sx={{ fontWeight: 700, minWidth: 80, textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMatches.map((match) => (
              <TableRow
                key={match.id}
                hover
                sx={{
                  '&:hover': { backgroundColor: 'rgba(201, 168, 76, 0.04)' },
                  opacity: match.date ? 1 : 0.5,
                }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{match.gameNumber}</Typography>
                </TableCell>
                {tab === 0 && (
                  <TableCell>
                    <Chip
                      label={match.team === 'T1' ? 'T1' : 'T2'}
                      size="small"
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        backgroundColor: match.team === 'T1' ? '#C9A84C20' : '#29B6F620',
                        color: match.team === 'T1' ? '#C9A84C' : '#29B6F6',
                        border: `1px solid ${match.team === 'T1' ? '#C9A84C40' : '#29B6F640'}`,
                      }}
                    />
                  </TableCell>
                )}
                <TableCell>{match.date || '—'}</TableCell>
                <TableCell>{match.day || '—'}</TableCell>
                <TableCell>{match.time || '—'}</TableCell>
                <TableCell>{match.homeTeam || '—'}</TableCell>
                <TableCell>{match.awayTeam || '—'}</TableCell>
                <TableCell>
                  <Chip label={match.format} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                </TableCell>
                <TableCell>{match.ground || '—'}</TableCell>
                <TableCell>
                  {inlineEditId === match.id ? (
                    <Select
                      size="small"
                      value={inlineResult}
                      onChange={(e: SelectChangeEvent) => setInlineResult(e.target.value as Result)}
                      sx={{ minWidth: 100, fontSize: '0.8rem' }}
                    >
                      {RESULTS.map(r => (
                        <MenuItem key={r} value={r} sx={{ fontSize: '0.85rem' }}>{r}</MenuItem>
                      ))}
                    </Select>
                  ) : (
                    match.result !== 'Pending' ? (
                      <Chip
                        label={match.result}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          backgroundColor: `${resultColor(match.result)}20`,
                          color: resultColor(match.result),
                          border: `1px solid ${resultColor(match.result)}40`,
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        Pending
                      </Typography>
                    )
                  )}
                </TableCell>
                <TableCell>
                  {inlineEditId === match.id ? (
                    <TextField
                      size="small"
                      value={inlineScore}
                      onChange={(e) => setInlineScore(e.target.value)}
                      placeholder="e.g. 165/8 vs 120"
                      sx={{ minWidth: 140, '& input': { fontSize: '0.8rem', py: 0.8 } }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {match.score || '—'}
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {inlineEditId === match.id ? (
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <IconButton size="small" onClick={saveInlineEdit} sx={{ color: '#4CAF50' }}>
                        <CheckIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => setInlineEditId(null)} sx={{ color: '#E53935' }}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  ) : (
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <IconButton
                        size="small"
                        onClick={() => startInlineEdit(match)}
                        sx={{ color: '#C9A84C', '&:hover': { backgroundColor: '#C9A84C15' } }}
                        title="Quick edit result & score"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => openEditDialog(match)}
                        sx={{ color: '#29B6F6', '&:hover': { backgroundColor: '#29B6F615' } }}
                        title="Edit all fields"
                      >
                        <CalendarMonthIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1A1A1A',
            border: '1px solid rgba(201, 168, 76, 0.15)',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, borderBottom: '1px solid rgba(201, 168, 76, 0.1)', pb: 2 }}>
          {editingId ? 'Edit Match' : 'Add Match'}
        </DialogTitle>
        <DialogContent sx={{ pt: '20px !important' }}>
          <Stack spacing={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Team</InputLabel>
              <Select
                value={formData.team}
                label="Team"
                onChange={(e) => setFormData(p => ({ ...p, team: e.target.value as 'T1' | 'T2' }))}
              >
                <MenuItem value="T1">Team 1 (Pacific)</MenuItem>
                <MenuItem value="T2">Team 2 (United)</MenuItem>
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth size="small" label="Date" type="date"
                value={formData.date}
                onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth size="small" label="Time" type="time"
                value={formData.time}
                onChange={(e) => setFormData(p => ({ ...p, time: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth size="small" label="Home Team"
                value={formData.homeTeam}
                onChange={(e) => setFormData(p => ({ ...p, homeTeam: e.target.value }))}
              />
              <TextField
                fullWidth size="small" label="Away Team"
                value={formData.awayTeam}
                onChange={(e) => setFormData(p => ({ ...p, awayTeam: e.target.value }))}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Format</InputLabel>
                <Select
                  value={formData.format}
                  label="Format"
                  onChange={(e) => setFormData(p => ({ ...p, format: e.target.value }))}
                >
                  {FORMATS.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                fullWidth size="small" label="Ground"
                value={formData.ground}
                onChange={(e) => setFormData(p => ({ ...p, ground: e.target.value }))}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Result</InputLabel>
                <Select
                  value={formData.result}
                  label="Result"
                  onChange={(e) => setFormData(p => ({ ...p, result: e.target.value as Result }))}
                >
                  {RESULTS.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                fullWidth size="small" label="Score"
                value={formData.score}
                onChange={(e) => setFormData(p => ({ ...p, score: e.target.value }))}
                placeholder="e.g. 165/8 vs 120/10"
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(201, 168, 76, 0.1)' }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: '#A0A0A0' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save Match</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
