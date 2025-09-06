import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities, onViewAll }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      'check-in': 'MapPin',
      'check-out': 'LogOut',
      'favorite': 'Heart',
      'review': 'Star',
      'booking': 'Calendar',
      'badge': 'Award'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'check-in': 'text-success',
      'check-out': 'text-muted-foreground',
      'favorite': 'text-error',
      'review': 'text-warning',
      'booking': 'text-primary',
      'badge': 'text-accent'
    };
    return colorMap?.[type] || 'text-muted-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return activityTime?.toLocaleDateString('en-GB');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Recent Activity
            </h3>
            <p className="text-sm text-muted-foreground">
              Your workspace journey
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {/* Activity List */}
      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Calendar" size={24} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-muted-foreground">
              No recent activity yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Start exploring workspaces to see your activity here
            </p>
          </div>
        ) : (
          activities?.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
            >
              {/* Activity Icon */}
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon 
                  name={getActivityIcon(activity?.type)} 
                  size={14} 
                  color="currentColor" 
                />
              </div>

              {/* Activity Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity?.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity?.description}
                    </p>
                    
                    {/* Additional Info */}
                    {activity?.venue && (
                      <div className="flex items-center space-x-2 mt-1">
                        <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                        <span className="text-xs text-muted-foreground">
                          {activity?.venue}
                        </span>
                      </div>
                    )}
                    
                    {activity?.duration && (
                      <div className="flex items-center space-x-2 mt-1">
                        <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                        <span className="text-xs text-muted-foreground">
                          {activity?.duration}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Quick Actions */}
      {activities?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MapPin"
              iconPosition="left"
            >
              Check In Again
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Star"
              iconPosition="left"
            >
              Leave Review
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
            >
              Share Experience
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;