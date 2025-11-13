import React from 'react';
import { PlayIcon, ResetIcon, PlusIcon } from './Icons';

interface ControlsProps {
  isRunning: boolean;
  isEditing: boolean;
  onStart: () => void;
  onReset: () => void;
  onAddTimer: (color: string) => void;
  t: (key: string) => string;
}

const PRESET_TIMERS = [
  { key: 'addRedTimer', color: 'bg-rose-500' },
  { key: 'addBlueTimer', color: 'bg-sky-500' },
  { key: 'addGreenTimer', color: 'bg-emerald-500' },
  { key: 'addYellowTimer', color: 'bg-amber-500' },
  { key: 'addPurpleTimer', color: 'bg-violet-500' },
  { key: 'addPinkTimer', color: 'bg-pink-500' },
];

const Controls: React.FC<ControlsProps> = ({ isRunning, isEditing, onStart, onReset, onAddTimer, t }) => {
  return (
    <div className="w-full max-w-2xl mt-8 p-4 bg-gray-800 rounded-xl shadow-2xl">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={isRunning ? onReset : onStart}
          className={`flex items-center justify-center space-x-2 w-36 px-4 py-3 rounded-lg font-bold text-white transition-transform transform hover:scale-105 ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isRunning ? <ResetIcon /> : <PlayIcon />}
          <span>{isRunning ? t('reset') : t('start')}</span>
        </button>
      </div>
      {isEditing && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex justify-center flex-wrap gap-3">
            {PRESET_TIMERS.map(timer => (
              <button
                key={timer.key}
                onClick={() => onAddTimer(timer.color)}
                title={t(timer.key)}
                aria-label={t(timer.key)}
                className={`p-3 rounded-full text-white transition-transform transform hover:scale-110 shadow-md hover:shadow-lg ${timer.color}`}
              >
                <PlusIcon />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Controls;