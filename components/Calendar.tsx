import { useState, useMemo } from 'react';
import { Task } from '../types/Task';
import DayCell from './DayCell';
import TaskListView from './TaskListView';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface CalendarProps {
  onDateClick: (date: Date) => void;
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void; // ✅ ADDED missing prop
}

export default function Calendar({
  onDateClick,
  tasks,
  onDeleteTask,
  onEditTask,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const paddedDays = Array.from({ length: firstDay }, () => null);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));

    return [...paddedDays, ...monthDays];
  }, [currentMonth]);

  const getTasksForDate = (date: Date) =>
    tasks.filter(task => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });

  const getTasksForMonth = () =>
    tasks.filter(task => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getMonth() === currentMonth.getMonth() &&
        taskDate.getFullYear() === currentMonth.getFullYear()
      );
    });

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleDayClick = (day: Date | null) => {
    if (day) setSelectedDate(day);
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="center"
        alignItems={isMobile ? 'stretch' : 'flex-start'}
        gap={4}
        py={4}
      >
        {/* Calendar View */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            flex: 1,
            backgroundColor: '#fff',
            minWidth: 0,
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <IconButton onClick={handlePrevMonth}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" fontWeight="bold">
              {monthName} {currentMonth.getFullYear()}
            </Typography>
            <IconButton onClick={handleNextMonth}>
              <ArrowForward />
            </IconButton>
          </Box>

          {/* Weekdays */}
          <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" mb={1}>
            {weekdays.map(day => (
              <Typography
                key={day}
                align="center"
                fontWeight="medium"
                color="text.secondary"
              >
                {day}
              </Typography>
            ))}
          </Box>

          {/* Days */}
          <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
            {days.map((day, index) => {
              const isToday = day?.toDateString() === new Date().toDateString();

              return (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: isToday ? 'primary.light' : '#fafafa',
                    border: '1px solid',
                    borderColor: isToday ? 'primary.main' : 'grey.300',
                    borderRadius: 2,
                    cursor: day ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: day ? 'grey.100' : 'transparent',
                      boxShadow: day ? 2 : 'none',
                    },
                  }}
                  onClick={() => handleDayClick(day)}
                >
                  <DayCell
                    date={day}
                    tasks={day ? getTasksForDate(day) : []}
                    onDateClick={onDateClick}
                    onDeleteTask={onDeleteTask}
                    isCurrentMonth={true}
                  />
                </Box>
              );
            })}
          </Box>
        </Paper>

        {/* Sidebar: Task List */}
        <Box
          sx={{
            flex: 1,
            maxWidth: isMobile ? '100%' : 400,
            minWidth: isMobile ? '100%' : 300,
            px: 1,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" fontWeight="bold">
              {selectedDate
                ? `Tasks on ${selectedDate.toDateString()}`
                : 'Tasks This Month'}
            </Typography>
            {selectedDate && (
              <Button size="small" onClick={() => setSelectedDate(null)}>
                Back
              </Button>
            )}
          </Box>

          <Divider sx={{ mb: 1 }} />

          <TaskListView
            tasks={selectedDate ? getTasksForDate(selectedDate) : getTasksForMonth()}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask} // ✅ Passed properly
          />
        </Box>
      </Box>
    </Container>
  );
}
