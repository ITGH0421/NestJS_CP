import { useRef } from 'react';
import { Layer, Source } from 'react-map-gl';

import { Map } from 'src/components/map';

// ----------------------------------------------------------------------

export function MapClusters({ sx, ...other }) {
  const mapRef = useRef(null);

  const handleClickCluster = (event) => {
    const feature = event.features?.[0];
    const clusterId = feature?.properties?.cluster_id;

    const mapboxSource = mapRef?.current?.getSource('earthquakes');

    mapboxSource.getClusterExpansionZoom(clusterId, (error, zoom) => {
      if (error) {
        return;
      }

      if (feature?.geometry.type === 'Point') {
        mapRef.current?.easeTo({
          center: feature?.geometry.coordinates,
          zoom: Number.isNaN(zoom) ? 3 : zoom,
          duration: 500,
        });
      }
    });
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{ latitude: 40.67, longitude: -103.59, zoom: 3 }}
      interactiveLayerIds={[clusterLayer.id || '']}
      onClick={handleClickCluster}
      sx={sx}
      {...other}
    >
      <Source
        id="earthquakes"
        type="geojson"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        cluster
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  );
}

// ----------------------------------------------------------------------

const clusterLayer = {
  id: 'clusters',
  type: 'circle',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  },
};

const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
};

const unclusteredPointLayer = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11b4da',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#FFFFFF',
  },
};
