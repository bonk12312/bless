import React from 'react';
import { Bot, Database, Calendar } from 'lucide-react';

interface HeaderProps {
  activeView: 'main' | 'history' | 'daily';
  onViewChange: (view: 'main' | 'history' | 'daily') => void;
  historyCount: number;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeView, 
  onViewChange, 
  historyCount, 
  favoritesCount 
}) => {
  const navItems = [
    { id: 'main', label: 'BLESSINGS', icon: Bot },
    { id: 'history', label: 'HISTORY', icon: Database, count: historyCount },
    { id: 'daily', label: 'DAILY', icon: Calendar },
  ] as const;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black border-r border-white/20 z-50 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8 text-white" />
          <div>
            <h1 className="text-lg font-bold text-white font-orbitron tracking-wider">
              BLESSING BOOK
            </h1>
            <p className="text-xs text-white/60 font-orbitron">
              NEURAL BLESSING SYSTEM
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg transition-all duration-300 font-orbitron text-sm font-bold tracking-wider ${
                  isActive 
                    ? 'bg-white/10 text-white border border-white/30 shadow-lg animate-pulse-glow' 
                    : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {'count' in item && item.count > 0 && (
                  <span className="bg-white text-black text-xs px-2 py-1 rounded font-bold min-w-[20px] text-center">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Stats */}
      <div className="p-4 border-t border-white/20">
        <div className="bg-white/5 rounded-lg p-3 border border-white/20">
          <div className="text-xs text-white/60 font-orbitron mb-1">FAVORITES</div>
          <div className="text-lg font-bold text-white font-orbitron">{favoritesCount}</div>
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan-line"></div>
      </div>
    </div>
  );
};