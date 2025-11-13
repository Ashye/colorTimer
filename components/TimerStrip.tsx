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
  t: (key: string) => string;
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
  t,
}) => {
  
  const getProgress = (): number => {
    if (isEditing) return 100;
    if (isComplete) return 0;
    if (isActive) return (currentTime / timer.duration) * 100;
    return 100; // Not yet started
  };
  
  const progress = getProgress();

  const displayMinutes = Math.floor(timer.duration / 60);
  const displaySeconds = timer.duration % 60;

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentSeconds = timer.duration % 60;
    const newMinutesValue = e.target.value;
    const newMinutes = newMinutesValue === '' ? 0 : parseInt(newMinutesValue, 10);
    
    if (!isNaN(newMinutes) && newMinutes >= 0) {
      const newDuration = newMinutes * 60 + currentSeconds;
      onDurationChange(timer.id, newDuration >= 1 ? newDuration : 1);
    }
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentMinutes = Math.floor(timer.duration / 60);
    const newSecondsValue = e.target.value;
    let newSeconds = newSecondsValue === '' ? 0 : parseInt(newSecondsValue, 10);

    if (!isNaN(newSeconds) && newSeconds >= 0) {
      if (newSeconds > 59) newSeconds = 59;
      const newDuration = currentMinutes * 60 + newSeconds;
      onDurationChange(timer.id, newDuration >= 1 ? newDuration : 1);
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
                placeholder={t('timerNamePlaceholder')}
                className="w-24 bg-gray-700 text-white p-1 rounded border border-gray-600 text-lg font-semibold"
                aria-label={t('editTimerNameLabel')}
            />
        ) : (
            <span className={`w-24 text-lg font-semibold truncate`}>{timer.name}</span>
        )}
        
        {isEditing ? (
          <div className="flex items-center space-x-1 text-sm">
            <input
              type="number"
              value={displayMinutes}
              onChange={handleMinutesChange}
              className="w-12 bg-gray-700 text-white p-1 rounded border border-gray-600 text-center"
              min="0"
              aria-label={t('minutesLabel')}
            />
            <span>{t('minutes')}</span>
            <input
              type="number"
              value={displaySeconds}
              onChange={handleSecondsChange}
              className="w-12 bg-gray-700 text-white p-1 rounded border border-gray-600 text-center"
              min="0"
              max="59"
              aria-label={t('secondsLabel')}
            />
            <span>{t('seconds')}</span>
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
          aria-label={t('removeTimerLabel')}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TimerStrip;