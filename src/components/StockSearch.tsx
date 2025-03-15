
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Star, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const stockList = [
  { symbol: "OGDC", name: "Oil & Gas Development Company Ltd", price: 86.75, change: 3.25 },
  { symbol: "PPL", name: "Pakistan Petroleum Limited", price: 72.90, change: 1.20 },
  { symbol: "LUCK", name: "Lucky Cement Limited", price: 592.50, change: 2.54 },
  { symbol: "MCB", name: "MCB Bank Limited", price: 128.40, change: 0.75 },
  { symbol: "PSO", name: "Pakistan State Oil Company Limited", price: 193.25, change: -2.10 },
  { symbol: "ENGRO", name: "Engro Corporation Limited", price: 282.30, change: 0.90 },
  { symbol: "HBL", name: "Habib Bank Limited", price: 76.10, change: -1.40 },
  { symbol: "EFERT", name: "Engro Fertilizers Limited", price: 108.70, change: 0.50 },
  { symbol: "UBL", name: "United Bank Limited", price: 125.80, change: -0.30 },
  { symbol: "MARI", name: "Mari Petroleum Company Limited", price: 1587.50, change: 5.20 },
];

const StockSearch = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof stockList>([]);
  const [showResults, setShowResults] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    const results = stockList.filter(
      (stock) => 
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    setShowResults(true);
  };
  
  const handleAddToWatchlist = (symbol: string) => {
    toast({
      title: "Added to Watchlist",
      description: `${symbol} has been added to your watchlist.`,
    });
  };

  return (
    <div className="w-full relative animate-scale-in animation-delay-200">
      <form onSubmit={handleSearch} className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for symbols or companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-11 glass-panel"
        />
        <Button 
          type="submit" 
          variant="ghost" 
          size="sm" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          Search
        </Button>
      </form>
      
      {showResults && searchResults.length > 0 && (
        <Card className="absolute w-full mt-2 z-10 glass-card border shadow-lg animate-slide-down animation-delay-100">
          <CardContent className="p-2">
            {searchResults.map((stock, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${
                    stock.change >= 0 ? "bg-psx-green-100" : "bg-psx-red-100"
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp size={14} className="text-psx-green-600" />
                    ) : (
                      <TrendingDown size={14} className="text-psx-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {stock.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-medium">{stock.price}</div>
                    <div className={`text-xs ${
                      stock.change >= 0 ? "text-psx-green-600" : "text-psx-red-600"
                    }`}>
                      {stock.change >= 0 ? "+" : ""}{stock.change}%
                    </div>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full"
                    onClick={() => handleAddToWatchlist(stock.symbol)}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      {showResults && searchResults.length === 0 && (
        <Card className="absolute w-full mt-2 z-10 glass-card border shadow-lg animate-fade-in">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No stocks found matching "{searchQuery}"</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StockSearch;
