import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CheckInStatusBar = ({ 
  isActive = false,
  venueName = '',
  checkInTime = null,
  duration = 0, // in minutes
  remainingTime = 0, // in minutes
  onExtendSession = () => {},
  onEndSession = () => {},
  onViewDetails = () => {},
  isCollapsed = false 
}) => {
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    setTimeLeft(remainingTime);
  }, [remainingTime]);

  if (!isActive) return null;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatCheckInTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp)?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusColor = () => {
    if (timeLeft <= 15) return 'bg-error text-error-foreground';
    if (timeLeft <= 60) return 'bg-warning text-warning-foreground';
    return 'bg-success text-success-foreground';
  };

  const getProgressPercentage = () => {
    if (duration <= 0) return 0;
    return Math.max(0, Math.min(100, ((duration - timeLeft) / duration) * 100));
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-card border-b border-border shadow-soft">
      {/* Mobile Collapsed View */}
      <div className="md:hidden">
        <div 
          className="flex items-center justify-between px-4 py-3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()?.split(' ')?.[0]} animate-pulse-soft`} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground truncate max-w-32">
                {venueName}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTime(timeLeft)} left
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor()}`}>
              Active
            </span>
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              color="currentColor" 
            />
          </div>
        </div>

        {/* Mobile Expanded View */}
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between pt-3 mb-3">
              <div className="text-sm text-muted-foreground">
                Checked in at {formatCheckInTime(checkInTime)}
              </div>
              <div className="text-sm font-mono text-foreground">
                {formatTime(timeLeft)} remaining
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-3 overflow-hidden">
              <div 
                className={`h-full transition-smooth-large ${getStatusColor()?.split(' ')?.[0]}`}
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onExtendSession}
                iconName="Plus"
                iconPosition="left"
                className="flex-1"
              >
                Extend
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onViewDetails}
                iconName="Eye"
                iconPosition="left"
                className="flex-1"
              >
                Details
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onEndSession}
                iconName="LogOut"
                iconPosition="left"
                className="flex-1"
              >
                End
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()?.split(' ')?.[0]} animate-pulse-soft`} />
          
          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                Active Session
              </span>
              <span className="text-xs text-muted-foreground">
                {venueName}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} color="currentColor" />
                <span className="text-muted-foreground">
                  Started {formatCheckInTime(checkInTime)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Timer" size={14} color="currentColor" />
                <span className="font-mono text-foreground">
                  {formatTime(timeLeft)} left
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-xs mx-6">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-smooth-large ${getStatusColor()?.split(' ')?.[0]}`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onExtendSession}
            iconName="Plus"
            iconPosition="left"
          >
            Extend
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
            iconName="Eye"
            iconPosition="left"
          >
            Details
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={onEndSession}
            iconName="LogOut"
            iconPosition="left"
          >
            End Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckInStatusBar;