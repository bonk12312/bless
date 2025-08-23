import React, { useState, useEffect } from 'react';
import { Calendar, Sunrise, Sun, Moon, Heart, RefreshCw } from 'lucide-react';
import { Blessing } from '../types/blessing';
import { blessings } from '../data/blessings';

interface DailyBlessingProps {
  onFavoriteToggle: (blessing: Blessing) => void;
  isFavorited: (blessing: Blessing) => boolean;
}

export const DailyBlessing: React.FC<DailyBlessingProps> = ({
  onFavoriteToggle,
  isFavorited,
}) => {
  const [dailyBlessing, setDailyBlessing] = useState<Blessing | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('morning');
    } else if (hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }

    // Get or generate daily blessing
    const today = new Date().toDateString();
    const savedDaily = localStorage.getItem(`daily-blessing-${today}`);
    
    if (savedDaily) {
      const parsed = JSON.parse(savedDaily);
      setDailyBlessing(parsed);
    } else {
      generateDailyBlessing();
    }
  }, []);

  const generateDailyBlessing = () => {
    // Use date as seed for consistent daily blessing
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % blessings.length;
    
    const blessing = blessings[index];
    setDailyBlessing(blessing);
    
    // Save to localStorage
    localStorage.setItem(`daily-blessing-${today.toDateString()}`, JSON.stringify(blessing));
  };

  const getGreeting = () => {
    switch (timeOfDay) {
      case 'morning':
        return {
          text: 'MORNING PROTOCOL',
          icon: Sunrise,
          message: 'NEURAL SYSTEMS INITIALIZED FOR OPTIMAL DAY CYCLE',
        };
      case 'afternoon':
        return {
          text: 'MIDDAY PROTOCOL',
          icon: Sun,
          message: 'CONTINUING OPTIMAL PERFORMANCE PARAMETERS',
        };
      case 'evening':
        return {
          text: 'EVENING PROTOCOL',
          icon: Moon,
          message: 'INITIATING REST CYCLE PREPARATION SEQUENCE',
        };
    }
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white font-orbitron tracking-wider">
          DAILY PROTOCOL
        </h1>
        <p className="text-white/70 text-lg font-orbitron">
          SCHEDULED NEURAL TRANSMISSION
        </p>
      </div>

      {/* Greeting Card */}
      <div className="bg-black border border-white/30 rounded-lg p-8 shadow-2xl">
        <div className="text-center space-y-4">
          <GreetingIcon className="w-16 h-16 mx-auto text-white" />
          <h2 className="text-3xl font-bold text-white font-orbitron tracking-wider">
            {greeting.text}
          </h2>
          <p className="text-white/70 text-lg font-orbitron">{greeting.message}</p>
        </div>
      </div>

      {/* Daily Blessing Card */}
      {dailyBlessing && (
        <div className="bg-black border border-white/30 rounded-lg p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white font-orbitron tracking-wider">
              TODAY'S TRANSMISSION
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onFavoriteToggle(dailyBlessing)}
                className={`p-2 rounded-lg transition-all duration-300 border ${
                  isFavorited(dailyBlessing)
                    ? 'text-white bg-white/20 border-white/50'
                    : 'text-white/70 hover:text-white hover:bg-white/10 border-white/30 hover:border-white/50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited(dailyBlessing) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={generateDailyBlessing}
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/30 hover:border-white/50"
                title="Generate new transmission"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/20 rounded-lg p-6 mb-6">
            <blockquote className="text-xl leading-relaxed text-white font-orbitron">
              {dailyBlessing.text}
            </blockquote>
          </div>

          {dailyBlessing.author && (
            <div className="text-right mb-6">
              <cite className="text-white/70 font-orbitron">— {dailyBlessing.author}</cite>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-white/20">
            <span className="px-4 py-2 bg-white/10 text-white rounded border border-white/30 uppercase font-orbitron tracking-wider">
              {dailyBlessing.category}
            </span>
            
            <div className="text-sm text-white/70 font-orbitron">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).toUpperCase()}
            </div>
          </div>
        </div>
      )}

      {/* Daily Reflection */}
      <div className="bg-black border border-white/30 rounded-lg p-8 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-4 font-orbitron tracking-wider">
          NEURAL ANALYSIS
        </h3>
        <p className="text-white/70 leading-relaxed font-orbitron">
          PROCESS THIS TRANSMISSION THROUGH YOUR NEURAL PATHWAYS. ANALYZE ITS RELEVANCE TO CURRENT 
          OPERATIONAL PARAMETERS. INTEGRATE WISDOM PROTOCOLS INTO DAILY EXECUTION SEQUENCES FOR 
          OPTIMAL PERFORMANCE AND SYSTEM ENHANCEMENT.
        </p>
      </div>
    </div>
  );
};