import React from 'react';
import type { Timer } from '../types';
import { TrashIcon } from './Icons';

interface TimerStripProps {
  timer: Timer;
  currentTime: number;
  isActive: boolean;
  isComplete: boolean;
  isEditing: boolean;
  onRemove: (id: string) => void;
  onDurationChange: (id: string, newDuration: number) => void;
  onNameChange: (id: string, newName: string) => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const TimerStrip: React.FC<TimerStripProps> = ({
  timer,
  currentTime,
  isActive,
  isComplete,
  isEditing,
  onRemove,
  onDurationChange,
  onNameChange,
}) => {
  
  const getProgress = (): number => {
    if (isEditing) return 100;
    if (isComplete) return 0;
    if (isActive) return (currentTime / timer.duration) * 100;
    return 100; // Not yet started
  };
  
  const progress = getProgress();

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value, 10);
    if (!isNaN(newDuration) && newDuration > 0) {
      onDurationChange(timer.id, newDuration);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(timer.id, e.target.value);
  };


  return (
    <div className={`relative w-full h-20 rounded-lg overflow-hidden flex items-center justify-between px-6 my-2 shadow-lg transition-all duration-300 ${isActive ? 'ring-4 ring-white' : 'ring-2 ring-transparent'}`}>
      <div className="absolute top-0 left-0 h-full bg-black/30 w-full z-0"></div>
      <div
        className={`absolute top-0 left-0 h-full ${timer.color} transition-all duration-500 ease-linear z-0`}
        style={{ width: `${progress}%` }}
      ></div>

      <div className="relative z-10 flex items-center space-x-4">
        {isEditing ? (
            <input
                type="text"
                value={timer.name}
                onChange={handleNameChange}
                className="w-24 bg-gray-700 text-white p-1 rounded border border-gray-600 text-lg font-semibold"
                aria-label={`Edit name for timer ${timer.name}`}
            />
        ) : (
            <span className={`w-24 text-lg font-semibold truncate`}>{timer.name}</span>
        )}
        
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={timer.duration}
              onChange={handleDurationChange}
              className="w-20 bg-gray-700 text-white p-1 rounded border border-gray-600 text-center"
              min="1"
            />
            <span className="text-sm">seconds</span>
          </div>
        ) : (
          <span className="text-3xl font-mono font-bold">
            {isComplete ? '00:00' : formatTime(isActive ? currentTime : timer.duration)}
          </span>
        )}
      </div>

      {isEditing && (
        <button
          onClick={() => onRemove(timer.id)}
          className="relative z-10 p-2 rounded-full bg-red-500/50 hover:bg-red-500 text-white transition-colors"
          aria-label={`Remove ${timer.name} timer`}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TimerStrip;