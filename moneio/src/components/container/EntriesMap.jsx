import React, { useCallback, useRef } from 'react'
import L, { geoJSON } from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../../styles/EntriesMap.css'

import icon from '../../images/money-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const entryToGeoJSON = ({ latitude, longitude, serialCode, currentDate }) => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [longitude, latitude],
  },
  properties: {
    name: `Entry for ${serialCode} at ${currentDate}`
  }
})

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

const getGeoJSON = (entries) => {
  if (!entries || entries.length === 0) {
    return geoJSON([])
  }

  return geoJSON(entries.map(entryToGeoJSON))
}

const EntriesMap = ({ attribution, entries, url }) => {
  const map = useRef(null)

  useCallback(() => {
    if (map.current !== null) {
      const data = getGeoJSON(entries)
      const bounds = data.getBounds()
      if (bounds.isValid()) {
        console.log(bounds)
        map.current.leafletElement.fitBounds(bounds)
      }
    }
  }, [map, entries])()

  return (
    <Map
      boundOptions={{ padding: [50, 50] }}
      ref={map}
    >
      <TileLayer url={url} attribution={attribution} />
      {console.log(entries) || entries.map(({ latitude, longitude, serialCode, currentDate }, i) => (
        <Marker key={`marker-${i}`} position={[latitude, longitude]}>
          <Popup>
            <b style={{ fontWeight: 'bold' }}>{serialCode}</b>: {currentDate}
          </Popup>
      </Marker>
      ))}
    </Map>
  )
}

EntriesMap.defaultProps = {
  url:
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
}

export default EntriesMap
