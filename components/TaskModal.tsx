import { useState } from 'react';
import { Task } from '../types/Task';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onAddTask: (task: Task) => void;
}

export default function TaskModal({ isOpen, onClose, selectedDate, onAddTask }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState('#1976d2');
  const [urgency, setUrgency] = useState('medium');
  const [status, setStatus] = useState('pending');

  const safeSelectedDate = selectedDate ? new Date(selectedDate) : new Date();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      title,
      description,
      date: safeSelectedDate.toISOString(),
      startTime,
      endTime,
      completed: false,
      color,
      urgency,
      status,
    };

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error('Failed to add task');

      const savedTask = await response.json();
      onAddTask(savedTask); // Update the parent component with the new task
      onClose(); // Close the modal
      resetForm(); // Reset form fields
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setColor('#1976d2');
    setUrgency('medium');
    setStatus('pending');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Task for {safeSelectedDate.toLocaleDateString()}</DialogTitle>

        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Start Time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="End Time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <TextField
              label="Task Color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Urgency</InputLabel>
              <Select value={urgency} label="Urgency" onChange={(e) => setUrgency(e.target.value)}>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button type="submit" variant="contained" color="primary">Add Task</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
