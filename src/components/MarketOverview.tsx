
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";

const MarketOverview = () => {
  const marketStatus = {
    status: "open",
    message: "Pakistan Stock Exchange - Open",
    nextHoliday: "August 14 - Independence Day",
    timestamp: "Last updated 5 minutes ago",
  };

  // Market data
  const indices = [
    { 
      name: "KSE-100", 
      value: 66942.25, 
      change: 542.18, 
      percent: 0.81, 
      trend: "up" 
    },
    { 
      name: "KSE-30", 
      value: 23584.71, 
      change: 187.32, 
      percent: 0.8, 
      trend: "up" 
    },
    { 
      name: "KMI-30", 
      value: 108564.91, 
      change: -324.75, 
      percent: -0.3, 
      trend: "down" 
    },
  ];

  const marketStats = [
    { label: "Volume", value: "325.6M" },
    { label: "Turnover", value: "PKR 12.3B" },
    { label: "Market Cap", value: "PKR 9.2T" },
  ];

  return (
    <Card className="w-full glass-card animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Market Overview</CardTitle>
          <div className="flex items-center space-x-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              marketStatus.status === "open" 
                ? "bg-psx-green-100 text-psx-green-800" 
                : "bg-psx-red-100 text-psx-red-800"
            }`}>
              <span className={`w-2 h-2 rounded-full mr-1.5 ${
                marketStatus.status === "open" ? "bg-psx-green-600" : "bg-psx-red-600"
              }`}></span>
              {marketStatus.status === "open" ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Market Indices */}
          <div className="space-y-3">
            {indices.map((index, i) => (
              <div key={i} className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div className="flex items-center">
                  <div className={`p-1.5 rounded-md mr-2 ${
                    index.trend === "up" ? "bg-psx-green-100 text-psx-green-600" : "bg-psx-red-100 text-psx-red-600"
                  }`}>
                    {index.trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  </div>
                  <div>
                    <div className="font-medium">{index.name}</div>
                    <div className="text-sm text-muted-foreground">{index.value.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center ${
                    index.trend === "up" ? "text-psx-green-600" : "text-psx-red-600"
                  }`}>
                    {index.trend === "up" ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                    {index.trend === "up" ? "+" : ""}{index.change.toFixed(2)}
                  </div>
                  <div className={`text-xs ${
                    index.trend === "up" ? "text-psx-green-600" : "text-psx-red-600"
                  }`}>
                    {index.trend === "up" ? "+" : ""}{index.percent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Market Stats */}
          <div className="space-y-3">
            {marketStats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="font-medium">{stat.value}</div>
              </div>
            ))}
            <div className="flex items-center text-amber-600 text-xs pt-1">
              <AlertTriangle size={14} className="mr-1" />
              <span>Next holiday: {marketStatus.nextHoliday}</span>
            </div>
          </div>
          
          {/* Top Movers */}
          <div className="space-y-3">
            <div className="font-medium mb-1">Top Movers</div>
            {[
              { symbol: "OGDC", name: "Oil & Gas Development", change: 3.25 },
              { symbol: "LUCK", name: "Lucky Cement", change: 2.54 },
              { symbol: "PSO", name: "Pakistan State Oil", change: -2.10 },
            ].map((stock, i) => (
              <div key={i} className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div>
                  <div className="font-medium">{stock.symbol}</div>
                  <div className="text-xs text-muted-foreground">{stock.name}</div>
                </div>
                <div className={`${stock.change >= 0 ? "text-psx-green-600" : "text-psx-red-600"} font-medium`}>
                  {stock.change >= 0 ? "+" : ""}{stock.change}%
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-4">
          {marketStatus.timestamp}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
