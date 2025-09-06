import React from 'react';
import Icon from '../AppIcon';

const VenueStatusIndicator = ({ 
  status = 'available', 
  capacity = 0, 
  maxCapacity = 100, 
  lastUpdated = null,
  size = 'default',
  showCapacity = true,
  showLastUpdated = false 
}) => {
  const getStatusConfig = () => {
    const occupancyRate = maxCapacity > 0 ? (capacity / maxCapacity) * 100 : 0;
    
    switch (status) {
      case 'available':
        if (occupancyRate < 50) {
          return {
            color: 'text-success',
            bgColor: 'bg-success/10',
            borderColor: 'border-success/20',
            icon: 'CheckCircle',
            label: 'Available',
            pulse: false
          };
        } else if (occupancyRate < 80) {
          return {
            color: 'text-warning',
            bgColor: 'bg-warning/10',
            borderColor: 'border-warning/20',
            icon: 'Clock',
            label: 'Limited',
            pulse: false
          };
        } else {
          return {
            color: 'text-accent',
            bgColor: 'bg-accent/10',
            borderColor: 'border-accent/20',
            icon: 'Users',
            label: 'Nearly Full',
            pulse: false
          };
        }
      case 'busy':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          icon: 'Clock',
          label: 'Busy',
          pulse: true
        };
      case 'full':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          icon: 'XCircle',
          label: 'Full',
          pulse: false
        };
      case 'closed':
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-muted-foreground/20',
          icon: 'Moon',
          label: 'Closed',
          pulse: false
        };
      case 'maintenance':
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-muted-foreground/20',
          icon: 'Wrench',
          label: 'Maintenance',
          pulse: false
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-muted-foreground/20',
          icon: 'HelpCircle',
          label: 'Unknown',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();
  const occupancyRate = maxCapacity > 0 ? (capacity / maxCapacity) * 100 : 0;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'px-2 py-1 text-xs',
          icon: 12,
          spacing: 'space-x-1'
        };
      case 'lg':
        return {
          container: 'px-4 py-2 text-base',
          icon: 20,
          spacing: 'space-x-3'
        };
      default:
        return {
          container: 'px-3 py-1.5 text-sm',
          icon: 16,
          spacing: 'space-x-2'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const updated = new Date(timestamp);
    const diffInMinutes = Math.floor((now - updated) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return updated?.toLocaleDateString();
  };

  return (
    <div className="flex flex-col space-y-1">
      {/* Main Status Indicator */}
      <div 
        className={`
          inline-flex items-center rounded-lg border font-medium
          ${config?.bgColor} ${config?.borderColor} ${config?.color}
          ${sizeClasses?.container} ${sizeClasses?.spacing}
          ${config?.pulse ? 'animate-pulse-soft' : ''}
          transition-smooth
        `}
      >
        <Icon 
          name={config?.icon} 
          size={sizeClasses?.icon} 
          color="currentColor" 
        />
        <span>{config?.label}</span>
        
        {showCapacity && status !== 'closed' && status !== 'maintenance' && (
          <span className="font-mono text-xs opacity-75">
            {capacity}/{maxCapacity}
          </span>
        )}
      </div>
      {/* Capacity Bar */}
      {showCapacity && status !== 'closed' && status !== 'maintenance' && size !== 'sm' && (
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div 
            className={`h-full transition-smooth-large ${
              occupancyRate < 50 ? 'bg-success' :
              occupancyRate < 80 ? 'bg-warning' : 'bg-accent'
            }`}
            style={{ width: `${Math.min(occupancyRate, 100)}%` }}
          />
        </div>
      )}
      {/* Last Updated */}
      {showLastUpdated && lastUpdated && size !== 'sm' && (
        <span className="text-xs text-muted-foreground font-caption">
          Updated {formatLastUpdated(lastUpdated)}
        </span>
      )}
    </div>
  );
};

export default VenueStatusIndicator;