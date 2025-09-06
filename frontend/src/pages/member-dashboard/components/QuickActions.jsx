import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction }) => {
  const quickActions = [
    {
      id: 'find-workspace',
      title: 'Find Workspace',
      description: 'Discover venues near you',
      icon: 'Search',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      action: () => onAction('find-workspace')
    },
    {
      id: 'quick-checkin',
      title: 'Quick Check-in',
      description: 'Check into favorite venue',
      icon: 'MapPin',
      color: 'bg-success',
      textColor: 'text-success-foreground',
      action: () => onAction('quick-checkin')
    },
    {
      id: 'view-bookings',
      title: 'My Bookings',
      description: 'Manage reservations',
      icon: 'Calendar',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      action: () => onAction('view-bookings')
    },
    {
      id: 'membership',
      title: 'Membership',
      description: 'View plan & benefits',
      icon: 'Crown',
      color: 'bg-warning',
      textColor: 'text-warning-foreground',
      action: () => onAction('membership')
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Quick Actions
          </h3>
          <p className="text-sm text-muted-foreground">
            Get things done faster
          </p>
        </div>
      </div>
      {/* Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className="group relative overflow-hidden rounded-lg border border-border hover:border-primary/20 transition-smooth p-4 text-left hover:shadow-soft-hover"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 ${action?.color} opacity-5 group-hover:opacity-10 transition-smooth`} />
            
            {/* Content */}
            <div className="relative">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${action?.color} ${action?.textColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={action?.icon} size={20} color="currentColor" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                    {action?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action?.description}
                  </p>
                </div>
                
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  color="var(--color-muted-foreground)" 
                  className="group-hover:text-primary transition-smooth" 
                />
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Additional Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction('support')}
            iconName="HelpCircle"
            iconPosition="left"
          >
            Help & Support
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction('feedback')}
            iconName="MessageSquare"
            iconPosition="left"
          >
            Send Feedback
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction('refer')}
            iconName="Users"
            iconPosition="left"
          >
            Refer Friends
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;