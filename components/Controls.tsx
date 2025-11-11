import React from 'react';
import { PlayIcon, ResetIcon, PlusIcon } from './Icons';

interface ControlsProps {
  isRunning: boolean;
  isEditing: boolean;
  onStart: () => void;
  onReset: () => void;
  onAddTimer: (color: string, name: string) => void;
}

const PRESET_TIMERS = [
  { name: 'Focus', color: 'bg-rose-500' },
  { name: 'Deep Work', color: 'bg-lime-500' },
  { name: 'Break', color: 'bg-amber-500' },
  { name: 'Review', color: 'bg-sky-500' },
  { name: 'Planning', color: 'bg-indigo-500' },
  { name: 'Creative', color: 'bg-teal-500' },
];

const Controls: React.FC<ControlsProps> = ({ isRunning, isEditing, onStart, onReset, onAddTimer }) => {
  return (
    <div className="w-full max-w-2xl mt-8 p-4 bg-gray-800 rounded-xl shadow-2xl">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={isRunning ? onReset : onStart}
          className={`flex items-center justify-center space-x-2 w-36 px-4 py-3 rounded-lg font-bold text-white transition-transform transform hover:scale-105 ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isRunning ? <ResetIcon /> : <PlayIcon />}
          <span>{isRunning ? 'Reset' : 'Start'}</span>
        </button>
      </div>
      {isEditing && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          <h3 className="text-center text-gray-400 mb-4 font-semibold">Add a timer strip</h3>
          <div className="flex justify-center flex-wrap gap-3">
            {PRESET_TIMERS.map(timer => (
              <button
                key={timer.name}
                onClick={() => onAddTimer(timer.color, timer.name)}
                title={`Add ${timer.name} timer`}
                aria-label={`Add ${timer.name} timer`}
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