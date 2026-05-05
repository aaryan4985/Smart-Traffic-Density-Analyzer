import { motion } from 'framer-motion';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  message: string;
  time: string;
}

const DUMMY_ALERTS: Alert[] = [
  { id: 1, type: 'critical', message: 'High congestion detected in Sector 62', time: 'Just now' },
  { id: 2, type: 'warning', message: 'Accident-prone zone: Slow traffic on West Ave', time: '5m ago' },
  { id: 3, type: 'info', message: 'Normal traffic flow restored at South Station', time: '12m ago' },
];

export function AlertsPanel() {
  return (
    <motion.div 
      className="glass-card flex flex-col h-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Smart Alerts</h2>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
        </span>
      </div>
      
      <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {DUMMY_ALERTS.map((alert, i) => (
          <motion.div 
            key={alert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className={`p-3 rounded-xl border flex gap-3 items-start ${
              alert.type === 'critical' ? 'bg-danger/10 border-danger/20' :
              alert.type === 'warning' ? 'bg-warning/10 border-warning/20' :
              'bg-primary/10 border-primary/20'
            }`}
          >
            <div className={`mt-0.5 ${
              alert.type === 'critical' ? 'text-danger' :
              alert.type === 'warning' ? 'text-warning' :
              'text-primary'
            }`}>
              {alert.type === 'critical' ? <ShieldAlert size={18} /> :
               alert.type === 'warning' ? <AlertTriangle size={18} /> :
               <Info size={18} />}
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">{alert.message}</p>
              <p className="text-xs text-white/50 mt-1">{alert.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
