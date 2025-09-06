import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueChart = () => {
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('week');

  const weeklyData = [
    { name: 'Mon', revenue: 8500, checkIns: 18 },
    { name: 'Tue', revenue: 9200, checkIns: 22 },
    { name: 'Wed', revenue: 7800, checkIns: 16 },
    { name: 'Thu', revenue: 10500, checkIns: 25 },
    { name: 'Fri', revenue: 12200, checkIns: 28 },
    { name: 'Sat', revenue: 6800, checkIns: 14 },
    { name: 'Sun', revenue: 5400, checkIns: 12 }
  ];

  const monthlyData = [
    { name: 'Week 1', revenue: 52000, checkIns: 125 },
    { name: 'Week 2', revenue: 48500, checkIns: 118 },
    { name: 'Week 3', revenue: 55200, checkIns: 132 },
    { name: 'Week 4', revenue: 61800, checkIns: 145 }
  ];

  const currentData = timeRange === 'week' ? weeklyData : monthlyData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-soft">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-success">
              Revenue: ₦{payload?.[0]?.value?.toLocaleString()}
            </p>
            <p className="text-sm text-primary">
              Check-ins: {payload?.[0]?.payload?.checkIns}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Revenue Analytics
          </h3>
          <p className="text-sm text-muted-foreground">
            Track your earnings and member activity
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={timeRange === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('week')}
              className="text-xs"
            >
              Week
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('month')}
              className="text-xs"
            >
              Month
            </Button>
          </div>
          
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setChartType('bar')}
              className={chartType === 'bar' ? 'bg-background' : ''}
            >
              <Icon name="BarChart3" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setChartType('line')}
              className={chartType === 'line' ? 'bg-background' : ''}
            >
              <Icon name="TrendingUp" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="h-80 w-full" aria-label="Revenue Analytics Chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `₦${(value / 1000)?.toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="revenue" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `₦${(value / 1000)?.toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Check-ins</span>
          </div>
        </div>
        
        <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
          Export
        </Button>
      </div>
    </div>
  );
};

export default RevenueChart;