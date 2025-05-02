import { Task } from '../types/Task';
import { Box, Typography, IconButton, Paper, Chip, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';

interface DayCellProps {
  date: Date | null;
  tasks: Task[];
  onDateClick: (date: Date) => void;
  onDeleteTask: (id: string) => void;
  isCurrentMonth: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in_progress':
      return 'warning';
    case 'pending':
    default:
      return 'default';
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

export default function DayCell({ date, tasks, onDateClick, onDeleteTask, isCurrentMonth }: DayCellProps) {
  if (!date) {
    return <Box sx={{ height: 120, bgcolor: 'grey.100', borderRadius: 1 }} />;
  }

  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <Paper
      sx={{
        height: 120,
        bgcolor: isToday ? 'primary.light' : 'white',
        border: `1px solid ${isToday ? 'primary.main' : 'grey.300'}`,
        borderRadius: 1,
        overflowY: 'auto',
        p: 1,
        opacity: isCurrentMonth ? 1 : 0.5,
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: 3,
          transform: 'scale(1.05)',
        },
      }}
      onClick={() => onDateClick(date)}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="h6" fontWeight="bold" sx={{ color: isToday ? 'primary.dark' : 'black' }}>
          {date.getDate()}
        </Typography>
      </Box>

      <Box mt={1}>
        {tasks.map((task) => (
          <Box
            key={task._id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              bgcolor: task.color || 'grey.100',
              p: 1,
              mb: 1,
              borderRadius: 1,
              gap: 1,
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ color: 'black' }}>
                {task.title}
              </Typography>

              <Typography variant="caption" sx={{ color: 'grey.700' }}>
                {task.startTime} – {task.endTime}
              </Typography>

              {task.description && (
                <Tooltip title={task.description}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'grey.600',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'block',
                      maxWidth: '100%',
                    }}
                  >
                    {task.description}
                  </Typography>
                </Tooltip>
              )}
            </Box>

            <Box display="flex" gap={0.5} flexWrap="wrap">
              <Chip
                size="small"
                label={task.status?.replace('_', ' ')}
                color={getStatusColor(task.status || '')}
                variant="outlined"
              />
              <Chip
                size="small"
                label={`Urgency: ${task.urgency}`}
                color={getUrgencyColor(task.urgency || '')}
                variant="filled"
              />
            </Box>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task._id);
              }}
              sx={{ position: 'absolute', top: 4, right: 4 }}
              size="small"
            >
              <Delete fontSize="small" color="error" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
