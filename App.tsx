import React, { useState, useRef, useEffect } from 'react';
import { SOLFEGGIO_FREQUENCIES } from './constants';
import { SolfeggioFrequency } from './types';
import FrequencyButton from './components/FrequencyButton';
import InfoPanel from './components/InfoPanel';

const App: React.FC = () => {
  const [activeFrequency, setActiveFrequency] = useState<SolfeggioFrequency | null>(null);
  const audioRef = useRef<{ context: AudioContext; oscillator: OscillatorNode; gain: GainNode } | null>(null);

  const stopSound = () => {
    if (audioRef.current) {
      const { context, gain, oscillator } = audioRef.current;
      // Ramp down volume gracefully to avoid clicks
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.4);
      oscillator.stop(context.currentTime + 0.5);
      
      // Delay closing context to allow for ramp down
      setTimeout(() => {
        context.close();
      }, 600);

      audioRef.current = null;
    }
  };

  const playSound = (frequency: number) => {
    stopSound(); // Ensure only one sound plays at a time

    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    
    // Start silent and ramp up volume
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, context.currentTime + 0.5); // Ramp to 30% volume

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();

    audioRef.current = { context, oscillator, gain };
  };

  const handleFrequencySelect = (freq: SolfeggioFrequency) => {
    if (activeFrequency?.id === freq.id) {
      stopSound();
      setActiveFrequency(null);
    } else {
      playSound(freq.frequency);
      setActiveFrequency(freq);
    }
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      stopSound();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-600 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-600 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <main className="w-full max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400">
            Solfeggio Harmonics
          </h1>
          <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto">
            Select a frequency to begin your meditation. Tap again to stop.
          </p>
        </header>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {SOLFEGGIO_FREQUENCIES.map((freq) => (
            <FrequencyButton
              key={freq.id}
              freq={freq}
              isActive={activeFrequency?.id === freq.id}
              onClick={handleFrequencySelect}
            />
          ))}
        </div>

        <InfoPanel activeFrequency={activeFrequency} />
      </main>
      <footer className="relative z-10 text-center mt-8 md:mt-12 text-slate-500 text-sm">
        <p>Crafted for inner peace and resonance.</p>
      </footer>
    </div>
  );
};

export default App;