import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VenueAnalyticsPreview = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock analytics data
  const checkInData = [
    { day: 'Mon', checkIns: 45, revenue: 2250 },
    { day: 'Tue', checkIns: 52, revenue: 2600 },
    { day: 'Wed', checkIns: 38, revenue: 1900 },
    { day: 'Thu', checkIns: 61, revenue: 3050 },
    { day: 'Fri', checkIns: 73, revenue: 3650 },
    { day: 'Sat', checkIns: 89, revenue: 4450 },
    { day: 'Sun', checkIns: 67, revenue: 3350 }
  ];

  const hourlyData = [
    { hour: '8AM', occupancy: 15 },
    { hour: '9AM', occupancy: 25 },
    { hour: '10AM', occupancy: 35 },
    { hour: '11AM', occupancy: 42 },
    { hour: '12PM', occupancy: 38 },
    { hour: '1PM', occupancy: 28 },
    { hour: '2PM', occupancy: 45 },
    { hour: '3PM', occupancy: 52 },
    { hour: '4PM', occupancy: 48 },
    { hour: '5PM', occupancy: 35 },
    { hour: '6PM', occupancy: 25 },
    { hour: '7PM', occupancy: 18 }
  ];

  const memberTypeData = [
    { name: 'Regular Members', value: 65, color: 'var(--color-primary)' },
    { name: 'Premium Members', value: 25, color: 'var(--color-secondary)' },
    { name: 'Corporate Members', value: 10, color: 'var(--color-accent)' }
  ];

  const recentFeedback = [
    {
      id: 1,
      member: 'Sarah Johnson',
      rating: 5,
      comment: 'Great WiFi speed and comfortable seating. Perfect for remote work!',
      date: new Date(Date.now() - 86400000),
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 2,
      member: 'Michael Chen',
      rating: 4,
      comment: 'Good atmosphere but could use more power outlets near the window seats.',
      date: new Date(Date.now() - 172800000),
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 3,
      member: 'Emily Rodriguez',
      rating: 5,
      comment: 'Love the quiet zones! Excellent coffee and very productive environment.',
      date: new Date(Date.now() - 259200000),
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    })?.format(value);
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        color={i < rating ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Analytics Preview
            </h2>
            <p className="text-sm text-muted-foreground">
              Recent performance metrics and member feedback
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-1.5 border border-border rounded-lg text-sm bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="left"
          >
            Full Analytics
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Users" size={16} color="var(--color-primary)" />
            <span className="text-xs text-success">+12%</span>
          </div>
          <div className="text-2xl font-heading font-bold text-foreground mb-1">
            425
          </div>
          <div className="text-sm text-muted-foreground">
            Total Check-ins
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="DollarSign" size={16} color="var(--color-success)" />
            <span className="text-xs text-success">+8%</span>
          </div>
          <div className="text-2xl font-heading font-bold text-foreground mb-1">
            {formatCurrency(21250)}
          </div>
          <div className="text-sm text-muted-foreground">
            Revenue
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Clock" size={16} color="var(--color-warning)" />
            <span className="text-xs text-success">+5%</span>
          </div>
          <div className="text-2xl font-heading font-bold text-foreground mb-1">
            3.2h
          </div>
          <div className="text-sm text-muted-foreground">
            Avg. Session
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Star" size={16} color="var(--color-secondary)" />
            <span className="text-xs text-success">+0.2</span>
          </div>
          <div className="text-2xl font-heading font-bold text-foreground mb-1">
            4.7
          </div>
          <div className="text-sm text-muted-foreground">
            Avg. Rating
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Check-ins Chart */}
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground mb-4">
            Daily Check-ins
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={checkInData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="day" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="checkIns" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Occupancy */}
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground mb-4">
            Hourly Occupancy Pattern
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="hour" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="var(--color-accent)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Types */}
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground mb-4">
            Member Distribution
          </h3>
          <div className="h-64 flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={memberTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {memberTypeData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {memberTypeData?.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item?.color }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {item?.value}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item?.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Feedback */}
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground mb-4">
            Recent Member Feedback
          </h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {recentFeedback?.map((feedback) => (
              <div key={feedback?.id} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={feedback?.avatar}
                    alt={feedback?.member}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {feedback?.member}
                      </span>
                      <div className="flex items-center space-x-1">
                        {renderStars(feedback?.rating)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {feedback?.comment}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(feedback?.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="MessageSquare"
            iconPosition="left"
            className="mt-4"
          >
            View All Feedback
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Download"
            iconPosition="left"
          >
            Export Data
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
          >
            Schedule Report
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Settings"
            iconPosition="left"
          >
            Analytics Settings
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="TrendingUp"
            iconPosition="left"
          >
            Performance Tips
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VenueAnalyticsPreview;