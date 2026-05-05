import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Activity, Gauge, Filter, Map as MapIcon, BrainCircuit } from 'lucide-react';
import { useSimulation } from './hooks/useSimulation';
import { MetricCard } from './components/MetricCard';
import { TrafficMap } from './components/TrafficMap';
import { PredictionChart } from './components/PredictionChart';
import { AIImageUpload } from './components/AIImageUpload';
import { AlertsPanel } from './components/AlertsPanel';
import { SmartSuggestions } from './components/SmartSuggestions';

function App() {
  const { currentData, predictionData } = useSimulation();
  const [timeFilter, setTimeFilter] = useState('Live');
  const [area, setArea] = useState('All Areas');

  return (
    <div className="min-h-screen bg-background text-white p-4 md:p-6 lg:p-8">
      {/* Header */}
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl shadow-lg shadow-primary/20">
            <BrainCircuit size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              Smart Traffic Density Analyzer
            </h1>
            <p className="text-sm text-white/50 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              System Online • AI Core Active
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm flex-1 md:flex-none">
            <Filter size={16} className="text-primary" />
            <select 
              className="bg-transparent border-none outline-none text-white/90 cursor-pointer w-full"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option className="bg-surface">Live</option>
              <option className="bg-surface">Morning Peak</option>
              <option className="bg-surface">Afternoon</option>
              <option className="bg-surface">Evening Peak</option>
            </select>
          </div>
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm flex-1 md:flex-none">
            <MapIcon size={16} className="text-secondary" />
            <select 
              className="bg-transparent border-none outline-none text-white/90 cursor-pointer w-full"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option className="bg-surface">All Areas</option>
              <option className="bg-surface">Sector 62</option>
              <option className="bg-surface">Downtown</option>
              <option className="bg-surface">North Highway</option>
            </select>
          </div>
        </div>
      </motion.header>

      <main className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Top Metrics Row */}
        <div className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard 
            title="Current Density" 
            value={currentData.density}
            icon={Activity}
            colorClass={
              currentData.density === 'High' ? 'text-danger' : 
              currentData.density === 'Medium' ? 'text-warning' : 'text-success'
            }
          />
          <MetricCard 
            title="Avg Speed" 
            value={`${currentData.averageSpeed} km/h`}
            icon={Gauge}
            trend={currentData.averageSpeed < 30 ? 'down' : 'up'}
            colorClass="text-primary"
          />
          <MetricCard 
            title="Active Vehicles" 
            value={currentData.vehicleCount}
            subtitle="Detected in camera network"
            icon={Car}
            trend="up"
            colorClass="text-secondary"
          />
        </div>

        {/* Middle Row: Map and Chart */}
        <div className="col-span-1 md:col-span-8 space-y-6">
          <TrafficMap />
          <PredictionChart data={predictionData} />
        </div>

        {/* Right Sidebar: AI Upload, Alerts, Suggestions */}
        <div className="col-span-1 md:col-span-4 space-y-6 flex flex-col h-full">
          <div className="h-[300px]">
            <AIImageUpload />
          </div>
          <div className="flex-1 min-h-[250px]">
            <AlertsPanel />
          </div>
          <div>
            <SmartSuggestions />
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
