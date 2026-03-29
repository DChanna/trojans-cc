'use client';
import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface SignUp {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  experience: string;
}

const initialSignUps: SignUp[] = [
  {
    id: '1',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@email.com',
    phone: '(408) 555-1234',
    status: 'Pending',
    appliedDate: 'Mar 15, 2026',
    experience: '5 years club cricket',
  },
  {
    id: '2',
    name: 'Vikram Singh',
    email: 'vikram.s@email.com',
    phone: '(650) 555-5678',
    status: 'Approved',
    appliedDate: 'Mar 10, 2026',
    experience: '3 years recreational',
  },
  {
    id: '3',
    name: 'Rohan Patel',
    email: 'rohan.patel@email.com',
    phone: '(510) 555-9012',
    status: 'Pending',
    appliedDate: 'Mar 20, 2026',
    experience: '7 years competitive',
  },
];

const SIGN_UP_URL = 'https://trojans-cc.vercel.app/sign-up';

const statusConfig: Record<string, { color: 'warning' | 'success' | 'error'; icon: React.ReactElement }> = {
  Pending: { color: 'warning', icon: <HourglassEmptyIcon fontSize="small" /> },
  Approved: { color: 'success', icon: <CheckCircleOutlineIcon fontSize="small" /> },
  Rejected: { color: 'error', icon: <CancelOutlinedIcon fontSize="small" /> },
};

export default function SignUpsPage() {
  const [signUps, setSignUps] = useState<SignUp[]>(initialSignUps);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(SIGN_UP_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApprove = (id: string) => {
    setSignUps((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'Approved' as const } : s)));
  };

  const handleReject = (id: string) => {
    setSignUps((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'Rejected' as const } : s)));
  };

  const pendingCount = signUps.filter((s) => s.status === 'Pending').length;
  const approvedCount = signUps.filter((s) => s.status === 'Approved').length;
  const rejectedCount = signUps.filter((s) => s.status === 'Rejected').length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <PersonAddIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Sign-ups
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Manage new player registration requests
          </Typography>
        </Box>
      </Box>

      {/* Share Link */}
      <Card sx={{ mb: 3, border: '1px solid rgba(201, 168, 76, 0.15)', background: 'rgba(201, 168, 76, 0.03)' }}>
        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <LinkIcon sx={{ color: '#C9A84C' }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#C9A84C' }}>
                  Sign-up Form Link
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Share this link with prospective players to collect registrations
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: 1,
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  color: 'text.secondary',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {SIGN_UP_URL}
              </Typography>
              <Tooltip title={copied ? 'Copied!' : 'Copy link'}>
                <IconButton size="small" onClick={handleCopyLink} sx={{ color: copied ? 'success.main' : 'primary.main' }}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Open form">
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { label: 'Total Applications', value: signUps.length, color: '#C9A84C' },
          { label: 'Pending Review', value: pendingCount, color: '#FFB74D' },
          { label: 'Approved', value: approvedCount, color: '#4CAF50' },
          { label: 'Rejected', value: rejectedCount, color: '#E53935' },
        ].map((stat) => (
          <Grid item xs={6} sm={3} key={stat.label}>
            <Card sx={{ border: '1px solid rgba(201, 168, 76, 0.08)' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pendingCount > 0 && (
        <Alert
          severity="info"
          sx={{
            mb: 3,
            backgroundColor: 'rgba(201, 168, 76, 0.06)',
            border: '1px solid rgba(201, 168, 76, 0.15)',
            color: 'text.primary',
            '& .MuiAlert-icon': { color: '#C9A84C' },
          }}
        >
          {pendingCount} {pendingCount === 1 ? 'application requires' : 'applications require'} review
        </Alert>
      )}

      {/* Sign-ups Table */}
      <TableContainer component={Paper} sx={{ border: '1px solid rgba(201, 168, 76, 0.08)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Applied</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {signUps.map((signUp) => (
              <TableRow
                key={signUp.id}
                sx={{
                  backgroundColor:
                    signUp.status === 'Approved'
                      ? 'rgba(76, 175, 80, 0.04)'
                      : signUp.status === 'Rejected'
                        ? 'rgba(229, 57, 53, 0.04)'
                        : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.03)' },
                }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {signUp.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {signUp.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {signUp.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {signUp.experience}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {signUp.appliedDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={signUp.status}
                    size="small"
                    color={statusConfig[signUp.status].color}
                    icon={statusConfig[signUp.status].icon}
                    variant="outlined"
                    sx={{ fontWeight: 600, fontSize: '0.72rem' }}
                  />
                </TableCell>
                <TableCell align="center">
                  {signUp.status === 'Pending' ? (
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        onClick={() => handleApprove(signUp.id)}
                        sx={{ fontSize: '0.72rem', minWidth: 'auto', px: 1.5, textTransform: 'none' }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleReject(signUp.id)}
                        sx={{ fontSize: '0.72rem', minWidth: 'auto', px: 1.5, textTransform: 'none' }}
                      >
                        Reject
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      --
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {signUps.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <PersonAddIcon sx={{ fontSize: 40, color: 'text.secondary', opacity: 0.3, mb: 1 }} />
                  <Typography color="text.secondary">
                    No sign-up requests yet. Share the sign-up link to start collecting registrations.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
