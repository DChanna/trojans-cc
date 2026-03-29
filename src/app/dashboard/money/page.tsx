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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface Expense {
  id: string;
  description: string;
  amount: number;
  owedBy: string;
  status: string;
  datePaid: string;
  receipt: string;
  notes: string;
}

const STATUS_OPTIONS = ['Paid', 'Unpaid', 'Partial', 'TBD', 'N/A'];

const statusChipConfig: Record<string, { color: 'success' | 'error' | 'warning' | 'info' | 'default'; icon: React.ReactElement }> = {
  Paid: { color: 'success', icon: <CheckCircleIcon fontSize="small" /> },
  Unpaid: { color: 'error', icon: <CancelIcon fontSize="small" /> },
  Partial: { color: 'warning', icon: <PendingIcon fontSize="small" /> },
  TBD: { color: 'info', icon: <PendingIcon fontSize="small" /> },
  'N/A': { color: 'default', icon: <PendingIcon fontSize="small" /> },
};

const initialExpenses: Expense[] = [
  { id: '1', description: 'Cricket Stumps (Set of 2)', amount: 45, owedBy: 'Club', status: 'Paid', datePaid: '2026-03-01', receipt: '', notes: '' },
  { id: '2', description: 'Umpire Fee - Game 1', amount: 60, owedBy: 'Club', status: 'Paid', datePaid: '2026-03-10', receipt: '', notes: '' },
  { id: '3', description: 'Umpire Fee - Game 2', amount: 60, owedBy: 'Club', status: 'Paid', datePaid: '2026-03-17', receipt: '', notes: '' },
  { id: '4', description: 'BACA Registration - T1', amount: 200, owedBy: 'Club', status: 'Paid', datePaid: '2026-02-15', receipt: '', notes: '' },
  { id: '5', description: 'BACA Registration - T2', amount: 200, owedBy: 'Club', status: 'Paid', datePaid: '2026-02-15', receipt: '', notes: '' },
  { id: '6', description: 'Match Balls (Box of 6)', amount: 85, owedBy: 'Club', status: 'Unpaid', datePaid: '', receipt: '', notes: '' },
];

const emptyExpense: Omit<Expense, 'id'> = {
  description: '',
  amount: 0,
  owedBy: '',
  status: 'Unpaid',
  datePaid: '',
  receipt: '',
  notes: '',
};

export default function MoneyPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>(emptyExpense);

  const summary = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const paid = expenses.filter((e) => e.status === 'Paid').reduce((sum, e) => sum + e.amount, 0);
    const unpaid = expenses.filter((e) => e.status === 'Unpaid').reduce((sum, e) => sum + e.amount, 0);
    const partial = expenses.filter((e) => e.status === 'Partial').reduce((sum, e) => sum + e.amount, 0);
    return { total, paid, unpaid, partial };
  }, [expenses]);

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;
    setExpenses((prev) => [
      ...prev,
      { ...newExpense, id: Date.now().toString() },
    ]);
    setNewExpense(emptyExpense);
    setDialogOpen(false);
  };

  const handleStatusChange = (id: string, status: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <AttachMoneyIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Finances
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Track club expenses, dues, and payments
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Add Expense
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Expenses', value: summary.total, color: '#C9A84C', icon: <ReceiptIcon /> },
          { label: 'Paid', value: summary.paid, color: '#4CAF50', icon: <CheckCircleIcon /> },
          { label: 'Unpaid', value: summary.unpaid, color: '#E53935', icon: <CancelIcon /> },
          { label: 'Partial', value: summary.partial, color: '#FF9800', icon: <PendingIcon /> },
        ].map((item) => (
          <Grid item xs={6} md={3} key={item.label}>
            <Card>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Box sx={{ color: item.color, opacity: 0.7 }}>{item.icon}</Box>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: item.color }}>
                  ${item.value.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Expenses Table */}
      <TableContainer component={Paper} sx={{ border: '1px solid rgba(201, 168, 76, 0.08)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Owed By / Paid By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Paid</TableCell>
              <TableCell>Receipt</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell align="center" sx={{ width: 60 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow
                key={expense.id}
                sx={{
                  backgroundColor:
                    expense.status === 'Paid' ? 'rgba(76, 175, 80, 0.05)' : 'transparent',
                  '&:hover': {
                    backgroundColor:
                      expense.status === 'Paid'
                        ? 'rgba(76, 175, 80, 0.1)'
                        : 'rgba(255,255,255,0.03)',
                  },
                }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {expense.description}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                    ${expense.amount.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{expense.owedBy}</Typography>
                </TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <Select
                      value={expense.status}
                      onChange={(e: SelectChangeEvent) => handleStatusChange(expense.id, e.target.value)}
                      variant="standard"
                      disableUnderline
                      renderValue={(value) => {
                        const config = statusChipConfig[value] || statusChipConfig['N/A'];
                        return (
                          <Chip
                            label={value}
                            size="small"
                            color={config.color}
                            icon={config.icon}
                            variant="outlined"
                            sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                          />
                        );
                      }}
                      sx={{ '& .MuiSelect-select': { py: 0 } }}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {expense.datePaid || '--'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {expense.receipt || '--'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {expense.notes || '--'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => handleDelete(expense.id)} sx={{ color: 'error.main' }}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {expenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No expenses recorded yet.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Expense Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Add Expense</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '16px !important' }}>
          <TextField
            label="Description"
            fullWidth
            value={newExpense.description}
            onChange={(e) => setNewExpense((p) => ({ ...p, description: e.target.value }))}
          />
          <TextField
            label="Amount ($)"
            type="number"
            fullWidth
            value={newExpense.amount || ''}
            onChange={(e) => setNewExpense((p) => ({ ...p, amount: parseFloat(e.target.value) || 0 }))}
          />
          <TextField
            label="Owed By / Paid By"
            fullWidth
            value={newExpense.owedBy}
            onChange={(e) => setNewExpense((p) => ({ ...p, owedBy: e.target.value }))}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={newExpense.status}
              onChange={(e: SelectChangeEvent) => setNewExpense((p) => ({ ...p, status: e.target.value }))}
            >
              {STATUS_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date Paid"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newExpense.datePaid}
            onChange={(e) => setNewExpense((p) => ({ ...p, datePaid: e.target.value }))}
          />
          <TextField
            label="Receipt Reference"
            fullWidth
            value={newExpense.receipt}
            onChange={(e) => setNewExpense((p) => ({ ...p, receipt: e.target.value }))}
          />
          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={2}
            value={newExpense.notes}
            onChange={(e) => setNewExpense((p) => ({ ...p, notes: e.target.value }))}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddExpense} disabled={!newExpense.description || !newExpense.amount}>
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
