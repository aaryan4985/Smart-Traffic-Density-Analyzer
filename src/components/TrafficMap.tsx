import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

// Dummy hotspots in a fictional city
const HOTSPOTS = [
  { id: 1, position: [51.505, -0.09], density: 'High', count: 250, name: 'Central Bridge' },
  { id: 2, position: [51.51, -0.1], density: 'Medium', count: 120, name: 'West Ave' },
  { id: 3, position: [51.49, -0.08], density: 'Low', count: 40, name: 'South Station' },
  { id: 4, position: [51.515, -0.07], density: 'High', count: 310, name: 'North Highway' },
  { id: 5, position: [51.50, -0.12], density: 'Medium', count: 150, name: 'Market Street' },
];

function getDensityColor(density: string) {
  switch (density) {
    case 'High': return '#ef4444'; // red-500
    case 'Medium': return '#f59e0b'; // amber-500
    case 'Low': return '#10b981'; // emerald-500
    default: return '#3b82f6';
  }
}

export function TrafficMap() {
  return (
    <motion.div 
      className="glass rounded-2xl overflow-hidden h-[400px] relative w-full border border-white/10 shadow-xl flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-4 border-b border-white/10 bg-surface/50 backdrop-blur-md flex justify-between items-center z-20">
        <h2 className="text-lg font-semibold text-white">Live Traffic Heatmap</h2>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Low</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Med</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> High</span>
        </div>
      </div>
      <div className="flex-1 relative z-10">
        <MapContainer 
          center={[51.505, -0.09]} 
          zoom={13} 
          style={{ height: '100%', width: '100%', background: '#111827' }}
          zoomControl={false}
        >
          {/* Dark map tiles via CartoDB Dark Matter */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {HOTSPOTS.map((spot) => (
            <CircleMarker
              key={spot.id}
              center={spot.position as [number, number]}
              radius={spot.density === 'High' ? 30 : spot.density === 'Medium' ? 20 : 15}
              pathOptions={{ 
                fillColor: getDensityColor(spot.density),
                fillOpacity: 0.5,
                color: getDensityColor(spot.density),
                weight: 2
              }}
            >
              <Popup className="glass-popup">
                <div className="text-black p-1">
                  <strong className="block text-sm mb-1">{spot.name}</strong>
                  <div className="text-xs">Density: <span style={{ color: getDensityColor(spot.density) }} className="font-bold">{spot.density}</span></div>
                  <div className="text-xs">Vehicles: {spot.count}/hr</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </motion.div>
  );
}
