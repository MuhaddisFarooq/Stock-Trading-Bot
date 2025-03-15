
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Bot, Activity, TrendingUp, AlertTriangle, Play, Pause } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const TradingBot = () => {
  const { toast } = useToast();
  const [botActive, setBotActive] = useState(false);
  const [strategy, setStrategy] = useState('trend');
  const [botInterval, setBotInterval] = useState(15);
  const [riskLevel, setRiskLevel] = useState([50]);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  
  const toggleBot = () => {
    const newState = !botActive;
    setBotActive(newState);
    
    toast({
      title: newState ? "Trading Bot Activated" : "Trading Bot Deactivated",
      description: newState 
        ? "The bot will now execute trades based on your strategy settings." 
        : "The bot has been paused and will not execute any new trades.",
      variant: newState ? "default" : "destructive",
    });
  };
  
  const handleStrategyChange = (value: string) => {
    setStrategy(value);
    toast({
      title: "Strategy Updated",
      description: `Your bot will now use the ${value.charAt(0).toUpperCase() + value.slice(1)} strategy.`,
    });
  };

  return (
    <Card className="w-full glass-card mb-6 animate-scale-in animation-delay-100">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-md ${botActive ? 'bg-psx-green-100 text-psx-green-600' : 'bg-gray-100 text-gray-500'}`}>
              <Bot size={18} />
            </div>
            <CardTitle>Trading Bot</CardTitle>
          </div>
          <Button 
            onClick={toggleBot}
            variant={botActive ? "destructive" : "default"}
            size="sm"
            className="gap-1"
          >
            {botActive ? <Pause size={14} /> : <Play size={14} />}
            {botActive ? "Stop Bot" : "Start Bot"}
          </Button>
        </div>
        <CardDescription>
          Configure your automated trading strategy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="config" className="space-y-4 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium leading-none">
                    Trading Strategy
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertTriangle size={14} className="text-amber-500 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-[200px]">
                          This strategy determines how the bot will decide when to buy or sell assets.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={strategy} onValueChange={handleStrategyChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trend">Trend Following</SelectItem>
                    <SelectItem value="momentum">Momentum</SelectItem>
                    <SelectItem value="meanReversion">Mean Reversion</SelectItem>
                    <SelectItem value="breakout">Breakout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Checking Interval (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <Select value={botInterval.toString()} onValueChange={(v) => setBotInterval(Number(v))}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none flex justify-between">
                  Risk Level
                  <span className="text-muted-foreground">{riskLevel[0]}%</span>
                </label>
                <Slider
                  value={riskLevel}
                  min={10}
                  max={90}
                  step={10}
                  onValueChange={setRiskLevel}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conservative</span>
                  <span>Aggressive</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-2 pt-2">
                <div className="flex-grow">
                  <label className="text-sm font-medium leading-none">
                    Alert Notifications
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Receive alerts when the bot executes trades
                  </p>
                </div>
                <Switch 
                  checked={alertsEnabled} 
                  onCheckedChange={setAlertsEnabled} 
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="animate-fade-in">
            <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2">
              {[
                { time: '11:32:45', action: 'Buy', symbol: 'OGDC', price: 86.75, shares: 150 },
                { time: '10:15:22', action: 'Buy', symbol: 'LUCK', price: 592.50, shares: 25 },
                { time: '09:45:10', action: 'Sell', symbol: 'PSO', price: 193.25, shares: 100 },
                { time: '09:30:05', action: 'Strategy Change', details: 'Switched to Momentum' },
                { time: 'Yesterday', action: 'Bot Started', details: 'Risk Level: 40%' }
              ].map((log, index) => (
                <div key={index} className="border-b border-gray-100 dark:border-gray-800 pb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${
                      log.action === 'Buy' ? 'bg-psx-green-100 text-psx-green-600' : 
                      log.action === 'Sell' ? 'bg-psx-red-100 text-psx-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {log.action === 'Buy' || log.action === 'Sell' ? 
                        <TrendingUp size={14} /> : 
                        <Activity size={14} />
                      }
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{log.action}</span>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                      {log.symbol ? (
                        <div className="text-sm">
                          {log.symbol} • {log.shares} shares {log.action === 'Buy' ? 'at' : 'for'} PKR {log.price}
                        </div>
                      ) : (
                        <div className="text-sm">{log.details}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TradingBot;
