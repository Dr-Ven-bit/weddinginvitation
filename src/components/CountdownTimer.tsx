import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
  label?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2026-11-12T18:30:00Z',
  label = 'Celebrations Commence In',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full max-w-lg mx-auto py-2">
      <div className="text-center mb-3">
        <span className="text-[11px] uppercase tracking-[0.25em] text-amber-200/70 font-sans font-medium">
          {label}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Mins' },
          { value: timeLeft.seconds, label: 'Secs' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-black/40 backdrop-blur-md border border-amber-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 duration-300"
          >
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-amber-200 tabular-nums leading-none tracking-tight">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-stone-400 mt-1.5 font-sans font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
