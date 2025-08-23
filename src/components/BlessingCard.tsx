import React from 'react';
import { Heart, Share2, Copy, Cpu } from 'lucide-react';
import { Blessing } from '../types/blessing';

interface BlessingCardProps {
  blessing: Blessing | null;
  isLoading: boolean;
  onFavoriteToggle: (blessing: Blessing) => void;
  isFavorited: boolean;
}

export const BlessingCard: React.FC<BlessingCardProps> = ({ 
  blessing, 
  isLoading, 
  onFavoriteToggle, 
  isFavorited 
}) => {
  const handleCopy = async () => {
    if (blessing) {
      await navigator.clipboard.writeText(blessing.text);
    }
  };

  const handleShare = async () => {
    if (blessing && navigator.share) {
      await navigator.share({
        title: 'AI Oracle Blessing',
        text: blessing.text,
        url: window.location.href,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-black border border-white/30 rounded-lg p-6 shadow-2xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            <p className="text-white/70 text-lg font-orbitron tracking-wider">
              AI PROCESSING...
            </p>
            <p className="text-white/50 text-sm font-orbitron">
              NEURAL NETWORKS ANALYZING REQUEST
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!blessing) {
    return (
      <div className="bg-black border border-white/30 rounded-lg p-6 shadow-2xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <Cpu className="w-16 h-16 text-white/50 mx-auto" />
            <p className="text-white/70 text-lg font-orbitron tracking-wider">
              AWAITING INPUT
            </p>
            <p className="text-white/50 font-orbitron text-sm">
              NEURAL ORACLE READY FOR TRANSMISSION
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-white/30 rounded-lg p-6 shadow-2xl animate-pulse-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Cpu className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white font-orbitron tracking-wider">
            AI RESPONSE
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onFavoriteToggle(blessing)}
            className={`p-2 rounded-lg transition-all duration-300 border ${
              isFavorited 
                ? 'text-white bg-white/20 border-white/50' 
                : 'text-white/70 hover:text-white hover:bg-white/10 border-white/30 hover:border-white/50'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/30 hover:border-white/50"
          >
            <Copy className="w-5 h-5" />
          </button>
          
          {navigator.share && (
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/30 hover:border-white/50"
            >
              <Share2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/20 rounded-lg p-4">
          <blockquote className="text-lg leading-relaxed text-white font-orbitron">
            {blessing.text}
          </blockquote>
        </div>
        
        {blessing.author && (
          <div className="text-right">
            <cite className="text-white/70 font-orbitron text-sm">
              — {blessing.author}
            </cite>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-white/10 text-white text-sm rounded border border-white/30 font-orbitron tracking-wider uppercase">
              {blessing.category}
            </span>
          </div>
          
          {blessing.tags && (
            <div className="flex flex-wrap gap-1">
              {blessing.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/5 text-white/70 text-xs rounded border border-white/20 font-orbitron"
                >
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};