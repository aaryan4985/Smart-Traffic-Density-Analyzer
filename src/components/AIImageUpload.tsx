import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

export function AIImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ count: number; density: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Simulate upload and analyze
      setTimeout(() => {
        setIsUploading(false);
        setIsAnalyzing(true);
        
        setTimeout(() => {
          setIsAnalyzing(false);
          // Dummy ML logic
          const randomCount = Math.floor(Math.random() * 80) + 20;
          let randomDensity = 'Low';
          if (randomCount > 70) randomDensity = 'High';
          else if (randomCount > 40) randomDensity = 'Medium';
          
          setResult({ count: randomCount, density: randomDensity });
        }, 2000);
      }, 800);
    }
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  const reset = () => {
    setResult(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <motion.div 
      className="glass-card flex flex-col h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-white mb-4">Traffic Camera AI Analysis</h2>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!previewUrl ? (
            <motion.div 
              key="upload"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-full border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
              onClick={triggerInput}
            >
              <div className="p-4 bg-white/5 rounded-full mb-4">
                <Camera size={32} className="text-white/50" />
              </div>
              <p className="text-white font-medium mb-1">Click to upload camera feed</p>
              <p className="text-white/40 text-xs text-center">Simulate AI detection by uploading<br/>any traffic image (JPG, PNG)</p>
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 border border-white/10">
                <img src={previewUrl} alt="Traffic preview" className="w-full h-full object-cover" />
                
                {(isUploading || isAnalyzing) && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                    <Loader2 className="animate-spin text-primary mb-2" size={32} />
                    <p className="text-sm font-medium text-white">
                      {isUploading ? 'Uploading feed...' : 'AI Analyzing scene...'}
                    </p>
                    {isAnalyzing && (
                      <div className="w-32 h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, ease: "linear" }}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {result && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 border-2 border-primary/50 flex flex-col"
                  >
                    {/* Fake bounding boxes overlay could go here */}
                    <div className="mt-auto bg-black/80 p-2 text-xs flex justify-between">
                      <span className="text-primary font-mono">VISION_MODEL_V2.4</span>
                      <span className="text-success font-mono">CONFIDENCE: 94.2%</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-white/5 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-xs text-white/50 mb-1">Estimated Count</p>
                    <p className="text-xl font-bold flex items-center gap-2">
                      {result.count} <span className="text-xs font-normal text-white/50">vehicles</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/50 mb-1">Detected Density</p>
                    <p className={cn(
                      "text-sm font-bold px-2 py-1 rounded",
                      result.density === 'High' ? "bg-danger/20 text-danger" :
                      result.density === 'Medium' ? "bg-warning/20 text-warning" :
                      "bg-success/20 text-success"
                    )}>
                      {result.density}
                    </p>
                  </div>
                </motion.div>
              )}
              
              {result && (
                <button 
                  onClick={reset}
                  className="mt-4 text-xs text-white/50 hover:text-white transition-colors"
                >
                  Analyze another image
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </motion.div>
  );
}
