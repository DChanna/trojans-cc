'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box, Container, Typography, Card, CardContent, Button, Stack,
  Avatar, Chip, Alert, CircularProgress, TextField, Snackbar,
  Radio, RadioGroup, FormControlLabel, FormControl,
} from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockIcon from '@mui/icons-material/Lock';
import { useParams } from 'next/navigation';

interface Player {
  id: string;
  playerId: string;
  fullName: string;
}

interface PollResponse {
  id: string;
  playerId: string;
  status: string;
  note: string | null;
  player: Player;
}

interface Poll {
  id: string;
  token: string;
  title: string;
  description: string | null;
  matchLabel: string | null;
  deadline: string | null;
  isOpen: boolean;
  team: {
    name: string;
    shortName: string;
    players: { player: Player }[];
  };
  responses: PollResponse[];
}

const STATUS_CONFIG = {
  available: { label: 'Available', color: '#66BB6A', icon: <CheckCircleIcon /> },
  not_available: { label: 'Not Available', color: '#EF5350', icon: <CancelIcon /> },
  maybe: { label: 'Maybe', color: '#FFA726', icon: <HelpIcon /> },
};

export default function PollPage() {
  const params = useParams();
  const token = params.token as string;

  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [snackbar, setSnackbar] = useState('');

  const fetchPoll = useCallback(async () => {
    try {
      const res = await fetch(`/api/polls/${token}`);
      if (!res.ok) throw new Error('Poll not found');
      const data = await res.json();
      setPoll(data);
    } catch {
      setError('This poll could not be found or has been removed.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchPoll(); }, [fetchPoll]);

  const handleSubmit = async () => {
    if (!selectedPlayer || !selectedStatus) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/polls/${token}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: selectedPlayer,
          status: selectedStatus,
          note: note || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }
      setSubmitted(true);
      setSnackbar('Response submitted!');
      fetchPoll(); // refresh responses
    } catch (err: any) {
      setSnackbar(err.message || 'Failed to submit response');
    } finally {
      setSubmitting(false);
    }
  };

  const isExpired = poll?.deadline ? new Date() > new Date(poll.deadline) : false;
  const isClosed = poll ? !poll.isOpen || isExpired : false;

  const getPlayerResponse = (playerId: string) =>
    poll?.responses.find((r) => r.playerId === playerId);

  const responseCounts = poll
    ? {
        available: poll.responses.filter((r) => r.status === 'available').length,
        not_available: poll.responses.filter((r) => r.status === 'not_available').length,
        maybe: poll.responses.filter((r) => r.status === 'maybe').length,
        pending: (poll.team.players.length) - poll.responses.length,
      }
    : { available: 0, not_available: 0, maybe: 0, pending: 0 };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0A' }}>
        <CircularProgress sx={{ color: '#C9A84C' }} />
      </Box>
    );
  }

  if (error || !poll) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0A0A0A' }}>
        <Card sx={{ maxWidth: 400, textAlign: 'center' }}>
          <CardContent sx={{ p: 4 }}>
            <CancelIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>Poll Not Found</Typography>
            <Typography color="text.secondary">{error}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#0A0A0A', py: 4 }}>
      <Container maxWidth="sm">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <SportsCricketIcon sx={{ color: '#C9A84C', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, background: 'linear-gradient(135deg, #C9A84C, #DFC06E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.05em' }}>
              TROJAN CRICKET
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{poll.title}</Typography>
          {poll.matchLabel && (
            <Chip label={poll.matchLabel} sx={{ backgroundColor: 'rgba(201, 168, 76, 0.15)', color: '#C9A84C', fontWeight: 600, mb: 1 }} />
          )}
          {poll.description && (
            <Typography color="text.secondary" sx={{ mt: 1 }}>{poll.description}</Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
            <Chip label={poll.team.name} size="small" sx={{ backgroundColor: 'rgba(201, 168, 76, 0.1)', color: '#C9A84C' }} />
            {poll.deadline && (
              <Chip
                icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                label={`Due: ${new Date(poll.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`}
                size="small"
                sx={{ backgroundColor: isExpired ? 'rgba(239, 83, 80, 0.15)' : 'rgba(255, 167, 38, 0.15)', color: isExpired ? '#EF5350' : '#FFA726' }}
              />
            )}
          </Box>
        </Box>

        {/* Response Summary */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#66BB6A', fontWeight: 700 }}>{responseCounts.available}</Typography>
                <Typography variant="caption" color="text.secondary">Available</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#EF5350', fontWeight: 700 }}>{responseCounts.not_available}</Typography>
                <Typography variant="caption" color="text.secondary">Unavailable</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#FFA726', fontWeight: 700 }}>{responseCounts.maybe}</Typography>
                <Typography variant="caption" color="text.secondary">Maybe</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ color: '#A0A0A0', fontWeight: 700 }}>{responseCounts.pending}</Typography>
                <Typography variant="caption" color="text.secondary">Pending</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Closed/Expired Notice */}
        {isClosed && (
          <Alert severity="warning" icon={<LockIcon />} sx={{ mb: 3, backgroundColor: 'rgba(255, 167, 38, 0.1)', color: '#FFA726', '& .MuiAlert-icon': { color: '#FFA726' } }}>
            This poll is {isExpired ? 'expired' : 'closed'}. Responses are no longer accepted.
          </Alert>
        )}

        {/* Response Form */}
        {!isClosed && !submitted && (
          <Card sx={{ mb: 3, border: '1px solid rgba(201, 168, 76, 0.15)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Your Response</Typography>

              {/* Player Selection */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Select your name</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {poll.team.players.map(({ player }) => {
                  const isSelected = selectedPlayer === player.id;
                  const existing = getPlayerResponse(player.id);
                  return (
                    <Chip
                      key={player.id}
                      label={player.fullName}
                      onClick={() => {
                        setSelectedPlayer(player.id);
                        if (existing) {
                          setSelectedStatus(existing.status);
                          setNote(existing.note || '');
                        } else {
                          setSelectedStatus('');
                          setNote('');
                        }
                      }}
                      avatar={
                        existing ? (
                          <Avatar sx={{ width: 24, height: 24, backgroundColor: STATUS_CONFIG[existing.status as keyof typeof STATUS_CONFIG]?.color || '#A0A0A0' }}>
                            <CheckCircleIcon sx={{ fontSize: 14, color: '#fff' }} />
                          </Avatar>
                        ) : undefined
                      }
                      sx={{
                        backgroundColor: isSelected ? 'rgba(201, 168, 76, 0.2)' : existing ? 'rgba(255,255,255,0.05)' : 'transparent',
                        border: isSelected ? '2px solid #C9A84C' : '1px solid rgba(255,255,255,0.1)',
                        color: isSelected ? '#C9A84C' : 'text.primary',
                        fontWeight: isSelected ? 600 : 400,
                        '&:hover': { backgroundColor: 'rgba(201, 168, 76, 0.1)' },
                        cursor: 'pointer',
                      }}
                    />
                  );
                })}
              </Box>

              {/* Status Selection */}
              {selectedPlayer && (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Are you available?</Typography>
                  <FormControl sx={{ mb: 3, width: '100%' }}>
                    <RadioGroup value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                      {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                        <FormControlLabel
                          key={key}
                          value={key}
                          control={<Radio sx={{ color: config.color, '&.Mui-checked': { color: config.color } }} />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ color: config.color }}>{config.icon}</Box>
                              <Typography sx={{ color: selectedStatus === key ? config.color : 'text.primary' }}>{config.label}</Typography>
                            </Box>
                          }
                          sx={{
                            mb: 0.5,
                            mx: 0,
                            py: 1,
                            px: 2,
                            borderRadius: 2,
                            border: selectedStatus === key ? `1px solid ${config.color}40` : '1px solid transparent',
                            backgroundColor: selectedStatus === key ? `${config.color}10` : 'transparent',
                            '&:hover': { backgroundColor: `${config.color}08` },
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Note (optional)"
                    placeholder="e.g. Can only play if game starts after 2pm"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 3 }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSubmit}
                    disabled={!selectedStatus || submitting}
                    sx={{ py: 1.5 }}
                  >
                    {submitting ? <CircularProgress size={24} sx={{ color: '#0A0A0A' }} /> : getPlayerResponse(selectedPlayer) ? 'Update Response' : 'Submit Response'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Success Message */}
        {submitted && (
          <Card sx={{ mb: 3, border: '1px solid rgba(102, 187, 106, 0.3)' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: '#66BB6A', mb: 1 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Response Submitted!</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>Your availability has been recorded.</Typography>
              <Button variant="outlined" onClick={() => setSubmitted(false)} sx={{ borderColor: 'rgba(201, 168, 76, 0.3)', color: 'text.primary' }}>
                Change Response
              </Button>
            </CardContent>
          </Card>
        )}

        {/* All Responses */}
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>All Responses</Typography>
            {poll.team.players.map(({ player }) => {
              const response = getPlayerResponse(player.id);
              const statusKey = response?.status as keyof typeof STATUS_CONFIG | undefined;
              const config = statusKey ? STATUS_CONFIG[statusKey] : null;
              return (
                <Box
                  key={player.id}
                  sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    py: 1.5, px: 1,
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', backgroundColor: config ? `${config.color}20` : 'rgba(255,255,255,0.05)', color: config?.color || '#A0A0A0' }}>
                      {player.fullName.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{player.fullName}</Typography>
                      {response?.note && (
                        <Typography variant="caption" color="text.secondary">{response.note}</Typography>
                      )}
                    </Box>
                  </Box>
                  {config ? (
                    <Chip
                      label={config.label}
                      size="small"
                      icon={config.icon}
                      sx={{
                        backgroundColor: `${config.color}15`,
                        color: config.color,
                        fontWeight: 600,
                        '& .MuiChip-icon': { color: config.color },
                      }}
                    />
                  ) : (
                    <Chip label="Pending" size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#A0A0A0' }} />
                  )}
                </Box>
              );
            })}
          </CardContent>
        </Card>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="caption" color="text.secondary">
            Powered by Trojan Cricket Club
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar('')}
        message={snackbar}
      />
    </Box>
  );
}
