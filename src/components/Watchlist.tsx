
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Star, MoreHorizontal, Eye, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const Watchlist = () => {
  const { toast } = useToast();
  const [watchlist, setWatchlist] = useState([
    { symbol: "OGDC", name: "Oil & Gas Development", price: 86.75, change: 3.25, isFavorite: true },
    { symbol: "LUCK", name: "Lucky Cement", price: 592.50, change: 2.54, isFavorite: false },
    { symbol: "PSO", name: "Pakistan State Oil", price: 193.25, change: -2.10, isFavorite: false },
    { symbol: "EFERT", name: "Engro Fertilizers", price: 108.70, change: 0.50, isFavorite: true },
    { symbol: "MARI", name: "Mari Petroleum", price: 1587.50, change: 5.20, isFavorite: false },
  ]);
  
  const toggleFavorite = (symbol: string) => {
    setWatchlist(watchlist.map(stock => 
      stock.symbol === symbol 
        ? { ...stock, isFavorite: !stock.isFavorite } 
        : stock
    ));
    
    const stock = watchlist.find(s => s.symbol === symbol);
    if (stock) {
      toast({
        title: stock.isFavorite ? "Removed from Favorites" : "Added to Favorites",
        description: `${symbol} has been ${stock.isFavorite ? "removed from" : "added to"} your favorites.`,
      });
    }
  };
  
  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
    toast({
      title: "Removed from Watchlist",
      description: `${symbol} has been removed from your watchlist.`,
    });
  };

  return (
    <Card className="w-full glass-card animate-scale-in animation-delay-300">
      <CardHeader className="pb-2">
        <CardTitle>My Watchlist</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {watchlist.map((stock, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${stock.isFavorite ? 'text-amber-500' : 'text-gray-400'}`}
                  onClick={() => toggleFavorite(stock.symbol)}
                >
                  <Star size={16} fill={stock.isFavorite ? "currentColor" : "none"} />
                </Button>
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-medium">{stock.price}</div>
                  <div className={`flex items-center justify-end text-sm ${
                    stock.change >= 0 ? "text-psx-green-600" : "text-psx-red-600"
                  }`}>
                    {stock.change >= 0 ? (
                      <ArrowUpRight size={14} className="mr-1" />
                    ) : (
                      <ArrowDownRight size={14} className="mr-1" />
                    )}
                    {stock.change >= 0 ? "+" : ""}{stock.change}%
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      <Eye size={14} className="mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Share2 size={14} className="mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer text-psx-red-600"
                      onClick={() => removeFromWatchlist(stock.symbol)}
                    >
                      <Trash2 size={14} className="mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        
        {watchlist.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">Your watchlist is empty</p>
            <Button variant="outline" className="mt-2">
              Add Stocks
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Watchlist;
