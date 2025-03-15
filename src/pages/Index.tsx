
import { useState } from 'react';
import Header from '@/components/Header';
import StockChart from '@/components/StockChart';
import TradingBot from '@/components/TradingBot';
import MarketOverview from '@/components/MarketOverview';
import StockSearch from '@/components/StockSearch';
import Watchlist from '@/components/Watchlist';
import BotPerformance from '@/components/BotPerformance';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900">
      <Header />
      
      <main className="pt-20 px-4 pb-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* Search Bar */}
          <div className="mt-2">
            <StockSearch />
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <StockChart />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TradingBot />
                <MarketOverview />
              </div>
              <BotPerformance />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <Watchlist />
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card border p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-psx-blue-600 to-psx-blue-400 mx-auto flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  </div>
                  <h3 className="font-medium text-sm">Market Hours</h3>
                  <p className="text-xs text-muted-foreground mt-1">9:30 AM - 3:30 PM</p>
                </div>
                <div className="glass-card border p-4 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-psx-green-600 to-psx-green-400 mx-auto flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 2v5"/><path d="M8 2v5"/><path d="M3 10h18"/></svg>
                  </div>
                  <h3 className="font-medium text-sm">Economic Calendar</h3>
                  <p className="text-xs text-muted-foreground mt-1">3 events today</p>
                </div>
              </div>
              
              {/* Recent News */}
              <div className="glass-card border rounded-xl p-4 animate-scale-in animation-delay-500">
                <h3 className="font-medium mb-3">Recent News</h3>
                <div className="space-y-3">
                  {[
                    { title: "PSX gains 542 points amid positive sentiment", time: "2 hours ago" },
                    { title: "SBP maintains policy rate at 22 percent", time: "4 hours ago" },
                    { title: "OGDC announces discovery of new oil reserves", time: "Yesterday" },
                  ].map((news, i) => (
                    <div key={i} className="border-b border-gray-100 dark:border-gray-800 pb-2 last:border-0">
                      <h4 className="text-sm font-medium">{news.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{news.time}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full text-center text-sm text-psx-blue-600 dark:text-psx-blue-400 mt-3 hover:underline">
                  View All News
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
