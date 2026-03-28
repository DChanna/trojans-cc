'use client';
import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

const ALL_PLAYERS = [
  { id: 'P01', name: 'Dhruv Channa' },
  { id: 'P02', name: 'Karan Sidhu' },
  { id: 'P03', name: 'Vasu Gupta' },
  { id: 'P04', name: 'Ratik Sachdeva' },
  { id: 'P05', name: 'Tej Sidhu' },
  { id: 'P06', name: 'Akshit Mehta' },
  { id: 'P07', name: 'Rohit Bhamidipati' },
  { id: 'P08', name: 'Abhinandhan Narayanan' },
  { id: 'P09', name: 'Sachin Paka' },
  { id: 'P10', name: 'Sriram Subramanian' },
  { id: 'P11', name: 'Surendra TS' },
  { id: 'P12', name: 'Ajay MS' },
  { id: 'P13', name: 'Krithin Arukala' },
  { id: 'P14', name: 'Parth Gupta' },
  { id: 'P15', name: 'Manideep Nandina' },
  { id: 'P16', name: 'Ashrit Kasu' },
  { id: 'P17', name: 'Raman Kumar' },
  { id: 'P18', name: 'Pranav Dadi' },
  { id: 'P19', name: 'Chirag Gupta' },
  { id: 'P20', name: 'Harsh Patel' },
  { id: 'P21', name: 'Rahul Cariappa' },
  { id: 'P22', name: 'Rohan Gulhar' },
  { id: 'P23', name: 'Nikhil Gangrade' },
  { id: 'P24', name: 'Mufaddal Daginawala' },
  { id: 'P25', name: 'Sameer Thorat' },
  { id: 'P26', name: 'Sai Saran' },
  { id: 'P27', name: 'Kavish Purohit' },
  { id: 'P28', name: 'Romil Karia' },
  { id: 'P29', name: 'Prem Dhoot' },
  { id: 'P30', name: 'Rishab Jay' },
  { id: 'P31', name: 'Vivek Krishnagiri' },
  { id: 'P32', name: 'Sidhant Kabra' },
];

const T1_GAMES = Array.from({ length: 10 }, (_, i) => `T1-G${i + 1}`);
const T2_GAMES = Array.from({ length: 10 }, (_, i) => `T2-G${i + 1}`);
const ALL_GAMES = [...T1_GAMES, ...T2_GAMES];

type Filter = 'all' | 't1' | 't2';

export default function GameNotesPage() {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<Filter>('all');

  const visibleGames = useMemo(() => {
    if (filter === 't1') return T1_GAMES;
    if (filter === 't2') return T2_GAMES;
    return ALL_GAMES;
  }, [filter]);

  const handleNoteChange = (playerId: string, game: string, value: string) => {
    setNotes((prev) => ({ ...prev, [`${playerId}-${game}`]: value }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <StickyNote2Icon sx={{ color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Game Notes
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Selection rationale, performance notes, and injury updates per game
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, val) => val && setFilter(val)}
          size="small"
        >
          <ToggleButton value="all" sx={{ px: 2 }}>All Games</ToggleButton>
          <ToggleButton value="t1" sx={{ px: 2 }}>T1 (Pacific)</ToggleButton>
          <ToggleButton value="t2" sx={{ px: 2 }}>T2 (United)</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Chip
          size="small"
          label="T1 = Green header"
          sx={{ backgroundColor: 'rgba(76, 175, 80, 0.15)', color: '#66BB6A' }}
        />
        <Chip
          size="small"
          label="T2 = Blue header"
          sx={{ backgroundColor: 'rgba(41, 182, 246, 0.15)', color: '#29B6F6' }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 'calc(100vh - 250px)',
          border: '1px solid rgba(201, 168, 76, 0.08)',
        }}
      >
        <Table stickyHeader size="small" sx={{ minWidth: visibleGames.length * 140 + 220 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  position: 'sticky',
                  left: 0,
                  zIndex: 3,
                  backgroundColor: '#1a1a1a',
                  minWidth: 200,
                  fontWeight: 700,
                  borderRight: '2px solid rgba(201, 168, 76, 0.15)',
                }}
              >
                Player
              </TableCell>
              {visibleGames.map((game) => {
                const isT1 = game.startsWith('T1');
                return (
                  <TableCell
                    key={game}
                    align="center"
                    sx={{
                      minWidth: 130,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      backgroundColor: isT1
                        ? 'rgba(76, 175, 80, 0.08)'
                        : 'rgba(41, 182, 246, 0.08)',
                      color: isT1 ? '#66BB6A' : '#29B6F6',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {game}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {ALL_PLAYERS.map((player) => (
              <TableRow key={player.id} hover>
                <TableCell
                  sx={{
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                    backgroundColor: '#141414',
                    borderRight: '2px solid rgba(201, 168, 76, 0.15)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, minWidth: 28 }}>
                      {player.id}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {player.name}
                    </Typography>
                  </Box>
                </TableCell>
                {visibleGames.map((game) => (
                  <TableCell key={game} sx={{ p: 0.5 }}>
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="..."
                      multiline
                      maxRows={3}
                      value={notes[`${player.id}-${game}`] || ''}
                      onChange={(e) => handleNoteChange(player.id, game, e.target.value)}
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          fontSize: '0.75rem',
                          backgroundColor: 'rgba(255,255,255,0.02)',
                          '& fieldset': { borderColor: 'rgba(201, 168, 76, 0.08)' },
                          '&:hover fieldset': { borderColor: 'rgba(201, 168, 76, 0.2)' },
                          '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        },
                        '& .MuiInputBase-input': {
                          p: '6px 8px',
                        },
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
