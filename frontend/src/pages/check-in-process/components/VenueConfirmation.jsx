import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import VenueStatusIndicator from '../../../components/ui/VenueStatusIndicator';

const VenueConfirmation = ({ venue, onConfirm, onCancel }) => {
  const currentTime = new Date()?.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const currentDate = new Date()?.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft overflow-hidden">
      {/* Venue Header */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          src={venue?.image}
          alt={venue?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          <VenueStatusIndicator
            status={venue?.status}
            capacity={venue?.currentCapacity}
            maxCapacity={venue?.maxCapacity}
            size="sm"
          />
        </div>
        
        {/* Venue Name Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-semibold text-white mb-1">
            {venue?.name}
          </h2>
          <div className="flex items-center space-x-2 text-white/90">
            <Icon name="MapPin" size={14} />
            <span className="text-sm">{venue?.address}</span>
          </div>
        </div>
      </div>
      {/* Confirmation Details */}
      <div className="p-6 space-y-6">
        {/* Current Time & Date */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Check-in Time</p>
                <p className="text-xs text-muted-foreground">{currentDate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-mono font-semibold text-primary">{currentTime}</p>
              <p className="text-xs text-muted-foreground">Current time</p>
            </div>
          </div>
        </div>

        {/* Venue Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Venue Information</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="Wifi" size={16} color="var(--color-success)" />
              <span className="text-sm text-muted-foreground">Free Wi-Fi</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} color="var(--color-success)" />
              <span className="text-sm text-muted-foreground">Power Outlets</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Volume2" size={16} color="var(--color-warning)" />
              <span className="text-sm text-muted-foreground">Moderate Noise</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Coffee" size={16} color="var(--color-success)" />
              <span className="text-sm text-muted-foreground">Food & Drinks</span>
            </div>
          </div>
        </div>

        {/* Capacity Information */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Current Capacity</span>
            <span className="text-sm font-mono text-foreground">
              {venue?.currentCapacity}/{venue?.maxCapacity}
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-success transition-smooth-large"
              style={{ 
                width: `${Math.min((venue?.currentCapacity / venue?.maxCapacity) * 100, 100)}%` 
              }}
            />
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            {venue?.maxCapacity - venue?.currentCapacity} seats available
          </p>
        </div>

        {/* Operating Hours */}
        <div className="flex items-center justify-between py-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">Today's Hours</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            {venue?.operatingHours}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <Button
            variant="outline"
            onClick={onCancel}
            iconName="ArrowLeft"
            iconPosition="left"
            className="flex-1"
          >
            Back
          </Button>
          
          <Button
            variant="default"
            onClick={onConfirm}
            iconName="CheckCircle"
            iconPosition="left"
            className="flex-1"
          >
            Confirm Check-in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VenueConfirmation;