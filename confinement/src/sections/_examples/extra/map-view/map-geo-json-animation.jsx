import { useState, useEffect } from 'react';
import { Layer, Source } from 'react-map-gl';

import { useTheme } from '@mui/material/styles';

import { Map, MapControls } from 'src/components/map';

// ----------------------------------------------------------------------

export function MapGeoJSONAnimation({ sx, ...other }) {
  const theme = useTheme();

  const [pointData, setPointData] = useState(null);

  useEffect(() => {
    const animation = window.requestAnimationFrame(() =>
      setPointData(pointOnCircle({ center: [-100, 0], angle: Date.now() / 1000, radius: 20 }))
    );

    return () => window.cancelAnimationFrame(animation);
  });

  return (
    <Map
      initialViewState={{ latitude: 0, longitude: -100, zoom: 3 }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
      sx={sx}
      {...other}
    >
      <MapControls />

      {pointData && (
        <Source type="geojson" data={pointData}>
          <Layer {...pointLayer(theme)} />
        </Source>
      )}
    </Map>
  );
}

// ----------------------------------------------------------------------

const pointLayer = (theme) => ({
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': theme.palette.error.main,
  },
});

function pointOnCircle({ center, angle, radius }) {
  return {
    type: 'Point',
    coordinates: [center[0] + Math.cos(angle) * radius, center[1] + Math.sin(angle) * radius],
  };
}
