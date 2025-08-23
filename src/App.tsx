import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WishForm } from './components/WishForm';
import { BlessingCard } from './components/BlessingCard';
import { CategoryTabs } from './components/CategoryTabs';
import { BlessingHistory } from './components/BlessingHistory';
import { DailyBlessing } from './components/DailyBlessing';
import { blessings } from './data/blessings';
import { Blessing, BlessingCategory, HistoryItem } from './types/blessing';

function App() {
  const [currentBlessing, setCurrentBlessing] = useState<Blessing | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BlessingCategory>('all');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<Blessing[]>([]);
  const [activeView, setActiveView] = useState<'main' | 'history' | 'daily'>('main');
  const [isLoading, setIsLoading] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('blessings-history');
    const savedFavorites = localStorage.getItem('blessings-favorites');
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save to localStorage when history or favorites change
  useEffect(() => {
    localStorage.setItem('blessings-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('blessings-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const getRandomBlessing = (category: BlessingCategory = 'all'): Blessing => {
    let availableBlessings = blessings;
    
    if (category !== 'all') {
      availableBlessings = blessings.filter(blessing => blessing.category === category);
    }
    
    const randomIndex = Math.floor(Math.random() * availableBlessings.length);
    return availableBlessings[randomIndex];
  };

  const handleWishSubmit = async (wish: string) => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const blessing = getRandomBlessing(selectedCategory);
    setCurrentBlessing(blessing);
    
    // Add to history
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      wish,
      blessing,
      timestamp: new Date().toISOString(),
    };
    
    setHistory(prev => [historyItem, ...prev.slice(0, 49)]); // Keep last 50 items
    setIsLoading(false);
  };

  const handleFavoriteToggle = (blessing: Blessing) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === blessing.id);
      if (exists) {
        return prev.filter(fav => fav.id !== blessing.id);
      } else {
        return [...prev, blessing];
      }
    });
  };

  const isFavorited = (blessing: Blessing) => {
    return favorites.some(fav => fav.id === blessing.id);
  };

  return (
    <div className="min-h-screen bg-black text-white font-orbitron">
      {/* Circuit pattern overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="flex">
        <Header 
          activeView={activeView} 
          onViewChange={setActiveView}
          historyCount={history.length}
          favoritesCount={favorites.length}
        />
        
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            {activeView === 'main' && (
              <>
                <div className="text-center mb-12">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white font-orbitron tracking-wider">
                    BOOK OF BLESSINGS
                  </h1>
                  <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-orbitron">
                    ADVANCED NEURAL NETWORK FOR WISDOM DISTRIBUTION. INPUT YOUR PARAMETERS 
                    AND RECEIVE OPTIMIZED GUIDANCE PROTOCOLS FROM THE DIGITAL CONSCIOUSNESS.
                  </p>
                </div>

                <CategoryTabs 
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <WishForm 
                    onSubmit={handleWishSubmit}
                    isLoading={isLoading}
                    selectedCategory={selectedCategory}
                  />
                  
                  <BlessingCard 
                    blessing={currentBlessing}
                    isLoading={isLoading}
                    onFavoriteToggle={handleFavoriteToggle}
                    isFavorited={currentBlessing ? isFavorited(currentBlessing) : false}
                  />
                </div>
              </>
            )}

            {activeView === 'history' && (
              <BlessingHistory 
                history={history}
                favorites={favorites}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorited={isFavorited}
              />
            )}

            {activeView === 'daily' && (
              <DailyBlessing 
                onFavoriteToggle={handleFavoriteToggle}
                isFavorited={isFavorited}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;