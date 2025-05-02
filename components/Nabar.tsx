import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import { CalendarMonth, Search, Menu } from '@mui/icons-material';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const theme = useTheme();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(formatted);
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton edge="start" color="inherit">
            <Menu />
          </IconButton>
          <CalendarMonth color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Calendar Task Manager
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.action.hover, 0.1),
            '&:hover': {
              backgroundColor: alpha(theme.palette.action.hover, 0.2),
            },
            width: '100%',
            maxWidth: 300,
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 0.5,
            mr: 2,
          }}
        >
          <Search sx={{ color: theme.palette.text.secondary, mr: 1 }} />
          <InputBase
            placeholder="Search tasks…"
            inputProps={{ 'aria-label': 'search' }}
            sx={{ width: '100%' }}
          />
        </Box>

        <Typography variant="body2" fontWeight={500} color="text.secondary" sx={{ minWidth: 100, textAlign: 'right' }}>
          {currentTime}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
