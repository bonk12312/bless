import React, { useState } from 'react';
import { Send, Cpu } from 'lucide-react';
import { BlessingCategory } from '../types/blessing';

interface WishFormProps {
  onSubmit: (wish: string) => void;
  isLoading: boolean;
  selectedCategory: BlessingCategory;
}

export const WishForm: React.FC<WishFormProps> = ({ onSubmit, isLoading, selectedCategory }) => {
  const [wish, setWish] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim()) {
      onSubmit(wish.trim());
      setWish('');
    }
  };

  const placeholders = {
    all: 'INPUT YOUR NEURAL REQUEST...',
    love: 'SPECIFY EMOTIONAL PARAMETERS...',
    wisdom: 'REQUEST KNOWLEDGE TRANSFER...',
    health: 'DEFINE WELLNESS PROTOCOLS...',
    success: 'SET ACHIEVEMENT TARGETS...',
    peace: 'CONFIGURE SERENITY SETTINGS...',
    gratitude: 'INITIALIZE APPRECIATION SEQUENCE...'
  };

  return (
    <div className="bg-black border border-white/30 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <Cpu className="w-6 h-6 text-white" />
        <h2 className="text-xl font-bold text-white font-orbitron tracking-wider">
          NEURAL INPUT
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder={placeholders[selectedCategory]}
            className="w-full h-32 px-4 py-3 bg-black border border-white/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white focus:shadow-lg font-orbitron text-sm resize-none transition-all duration-300"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={!wish.trim() || isLoading}
          className="w-full bg-white text-black font-bold py-4 px-6 rounded-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl group font-orbitron tracking-wider"
        >
          <div className="flex items-center justify-center space-x-3">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                <span>PROCESSING REQUEST...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span>TRANSMIT TO AI ORACLE</span>
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};