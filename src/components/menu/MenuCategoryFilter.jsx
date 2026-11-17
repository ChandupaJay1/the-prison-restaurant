import React from 'react';
import { Search, CheckCircle2 } from 'lucide-react';
import { MENU_CATEGORIES } from '../../data/menuData';

export default function MenuCategoryFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  showOnlyVerified,
  onToggleVerified
}) {
  return (
    <div className="space-y-6 mb-12">
      {/* Search and Verified Toggle Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-prison-900/90 p-4 rounded-sm border border-prison-800">
        
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dishes (e.g. Biriyani, Burger, Parata, Kottu)..."
            className="w-full bg-prison-950 border border-prison-700/80 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-prison-gold focus:ring-1 focus:ring-prison-gold transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Only Verified Prices Toggle */}
        <button
          type="button"
          onClick={onToggleVerified}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all border ${
            showOnlyVerified
              ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-sm'
              : 'bg-prison-950 text-slate-400 border-prison-800 hover:border-prison-700'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${showOnlyVerified ? 'text-emerald-400' : 'text-slate-500'}`} />
          <span>Show Verified Prices Only</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                isActive
                  ? 'bg-prison-gold text-prison-950 border-prison-gold shadow-glow-gold'
                  : 'bg-prison-900/80 text-slate-300 border-prison-800 hover:bg-prison-850 hover:text-white hover:border-prison-700'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
