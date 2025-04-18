'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function NonOperatingDaysAdmin() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [nonOperatingDays, setNonOperatingDays] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/nonOperatingDays')
      .then((res) => res.json())
      .then((data) => setNonOperatingDays(data));
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addDate = () => {
    if (!selectedDate) return;
    const formatted = formatDate(selectedDate);
    if (!nonOperatingDays.includes(formatted)) {
      const updated = [...nonOperatingDays, formatted].sort();
      setNonOperatingDays(updated);
      saveToBackend(updated);
    }
  };

  const removeDate = (date: string) => {
    const updated = nonOperatingDays.filter((d) => d !== date);
    setNonOperatingDays(updated);
    saveToBackend(updated);
  };

  const saveToBackend = async (dates: string[]) => {
    await fetch('/api/nonOperatingDays', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dates }),
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 8,
        p: 4,
        bgcolor: 'white',
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold" align="center" mb={4}>
        Manage Non-Operating Days
      </Typography>

      {/* Date Picker & Button */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          gap: 2,
          mb: 4,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            format="yyyy-MM-dd"
            slotProps={{
              textField: {
                size: 'medium',
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={addDate}
          sx={{ whiteSpace: 'nowrap', px: 3, py: 1.5, fontWeight: 'bold' }}
        >
          Add Date
        </Button>
      </Box>

      {/* Date List */}
      <Typography variant="h6" fontWeight="medium" mb={2}>
        Current Non-Operating Days:
      </Typography>

      {nonOperatingDays.length === 0 ? (
        <Typography color="text.secondary">No non-operating days added yet.</Typography>
      ) : (
        <Paper variant="outlined" sx={{ borderRadius: 2 }}>
          <List>
            {nonOperatingDays.map((date) => (
              <ListItem
                key={date}
                secondaryAction={
                  <IconButton edge="end" onClick={() => removeDate(date)}>
                    <DeleteIcon sx={{ color: 'error.main' }} />
                  </IconButton>
                }
              >
                <ListItemText primary={date} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

