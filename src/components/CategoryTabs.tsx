import React from 'react';
import { Heart, Brain, Activity, Trophy, Leaf, Smile, Cpu } from 'lucide-react';
import { BlessingCategory } from '../types/blessing';

interface CategoryTabsProps {
  selectedCategory: BlessingCategory;
  onCategoryChange: (category: BlessingCategory) => void;
}

const categories = [
  { id: 'all' as const, name: 'ALL PROTOCOLS', icon: Cpu },
  { id: 'love' as const, name: 'EMOTION', icon: Heart },
  { id: 'wisdom' as const, name: 'KNOWLEDGE', icon: Brain },
  { id: 'health' as const, name: 'WELLNESS', icon: Activity },
  { id: 'success' as const, name: 'ACHIEVEMENT', icon: Trophy },
  { id: 'peace' as const, name: 'SERENITY', icon: Leaf },
  { id: 'gratitude' as const, name: 'APPRECIATION', icon: Smile },
];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all duration-300 font-orbitron font-bold tracking-wider text-sm ${
                isActive
                  ? 'bg-white/10 text-white border-white shadow-lg animate-pulse-glow'
                  : 'text-white/70 border-white/30 hover:bg-white/5 hover:text-white hover:border-white/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:block">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};