import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ControlPanelRoot } from '../styles';

// ----------------------------------------------------------------------

export function MapControlPanel({ data, selectedCity, onSelectCity }) {
  return (
    <ControlPanelRoot>
      {data.map((city) => (
        <RadioGroup
          key={city.city}
          value={selectedCity}
          onChange={(event) => onSelectCity(event, city)}
        >
          <FormControlLabel
            value={city.city}
            label={city.city}
            control={<Radio size="small" />}
            sx={{ color: 'common.white' }}
          />
        </RadioGroup>
      ))}
    </ControlPanelRoot>
  );
}
