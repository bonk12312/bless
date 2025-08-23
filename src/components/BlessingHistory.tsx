import React, { useState } from 'react';
import { Heart, Database, Search, Calendar } from 'lucide-react';
import { HistoryItem, Blessing, BlessingCategory } from '../types/blessing';

interface BlessingHistoryProps {
  history: HistoryItem[];
  favorites: Blessing[];
  onFavoriteToggle: (blessing: Blessing) => void;
  isFavorited: (blessing: Blessing) => boolean;
}

export const BlessingHistory: React.FC<BlessingHistoryProps> = ({
  history,
  favorites,
  onFavoriteToggle,
  isFavorited,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('history');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<BlessingCategory | 'all'>('all');

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.wish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.blessing.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.blessing.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredFavorites = favorites.filter(blessing => {
    const matchesSearch = blessing.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || blessing.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white font-orbitron tracking-wider">
          DATA ARCHIVES
        </h1>
        <p className="text-white/70 text-lg font-orbitron">
          NEURAL INTERACTION HISTORY
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 rounded-lg font-orbitron font-bold tracking-wider transition-all duration-300 border ${
            activeTab === 'history'
              ? 'bg-white/10 text-white border-white'
              : 'text-white/70 hover:text-white hover:bg-white/5 border-white/30 hover:border-white/50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>HISTORY ({history.length})</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-6 py-3 rounded-lg font-orbitron font-bold tracking-wider transition-all duration-300 border ${
            activeTab === 'favorites'
              ? 'bg-white/10 text-white border-white'
              : 'text-white/70 hover:text-white hover:bg-white/5 border-white/30 hover:border-white/50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span>FAVORITES ({favorites.length})</span>
          </div>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH NEURAL RECORDS..."
            className="w-full pl-10 pr-4 py-3 bg-black border border-white/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white font-orbitron"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as BlessingCategory | 'all')}
          className="px-4 py-3 bg-black border border-white/30 rounded-lg text-white focus:outline-none focus:border-white font-orbitron"
        >
          <option value="all">ALL CATEGORIES</option>
          <option value="love">EMOTION</option>
          <option value="wisdom">KNOWLEDGE</option>
          <option value="health">WELLNESS</option>
          <option value="success">ACHIEVEMENT</option>
          <option value="peace">SERENITY</option>
          <option value="gratitude">APPRECIATION</option>
        </select>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'history' ? (
          filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className="bg-black border border-white/30 rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2 text-white/70 text-sm font-orbitron">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.timestamp)}</span>
                    <span className="px-2 py-1 bg-white/10 text-white rounded border border-white/30 uppercase text-xs">
                      {item.blessing.category}
                    </span>
                  </div>
                  <button
                    onClick={() => onFavoriteToggle(item.blessing)}
                    className={`p-2 rounded-lg transition-all duration-300 border ${
                      isFavorited(item.blessing)
                        ? 'text-white bg-white/20 border-white/50'
                        : 'text-white/70 hover:text-white hover:bg-white/10 border-white/30 hover:border-white/50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited(item.blessing) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-white/70 text-sm mb-2 font-orbitron">INPUT:</p>
                    <p className="text-white font-orbitron">"{item.wish}"</p>
                  </div>
                  
                  <div>
                    <p className="text-white/70 text-sm mb-2 font-orbitron">AI RESPONSE:</p>
                    <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                      <blockquote className="text-white font-orbitron">
                        {item.blessing.text}
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-lg font-orbitron">NO RECORDS FOUND</p>
              <p className="text-white/50 font-orbitron">NEURAL HISTORY WILL APPEAR HERE</p>
            </div>
          )
        ) : (
          filteredFavorites.length > 0 ? (
            <div className="grid gap-4">
              {filteredFavorites.map((blessing) => (
                <div
                  key={blessing.id}
                  className="bg-black border border-white/30 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-white/10 text-white rounded border border-white/30 uppercase text-sm font-orbitron">
                      {blessing.category}
                    </span>
                    <button
                      onClick={() => onFavoriteToggle(blessing)}
                      className="p-2 rounded-lg text-white bg-white/20 border border-white/50 transition-all duration-300"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  
                  <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                    <blockquote className="text-white font-orbitron text-lg leading-relaxed">
                      {blessing.text}
                    </blockquote>
                  </div>
                  
                  {blessing.author && (
                    <div className="text-right mt-4">
                      <cite className="text-white/70 font-orbitron text-sm">— {blessing.author}</cite>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-lg font-orbitron">NO FAVORITES STORED</p>
              <p className="text-white/50 font-orbitron">MARK RESPONSES FOR QUICK ACCESS</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};