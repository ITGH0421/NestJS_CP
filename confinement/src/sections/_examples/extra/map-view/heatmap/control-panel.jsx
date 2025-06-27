import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { fDate } from 'src/utils/format-time';

import { ControlPanelRoot } from '../styles';

// ----------------------------------------------------------------------

export function MapControlPanel({
  startTime,
  endTime,
  allDays,
  selectedTime,
  onChangeTime,
  onChangeAllDays,
}) {
  const day = 24 * 60 * 60 * 1000;
  const days = Math.round((endTime - startTime) / day);
  const selectedDay = Math.round((selectedTime - startTime) / day);

  const handleChangeDays = (value) => {
    const daysToAdd = value;
    const newTime = startTime + daysToAdd * day;

    onChangeTime(newTime);
  };

  return (
    <ControlPanelRoot>
      <FormControlLabel
        label="All days"
        labelPlacement="start"
        control={
          <Switch
            size="small"
            checked={allDays}
            onChange={(event) => onChangeAllDays(event.target.checked)}
            inputProps={{ id: 'all-days-switch' }}
          />
        }
        sx={{
          mb: 2,
          mx: 0,
          width: 1,
          color: 'common.white',
          justifyContent: 'space-between',
        }}
      />

      <Typography variant="body2" sx={{ mb: 1, color: allDays ? 'text.disabled' : 'common.white' }}>
        Each day: {fDate(selectedTime)}
      </Typography>

      <Slider
        min={1}
        step={1}
        max={days}
        disabled={allDays}
        value={selectedDay}
        onChange={(event, newValue) => {
          if (typeof newValue === 'number') handleChangeDays(newValue);
        }}
      />
    </ControlPanelRoot>
  );
}
