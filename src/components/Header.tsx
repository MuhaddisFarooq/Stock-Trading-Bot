
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Bell, ChevronDown, Settings, Moon, Sun } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 glass-panel px-4 py-3 border-b shadow-sm animate-fade-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-psx-blue-600 to-psx-blue-400 flex items-center justify-center shadow-sm">
              <span className="font-bold text-white">PSX</span>
            </div>
            <h1 className="ml-3 text-xl font-semibold text-psx-blue-800 dark:text-psx-blue-200">
              TradingBot
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="rounded-lg text-sm font-medium">Dashboard</Button>
            <Button variant="ghost" className="rounded-lg text-sm font-medium">Markets</Button>
            <Button variant="ghost" className="rounded-lg text-sm font-medium">My Bots</Button>
            <Button variant="ghost" className="rounded-lg text-sm font-medium">Reports</Button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <Bell size={18} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-psx-red-500"></span>
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-psx-blue-100 flex items-center justify-center text-psx-blue-700 font-medium">
                  A
                </div>
                <ChevronDown size={16} className="ml-1 text-gray-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <Settings size={16} className="mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-psx-red-600 dark:text-psx-red-400">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
