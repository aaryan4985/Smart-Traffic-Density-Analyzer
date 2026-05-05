import { useState, useEffect } from 'react';

export type DensityLevel = 'Low' | 'Medium' | 'High';

export interface TrafficData {
  vehicleCount: number;
  averageSpeed: number;
  density: DensityLevel;
  timestamp: Date;
}

export interface PredictionData {
  time: string;
  predictedCount: number;
}

export function useSimulation() {
  const [currentData, setCurrentData] = useState<TrafficData>({
    vehicleCount: 120,
    averageSpeed: 45,
    density: 'Medium',
    timestamp: new Date()
  });

  const [predictionData, setPredictionData] = useState<PredictionData[]>([]);

  // Initialize prediction data
  useEffect(() => {
    const initialData = [];
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const time = new Date(now.getTime() + i * 10 * 60000); // every 10 mins
      const baseCount = 100 + Math.random() * 50;
      // Simulate peak hours
      const hour = time.getHours();
      const multiplier = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19) ? 2 : 1;
      
      initialData.push({
        time: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`,
        predictedCount: Math.round(baseCount * multiplier)
      });
    }
    setPredictionData(initialData);
  }, []);

  // Live simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => {
        // Randomly adjust vehicle count
        const countDiff = Math.floor(Math.random() * 21) - 10; // -10 to +10
        const newCount = Math.max(0, prev.vehicleCount + countDiff);
        
        // Speed usually inversely correlates with count
        const speedDiff = Math.floor(Math.random() * 5) - 2;
        let newSpeed = Math.max(10, Math.min(80, prev.averageSpeed + speedDiff));
        if (newCount > 200) newSpeed -= 5;
        else if (newCount < 50) newSpeed += 5;
        
        newSpeed = Math.max(5, newSpeed); // enforce minimum speed
        
        let newDensity: DensityLevel = 'Medium';
        if (newCount > 180) newDensity = 'High';
        else if (newCount < 80) newDensity = 'Low';

        return {
          vehicleCount: newCount,
          averageSpeed: newSpeed,
          density: newDensity,
          timestamp: new Date()
        };
      });
    }, 3000); // update every 3 seconds for dynamic feel

    return () => clearInterval(interval);
  }, []);

  return { currentData, predictionData };
}
