import React, { useState, useEffect, useCallback } from 'react';
import type { Timer } from './types';
import TimerStrip from './components/TimerStrip';
import Controls from './components/Controls';

const App: React.FC = () => {
  const [timers, setTimers] = useState<Timer[]>([
    { id: crypto.randomUUID(), duration: 25, color: 'bg-rose-500', name: 'Focus' },
    { id: crypto.randomUUID(), duration: 5, color: 'bg-amber-500', name: 'Break' },
    { id: crypto.randomUUID(), duration: 15, color: 'bg-sky-500', name: 'Review' },
  ]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeTimerIndex, setActiveTimerIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setActiveTimerIndex(null);
    setTimeLeft(0);
  }, []);

  useEffect(() => {
    if (!isRunning || activeTimerIndex === null) {
      return;
    }

    if (timeLeft <= 0) {
      const nextIndex = activeTimerIndex + 1;
      if (nextIndex < timers.length) {
        setActiveTimerIndex(nextIndex);
        setTimeLeft(timers[nextIndex].duration);
      } else {
        handleReset();
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, activeTimerIndex, timers, handleReset]);

  const handleStart = () => {
    if (timers.length > 0) {
      setIsRunning(true);
      setActiveTimerIndex(0);
      setTimeLeft(timers[0].duration);
    }
  };

  const handleAddTimer = (color: string, name: string) => {
    const newTimer: Timer = {
      id: crypto.randomUUID(),
      duration: 30,
      color,
      name,
    };
    setTimers([...timers, newTimer]);
  };

  const handleRemoveTimer = (id: string) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  const handleDurationChange = (id: string, newDuration: number) => {
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, duration: newDuration } : timer
    ));
  };

  const handleNameChange = (id: string, newName: string) => {
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, name: newName } : timer
    ));
  };
  
  const isEditing = !isRunning;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Traffic Light Strip Timer
          </h1>
          <p className="text-gray-400 mt-2">
            {isEditing ? 'Set up your timers below or press Start.' : 'Timer sequence is running...'}
          </p>
        </header>

        <main className="w-full">
          {timers.length > 0 ? (
            timers.map((timer, index) => (
              <TimerStrip
                key={timer.id}
                timer={timer}
                currentTime={timeLeft}
                isActive={index === activeTimerIndex}
                isComplete={activeTimerIndex !== null && index < activeTimerIndex}
                isEditing={isEditing}
                onRemove={handleRemoveTimer}
                onDurationChange={handleDurationChange}
                onNameChange={handleNameChange}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 bg-gray-800 p-8 rounded-lg">
                <p>No timers configured.</p>
                <p>Add a new timer strip to begin.</p>
            </div>
          )}
        </main>

        <footer className="flex justify-center">
            <Controls
                isRunning={isRunning}
                isEditing={isEditing}
                onStart={handleStart}
                onReset={handleReset}
                onAddTimer={handleAddTimer}
            />
        </footer>
      </div>
    </div>
  );
};

export default App;