import React from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../../styles/EntriesMap.css'

import icon from '../../images/money-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [38, 38],
  shadowSize: [38, 38],
  iconAnchor: [19, 38],
  shadowAnchor: [5, 38],
  popupAnchor: [0, -38]
})

L.Marker.prototype.options.icon = DefaultIcon


const EntriesMap = ({ attribution, entries, url }) => (
  <Map center={[52.499219, 13.425416]} zoom={8}>
    <TileLayer url={url} attribution={attribution} />
    {entries.map(({ latitude, longitude, serialCode, date }, i) => (
      <Marker key={`marker-${i}`} position={[latitude, longitude]}>
        <Popup>
          <b style={{ fontWeight: 'bold' }}>{serialCode}</b>: {date}
        </Popup>
    </Marker>
    ))}
  </Map>
)

EntriesMap.defaultProps = {
  url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
}

export default EntriesMap
