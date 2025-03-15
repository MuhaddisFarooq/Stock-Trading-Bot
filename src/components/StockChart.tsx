
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data generator
const generateStockData = (days: number, trend: 'up' | 'down' | 'volatile') => {
  const data = [];
  let baseValue = 220;
  
  for (let i = 0; i < days; i++) {
    let change = 0;
    
    if (trend === 'up') {
      change = Math.random() * 5 - 1; // More likely to go up
    } else if (trend === 'down') {
      change = Math.random() * 5 - 4; // More likely to go down
    } else {
      change = Math.random() * 10 - 5; // Volatile
    }
    
    // Generate some pattern
    const pattern = Math.sin(i / 5) * 3;
    
    baseValue += change + pattern;
    if (baseValue < 50) baseValue = 50;
    
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(baseValue * 100) / 100,
      fullDate: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
  }
  
  return data;
};

interface StockChartProps {
  symbol?: string;
  name?: string;
  initialTrend?: 'up' | 'down' | 'volatile';
}

const StockChart: React.FC<StockChartProps> = ({ 
  symbol = "KSE-100", 
  name = "KSE 100 Index", 
  initialTrend = 'up' 
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const days = 
        timeframe === '1D' ? 1 : 
        timeframe === '1W' ? 7 : 
        timeframe === '1M' ? 30 : 
        timeframe === '3M' ? 90 : 
        365;
      setData(generateStockData(days, initialTrend));
      setIsLoading(false);
    }, 600);
  }, [timeframe, initialTrend]);
  
  // Calculate change
  const firstValue = data[0]?.value || 0;
  const lastValue = data[data.length - 1]?.value || 0;
  const change = lastValue - firstValue;
  const percentChange = ((change / firstValue) * 100).toFixed(2);
  const isPositive = change >= 0;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white dark:bg-gray-800 shadow rounded-md border border-gray-100 dark:border-gray-700">
          <p className="font-medium">{payload[0].payload.fullDate}</p>
          <p className="text-sm">
            <span className="font-medium">Price:</span>{' '}
            <span className="text-psx-blue-600 dark:text-psx-blue-400">{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full glass-card border animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              {symbol}
            </div>
            <CardTitle className="text-xl">{name}</CardTitle>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{lastValue.toLocaleString()}</div>
            <div className={`text-sm font-medium ${isPositive ? 'text-psx-green-600 dark:text-psx-green-500' : 'text-psx-red-600 dark:text-psx-red-500'}`}>
              {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{percentChange}%)
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div className="pl-4 pb-2 pt-1 flex space-x-1">
          {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
            <Button 
              key={period}
              variant={timeframe === period ? "default" : "ghost"} 
              size="sm"
              className={`h-7 text-xs px-2 rounded-md ${timeframe === period ? '' : 'text-muted-foreground'}`}
              onClick={() => setTimeframe(period as any)}
            >
              {period}
            </Button>
          ))}
        </div>
        
        <div className={`w-full h-[220px] transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{fontSize: 10}}
                tickMargin={8}
                minTickGap={10}
              />
              <YAxis 
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tick={{fontSize: 10}}
                tickMargin={8}
                width={40}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={isPositive ? "#16a34a" : "#dc2626"} 
                strokeWidth={2}
                fill="url(#colorValue)" 
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
