
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Mock data for the bot's performance
const performanceData = [
  { month: 'Aug', value: 4000 },
  { month: 'Sep', value: 3000 },
  { month: 'Oct', value: 2000 },
  { month: 'Nov', value: 2780 },
  { month: 'Dec', value: 1890 },
  { month: 'Jan', value: 2390 },
  { month: 'Feb', value: 3490 },
];

const allocations = [
  { name: 'Energy', value: 30, color: '#0284c7' },
  { name: 'Banking', value: 25, color: '#0369a1' },
  { name: 'Cement', value: 20, color: '#0ea5e9' },
  { name: 'Fertilizer', value: 15, color: '#38bdf8' },
  { name: 'Other', value: 10, color: '#7dd3fc' },
];

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 bg-white dark:bg-gray-800 shadow rounded border border-gray-200 dark:border-gray-700">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-psx-blue-600 dark:text-psx-blue-400">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const CustomLineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 bg-white dark:bg-gray-800 shadow rounded border border-gray-200 dark:border-gray-700">
        <p className="font-medium">{label}</p>
        <p className="text-psx-blue-600 dark:text-psx-blue-400">
          PKR {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const BotPerformance = () => {
  return (
    <Card className="w-full glass-card overflow-hidden animate-scale-in animation-delay-200">
      <CardHeader className="pb-2">
        <CardTitle>Bot Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="h-60 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip content={<CustomLineTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2, fill: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="px-4 pb-4 grid grid-cols-3 gap-4">
              <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="text-sm text-muted-foreground">Total Profit</div>
                <div className="text-xl font-bold text-psx-green-600">+12.6%</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="text-sm text-muted-foreground">Win Rate</div>
                <div className="text-xl font-bold">68%</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="text-sm text-muted-foreground">Total Trades</div>
                <div className="text-xl font-bold">42</div>
              </div>
            </div>
          </div>
          
          <div className="md:border-l border-gray-100 dark:border-gray-800 pl-0 md:pl-4 pt-4">
            <div className="text-sm font-medium mb-2 text-center">Portfolio Allocation</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocations}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {allocations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 px-4">
              {allocations.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <div className="font-medium">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotPerformance;
