import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Calendar from '../components/Calendar';
import TaskModal from '../components/TaskModal';
import EditTaskModal from '../components/EditTaskModal';  // Import the EditTaskModal
import { Task } from '../types/Task';
import { Box, CircularProgress, Typography, Alert, Container, Fade, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import Navbar from '../components/Nabar';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);  // State for edit modal
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);  // Store the task to edit
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddTask = async (task: Task) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error('Failed to add task');

      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
      setIsModalOpen(false);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleEditTask = async (task: Task) => {
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error('Failed to update task');

      const updatedTask = await res.json();
      setTasks(prev => prev.map(t => (t._id === updatedTask._id ? updatedTask : t)));
      setIsEditModalOpen(false);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <Head>
        <title>Calendar Task Manager</title>
        <meta name="description" content="Manage your tasks with a calendar view" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Render Navbar */}
      <Navbar />

      <Box className="min-h-screen" bgcolor="background.default" py={6}>
        <Container maxWidth="lg">
          {/* Loading and error handling */}
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Fade in>
              <Alert severity="error" sx={{ my: 2 }}>
                {error}
              </Alert>
            </Fade>
          ) : (
            <Fade in>
              <Box>
                <Calendar
                  tasks={tasks}
                  onDateClick={handleDateClick}
                  onDeleteTask={handleDeleteTask}
                />
              </Box>
            </Fade>
          )}

          {/* Task Modal */}
          {selectedDate && (
            <TaskModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              selectedDate={selectedDate}
              onAddTask={handleAddTask}
            />
          )}

          {/* Edit Task Modal */}
          {selectedTask && (
            <EditTaskModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              task={selectedTask}
              onSave={handleEditTask}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default Home;
