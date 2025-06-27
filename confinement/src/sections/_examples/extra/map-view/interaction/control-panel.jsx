import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { inputBaseClasses } from '@mui/material/InputBase';

import { NumberInput } from 'src/components/number-input';

import { ControlPanelRoot } from '../styles';

// ----------------------------------------------------------------------

const camelPattern = /(^|[A-Z])[a-z]*/g;

export function MapControlPanel({ settings, onChange }) {
  return (
    <ControlPanelRoot>
      {Object.keys(settings).map((name) => renderControlSettings(name, settings, onChange))}
    </ControlPanelRoot>
  );
}

// ----------------------------------------------------------------------

function formatSettingName(name) {
  return name.match(camelPattern)?.join(' ');
}

const rowStyles = {
  display: 'flex',
  alignItems: 'center',
  color: 'common.white',
  textTransform: 'capitalize',
  '&:not(:last-of-type)': { mb: 0.5 },
};

const renderControlSettings = (name, settings, onChange) => {
  const value = settings[name];

  if (typeof value === 'boolean') {
    return (
      <Box key={name} sx={rowStyles}>
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {formatSettingName(name)}
        </Typography>
        <Switch
          size="small"
          checked={value}
          onChange={(event) => onChange(name, event.target.checked)}
          inputProps={{ id: `${name}-switch` }}
        />
      </Box>
    );
  }

  if (typeof value === 'number') {
    const handleChangeNumber = (newValue) => {
      const isZoom = name === 'minZoom' || name === 'maxZoom';
      const isPitch = name === 'minPitch' || name === 'maxPitch';

      const updateValue = (inputName, inputValue, minField, maxField) => {
        if (inputValue > Number(settings[maxField])) {
          onChange(maxField, inputValue);
        } else if (inputValue < Number(settings[minField])) {
          onChange(minField, inputValue);
        } else {
          onChange(inputName, inputValue === 0 ? 1 : inputValue);
        }
      };

      if (isZoom) {
        if (name === 'minZoom' && newValue > settings.maxZoom) {
          updateValue('maxZoom', newValue, 'minZoom', 'maxZoom');
        } else if (name === 'maxZoom') {
          updateValue('maxZoom', newValue, 'minZoom', 'maxZoom');
        } else {
          onChange(name, newValue);
        }
      } else if (isPitch) {
        if (name === 'minPitch' && newValue > settings.maxPitch) {
          updateValue('maxPitch', newValue, 'minPitch', 'maxPitch');
        } else if (name === 'maxPitch') {
          updateValue('maxPitch', newValue, 'minPitch', 'maxPitch');
        } else {
          onChange(name, newValue);
        }
      } else {
        onChange(name, newValue);
      }
    };

    return (
      <Box key={name} sx={rowStyles}>
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {formatSettingName(name)}
        </Typography>

        <NumberInput
          max={['minPitch', 'maxPitch'].includes(name) ? 85 : 20}
          hideButtons
          value={value}
          onChange={(event, newValue) => handleChangeNumber(newValue)}
          sx={{ maxWidth: 40 }}
          slotProps={{
            input: {
              sx: {
                [`& .${inputBaseClasses.input}`]: {
                  py: 0,
                  color: 'common.white',
                },
              },
            },
          }}
        />
      </Box>
    );
  }

  return null;
};
