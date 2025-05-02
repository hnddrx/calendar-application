import { Task } from '../types/Task';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onSave: (updatedTask: Task) => void;
}

export default function EditTaskModal({ isOpen, onClose, task, onSave }: EditTaskModalProps) {
  const [editedTask, setEditedTask] = useState<Task>(task);

  const handleChange = (field: keyof Task, value: any) => {
    console.log('Field:', field, 'Value:', value); // Debugging line
    setEditedTask(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(editedTask);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField
          label="Title"
          value={editedTask.title}
          onChange={e => handleChange('title', e.target.value)}
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={editedTask.description}
          onChange={e => handleChange('description', e.target.value)}
        />
        <TextField
          label="Start Time"
          type="time"
          value={editedTask.startTime}
          onChange={e => handleChange('startTime', e.target.value)}
        />
        <TextField
          label="End Time"
          type="time"
          value={editedTask.endTime}
          onChange={e => handleChange('endTime', e.target.value)}
        />
        <TextField
          label="Status"
          select
          value={editedTask.status}
          onChange={e => handleChange('status', e.target.value)}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
        <TextField
          label="Urgency"
          select
          value={editedTask.urgency}
          onChange={e => handleChange('urgency', e.target.value)}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
