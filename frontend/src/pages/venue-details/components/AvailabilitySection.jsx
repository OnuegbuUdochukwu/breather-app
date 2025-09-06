import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilitySection = ({ 
  currentAvailability = [], 
  weeklySchedule = {},
  onMakeReservation = () => {},
  onCheckIn = () => {} 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const formatTime = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const getCapacityStatus = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage < 50) return { status: 'available', color: 'text-success', bg: 'bg-success/10' };
    if (percentage < 80) return { status: 'limited', color: 'text-warning', bg: 'bg-warning/10' };
    return { status: 'busy', color: 'text-accent', bg: 'bg-accent/10' };
  };

  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const isToday = selectedDate?.toDateString() === now?.toDateString();
    const currentHour = now?.getHours();

    for (let hour = 8; hour <= 20; hour++) {
      // Skip past hours for today
      if (isToday && hour <= currentHour) continue;

      const availability = currentAvailability?.find(slot => slot?.hour === hour) || {
        hour,
        current: Math.floor(Math.random() * 80),
        max: 100,
        reservable: true
      };

      const capacityInfo = getCapacityStatus(availability?.current, availability?.max);
      
      slots?.push({
        ...availability,
        time: formatTime(hour),
        capacityInfo
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date?.setDate(today?.getDate() + i);
      days?.push(date);
    }
    
    return days;
  };

  const formatDateDisplay = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(today?.getDate() + 1);

    if (date?.toDateString() === today?.toDateString()) return 'Today';
    if (date?.toDateString() === tomorrow?.toDateString()) return 'Tomorrow';
    
    return date?.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const availableDays = getNextSevenDays();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Icon name="Calendar" size={20} color="var(--color-primary)" />
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Availability & Reservations
        </h2>
      </div>
      {/* Date Selection */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Select Date</h3>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {availableDays?.map((date, index) => (
            <Button
              key={index}
              variant={selectedDate?.toDateString() === date?.toDateString() ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDate(date)}
              className="flex-shrink-0 min-w-20"
            >
              {formatDateDisplay(date)}
            </Button>
          ))}
        </div>
      </div>
      {/* Current Status */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-foreground">Current Status</h3>
          <span className="text-xs text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {currentAvailability?.reduce((sum, slot) => sum + slot?.current, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Current Occupancy</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {currentAvailability?.reduce((sum, slot) => sum + (slot?.max - slot?.current), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Available Spots</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {timeSlots?.filter(slot => slot?.reservable)?.length}
            </div>
            <div className="text-sm text-muted-foreground">Reservable Hours</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              4.8
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </div>
        </div>
      </div>
      {/* Time Slots */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">
          Available Time Slots - {formatDateDisplay(selectedDate)}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {timeSlots?.map((slot, index) => (
            <button
              key={index}
              onClick={() => setSelectedTimeSlot(slot)}
              disabled={!slot?.reservable}
              className={`
                p-4 rounded-lg border-2 text-left transition-smooth
                ${selectedTimeSlot?.hour === slot?.hour
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }
                ${!slot?.reservable 
                  ? 'opacity-50 cursor-not-allowed' :'hover:shadow-soft'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">
                  {slot?.time}
                </span>
                <span className={`
                  inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                  ${slot?.capacityInfo?.bg} ${slot?.capacityInfo?.color}
                `}>
                  {slot?.capacityInfo?.status}
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="font-mono text-foreground">
                    {slot?.current}/{slot?.max}
                  </span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-smooth-large ${
                      slot?.capacityInfo?.status === 'available' ? 'bg-success' :
                      slot?.capacityInfo?.status === 'limited' ? 'bg-warning' : 'bg-accent'
                    }`}
                    style={{ width: `${(slot?.current / slot?.max) * 100}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          size="lg"
          onClick={() => onCheckIn()}
          iconName="MapPin"
          iconPosition="left"
          className="flex-1"
          disabled={!timeSlots?.some(slot => slot?.reservable)}
        >
          Check In Now
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => onMakeReservation(selectedTimeSlot)}
          iconName="Calendar"
          iconPosition="left"
          className="flex-1"
          disabled={!selectedTimeSlot || !selectedTimeSlot?.reservable}
        >
          Make Reservation
        </Button>
      </div>
      {/* Reservation Info */}
      {selectedTimeSlot && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">
                Selected Time Slot: {selectedTimeSlot?.time}
              </h4>
              <p className="text-sm text-muted-foreground">
                {selectedTimeSlot?.max - selectedTimeSlot?.current} spots available out of {selectedTimeSlot?.max} total capacity.
                {selectedTimeSlot?.reservable 
                  ? 'You can reserve this slot or check in directly.' :' This time slot is currently full.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilitySection;