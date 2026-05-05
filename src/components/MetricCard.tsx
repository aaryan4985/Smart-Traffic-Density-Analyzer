import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  colorClass?: string;
}

export function MetricCard({ title, value, subtitle, icon: Icon, trend, colorClass }: MetricCardProps) {
  return (
    <motion.div 
      className={cn("glass-card flex flex-col gap-4 relative overflow-hidden group")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Decorative gradient blur */}
      <div className={cn("absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity", colorClass || "bg-primary")} />

      <div className="flex items-center justify-between z-10">
        <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">{title}</h3>
        <div className={cn("p-2 rounded-xl bg-white/5", colorClass ? `text-${colorClass.split('-')[1]}` : "text-white")}>
          <Icon size={20} className={colorClass} />
        </div>
      </div>
      
      <div className="z-10">
        <div className="text-3xl font-bold tracking-tight text-white flex items-baseline gap-2">
          {value}
          {trend === 'up' && <span className="text-xs text-accent">↑ +2.4%</span>}
          {trend === 'down' && <span className="text-xs text-success">↓ -1.2%</span>}
        </div>
        {subtitle && <p className="text-sm text-white/50 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
