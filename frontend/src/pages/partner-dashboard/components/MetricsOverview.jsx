import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = ({ metrics = {} }) => {
  const defaultMetrics = {
    dailyCheckIns: 24,
    weeklyRevenue: 45600,
    averageRating: 4.7,
    capacityUtilization: 78,
    totalMembers: 156,
    monthlyGrowth: 12.5,
    ...metrics
  };

  const metricCards = [
    {
      id: 'checkins',
      title: 'Daily Check-ins',
      value: defaultMetrics?.dailyCheckIns,
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'revenue',
      title: 'Weekly Revenue',
      value: `₦${defaultMetrics?.weeklyRevenue?.toLocaleString()}`,
      change: '+15.3%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'rating',
      title: 'Average Rating',
      value: defaultMetrics?.averageRating?.toFixed(1),
      change: '+0.2',
      changeType: 'positive',
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'utilization',
      title: 'Capacity Utilization',
      value: `${defaultMetrics?.capacityUtilization}%`,
      change: '+5.1%',
      changeType: 'positive',
      icon: 'BarChart3',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricCards?.map((metric) => (
        <div
          key={metric?.id}
          className="bg-card rounded-lg border border-border p-6 shadow-soft hover:shadow-soft-hover transition-smooth"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${metric?.bgColor}`}>
              <Icon 
                name={metric?.icon} 
                size={24} 
                color={metric?.color?.replace('text-', 'var(--color-')} 
              />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              metric?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={metric?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{metric?.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">
              {metric?.value}
            </h3>
            <p className="text-sm text-muted-foreground">
              {metric?.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;