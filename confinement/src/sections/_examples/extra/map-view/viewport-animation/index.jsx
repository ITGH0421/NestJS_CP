import { useRef, useState, useCallback } from 'react';

import { Map, MapControls } from 'src/components/map';

import { MapControlPanel } from './control-panel';

// ----------------------------------------------------------------------

export function MapViewportAnimation({ data, sx, ...other }) {
  const mapRef = useRef(null);

  const [selectedCity, setSelectedCity] = useState(data[2].city);

  const onSelectCity = useCallback((event, { longitude, latitude }) => {
    setSelectedCity(event.target.value);
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  }, []);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: 37.7751,
        longitude: -122.4193,
        zoom: 11,
        bearing: 0,
        pitch: 0,
      }}
      sx={sx}
      {...other}
    >
      <MapControls />

      <MapControlPanel data={data} selectedCity={selectedCity} onSelectCity={onSelectCity} />
    </Map>
  );
}
