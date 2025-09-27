import React from 'react';
import { SolfeggioFrequency } from '../types';

interface InfoPanelProps {
  activeFrequency: SolfeggioFrequency | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ activeFrequency }) => {
  return (
    <div className={`transition-all duration-500 ease-in-out mt-8 md:mt-12 ${activeFrequency ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
      {activeFrequency && (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
            {activeFrequency.frequency} Hz: {activeFrequency.name}
          </h2>
          <p className="text-slate-300 leading-relaxed">
            {activeFrequency.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;