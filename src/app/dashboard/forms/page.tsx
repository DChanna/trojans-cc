'use client';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PollIcon from '@mui/icons-material/Poll';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface Form {
  id: string;
  title: string;
  description: string;
  status: 'Published' | 'Draft' | 'Closed';
  responses: number;
  createdDate: string;
}

const mockForms: Form[] = [
  {
    id: '1',
    title: 'Season Registration Form',
    description: 'Collect player details, availability, and team preferences for Summer 2026.',
    status: 'Published',
    responses: 28,
    createdDate: 'Feb 10, 2026',
  },
  {
    id: '2',
    title: 'Equipment Survey',
    description: 'Gather information on equipment needs — bats, pads, gloves, and helmets.',
    status: 'Draft',
    responses: 0,
    createdDate: 'Mar 5, 2026',
  },
  {
    id: '3',
    title: 'End of Season Feedback',
    description: 'Anonymous feedback form for players to share thoughts on the season.',
    status: 'Draft',
    responses: 0,
    createdDate: 'Mar 20, 2026',
  },
];

const statusChipConfig: Record<string, { color: 'success' | 'default' | 'error' }> = {
  Published: { color: 'success' },
  Draft: { color: 'default' },
  Closed: { color: 'error' },
};

export default function FormsPage() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <DescriptionIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Forms
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Create and manage forms to collect information from players
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create Form
        </Button>
      </Box>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { label: 'Total Forms', value: mockForms.length, color: '#C9A84C' },
          { label: 'Published', value: mockForms.filter((f) => f.status === 'Published').length, color: '#4CAF50' },
          { label: 'Drafts', value: mockForms.filter((f) => f.status === 'Draft').length, color: '#9E9E9E' },
          { label: 'Total Responses', value: mockForms.reduce((sum, f) => sum + f.responses, 0), color: '#29B6F6' },
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

      {/* Form Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {mockForms.map((form) => (
          <Card
            key={form.id}
            sx={{
              border: '1px solid',
              borderColor: form.status === 'Published' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(201, 168, 76, 0.08)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              '&:hover': {
                borderColor: 'rgba(201, 168, 76, 0.25)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {form.title}
                    </Typography>
                    <Chip
                      label={form.status}
                      size="small"
                      color={statusChipConfig[form.status].color}
                      variant="outlined"
                      sx={{ fontWeight: 600, fontSize: '0.72rem', height: 24 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 600 }}>
                    {form.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <PollIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {form.responses} {form.responses === 1 ? 'response' : 'responses'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        Created {form.createdDate}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                  <Tooltip title="View Responses">
                    <IconButton size="small" sx={{ color: 'primary.main' }}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Form">
                    <IconButton size="small" sx={{ color: 'text.secondary' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Form">
                    <IconButton size="small" sx={{ color: 'error.main' }}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Empty state hint */}
      <Divider sx={{ my: 4, borderColor: 'rgba(201, 168, 76, 0.08)' }} />
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          Create forms to collect information from players — registrations, surveys, feedback, and more.
        </Typography>
      </Box>
    </Box>
  );
}
