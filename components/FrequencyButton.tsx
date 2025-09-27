import React from 'react';
import { SolfeggioFrequency } from '../types';
import SoundWaveIcon from './icons/SoundWaveIcon';

interface FrequencyButtonProps {
  freq: SolfeggioFrequency;
  isActive: boolean;
  onClick: (freq: SolfeggioFrequency) => void;
}

const FrequencyButton: React.FC<FrequencyButtonProps> = ({ freq, isActive, onClick }) => {
  const activeClasses = isActive 
    ? `scale-105 shadow-2xl animate-pulse-glow` 
    : 'shadow-lg hover:scale-105';

  return (
    <button
      onClick={() => onClick(freq)}
      style={isActive ? { color: freq.glowColor } : {}}
      className={`
        relative group flex flex-col items-center justify-center p-4 sm:p-6 aspect-square 
        rounded-2xl transition-all duration-300 ease-in-out transform focus:outline-none 
        backdrop-blur-lg border border-white/10
        ${freq.color} ${freq.hoverColor} ${activeClasses}
      `}
    >
      <div className={`text-3xl sm:text-4xl font-bold ${freq.textColor}`}>
        {freq.frequency} <span className="text-lg font-light">Hz</span>
      </div>
      <div className={`mt-1 text-xs sm:text-sm text-center ${freq.textColor} opacity-80`}>
        {freq.name}
      </div>
      
      {isActive && (
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-white">
          <SoundWaveIcon />
        </div>
      )}
    </button>
  );
};

export default FrequencyButton;