import { motion } from 'framer-motion';
import { Route, Clock, Zap } from 'lucide-react';

export function SmartSuggestions() {
  return (
    <motion.div 
      className="glass-card flex flex-col h-full bg-gradient-to-br from-surface/40 to-secondary/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-secondary" size={20} />
        <h2 className="text-lg font-semibold text-white">AI Suggestions</h2>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-secondary/30 transition-colors">
          <div className="flex items-center gap-2 mb-2 text-secondary">
            <Route size={16} />
            <h3 className="text-sm font-medium">Alternate Route Recommended</h3>
          </div>
          <p className="text-xs text-white/70">
            Divert traffic from <span className="text-white font-medium">Central Bridge</span> to <span className="text-white font-medium">East Highway</span>. Expected delay reduction: 14 mins.
          </p>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-secondary/30 transition-colors">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Clock size={16} />
            <h3 className="text-sm font-medium">Signal Timing Optimization</h3>
          </div>
          <p className="text-xs text-white/70">
            Increase green light duration at <span className="text-white font-medium">Sector 62 Junction</span> by 15s to clear building congestion.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
