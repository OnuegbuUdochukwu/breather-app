import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import VenueStatusIndicator from '../../../components/ui/VenueStatusIndicator';

const VenueCapacitySettings = ({ capacity = {}, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    totalSeats: capacity?.totalSeats || 50,
    currentOccupancy: capacity?.currentOccupancy || 15,
    peakHourLimit: capacity?.peakHourLimit || 40,
    reservableSeats: capacity?.reservableSeats || 10,
    walkInSeats: capacity?.walkInSeats || 40,
    autoStatusUpdate: capacity?.autoStatusUpdate || true,
    operatingHours: {
      monday: capacity?.operatingHours?.monday || { open: '08:00', close: '22:00', closed: false },
      tuesday: capacity?.operatingHours?.tuesday || { open: '08:00', close: '22:00', closed: false },
      wednesday: capacity?.operatingHours?.wednesday || { open: '08:00', close: '22:00', closed: false },
      thursday: capacity?.operatingHours?.thursday || { open: '08:00', close: '22:00', closed: false },
      friday: capacity?.operatingHours?.friday || { open: '08:00', close: '22:00', closed: false },
      saturday: capacity?.operatingHours?.saturday || { open: '09:00', close: '23:00', closed: false },
      sunday: capacity?.operatingHours?.sunday || { open: '09:00', close: '21:00', closed: false }
    }
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev?.operatingHours,
        [day]: {
          ...prev?.operatingHours?.[day],
          [field]: value
        }
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData?.totalSeats < 1) {
      newErrors.totalSeats = 'Total seats must be at least 1';
    }
    
    if (formData?.currentOccupancy < 0) {
      newErrors.currentOccupancy = 'Current occupancy cannot be negative';
    }
    
    if (formData?.currentOccupancy > formData?.totalSeats) {
      newErrors.currentOccupancy = 'Current occupancy cannot exceed total seats';
    }
    
    if (formData?.peakHourLimit > formData?.totalSeats) {
      newErrors.peakHourLimit = 'Peak hour limit cannot exceed total seats';
    }
    
    if (formData?.reservableSeats + formData?.walkInSeats !== formData?.totalSeats) {
      newErrors.reservableSeats = 'Reservable + Walk-in seats must equal total seats';
      newErrors.walkInSeats = 'Reservable + Walk-in seats must equal total seats';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      totalSeats: capacity?.totalSeats || 50,
      currentOccupancy: capacity?.currentOccupancy || 15,
      peakHourLimit: capacity?.peakHourLimit || 40,
      reservableSeats: capacity?.reservableSeats || 10,
      walkInSeats: capacity?.walkInSeats || 40,
      autoStatusUpdate: capacity?.autoStatusUpdate || true,
      operatingHours: {
        monday: capacity?.operatingHours?.monday || { open: '08:00', close: '22:00', closed: false },
        tuesday: capacity?.operatingHours?.tuesday || { open: '08:00', close: '22:00', closed: false },
        wednesday: capacity?.operatingHours?.wednesday || { open: '08:00', close: '22:00', closed: false },
        thursday: capacity?.operatingHours?.thursday || { open: '08:00', close: '22:00', closed: false },
        friday: capacity?.operatingHours?.friday || { open: '08:00', close: '22:00', closed: false },
        saturday: capacity?.operatingHours?.saturday || { open: '09:00', close: '23:00', closed: false },
        sunday: capacity?.operatingHours?.sunday || { open: '09:00', close: '21:00', closed: false }
      }
    });
    setErrors({});
    setIsEditing(false);
  };

  const getCurrentStatus = () => {
    const occupancyRate = (formData?.currentOccupancy / formData?.totalSeats) * 100;
    if (occupancyRate >= 100) return 'full';
    if (occupancyRate >= 80) return 'busy';
    return 'available';
  };

  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Capacity & Hours
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage seating capacity and operating hours
            </p>
          </div>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Settings
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              iconName="X"
              iconPosition="left"
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
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Capacity Settings */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Seating Capacity
            </h3>
            
            <div className="space-y-4">
              <Input
                label="Total Seats"
                type="number"
                min="1"
                value={formData?.totalSeats}
                onChange={(e) => handleInputChange('totalSeats', parseInt(e?.target?.value) || 0)}
                disabled={!isEditing}
                error={errors?.totalSeats}
                required
              />
              
              <Input
                label="Current Occupancy"
                type="number"
                min="0"
                max={formData?.totalSeats}
                value={formData?.currentOccupancy}
                onChange={(e) => handleInputChange('currentOccupancy', parseInt(e?.target?.value) || 0)}
                disabled={!isEditing}
                error={errors?.currentOccupancy}
                description="Real-time count of occupied seats"
              />
              
              <Input
                label="Peak Hour Limit"
                type="number"
                min="1"
                max={formData?.totalSeats}
                value={formData?.peakHourLimit}
                onChange={(e) => handleInputChange('peakHourLimit', parseInt(e?.target?.value) || 0)}
                disabled={!isEditing}
                error={errors?.peakHourLimit}
                description="Maximum seats available during busy periods"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Seat Allocation
            </h3>
            
            <div className="space-y-4">
              <Input
                label="Reservable Seats"
                type="number"
                min="0"
                max={formData?.totalSeats}
                value={formData?.reservableSeats}
                onChange={(e) => {
                  const value = parseInt(e?.target?.value) || 0;
                  handleInputChange('reservableSeats', value);
                  handleInputChange('walkInSeats', formData?.totalSeats - value);
                }}
                disabled={!isEditing}
                error={errors?.reservableSeats}
                description="Seats that can be reserved in advance"
              />
              
              <Input
                label="Walk-in Seats"
                type="number"
                min="0"
                max={formData?.totalSeats}
                value={formData?.walkInSeats}
                onChange={(e) => {
                  const value = parseInt(e?.target?.value) || 0;
                  handleInputChange('walkInSeats', value);
                  handleInputChange('reservableSeats', formData?.totalSeats - value);
                }}
                disabled={!isEditing}
                error={errors?.walkInSeats}
                description="Seats available for immediate check-in"
              />
            </div>
          </div>

          {/* Status Preview */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-3">Current Status</h4>
            <VenueStatusIndicator
              status={getCurrentStatus()}
              capacity={formData?.currentOccupancy}
              maxCapacity={formData?.totalSeats}
              showCapacity={true}
              size="lg"
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-4">
              Operating Hours
            </h3>
            
            <div className="space-y-3">
              {Object.entries(formData?.operatingHours)?.map(([day, hours]) => (
                <div key={day} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-20 text-sm font-medium text-foreground">
                    {dayNames?.[day]}
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="checkbox"
                      checked={!hours?.closed}
                      onChange={(e) => handleHoursChange(day, 'closed', !e?.target?.checked)}
                      disabled={!isEditing}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                    
                    {!hours?.closed ? (
                      <>
                        <input
                          type="time"
                          value={hours?.open}
                          onChange={(e) => handleHoursChange(day, 'open', e?.target?.value)}
                          disabled={!isEditing}
                          className={`px-2 py-1 border rounded text-sm transition-smooth
                            ${isEditing 
                              ? 'border-border bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20' 
                              : 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                            }
                          `}
                        />
                        <span className="text-muted-foreground">to</span>
                        <input
                          type="time"
                          value={hours?.close}
                          onChange={(e) => handleHoursChange(day, 'close', e?.target?.value)}
                          disabled={!isEditing}
                          className={`px-2 py-1 border rounded text-sm transition-smooth
                            ${isEditing 
                              ? 'border-border bg-input text-foreground focus:border-ring focus:ring-2 focus:ring-ring/20' 
                              : 'border-muted bg-muted text-muted-foreground cursor-not-allowed'
                            }
                          `}
                        />
                      </>
                    ) : (
                      <span className="text-muted-foreground text-sm">Closed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Copy"
                iconPosition="left"
                disabled={isEditing}
                onClick={() => {
                  const weekdayHours = formData?.operatingHours?.monday;
                  const updatedHours = { ...formData?.operatingHours };
                  ['tuesday', 'wednesday', 'thursday', 'friday']?.forEach(day => {
                    updatedHours[day] = { ...weekdayHours };
                  });
                  setFormData(prev => ({ ...prev, operatingHours: updatedHours }));
                }}
              >
                Copy Monday to Weekdays
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Calendar"
                iconPosition="left"
                disabled={isEditing}
                onClick={() => {
                  const weekendHours = { open: '09:00', close: '21:00', closed: false };
                  setFormData(prev => ({
                    ...prev,
                    operatingHours: {
                      ...prev?.operatingHours,
                      saturday: weekendHours,
                      sunday: weekendHours
                    }
                  }));
                }}
              >
                Set Weekend Hours (9AM-9PM)
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Automation Settings */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-lg font-heading font-medium text-foreground mb-4">
          Automation Settings
        </h3>
        
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-foreground">Auto Status Updates</h4>
            <p className="text-xs text-muted-foreground">
              Automatically update venue status based on occupancy levels
            </p>
          </div>
          <input
            type="checkbox"
            checked={formData?.autoStatusUpdate}
            onChange={(e) => handleInputChange('autoStatusUpdate', e?.target?.checked)}
            disabled={!isEditing}
            className="w-5 h-5 text-primary border-border rounded focus:ring-primary focus:ring-2"
          />
        </div>
      </div>
    </div>
  );
};

export default VenueCapacitySettings;