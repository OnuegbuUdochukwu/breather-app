import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const VenueStatusControls = ({ venue = {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [venueData, setVenueData] = useState({
    status: 'available',
    capacity: 45,
    currentOccupancy: 28,
    operatingHours: {
      open: '08:00',
      close: '22:00'
    },
    specialOffers: 'Free coffee with 4+ hour sessions',
    ...venue
  });

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'busy', label: 'Busy' },
    { value: 'full', label: 'Full' },
    { value: 'closed', label: 'Closed' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving venue data:', venueData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success bg-success/10 border-success/20';
      case 'busy': return 'text-warning bg-warning/10 border-warning/20';
      case 'full': return 'text-error bg-error/10 border-error/20';
      case 'closed': return 'text-muted-foreground bg-muted border-muted-foreground/20';
      case 'maintenance': return 'text-muted-foreground bg-muted border-muted-foreground/20';
      default: return 'text-muted-foreground bg-muted border-muted-foreground/20';
    }
  };

  const occupancyPercentage = (venueData?.currentOccupancy / venueData?.capacity) * 100;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Venue Status Controls
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage your venue availability and settings
          </p>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Check"
              iconPosition="left"
            >
              Save
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Current Status */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1.5 rounded-lg border font-medium text-sm ${getStatusColor(venueData?.status)}`}>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={venueData?.status === 'available' ? 'CheckCircle' : 
                        venueData?.status === 'busy' ? 'Clock' :
                        venueData?.status === 'full' ? 'XCircle' :
                        venueData?.status === 'closed' ? 'Moon' : 'Wrench'} 
                  size={16} 
                />
                <span className="capitalize">{venueData?.status}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-semibold text-foreground">
              {venueData?.currentOccupancy}/{venueData?.capacity}
            </div>
            <div className="text-xs text-muted-foreground">Current capacity</div>
          </div>
        </div>

        {/* Capacity Utilization Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Capacity Utilization</span>
            <span className="font-medium text-foreground">{occupancyPercentage?.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-smooth-large ${
                occupancyPercentage < 50 ? 'bg-success' :
                occupancyPercentage < 80 ? 'bg-warning' : 'bg-accent'
              }`}
              style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Editable Controls */}
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Venue Status"
              options={statusOptions}
              value={venueData?.status}
              onChange={(value) => setVenueData(prev => ({ ...prev, status: value }))}
            />
            
            <Input
              label="Total Capacity"
              type="number"
              value={venueData?.capacity}
              onChange={(e) => setVenueData(prev => ({ ...prev, capacity: parseInt(e?.target?.value) }))}
              min="1"
              max="200"
            />
            
            <Input
              label="Opening Time"
              type="time"
              value={venueData?.operatingHours?.open}
              onChange={(e) => setVenueData(prev => ({ 
                ...prev, 
                operatingHours: { ...prev?.operatingHours, open: e?.target?.value }
              }))}
            />
            
            <Input
              label="Closing Time"
              type="time"
              value={venueData?.operatingHours?.close}
              onChange={(e) => setVenueData(prev => ({ 
                ...prev, 
                operatingHours: { ...prev?.operatingHours, close: e?.target?.value }
              }))}
            />
            
            <div className="md:col-span-2">
              <Input
                label="Special Offers"
                type="text"
                value={venueData?.specialOffers}
                onChange={(e) => setVenueData(prev => ({ ...prev, specialOffers: e?.target?.value }))}
                placeholder="Enter any special offers or promotions"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Operating Hours</label>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>{venueData?.operatingHours?.open} - {venueData?.operatingHours?.close}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Total Capacity</label>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} />
                <span>{venueData?.capacity} seats</span>
              </div>
            </div>
            
            {venueData?.specialOffers && (
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-medium text-foreground">Special Offers</label>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Gift" size={16} />
                  <span>{venueData?.specialOffers}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => console.log('Sync status')}
          >
            Sync Status
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Bell"
            iconPosition="left"
            onClick={() => console.log('Send notification')}
          >
            Notify Members
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            onClick={() => console.log('Advanced settings')}
          >
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VenueStatusControls;