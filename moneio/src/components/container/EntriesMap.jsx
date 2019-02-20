import React from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import '../../styles/EntriesMap.css'

const toLatLng = ({ latitude, longitude }) => [latitude, longitude]

const EntriesMap = ({ attribution, entries, url }) => (
  <Map center={[52.499219, 13.425416]} zoom={8}>
    <TileLayer url={url} attribution={attribution} />
    {entries.map(entry => (
      <Marker key={`map-marker-${entry.serialCode}`} position={toLatLng(entry.coords)} />
    ))}
  </Map>
)

EntriesMap.defaultProps = {
  url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
}

export default EntriesMap
