export interface Blessing {
  id: string;
  text: string;
  author?: string;
  category: BlessingCategory;
  tags?: string[];
}

export type BlessingCategory = 'all' | 'love' | 'wisdom' | 'health' | 'success' | 'peace' | 'gratitude';

export interface HistoryItem {
  id: string;
  wish: string;
  blessing: Blessing;
  timestamp: string;
}

export interface CategoryInfo {
  id: BlessingCategory;
  name: string;
  icon: string;
  description: string;
}