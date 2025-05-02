import { Task } from '../types/Task';
import { useState } from 'react';
import { Box, Typography, IconButton, Chip, Tooltip, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import EditTaskModal from './EditTaskModal';

interface TaskListViewProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'success';
    case 'in_progress': return 'warning';
    case 'pending': default: return 'default';
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'high': return 'error';
    case 'medium': return 'warning';
    case 'low': return 'success';
    default: return 'default';
  }
};

export default function TaskListView({ tasks, onDeleteTask, onEditTask }: TaskListViewProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedTask: Task) => {
    console.log('Updated Task:', updatedTask);
    onEditTask(updatedTask);
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <Box sx={{ maxHeight: '80vh', overflowY: 'auto', p: 2 }}>
      {tasks.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center">
          No tasks to display.
        </Typography>
      ) : (
        tasks.map(task => (
          <Paper
            key={task._id}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              bgcolor: task.color || 'background.default',
              position: 'relative',
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease',
              },
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight="medium" noWrap>
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.startTime} – {task.endTime}
              </Typography>
              {task.description && (
                <Tooltip title={task.description} arrow>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      mt: 0.5,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '100%',
                    }}
                  >
                    {task.description}
                  </Typography>
                </Tooltip>
              )}
            </Box>

            <Box display="flex" gap={1} mt={1} flexWrap="wrap">
              <Chip
                size="small"
                label={task.status?.replace('_', ' ') || 'No Status'}
                color={getStatusColor(task.status || '')}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
              <Chip
                size="small"
                label={`Urgency: ${task.urgency}`}
                color={getUrgencyColor(task.urgency || '')}
                variant="filled"
                sx={{ borderRadius: 2 }}
              />
            </Box>

            <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => handleEditClick(task)}
                sx={{ color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
                size="small"
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => onDeleteTask(task._id)}
                sx={{ color: 'error.main', '&:hover': { color: 'error.dark' } }}
                size="small"
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        ))
      )}

      {selectedTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={selectedTask}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}
